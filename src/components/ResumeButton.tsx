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
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="group/resume relative mt-5 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#8b7fff] to-[#6d5cff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,127,255,0.25)] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(139,127,255,0.5)]"
        >
            {/* Shine sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/resume:translate-x-full" />
            <FileText className="h-4 w-4" />
            {t('view_resume')}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/resume:-translate-y-0.5 group-hover/resume:translate-x-0.5" />
        </motion.a>
    );
}
