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
        role: "Software & Game Developer",
        description: "CS student at RMUTI who loves turning ideas into real products — from web apps to games.",
        nav_about: "About",
        nav_experience: "Experience",
        nav_projects: "Projects",
        about_p1: "Hey, I'm Bannawat — a 21-year-old CS student based in Thailand. I spend most of my time writing code, breaking things, and figuring out how to fix them.",
        about_p2: "I enjoy building things end-to-end. Whether it's designing a slick UI or wiring up a backend API, I like understanding how all the pieces fit together. Game dev is another passion of mine — there's something special about creating a world that people can actually play in.",
        about_p3: "My go-to tools are TypeScript and Golang, but I'll pick up whatever gets the job done. I've shipped projects using Python, JavaScript, Unity, and Godot along the way.",
        exp1_role_label: "Web Development",
        exp1_title: "Full-Stack Developer",
        exp1_desc: "I build web apps from scratch — clean frontends people enjoy using, and backends that don't fall apart under pressure. I lean on TypeScript for anything UI-related and Golang when performance actually matters.",
        exp2_role_label: "Game Development",
        exp2_title: "Game Developer",
        exp2_desc: "I've designed and built games using Unity and Godot — from the core loop and mechanics to the systems that hold it all together. Making games is where I get to mix programming with creativity.",
        view_github: "See everything on GitHub →",
        proj1_title: "My Projects on GitHub",
        proj1_desc: "A mix of web apps, games, and experiments. Built with TypeScript, Golang, Godot, and whatever else seemed right at the time."
    },
    th: {
        name: "บรรณวัชร รัตนรักษ์",
        role: "นักพัฒนาซอฟต์แวร์และเกม",
        description: "นักศึกษา CS ที่ชอบเปลี่ยนไอเดียให้กลายเป็นของจริง ทั้งเว็บแอปและเกม",
        nav_about: "เกี่ยวกับ",
        nav_experience: "ประสบการณ์",
        nav_projects: "ผลงาน",
        about_p1: "สวัสดีครับ ผมบรรณวัชร อายุ 21 ปี เรียนสาขาวิทยาการคอมพิวตอร์ที่ ราชมงคลอีสาน เวลาส่วนใหญ่ก็ใช้ไปกับการเขียนโค้ด พัง แล้วก็หาทางแก้ครับ",
        about_p2: "ผมชอบสร้างอะไรให้ครบวงจร ตั้งแต่ออกแบบหน้าจอให้ดูดี ไปจนถึงต่อ API หลังบ้านให้ทำงานได้จริง นอกจากนี้ก็ชอบทำเกมด้วยครับ มีบางอย่างที่พิเศษตอนที่คนอื่นได้เล่นในสิ่งที่เราสร้าง",
        about_p3: "ถนัด TypeScript และ Golang เป็นหลัก แต่หยิบอะไรมาใช้ก็ได้ถ้างานต้องการ เคยส่งโปรเจกต์ด้วย Python, JavaScript, Unity และ Godot มาแล้ว",
        exp1_role_label: "การพัฒนาเว็บ",
        exp1_title: "Full-Stack Developer",
        exp1_desc: "สร้างเว็บแอปตั้งแต่จุดเริ่มต้น ทำหน้าบ้านให้คนใช้แล้วรู้สึกสบาย และหลังบ้านที่ไม่ล่มง่ายๆ ชอบใช้ TypeScript สำหรับ UI และ Golang ตอนที่ performance สำคัญจริงๆ",
        exp2_role_label: "การพัฒนาเกม",
        exp2_title: "Game Developer",
        exp2_desc: "ออกแบบและสร้างเกมด้วย Unity และ Godot ตั้งแต่ core loop, mechanics ไปจนถึงระบบต่างๆ ที่ทำให้เกมทำงานได้ เป็นแนวที่ผสมการเขียนโค้ดกับความคิดสร้างสรรค์ได้ดีที่สุดสำหรับผม",
        view_github: "ดูทั้งหมดใน GitHub →",
        proj1_title: "โปรเจกต์ของผมใน GitHub",
        proj1_desc: "รวมเว็บแอป เกม และของที่ลองทำมาหลายอย่าง สร้างด้วย TypeScript, Golang, Godot และอื่นๆ ตามแต่งานจะพาไป"
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
