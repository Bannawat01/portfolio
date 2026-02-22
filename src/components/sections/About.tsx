'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function About() {
    const { t } = useLanguage();

    return (
        <motion.section
            id="about"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            aria-label="About me"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4 }}
        >
            {/* Mobile sticky header */}
            <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-[#0d0d14]/95 px-6 py-4 backdrop-blur-sm border-b border-[#242436] md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 lg:border-0">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#6e6e8a]">
                    {t('nav_about')}
                </h2>
            </div>

            {/* Prose — readable, generous spacing */}
            <div className="space-y-5 text-[#b8b8cc] text-[15px] leading-[1.85]">
                <p>{t('about_p1')}</p>
                <p>{t('about_p2')}</p>
                <p>{t('about_p3')}</p>
            </div>
        </motion.section>
    );
}
