'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeader from '@/components/SectionHeader';

const ICONS: Record<string, string> = {
    TypeScript: '/icons/typescript-original.svg',
    Golang: '/icons/go-original-wordmark.svg',
    JavaScript: '/icons/javascript-original.svg',
    Python: '/icons/python-original.svg',
    'Node.js': '/icons/nodejs-original.svg',
    PostgreSQL: '/icons/postgresql-original.svg',
    Unity: '/icons/unity-original.svg',
    Godot: '/icons/godot-original.svg',
    'C#': '/icons/csharp-original.svg',
    Git: '/icons/git-original.svg',
    Docker: '/icons/docker-original.svg',
    Figma: '/icons/figma-original.svg',
};

const GROUPS = [
    { key: 'skills_group_gamedev', items: ['Unity', 'Godot', 'C#', 'Game systems', 'Save / Load', 'Event-driven architecture'] },
    { key: 'skills_group_backend', items: ['Golang', 'Node.js', 'PostgreSQL', 'REST APIs', 'Authentication', 'Real-time systems'] },
    { key: 'skills_group_frontend', items: ['TypeScript', 'JavaScript', 'HTML & CSS', 'Responsive UI'] },
    { key: 'skills_group_tooling', items: ['Git', 'Docker', 'Python', 'Figma', 'Debugging'] },
];

const DISTINCT = new Set(GROUPS.flatMap((g) => g.items)).size;

/**
 * Grouped tags, not proficiency meters. A "85% TypeScript" bar would be a
 * number nobody measured; the honest signal is which tools appear in which
 * part of the work, which the grouping already carries.
 */
export default function Skills() {
    const { t } = useLanguage();

    return (
        <motion.section
            id="skills"
            aria-label={t('nav_skills')}
            className="scroll-mt-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
        >
            <SectionHeader title={t('nav_skills')} meta={t('meta_skills').replace('{n}', String(DISTINCT))} />

            <dl className="card divide-y divide-[var(--border)]">
                {GROUPS.map((group) => (
                    <div
                        key={group.key}
                        className="grid grid-cols-1 gap-2.5 px-6 py-4.5 md:grid-cols-[150px_1fr] md:items-baseline md:gap-5"
                    >
                        <dt className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted">
                            {t(group.key)}
                        </dt>
                        <dd className="flex flex-wrap gap-1.5">
                            {group.items.map((name) => (
                                <span key={name} className="chip font-mono">
                                    {ICONS[name] && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={ICONS[name]}
                                            alt=""
                                            className="h-3.5 w-3.5 object-contain"
                                            loading="lazy"
                                        />
                                    )}
                                    {name}
                                </span>
                            ))}
                        </dd>
                    </div>
                ))}
            </dl>
        </motion.section>
    );
}
