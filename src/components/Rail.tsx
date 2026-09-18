'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Facebook, Mail, FileText, CalendarDays } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

const SECTIONS = ['about', 'experience', 'skills', 'projects'] as const;

const SOCIALS = [
    { href: 'https://github.com/Bannawat01', Icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/bannawat/', Icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://www.facebook.com/bannawat.runttanarak', Icon: Facebook, label: 'Facebook' },
    { href: 'mailto:bannawat.work47@gmail.com', Icon: Mail, label: 'Email' },
];

const reveal = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

/**
 * Left identity column. Sticky and full-height from `lg` up; a plain stacked
 * header below that.
 *
 * The theme and language controls live here rather than floating fixed in a
 * corner. A previous two-column attempt was reverted partly because a fixed
 * toolbar covered the content it sat over; putting the controls inside the
 * rail removes that failure mode instead of working around it.
 */
export default function Rail() {
    const { t } = useLanguage();
    const [active, setActive] = useState<string>('about');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );
        const nodes = SECTIONS.map((id) => document.getElementById(id)).filter(
            (n): n is HTMLElement => !!n
        );
        nodes.forEach((n) => observer.observe(n));
        return () => observer.disconnect();
    }, []);

    return (
        <motion.header
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:overflow-y-auto lg:border-r lg:border-border lg:py-16 lg:pr-12"
        >
            <div>
                <motion.div variants={reveal} className="flex items-center gap-4">
                    <span className="relative shrink-0">
                        <span
                            aria-hidden="true"
                            className="absolute -inset-1 rounded-[1.4rem] bg-accent-vivid/15 blur-md"
                        />
                        <span className="relative block h-14 w-14 overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-[var(--shadow-sm)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/me.jpg" alt="" className="h-full w-full object-cover" />
                        </span>
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 shadow-[var(--shadow-sm)]">
                        <span className="dot dot-live" aria-hidden="true" />
                        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-accent">
                            {t('rail_available')}
                        </span>
                    </span>
                </motion.div>

                <motion.h1
                    variants={reveal}
                    className="mt-7 font-display text-[clamp(2.35rem,4.4vw,3rem)] font-bold leading-[1.04] tracking-[-0.035em] text-ink"
                >
                    <Link href="/" className="transition-opacity hover:opacity-70">
                        {t('name')}
                    </Link>
                </motion.h1>

                <motion.p
                    variants={reveal}
                    className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
                >
                    {t('role_line')}
                </motion.p>

                <motion.p variants={reveal} className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-muted">
                    {t('rail_blurb')}
                </motion.p>

                <motion.div variants={reveal} className="inset mt-5 max-w-sm p-3.5">
                    <div className="flex gap-2.5">
                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div>
                            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-accent">
                                {t('coop_title')}
                            </p>
                            <p className="mt-1 text-[12px] leading-relaxed text-muted">{t('coop_dates')}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={reveal} className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a
                        href="/bannawat-rattanarak-resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-accent flex w-fit font-mono text-[11px] font-semibold uppercase tracking-[0.1em]"
                    >
                        <FileText className="h-3.5 w-3.5" />
                        {t('view_resume')}
                    </a>
                    <a
                        href="/bannawat-rattanarak-cv.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-accent transition-colors hover:text-accent-2"
                    >
                        {t('view_cv')} →
                    </a>
                </motion.div>

                <motion.nav
                    variants={reveal}
                    aria-label={t('nav_label')}
                    className="mt-10 hidden lg:block"
                >
                    <ul className="space-y-1.5">
                        {SECTIONS.map((id) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    aria-current={active === id ? 'true' : undefined}
                                    className="rail-link font-mono text-[11px] font-medium uppercase tracking-[0.16em]"
                                >
                                    <span className="bar" aria-hidden="true" />
                                    {t(`nav_${id}`)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.nav>
            </div>

            <motion.div
                variants={reveal}
                className="mt-10 flex flex-wrap items-center justify-between gap-4 lg:mt-0 lg:border-t lg:border-border lg:pt-6"
            >
                <ul className="flex items-center gap-0.5">
                    {SOCIALS.map(({ href, Icon, label }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target={href.startsWith('mailto') ? undefined : '_blank'}
                                rel={href.startsWith('mailto') ? undefined : 'noreferrer'}
                                aria-label={label}
                                title={label}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-dim transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-2 hover:text-accent"
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <LanguageToggle />
                </div>
            </motion.div>
        </motion.header>
    );
}
