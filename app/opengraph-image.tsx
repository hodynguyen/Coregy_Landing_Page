import siteConfig from '#data/config'
import home from '#data/home'
import { ogContentType, ogSize, renderOgImage } from '#lib/og'

export const alt = siteConfig.seo.title
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: home.hero.eyebrow,
    headline: home.hero.title,
  })
}
