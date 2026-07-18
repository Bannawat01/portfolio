'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';
import RepoRadarShowcase from '@/components/RepoRadarShowcase';
import SilentEmberShowcase from '@/components/SilentEmberShowcase';

const langDot: Record<string, string> = {
    TypeScript: '#3178c6',
    Go: '#00add8',
    Python: '#3572a5',
    JavaScript: '#f1e05a',
};

const projects: {
    name: string;
    url: string;
    liveUrl?: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    updatedAt: string;
}[] = [
    {
        name: 'Albion-Market-AI',
        url: 'https://www.albion-market-ai.online/',
        liveUrl: 'https://www.albion-market-ai.online/',
        description: 'AI-powered market price analytics for Albion Online — track and predict in-game item prices.',
        language: 'TypeScript',
        stars: 0,
        forks: 0,
        updatedAt: 'Jul 2026',
    },
    {
        name: 'CopyUI',
        url: 'https://copy-ui-nine.vercel.app/',
        liveUrl: 'https://copy-ui-nine.vercel.app/',
        description: 'Component library playground — browse, preview, and copy ready-to-use UI snippets.',
        language: 'TypeScript',
        stars: 0,
        forks: 0,
        updatedAt: 'Jun 2026',
    },
    {
        name: 'Trading-Vibe-v1',
        url: 'https://github.com/Bannawat01/trading-vibe-v1',
        description: 'Dashboard for monitoring automated trading bot systems and signals.',
        language: 'JavaScript',
        stars: 0,
        forks: 0,
        updatedAt: 'Mar 2026',
    },
    {
        name: 'LaekHub-Server',
        url: 'https://github.com/Bannawat01/LaekHub-Server',
        description: 'Backend server for LaekHub — a real-time hub management platform.',
        language: 'TypeScript',
        stars: 0,
        forks: 0,
        updatedAt: 'Feb 2026',
    },
    {
        name: 'MedScan-AI',
        url: 'https://github.com/Bannawat01/MedScan-AI',
        description: 'AI-powered medical scan analysis tool using the Gemini API.',
        language: 'TypeScript',
        stars: 0,
        forks: 0,
        updatedAt: 'Feb 2026',
    },
    {
        name: 'project-shop-api',
        url: 'https://github.com/Bannawat01/project-shop-api',
        description: 'High-performance e-commerce API built with Go — products, orders, auth.',
        language: 'Go',
        stars: 0,
        forks: 0,
        updatedAt: 'Jan 2026',
    },
    {
        name: 'TinnerApp',
        url: 'https://github.com/Bannawat01/TinnerApp',
        description: 'A swipe-based matching app inspired by modern dating UX.',
        language: 'TypeScript',
        stars: 0,
        forks: 0,
        updatedAt: 'Feb 2025',
    },
];

export default function Projects() {
    const { t } = useLanguage();

    return (
        <motion.section
            id="projects"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            aria-label="Selected projects"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4 }}
        >
            {/* Mobile sticky header */}
            <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-[#0d0d14]/95 px-6 py-4 backdrop-blur-sm border-b border-[#242436] md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 lg:border-0">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#6e6e8a]">
                    {t('nav_projects')}
                </h2>
            </div>

            <SilentEmberShowcase />

            <RepoRadarShowcase />

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((project, index) => {
                    const dot = langDot[project.language] ?? '#6e6e8a';
                    return (
                        <motion.li
                            key={project.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.07 }}
                            whileHover={{ scale: 1.02, y: -3 }}
                            style={{ transformOrigin: 'center' }}
                        >
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="project-card group flex flex-col h-full rounded-xl p-5"
                            >
                                {/* Repo name */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="min-w-0">
                                        <span className="flex items-center gap-2 text-sm font-semibold leading-tight text-[#f0f0f8] group-hover:text-white transition-colors">
                                            <span className="truncate">{project.name}</span>
                                            {project.liveUrl && (
                                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2ee6a6]/40 bg-[#2ee6a6]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#2ee6a6]">
                                                    <span className="relative inline-flex h-1.5 w-1.5">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ee6a6] opacity-60" />
                                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2ee6a6]" />
                                                    </span>
                                                    Live
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <span
                                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2b2b43] bg-[#161625] text-[#5d5d80] transition-all group-hover:border-[#3c3c5b] group-hover:text-[#8b7fff] sm:h-9 sm:w-9"
                                    >
                                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-sm leading-relaxed text-[#b8b8cc] flex-1 mb-4">
                                    {project.description}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between text-xs text-[#6e6e8a]">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: dot }} />
                                        <span>{project.language}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5" />{project.stars}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <GitFork className="h-3.5 w-3.5" />{project.forks}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </motion.li>
                    );
                })}
            </ul>

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
