import { ImageResponse } from 'next/og'

import { logoColors, mark } from '#data/logo-paths'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// iOS rounds the corners itself, so the tile is drawn full-bleed
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: logoColors.accent,
        }}
      >
        <svg width={180} height={180} viewBox="4 4 40 40">
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
        </svg>
      </div>
    ),
    size,
  )
}
