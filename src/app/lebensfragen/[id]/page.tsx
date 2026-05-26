import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLebensfrage, getLebensfrageIds, library } from '@/lib/data'
import LebensfrageViewer from '@/components/LebensfrageViewer'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getLebensfrageIds().map(id => ({ id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const lf = getLebensfrage(id)
  if (!lf) return {}
  return {
    title:       lf.title,
    description: lf.anker,
  }
}

export default async function LebensfragePage({ params }: Props) {
  const { id } = await params
  const lf = getLebensfrage(id)
  if (!lf) notFound()

  const tableauTitles = Object.fromEntries(
    library.map(e => [e.id, e.title])
  )

  return <LebensfrageViewer lebensfrage={lf} tableauTitles={tableauTitles} />
}
