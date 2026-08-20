/**
 * Boot-time constants and the single inline script that applies persisted
 * preferences before first paint.
 *
 * Framework-free on purpose (no 'use client'): the root layout is a server
 * component and needs the real values. Exporting these from a context module
 * breaks the build — Next replaces client-module exports with proxy references
 * on the server, so array methods on them are not functions.
 */

export const THEMES = ['light', 'dark', 'system'] as const;
export type ThemeChoice = (typeof THEMES)[number];

export const LANGUAGES = ['en', 'th'] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_THEME: ThemeChoice = 'system';
export const DEFAULT_LANGUAGE: Language = 'en';

export const THEME_STORAGE_KEY = 'portfolio-theme';
export const LANG_STORAGE_KEY = 'portfolio-lang';

export const isThemeChoice = (v: unknown): v is ThemeChoice =>
    typeof v === 'string' && (THEMES as readonly string[]).includes(v);

export const isLanguage = (v: unknown): v is Language =>
    typeof v === 'string' && (LANGUAGES as readonly string[]).includes(v);

/**
 * Render-blocking snippet for <head>.
 *
 * Stamps `data-theme` (resolving `system` through a media query) and `lang` on
 * <html> before the first paint. Both attributes are then the source of truth
 * the React providers read, so nothing has to be re-derived after hydration.
 *
 * Built from the compile-time constants above; no user or network input.
 */
export const BOOT_SCRIPT = `(function(){try{
var d=document.documentElement;
var c=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
if(c!=='light'&&c!=='dark')c='system';
d.dataset.theme=c==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):c;
var l=localStorage.getItem(${JSON.stringify(LANG_STORAGE_KEY)});
if(l==='en'||l==='th')d.lang=l;
}catch(e){}})()`;
