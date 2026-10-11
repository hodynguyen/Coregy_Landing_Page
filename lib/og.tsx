import { ImageResponse } from 'next/og'

import { logoColors, logoSize, mark, wordmarkPath } from '#data/logo-paths'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

// Matches theme primary.500 / gray.900 / gray.600
const accent = logoColors.accent
const ink = logoColors.ink
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
        <svg
          width={(logoSize.width / logoSize.height) * 72}
          height={72}
          viewBox={`0 0 ${logoSize.width} ${logoSize.height}`}
        >
          <rect width="48" height="48" rx={mark.radius} fill={accent} />
          <path
            d={mark.arc}
            fill="none"
            stroke="#fff"
            strokeWidth={mark.arcWidth}
            strokeLinecap="round"
          />
          <circle
            cx={mark.dot.cx}
            cy={mark.dot.cy}
            r={mark.dot.r}
            fill="#fff"
          />
          <path d={wordmarkPath} fill={ink} />
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
