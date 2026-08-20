'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import StatusLabel, { type Status } from '@/components/StatusDot';

/**
 * One shell for all four hand-built showcases: title + status, a pipeline or
 * meta line, an outbound link, the body, and an optional footnote.
 *
 * Keeping this in one place is what stops each project card from growing its
 * own layout and its own bespoke CSS — which is how these got heavy last time.
 */
export default function ShowcaseCard({
    id,
    name,
    status,
    meta,
    href,
    hrefLabel,
    children,
    footnote,
}: {
    id?: string;
    name: string;
    status: Status;
    meta?: ReactNode;
    href: string;
    hrefLabel: string;
    children: ReactNode;
    footnote?: ReactNode;
}) {
    return (
        <motion.article
            id={id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
            className="card card-hover scroll-mt-8 p-6"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <h3 className="font-display text-[1.3rem] font-semibold tracking-[-0.02em] text-ink">
                            {name}
                        </h3>
                        <StatusLabel status={status} />
                    </div>
                    {meta && (
                        <p className="mt-2 font-mono text-[11px] text-muted">{meta}</p>
                    )}
                </div>

                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={hrefLabel}
                    title={hrefLabel}
                    className="group inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 text-dim transition-all duration-200 hover:border-[var(--accent-line)] hover:bg-accent-tint hover:text-accent"
                >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>

            <div className="mt-5">{children}</div>

            {footnote && (
                <p className="mt-4 border-t border-border pt-3 text-[11px] leading-relaxed text-dim">
                    {footnote}
                </p>
            )}
        </motion.article>
    );
}

/** Shared two-column definition list used by the highlight blocks. */
export function Highlights({
    items,
}: {
    items: { Icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[];
}) {
    return (
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3.5 border-t border-border pt-4 sm:grid-cols-2">
            {items.map(({ Icon, title, desc }) => (
                <div key={title}>
                    <dt className="flex items-center gap-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink-2">
                        <Icon className="h-3 w-3 text-accent" />
                        {title}
                    </dt>
                    <dd className="mt-1 text-[12.5px] leading-relaxed text-muted">{desc}</dd>
                </div>
            ))}
        </dl>
    );
}
