'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeader from '@/components/SectionHeader';

export default function About() {
    const { t } = useLanguage();

    return (
        <motion.section
            id="about"
            aria-label={t('nav_about')}
            className="scroll-mt-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
        >
            <SectionHeader title={t('nav_about')} meta={t('meta_about')} />

            <div className="max-w-2xl space-y-4 text-[15px] leading-[1.8] text-body">
                <p>{t('about_p1')}</p>
                <p>{t('about_p2')}</p>
                <p>{t('about_p3')}</p>
            </div>
        </motion.section>
    );
}
