'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Gamepad2, Hammer, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const shots = [
    { src: '/silent-ember/Screenshot_MainMenu.png', label: 'Main Menu' },
    { src: '/silent-ember/Screenshot_BedRoom.png', label: 'Bedroom' },
    { src: '/silent-ember/Screenshot_KitchenRoom.png', label: 'Kitchen' },
    { src: '/silent-ember/Screenshot_Storeage.png', label: 'Storage' },
    { src: '/silent-ember/Screenshot_Memore.png', label: 'Memory' },
    { src: '/silent-ember/Screenshot_Die.png', label: 'Death Screen' },
    { src: '/silent-ember/Screenshot_Ending.png', label: 'Ending' },
];

export default function SilentEmberShowcase() {
    const { t } = useLanguage();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const next = useCallback(() => setIndex((i) => (i + 1) % shots.length), []);
    const prev = useCallback(() => setIndex((i) => (i - 1 + shots.length) % shots.length), []);

    useEffect(() => {
        if (paused || fullscreen) return;
        const id = setInterval(next, 4000);
        return () => clearInterval(id);
    }, [paused, fullscreen, next]);

    useEffect(() => {
        if (!fullscreen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setFullscreen(false);
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [fullscreen, next, prev]);

    const shot = shots[index];

    return (
        <div className="mb-8 rounded-xl border border-[#242436] bg-[#12121c] overflow-hidden">
            {/* Header */}
            <div className="flex items-start gap-3 p-5 pb-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2b2b43] bg-[#161625] text-[#8b7fff]">
                    <Gamepad2 className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#f0f0f8]">{t('silent_ember_title')}</h3>
                        <span
                            title={t('silent_ember_status_hint')}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#f5a623]/40 bg-[#f5a623]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#f5b955]"
                        >
                            <Hammer className="h-3 w-3" />
                            {t('silent_ember_status')}
                        </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[#b8b8cc]">{t('silent_ember_desc')}</p>
                    <p className="mt-1.5 text-xs text-[#6e6e8a]">{t('silent_ember_status_hint')}</p>
                </div>
            </div>

            {/* Carousel */}
            <div
                className="group relative aspect-video w-full bg-black"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <AnimatePresence mode="wait">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                        key={shot.src}
                        src={shot.src}
                        alt={`Silent Ember — ${shot.label}`}
                        className="absolute inset-0 h-full w-full cursor-zoom-in object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setFullscreen(true)}
                    />
                </AnimatePresence>

                {/* Label */}
                <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-[#e0e0ee] backdrop-blur-sm">
                    {shot.label}
                </span>

                {/* Arrows */}
                <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous screenshot"
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 backdrop-blur-sm transition-opacity hover:text-white group-hover:opacity-100"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={next}
                    aria-label="Next screenshot"
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 backdrop-blur-sm transition-opacity hover:text-white group-hover:opacity-100"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 py-3">
                {shots.map((s, i) => (
                    <button
                        key={s.src}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to ${s.label}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-[#8b7fff]' : 'w-1.5 bg-[#2e2e45] hover:bg-[#4a4a6a]'}`}
                    />
                ))}
            </div>

            {/* Fullscreen lightbox */}
            {mounted && createPortal(
                <AnimatePresence>
                    {fullscreen && (
                        <motion.div
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setFullscreen(false)}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Silent Ember screenshots"
                        >
                            <button
                                type="button"
                                onClick={() => setFullscreen(false)}
                                aria-label="Close"
                                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a26]/80 text-[#b8b8cc] border border-[#2e2e45] hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={shot.src}
                                alt={`Silent Ember — ${shot.label}`}
                                className="max-h-full max-w-full rounded-lg object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />

                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); prev(); }}
                                aria-label="Previous screenshot"
                                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/90 hover:bg-white/20 transition-colors"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); next(); }}
                                aria-label="Next screenshot"
                                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/90 hover:bg-white/20 transition-colors"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>

                            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-black/60 px-3 py-1 text-sm text-[#e0e0ee]">
                                {shot.label} · {index + 1}/{shots.length}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
