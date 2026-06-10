import Link from 'next/link'
import type { Lebensfrage } from '@/lib/types'

const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

function formatDatum(iso: string): string {
  const parts = iso.split('-')
  const month = parseInt(parts[1], 10)
  return `${MONATE[month - 1]} ${parts[0]}`
}

interface Props {
  lebensfrage: Lebensfrage
  tableauTitles: Record<string, string>
}

export default function LebensfrageViewer({ lebensfrage, tableauTitles }: Props) {
  const { title, anker, intro, stimmen, schluss, kuratiert, kuratiert_aus_tableaus } = lebensfrage

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[680px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        {/* ── Back link ── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-ui text-[12px] tracking-[0.06em]
            text-[var(--fg-faint)] hover:text-[var(--fg-muted)] transition-colors no-underline mb-10"
        >
          <span style={{ color: 'var(--accent)' }}>←</span>
          Sanctum Mentis
        </Link>

        {/* ── Header ── */}
        <header className="mb-10">
          <h1
            className="font-display text-[28px] sm:text-[34px] tracking-[0.05em] leading-tight mb-3"
            style={{ color: 'var(--accent)' }}
          >
            {title}
          </h1>
          <p className="font-body italic text-[15px] text-[var(--fg-muted)] mb-8">
            {anker}
          </p>
          {intro.split('\n\n').map((para, i) => (
            <p
              key={i}
              className={`font-body italic text-[16px] leading-relaxed${i > 0 ? ' mt-4' : ''}`}
              style={{ color: 'var(--accent)' }}
            >
              {para}
            </p>
          ))}
        </header>

        <Trenner />

        {/* ── Stimmen ── */}
        {stimmen.map((stimme, i) => (
          <div key={i}>
            <article>
              <h2
                className="font-display text-[14px] tracking-[0.06em] leading-snug mb-3"
                style={{ color: 'var(--fg)' }}
              >
                {stimme.ueberschrift}
              </h2>
              <p className="font-body text-[15px] leading-relaxed text-[var(--fg)] mb-3">
                {stimme.text}
              </p>
              <Link
                href={`/thema/${stimme.aus.tableau}`}
                className="font-ui text-[11px] tracking-[0.06em] no-underline
                  text-[var(--fg-faint)] hover:text-[var(--fg-muted)] transition-colors"
              >
                {tableauTitles[stimme.aus.tableau] ?? stimme.aus.tableau}
              </Link>
            </article>
            <Trenner />
          </div>
        ))}

        {/* ── Schluss ── */}
        {schluss.split('\n\n').map((para, i) => (
          <p
            key={i}
            className={`font-body italic text-[16px] leading-relaxed${i > 0 ? ' mt-5' : ''}`}
            style={{ color: 'var(--accent)' }}
          >
            {para}
          </p>
        ))}

        {/* ── Metadaten ── */}
        <div className="mt-12 pt-6" style={{ borderTop: '1px solid var(--hairline)' }}>
          <p className="font-ui text-[11px] tracking-[0.04em]" style={{ color: 'var(--fg-faint)' }}>
            Kuratiert {formatDatum(kuratiert)}
            <span className="mx-2" style={{ color: 'var(--accent)', opacity: 0.5 }}>·</span>
            {'aus den Tableaus: '}
            {kuratiert_aus_tableaus.map((tableauId, i) => (
              <span key={tableauId}>
                {i > 0 && <span className="mr-1">,</span>}
                <Link
                  href={`/thema/${tableauId}`}
                  className="no-underline hover:text-[var(--fg-muted)] transition-colors"
                >
                  {tableauTitles[tableauId] ?? tableauId}
                </Link>
              </span>
            ))}
          </p>
        </div>

      </div>
    </div>
  )
}

function Trenner() {
  return <div className="my-8 h-px" style={{ background: 'var(--hairline)' }} />
}
