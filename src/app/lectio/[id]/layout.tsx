import type { CSSProperties } from 'react'
import { getLectio } from '@/lib/data'
import { getTopic } from '@/lib/data'

interface Props {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export default async function LectioLayout({ children, params }: Props) {
  const { id } = await params
  const lectio = getLectio(id)
  const topicData = lectio ? getTopic(lectio.tableauId) : null

  const themeStyle: CSSProperties = topicData?.topic.theme
    ? ({
        '--accent':      topicData.topic.theme.accent,
        '--accent-soft': topicData.topic.theme.accentSoft,
        '--gold':        topicData.topic.theme.accent,
        '--gold-soft':   topicData.topic.theme.accentSoft,
      } as CSSProperties)
    : {}

  return (
    <div className="min-h-screen" style={themeStyle}>
      {children}
    </div>
  )
}
