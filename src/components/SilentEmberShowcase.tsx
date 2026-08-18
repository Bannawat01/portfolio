'use client';

import { useState, type CSSProperties } from 'react';
import { Gamepad2, Hammer, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const YT_ID = 'O-dbrtYsItE';
const CARD_ACCENT = '#e2542f';

function GameplayVideo() {
    const [playing, setPlaying] = useState(false);

    if (playing) {
        return (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                <iframe
                    src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1`}
                    title="Silent Ember — Gameplay"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                />
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play Silent Ember gameplay video"
            className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-black"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`https://i.ytimg.com/vi/${YT_ID}/hqdefault.jpg`}
                alt="Silent Ember gameplay thumbnail"
                className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                loading="lazy"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/20">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
                </span>
            </span>
            <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-[var(--text-primary)] backdrop-blur-sm">
                Watch Gameplay
            </span>
        </button>
    );
}

export default function SilentEmberShowcase() {
    const { t } = useLanguage();

    return (
        <div
            id="silent-ember"
            className="showcase-card mb-8 overflow-hidden scroll-mt-16 lg:scroll-mt-24"
            style={{ '--card-accent': CARD_ACCENT } as CSSProperties}
        >
            {/* Header */}
            <div className="flex items-start gap-3 p-5 pb-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e2542f]/40 bg-[#e2542f]/10 text-[#e2542f]">
                    <Gamepad2 className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif text-lg text-[var(--text-primary)]">{t('silent_ember_title')}</h3>
                        <span
                            title={t('silent_ember_status_hint')}
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#f28060]"
                        >
                            <Hammer className="h-3 w-3" />
                            {t('silent_ember_status')}
                        </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-body)]">{t('silent_ember_desc')}</p>
                    <p className="mt-1.5 text-xs text-[var(--text-muted)]">{t('silent_ember_status_hint')}</p>
                </div>
            </div>

            {/* Gameplay video — click-to-load facade, no iframe/script until interacted with */}
            <div className="px-5 pb-5">
                <GameplayVideo />
            </div>
        </div>
    );
}
