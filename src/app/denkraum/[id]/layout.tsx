import type { CSSProperties } from 'react'
import { getDenkraumTisch } from '@/lib/data'

interface Props {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

// Der Denkraum hängt an keinem Topic – sein Akzent kommt aus dem eigenen JSON.
export default async function DenkraumLayout({ children, params }: Props) {
  const { id } = await params
  const denkraum = getDenkraumTisch(id)

  const themeStyle: CSSProperties = denkraum
    ? ({
        '--accent':      denkraum.theme.accent,
        '--accent-soft': denkraum.theme.accentSoft,
        '--gold':        denkraum.theme.accent,
        '--gold-soft':   denkraum.theme.accentSoft,
      } as CSSProperties)
    : {}

  return (
    <div className="min-h-screen" style={themeStyle}>
      {children}
    </div>
  )
}
