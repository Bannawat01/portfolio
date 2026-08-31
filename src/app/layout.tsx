import type { Metadata } from 'next';
import { Inter, Schibsted_Grotesk, IBM_Plex_Mono, IBM_Plex_Sans_Thai } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { BOOT_SCRIPT } from '@/lib/boot';

// Display: tight grotesque for the name and card titles.
const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  weight: ['400', '500', '600', '700'],
});

// Body: neutral workhorse. Personality lives in the display and mono faces.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Data, labels, timestamps — Plex Mono reads as infrastructure, which is the
// subject of most of this page.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400', '500', '600'],
});

// Thai body text. Inter ships no Thai glyphs, so without this the TH locale
// falls back to whatever the OS picks and stops matching the design.
const plexThai = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  variable: '--font-plex-thai',
  weight: ['400', '500', '600'],
});

const SITE_URL = 'https://bannawat.site';
const TITLE = 'Bannawat Rattanarak - Portfolio';
const DESCRIPTION =
  'Game developer and backend-leaning full-stack developer. Building Silent Ember, an NSC national-finalist horror game in Unity.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Bannawat Rattanarak',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Bannawat Rattanarak',
  jobTitle: 'Game Developer & Full-Stack Developer',
  url: SITE_URL,
  sameAs: [
    'https://github.com/Bannawat01',
    'https://www.linkedin.com/in/bannawat/',
    'https://www.facebook.com/bannawat.runttanarak',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVars = `${schibsted.variable} ${inter.variable} ${plexMono.variable} ${plexThai.variable}`;

  return (
    <html
      lang="en"
      data-theme="light"
      className={`${fontVars} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Resolves the stored theme (including 'system') and stamps data-theme
          before first paint. Must stay inline and render-blocking here — moving
          it into a component flashes the light palette on every dark-mode load.
          Content is a compile-time constant; no user input reaches it.
        */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
