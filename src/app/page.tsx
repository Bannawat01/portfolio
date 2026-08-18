import Navigation from '@/components/Navigation';
import LanguageToggle from '@/components/LanguageToggle';
import ScrollProgress from '@/components/ScrollProgress';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <LanguageToggle />

      <div className="relative z-10 mx-auto min-h-screen max-w-6xl px-6 py-16 font-sans md:px-12 md:py-24 lg:px-16">
        <Navigation />

        <main id="content" className="mt-24">
          <About />
          <Experience />
          <Skills />
          <Projects />
        </main>
      </div>
    </>
  );
}
