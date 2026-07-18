'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { FileText, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function ResumeButton() {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, close]);

    return (
        <>
            <motion.button
                type="button"
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="group/resume relative mt-5 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#8b7fff] to-[#6d5cff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,127,255,0.25)] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(139,127,255,0.5)]"
            >
                {/* Shine sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/resume:translate-x-full" />
                <FileText className="h-4 w-4" />
                {t('view_resume')}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/resume:-translate-y-0.5 group-hover/resume:translate-x-0.5" />
            </motion.button>

            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={close}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Résumé"
                        >
                            <button
                                type="button"
                                onClick={close}
                                aria-label="Close"
                                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a26]/80 text-[#b8b8cc] border border-[#2e2e45] hover:text-white hover:border-[#8b7fff]/60 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <motion.img
                                src="/resume.jpg"
                                alt="Résumé — Bannawat Rattanarak"
                                className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />

                            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#6e6e8a]">
                                {t('resume_hint')}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
