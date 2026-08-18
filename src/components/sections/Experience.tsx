'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const SKILL_ICONS: Record<string, { icon: string; label: string }> = {
    'TypeScript': {
        icon: '/icons/typescript-original.svg',
        label: 'TypeScript',
    },
    'Golang': {
        icon: '/icons/go-original-wordmark.svg',
        label: 'Go',
    },
    'JavaScript': {
        icon: '/icons/javascript-original.svg',
        label: 'JavaScript',
    },
    'HTML & CSS': {
        icon: '/icons/html5-original.svg',
        label: 'HTML & CSS',
    },
    'Python': {
        icon: '/icons/python-original.svg',
        label: 'Python',
    },
    'Unity': {
        icon: '/icons/unity-original.svg',
        label: 'Unity',
    },
    'Godot': {
        icon: '/icons/godot-original.svg',
        label: 'Godot',
    },
};

function SkillBadge({ name, isActive }: { name: string; isActive: boolean }) {
    const skill = SKILL_ICONS[name];
    if (!skill) return (
        <span className={`inline-flex items-center rounded-md border px-3 py-1.5 font-mono text-[11px] font-medium transition-all duration-200 ${isActive
            ? 'bg-[var(--surface-2)] border-[var(--accent)]/50 text-[var(--text-primary)]'
            : 'bg-[var(--surface)] border-[var(--border-2)] text-[var(--text-muted)]'
            }`}>
            {name}
        </span>
    );

    return (
        <span className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[11px] font-medium transition-all duration-200 ${isActive
            ? 'bg-[var(--surface-2)] border-[var(--accent)]/50 text-[var(--text-primary)]'
            : 'bg-[var(--surface)] border-[var(--border-2)] text-[var(--text-muted)]'
            }`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={skill.icon}
                alt={skill.label}
                className={`h-3.5 w-3.5 object-contain transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-65'}`}
                loading="lazy"
            />
            {skill.label}
        </span>
    );
}

export default function Experience() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const experiences = [
        {
            period: '2024 — Present',
            roleLabel: 'exp1_role_label',
            title: 'exp1_title',
            desc: 'exp1_desc',
            skills: ['TypeScript', 'Golang', 'JavaScript', 'HTML & CSS', 'Python'],
        },
        {
            period: '2022 — 2024',
            roleLabel: 'exp2_role_label',
            title: 'exp2_title',
            desc: 'exp2_desc',
            skills: ['Unity', 'Godot'],
        },
    ];

    return (
        <motion.section
            id="experience"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            aria-label="Work experience"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4 }}
        >
            {/* Mobile sticky header */}
            <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-[var(--bg)]/95 px-6 py-4 backdrop-blur-sm border-b border-[var(--border)] md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:border-0 lg:bg-transparent lg:backdrop-blur-none">
                <h2 className="flex items-baseline gap-3">
                    <span className="section-numeral text-2xl lg:text-3xl">02</span>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">{t('nav_experience')}</span>
                    <span className="hidden h-px flex-1 bg-[var(--border)] lg:block" />
                </h2>
            </div>

            <ol className="relative space-y-4 before:absolute before:bottom-0 before:left-[105px] before:top-0 before:hidden before:w-px before:bg-[var(--border)] lg:before:block">
                {experiences.map((exp, index) => (
                    <motion.li
                        key={index}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                        onFocusCapture={() => setActiveIndex(index)}
                        onBlurCapture={() => setActiveIndex(null)}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className="grid gap-3 lg:grid-cols-[88px_1fr] lg:gap-6">
                            <div className="relative hidden lg:block">
                                <p className={`pt-1 font-mono text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200 ${activeIndex === index ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                                    {exp.period}
                                </p>
                                <span className={`absolute right-[-23px] top-2 h-3 w-3 rounded-full border-2 transition-all duration-200 ${activeIndex === index ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border-2)] bg-[var(--surface)]'}`} />
                            </div>

                            <div className={`rounded-xl border p-6 transition-all duration-200 ${activeIndex === null || activeIndex === index
                                ? 'border-[var(--border-2)] bg-[var(--surface-2)]'
                                : 'border-[var(--border)] bg-[var(--surface)] opacity-75'
                                }`}>

                                <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--text-muted)] lg:hidden">
                                    {exp.period}
                                </p>

                                <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]">
                                    {t(exp.roleLabel)}
                                </p>

                                <h3 className="mb-3 font-serif text-lg text-[var(--text-primary)]">
                                    {t(exp.title)}
                                </h3>

                                <p className="mb-5 text-sm leading-relaxed text-[var(--text-body)]">
                                    {t(exp.desc)}
                                </p>

                                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                                    {exp.skills.map((skill, i) => (
                                        <li key={i}>
                                            <SkillBadge
                                                name={skill}
                                                isActive={activeIndex === null || activeIndex === index}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ol>

            <div className="mt-6">
                <a
                    href="https://github.com/Bannawat01"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-[var(--accent)] hover:text-[var(--accent-soft)] transition-colors"
                >
                    {t('view_github')}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>
        </motion.section>
    );
}
