'use client';

import { useState, useEffect } from 'react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import { Github, Linkedin, Facebook, Mail } from 'lucide-react';

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
        { href: '#', icon: Linkedin, label: 'LinkedIn' },
        { href: 'https://www.facebook.com/bannawat.runttanarak', icon: Facebook, label: 'Facebook' },
        { href: 'mailto:coach.ra47@gmail.com', icon: Mail, label: 'Email' },
    ];

    return (
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
                {/* Avatar — Profile photo */}
                <div className="mb-6 w-16 h-16 rounded-xl overflow-hidden border border-[#2e2e45] bg-[#1a1a26]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/me.jpg"
                        alt="Bannawat Rattanarak"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Name — large, high contrast */}
                <h1 className="text-4xl font-bold tracking-tight text-[#f0f0f8] sm:text-5xl leading-tight">
                    <a href="/" className="hover:text-white transition-colors duration-200">
                        {t('name')}
                    </a>
                </h1>

                {/* Role — accent color, readable */}
                <p className="mt-2 text-base font-medium text-[#8b7fff]">
                    {t('role')}
                </p>

                {/* Description — proper body contrast */}
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#b8b8cc]">
                    {t('description')}
                </p>

                <LanguageToggle />

                {/* Nav links */}
                <nav className="hidden lg:block mt-10" aria-label="In-page jump links">
                    <ul className="space-y-1">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={`#${link.id}`}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${activeSection === link.id
                                        ? 'text-[#f0f0f8]'
                                        : 'text-[#6e6e8a] hover:text-[#b8b8cc]'
                                        }`}
                                >
                                    <span className={`block h-px transition-all duration-300 ${activeSection === link.id
                                        ? 'w-10 bg-[#8b7fff]'
                                        : 'w-5 bg-[#2e2e45]'
                                        }`} />
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Social icons */}
            <ul className="mt-8 flex items-center gap-1">
                {socials.map(({ href, icon: Icon, label }) => (
                    <li key={label}>
                        <a
                            href={href}
                            target={href.startsWith('mailto') ? undefined : '_blank'}
                            rel={href.startsWith('mailto') ? undefined : 'noreferrer'}
                            aria-label={label}
                            title={label}
                            className="flex items-center justify-center w-9 h-9 rounded-lg text-[#6e6e8a] hover:text-[#f0f0f8] hover:bg-[#1a1a26] border border-transparent hover:border-[#242436] transition-all duration-200"
                        >
                            <Icon className="h-4 w-4" />
                        </a>
                    </li>
                ))}
            </ul>
        </header>
    );
}
