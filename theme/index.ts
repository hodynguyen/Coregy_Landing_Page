import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import { theme as baseTheme } from '@saas-ui/react'

import components from './components'
import { fontSizes } from './foundations/typography'

export const theme = extendTheme(
  {
    config: {
      // Fallback only; the visitor's local time picks the mode (lib/color-mode.ts)
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
    styles: {
      global: () => ({
        html: {
          scrollBehavior: 'smooth',
        },
        // Keep anchored sections clear of the fixed header
        '[id]': {
          scrollMarginTop: '80px',
        },
        body: {
          color: 'gray.900',
          bg: 'white',
          fontSize: 'lg',
          _dark: {
            color: 'gray.50',
            bg: 'gray.900',
          },
        },
      }),
    },
    fonts: {
      heading: 'Inter Variable, Inter, sans-serif',
      body: 'Inter Variable, Inter, sans-serif',
    },
    fontSizes,
    // Single accent color used for CTAs, links and icons
    colors: {
      primary: {
        50: '#EEF4FF',
        100: '#D9E5FF',
        200: '#B6CCFE',
        300: '#8AAAFB',
        400: '#5B82F5',
        500: '#3461E6',
        600: '#2449C4',
        700: '#1E3A9E',
        800: '#1E347D',
        900: '#1C2F63',
      },
    },
    components,
  },
  baseTheme,
)
