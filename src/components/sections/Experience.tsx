'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SKILL_ICONS: Record<string, { icon: string; label: string }> = {
    'TypeScript': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
        label: 'TypeScript',
    },
    'Golang': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg',
        label: 'Go',
    },
    'JavaScript': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        label: 'JavaScript',
    },
    'HTML & CSS': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        label: 'HTML & CSS',
    },
    'Python': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        label: 'Python',
    },
    'Unity': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
        label: 'Unity',
    },
    'Godot': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/godot/godot-original.svg',
        label: 'Godot',
    },
};

function SkillBadge({ name }: { name: string }) {
    const skill = SKILL_ICONS[name];
    if (!skill) return (
        <span className="inline-flex items-center rounded-md bg-[#1a1a26] border border-[#2e2e45] px-3 py-1.5 text-xs font-medium text-[#b8b8cc]">
            {name}
        </span>
    );

    return (
        <span className="group inline-flex items-center gap-2 rounded-md bg-[#1a1a26] border border-[#2e2e45] px-3 py-1.5 text-xs font-medium text-[#b8b8cc] hover:border-[#3e3e58] hover:text-[#f0f0f8] transition-all duration-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={skill.icon}
                alt={skill.label}
                className="w-4 h-4 object-contain"
                loading="lazy"
            />
            {skill.label}
        </span>
    );
}

export default function Experience() {
    const { t } = useLanguage();

    const experiences = [
        {
            roleLabel: 'exp1_role_label',
            title: 'exp1_title',
            desc: 'exp1_desc',
            skills: ['TypeScript', 'Golang', 'JavaScript', 'HTML & CSS', 'Python'],
        },
        {
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
            <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-[#0d0d14]/95 px-6 py-4 backdrop-blur-sm border-b border-[#242436] md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 lg:border-0">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#6e6e8a]">
                    {t('nav_experience')}
                </h2>
            </div>

            <ol className="space-y-4">
                {experiences.map((exp, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className="group rounded-xl border border-[#242436] bg-[#13131c] p-6 transition-all duration-200 hover:border-[#2e2e45] hover:bg-[#1a1a26]">

                            {/* Role label */}
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#8b7fff] mb-2">
                                {t(exp.roleLabel)}
                            </p>

                            {/* Title */}
                            <h3 className="text-base font-semibold text-[#f0f0f8] mb-3">
                                {t(exp.title)}
                            </h3>

                            {/* Description */}
                            <p className="text-sm leading-relaxed text-[#b8b8cc] mb-5">
                                {t(exp.desc)}
                            </p>

                            {/* Skill badges with logos */}
                            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                                {exp.skills.map((skill, i) => (
                                    <li key={i}>
                                        <SkillBadge name={skill} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.li>
                ))}
            </ol>

            <div className="mt-6">
                <a
                    href="https://github.com/Bannawat01"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7fff] hover:text-[#a99eff] transition-colors"
                >
                    {t('view_github')}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>
        </motion.section>
    );
}
