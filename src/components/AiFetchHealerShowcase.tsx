'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    ArrowUpRight,
    ShieldCheck,
    Zap,
    CircleCheck,
    Rocket,
    Wrench,
} from 'lucide-react';

const REPO_URL = 'https://github.com/Bannawat01/ai-fetch-healer';
const NPM_URL = 'https://www.npmjs.com/package/ai-fetch-healer';
const CARD_ACCENT = '#2ee6a6';

const HIGHLIGHTS = [
    {
        Icon: ShieldCheck,
        color: '#2ee6a6',
        title: 'Privacy-by-design',
        desc: 'Masks email, password, token & other PII before any payload reaches the LLM.',
    },
    {
        Icon: Zap,
        color: '#f0c274',
        title: 'Heuristic cache',
        desc: 'O(1) lookup, capacity 1000 — repeat error patterns skip the LLM call entirely.',
    },
    {
        Icon: CircleCheck,
        color: '#2ee6a6',
        title: 'Never throws',
        desc: 'Healing failure always falls back to the original response — caller never breaks.',
    },
    {
        Icon: Rocket,
        color: '#ff7a90',
        title: 'Production-tested',
        desc: 'Caught a deprecated default model (404) in prod, shipped the fix as v1.1.0 same day — 44/44 tests green.',
    },
];

// Simulated healing run — { user_name: "Ada" } fails schema, AI rewrites the key, retry succeeds.
const DEMO_STEPS = [
    {
        key: 'fail',
        label: 'Request fails',
        status: '422',
        color: '#ff7a90',
        code: '{ "user_name": "Ada" }',
    },
    {
        key: 'mask',
        label: 'PII masked, sent to AI',
        status: 'analyzing',
        color: '#2ee6a6',
        code: '{ "user_name": "***" } → LLM',
    },
    {
        key: 'heal',
        label: 'Healing rule applied',
        status: 'patched',
        color: '#f0c274',
        code: '{ "full_name": "Ada" }',
    },
    {
        key: 'retry',
        label: 'Retry succeeds',
        status: '200',
        color: '#2ee6a6',
        code: '{ "full_name": "Ada" } ✓',
    },
];

export default function AiFetchHealerShowcase() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setStep((s) => (s + 1) % DEMO_STEPS.length), 2200);
        return () => clearInterval(id);
    }, []);

    const current = DEMO_STEPS[step];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
            id="ai-fetch-healer"
            className="showcase-card mb-3 p-5 scroll-mt-16 lg:scroll-mt-24"
            style={{ '--card-accent': CARD_ACCENT } as CSSProperties}
        >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="font-serif text-lg text-[var(--text-primary)]">ai-fetch-healer</span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#5eeec0]">
                            <Package className="h-3 w-3" />
                            npm · v1.1.0
                        </span>
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-[var(--text-muted)]">
                        Request <span className="text-[var(--text-faint)]">→</span> AI <span className="text-[var(--text-faint)]">→</span> Apply <span className="text-[var(--text-faint)]">→</span> Retry
                    </p>
                </div>
                <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="View ai-fetch-healer on GitHub"
                    className="group inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-2)] bg-[var(--surface-2)] text-[var(--text-muted)] transition-all hover:border-[#2ee6a6]/60 hover:text-[#2ee6a6] sm:h-9 sm:w-9"
                >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>

            <p className="mb-2 text-sm leading-relaxed text-[var(--text-body)]">
                Runtime API auto-healing wrapper around <code className="text-[var(--text-primary)]">fetch</code> —
                catches 400/422 schema mismatches, asks an LLM (Gemini, OpenRouter, Groq, Ollama) to
                generate a healing rule, patches the payload, and retries automatically.
            </p>
            <a
                href={NPM_URL}
                target="_blank"
                rel="noreferrer"
                className="mb-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-[#e2716f] transition-colors hover:text-[#ff9f9d]"
            >
                npm install ai-fetch-healer
                <ArrowUpRight className="h-3 w-3" />
            </a>

            {/* Mini healing demo */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)]/60">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-3.5 py-2.5">
                    <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        <Wrench className="h-3.5 w-3.5 text-[#2ee6a6]" />
                        Healing Run — simulated
                    </span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--text-faint)]">
                        demo
                    </span>
                </div>

                <div className="px-3.5 py-3.5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.key}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-3"
                        >
                            <span
                                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold"
                                style={{
                                    borderColor: `${current.color}44`,
                                    backgroundColor: `${current.color}14`,
                                    color: current.color,
                                }}
                            >
                                {step + 1}
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-[13px] leading-snug text-[var(--text-primary)]">
                                    {current.label}
                                    <span
                                        className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                        style={{ backgroundColor: `${current.color}1a`, color: current.color }}
                                    >
                                        {current.status}
                                    </span>
                                </span>
                                <span className="mt-1 block truncate font-mono text-[12px] text-[var(--text-muted)]">
                                    {current.code}
                                </span>
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Step dots */}
                    <div className="mt-3 flex items-center gap-1.5">
                        {DEMO_STEPS.map((s, i) => (
                            <span
                                key={s.key}
                                className="h-1.5 flex-1 rounded-full transition-colors duration-300"
                                style={{ backgroundColor: i <= step ? s.color : 'var(--border)' }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Highlights — definition list, not an icon-circle feature grid */}
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-[var(--border)] pt-4 sm:grid-cols-2">
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
        </motion.div>
    );
}
