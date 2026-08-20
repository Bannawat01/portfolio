'use client';

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react';
import {
    DEFAULT_THEME,
    THEME_STORAGE_KEY,
    isThemeChoice,
    type ThemeChoice,
} from '@/lib/boot';

/**
 * Neither piece of theme state lives in React.
 *
 * - The *resolved* theme ('light' | 'dark') lives on `<html data-theme>`, which
 *   the boot script sets before first paint. It is what CSS reads.
 * - The user's *choice* ('light' | 'dark' | 'system') lives in localStorage,
 *   because 'system' has no representation in the DOM.
 *
 * Both are subscribed to as external stores, so React never keeps a duplicate
 * copy it has to reconcile after hydration.
 */

/* ── resolved theme: the data-theme attribute ─────────────────────────────── */

const subscribeResolved = (onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
};

const getResolved = (): 'light' | 'dark' =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

// SSR renders the light palette; the boot script corrects it before paint.
const getResolvedServer = (): 'light' | 'dark' => 'light';

/* ── choice: localStorage, plus an in-page listener set ───────────────────── */

const listeners = new Set<() => void>();

const subscribeChoice = (onChange: () => void) => {
    listeners.add(onChange);
    // `storage` only fires in *other* tabs, so same-tab updates go through the
    // listener set instead. Both paths are needed.
    window.addEventListener('storage', onChange);
    return () => {
        listeners.delete(onChange);
        window.removeEventListener('storage', onChange);
    };
};

// Authoritative for this tab. Keeps the control in sync even when localStorage
// is unavailable (private mode), where the write below silently no-ops.
let memoryChoice: ThemeChoice | null = null;

const getChoice = (): ThemeChoice => {
    if (memoryChoice) return memoryChoice;
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return isThemeChoice(stored) ? stored : DEFAULT_THEME;
    } catch {
        return DEFAULT_THEME;
    }
};

const getChoiceServer = (): ThemeChoice => DEFAULT_THEME;

/** Writes the resolved theme onto <html>, expanding 'system' via the OS. */
const applyChoice = (choice: ThemeChoice) => {
    const resolved =
        choice === 'system'
            ? matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
            : choice;
    document.documentElement.dataset.theme = resolved;
};

type ThemeContextValue = {
    /** What the user picked, including 'system'. */
    choice: ThemeChoice;
    /** What is actually on screen right now. */
    resolved: 'light' | 'dark';
    setChoice: (next: ThemeChoice) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const resolved = useSyncExternalStore(subscribeResolved, getResolved, getResolvedServer);
    const choice = useSyncExternalStore(subscribeChoice, getChoice, getChoiceServer);

    // While on 'system', follow the OS if the user flips it mid-session.
    useEffect(() => {
        if (choice !== 'system') return;
        const mq = matchMedia('(prefers-color-scheme: dark)');
        const onChange = () => applyChoice('system');
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, [choice]);

    const setChoice = useCallback((next: ThemeChoice) => {
        memoryChoice = next;
        try {
            localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
            // private mode / storage disabled — memoryChoice keeps this session correct
        }
        applyChoice(next);
        listeners.forEach((l) => l());
    }, []);

    return (
        <ThemeContext.Provider value={{ choice, resolved, setChoice }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
    return ctx;
}
