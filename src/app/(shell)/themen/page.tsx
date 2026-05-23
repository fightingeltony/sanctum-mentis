import Link from 'next/link'
import { library } from '@/lib/data'
import { SPUR_LABELS } from '@/lib/spuren'

export default function ThemenPage() {
  return (
    <div className="px-8 md:px-12 py-12 max-w-[1100px] mx-auto">

      <p className="font-ui text-[11px] tracking-[0.30em] uppercase text-[--accent] mb-3">
        Deine Bibliothek
      </p>
      <h1 className="font-prose font-medium text-[32px] md:text-[40px] text-[--fg] mb-12 leading-tight">
        Wähle ein Thema
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {library.map(topic => {
          const available = topic.status === 'available'
          const inner = (
            <div
              className="flex flex-col gap-3 p-6 border border-[--hairline] bg-[--bg-raised]
                transition-colors duration-300 h-full"
              style={{
                borderTop: `3px solid ${topic.themeColor}`,
                opacity: available ? 1 : 0.55,
              }}
            >
              {topic.spur && (
                <p
                  className="font-ui text-[11px] tracking-[0.08em] uppercase"
                  style={{ color: topic.themeColor }}
                >
                  {SPUR_LABELS[topic.spur]}
                </p>
              )}
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className="font-display text-[18px] tracking-[0.10em] text-[--fg]"
                  style={{ color: available ? undefined : 'var(--fg-muted)' }}
                >
                  {topic.title}
                </span>
                {!available && (
                  <span className="font-ui text-[9px] tracking-[0.16em] uppercase text-[--fg-dim] shrink-0">
                    bald
                  </span>
                )}
              </div>
              {topic.subtitle && (
                <p className="font-body italic text-[14px] text-[--fg-muted] leading-snug">
                  {topic.subtitle}
                </p>
              )}
              {topic.desc && (
                <p className="font-prose text-[13px] text-[--fg-muted] leading-relaxed">
                  {topic.desc}
                </p>
              )}
              {topic.era && (
                <p className="font-ui text-[10px] tracking-[0.14em] uppercase text-[--fg-dim] mt-auto pt-2">
                  {topic.era}
                </p>
              )}
            </div>
          )
          return available ? (
            <Link key={topic.id} href={`/thema/${topic.id}`} className="no-underline">
              {inner}
            </Link>
          ) : (
            <div key={topic.id}>{inner}</div>
          )
        })}
      </div>
    </div>
  )
}
