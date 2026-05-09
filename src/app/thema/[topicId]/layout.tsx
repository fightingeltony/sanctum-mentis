import { getTopic } from '@/lib/data'

interface Props {
  children: React.ReactNode
  params: Promise<{ topicId: string }>
}

export default async function TopicLayout({ children, params }: Props) {
  const { topicId } = await params
  const data = getTopic(topicId)

  const themeStyle: React.CSSProperties = data?.topic.theme
    ? ({
        '--accent':      data.topic.theme.accent,
        '--accent-soft': data.topic.theme.accentSoft,
        '--gold':        data.topic.theme.accent,
        '--gold-soft':   data.topic.theme.accentSoft,
      } as React.CSSProperties)
    : {}

  return (
    <div className="min-h-screen" style={themeStyle}>
      {children}
    </div>
  )
}
