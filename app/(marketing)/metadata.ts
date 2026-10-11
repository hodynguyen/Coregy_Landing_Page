import type { Metadata } from 'next'

import siteConfig from '#data/config'

const { title, titleTemplate, description } = siteConfig.seo

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: titleTemplate,
  },
  description,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title,
    description,
    url: '/',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}
