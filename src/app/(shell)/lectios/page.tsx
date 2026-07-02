import type { Metadata } from 'next'
import Link from 'next/link'
import { library, getLectiosByTableauId } from '@/lib/data'
import { SPUR_LABELS } from '@/lib/spuren'
import type { Spur, LectioSummary } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Lectios',
  description: 'Jeder Pfad beginnt bei einer Frage — vier bis sechs Stationen, ein Bogen, ein offenes Ende.',
}

// Spur-Reihenfolge — kanonisch wie in library.json und bibliothek-architektur.md
const SPUR_ORDER: Spur[] = ['erkenntnis', 'handlung', 'existenz', 'wandlung', 'menschenbild']

interface SpurGroup {
  spur: Spur
  color: string
  items: LectioSummary[]
}

function groupLectiosBySpur(): SpurGroup[] {
  return SPUR_ORDER
    .map(spur => {
      const tableaus = library.filter(e => e.spur === spur && e.status === 'available')
      return {
        spur,
        color: tableaus[0]?.themeColor ?? 'var(--accent)',
        items: tableaus.flatMap(t => getLectiosByTableauId(t.id)),
      }
    })
    .filter(group => group.items.length > 0)
}

export default function PfadePage() {
  const grouped = groupLectiosBySpur()

  return (
    <div className="px-8 md:px-12 py-12 max-w-[760px] mx-auto">

      <h1 className="font-prose font-medium text-[32px] md:text-[40px] text-[var(--fg)] mb-4 leading-tight">
        Wähle eine Frage
      </h1>
      <p className="font-body italic text-[15px] text-[var(--fg-muted)] mb-14 max-w-[58ch]">
        Eine Lectio ist ein geführter Pfad: einige Stationen, ein Bogen,
        ein offenes Ende. Du beginnst nicht bei einem Fachgebiet,
        sondern bei einer Frage — und folgst ihr.
      </p>

      <div className="flex flex-col gap-14">
        {grouped.map(({ spur, color, items }) => (
          <section key={spur}>
            {/* ── Spur-Header ── */}
            <div className="flex items-baseline gap-4 mb-2">
              <h2
                className="font-display text-[14px] tracking-[0.20em] shrink-0"
                style={{ color }}
              >
                {SPUR_LABELS[spur]}
              </h2>
              <span
                className="h-px flex-1"
                style={{ background: color, opacity: 0.28 }}
                aria-hidden
              />
            </div>

            {/* ── Pfade der Spur ── */}
            <div className="flex flex-col">
              {items.map(l => (
                <Link
                  key={l.id}
                  href={`/lectio/${l.id}?von=lectios`}
                  className="group flex items-baseline justify-between gap-4 py-3.5
                    border-b border-[var(--hairline)] no-underline"
                >
                  <span className="flex items-baseline gap-3 min-w-0">
                    <span
                      className="shrink-0 transition-transform group-hover:translate-x-0.5"
                      style={{ color: 'var(--accent)' }}
                      aria-hidden
                    >
                      →
                    </span>
                    <span className="font-prose text-[16px] md:text-[17px] leading-snug text-[var(--fg)]
                      transition-colors group-hover:text-[var(--accent)]">
                      {l.title}
                    </span>
                  </span>
                  <span className="font-ui text-[11px] text-[var(--fg-faint)] shrink-0">
                    {l.stationCount} Stationen
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
