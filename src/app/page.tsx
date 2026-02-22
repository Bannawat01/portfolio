import Navigation from '@/components/Navigation';
import MouseSpotlight from '@/components/MouseSpotlight';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';

export default function Home() {
  return (
    <>
      <MouseSpotlight />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">

          <Navigation />

          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            <About />
            <Experience />
            <Projects />

            <footer className="max-w-md pb-16 text-sm text-[#6e7681] sm:pb-0">
              <p>
                Designed in <a href="https://www.figma.com/" className="font-medium text-[#8b949e] hover:text-[#58a6ff] focus-visible:text-[#58a6ff] transition-colors" target="_blank" rel="noreferrer">Figma</a> and coded in <a href="https://code.visualstudio.com/" className="font-medium text-[#8b949e] hover:text-[#58a6ff] focus-visible:text-[#58a6ff] transition-colors" target="_blank" rel="noreferrer">Visual Studio Code</a>.
                Rebuilt using <a href="https://nextjs.org/" className="font-medium text-[#8b949e] hover:text-[#58a6ff] focus-visible:text-[#58a6ff] transition-colors" target="_blank" rel="noreferrer">Next.js</a> and <a href="https://tailwindcss.com/" className="font-medium text-[#8b949e] hover:text-[#58a6ff] focus-visible:text-[#58a6ff] transition-colors" target="_blank" rel="noreferrer">Tailwind CSS</a>.
                Typography by <a href="https://rsms.me/inter/" className="font-medium text-[#8b949e] hover:text-[#58a6ff] focus-visible:text-[#58a6ff] transition-colors" target="_blank" rel="noreferrer">Inter</a>.
              </p>
            </footer>
          </main>

        </div>
      </div>
    </>
  );
}
