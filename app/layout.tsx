import { ColorModeScript } from '@chakra-ui/react'
import Script from 'next/script'

import { metadata } from './(marketing)/metadata'
import { Provider } from './provider'

export { metadata }

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export default function Layout(props: { children: React.ReactNode }) {
  // Keep in sync with `initialColorMode` in theme/index.ts
  const colorMode = 'light'

  return (
    <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/logo.png"
        />
        <link rel="manifest" href="/static/favicons/manifest.json" />
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
      <body className={`chakra-ui-${colorMode}`}>
        <ColorModeScript initialColorMode={colorMode} />
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
