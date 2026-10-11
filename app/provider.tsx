'use client'

import { SaasProvider } from '@saas-ui/react'

import { timeOfDayColorModeManager } from '#lib/color-mode'
import { theme } from '#theme'

export function Provider(props: { children: React.ReactNode }) {
  return (
    <SaasProvider theme={theme} colorModeManager={timeOfDayColorModeManager}>
      {props.children}
    </SaasProvider>
  )
}
