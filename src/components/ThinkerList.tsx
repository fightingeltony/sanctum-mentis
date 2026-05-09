'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { Thinker, School, Level } from '@/lib/types'

interface ThinkerWithDesc extends Thinker {
  description: string
  isNew: boolean
}

interface Props {
  thinkers: ThinkerWithDesc[]
  schools: School[]
  context: string | null
  currentLevel: Level
  listStyle?: 'cards' | 'grouped'
  highlightId?: string | null
  onHighlightDone?: () => void
}

export default function ThinkerList({
  thinkers, schools, context, currentLevel,
  listStyle = 'grouped', highlightId, onHighlightDone,
}: Props) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    if (!highlightId) return
    setActiveFilter(null)
    const raf = requestAnimationFrame(() => {
      const el = cardRefs.current.get(highlightId)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.dataset.highlight = 'true'
      const t = setTimeout(() => {
        delete el.dataset.highlight
        onHighlightDone?.()
      }, 1800)
      return () => clearTimeout(t)
    })
    return () => cancelAnimationFrame(raf)
  }, [highlightId, onHighlightDone])

  const visibleSchools = schools.filter(s =>
    thinkers.some(t => t.schoolId === s.id)
  )

  const newCount = thinkers.filter(t => t.isNew).length

  const filtered = activeFilter === 'neu'
    ? thinkers.filter(t => t.isNew)
    : activeFilter
      ? thinkers.filter(t => t.schoolId === activeFilter)
      : thinkers

  const schoolOrder = schools.map(s => s.id)
  const sorted = [...filtered].sort(
    (a, b) => schoolOrder.indexOf(a.schoolId) - schoolOrder.indexOf(b.schoolId)
  )

  return (
    <div className="tab-content">

      {/* View header */}
      <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
        <span className="font-display text-2xl tracking-[0.10em] text-[--fg]">Denker</span>
        <span className="font-body italic text-[14px] text-[--fg-faint] whitespace-nowrap">
          Komplexität: {currentLevel.label}
        </span>
      </div>

      {/* Context strip */}
      {context && (
        <div className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-5 px-4 sm:px-5 py-4 border border-[--hairline] bg-[--bg-raised] mb-6 items-start">
          <span className="font-ui text-[10px] font-medium tracking-[0.22em] uppercase text-[--gold] pt-0.5">
            Lage
          </span>
          <p className="font-body italic text-[15px] text-[--fg-muted] leading-relaxed">
            {context}
          </p>
        </div>
      )}

      {/* Filter row */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <span className="font-ui text-[10px] tracking-[0.22em] uppercase text-[--fg-faint] mr-1">
          Filter
        </span>
        <button
          onClick={() => setActiveFilter(null)}
          className={`font-ui text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-[3px] border transition-colors
            ${activeFilter === null
              ? 'border-[--gold-soft] text-[--gold] bg-[var(--accent-soft)]'
              : 'border-[--hairline] text-[--fg-faint] hover:text-[--fg-muted] hover:border-[--hairline-strong]'
            }`}
        >
          Alle
          <span className="ml-1.5 opacity-60">{thinkers.length}</span>
        </button>
        {newCount > 0 && (
          <button
            onClick={() => setActiveFilter(activeFilter === 'neu' ? null : 'neu')}
            className={`font-ui text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-[3px] border transition-colors flex items-center gap-2
              ${activeFilter === 'neu'
                ? 'border-[--gold-soft] text-[--gold] bg-[var(--accent-soft)]'
                : 'border-[--hairline] text-[--fg-faint] hover:text-[--fg-muted] hover:border-[--hairline-strong]'
              }`}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[--gold] opacity-80" />
            Neu
            <span className="opacity-60">{newCount}</span>
          </button>
        )}
        {visibleSchools.map(s => {
          const count = thinkers.filter(t => t.schoolId === s.id).length
          const isActive = activeFilter === s.id
          return (
            <button
              key={s.id}
              onClick={() => setActiveFilter(isActive ? null : s.id)}
              className="font-ui text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-[3px] border transition-colors flex items-center gap-2"
              style={{
                borderColor: isActive ? s.color : 'var(--hairline)',
                color: isActive ? s.color : 'var(--fg-faint)',
                background: isActive ? `color-mix(in oklch, ${s.color} 8%, transparent)` : 'transparent',
              }}
            >
              <span className="w-[6px] h-[6px] rounded-full" style={{ background: s.color }} />
              {s.name}
              <span className="opacity-60">{count}</span>
            </button>
          )
        })}
      </div>

      {sorted.length === 0 ? (
        <p className="py-14 text-center font-body italic text-[--fg-dim] text-sm">
          Auf diesem Komplexitäts-Level sind noch keine Denker freigeschaltet.
        </p>
      ) : listStyle === 'grouped' ? (
        <GroupedList thinkers={filtered} schools={visibleSchools} cardRefs={cardRefs} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map(t => {
            const school = schools.find(s => s.id === t.schoolId)
            const color = school?.color ?? 'var(--gold)'
            return (
              <div
                key={t.id}
                ref={el => { if (el) cardRefs.current.set(t.id, el) }}
                className="character-card is-alive flex flex-col gap-2 p-4 border border-[--hairline] bg-[--bg-raised]
                  transition-colors duration-300 cursor-default carta-card-highlight"
              >
                <div className="flex items-baseline justify-between gap-3 min-w-0">
                  <span className="font-prose font-medium text-[16px] text-[--fg] leading-tight inline-flex items-center gap-2">
                    <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                    {t.name}
                  </span>
                  <div className="flex items-baseline gap-2 shrink-0">
                    {t.isNew && (
                      <span className="font-ui text-[9px] tracking-[0.16em] uppercase text-[--gold]">Neu</span>
                    )}
                    {school && (
                      <span className="font-ui text-[9px] tracking-[0.16em] uppercase" style={{ color }}>
                        {school.name}
                      </span>
                    )}
                  </div>
                </div>
                {t.lifespan && (
                  <span className="font-ui text-[10px] tracking-[0.12em] uppercase text-[--fg-dim]">
                    {t.lifespan}
                  </span>
                )}
                <p className="font-prose text-[14px] leading-relaxed text-[--fg-muted]" style={{ textWrap: 'pretty' } as React.CSSProperties}>
                  {t.description}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function GroupedList({
  thinkers, schools, cardRefs,
}: {
  thinkers: ThinkerWithDesc[]
  schools: School[]
  cardRefs: React.MutableRefObject<Map<string, HTMLElement>>
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 items-start">
      {schools.map(s => {
        const group = thinkers.filter(t => t.schoolId === s.id)
        if (group.length === 0) return null
        return (
          <div key={s.id} className="flex flex-col">
            <div
              className="flex items-center gap-2 pb-2 mb-3"
              style={{ borderBottom: `1px solid color-mix(in oklch, ${s.color} 30%, transparent)` }}
            >
              <span className="text-[13px] leading-none" style={{ color: s.color, opacity: 0.75 }}>
                {s.glyph}
              </span>
              <span
                className="font-ui text-[11px] font-medium tracking-[0.20em] uppercase"
                style={{ color: s.color }}
              >
                {s.name}
              </span>
              <span className="font-ui text-[11px] tracking-[0.08em] ml-auto" style={{ color: s.color, opacity: 0.5 }}>
                {group.length}
              </span>
            </div>
            {s.motto && (
              <p className="font-ui text-[11px] text-[--fg-dim] italic mb-4 leading-snug">
                «{s.motto}»
              </p>
            )}
            <div className="flex flex-col gap-4">
              {group.map(t => (
                <div
                  key={t.id}
                  ref={el => { if (el) cardRefs.current.set(t.id, el) }}
                  className="flex flex-col gap-1 transition-all duration-300 carta-card-highlight"
                >
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-ui font-medium text-[15px] text-[--fg] leading-tight">
                      {t.name}
                    </span>
                    {t.lifespan && (
                      <span className="font-ui text-[10px] tracking-[0.10em] uppercase text-[--fg-dim]">
                        {t.lifespan}
                      </span>
                    )}
                    {t.isNew && (
                      <span className="font-ui text-[9px] tracking-[0.16em] uppercase text-[--gold]">Neu</span>
                    )}
                  </div>
                  <p
                    className="font-ui text-[13px] leading-relaxed text-[--fg-muted]"
                    style={{ textWrap: 'pretty' } as React.CSSProperties}
                  >
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
