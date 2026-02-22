'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();
    const isEn = language === 'en';

    return (
        <div className="mt-6 inline-flex items-center rounded-lg bg-[#16161e] border border-[#1e1e2a] p-0.5">
            <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 rounded-md text-xs font-medium uppercase tracking-wider transition-all duration-200 focus:outline-none ${isEn ? 'bg-[#7c6fff] text-white' : 'text-[#555566] hover:text-[#888899]'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('th')}
                className={`px-4 py-1.5 rounded-md text-xs font-medium uppercase tracking-wider transition-all duration-200 focus:outline-none ${!isEn ? 'bg-[#7c6fff] text-white' : 'text-[#555566] hover:text-[#888899]'
                    }`}
            >
                TH
            </button>
        </div>
    );
}
