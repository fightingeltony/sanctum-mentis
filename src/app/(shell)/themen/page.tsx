import Link from 'next/link'
import { library } from '@/lib/data'
import { SPUR_LABELS } from '@/lib/spuren'
import type { Spur } from '@/lib/types'
import type { LibraryEntry } from '@/lib/data'

// Spur-Reihenfolge — kanonisch wie in library.json und bibliothek-architektur.md
const SPUR_ORDER: Spur[] = ['erkenntnis', 'handlung', 'existenz', 'wandlung', 'menschenbild']

// Kurz-Beschreibung pro Spur — die kuratorische Klammer, sichtbar im Header
const SPUR_BLURB: Record<Spur, string> = {
  erkenntnis:   'Was ist Erkennen, wer erkennt, was wird erkannt — die Trias der Erkenntnis.',
  handlung:     'Vom Wissen zum Tun — was wir sollen und wie wir zusammenleben.',
  existenz:     'Das gelebte Dasein — Freiheit, Sinn und die Kunst, gut zu leben.',
  wandlung:     'Wie verändert sich ein Mensch — was heilt, was transformiert, was lässt ihn ein anderer werden.',
  menschenbild: 'Was ist der Mensch? — die anthropologische Grundfrage, die unter allem Handeln und Erkennen liegt.',
}

function groupBySpur(entries: LibraryEntry[]): { spur: Spur; items: LibraryEntry[] }[] {
  return SPUR_ORDER
    .map(spur => ({ spur, items: entries.filter(e => e.spur === spur) }))
    .filter(group => group.items.length > 0)
}

export default function ThemenPage() {
  const grouped = groupBySpur(library)
  // Tableaus ohne Spur (Fallback) hinten anhängen, damit nichts verschwindet
  const orphans = library.filter(e => !e.spur)
  const spurCount = grouped.length

  return (
    <div className="px-8 md:px-12 py-12 max-w-[1100px] mx-auto">

      <p className="font-ui text-[11px] tracking-[0.30em] uppercase text-[var(--accent)] mb-3">
        Deine Bibliothek
      </p>
      <h1 className="font-prose font-medium text-[32px] md:text-[40px] text-[var(--fg)] mb-4 leading-tight">
        Wähle ein Thema
      </h1>
      <p className="font-body italic text-[15px] text-[var(--fg-muted)] mb-14 max-w-[58ch]">
        Die Sammlung ordnet sich in {spurCount} Spuren, jede ein Feld von Fragen,
        das nach und nach wächst. Jedes Thema wird als Tableau ausgestellt —
        ein Sternbild von Stimmen.
      </p>

      <div className="flex flex-col gap-16">
        {grouped.map(({ spur, items }) => {
          // Header-Farbe aus dem ersten Tableau der Spur — innerhalb des Hue-Bands konsistent
          const spurColor = items[0].themeColor
          return (
            <section key={spur}>
              {/* ── Spur-Header ── */}
              <div className="flex items-baseline gap-4 mb-7">
                <h2
                  className="font-display text-[13px] tracking-[0.22em] uppercase shrink-0"
                  style={{ color: spurColor }}
                >
                  {SPUR_LABELS[spur]}
                </h2>
                <span
                  className="h-px flex-1"
                  style={{ background: spurColor, opacity: 0.28 }}
                  aria-hidden
                />
                <span className="font-ui text-[10px] tracking-[0.16em] uppercase text-[var(--fg-faint)] shrink-0">
                  {items.length} {items.length === 1 ? 'Tableau' : 'Tableaus'}
                </span>
              </div>
              <p className="font-body text-[13px] text-[var(--fg-dim)] mb-7 max-w-[60ch] leading-relaxed">
                {SPUR_BLURB[spur]}
              </p>

              {/* ── Cards der Spur ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map(topic => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            </section>
          )
        })}

        {orphans.length > 0 && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {orphans.map(topic => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function TopicCard({ topic }: { topic: LibraryEntry }) {
  const available = topic.status === 'available'
  const inner = (
    <div
      className="flex flex-col gap-3 p-6 border border-[var(--hairline)] bg-[var(--bg-raised)]
        transition-colors duration-300 h-full"
      style={{
        borderTop: `3px solid ${topic.themeColor}`,
        opacity: available ? 1 : 0.55,
      }}
    >
      {/* Eyebrow-Spur-Markierung entfällt — der Section-Header trägt die Spur jetzt */}
      <div className="flex items-baseline justify-between gap-3">
        <span
          className="font-display text-[18px] tracking-[0.10em] text-[var(--fg)]"
          style={{ color: available ? undefined : 'var(--fg-muted)' }}
        >
          {topic.title}
        </span>
        {!available && (
          <span className="font-ui text-[9px] tracking-[0.16em] uppercase text-[var(--fg-dim)] shrink-0">
            bald
          </span>
        )}
      </div>
      {topic.subtitle && (
        <p className="font-body italic text-[14px] text-[var(--fg-muted)] leading-snug">
          {topic.subtitle}
        </p>
      )}
      {topic.desc && (
        <p className="font-prose text-[13px] text-[var(--fg-muted)] leading-relaxed">
          {topic.desc}
        </p>
      )}
      {topic.era && (
        <p className="font-ui text-[10px] tracking-[0.14em] uppercase text-[var(--fg-dim)] mt-auto pt-2">
          {topic.era}
        </p>
      )}
    </div>
  )
  return available ? (
    <Link href={`/thema/${topic.id}`} className="no-underline">
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  )
}
