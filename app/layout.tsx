import Script from 'next/script'

import { colorModeScript } from '#lib/color-mode'

import { metadata } from './(marketing)/metadata'
import { Provider } from './provider'

export { metadata }

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export default function Layout(props: { children: React.ReactNode }) {
  // Server-rendered default; colorModeScript switches to the visitor's
  // time-of-day mode before paint (see lib/color-mode.ts)
  const colorMode = 'light'

  return (
    <html
      lang="en"
      data-theme={colorMode}
      style={{ colorScheme: colorMode }}
      suppressHydrationWarning
    >
      <head>
        {plausibleDomain && (
          <>
            <Script
              defer
              data-domain={plausibleDomain}
              src="https://plausible.io/js/script.js"
              strategy="afterInteractive"
            />
            <Script id="plausible-queue" strategy="afterInteractive">
              {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
            </Script>
          </>
        )}
      </head>
      <body className={`chakra-ui-${colorMode}`} suppressHydrationWarning>
        <script
          id="color-mode"
          dangerouslySetInnerHTML={{ __html: colorModeScript }}
        />
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
