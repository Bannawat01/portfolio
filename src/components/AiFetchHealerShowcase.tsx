'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, CircleCheck, Rocket, Wrench } from 'lucide-react';
import ShowcaseCard, { Highlights } from '@/components/ShowcaseCard';

const REPO_URL = 'https://github.com/Bannawat01/ai-fetch-healer';
const NPM_URL = 'https://www.npmjs.com/package/ai-fetch-healer';

const HIGHLIGHTS = [
    {
        Icon: ShieldCheck,
        title: 'Privacy by design',
        desc: 'Masks email, password, token, and other PII before any payload reaches the LLM.',
    },
    {
        Icon: Zap,
        title: 'Heuristic cache',
        desc: 'O(1) lookup, capacity 1000 — repeat error patterns skip the LLM call entirely.',
    },
    {
        Icon: CircleCheck,
        title: 'Never throws',
        desc: 'A failed heal falls back to the original response, so the caller never breaks.',
    },
    {
        Icon: Rocket,
        title: 'Production-tested',
        desc: 'Caught a deprecated default model (404) in prod and shipped the fix as v1.1.0 the same day — 44/44 tests green.',
    },
];

// Simulated run: { user_name: "Ada" } fails schema validation, the LLM rewrites
// the key, the retry succeeds. Labelled "simulated" in the UI.
const STEPS = [
    { key: 'fail', label: 'Request fails', status: '422', code: '{ "user_name": "Ada" }' },
    { key: 'mask', label: 'PII masked, sent to the model', status: 'analyzing', code: '{ "user_name": "***" } → LLM' },
    { key: 'heal', label: 'Healing rule applied', status: 'patched', code: '{ "full_name": "Ada" }' },
    { key: 'retry', label: 'Retry succeeds', status: '200', code: '{ "full_name": "Ada" } ✓' },
];

export default function AiFetchHealerShowcase() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // ~2s cadence — an interval is right here; this does not need frame accuracy.
        const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2200);
        return () => clearInterval(id);
    }, []);

    const current = STEPS[step];

    return (
        <ShowcaseCard
            id="ai-fetch-healer"
            name="ai-fetch-healer"
            status="shipped"
            meta="npm · v1.1.0 · Request → AI → Apply → Retry"
            href={REPO_URL}
            hrefLabel="View ai-fetch-healer on GitHub"
        >
            <p className="max-w-2xl text-[14px] leading-relaxed text-body">
                A runtime auto-healing wrapper around <code className="font-mono text-[13px] text-ink">fetch</code> —
                catches 400/422 schema mismatches, asks an LLM (Gemini, OpenRouter, Groq, Ollama)
                for a healing rule, patches the payload, and retries.
            </p>

            <a
                href={NPM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 mb-4 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-[11.5px] text-ink transition-colors hover:border-[var(--accent-line)] hover:text-accent"
            >
                npm install ai-fetch-healer
                <ArrowUpRight className="h-3 w-3" />
            </a>

            <div className="inset overflow-hidden">
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
                    <span className="flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
                        <Wrench className="h-3.5 w-3.5 text-accent" />
                        Healing run
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                        simulated
                    </span>
                </div>

                <div className="px-4 py-3.5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.key}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.22 }}
                            className="flex items-center gap-3"
                        >
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-border bg-surface font-mono text-[10px] font-semibold text-accent tabular-nums">
                                {step + 1}
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="flex flex-wrap items-center gap-2 text-[13px] leading-snug text-ink">
                                    {current.label}
                                    <span className="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent">
                                        {current.status}
                                    </span>
                                </span>
                                <span className="mt-1 block truncate font-mono text-[11.5px] text-muted">
                                    {current.code}
                                </span>
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-3.5 flex items-center gap-1.5" aria-hidden="true">
                        {STEPS.map((s, i) => (
                            <span
                                key={s.key}
                                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-accent' : 'bg-surface-3'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <Highlights items={HIGHLIGHTS} />
            </div>
        </ShowcaseCard>
    );
}
