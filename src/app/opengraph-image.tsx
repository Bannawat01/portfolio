import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Bannawat Rattanarak - Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadInterFont(weight: number): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`;
  const css = await (
    await fetch(cssUrl, {
      headers: {
        // Old-Chrome UA forces Google Fonts to serve TTF instead of woff2 — satori (used by next/og) can't parse woff2.
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
      },
    })
  ).text();

  const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`failed to resolve Inter ${weight} font url`);

  const res = await fetch(match[1]);
  if (!res.ok) throw new Error(`failed to fetch Inter ${weight} font data`);
  return res.arrayBuffer();
}

export default async function Image() {
  let fonts: { name: string; data: ArrayBuffer; weight: 500 | 600 | 700; style: 'normal' }[] | undefined;

  try {
    const [interBold, interSemibold, interMedium] = await Promise.all([
      loadInterFont(700),
      loadInterFont(600),
      loadInterFont(500),
    ]);
    fonts = [
      { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      { name: 'Inter', data: interSemibold, weight: 600, style: 'normal' },
      { name: 'Inter', data: interMedium, weight: 500, style: 'normal' },
    ];
  } catch (err) {
    console.error('opengraph-image: failed to load Inter font, falling back to default sans-serif', err);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          // Satori has no CSS custom property support, so the social card is
          // pinned to the dark palette by hand. Keep these in step with the
          // [data-theme="dark"] block in globals.css.
          backgroundColor: '#0b0f11',
          backgroundImage:
            'radial-gradient(circle at 12% 10%, rgba(69,196,208,0.14), transparent 55%)',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#45c4d0',
            }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#45c4d0',
            }}
          >
            Open to internships
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 76,
            fontWeight: 700,
            color: '#f2f7f8',
            letterSpacing: -2,
          }}
        >
          Bannawat Rattanarak
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 18,
            fontSize: 32,
            fontWeight: 500,
            color: '#a3b4ba',
          }}
        >
          Backend-leaning full-stack &amp; game developer
        </div>

        {/* Carries the site's status-strip idea onto the social card. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            marginTop: 52,
            paddingTop: 28,
            borderTop: '1px solid #232f35',
            fontSize: 22,
            fontWeight: 500,
            color: '#7b8d94',
          }}
        >
          {['Wakeful', 'RepoRadar', 'ai-fetch-healer', 'Silent Ember'].map((name) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#45c4d0',
                }}
              />
              {name}
            </div>
          ))}
        </div>
      </div>
    ),
    fonts ? { ...size, fonts } : { ...size }
  );
}
