'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const LINK =
    'font-medium text-ink underline decoration-[var(--accent-line)] decoration-1 underline-offset-4 transition-colors hover:decoration-accent hover:text-accent';

/**
 * Opening paragraph. The proof points are inline links into the showcase cards
 * rather than a separate tagline — the claim and the evidence sit in the same
 * sentence, one click apart.
 */
export default function Intro() {
    const { t } = useLanguage();

    return (
        <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-[clamp(17px,1.5vw,19px)] leading-[1.6] tracking-[-0.005em] text-body"
        >
            {t('hero_seg1')}
            <a href="#silent-ember" className={LINK}>{t('hero_link_ember')}</a>
            {t('hero_seg2')}
            <a href="#projects" className={LINK}>{t('hero_link_api')}</a>
            {t('hero_seg3')}
            <a href="#repo-radar" className={LINK}>{t('hero_link_bot')}</a>
            {t('hero_seg4')}
            <a href="#ai-fetch-healer" className={LINK}>{t('hero_link_npm')}</a>
            {t('hero_seg5')}
        </motion.p>
    );
}
