'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import RepoRadarShowcase from '@/components/RepoRadarShowcase';
import SilentEmberShowcase from '@/components/SilentEmberShowcase';
import AiFetchHealerShowcase from '@/components/AiFetchHealerShowcase';
import WakefulShowcase from '@/components/WakefulShowcase';

const langDot: Record<string, string> = {
    TypeScript: '#3178c6',
    Go: '#00add8',
    Python: '#3572a5',
    JavaScript: '#f1e05a',
};

const GITHUB_OWNER = 'Bannawat01';

const projects: {
    name: string;
    repo: string;
    url: string;
    liveUrl?: string;
    description: string;
    language: string;
    updatedAt: string;
}[] = [
    {
        name: 'Albion-Market-AI',
        repo: 'albion-api',
        url: 'https://www.albion-market-ai.online/',
        liveUrl: 'https://www.albion-market-ai.online/',
        description: 'AI-powered market price analytics for Albion Online — track and predict in-game item prices.',
        language: 'TypeScript',
        updatedAt: 'Jul 2026',
    },
    {
        name: 'CopyUI',
        repo: 'CopyUI',
        url: 'https://copy-ui-nine.vercel.app/',
        liveUrl: 'https://copy-ui-nine.vercel.app/',
        description: 'Component library playground — browse, preview, and copy ready-to-use UI snippets.',
        language: 'TypeScript',
        updatedAt: 'Jun 2026',
    },
    {
        name: 'Trading-Vibe-v1',
        repo: 'trading-vibe-v1',
        url: 'https://github.com/Bannawat01/trading-vibe-v1',
        description: 'Dashboard for monitoring automated trading bot systems and signals.',
        language: 'JavaScript',
        updatedAt: 'Mar 2026',
    },
    {
        name: 'LaekHub-Server',
        repo: 'LaekHub-Server',
        url: 'https://github.com/Bannawat01/LaekHub-Server',
        description: 'Backend server for LaekHub — a real-time hub management platform.',
        language: 'TypeScript',
        updatedAt: 'Feb 2026',
    },
    {
        name: 'MedScan-AI',
        repo: 'MedScan-AI',
        url: 'https://github.com/Bannawat01/MedScan-AI',
        description: 'AI-powered medical scan analysis tool using the Gemini API.',
        language: 'TypeScript',
        updatedAt: 'Feb 2026',
    },
    {
        name: 'project-shop-api',
        repo: 'project-shop-api',
        url: 'https://github.com/Bannawat01/project-shop-api',
        description: 'High-performance e-commerce API built with Go — products, orders, auth.',
        language: 'Go',
        updatedAt: 'Jan 2026',
    },
    {
        name: 'TinnerApp',
        repo: 'TinnerApp',
        url: 'https://github.com/Bannawat01/TinnerApp',
        description: 'A swipe-based matching app inspired by modern dating UX.',
        language: 'TypeScript',
        updatedAt: 'Feb 2025',
    },
];

type RepoStats = { stars: number; forks: number };

export default function Projects() {
    const { t } = useLanguage();
    const [stats, setStats] = useState<Record<string, RepoStats>>({});

    useEffect(() => {
        let alive = true;
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8000);

        Promise.all(
            projects.map((p) =>
                fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${p.repo}`, { signal: ctrl.signal })
                    .then((r) => (r.ok ? r.json() : null))
                    .then((data: { stargazers_count?: number; forks_count?: number } | null) =>
                        data ? [p.repo, { stars: data.stargazers_count ?? 0, forks: data.forks_count ?? 0 }] as const : null
                    )
                    .catch(() => null)
            )
        )
            .then((results) => {
                if (!alive) return;
                const next: Record<string, RepoStats> = {};
                for (const r of results) {
                    if (r) next[r[0]] = r[1];
                }
                setStats(next);
            })
            .finally(() => clearTimeout(timer));

        return () => {
            alive = false;
            ctrl.abort();
            clearTimeout(timer);
        };
    }, []);

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
            <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-[var(--bg)]/95 px-6 py-4 backdrop-blur-sm border-b border-[var(--border)] md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:border-0 lg:bg-transparent lg:backdrop-blur-none">
                <h2 className="flex items-baseline gap-3">
                    <span className="section-numeral text-2xl lg:text-3xl">04</span>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">{t('nav_projects')}</span>
                    <span className="hidden h-px flex-1 bg-[var(--border)] lg:block" />
                </h2>
            </div>

            <WakefulShowcase />

            <SilentEmberShowcase />

            <RepoRadarShowcase />

            <AiFetchHealerShowcase />

            {/* Index list — replaces the uniform card grid with an editorial */}
            {/* "table of works" read: numbered rows, accent rule on hover. */}
            <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                Repository index
            </p>
            <ul>
                {projects.map((project, index) => {
                    const dot = langDot[project.language] ?? 'var(--text-muted)';
                    const repoStats = stats[project.repo];
                    return (
                        <motion.li
                            key={project.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="index-row group flex flex-col gap-2 py-4 pl-3 pr-2 -mx-3 hover:pl-5 sm:flex-row sm:items-center sm:gap-5"
                            >
                                <span className="font-mono text-xs text-[var(--text-faint)] sm:w-6 sm:shrink-0">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <span className="flex min-w-0 items-center gap-2 sm:w-56 sm:shrink-0">
                                    <span className="truncate font-serif text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                                        {project.name}
                                    </span>
                                    {project.liveUrl && (
                                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2ee6a6]/40 bg-[#2ee6a6]/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-[#2ee6a6]">
                                            <span className="relative inline-flex h-1.5 w-1.5">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ee6a6] opacity-60" />
                                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2ee6a6]" />
                                            </span>
                                            Live
                                        </span>
                                    )}
                                </span>

                                <span className="min-w-0 flex-1 text-sm leading-relaxed text-[var(--text-body)]">
                                    {project.description}
                                </span>

                                <span className="flex shrink-0 items-center gap-3 font-mono text-[11px] text-[var(--text-muted)] sm:w-40 sm:justify-end">
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: dot }} />
                                        {project.language}
                                    </span>
                                    {repoStats && (
                                        <span className="flex items-center gap-2">
                                            <span className="flex items-center gap-0.5">
                                                <Star className="h-3 w-3" />{repoStats.stars}
                                            </span>
                                            <span className="flex items-center gap-0.5">
                                                <GitFork className="h-3 w-3" />{repoStats.forks}
                                            </span>
                                        </span>
                                    )}
                                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--text-faint)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
                                </span>
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
                    className="group inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-[var(--accent)] hover:text-[var(--accent-soft)] transition-colors"
                >
                    {t('view_github')}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>
        </motion.section>
    );
}
