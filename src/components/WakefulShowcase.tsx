'use client';

import { motion } from 'framer-motion';
import {
    Activity,
    ArrowUpRight,
    ArrowRight,
    Bell,
    BellRing,
    Globe,
    Radar,
    ShieldCheck,
    CreditCard,
    BadgeCheck,
} from 'lucide-react';

const SITE_URL = 'https://wakeful.dev';

const PIPELINE = [
    { label: 'Monitor', Icon: Radar },
    { label: 'Check', Icon: Activity },
    { label: 'Alert', Icon: BellRing },
    { label: 'Status Page', Icon: Globe },
];

const HIGHLIGHTS = [
    {
        Icon: ShieldCheck,
        color: '#38bdf8',
        title: 'Multi-protocol checks',
        desc: 'HTTP, DNS, and SSL-expiry monitoring, plus heartbeat pings for scheduled jobs.',
    },
    {
        Icon: Bell,
        color: '#f5b955',
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
        color: '#8b7fff',
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
            className="project-card mb-3 rounded-xl p-5 ring-1 ring-[#38bdf8]/25 shadow-[0_0_0_1px_rgba(56,189,248,0.10),0_12px_40px_rgba(56,189,248,0.08)]"
        >
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-sm font-semibold text-[#f0f0f8]">Wakeful</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#38bdf8]/45 bg-[#38bdf8]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#7dd3fc] sm:text-[11px]">
                            <span className="relative inline-flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38bdf8] opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7dd3fc]" />
                            </span>
                            Production · wakeful.dev
                        </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#b8b8cc]">
                        An uptime-monitoring SaaS I built and run in production — HTTP/DNS/SSL checks,
                        incident tracking, multi-channel alerts, and public status pages. Real users,
                        real billing, real on-call.
                    </p>
                </div>
                <a
                    href={SITE_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit wakeful.dev"
                    className="group inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2b2b43] bg-[#161625] text-[#5d5d80] transition-all hover:border-[#3c3c5b] hover:text-[#38bdf8] sm:h-9 sm:w-9"
                >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>

            {/* Pipeline */}
            <div className="mb-4 flex flex-wrap items-center gap-1.5">
                {PIPELINE.map((stage, i) => (
                    <span key={stage.label} className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a3f] bg-[#161622] px-2 py-1 text-[11px] font-medium text-[#9a9ac0]">
                            <stage.Icon className="h-3 w-3" />
                            {stage.label}
                        </span>
                        {i < PIPELINE.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-[#4a4a68]" />
                        )}
                    </span>
                ))}
                <a
                    href={SITE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-2 py-1 text-[11px] font-medium text-[#7dd3fc] transition-colors hover:border-[#38bdf8]/60 hover:text-[#bae6fd]"
                >
                    wakeful.dev
                    <ArrowUpRight className="h-3 w-3" />
                </a>
            </div>

            {/* Highlights */}
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {HIGHLIGHTS.map(({ Icon, color, title, desc }) => (
                    <li
                        key={title}
                        className="flex items-start gap-2.5 rounded-lg border border-[#242436] bg-[#0f0f18]/60 p-3"
                    >
                        <span
                            className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                            style={{ borderColor: `${color}44`, backgroundColor: `${color}14`, color }}
                        >
                            <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#dcdcea]">
                                {title}
                            </p>
                            <p className="mt-1 text-[11.5px] leading-relaxed text-[#8f8fa8]">{desc}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <p className="mt-3.5 text-[10.5px] leading-relaxed text-[#5a5a78]">
                Closed-source — built and operated as a real product, not a public repo.
            </p>
        </motion.div>
    );
}
