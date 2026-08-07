'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        name: "Bannawat Rattanarak",
        hero_seg1: "I build backend-heavy systems — ",
        hero_link_api: "REST APIs",
        hero_seg2: ", ",
        hero_link_bot: "a real-time bot that streams GitHub webhooks to Discord",
        hero_seg3: ", ",
        hero_link_npm: "an npm package that self-heals failing API calls",
        hero_seg4: " — and off the clock I design games, currently building ",
        hero_link_ember: "Silent Ember",
        hero_seg5: ", a horror game I'm building with a friend in Unity.",
        nav_about: "About",
        nav_experience: "Experience",
        nav_skills: "Skills",
        nav_projects: "Projects",
        about_p1: "Hey, I'm Bannawat — a 21-year-old CS student in Thailand. I'm a full-stack developer who leans hard on the backend: APIs, servers, data flow, and the automation that keeps it all running.",
        about_p2: "I like the hard parts — a Go e-commerce API, a real-time DevOps bot that streams GitHub webhooks to Discord, an npm package that auto-heals failing API calls with an LLM. I care about services that stay up under load and fail gracefully when they don't.",
        about_p3: "The other half of me makes games. I'm co-designing and building Silent Ember, a horror game in Unity, with a friend — from the core loop and mechanics to the systems behind it. TypeScript and Golang are my go-to tools; I reach for Python, C#, Unity, or Godot when the job calls for it.",
        exp1_role_label: "Backend & Full-Stack",
        exp1_title: "Full-Stack Developer",
        exp1_desc: "I build systems back-to-front with a backend focus — REST APIs, real-time pipelines, auth, and DevOps automation. Golang when performance and reliability matter, TypeScript across the stack. My work includes a Go e-commerce API, a webhook-driven bot, and a published npm library.",
        exp2_role_label: "Game Development",
        exp2_title: "Game Developer",
        exp2_desc: "I design and build games in Unity and Godot — core loops, mechanics, and the systems that hold everything together. Silent Ember, a horror game I'm building with a friend as a two-person team, is where I mix engineering with creative design.",
        skills_group_core: "Core Stack",
        skills_group_frontend: "Frontend",
        skills_group_backend: "Backend",
        skills_group_gamedev: "Game Dev",
        skills_group_tooling: "Tooling",
        skills_group_mindset: "Mindset",
        view_github: "See everything on GitHub →",
        proj1_title: "My Projects on GitHub",
        proj1_desc: "Mostly backend and full-stack systems — APIs, real-time services, and tooling — plus a game or two. Built with Golang, TypeScript, and Unity.",
        view_resume: "View Résumé",
        resume_hint: "Click anywhere to close",
        silent_ember_title: "Silent Ember",
        silent_ember_desc: "A horror game I'm building with a friend — explore the house, uncover memories, and survive what lurks in the dark.",
        silent_ember_status: "In Development",
        silent_ember_status_hint: "Playable build coming soon"
    },
    th: {
        name: "บรรณวัชร รัตนรักษ์",
        hero_seg1: "ผมสร้างระบบฝั่ง backend เป็นหลัก — ",
        hero_link_api: "REST API",
        hero_seg2: ", ",
        hero_link_bot: "บอทเรียลไทม์ที่ส่งต่อ GitHub webhook เข้า Discord",
        hero_seg3: ", ",
        hero_link_npm: "npm package ที่ซ่อมแซม API call ที่ล้มเหลวเองอัตโนมัติ",
        hero_seg4: " — นอกเวลาผมออกแบบเกม ตอนนี้กำลังสร้าง ",
        hero_link_ember: "Silent Ember",
        hero_seg5: ", เกมสยองขวัญที่กำลังทำกับเพื่อนด้วย Unity",
        nav_about: "เกี่ยวกับ",
        nav_experience: "ประสบการณ์",
        nav_skills: "ทักษะ",
        nav_projects: "ผลงาน",
        about_p1: "สวัสดีครับ ผมบรรณวัชร อายุ 21 ปี เรียนวิทยาการคอมพิวเตอร์ที่ราชมงคลอีสาน เป็น full-stack developer ที่เน้นหนักไปทางหลังบ้าน — API, เซิร์ฟเวอร์, การไหลของข้อมูล และ automation ที่ทำให้ทุกอย่างทำงานต่อเนื่อง",
        about_p2: "ผมชอบส่วนที่ยาก เช่น e-commerce API ด้วย Go, บอท DevOps แบบ real-time ที่ส่ง GitHub webhook เข้า Discord, และ npm package ที่ซ่อม API call ที่ล้มเหลวอัตโนมัติด้วย LLM ให้ความสำคัญกับ service ที่อยู่รอดตอนโหลดหนักและ fail อย่างนุ่มนวลเมื่อมีปัญหา",
        about_p3: "อีกครึ่งของผมคือทำเกม ผมออกแบบและสร้าง Silent Ember เกมสยองขวัญด้วย Unity ร่วมกับเพื่อน ตั้งแต่ core loop, mechanics ไปจนถึงระบบเบื้องหลัง ถนัด TypeScript กับ Golang เป็นหลัก และหยิบ Python, C#, Unity หรือ Godot มาใช้ตามงาน",
        exp1_role_label: "Backend และ Full-Stack",
        exp1_title: "Full-Stack Developer",
        exp1_desc: "สร้างระบบตั้งแต่หน้าบ้านถึงหลังบ้านโดยเน้นหลังบ้าน — REST API, pipeline แบบ real-time, ระบบ auth และ DevOps automation ใช้ Golang เมื่อ performance และความเสถียรสำคัญ และ TypeScript ทั่วทั้ง stack ผลงานมีทั้ง e-commerce API ด้วย Go, บอทที่ทำงานด้วย webhook และ npm library ที่เผยแพร่แล้ว",
        exp2_role_label: "การพัฒนาเกม",
        exp2_title: "Game Developer",
        exp2_desc: "ออกแบบและสร้างเกมด้วย Unity และ Godot ตั้งแต่ core loop, mechanics ไปจนถึงระบบที่ทำให้ทุกอย่างทำงานได้ Silent Ember เกมสยองขวัญที่ผมทำกับเพื่อนเป็นทีม 2 คน คือที่ที่ผมผสมงานวิศวกรรมกับการออกแบบเชิงสร้างสรรค์",
        skills_group_core: "ทักษะหลัก",
        skills_group_frontend: "Frontend",
        skills_group_backend: "Backend",
        skills_group_gamedev: "พัฒนาเกม",
        skills_group_tooling: "เครื่องมือ",
        skills_group_mindset: "แนวคิดการทำงาน",
        view_github: "ดูทั้งหมดใน GitHub →",
        proj1_title: "โปรเจกต์ของผมใน GitHub",
        proj1_desc: "ส่วนใหญ่เป็นระบบ backend และ full-stack — API, ระบบ real-time และเครื่องมือต่างๆ — บวกเกมอีกนิดหน่อย สร้างด้วย Golang, TypeScript และ Unity",
        view_resume: "ดูเรซูเม่",
        resume_hint: "คลิกที่ใดก็ได้เพื่อปิด",
        silent_ember_title: "Silent Ember",
        silent_ember_desc: "เกมสยองขวัญที่ผมกำลังสร้างร่วมกับเพื่อน สำรวจบ้าน ค้นหาความทรงจำ และเอาชีวิตรอดจากสิ่งที่ซ่อนอยู่ในความมืด",
        silent_ember_status: "กำลังพัฒนา",
        silent_ember_status_hint: "ตัวเกมให้เล่นเร็วๆ นี้"
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    // Load saved language on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('portfolio-lang') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'th')) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('portfolio-lang', lang);
    };

    const t = (key: string): string => {
        // @ts-ignore
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
