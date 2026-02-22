document.addEventListener('DOMContentLoaded', () => {

    /* --- Mouse Tracking Spotlight Effect --- */
    const spotlight = document.getElementById('spotlight');

    // Check if device supports hover (typically desktop)
    const canHover = window.matchMedia('(hover: hover)').matches;

    if (canHover && spotlight) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
        });
    } else {
        // If not supported (e.g. mobile), hide or set fallback
        if (spotlight) spotlight.style.display = 'none';
    }


    /* --- Active Navigation State based on Scroll --- */
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
        threshold: 0
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the id of the intersecting section
                const id = entry.target.getAttribute('id');

                // Remove active class from all nav links
                document.querySelectorAll('.nav a').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const targetSections = document.querySelectorAll('section');
    if (targetSections.length > 0) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        targetSections.forEach(section => observer.observe(section));
    }


    /* --- Translation Logic --- */
    const translations = {
        en: {
            name: "Bannawat Rattanarak",
            role: "Software & Game Developer",
            description: "Computer Science student at Rajamangala University of Technology Isan. Building web applications and games.",
            nav_about: "About",
            nav_experience: "Experience",
            nav_projects: "Projects",
            about_p1: "Hello! I am Bannawat Rattanarak. I was born on September 15, 2004. Currently, I am deeply engaged in my studies at Rajamangala University of Technology Isan, pursuing a degree in Computer Science.",
            about_p2: "My journey in technology spans across multiple domains. I have hands-on experience in both frontend and backend web development, building robust systems and engaging user interfaces. In addition to web development, I am also passionate about game development, creating interactive experiences using Unity and Godot engines.",
            about_p3: "I specialize in TypeScript and Golang, which are my tools of choice for building scalable and maintainable applications. Throughout my learning and projects, I've also utilized Python, HTML, CSS, and JavaScript extensively.",
            exp1_role_label: "Web Development",
            exp1_title: "Frontend & Backend Developer",
            exp1_desc: "Experienced in creating full-stack web applications. I handle both creating intuitive and responsive user interfaces on the frontend, as well as designing robust, efficient backend services. My preferred stack leverages TypeScript for end-to-end safety and Golang for high-performance backend modules.",
            exp2_role_label: "Game Development",
            exp2_title: "Game Developer",
            exp2_desc: "Developed interactive games using industry-standard engines. I have experience designing game logic, mechanics, and systems using both Unity and Godot.",
            view_github: "View GitHub Profile",
            proj1_title: "Check out my GitHub for Projects",
            proj1_desc: "A collection of my web applications, games, and other software endeavors. Built with TypeScript, Golang, Godot, and more."
        },
        th: {
            name: "บรรณวัชร รัตนรักษ์",
            role: "นักพัฒนาซอฟต์แวร์และเกม",
            description: "นักศึกษาสาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน ผู้ชื่นชอบการสร้างเว็บไซต์และเกม",
            nav_about: "เกี่ยวกับ",
            nav_experience: "ประสบการณ์",
            nav_projects: "ผลงาน",
            about_p1: "สวัสดีครับ! ผมชื่อ นาย บรรณวัชร รัตนรักษ์ เกิดวันที่ 15/09/2004 ปัจจุบันกำลังศึกษาอยู่ที่ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน ในสาขาวิทยาการคอมพิวเตอร์",
            about_p2: "ผมมีประสบการณ์ในการพัฒนาเว็บไซต์ทั้งส่วน Frontend และ Backend สามารถสร้างระบบที่แข็งแกร่งและหน้าจอผู้ใช้ที่สวยงาม นอกจากนี้ผมยังมีประสบการณ์ในการพัฒนาเกมด้วยเอนจิน Unity และ Godot",
            about_p3: "ภาษาที่ผมถนัดคือ TypeScript และ Golang ส่วนภาษาอื่นๆ ที่เคยใช้งานในการพัฒนาโปรเจกต์ต่างๆ ได้แก่ Python, HTML, CSS, และ JavaScript",
            exp1_role_label: "การพัฒนาเว็บไซต์",
            exp1_title: "นักพัฒนา Frontend & Backend",
            exp1_desc: "มีประสบการณ์ในการสร้างเว็บแอปพลิเคชันแบบ Full-stack ทั้งหน้าบ้าน (Frontend) ที่ตอบสนองได้ดีเยี่ยม และหลังบ้าน (Backend) ที่มีประสิทธิภาพ โดยเน้นใช้งาน TypeScript และ Golang",
            exp2_role_label: "การพัฒนาเกม",
            exp2_title: "นักพัฒนาเกม",
            exp2_desc: "พัฒนาเกมแบบมีปฏิสัมพันธ์ด้วยเอนจินมาตรฐานของอุตสาหกรรม มีประสบการณ์ออกแบบกลไกเกมและระบบเกมโดยใช้ Unity และ Godot",
            view_github: "ดูโปรไฟล์ GitHub",
            proj1_title: "ดูโปรเจกต์เพิ่มเติมใน GitHub ของผม",
            proj1_desc: "ศูนย์รวมเว็บแอปพลิเคชัน เกม และผลงานทางซอฟต์แวร์อื่นๆ ที่สร้างด้วย TypeScript, Golang, Godot และอื่นๆ"
        }
    };

    let currentLang = 'en';
    const langEnBtn = document.getElementById('lang-en');
    const langThBtn = document.getElementById('lang-th');

    const updateDictionary = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update styling of buttons
        const activeClasses = 'px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-teal-400/10 text-teal-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300';
        const inactiveClasses = 'px-4 py-1.5 rounded-full text-xs font-bold transition-all text-slate-500 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300';

        if (lang === 'en') {
            langEnBtn.className = activeClasses;
            langThBtn.className = inactiveClasses;
        } else {
            langThBtn.className = activeClasses;
            langEnBtn.className = inactiveClasses;
        }
    };

    langEnBtn.addEventListener('click', () => {
        if (currentLang !== 'en') {
            currentLang = 'en';
            updateDictionary('en');
        }
    });

    langThBtn.addEventListener('click', () => {
        if (currentLang !== 'th') {
            currentLang = 'th';
            updateDictionary('th');
        }
    });
});

