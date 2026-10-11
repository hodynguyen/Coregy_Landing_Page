// Plausible custom events. The script is only loaded when
// NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set (see app/layout.tsx); otherwise these are no-ops.

type EventProps = Record<string, string | number | boolean>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void
  }
}

export type AnalyticsEvent =
  | 'cta_book_pilot_click'
  | 'solution_card_click'
  | 'pilot_form_submit'

export function track(event: AnalyticsEvent, props?: EventProps) {
  if (typeof window === 'undefined') return
  window.plausible?.(event, props ? { props } : undefined)
}
