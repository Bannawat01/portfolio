'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    Bell,
    ShieldCheck,
    CreditCard,
    BadgeCheck,
} from 'lucide-react';

const SITE_URL = 'https://wakeful.dev';
const CARD_ACCENT = '#38bdf8';

const HIGHLIGHTS = [
    {
        Icon: ShieldCheck,
        color: '#38bdf8',
        title: 'Multi-protocol checks',
        desc: 'HTTP, DNS, and SSL-expiry monitoring, plus heartbeat pings for scheduled jobs.',
    },
    {
        Icon: Bell,
        color: '#f0c274',
        title: 'Multi-channel alerts',
        desc: 'Email, LINE, Telegram, and outbound webhooks — an incident reaches you where you actually look.',
    },
    {
        Icon: BadgeCheck,
        color: '#2ee6a6',
        title: 'Public status pages',
        desc: 'Shareable status pages and embeddable uptime badges for every monitor.',
    },
    {
        Icon: CreditCard,
        color: '#38bdf8',
        title: 'Stripe billing',
        desc: 'Free and paid tiers with different check intervals — real subscriptions, real webhooks.',
    },
];

export default function WakefulShowcase() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
            className="showcase-card mb-3 p-5"
            style={{ '--card-accent': CARD_ACCENT } as CSSProperties}
        >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="font-serif text-lg text-[var(--text-primary)]">Wakeful</span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#7dd3fc]">
                            <span className="relative inline-flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38bdf8] opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7dd3fc]" />
                            </span>
                            Production
                        </span>
                    </div>
                    <a
                        href={SITE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-[#7dd3fc] hover:text-[#bae6fd] transition-colors"
                    >
                        wakeful.dev
                        <ArrowUpRight className="h-3 w-3" />
                    </a>
                </div>
                <a
                    href={SITE_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit wakeful.dev"
                    className="group inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-2)] bg-[var(--surface-2)] text-[var(--text-muted)] transition-all hover:border-[#38bdf8]/60 hover:text-[#38bdf8] sm:h-9 sm:w-9"
                >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-[var(--text-body)]">
                An uptime-monitoring SaaS I built and run in production — HTTP/DNS/SSL checks,
                incident tracking, multi-channel alerts, and public status pages. Real users,
                real billing, real on-call.
            </p>

            {/* Highlights — definition list, not an icon-circle feature grid */}
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-[var(--border)] pt-4 sm:grid-cols-2">
                {HIGHLIGHTS.map(({ Icon, color, title, desc }) => (
                    <div key={title}>
                        <dt className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
                            <Icon className="h-3 w-3" />
                            {title}
                        </dt>
                        <dd className="mt-1 text-[12px] leading-relaxed text-[var(--text-muted)]">{desc}</dd>
                    </div>
                ))}
            </dl>

            <p className="mt-4 border-t border-[var(--border)] pt-3 text-[10.5px] leading-relaxed text-[var(--text-faint)]">
                Closed-source — built and operated as a real product, not a public repo.
            </p>
        </motion.div>
    );
}
