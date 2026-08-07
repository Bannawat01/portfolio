import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Bannawat Rattanarak - Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
          backgroundColor: '#0d0d14',
          backgroundImage:
            'radial-gradient(circle at 15% 15%, rgba(139,127,255,0.18), transparent 55%), radial-gradient(circle at 85% 85%, rgba(139,127,255,0.12), transparent 55%)',
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
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#2ee6a6',
            }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#7ff0c8',
            }}
          >
            Open for Internship
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 76,
            fontWeight: 700,
            color: '#f0f0f8',
            letterSpacing: -1.5,
          }}
        >
          Bannawat Rattanarak
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            fontSize: 34,
            fontWeight: 500,
            color: '#8b7fff',
          }}
        >
          Software &amp; Game Developer
        </div>
      </div>
    ),
    { ...size }
  );
}
