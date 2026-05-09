import { notFound } from 'next/navigation'
import { getTopic, library } from '@/lib/data'
import TopicViewer from '@/components/TopicViewer'

interface Props {
  params: Promise<{ topicId: string }>
}

export function generateStaticParams() {
  return library
    .filter(t => t.status === 'available')
    .map(t => ({ topicId: t.id }))
}

export default async function TopicPage({ params }: Props) {
  const { topicId } = await params
  const data = getTopic(topicId)
  if (!data) notFound()
  return <TopicViewer data={data} />
}
