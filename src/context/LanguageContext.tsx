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
    role_line: 'Game developer · backend-leaning full-stack',
    rail_available: 'Open to internships',
    rail_blurb:
        'CS student in Thailand. I build games that unsettle people, and backend systems that stay up.',

    hero_seg1: 'I design and build games. Right now that means ',
    hero_link_ember: 'Silent Ember',
    hero_seg2:
        " — a two-person psychological horror game in Unity that took my region's place in the National Software Contest national final and pitched in the RMUTI CON startup track. The other half of my work is backend-heavy systems: ",
    hero_link_api: 'REST APIs',
    hero_seg3: ', ',
    hero_link_bot: 'a real-time bot that streams GitHub webhooks to Discord',
    hero_seg4: ', and ',
    hero_link_npm: 'an npm package that self-heals failing API calls',
    hero_seg5: '.',

    strip_title: 'Currently running',
    strip_note: 'Live status',
    strip_last_event: 'last event',
    sys_wakeful: 'Uptime-monitoring SaaS — real users, real billing, real on-call.',
    sys_reporadar: 'GitHub webhooks to Discord, in real time.',
    sys_healer: 'npm package that heals failing API calls and retries them.',
    sys_ember: 'Psychological horror in Unity — NSC national finalist, built by two.',

    status_live: 'Live',
    status_up: 'Production',
    status_shipped: 'Published',
    status_wip: 'In development',

    nav_label: 'Sections',
    nav_about: 'About',
    nav_experience: 'Experience',
    nav_skills: 'Skills',
    nav_projects: 'Projects',

    meta_about: 'Nakhon Ratchasima · UTC+7',
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
        "Hey, I'm Bannawat — a 21-year-old CS student at Rajamangala University of Technology Isan. I design and build games. With one teammate I'm making Silent Ember, a psychological horror game in Unity: the core loop, the mechanics, and the systems underneath.",
    about_p2:
        "Silent Ember took our region's place in the National Software Contest (NSC) national final in the entertainment-software category and earned development funding, and we pitched it in the RMUTI CON startup track. It reads what the player chooses to look at and decides the ending from that — no meter on screen, only the lantern's flame.",
    about_p3:
        'The other half of me is a backend-leaning full-stack developer: a Go e-commerce API, a real-time DevOps bot that streams GitHub webhooks to Discord, an npm package that auto-heals failing API calls with an LLM. TypeScript and Golang are my go-to tools; I reach for Python, C#, Unity, or Godot when the job calls for it.',

    exp_game_label: 'Game development',
    exp_game_title: 'Game Developer',
    exp_game_desc:
        "I design and build games in Unity and Godot — core loops, mechanics, and the systems that hold them together. Silent Ember, a two-person psychological horror game in Unity, is the current focus: it took our region's place in the NSC national final (entertainment software), earned development funding, and was pitched in the RMUTI CON startup track. I own the architecture and all the C#.",
    exp_stack_label: 'Backend & full-stack',
    exp_stack_title: 'Full-Stack Developer',
    exp_stack_desc:
        'I build systems back-to-front with a backend focus — REST APIs, real-time pipelines, auth, and DevOps automation. Golang when performance and reliability matter, TypeScript across the stack. My work includes a Go e-commerce API, a webhook-driven bot, and a published npm library.',

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
        "A two-person psychological horror game in Unity. Explore a burned house, uncover what happened to Jonas's family, and reach one of several endings. The game quietly measures which memories you choose to read — 15 optional pieces, none on the main path — and decides the ending from that. No meter on screen: the lantern's flame steadies as you understand more.",
    silent_ember_meta: 'Unity 6 · C# · two-person team · 2022–present',
    silent_ember_award1_t: 'NSC 2026',
    silent_ember_award1_d:
        'Regional representative (Northeast Thailand) at the National Software Contest national final, entertainment-software category. Received development funding.',
    silent_ember_award2_t: 'RMUTI CON',
    silent_ember_award2_d:
        'Pitched in the startup track — market sizing, pricing, and go-to-market for a commercial Steam release.',
    silent_ember_award3_t: 'Signature system',
    silent_ember_award3_d:
        'Event-driven architecture; 6 core systems with no per-frame Update(). The ending is gated on exploration — measured at 7% rushed vs 87% thorough in playtests.',
    silent_ember_award4_t: 'My role',
    silent_ember_award4_d:
        'Team lead — architecture, save/load, game systems, and all C#.',
    silent_ember_status_hint: 'Playable build coming soon.',
};

/** Keys are checked against the English source, so a missed translation is a
 *  type error rather than a string that silently falls back at runtime. */
type Dict = Record<keyof typeof en, string>;

const th: Dict = {
    name: 'บรรณวัชร รัตนรักษ์',
    role_line: 'Game Developer · Full-Stack สายหลังบ้าน',
    rail_available: 'เปิดรับฝึกงาน',
    rail_blurb:
        'นักศึกษาวิทยาการคอมพิวเตอร์ในไทย สร้างเกมที่ทำให้คนขนลุก และระบบหลังบ้านที่อยู่รอดได้',

    hero_seg1: 'ผมออกแบบและสร้างเกม ตอนนี้คือ ',
    hero_link_ember: 'Silent Ember',
    hero_seg2:
        ' — เกมสยองขวัญเชิงจิตวิทยาบน Unity ทีม 2 คน ที่เป็นตัวแทนภาคตะวันออกเฉียงเหนือเข้ารอบชิงชนะเลิศระดับประเทศ NSC และได้พิตช์ในสาย Startup ของ RMUTI CON อีกครึ่งหนึ่งของงานผมคือระบบฝั่งหลังบ้าน: ',
    hero_link_api: 'REST API',
    hero_seg3: ', ',
    hero_link_bot: 'บอทเรียลไทม์ที่ส่งต่อ GitHub webhook เข้า Discord',
    hero_seg4: ' และ ',
    hero_link_npm: 'npm package ที่ซ่อม API call ที่ล้มเหลวเองอัตโนมัติ',
    hero_seg5: '',

    strip_title: 'ระบบที่รันอยู่ตอนนี้',
    strip_note: 'สถานะสด',
    strip_last_event: 'อีเวนต์ล่าสุด',
    sys_wakeful: 'SaaS มอนิเตอร์ uptime — ผู้ใช้จริง เก็บเงินจริง ดูแลเองจริง',
    sys_reporadar: 'ส่ง GitHub webhook เข้า Discord แบบเรียลไทม์',
    sys_healer: 'npm package ที่ซ่อม API call ที่ล้มเหลวแล้วลองใหม่ให้',
    sys_ember: 'เกมสยองขวัญเชิงจิตวิทยาบน Unity — เข้ารอบชิงชนะเลิศ NSC ทำกันสองคน',

    status_live: 'กำลังทำงาน',
    status_up: 'ใช้งานจริง',
    status_shipped: 'เผยแพร่แล้ว',
    status_wip: 'กำลังพัฒนา',

    nav_label: 'หัวข้อ',
    nav_about: 'เกี่ยวกับ',
    nav_experience: 'ประสบการณ์',
    nav_skills: 'ทักษะ',
    nav_projects: 'ผลงาน',

    meta_about: 'นครราชสีมา · UTC+7',
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
        'สวัสดีครับ ผมบรรณวัชร อายุ 21 ปี เรียนวิทยาการคอมพิวเตอร์ที่มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน ผมออกแบบและสร้างเกม ตอนนี้ทำ Silent Ember เกมสยองขวัญเชิงจิตวิทยาบน Unity ร่วมกับเพื่อนอีกคน ตั้งแต่ core loop, mechanics ไปจนถึงระบบเบื้องหลัง',
    about_p2:
        'Silent Ember เป็นตัวแทนภาคตะวันออกเฉียงเหนือเข้ารอบชิงชนะเลิศระดับประเทศ NSC หมวดโปรแกรมเพื่อความบันเทิง และได้รับทุนสนับสนุนการพัฒนา และเรายังนำไปพิตช์ในสาย Startup ของงาน RMUTI CON เกมอ่านว่าผู้เล่นเลือกจะมองอะไร แล้วเอาไปกำหนดตอนจบ โดยไม่มีมาตรวัดบนจอ ใช้เพียงเปลวไฟของตะเกียงบอกแทน',
    about_p3:
        'อีกครึ่งของผมคือ full-stack สายหลังบ้าน เช่น e-commerce API ด้วย Go, บอท DevOps แบบเรียลไทม์ที่ส่ง GitHub webhook เข้า Discord, และ npm package ที่ซ่อม API call ที่ล้มเหลวอัตโนมัติด้วย LLM ถนัด TypeScript กับ Golang เป็นหลัก และหยิบ Python, C#, Unity หรือ Godot มาใช้ตามงาน',

    exp_game_label: 'การพัฒนาเกม',
    exp_game_title: 'Game Developer',
    exp_game_desc:
        'ออกแบบและสร้างเกมด้วย Unity และ Godot ตั้งแต่ core loop, mechanics ไปจนถึงระบบที่ทำให้ทุกอย่างทำงานร่วมกัน ตอนนี้โฟกัสที่ Silent Ember เกมสยองขวัญเชิงจิตวิทยาบน Unity ทีม 2 คน เป็นตัวแทนภาคตะวันออกเฉียงเหนือเข้ารอบชิงชนะเลิศ NSC หมวดโปรแกรมเพื่อความบันเทิง ได้รับทุนสนับสนุน และนำไปพิตช์ในสาย Startup ของ RMUTI CON ผมดูแลสถาปัตยกรรมระบบและโค้ด C# ทั้งหมด',
    exp_stack_label: 'Backend และ Full-Stack',
    exp_stack_title: 'Full-Stack Developer',
    exp_stack_desc:
        'สร้างระบบตั้งแต่หน้าบ้านถึงหลังบ้านโดยเน้นหลังบ้าน — REST API, pipeline แบบเรียลไทม์, ระบบ auth และ DevOps automation ใช้ Golang เมื่อ performance และความเสถียรสำคัญ และ TypeScript ทั่วทั้ง stack ผลงานมีทั้ง e-commerce API ด้วย Go, บอทที่ทำงานด้วย webhook และ npm library ที่เผยแพร่แล้ว',

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
        'เกมสยองขวัญเชิงจิตวิทยาบน Unity ทีม 2 คน สำรวจบ้านที่เคยไฟไหม้ ค้นหาว่าเกิดอะไรขึ้นกับครอบครัวของ Jonas และไปให้ถึงหนึ่งในหลายตอนจบ เกมแอบนับว่าผู้เล่นเลือกอ่านความทรงจำชิ้นไหนบ้าง — เนื้อหาเสริม 15 ชิ้น ไม่มีชิ้นไหนอยู่บนเส้นทางหลัก — แล้วเอาไปกำหนดตอนจบ ไม่มีมาตรวัดบนจอ ใช้ความนิ่งของเปลวไฟตะเกียงบอกแทนเมื่อผู้เล่นเข้าใจเรื่องมากขึ้น',
    silent_ember_meta: 'Unity 6 · C# · ทีม 2 คน · 2022–ปัจจุบัน',
    silent_ember_award1_t: 'NSC 2569',
    silent_ember_award1_d:
        'ตัวแทนภาคตะวันออกเฉียงเหนือเข้ารอบชิงชนะเลิศระดับประเทศ หมวดโปรแกรมเพื่อความบันเทิง และได้รับทุนสนับสนุนการพัฒนา',
    silent_ember_award2_t: 'RMUTI CON',
    silent_ember_award2_d:
        'นำเสนอในสาย Startup — ประเมินขนาดตลาด การตั้งราคา และแผนออกสู่ตลาดสำหรับการวางจำหน่ายบน Steam',
    silent_ember_award3_t: 'ระบบเด่น',
    silent_ember_award3_d:
        'สถาปัตยกรรมขับเคลื่อนด้วยเหตุการณ์ ระบบหลัก 6 ตัวไม่มี Update() ต่อเฟรม ตอนจบผูกกับการสำรวจ วัดจริงได้ 7% (เล่นรีบ) และ 87% (เล่นละเอียด)',
    silent_ember_award4_t: 'บทบาทของผม',
    silent_ember_award4_d:
        'หัวหน้าทีม — สถาปัตยกรรม ระบบเซฟ/โหลด ระบบเกม และโค้ด C# ทั้งหมด',
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
