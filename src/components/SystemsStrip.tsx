'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import StatusLabel, { type Status } from '@/components/StatusDot';

const REPORADAR_API = 'https://reporadar-api-6uvh.onrender.com';

const SYSTEMS: { anchor: string; name: string; descKey: string; status: Status }[] = [
    { anchor: 'silent-ember', name: 'Silent Ember', descKey: 'sys_ember', status: 'wip' },
    { anchor: 'wakeful', name: 'Wakeful', descKey: 'sys_wakeful', status: 'up' },
    { anchor: 'repo-radar', name: 'RepoRadar', descKey: 'sys_reporadar', status: 'live' },
    { anchor: 'ai-fetch-healer', name: 'ai-fetch-healer', descKey: 'sys_healer', status: 'shipped' },
];

function ago(iso: string): string {
    const s = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
    return `${Math.floor(h / 24)}d`;
}

/**
 * The page's opening argument.
 *
 * Everything Bannawat builds is about staying up or recovering when it doesn't
 * — an uptime SaaS, a live webhook pipeline, a package that heals failed API
 * calls. So the page opens the way those products present themselves: a status
 * strip of what is running right now.
 *
 * The RepoRadar row carries a real timestamp from its live API. If that call
 * fails the row simply drops the timestamp — it never invents one.
 */
export default function SystemsStrip() {
    const { t } = useLanguage();
    const [lastEvent, setLastEvent] = useState<string | null>(null);

    useEffect(() => {
        const ctrl = new AbortController();
        // Free-tier API cold-starts; never let the hero wait on it.
        const timer = setTimeout(() => ctrl.abort(), 8000);
        let alive = true;

        fetch(`${REPORADAR_API}/logs?limit=1`, { signal: ctrl.signal })
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad status'))))
            .then((data: { events?: { receivedAt: string }[] }) => {
                if (!alive) return;
                const first = data.events?.[0];
                if (first?.receivedAt) setLastEvent(first.receivedAt);
            })
            .catch(() => {
                /* no timestamp rather than a fabricated one */
            })
            .finally(() => clearTimeout(timer));

        return () => {
            alive = false;
            ctrl.abort();
            clearTimeout(timer);
        };
    }, []);

    return (
        <motion.section
            aria-label={t('strip_title')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="card overflow-hidden"
        >
            <div className="flex items-center justify-between gap-4 border-b border-border bg-gradient-to-r from-accent-tint to-transparent px-6 py-4">
                <h2 className="flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
                    <span className="dot dot-live" aria-hidden="true" />
                    {t('strip_title')}
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                    {t('strip_note')}
                </span>
            </div>

            <ul>
                {SYSTEMS.map(({ anchor, name, descKey, status }) => (
                    <li key={anchor} className="border-b border-border last:border-0">
                        <a
                            href={`#${anchor}`}
                            className="group relative flex flex-col gap-2 px-6 py-4 transition-colors before:absolute before:inset-y-[18%] before:left-0 before:w-[2px] before:origin-center before:scale-y-0 before:rounded-full before:bg-accent-vivid before:transition-transform before:duration-300 hover:bg-surface-2 hover:before:scale-y-100 sm:flex-row sm:items-center sm:gap-5"
                        >
                            <span className="font-display text-[15.5px] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-accent sm:w-44 sm:shrink-0">
                                {name}
                            </span>
                            <span className="min-w-0 flex-1 text-[13px] leading-snug text-muted">
                                {t(descKey)}
                            </span>
                            <span className="flex items-center gap-3.5 sm:shrink-0">
                                {status === 'live' && lastEvent && (
                                    <span className="font-mono text-[10.5px] tabular-nums text-dim">
                                        {t('strip_last_event')} {ago(lastEvent)}
                                    </span>
                                )}
                                <StatusLabel status={status} />
                                <ArrowDownRight className="h-3.5 w-3.5 text-faint transition-all duration-200 group-hover:translate-y-0.5 group-hover:text-accent" />
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </motion.section>
    );
}
