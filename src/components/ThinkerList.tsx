'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { Thinker, School, Level } from '@/lib/types'
import { Annotated } from '@/lib/annotations'

/** Fades in whenever `text` changes — covers both new thinkers and level-up text updates */
function FadingParagraph({ text, level, className, style }: {
  text: string; level: number; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const prevText = useRef(text)

  useEffect(() => {
    if (prevText.current !== text && ref.current) {
      prevText.current = text
      ref.current.classList.remove('thinker-text-fade')
      void ref.current.offsetWidth // force reflow to restart animation
      ref.current.classList.add('thinker-text-fade')
    }
  }, [text])

  return (
    <p ref={ref} className={`thinker-text-fade${className ? ` ${className}` : ''}`} style={style}>
      <Annotated text={text} level={level} />
    </p>
  )
}

interface ThinkerWithDesc extends Thinker {
  description: string
  isNew: boolean
  isDeepened: boolean
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
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    () => new Set(['neu', 'vertieft'])
  )
  const prevLevel = useRef(currentLevel.id)
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())

  // On level change: reset to NEU + VERTIEFT
  useEffect(() => {
    if (prevLevel.current !== currentLevel.id) {
      prevLevel.current = currentLevel.id
      setActiveFilters(new Set(['neu', 'vertieft']))
    }
  }, [currentLevel.id])

  useEffect(() => {
    if (!highlightId) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveFilters(new Set()) // Clear filters so the highlighted card is visible
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

  const newCount      = thinkers.filter(t => t.isNew).length
  const deepenedCount = thinkers.filter(t => t.isDeepened).length

  const toggleFilter = (key: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev)
      if (next.has(key)) { next.delete(key) } else { next.add(key) }
      return next
    })
  }

  const filtered = activeFilters.size === 0
    ? thinkers
    : thinkers.filter(t =>
        (activeFilters.has('neu') && t.isNew) ||
        (activeFilters.has('vertieft') && t.isDeepened) ||
        (t.schoolId && activeFilters.has(t.schoolId))
      )

  const schoolOrder = schools.map(s => s.id)
  const sorted = [...filtered].sort(
    (a, b) => schoolOrder.indexOf(a.schoolId) - schoolOrder.indexOf(b.schoolId)
  )

  return (
    <div className="tab-content">

      {/* View header */}
      <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
        <span className="font-display text-2xl tracking-[0.10em] text-[var(--fg)]">Denker</span>
        <span className="font-body italic text-[14px] text-[var(--fg-faint)] whitespace-nowrap">
          Komplexität: {currentLevel.label}
        </span>
      </div>

      {/* Context strip */}
      {context && (
        <div className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-5 px-4 sm:px-5 py-4 border border-[var(--hairline)] bg-[var(--bg-raised)] mb-6 items-start">
          <span className="font-ui text-[10px] font-medium tracking-[0.22em] uppercase text-[var(--gold)] pt-0.5">
            Lage
          </span>
          <p className="font-body italic text-[15px] text-[var(--fg-muted)] leading-relaxed">
            {context}
          </p>
        </div>
      )}

      {/* Filter row */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <span className="font-ui text-[10px] tracking-[0.22em] uppercase text-[var(--fg-faint)] mr-1">
          Filter
        </span>
        <button
          onClick={() => setActiveFilters(new Set())}
          className={`font-ui text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-[3px] border transition-colors
            ${activeFilters.size === 0
              ? 'border-[var(--gold-soft)] text-[var(--gold)] bg-[var(--accent-soft)]'
              : 'border-[var(--hairline)] text-[var(--fg-faint)] hover:text-[var(--fg-muted)] hover:border-[var(--hairline-strong)]'
            }`}
        >
          Alle
          <span className="ml-1.5 opacity-60">{thinkers.length}</span>
        </button>
        {newCount > 0 && (
          <button
            onClick={() => toggleFilter('neu')}
            className={`font-ui text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-[3px] border transition-colors flex items-center gap-2
              ${activeFilters.has('neu')
                ? 'border-[var(--gold-soft)] text-[var(--gold)] bg-[var(--accent-soft)]'
                : 'border-[var(--hairline)] text-[var(--fg-faint)] hover:text-[var(--fg-muted)] hover:border-[var(--hairline-strong)]'
              }`}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--gold)] opacity-80" />
            Neu
            <span className="opacity-60">{newCount}</span>
          </button>
        )}
        {deepenedCount > 0 && (
          <button
            onClick={() => toggleFilter('vertieft')}
            className={`font-ui text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-[3px] border transition-colors flex items-center gap-2
              ${activeFilters.has('vertieft')
                ? 'border-[var(--gold-soft)] text-[var(--gold)] bg-[var(--accent-soft)]'
                : 'border-[var(--hairline)] text-[var(--fg-faint)] hover:text-[var(--fg-muted)] hover:border-[var(--hairline-strong)]'
              }`}
          >
            <span className="font-ui text-[10px]">↑</span>
            Vertieft
            <span className="opacity-60">{deepenedCount}</span>
          </button>
        )}
        {visibleSchools.map(s => {
          const count = thinkers.filter(t => t.schoolId === s.id).length
          const isActive = activeFilters.has(s.id)
          return (
            <button
              key={s.id}
              onClick={() => toggleFilter(s.id)}
              className="font-ui text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-[3px] border transition-colors flex items-center gap-2"
              style={{
                borderColor: isActive ? s.color : 'var(--hairline)',
                color: isActive ? s.color : 'var(--fg-faint)',
                background: isActive ? `color-mix(in oklch, ${s.color} 8%, transparent)` : 'transparent',
              }}
            >
              <span className="w-[6px] h-[6px] rounded-full" style={{ background: s.color }} />
              {s.label}
              <span className="opacity-60">{count}</span>
            </button>
          )
        })}
      </div>

      {sorted.length === 0 ? (
        <p className="py-14 text-center font-body italic text-[var(--fg-dim)] text-sm">
          Auf diesem Komplexitäts-Level sind noch keine Denker freigeschaltet.
        </p>
      ) : listStyle === 'grouped' ? (
        <GroupedList thinkers={filtered} schools={visibleSchools} cardRefs={cardRefs} level={currentLevel.id} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map(t => {
            const school = schools.find(s => s.id === t.schoolId)
            const color = school?.color ?? 'var(--gold)'
            return (
              <div
                key={t.id}
                ref={el => { if (el) cardRefs.current.set(t.id, el) }}
                className="character-card is-alive flex flex-col gap-2 p-4 border border-[var(--hairline)] bg-[var(--bg-raised)]
                  transition-colors duration-300 cursor-default carta-card-highlight"
              >
                <div className="flex items-baseline justify-between gap-3 min-w-0">
                  <span className="font-prose font-medium text-[16px] text-[var(--fg)] leading-tight inline-flex items-center gap-2">
                    <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                    {t.name}
                  </span>
                  <div className="flex items-baseline gap-2 shrink-0">
                    {t.isNew && (
                      <span className="font-ui text-[9px] tracking-[0.16em] uppercase text-[var(--gold)]">Neu</span>
                    )}
                    {t.isDeepened && (
                      <span className="font-ui text-[9px] tracking-[0.16em] uppercase text-[var(--fg-dim)]">↑ Vertieft</span>
                    )}
                    {school && (
                      <span className="font-ui text-[9px] tracking-[0.16em] uppercase" style={{ color }}>
                        {school.label}
                      </span>
                    )}
                  </div>
                </div>
                {t.lifespan && (
                  <span className="font-ui text-[10px] tracking-[0.12em] uppercase text-[var(--fg-dim)]">
                    {t.lifespan}
                  </span>
                )}
                <FadingParagraph
                  text={t.description}
                  level={currentLevel.id}
                  className="font-prose text-[14px] leading-relaxed text-[var(--fg-muted)]"
                  style={{ textWrap: 'pretty' } as React.CSSProperties}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function GroupedList({
  thinkers, schools, cardRefs, level,
}: {
  thinkers: ThinkerWithDesc[]
  schools: School[]
  cardRefs: React.MutableRefObject<Map<string, HTMLElement>>
  level: number
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
                {s.label}
              </span>
              <span className="font-ui text-[11px] tracking-[0.08em] ml-auto" style={{ color: s.color, opacity: 0.5 }}>
                {group.length}
              </span>
            </div>
            {s.motto && (
              <p className="font-ui text-[11px] text-[var(--fg-dim)] italic mb-4 leading-snug">
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
                    <span className="font-ui font-medium text-[15px] text-[var(--fg)] leading-tight">
                      {t.name}
                    </span>
                    {t.lifespan && (
                      <span className="font-ui text-[10px] tracking-[0.10em] uppercase text-[var(--fg-dim)]">
                        {t.lifespan}
                      </span>
                    )}
                    {t.isNew && (
                      <span className="font-ui text-[9px] tracking-[0.16em] uppercase text-[var(--gold)]">Neu</span>
                    )}
                    {t.isDeepened && (
                      <span className="font-ui text-[9px] tracking-[0.16em] uppercase text-[var(--fg-dim)]">↑ Vertieft</span>
                    )}
                  </div>
                  <FadingParagraph
                    text={t.description}
                    level={level}
                    className="font-ui text-[13px] leading-relaxed text-[var(--fg-muted)]"
                    style={{ textWrap: 'pretty' } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
