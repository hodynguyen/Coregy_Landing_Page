import { ImageResponse } from 'next/og'

import { logoPaths } from '#data/logo-paths'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

// Matches theme primary.500 / gray.900 / gray.600
const accent = '#3461E6'
const ink = '#171923'
const muted = '#4A5568'

interface OgImageProps {
  eyebrow: string
  headline: string
}

export function renderOgImage({ eyebrow, headline }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: '64px 80px',
          borderTop: `12px solid ${accent}`,
        }}
      >
        {/* Crop the logo's 1000x250 viewBox to the drawn area */}
        <svg width={380} height={116} viewBox="20 0 700 214">
          {logoPaths.map((d) => (
            <path key={d} fill={ink} d={d} />
          ))}
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: accent,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: headline.length > 70 ? 54 : 64,
              fontWeight: 700,
              color: ink,
              lineHeight: 1.15,
            }}
          >
            {headline}
          </div>
        </div>
        <div style={{ fontSize: 24, color: muted }}>
          coregy.com.vn · Free 2-week pilot
        </div>
      </div>
    ),
    ogSize,
  )
}
