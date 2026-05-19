import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTopic, library } from '@/lib/data'
import TopicViewer from '@/components/TopicViewer'

interface Props {
  params:       Promise<{ topicId: string }>
  searchParams: Promise<{ highlight?: string; level?: string; tab?: string }>
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

export default async function TopicPage({ params, searchParams }: Props) {
  const { topicId } = await params
  const sp          = await searchParams
  const data        = getTopic(topicId)
  if (!data) notFound()

  return (
    <TopicViewer
      data={data}
      initialHighlight={sp?.highlight}
      initialLevel={sp?.level ? Number(sp.level) : undefined}
      initialTab={sp?.tab as 'denker' | 'einfluesse' | 'quadrant' | undefined}
    />
  )
}
