'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();
    const isEn = language === 'en';

    return (
        <div className="fixed top-4 right-4 z-50 inline-flex items-center rounded-md bg-[var(--surface)]/95 backdrop-blur-sm border border-[var(--border)] p-0.5 md:top-6 md:right-6">
            <button
                onClick={() => setLanguage('en')}
                className={`px-3.5 py-1.5 rounded-[4px] font-mono text-[11px] font-medium uppercase tracking-wider transition-all duration-200 focus:outline-none ${isEn ? 'bg-[var(--accent)] text-[var(--accent-ink)]' : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('th')}
                className={`px-3.5 py-1.5 rounded-[4px] font-mono text-[11px] font-medium uppercase tracking-wider transition-all duration-200 focus:outline-none ${!isEn ? 'bg-[var(--accent)] text-[var(--accent-ink)]' : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
                    }`}
            >
                TH
            </button>
        </div>
    );
}
