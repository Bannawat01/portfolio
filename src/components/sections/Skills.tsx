'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const SKILL_LOGOS: Record<string, { icon: string; label: string }> = {
    TypeScript: {
        icon: '/icons/typescript-original.svg',
        label: 'TypeScript',
    },
    Golang: {
        icon: '/icons/go-original-wordmark.svg',
        label: 'Golang',
    },
    JavaScript: {
        icon: '/icons/javascript-original.svg',
        label: 'JavaScript',
    },
    Python: {
        icon: '/icons/python-original.svg',
        label: 'Python',
    },
    'Node.js': {
        icon: '/icons/nodejs-original.svg',
        label: 'Node.js',
    },
    PostgreSQL: {
        icon: '/icons/postgresql-original.svg',
        label: 'PostgreSQL',
    },
    Unity: {
        icon: '/icons/unity-original.svg',
        label: 'Unity',
    },
    Godot: {
        icon: '/icons/godot-original.svg',
        label: 'Godot',
    },
    'C#': {
        icon: '/icons/csharp-original.svg',
        label: 'C#',
    },
    Git: {
        icon: '/icons/git-original.svg',
        label: 'Git',
    },
    Docker: {
        icon: '/icons/docker-original.svg',
        label: 'Docker',
    },
    Figma: {
        icon: '/icons/figma-original.svg',
        label: 'Figma',
    },
};

const SKILL_GROUPS = [
    { titleKey: 'skills_group_core', skills: ['TypeScript', 'Golang', 'JavaScript', 'Python'] },
    { titleKey: 'skills_group_frontend', skills: ['TypeScript', 'JavaScript', 'Figma'] },
    { titleKey: 'skills_group_backend', skills: ['Golang', 'Node.js', 'PostgreSQL', 'Docker'] },
    { titleKey: 'skills_group_gamedev', skills: ['Unity', 'Godot', 'C#'] },
    { titleKey: 'skills_group_tooling', skills: ['Git', 'Docker', 'Figma'] },
    { titleKey: 'skills_group_mindset', skills: ['Performance', 'Clean Code', 'Game Feel'] },
];

function SkillTag({ name }: { name: string }) {
    const skill = SKILL_LOGOS[name];

    if (!skill) {
        return (
            <span className="inline-flex items-center rounded-md border border-[var(--border-2)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[11px] font-medium text-[var(--text-body)] transition-colors duration-200 hover:border-[var(--accent)]/60">
                {name}
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-2 rounded-md border border-[var(--border-2)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[11px] font-medium text-[var(--text-body)] transition-all duration-200 hover:border-[var(--accent)]/60 hover:bg-[var(--surface-2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={skill.icon} alt={skill.label} className="h-3.5 w-3.5 object-contain" loading="lazy" />
            {skill.label}
        </span>
    );
}

export default function Skills() {
    const { t } = useLanguage();

    return (
        <motion.section
            id="skills"
            className="relative mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            aria-label="Skills"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4 }}
        >
            <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-[var(--bg)]/95 px-6 py-4 backdrop-blur-sm border-b border-[var(--border)] md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:border-0 lg:bg-transparent lg:backdrop-blur-none">
                <h2 className="flex items-baseline gap-3">
                    <span className="section-numeral text-2xl lg:text-3xl">03</span>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">{t('nav_skills')}</span>
                    <span className="hidden h-px flex-1 bg-[var(--border)] lg:block" />
                </h2>
            </div>

            {/* Spec-sheet layout — one row per group, flat tags, no rainbow bento tiles */}
            <div>
                {SKILL_GROUPS.map((group, index) => (
                    <motion.div
                        key={group.titleKey}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="grid grid-cols-1 gap-3 border-b border-[var(--border)] py-5 first:pt-0 last:border-0 md:grid-cols-[160px_1fr] md:items-baseline md:gap-6"
                    >
                        <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            {t(group.titleKey)}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                                <SkillTag key={skill} name={skill} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
