'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeader from '@/components/SectionHeader';
import WakefulShowcase from '@/components/WakefulShowcase';
import RepoRadarShowcase from '@/components/RepoRadarShowcase';
import AiFetchHealerShowcase from '@/components/AiFetchHealerShowcase';
import SilentEmberShowcase from '@/components/SilentEmberShowcase';

const GITHUB_OWNER = 'Bannawat01';

// Language brand colours. These are identity, not palette — they stay fixed in
// both themes. See DESIGN.md §2.
const LANG_COLOR: Record<string, string> = {
    TypeScript: '#3178c6',
    Go: '#00add8',
    Python: '#3572a5',
    JavaScript: '#f1e05a',
};

const REPOS: {
    name: string;
    repo: string;
    url: string;
    live?: boolean;
    description: string;
    language: string;
}[] = [
        {
            name: 'Albion-Market-AI',
            repo: 'albion-api',
            url: 'https://www.albion-market-ai.online/',
            live: true,
            description: 'AI-powered market price analytics for Albion Online — track and predict in-game item prices.',
            language: 'TypeScript',
        },
        {
            name: 'CopyUI',
            repo: 'CopyUI',
            url: 'https://copy-ui-nine.vercel.app/',
            live: true,
            description: 'Component library playground — browse, preview, and copy ready-to-use UI snippets.',
            language: 'TypeScript',
        },
        {
            name: 'Trading-Vibe-v1',
            repo: 'trading-vibe-v1',
            url: 'https://github.com/Bannawat01/trading-vibe-v1',
            description: 'Dashboard for monitoring automated trading bot systems and signals.',
            language: 'JavaScript',
        },
        {
            name: 'LaekHub-Server',
            repo: 'LaekHub-Server',
            url: 'https://github.com/Bannawat01/LaekHub-Server',
            description: 'Backend server for LaekHub — a real-time hub management platform.',
            language: 'TypeScript',
        },
        {
            name: 'MedScan-AI',
            repo: 'MedScan-AI',
            url: 'https://github.com/Bannawat01/MedScan-AI',
            description: 'AI-powered medical scan analysis tool using the Gemini API.',
            language: 'TypeScript',
        },
        {
            name: 'project-shop-api',
            repo: 'project-shop-api',
            url: 'https://github.com/Bannawat01/project-shop-api',
            description: 'High-performance e-commerce API built with Go — products, orders, auth.',
            language: 'Go',
        },
        {
            name: 'TinnerApp',
            repo: 'TinnerApp',
            url: 'https://github.com/Bannawat01/TinnerApp',
            description: 'A swipe-based matching app inspired by modern dating UX.',
            language: 'TypeScript',
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
            REPOS.map((p) =>
                fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${p.repo}`, { signal: ctrl.signal })
                    .then((r) => (r.ok ? r.json() : null))
                    .then((data: { stargazers_count?: number; forks_count?: number } | null) =>
                        data
                            ? ([p.repo, { stars: data.stargazers_count ?? 0, forks: data.forks_count ?? 0 }] as const)
                            : null
                    )
                    .catch(() => null)
            )
        )
            .then((results) => {
                if (!alive) return;
                const next: Record<string, RepoStats> = {};
                for (const r of results) if (r) next[r[0]] = r[1];
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
            aria-label={t('nav_projects')}
            className="scroll-mt-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
        >
            <SectionHeader
                title={t('nav_projects')}
                meta={t('meta_projects').replace('{n}', String(REPOS.length))}
            />

            <div className="space-y-3">
                <WakefulShowcase />
                <RepoRadarShowcase />
                <AiFetchHealerShowcase />
                <SilentEmberShowcase />
            </div>

            <h3 className="mt-10 mb-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-dim">
                {t('repo_index')}
            </h3>

            <ul className="border-t border-border">
                {REPOS.map((project) => {
                    const s = stats[project.repo];
                    return (
                        <li key={project.name} className="row">
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex flex-col gap-1.5 px-4 py-4 sm:flex-row sm:items-center sm:gap-4"
                            >
                                <span className="flex min-w-0 items-center gap-2 sm:w-52 sm:shrink-0">
                                    <span className="truncate font-display text-[15px] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                                        {project.name}
                                    </span>
                                    {project.live && (
                                        <span className="dot dot-live shrink-0" title={t('status_live')} />
                                    )}
                                </span>

                                <span className="min-w-0 flex-1 text-[13px] leading-snug text-muted">
                                    {project.description}
                                </span>

                                <span className="flex shrink-0 items-center gap-3 font-mono text-[10.5px] text-dim tabular-nums sm:w-44 sm:justify-end">
                                    <span className="flex items-center gap-1.5">
                                        <span
                                            className="h-2 w-2 shrink-0 rounded-full"
                                            style={{ backgroundColor: LANG_COLOR[project.language] ?? 'var(--dim)' }}
                                            aria-hidden="true"
                                        />
                                        {project.language}
                                    </span>
                                    {s && (
                                        <span className="flex items-center gap-2">
                                            <span className="flex items-center gap-0.5">
                                                <Star className="h-3 w-3" />
                                                {s.stars}
                                            </span>
                                            <span className="flex items-center gap-0.5">
                                                <GitFork className="h-3 w-3" />
                                                {s.forks}
                                            </span>
                                        </span>
                                    )}
                                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-faint transition-colors group-hover:text-accent" />
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>

            <a
                href="https://github.com/Bannawat01"
                target="_blank"
                rel="noreferrer"
                className="group mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] font-medium text-accent transition-colors hover:text-accent-2"
            >
                {t('view_github')}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
        </motion.section>
    );
}
