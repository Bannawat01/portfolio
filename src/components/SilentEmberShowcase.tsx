'use client';

import { useState } from 'react';
import { Play, Trophy, Rocket, Cpu, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ShowcaseCard, { Highlights } from '@/components/ShowcaseCard';

const YT_ID = 'O-dbrtYsItE';
const YT_WATCH = `https://www.youtube.com/watch?v=${YT_ID}`;

/**
 * Click-to-load facade: no YouTube iframe or script is requested until the
 * visitor actually asks for the video.
 */
function GameplayVideo({ label }: { label: string }) {
    const [playing, setPlaying] = useState(false);

    if (playing) {
        return (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                <iframe
                    src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1`}
                    title="Silent Ember — gameplay"
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
            aria-label={label}
            className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-border bg-black"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`https://i.ytimg.com/vi/${YT_ID}/hqdefault.jpg`}
                alt=""
                className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                loading="lazy"
            />
            {/* Player chrome stays theme-independent on purpose — it sits on a
                video frame, not on a site surface. */}
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-300 group-hover:bg-black/10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-black transition-transform duration-300 group-hover:scale-105">
                    <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
                </span>
            </span>
        </button>
    );
}

export default function SilentEmberShowcase() {
    const { t } = useLanguage();

    return (
        <ShowcaseCard
            id="silent-ember"
            name={t('silent_ember_title')}
            status="wip"
            meta={t('silent_ember_meta')}
            href={YT_WATCH}
            hrefLabel="Watch Silent Ember gameplay on YouTube"
            footnote={t('silent_ember_status_hint')}
        >
            <p className="mb-4 max-w-2xl text-[14px] leading-relaxed text-body">
                {t('silent_ember_desc')}
            </p>

            <GameplayVideo label={t('play_video')} />

            <div className="mt-5">
                <Highlights
                    items={[
                        { Icon: Trophy, title: t('silent_ember_award1_t'), desc: t('silent_ember_award1_d') },
                        { Icon: Rocket, title: t('silent_ember_award2_t'), desc: t('silent_ember_award2_d') },
                        { Icon: Cpu, title: t('silent_ember_award3_t'), desc: t('silent_ember_award3_d') },
                        { Icon: User, title: t('silent_ember_award4_t'), desc: t('silent_ember_award4_d') },
                    ]}
                />
            </div>
        </ShowcaseCard>
    );
}
