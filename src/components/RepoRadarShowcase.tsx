'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Radio,
    GitCommit,
    GitPullRequest,
    GitMerge,
    CircleDot,
    CheckCircle2,
    ArrowUpRight,
    ArrowRight,
} from 'lucide-react';

const API_BASE = 'https://reporadar-api-6uvh.onrender.com';
const REPO_URL = 'https://github.com/Bannawat01/RepoRadar';

type FeedEvent = {
    id: string;
    event: string;
    action: string | null;
    repo: { name: string; url: string };
    actor: { login: string; avatar: string | null };
    title: string;
    url: string;
    receivedAt: string;
};

// Shown when the live feed is empty or the free-tier API is waking up,
// so the card always demonstrates what the pipeline produces.
const SAMPLE: FeedEvent[] = [
    {
        id: 's1', event: 'pull_request', action: 'merged',
        repo: { name: 'Bannawat01/LaekHub-Server', url: '#' },
        actor: { login: 'Bannawat01', avatar: null },
        title: 'PR #42 merged: Add rate limiting middleware', url: '#',
        receivedAt: new Date(Date.now() - 4 * 60000).toISOString(),
    },
    {
        id: 's2', event: 'issues', action: 'opened',
        repo: { name: 'Bannawat01/ai-fetch-healer', url: '#' },
        actor: { login: 'Bannawat01', avatar: null },
        title: 'Issue #7 opened: Retry validation on 503', url: '#',
        receivedAt: new Date(Date.now() - 22 * 60000).toISOString(),
    },
    {
        id: 's3', event: 'push', action: 'push',
        repo: { name: 'Bannawat01/CopyUI', url: '#' },
        actor: { login: 'Bannawat01', avatar: null },
        title: '3 commits pushed to main', url: '#',
        receivedAt: new Date(Date.now() - 58 * 60000).toISOString(),
    },
];

function visual(ev: FeedEvent): { Icon: typeof GitCommit; color: string } {
    if (ev.event === 'push') return { Icon: GitCommit, color: '#2ee6a6' };
    if (ev.event === 'pull_request')
        return ev.action === 'merged'
            ? { Icon: GitMerge, color: '#a99eff' }
            : { Icon: GitPullRequest, color: '#8b7fff' };
    // issues
    return ev.action === 'closed'
        ? { Icon: CheckCircle2, color: '#2ee6a6' }
        : { Icon: CircleDot, color: '#ff7a90' };
}

function ago(iso: string): string {
    const s = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
}

const PIPELINE = ['GitHub', 'API', 'n8n', 'Discord'];

export default function RepoRadarShowcase() {
    const [events, setEvents] = useState<FeedEvent[] | null>(null);
    const [mode, setMode] = useState<'loading' | 'live' | 'sample'>('loading');

    useEffect(() => {
        let alive = true;
        const ctrl = new AbortController();
        // Free-tier API can cold-start; don't let the card hang on it.
        const timer = setTimeout(() => ctrl.abort(), 8000);

        fetch(`${API_BASE}/logs?limit=5`, { signal: ctrl.signal })
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad status'))))
            .then((data: { events?: FeedEvent[] }) => {
                if (!alive) return;
                const evs = data.events ?? [];
                if (evs.length) {
                    setEvents(evs);
                    setMode('live');
                } else {
                    setEvents(SAMPLE);
                    setMode('sample');
                }
            })
            .catch(() => {
                if (!alive) return;
                setEvents(SAMPLE);
                setMode('sample');
            })
            .finally(() => clearTimeout(timer));

        return () => {
            alive = false;
            ctrl.abort();
            clearTimeout(timer);
        };
    }, []);

    const rows = events ?? [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
            className="project-card mb-3 rounded-xl p-5 ring-1 ring-[#8b7fff]/25 shadow-[0_0_0_1px_rgba(139,127,255,0.12),0_12px_40px_rgba(139,127,255,0.10)]"
        >
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                        <span className="text-sm font-semibold text-[#f0f0f8]">RepoRadar</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8b7fff]/45 bg-[#8b7fff]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#a99eff] sm:text-[11px]">
                            <span className="relative inline-flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8b7fff] opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a99eff]" />
                            </span>
                            Live System
                        </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#b8b8cc]">
                        Real-time DevOps bot — GitHub webhooks → a Fastify API (HMAC verify,
                        idempotency) → n8n → rich Discord embeds. Fault-tolerant, at-least-once delivery.
                    </p>
                </div>
                <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="View RepoRadar on GitHub"
                    className="group inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2b2b43] bg-[#161625] text-[#5d5d80] transition-all hover:border-[#3c3c5b] hover:text-[#8b7fff] sm:h-9 sm:w-9"
                >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>

            {/* Pipeline */}
            <div className="mb-4 flex flex-wrap items-center gap-1.5">
                {PIPELINE.map((stage, i) => (
                    <span key={stage} className="flex items-center gap-1.5">
                        <span className="rounded-md border border-[#2a2a3f] bg-[#161622] px-2 py-1 text-[11px] font-medium text-[#9a9ac0]">
                            {stage}
                        </span>
                        {i < PIPELINE.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-[#4a4a68]" />
                        )}
                    </span>
                ))}
                <span className="ml-1 inline-flex items-center gap-1 text-[11px] text-[#c084fc]">
                    <span className="rounded-md border border-[#3178c6]/30 bg-[#3178c6]/10 px-2 py-1 font-medium text-[#7fb0ea]">
                        TypeScript
                    </span>
                </span>
            </div>

            {/* Live feed */}
            <div className="rounded-lg border border-[#242436] bg-[#0f0f18]/60">
                <div className="flex items-center justify-between border-b border-[#20202f] px-3.5 py-2.5">
                    <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6e6e8a]">
                        <Radio className="h-3.5 w-3.5 text-[#8b7fff]" />
                        Live Activity Feed
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#4a4a68]">
                        {mode === 'live' && 'from /logs'}
                        {mode === 'sample' && 'preview'}
                        {mode === 'loading' && '…'}
                    </span>
                </div>

                <ul className="divide-y divide-[#1c1c2a]">
                    {mode === 'loading' &&
                        [0, 1, 2].map((i) => (
                            <li key={i} className="flex items-center gap-3 px-3.5 py-3">
                                <span className="h-7 w-7 shrink-0 animate-pulse rounded-full bg-[#1c1c2a]" />
                                <span className="h-3 flex-1 animate-pulse rounded bg-[#1c1c2a]" />
                            </li>
                        ))}

                    {mode !== 'loading' &&
                        rows.map((ev, i) => {
                            const { Icon, color } = visual(ev);
                            const clickable = ev.url && ev.url !== '#';
                            const Row = (
                                <>
                                    <span
                                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                                        style={{
                                            borderColor: `${color}44`,
                                            backgroundColor: `${color}14`,
                                            color,
                                        }}
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-[13px] leading-snug text-[#dcdcea]">
                                            {ev.title}
                                        </span>
                                        <span className="mt-0.5 block truncate text-[11px] text-[#6e6e8a]">
                                            {ev.repo.name} · {ago(ev.receivedAt)}
                                        </span>
                                    </span>
                                </>
                            );
                            return (
                                <motion.li
                                    key={ev.id}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: i * 0.06 }}
                                >
                                    {clickable ? (
                                        <a
                                            href={ev.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-3 px-3.5 py-3 transition-colors hover:bg-[#15151f]"
                                        >
                                            {Row}
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-3 px-3.5 py-3">{Row}</div>
                                    )}
                                </motion.li>
                            );
                        })}
                </ul>

                {mode === 'sample' && (
                    <p className="border-t border-[#20202f] px-3.5 py-2 text-[10.5px] leading-relaxed text-[#5a5a78]">
                        Showing sample events — the live API is idle. Trigger a GitHub event and it
                        streams here in real time.
                    </p>
                )}
            </div>
        </motion.div>
    );
}
