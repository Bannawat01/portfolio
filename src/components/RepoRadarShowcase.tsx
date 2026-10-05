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
    BellRing,
    KeyRound,
    Rocket,
    ServerCog,
} from 'lucide-react';
import ShowcaseCard, { Highlights } from '@/components/ShowcaseCard';

const API_BASE = 'https://reporadar-api-6uvh.onrender.com';
const REPO_URL = 'https://github.com/Bannawat01/RepoRadar';

const HIGHLIGHTS = [
    {
        Icon: ServerCog,
        title: 'Self-hostable',
        desc: 'Clone the public repo, add your environment variables, and run your own instance.',
    },
    {
        Icon: KeyRound,
        title: 'Secure by default',
        desc: 'Verifies GitHub webhook signatures and rejects duplicate deliveries before processing.',
    },
    {
        Icon: BellRing,
        title: 'Discord-ready',
        desc: 'Turns pushes, issues, and pull requests into readable, real-time Discord notifications.',
    },
];

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

// Shown when the live feed is empty or the free-tier API is waking up, so the
// card always demonstrates what the pipeline produces. Labelled as a preview
// in the UI — never passed off as live traffic.
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

function iconFor(ev: FeedEvent) {
    if (ev.event === 'push') return GitCommit;
    if (ev.event === 'pull_request') return ev.action === 'merged' ? GitMerge : GitPullRequest;
    return ev.action === 'closed' ? CheckCircle2 : CircleDot;
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

export default function RepoRadarShowcase() {
    const [events, setEvents] = useState<FeedEvent[]>([]);
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
                setEvents(evs.length ? evs : SAMPLE);
                setMode(evs.length ? 'live' : 'sample');
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

    return (
        <ShowcaseCard
            id="repo-radar"
            name="RepoRadar"
            status="live"
            meta="Open source / Self-hostable / GitHub to Fastify to n8n to Discord"
            href={REPO_URL}
            hrefLabel="View RepoRadar on GitHub"
        >
            <p className="max-w-2xl text-[14px] leading-relaxed text-body">
                An open-source, self-hostable DevOps bot that turns GitHub activity into rich
                Discord alerts. It verifies every webhook, prevents duplicate deliveries, and
                routes events through an editable n8n workflow, so anyone can deploy and adapt it
                for their own repositories.
            </p>

            <a
                href={`${REPO_URL}#readme`}
                target="_blank"
                rel="noreferrer"
                className="group my-4 flex items-center gap-3 rounded-xl border border-[var(--accent-line)] bg-accent-tint px-4 py-3 transition-transform hover:-translate-y-0.5"
            >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-accent shadow-sm">
                    <Rocket className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium text-ink">Deploy your own RepoRadar</span>
                    <span className="block truncate font-mono text-[10.5px] text-muted">
                        Fork / configure secrets / connect GitHub / go live
                    </span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                    Setup guide
                </span>
            </a>

            <div className="inset overflow-hidden">
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
                    <span className="flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
                        <Radio className="h-3.5 w-3.5 text-accent" />
                        Live activity feed
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                        {mode === 'live' && 'from /logs'}
                        {mode === 'sample' && 'preview'}
                        {mode === 'loading' && 'connecting…'}
                    </span>
                </div>

                <ul className="divide-y divide-[var(--border)]">
                    {mode === 'loading' &&
                        [0, 1, 2].map((i) => (
                            <li key={i} className="flex items-center gap-3 px-4 py-3">
                                <span className="h-6 w-6 shrink-0 animate-pulse rounded-lg bg-surface-3" />
                                <span className="h-3 flex-1 animate-pulse rounded bg-surface-3" />
                            </li>
                        ))}

                    {mode !== 'loading' &&
                        events.map((ev, i) => {
                            const Icon = iconFor(ev);
                            const clickable = ev.url && ev.url !== '#';
                            const body = (
                                <>
                                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                                        <Icon className="h-3 w-3" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-[13px] leading-snug text-ink">
                                            {ev.title}
                                        </span>
                                        <span className="mt-0.5 block truncate font-mono text-[10.5px] text-dim">
                                            {ev.repo.name} · {ago(ev.receivedAt)}
                                        </span>
                                    </span>
                                </>
                            );

                            return (
                                <motion.li
                                    key={ev.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.25, delay: i * 0.05 }}
                                >
                                    {clickable ? (
                                        <a
                                            href={ev.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-3"
                                        >
                                            {body}
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-3 px-4 py-3">{body}</div>
                                    )}
                                </motion.li>
                            );
                        })}
                </ul>

                {mode === 'sample' && (
                    <p className="border-t border-border px-4 py-2.5 text-[11px] leading-relaxed text-dim">
                        Sample events — the live API is idle. Trigger a GitHub event and it streams
                        here in real time.
                    </p>
                )}
            </div>

            <div className="mt-4">
                <Highlights items={HIGHLIGHTS} />
            </div>
        </ShowcaseCard>
    );
}
