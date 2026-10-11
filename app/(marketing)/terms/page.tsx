import type { Metadata } from 'next'

import { LegalPage } from '#components/legal-page'

export const metadata: Metadata = {
  title: 'Terms of use',
  alternates: { canonical: '/terms' },
}

export default function Page() {
  return <LegalPage doc="terms" />
}
