import type { ChakraProviderProps, ColorMode } from '@chakra-ui/react'

type StorageManager = NonNullable<ChakraProviderProps['colorModeManager']>

// Light during the visitor's local daytime, dark otherwise.
export const DAY_START_HOUR = 6
export const DAY_END_HOUR = 18

// A manual toggle that differs from the clock is kept for the tab session
// only, so the next visit follows the visitor's time of day again.
const OVERRIDE_KEY = 'coregy-color-mode'

export function timeOfDayColorMode(date = new Date()): ColorMode {
  const hour = date.getHours()
  return hour >= DAY_START_HOUR && hour < DAY_END_HOUR ? 'light' : 'dark'
}

function readOverride(): ColorMode | undefined {
  try {
    const value = sessionStorage.getItem(OVERRIDE_KEY)
    return value === 'light' || value === 'dark' ? value : undefined
  } catch {
    return undefined
  }
}

export const timeOfDayColorModeManager: StorageManager = {
  type: 'localStorage',
  ssr: false,
  get() {
    if (typeof window === 'undefined') return undefined
    return readOverride() ?? timeOfDayColorMode()
  },
  set(value) {
    try {
      if (value === timeOfDayColorMode()) {
        sessionStorage.removeItem(OVERRIDE_KEY)
      } else {
        sessionStorage.setItem(OVERRIDE_KEY, value)
      }
    } catch {
      // Storage blocked: the toggle still works for this page view
    }
  },
}

// Runs before paint (replaces Chakra's ColorModeScript) so the page never
// flashes the wrong mode. Must mirror timeOfDayColorModeManager.get().
export const colorModeScript = `(function(){try{var m=null;try{m=sessionStorage.getItem('${OVERRIDE_KEY}')}catch(e){}if(m!=='light'&&m!=='dark'){var h=new Date().getHours();m=h>=${DAY_START_HOUR}&&h<${DAY_END_HOUR}?'light':'dark'}var d=document.documentElement,b=document.body,o=m==='dark'?'light':'dark';d.dataset.theme=m;d.style.colorScheme=m;b.classList.add('chakra-ui-'+m);b.classList.remove('chakra-ui-'+o)}catch(e){}})()`
