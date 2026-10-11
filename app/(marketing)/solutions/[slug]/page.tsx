import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SolutionPage } from '#components/solution-page'
import { getSolution, solutions } from '#data/solutions'

interface Props {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const solution = getSolution(params.slug)
  if (!solution) return {}

  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
    alternates: { canonical: `/solutions/${solution.slug}` },
    openGraph: {
      title: solution.metaTitle,
      description: solution.metaDescription,
      url: `/solutions/${solution.slug}`,
    },
  }
}

export default function Page({ params }: Props) {
  const solution = getSolution(params.slug)
  if (!solution) notFound()

  return <SolutionPage slug={solution.slug} />
}
