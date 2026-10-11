import { getSolution, solutions } from '#data/solutions'
import { ogContentType, ogSize, renderOgImage } from '#lib/og'

export const alt = 'Coregy AI agent'
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }))
}

export default function Image({ params }: { params: { slug: string } }) {
  const solution = getSolution(params.slug)

  return renderOgImage({
    eyebrow: solution?.name ?? 'Coregy',
    headline: solution?.headline ?? '',
  })
}
