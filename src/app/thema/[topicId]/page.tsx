import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTopic, getLectiosByTableauId, library } from '@/lib/data'
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

  const lectios = getLectiosByTableauId(topicId)

  const VALID_TABS = ['denker', 'einfluesse', 'quadrant', 'sternkarte'] as const
  type Tab = typeof VALID_TABS[number]
  const rawTab = sp?.tab
  const initialTab: Tab | undefined = (VALID_TABS as readonly string[]).includes(rawTab ?? '')
    ? rawTab as Tab
    : undefined

  return (
    <TopicViewer
      data={data}
      lectios={lectios}
      initialHighlight={sp?.highlight}
      initialLevel={sp?.level ? Number(sp.level) : undefined}
      initialTab={initialTab}
    />
  )
}
