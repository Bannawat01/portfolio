'use client';

/**
 * One header shape for every section.
 *
 * There is deliberately no 01/02/03 numeral: About / Experience / Skills /
 * Projects is a set, not a sequence, so numbering would imply an order the
 * content does not have. The right-hand slot carries a real count or fact
 * about the section instead — information, not ornament.
 */
export default function SectionHeader({
    title,
    meta,
}: {
    title: string;
    meta?: string;
}) {
    return (
        <div className="mb-8 flex items-center gap-4">
            <h2 className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
                <span
                    aria-hidden="true"
                    className="h-3.5 w-[3px] rounded-full bg-accent-vivid shadow-[0_0_8px_rgb(var(--vivid-rgb)/0.5)]"
                />
                {title}
            </h2>
            <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            {meta && (
                <span className="shrink-0 font-mono text-[10.5px] text-dim tabular-nums">{meta}</span>
            )}
        </div>
    );
}
