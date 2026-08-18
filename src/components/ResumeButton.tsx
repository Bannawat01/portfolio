'use client';

import { FileText, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function ResumeButton() {
    const { t } = useLanguage();

    return (
        <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="group/resume mt-5 inline-flex items-center gap-2.5 rounded-md bg-[var(--accent)] px-5 py-2.5 font-mono text-[13px] font-semibold uppercase tracking-wide text-[var(--accent-ink)] transition-colors duration-200 hover:bg-[var(--accent-soft)]"
        >
            <FileText className="h-4 w-4" />
            {t('view_resume')}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/resume:-translate-y-0.5 group-hover/resume:translate-x-0.5" />
        </motion.a>
    );
}
