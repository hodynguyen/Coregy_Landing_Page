import type { MetadataRoute } from 'next'

import siteConfig from '#data/config'
import { solutions } from '#data/solutions'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    ...solutions.map(({ slug }) => `/solutions/${slug}`),
    '/privacy',
    '/terms',
  ]

  return paths.map((path) => ({ url: `${siteConfig.url}${path}` }))
}
