'use client';

import { useLanguage } from '@/context/LanguageContext';

const LANGS = [
    { id: 'en', label: 'EN' },
    { id: 'th', label: 'TH' },
] as const;

export default function LanguageToggle() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div
            role="radiogroup"
            aria-label={t('lang_label')}
            className="inline-flex items-center gap-0.5 rounded-lg border border-border bg-surface-2 p-0.5"
        >
            {LANGS.map(({ id, label }) => {
                const active = language === id;
                return (
                    <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setLanguage(id)}
                        className={`inline-flex h-7 items-center rounded-md px-2.5 font-mono text-[10.5px] font-medium tracking-wider transition-colors duration-150 ${active
                            ? 'bg-surface text-ink shadow-[var(--shadow-sm)]'
                            : 'text-dim hover:text-body'
                            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
