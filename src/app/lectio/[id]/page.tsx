import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getLectio, getLectioIds, getTopic } from '@/lib/data'
import LectioViewer from '@/components/LectioViewer'
import LectioNarrativeViewer from '@/components/LectioNarrativeViewer'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getLectioIds().map(id => ({ id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const lectio = getLectio(id)
  if (!lectio) return {}
  return {
    title:       lectio.title,
    description: lectio.thesis,
  }
}

export default async function LectioPage({ params }: Props) {
  const { id } = await params
  const lectio = getLectio(id)
  if (!lectio) notFound()

  const topicData = getTopic(lectio.tableauId)
  if (!topicData) notFound()

  // Suspense: die Viewer lesen ?von= via useSearchParams() client-seitig —
  // Boundary nötig, damit die Seite SSG bleibt (gleiches Muster wie TopicViewer)
  if (lectio.ton === 'erzählend-erfahrend' || lectio.ton === 'gemischt') {
    return (
      <Suspense>
        <LectioNarrativeViewer lectio={lectio} topicData={topicData} />
      </Suspense>
    )
  }

  return (
    <Suspense>
      <LectioViewer lectio={lectio} topicData={topicData} />
    </Suspense>
  )
}
