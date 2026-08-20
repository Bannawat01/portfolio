'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import type { ThemeChoice } from '@/lib/boot';

const OPTIONS: { id: ThemeChoice; Icon: typeof Sun; labelKey: string }[] = [
    { id: 'light', Icon: Sun, labelKey: 'theme_light' },
    { id: 'dark', Icon: Moon, labelKey: 'theme_dark' },
    { id: 'system', Icon: Monitor, labelKey: 'theme_system' },
];

export default function ThemeToggle() {
    const { choice, setChoice } = useTheme();
    const { t } = useLanguage();

    return (
        <div
            role="radiogroup"
            aria-label={t('theme_label')}
            className="inline-flex items-center gap-0.5 rounded-lg border border-border bg-surface-2 p-0.5"
        >
            {OPTIONS.map(({ id, Icon, labelKey }) => {
                const active = choice === id;
                return (
                    <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        aria-label={t(labelKey)}
                        title={t(labelKey)}
                        onClick={() => setChoice(id)}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-150 ${active
                            ? 'bg-surface text-ink shadow-[var(--shadow-sm)]'
                            : 'text-dim hover:text-body'
                            }`}
                    >
                        <Icon className="h-3.5 w-3.5" />
                    </button>
                );
            })}
        </div>
    );
}
