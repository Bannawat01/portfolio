import Rail from '@/components/Rail';
import Intro from '@/components/Intro';
import SystemsStrip from '@/components/SystemsStrip';
import ScrollProgress from '@/components/ScrollProgress';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';

export default function Home() {
  return (
    <>
      {/* Static depth layers — painted once, never animated. See globals.css. */}
      <div aria-hidden="true" className="ambient" />
      <div aria-hidden="true" className="grain" />

      <ScrollProgress />

      {/*
        Two columns from `lg` up: the rail is sticky and full-height, the right
        column scrolls. Below `lg` it collapses to one column and the rail
        becomes an ordinary header — no fixed overlay anywhere, which is what
        broke the previous two-column attempt.
      */}
      <div className="relative z-[1] mx-auto max-w-6xl px-5 py-12 md:px-8 lg:grid lg:grid-cols-[minmax(0,20.5rem)_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:py-0">
        <Rail />

        <main id="content" className="mt-16 space-y-24 lg:mt-0 lg:py-24">
          <div className="space-y-10">
            <Intro />
            <SystemsStrip />
          </div>

          <About />
          <Experience />
          <Skills />
          <Projects />

          <footer className="border-t border-border pt-6 pb-2 font-mono text-[10.5px] text-dim">
            Built with Next.js and Tailwind CSS.
          </footer>
        </main>
      </div>
    </>
  );
}
