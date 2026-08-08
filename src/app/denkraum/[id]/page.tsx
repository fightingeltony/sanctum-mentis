import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDenkraumIds, getDenkraumTisch } from '@/lib/data'
import DenkraumTisch from '@/components/DenkraumTisch'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getDenkraumIds().map(id => ({ id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const denkraum = getDenkraumTisch(id)
  if (!denkraum) return {}
  return {
    title:       denkraum.title,
    // Beta-Prototyp – bewusst nicht indexieren
    robots:      { index: false },
  }
}

export default async function DenkraumPage({ params }: Props) {
  const { id } = await params
  // getDenkraumTisch wirft bei kaputten Referenzen – absichtlich nicht
  // abgefangen, damit Datenfehler den SSG-Build scheitern lassen.
  const denkraum = getDenkraumTisch(id)
  if (!denkraum) notFound()

  return <DenkraumTisch denkraum={denkraum} />
}
