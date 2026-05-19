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
