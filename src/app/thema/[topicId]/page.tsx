import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getTopic, getLectiosByTableauId, library } from '@/lib/data'
import TopicViewer from '@/components/TopicViewer'

interface Props {
  params: Promise<{ topicId: string }>
}

export function generateStaticParams() {
  return library
    .filter(t => t.status === 'available')
    .map(t => ({ topicId: t.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId } = await params
  const data        = getTopic(topicId)
  if (!data) return {}

  const { title, subtitle } = data.topic
  const description         = subtitle ?? 'Eine Bibliothek der großen Fragen.'

  return {
    title:       title,
    description: description,
    openGraph: {
      title:       title,
      description: description,
      url:         `https://sanctum-mentis.vercel.app/thema/${topicId}`,
      images:      [{ url: '/og-image', width: 1200, height: 630 }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       title,
      description: description,
      images:      ['/og-image'],
    },
  }
}

export default async function TopicPage({ params }: Props) {
  const { topicId } = await params
  const data        = getTopic(topicId)
  if (!data) notFound()

  const lectios = getLectiosByTableauId(topicId)

  // TopicViewer reads URL params via useSearchParams() (Client Component).
  // Suspense boundary required by Next.js when useSearchParams is used below
  // a Server Component without a searchParams prop.
  return (
    <Suspense>
      <TopicViewer data={data} lectios={lectios} />
    </Suspense>
  )
}
