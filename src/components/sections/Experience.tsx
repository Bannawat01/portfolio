'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeader from '@/components/SectionHeader';

const TECH_ICONS: Record<string, string> = {
    TypeScript: '/icons/typescript-original.svg',
    Go: '/icons/go-original-wordmark.svg',
    JavaScript: '/icons/javascript-original.svg',
    'HTML & CSS': '/icons/html5-original.svg',
    Python: '/icons/python-original.svg',
    Unity: '/icons/unity-original.svg',
    Godot: '/icons/godot-original.svg',
};

// Shared timeline the duration bars are measured against. Computed once at
// module scope so the server and client render identical markup.
const TL_START = 2022;
const TL_END = new Date().getFullYear();
const TL_SPAN = Math.max(1, TL_END - TL_START);

const ROLES = [
    {
        from: 2024,
        to: TL_END,
        period: `2024 — ${new Date().getFullYear()}`,
        labelKey: 'exp1_role_label',
        titleKey: 'exp1_title',
        descKey: 'exp1_desc',
        tech: ['TypeScript', 'Go', 'JavaScript', 'HTML & CSS', 'Python'],
        current: true,
    },
    {
        from: 2022,
        to: 2024,
        period: '2022 — 2024',
        labelKey: 'exp2_role_label',
        titleKey: 'exp2_title',
        descKey: 'exp2_desc',
        tech: ['Unity', 'Godot'],
        current: false,
    },
];

/**
 * The duration bar reuses the status-strip vocabulary for the one thing in this
 * section that is genuinely quantitative: how long each role has run, measured
 * against the same 2022–present track. It encodes real data — it is not a
 * proficiency meter, which would be invented.
 */
function DurationBar({ from, to, current }: { from: number; to: number; current: boolean }) {
    const left = ((from - TL_START) / TL_SPAN) * 100;
    const width = Math.max(4, ((to - from) / TL_SPAN) * 100);

    return (
        <div
            className="relative h-1 w-full overflow-hidden rounded-full bg-surface-3"
            aria-hidden="true"
        >
            <span
                className={`absolute inset-y-0 rounded-full ${current ? 'bg-accent-vivid shadow-[0_0_10px_rgb(var(--vivid-rgb)/0.55)]' : 'bg-border-2'}`}
                style={{ left: `${left}%`, width: `${width}%` }}
            />
        </div>
    );
}

export default function Experience() {
    const { t } = useLanguage();

    return (
        <motion.section
            id="experience"
            aria-label={t('nav_experience')}
            className="scroll-mt-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
        >
            <SectionHeader title={t('nav_experience')} meta={`${TL_START}–${TL_END}`} />

            <ol className="space-y-3">
                {ROLES.map((role) => (
                    <li key={role.titleKey}>
                        <article className="card card-hover p-6">
                            <DurationBar from={role.from} to={role.to} current={role.current} />

                            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-dim tabular-nums">
                                    {role.period}
                                </span>
                                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-accent">
                                    {t(role.labelKey)}
                                </span>
                            </div>

                            <h3 className="mt-2.5 font-display text-[1.2rem] font-semibold tracking-[-0.01em] text-ink">
                                {t(role.titleKey)}
                            </h3>

                            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-body">
                                {t(role.descKey)}
                            </p>

                            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t('tech_label')}>
                                {role.tech.map((name) => (
                                    <li key={name}>
                                        <span className="chip font-mono">
                                            {TECH_ICONS[name] && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={TECH_ICONS[name]}
                                                    alt=""
                                                    className="h-3.5 w-3.5 object-contain"
                                                    loading="lazy"
                                                />
                                            )}
                                            {name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </li>
                ))}
            </ol>
        </motion.section>
    );
}
