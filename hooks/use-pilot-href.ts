import { usePathname } from 'next/navigation'

// The pilot form lives on the home page and on every solution page.
// Elsewhere (privacy, terms) link back to the home page form.
export function usePilotHref() {
  const pathname = usePathname()
  const hasForm = pathname === '/' || pathname?.startsWith('/solutions/')
  return hasForm ? '#pilot' : '/#pilot'
}
