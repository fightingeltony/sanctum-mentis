import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllLebensfragen } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Lebensfragen',
  description: 'Konkrete Lebensfragen — kuratorische Stimmen-Sammlungen aus mehreren Tableaus.',
}

export default function LebensfragenPage() {
  const lebensfragen = getAllLebensfragen()

  return (
    <div className="max-w-[820px] mx-auto px-8 md:px-12 py-16 md:py-24">

      {/* ── Header ── */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-ui text-[11px] tracking-[0.12em]
          uppercase no-underline mb-12 transition-colors"
        style={{ color: 'var(--fg-muted)' }}
      >
        ← Sanctum Mentis
      </Link>

      <p className="font-ui text-[11px] tracking-[0.28em] uppercase mb-4"
        style={{ color: 'var(--gold)' }}>
        Lebensfragen
      </p>
      <h1 className="font-prose font-medium text-[28px] md:text-[36px] leading-[1.15]
        text-[--fg] mb-4"
        style={{ textWrap: 'balance' } as React.CSSProperties}>
        Wenn eine Frage dich nicht loslässt
      </h1>
      <p className="font-body text-[16px] text-[--fg-muted] leading-relaxed mb-14 max-w-[56ch]">
        Keine Tableau-Karte, keine Lectio — sondern eine einzige Frage, die aus mehreren
        Tableaus beantwortet wird. Neun Stimmen, die sich nicht einig sind.
      </p>

      {/* ── Cards ── */}
      <div className="flex flex-col gap-5">
        {lebensfragen.map(lf => (
          <Link
            key={lf.id}
            href={`/lebensfragen/${lf.id}`}
            className="group no-underline block rounded px-6 py-5 transition-colors"
            style={{
              background: 'var(--bg-raised)',
              border: '1px solid var(--hairline)',
            }}
          >
            <p className="font-ui text-[10px] tracking-[0.22em] uppercase mb-2 transition-colors"
              style={{ color: 'var(--fg-faint)' }}>
              {lf.stimmen.length} Stimmen
            </p>
            <h2 className="font-prose font-medium text-[18px] text-[--fg] mb-2
              group-hover:text-[--gold] transition-colors">
              {lf.title}
            </h2>
            <p className="font-body italic text-[14px] text-[--fg-muted] leading-relaxed">
              {lf.anker}
            </p>
          </Link>
        ))}
      </div>

      <p className="font-body italic text-[12px] mt-10" style={{ color: 'var(--fg-faint)' }}>
        Weitere Fragen im Aufbau.
      </p>
    </div>
  )
}
