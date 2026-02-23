'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Gamepad2, Joystick, Cpu } from 'lucide-react';

const SKILL_LOGOS: Record<string, { icon: string; label: string }> = {
    TypeScript: {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
        label: 'TypeScript',
    },
    Golang: {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg',
        label: 'Golang',
    },
    JavaScript: {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        label: 'JavaScript',
    },
    Python: {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        label: 'Python',
    },
    'Node.js': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        label: 'Node.js',
    },
    PostgreSQL: {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
        label: 'PostgreSQL',
    },
    Unity: {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
        label: 'Unity',
    },
    Godot: {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/godot/godot-original.svg',
        label: 'Godot',
    },
    'C#': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
        label: 'C#',
    },
    Git: {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
        label: 'Git',
    },
    Docker: {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        label: 'Docker',
    },
    Figma: {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
        label: 'Figma',
    },
};

const SKILL_GROUPS = [
    {
        titleKey: 'skills_group_core',
        className: 'md:col-span-2 md:row-span-1',
        accent: 'from-[#7C3AED]/20 to-[#A78BFA]/10',
        skills: ['TypeScript', 'Golang', 'JavaScript', 'Python'],
    },
    {
        titleKey: 'skills_group_frontend',
        className: 'md:col-span-2 md:row-span-1',
        accent: 'from-[#A78BFA]/20 to-[#1F1B3A]/20',
        skills: ['TypeScript', 'JavaScript', 'Figma'],
    },
    {
        titleKey: 'skills_group_backend',
        className: 'md:col-span-2 md:row-span-1',
        accent: 'from-[#4C1D95]/25 to-[#0F0F23]/10',
        skills: ['Golang', 'Node.js', 'PostgreSQL', 'Docker'],
    },
    {
        titleKey: 'skills_group_gamedev',
        className: 'md:col-span-2 md:row-span-1',
        accent: 'from-[#F43F5E]/15 to-[#7C3AED]/20',
        skills: ['Unity', 'Godot', 'C#'],
    },
    {
        titleKey: 'skills_group_tooling',
        className: 'md:col-span-2 md:row-span-1',
        accent: 'from-[#1F1B3A]/20 to-[#A78BFA]/10',
        skills: ['Git', 'Docker', 'Figma'],
    },
    {
        titleKey: 'skills_group_mindset',
        className: 'md:col-span-2 md:row-span-1',
        accent: 'from-[#0F0F23]/10 to-[#7C3AED]/20',
        skills: ['Performance', 'Clean Code', 'Game Feel'],
    },
];

function SkillPill({ name }: { name: string }) {
    const skill = SKILL_LOGOS[name];

    if (!skill) {
        return (
            <span className="inline-flex items-center rounded-md border border-[#3f2a8a]/50 bg-[#121228] px-3 py-1.5 text-xs font-medium text-[#d8d8eb] transition-colors duration-200 hover:border-[#a78bfa]/60">
                {name}
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-2 rounded-md border border-[#3f2a8a]/45 bg-[#121228] px-3 py-1.5 text-xs font-medium text-[#d8d8eb] transition-all duration-200 hover:border-[#a78bfa]/70 hover:bg-[#171733]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={skill.icon} alt={skill.label} className="h-4 w-4 object-contain" loading="lazy" />
            {skill.label}
        </span>
    );
}

export default function Skills() {
    const { t } = useLanguage();
    const reduceMotion = useReducedMotion();

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
            <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-[#0d0d14]/95 px-6 py-4 backdrop-blur-sm border-b border-[#242436] md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 lg:border-0">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#6e6e8a]">
                    {t('nav_skills')}
                </h2>
            </div>

            {!reduceMotion && (
                <div className="pointer-events-none absolute right-4 top-2 hidden h-14 w-36 overflow-hidden lg:block" aria-hidden="true">
                    <motion.div
                        className="absolute left-1 top-5 text-[#a78bfa]/45"
                        animate={{ y: [0, -8, 0], rotate: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Gamepad2 className="h-4 w-4" />
                    </motion.div>
                    <motion.div
                        className="absolute left-14 top-1 text-[#f43f5e]/35"
                        animate={{ y: [0, 6, 0], rotate: [0, 8, 0] }}
                        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Joystick className="h-4 w-4" />
                    </motion.div>
                    <motion.div
                        className="absolute left-[6.4rem] top-6 text-[#8b7fff]/40"
                        animate={{ y: [0, -6, 0], rotate: [0, -4, 0] }}
                        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Code2 className="h-4 w-4" />
                    </motion.div>
                    <motion.div
                        className="absolute left-[7.35rem] top-1 text-[#b9adff]/30"
                        animate={{ y: [0, 5, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Cpu className="h-4 w-4" />
                    </motion.div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:auto-rows-fr">
                {SKILL_GROUPS.map((group, index) => (
                    <motion.article
                        key={group.titleKey}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.07 }}
                        className={`h-full rounded-2xl border border-[#2a2150] bg-gradient-to-br ${group.accent} p-4 md:p-5 backdrop-blur-sm transition-all duration-200 hover:border-[#7C3AED]/65 hover:shadow-[0_0_0_1px_rgba(167,139,250,0.18)] flex flex-col ${group.className}`}
                    >
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#f3f1ff]">
                            {t(group.titleKey)}
                        </h3>

                        <div className="flex flex-wrap content-start gap-2.5">
                            {group.skills.map((skill) => (
                                <SkillPill key={skill} name={skill} />
                            ))}
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}
