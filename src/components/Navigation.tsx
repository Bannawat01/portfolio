'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResumeButton from './ResumeButton';
import { useLanguage } from '@/context/LanguageContext';
import { Github, Linkedin, Facebook, Mail } from 'lucide-react';

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Navigation() {
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState('about');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
            { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
        );
        const sections = document.querySelectorAll('section');
        sections.forEach((s) => observer.observe(s));
        return () => sections.forEach((s) => observer.unobserve(s));
    }, []);

    const navLinks = [
        { id: 'about', label: t('nav_about') },
        { id: 'experience', label: t('nav_experience') },
        { id: 'skills', label: t('nav_skills') },
        { id: 'projects', label: t('nav_projects') },
    ];

    const socials = [
        { href: 'https://github.com/Bannawat01', icon: Github, label: 'GitHub' },
        { href: 'https://www.linkedin.com/in/bannawat/', icon: Linkedin, label: 'LinkedIn' },
        { href: 'https://www.facebook.com/bannawat.runttanarak', icon: Facebook, label: 'Facebook' },
        { href: 'mailto:bannawat.work47@gmail.com', icon: Mail, label: 'Email' },
    ];

    return (
        <motion.header
            className="flex min-h-[80vh] flex-col justify-center"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <div>
                {/* Status badge */}
                <motion.div
                    variants={item}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2ee6a6]/30 bg-[#2ee6a6]/[0.07] px-3 py-1.5"
                >
                    <span className="relative inline-flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ee6a6] opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ee6a6]" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7ff0c8]">
                        Open for Internship
                    </span>
                </motion.div>

                {/* Avatar — gradient ring */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.06, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="mb-6 w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-[#8b7fff] via-[#6d5cff] to-[#3178c6] p-[2px] shadow-[0_0_24px_rgba(139,127,255,0.25)]"
                >
                    <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#1a1a26]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/me.jpg"
                            alt="Bannawat Rattanarak"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* Name — animated gradient display */}
                <motion.h1 variants={item} className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.02]">
                    <a href="/" className="animate-gradient-text bg-gradient-to-r from-white via-[#8b7fff] to-white bg-clip-text text-transparent transition-opacity duration-200 hover:opacity-80">
                        {t('name')}
                    </a>
                </motion.h1>

                {/* Role */}
                <motion.p variants={item} className="mt-4 inline-flex items-center gap-2 text-lg font-medium text-[#8b7fff]">
                    <span className="h-px w-8 bg-gradient-to-r from-[#8b7fff] to-transparent" />
                    {t('role')}
                </motion.p>

                {/* Description */}
                <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-[#b8b8cc]">
                    {t('description')}
                </motion.p>

                <motion.div variants={item}>
                    <ResumeButton />
                </motion.div>

                {/* Nav links */}
                <motion.nav variants={item} className="mt-10 border-t border-[#242436] pt-6" aria-label="In-page jump links">
                    <ul className="flex flex-wrap gap-x-6 gap-y-2">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={`#${link.id}`}
                                    className={`group flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${activeSection === link.id
                                        ? 'text-[#f0f0f8]'
                                        : 'text-[#6e6e8a] hover:text-[#b8b8cc]'
                                        }`}
                                >
                                    <span className={`block h-px transition-all duration-300 group-hover:w-8 ${activeSection === link.id
                                        ? 'w-8 bg-[#8b7fff]'
                                        : 'w-4 bg-[#2e2e45] group-hover:bg-[#8b7fff]'
                                        }`} />
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.nav>
            </div>

            {/* Social icons */}
            <motion.ul variants={item} className="mt-8 flex items-center gap-1">
                {socials.map(({ href, icon: Icon, label }) => (
                    <li key={label}>
                        <motion.a
                            href={href}
                            target={href.startsWith('mailto') ? undefined : '_blank'}
                            rel={href.startsWith('mailto') ? undefined : 'noreferrer'}
                            aria-label={label}
                            title={label}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-center w-10 h-10 rounded-lg text-[#6e6e8a] hover:text-[#8b7fff] hover:bg-[#8b7fff]/10 border border-transparent hover:border-[#8b7fff]/30 transition-colors duration-200"
                        >
                            <Icon className="h-4 w-4" />
                        </motion.a>
                    </li>
                ))}
            </motion.ul>
        </motion.header>
    );
}
