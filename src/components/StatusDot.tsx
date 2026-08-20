'use client';

import { useLanguage } from '@/context/LanguageContext';

/**
 * The page's signature marker. Every project here genuinely has an operational
 * state, so state is shown the way a status page shows it — but by dot
 * treatment rather than by hue, so the page keeps one accent colour and stays
 * readable without colour vision. Styles live in globals.css under `.dot-*`.
 */
export type Status = 'live' | 'up' | 'shipped' | 'wip';

const LABEL_KEY: Record<Status, string> = {
    live: 'status_live',
    up: 'status_up',
    shipped: 'status_shipped',
    wip: 'status_wip',
};

export function StatusDot({ status }: { status: Status }) {
    return <span className={`dot dot-${status}`} aria-hidden="true" />;
}

export default function StatusLabel({
    status,
    className = '',
}: {
    status: Status;
    className?: string;
}) {
    const { t } = useLanguage();
    const label = t(LABEL_KEY[status]);

    return (
        <span
            className={`inline-flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] ${status === 'wip' ? 'text-muted' : 'text-accent'
                } ${className}`}
        >
            <StatusDot status={status} />
            {label}
        </span>
    );
}
