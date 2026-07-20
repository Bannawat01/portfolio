'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    ArrowUpRight,
    ArrowRight,
    ShieldCheck,
    Zap,
    CircleCheck,
    Rocket,
    Send,
    Brain,
    Wrench,
    RefreshCw,
} from 'lucide-react';

const REPO_URL = 'https://github.com/Bannawat01/ai-fetch-healer';
const NPM_URL = 'https://www.npmjs.com/package/ai-fetch-healer';

const PIPELINE = [
    { label: 'Request', Icon: Send },
    { label: 'AI', Icon: Brain },
    { label: 'Apply', Icon: Wrench },
    { label: 'Retry', Icon: RefreshCw },
];

const HIGHLIGHTS = [
    {
        Icon: ShieldCheck,
        color: '#2ee6a6',
        title: 'Privacy-by-design',
        desc: 'Masks email, password, token & other PII before any payload reaches the LLM.',
    },
    {
        Icon: Zap,
        color: '#f5b955',
        title: 'Heuristic cache',
        desc: 'O(1) lookup, capacity 1000 — repeat error patterns skip the LLM call entirely.',
    },
    {
        Icon: CircleCheck,
        color: '#8b7fff',
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
        color: '#8b7fff',
        code: '{ "user_name": "***" } → LLM',
    },
    {
        key: 'heal',
        label: 'Healing rule applied',
        status: 'patched',
        color: '#f5b955',
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
            className="project-card mb-3 rounded-xl p-5 ring-1 ring-[#2ee6a6]/25 shadow-[0_0_0_1px_rgba(46,230,166,0.10),0_12px_40px_rgba(46,230,166,0.08)]"
        >
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-sm font-semibold text-[#f0f0f8]">ai-fetch-healer</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2ee6a6]/45 bg-[#2ee6a6]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#5eeec0] sm:text-[11px]">
                            <Package className="h-3 w-3" />
                            npm package · v1.1.0
                        </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#b8b8cc]">
                        Runtime API auto-healing wrapper around <code className="text-[#dcdcea]">fetch</code> —
                        catches 400/422 schema mismatches, asks an LLM (Gemini, OpenRouter, Groq, Ollama) to
                        generate a healing rule, patches the payload, and retries automatically.
                    </p>
                </div>
                <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="View ai-fetch-healer on GitHub"
                    className="group inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2b2b43] bg-[#161625] text-[#5d5d80] transition-all hover:border-[#3c3c5b] hover:text-[#2ee6a6] sm:h-9 sm:w-9"
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
                    href={NPM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-[#cb3837]/30 bg-[#cb3837]/10 px-2 py-1 text-[11px] font-medium text-[#e2716f] transition-colors hover:border-[#cb3837]/60 hover:text-[#ff9f9d]"
                >
                    npm install ai-fetch-healer
                    <ArrowUpRight className="h-3 w-3" />
                </a>
            </div>

            {/* Mini healing demo */}
            <div className="rounded-lg border border-[#242436] bg-[#0f0f18]/60">
                <div className="flex items-center justify-between border-b border-[#20202f] px-3.5 py-2.5">
                    <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6e6e8a]">
                        <Wrench className="h-3.5 w-3.5 text-[#2ee6a6]" />
                        Healing Run — simulated
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#4a4a68]">
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
                                <span className="block truncate text-[13px] leading-snug text-[#dcdcea]">
                                    {current.label}
                                    <span
                                        className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                        style={{ backgroundColor: `${current.color}1a`, color: current.color }}
                                    >
                                        {current.status}
                                    </span>
                                </span>
                                <span className="mt-1 block truncate font-mono text-[12px] text-[#8f8fa8]">
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
                                style={{ backgroundColor: i <= step ? s.color : '#242436' }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {HIGHLIGHTS.map(({ Icon, color, title, desc }) => (
                    <li
                        key={title}
                        className="flex items-start gap-2.5 rounded-lg border border-[#20202f] bg-[#12121c] p-3"
                    >
                        <span
                            className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${color}14`, color }}
                        >
                            <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#f0f0f8]">{title}</p>
                            <p className="mt-0.5 text-[11.5px] leading-relaxed text-[#8f8fa8]">{desc}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
