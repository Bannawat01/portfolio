'use client';

import {
    createContext,
    useCallback,
    useContext,
    useSyncExternalStore,
    type ReactNode,
} from 'react';
import {
    DEFAULT_LANGUAGE,
    LANG_STORAGE_KEY,
    isLanguage,
    type Language,
} from '@/lib/boot';

const en = {
    name: 'Bannawat Rattanarak',
    role_line: 'Backend-leaning full-stack & game developer',
    rail_available: 'Open to internships',
    rail_blurb:
        'CS student in Thailand. I build services that stay up, and games that unsettle people.',

    hero_seg1: 'I build backend-heavy systems — ',
    hero_link_api: 'REST APIs',
    hero_seg2: ', ',
    hero_link_bot: 'a real-time bot that streams GitHub webhooks to Discord',
    hero_seg3: ', ',
    hero_link_npm: 'an npm package that self-heals failing API calls',
    hero_seg4: ' — and off the clock I design games, currently building ',
    hero_link_ember: 'Silent Ember',
    hero_seg5: ", a horror game I'm making with a friend in Unity.",

    strip_title: 'Currently running',
    strip_note: 'Live status',
    strip_last_event: 'last event',
    sys_wakeful: 'Uptime-monitoring SaaS — real users, real billing, real on-call.',
    sys_reporadar: 'GitHub webhooks to Discord, in real time.',
    sys_healer: 'npm package that heals failing API calls and retries them.',
    sys_ember: 'Horror game in Unity, built by two people.',

    status_live: 'Live',
    status_up: 'Production',
    status_shipped: 'Published',
    status_wip: 'In development',

    nav_label: 'Sections',
    nav_about: 'About',
    nav_experience: 'Experience',
    nav_skills: 'Skills',
    nav_projects: 'Projects',

    meta_about: 'Bangkok · UTC+7',
    meta_skills: '{n} tools',
    meta_projects: '4 systems · {n} repos',
    repo_index: 'Repository index',
    tech_label: 'Technologies',
    play_video: 'Play the Silent Ember gameplay video',

    theme_label: 'Colour theme',
    theme_light: 'Light',
    theme_dark: 'Dark',
    theme_system: 'Match system',
    lang_label: 'Language',

    about_p1:
        "Hey, I'm Bannawat — a 21-year-old CS student in Thailand. I'm a full-stack developer who leans hard on the backend: APIs, servers, data flow, and the automation that keeps it all running.",
    about_p2:
        'I like the hard parts — a Go e-commerce API, a real-time DevOps bot that streams GitHub webhooks to Discord, an npm package that auto-heals failing API calls with an LLM. I care about services that stay up under load and fail gracefully when they don\'t.',
    about_p3:
        'The other half of me makes games. I\'m co-designing and building Silent Ember, a horror game in Unity, with a friend — from the core loop and mechanics to the systems behind it. TypeScript and Golang are my go-to tools; I reach for Python, C#, Unity, or Godot when the job calls for it.',

    exp1_role_label: 'Backend & full-stack',
    exp1_title: 'Full-Stack Developer',
    exp1_desc:
        'I build systems back-to-front with a backend focus — REST APIs, real-time pipelines, auth, and DevOps automation. Golang when performance and reliability matter, TypeScript across the stack. My work includes a Go e-commerce API, a webhook-driven bot, and a published npm library.',
    exp2_role_label: 'Game development',
    exp2_title: 'Game Developer',
    exp2_desc:
        'I design and build games in Unity and Godot — core loops, mechanics, and the systems that hold everything together. Silent Ember, a horror game I\'m building with a friend as a two-person team, is where I mix engineering with creative design.',

    skills_group_core: 'Core stack',
    skills_group_frontend: 'Frontend',
    skills_group_backend: 'Backend',
    skills_group_gamedev: 'Game dev',
    skills_group_tooling: 'Tooling',
    skills_group_mindset: 'Mindset',

    view_github: 'See everything on GitHub',
    view_resume: 'Résumé',

    silent_ember_title: 'Silent Ember',
    silent_ember_desc:
        "A horror game I'm building with a friend — explore the house, uncover memories, and survive what lurks in the dark.",
    silent_ember_status_hint: 'Playable build coming soon.',
};

/** Keys are checked against the English source, so a missed translation is a
 *  type error rather than a string that silently falls back at runtime. */
type Dict = Record<keyof typeof en, string>;

const th: Dict = {
    name: 'บรรณวัชร รัตนรักษ์',
    role_line: 'Full-Stack สายหลังบ้าน และ Game Developer',
    rail_available: 'เปิดรับฝึกงาน',
    rail_blurb:
        'นักศึกษาวิทยาการคอมพิวเตอร์ในไทย สร้างระบบที่อยู่รอดได้ และเกมที่ทำให้คนขนลุก',

    hero_seg1: 'ผมสร้างระบบฝั่ง backend เป็นหลัก — ',
    hero_link_api: 'REST API',
    hero_seg2: ', ',
    hero_link_bot: 'บอทเรียลไทม์ที่ส่งต่อ GitHub webhook เข้า Discord',
    hero_seg3: ', ',
    hero_link_npm: 'npm package ที่ซ่อมแซม API call ที่ล้มเหลวเองอัตโนมัติ',
    hero_seg4: ' — นอกเวลาผมออกแบบเกม ตอนนี้กำลังสร้าง ',
    hero_link_ember: 'Silent Ember',
    hero_seg5: ' เกมสยองขวัญที่กำลังทำกับเพื่อนด้วย Unity',

    strip_title: 'ระบบที่รันอยู่ตอนนี้',
    strip_note: 'สถานะสด',
    strip_last_event: 'อีเวนต์ล่าสุด',
    sys_wakeful: 'SaaS มอนิเตอร์ uptime — ผู้ใช้จริง เก็บเงินจริง ดูแลเองจริง',
    sys_reporadar: 'ส่ง GitHub webhook เข้า Discord แบบเรียลไทม์',
    sys_healer: 'npm package ที่ซ่อม API call ที่ล้มเหลวแล้วลองใหม่ให้',
    sys_ember: 'เกมสยองขวัญบน Unity ทำกันสองคน',

    status_live: 'กำลังทำงาน',
    status_up: 'ใช้งานจริง',
    status_shipped: 'เผยแพร่แล้ว',
    status_wip: 'กำลังพัฒนา',

    nav_label: 'หัวข้อ',
    nav_about: 'เกี่ยวกับ',
    nav_experience: 'ประสบการณ์',
    nav_skills: 'ทักษะ',
    nav_projects: 'ผลงาน',

    meta_about: 'ประเทศไทย · UTC+7',
    meta_skills: '{n} เครื่องมือ',
    meta_projects: '4 ระบบ · {n} repo',
    repo_index: 'ดัชนี repository',
    tech_label: 'เทคโนโลยี',
    play_video: 'เล่นวิดีโอเกมเพลย์ Silent Ember',

    theme_label: 'ธีมสี',
    theme_light: 'สว่าง',
    theme_dark: 'มืด',
    theme_system: 'ตามระบบ',
    lang_label: 'ภาษา',

    about_p1:
        'สวัสดีครับ ผมบรรณวัชร อายุ 21 ปี เรียนวิทยาการคอมพิวเตอร์ที่ราชมงคลอีสาน เป็น full-stack developer ที่เน้นหนักไปทางหลังบ้าน — API, เซิร์ฟเวอร์, การไหลของข้อมูล และ automation ที่ทำให้ทุกอย่างทำงานต่อเนื่อง',
    about_p2:
        'ผมชอบส่วนที่ยาก เช่น e-commerce API ด้วย Go, บอท DevOps แบบ real-time ที่ส่ง GitHub webhook เข้า Discord, และ npm package ที่ซ่อม API call ที่ล้มเหลวอัตโนมัติด้วย LLM ให้ความสำคัญกับ service ที่อยู่รอดตอนโหลดหนักและ fail อย่างนุ่มนวลเมื่อมีปัญหา',
    about_p3:
        'อีกครึ่งของผมคือทำเกม ผมออกแบบและสร้าง Silent Ember เกมสยองขวัญด้วย Unity ร่วมกับเพื่อน ตั้งแต่ core loop, mechanics ไปจนถึงระบบเบื้องหลัง ถนัด TypeScript กับ Golang เป็นหลัก และหยิบ Python, C#, Unity หรือ Godot มาใช้ตามงาน',

    exp1_role_label: 'Backend และ Full-Stack',
    exp1_title: 'Full-Stack Developer',
    exp1_desc:
        'สร้างระบบตั้งแต่หน้าบ้านถึงหลังบ้านโดยเน้นหลังบ้าน — REST API, pipeline แบบ real-time, ระบบ auth และ DevOps automation ใช้ Golang เมื่อ performance และความเสถียรสำคัญ และ TypeScript ทั่วทั้ง stack ผลงานมีทั้ง e-commerce API ด้วย Go, บอทที่ทำงานด้วย webhook และ npm library ที่เผยแพร่แล้ว',
    exp2_role_label: 'การพัฒนาเกม',
    exp2_title: 'Game Developer',
    exp2_desc:
        'ออกแบบและสร้างเกมด้วย Unity และ Godot ตั้งแต่ core loop, mechanics ไปจนถึงระบบที่ทำให้ทุกอย่างทำงานได้ Silent Ember เกมสยองขวัญที่ผมทำกับเพื่อนเป็นทีม 2 คน คือที่ที่ผมผสมงานวิศวกรรมกับการออกแบบเชิงสร้างสรรค์',

    skills_group_core: 'ทักษะหลัก',
    skills_group_frontend: 'Frontend',
    skills_group_backend: 'Backend',
    skills_group_gamedev: 'พัฒนาเกม',
    skills_group_tooling: 'เครื่องมือ',
    skills_group_mindset: 'แนวคิดการทำงาน',

    view_github: 'ดูทั้งหมดใน GitHub',
    view_resume: 'เรซูเม่',

    silent_ember_title: 'Silent Ember',
    silent_ember_desc:
        'เกมสยองขวัญที่ผมกำลังสร้างร่วมกับเพื่อน สำรวจบ้าน ค้นหาความทรงจำ และเอาชีวิตรอดจากสิ่งที่ซ่อนอยู่ในความมืด',
    silent_ember_status_hint: 'ตัวเกมให้เล่นเร็ว ๆ นี้',
};

const DICTS: Record<Language, Dict> = { en, th };

/**
 * `<html lang>` is the source of truth — the boot script in layout.tsx sets it
 * from localStorage before first paint. Reading it through useSyncExternalStore
 * keeps React in sync without a setState-in-effect pass, and has the side
 * benefit of keeping the document's advertised language honest for screen
 * readers and translation tools.
 */
const subscribe = (onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
};

const getSnapshot = (): Language => {
    const value = document.documentElement.lang;
    return isLanguage(value) ? value : DEFAULT_LANGUAGE;
};

const getServerSnapshot = (): Language => DEFAULT_LANGUAGE;

type LanguageContextValue = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const setLanguage = useCallback((lang: Language) => {
        document.documentElement.lang = lang;
        try {
            localStorage.setItem(LANG_STORAGE_KEY, lang);
        } catch {
            // private mode / storage disabled — the choice still holds for this session
        }
    }, []);

    const t = useCallback(
        (key: string): string => (DICTS[language] as Record<string, string>)[key] ?? key,
        [language]
    );

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
    return ctx;
}
