import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLectio, getLectioIds, getTopic } from '@/lib/data'
import LectioViewer from '@/components/LectioViewer'

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

  return <LectioViewer lectio={lectio} topicData={topicData} />
}
