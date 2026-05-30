'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import type { Concept, Level, Thinker, Quadrants, ConceptType } from '@/lib/types'
import { CONCEPT_GLYPH, CONCEPT_LABEL } from '@/lib/conceptTypes'
import { MapHiddenCounter } from './map/MapHiddenCounter'
import { MapZoomControls } from './map/MapZoomControls'
import { usePanZoom } from '@/hooks/usePanZoom'
import { Annotated } from '@/lib/annotations'

interface ConceptWithDesc extends Concept {
  description: string
  isNew: boolean
}

interface Props {
  concepts: ConceptWithDesc[]
  totalConcepts: number
  thinkers?: Thinker[]
  levelId: number
  currentLevel: Level
  quadrants: Quadrants
  onThinkerClick?: (id: string) => void
}

/** Zweistufige Auflösung: primaryThinker-Override, dann Schule-Heuristik (genau 1 Denker). */
function resolveConceptThinker(concept: ConceptWithDesc, thinkers: Thinker[]): string | null {
  if (concept.primaryThinker) {
    return thinkers.find(t => t.id === concept.primaryThinker)?.name ?? null
  }
  if (!concept.schoolId) return null
  const schoolThinkers = thinkers.filter(t => t.schoolId === concept.schoolId)
  return schoolThinkers.length === 1 ? schoolThinkers[0].name : null
}

const W = 980, H = 760  // taller canvas — extra 60 px bottom room for hints
const PAD_X = 200  // wider horizontal margin to fit axis labels outside the frame
const PAD_Y = 80   // increased from 60 — gives space for pole-hint rows
const POLE_LABEL_WRAP = 19  // max chars before an X-pole label wraps to 2 lines
                            // (≈ the longest single-line label that fits in PAD_X)
const PIN_COLOR     = 'oklch(0.32 0.09 42)'  // dark sienna
const PIN_SELECTED  = 'oklch(0.26 0.10 42)'
const AXIS_COL      = 'oklch(0.35 0.022 65 / 0.55)'
const AXIS_LABEL    = 'oklch(0.28 0.022 65 / 0.85)'
const AXIS_HINT     = 'oklch(0.40 0.022 65 / 0.55)'

// Convert normalized 0-100 (math convention: y=0 bottom) into SVG coords (y=0 top).
function mapX(x: number) { return PAD_X + (x / 100) * (W - 2 * PAD_X) }
function mapY(y: number) { return H - PAD_Y - (y / 100) * (H - 2 * PAD_Y) }

/**
 * Splits a hint string into at most two lines, breaking at the word closest
 * to the midpoint. Returns a single-element array for short strings.
 */
function wrapHint(hint: string, maxLen = 32): [string] | [string, string] {
  if (hint.length <= maxLen) return [hint]
  const mid = Math.floor(hint.length / 2)
  const after  = hint.indexOf(' ', mid)
  const before = hint.lastIndexOf(' ', mid)
  const cut = after !== -1 && (after - mid) <= (mid - before) ? after : before
  if (cut <= 0) return [hint]
  return [hint.slice(0, cut), hint.slice(cut + 1)]
}

export default function QuadrantPlot({
  concepts, totalConcepts, thinkers = [], levelId, currentLevel, quadrants, onThinkerClick,
}: Props) {
  const [selected, setSelected] = useState<ConceptWithDesc | null>(null)
  const [hovered, setHovered]   = useState<string | null>(null)
  const [pulsing, setPulsing]   = useState<Set<string>>(new Set())
  const prevLevel = useRef(levelId)

  const { containerRef, wrapperRef, suppressClick, reset, zoomIn, zoomOut, handlers } =
    usePanZoom(W, H)

  useEffect(() => {
    if (levelId === prevLevel.current) return
    prevLevel.current = levelId
    const newIds = concepts.filter(c => c.isNew).map(c => c.id)
    if (!newIds.length) return
    setPulsing(new Set(newIds))
    const t = setTimeout(() => setPulsing(new Set()), 2400)
    return () => clearTimeout(t)
  }, [levelId, concepts])

  function toggle(c: ConceptWithDesc) {
    if (suppressClick.current) return
    setSelected(prev => prev?.id === c.id ? null : c)
  }
  function clearSelection() {
    if (suppressClick.current) return
    setSelected(null)
  }

  const hidden = totalConcepts - concepts.length

  // Find which thinkers (if any) authored the selected concept
  const authorsOf = useMemo(() => {
    if (!selected || !selected.schoolId) return []
    return thinkers.filter(t => t.schoolId === selected.schoolId)
  }, [thinkers, selected])

  return (
    <div className="tab-content flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <span className="font-display text-2xl tracking-[0.10em] text-[--fg]">Konzepte</span>
        <span className="font-body italic text-[14px] text-[--fg-faint] flex items-center gap-3 whitespace-nowrap">
          Komplexität: {currentLevel.label}
          {selected && (
            <button
              onClick={() => setSelected(null)}
              className="font-ui text-[11px] tracking-[0.14em] uppercase text-[--gold]
                hover:text-[--fg-muted] transition-colors"
            >
              ✕ Alle
            </button>
          )}
        </span>
      </div>

      {/* Plot stage + side panel */}
      <div className="flex items-stretch">

      {/* Plot stage */}
      <div
        ref={containerRef}
        className="relative overflow-hidden border border-[--hairline] bg-[--bg-sunk] flex-1 min-w-0"
        style={{
          aspectRatio: `${W}/${H}`,
          maxHeight:   `${H}px`,
          cursor:      'grab',
          touchAction: 'none',
          userSelect:  'none',
        }}
        {...handlers}
      >
        <div
          ref={wrapperRef}
          style={{
            position:        'absolute',
            top: 0, left: 0,
            width:           W,
            height:          H,
            transformOrigin: '0 0',
            willChange:      'transform',
          }}
        >
          <svg
            width={W} height={H}
            viewBox={`0 0 ${W} ${H}`}
            style={{ display: 'block' }}
            onClick={clearSelection}
          >
            {/* ── Background grid lines ── */}
            {[0.25, 0.75].map(t => {
              const x = PAD_X + t * (W - 2 * PAD_X)
              const y = PAD_Y + t * (H - 2 * PAD_Y)
              return (
                <g key={t} pointerEvents="none">
                  <line x1={x} y1={PAD_Y} x2={x} y2={H - PAD_Y}
                    stroke={AXIS_COL} strokeOpacity={0.18} strokeDasharray="2 4" />
                  <line x1={PAD_X} y1={y} x2={W - PAD_X} y2={y}
                    stroke={AXIS_COL} strokeOpacity={0.18} strokeDasharray="2 4" />
                </g>
              )
            })}

            {/* ── Plot border frame ── */}
            <rect x={PAD_X} y={PAD_Y} width={W - 2 * PAD_X} height={H - 2 * PAD_Y}
              fill="none" stroke={AXIS_COL} strokeOpacity={0.35} strokeWidth={0.75}
              pointerEvents="none" />

            {/* ── Axis cross (heavier strokes through middle) ── */}
            <line x1={W / 2} y1={PAD_Y} x2={W / 2} y2={H - PAD_Y}
              stroke={AXIS_COL} strokeOpacity={0.55} strokeWidth={1} pointerEvents="none" />
            <line x1={PAD_X} y1={H / 2} x2={W - PAD_X} y2={H / 2}
              stroke={AXIS_COL} strokeOpacity={0.55} strokeWidth={1} pointerEvents="none" />

            {/* ══ Axis labels & hints ══════════════════════════════════════
                Layout (PAD_Y=80, H=760):
                  Top area    (y=0…80):  topHint @ 36, topLabel @ 52, frame @ 80
                  Bottom area (y=680…760): frame @ 680, bottomLabel @ 698, bottomHint @ 712, xLabel @ 736
                  Left/right  (x=margins, y=H/2=380): poleLabel, hint 16 px below
                  Y-axis label: rotated at far left (x=18, y=H/2)
            ════════════════════════════════════════════════════════════════ */}

            {/* ── Y-axis label (rotated, far left) ── */}
            <text
              x={18} y={H / 2}
              textAnchor="middle" dominantBaseline="middle"
              transform={`rotate(-90, 18, ${H / 2})`}
              fontFamily="'Inter', system-ui, sans-serif"
              fontStyle="italic" fontSize={9} letterSpacing="0.08em"
              fill={AXIS_HINT}
              pointerEvents="none"
            >
              ↑ {quadrants.axisY.label} ↓
            </text>

            {/* ── X-axis: left pole (wraps to 2 lines when too long for the margin) ── */}
            {(() => {
              const labelLines = wrapHint(quadrants.axisX.left.toUpperCase(), POLE_LABEL_WRAP)
              const multi = labelLines.length > 1
              const hintLines = quadrants.axisX.leftHint ? wrapHint(quadrants.axisX.leftHint) : null
              return (
                <>
                  <text x={PAD_X - 12} y={H / 2 - (multi ? 6 : 0)}
                    textAnchor="end" dominantBaseline="middle"
                    fontFamily="'Marcellus SC', serif"
                    fontWeight="bold" fontSize={11} letterSpacing="0.18em"
                    fill={AXIS_LABEL} pointerEvents="none"
                  >
                    {labelLines.map((line, i) => (
                      <tspan key={i} x={PAD_X - 12} dy={i === 0 ? 0 : 12}>{line}</tspan>
                    ))}
                  </text>
                  {hintLines && (
                    <text x={PAD_X - 12} y={H / 2 + (multi ? 22 : 16)}
                      textAnchor="end"
                      fontFamily="'Inter', system-ui, sans-serif"
                      fontStyle="italic" fontSize={8} letterSpacing="0.04em"
                      fill={AXIS_HINT} pointerEvents="none"
                    >
                      {hintLines.map((line, i) => (
                        <tspan key={i} x={PAD_X - 12} dy={i === 0 ? 0 : 11}>{line}</tspan>
                      ))}
                    </text>
                  )}
                </>
              )
            })()}

            {/* ── X-axis: right pole (wraps to 2 lines when too long for the margin) ── */}
            {(() => {
              const labelLines = wrapHint(quadrants.axisX.right.toUpperCase(), POLE_LABEL_WRAP)
              const multi = labelLines.length > 1
              const hintLines = quadrants.axisX.rightHint ? wrapHint(quadrants.axisX.rightHint) : null
              return (
                <>
                  <text x={W - PAD_X + 12} y={H / 2 - (multi ? 6 : 0)}
                    textAnchor="start" dominantBaseline="middle"
                    fontFamily="'Marcellus SC', serif"
                    fontWeight="bold" fontSize={11} letterSpacing="0.18em"
                    fill={AXIS_LABEL} pointerEvents="none"
                  >
                    {labelLines.map((line, i) => (
                      <tspan key={i} x={W - PAD_X + 12} dy={i === 0 ? 0 : 12}>{line}</tspan>
                    ))}
                  </text>
                  {hintLines && (
                    <text x={W - PAD_X + 12} y={H / 2 + (multi ? 22 : 16)}
                      textAnchor="start"
                      fontFamily="'Inter', system-ui, sans-serif"
                      fontStyle="italic" fontSize={8} letterSpacing="0.04em"
                      fill={AXIS_HINT} pointerEvents="none"
                    >
                      {hintLines.map((line, i) => (
                        <tspan key={i} x={W - PAD_X + 12} dy={i === 0 ? 0 : 11}>{line}</tspan>
                      ))}
                    </text>
                  )}
                </>
              )
            })()}

            {/* ── X-axis label (centered below plot) ── */}
            <text x={W / 2} y={H - PAD_Y + 56}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="'Inter', system-ui, sans-serif"
              fontStyle="italic" fontSize={10} letterSpacing="0.08em"
              fill={AXIS_HINT} pointerEvents="none"
            >
              ← {quadrants.axisX.label} →
            </text>

            {/* ── Y-axis: top pole ── */}
            {quadrants.axisY.topHint && (
              <text x={W / 2} y={PAD_Y - 44}
                textAnchor="middle" dominantBaseline="middle"
                fontFamily="'Inter', system-ui, sans-serif"
                fontStyle="italic" fontSize={8} letterSpacing="0.04em"
                fill={AXIS_HINT} pointerEvents="none"
              >
                {quadrants.axisY.topHint}
              </text>
            )}
            <text x={W / 2} y={PAD_Y - 28}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="'Marcellus SC', serif"
              fontWeight="bold" fontSize={11} letterSpacing="0.18em"
              fill={AXIS_LABEL} pointerEvents="none"
            >
              {quadrants.axisY.top.toUpperCase()}
            </text>

            {/* ── Y-axis: bottom pole ── */}
            <text x={W / 2} y={H - PAD_Y + 18}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="'Marcellus SC', serif"
              fontWeight="bold" fontSize={11} letterSpacing="0.18em"
              fill={AXIS_LABEL} pointerEvents="none"
            >
              {quadrants.axisY.bottom.toUpperCase()}
            </text>
            {quadrants.axisY.bottomHint && (
              <text x={W / 2} y={H - PAD_Y + 34}
                textAnchor="middle" dominantBaseline="middle"
                fontFamily="'Inter', system-ui, sans-serif"
                fontStyle="italic" fontSize={8} letterSpacing="0.04em"
                fill={AXIS_HINT} pointerEvents="none"
              >
                {quadrants.axisY.bottomHint}
              </text>
            )}
            {/* ── Concept markers ── */}
            {concepts.map(concept => {
              const isSelected  = selected?.id === concept.id
              const isHovered   = hovered === concept.id
              const isPulsing   = pulsing.has(concept.id)
              const active      = isSelected || isHovered
              const lo          = concept.labelOffset ?? { dx: 12, dy: 0, anchor: 'start' as const }
              const cx          = mapX(concept.x)
              const cy          = mapY(concept.y)
              const glyph       = CONCEPT_GLYPH[concept.type] ?? '◆'
              const thinkerName = resolveConceptThinker(concept, thinkers)

              return (
                <g key={concept.id}
                  style={{ cursor: 'pointer' }}
                  onClick={e => { e.stopPropagation(); toggle(concept) }}
                  onMouseEnter={() => setHovered(concept.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {isPulsing && (
                    <circle cx={cx} cy={cy} r={10}
                      fill="none" stroke={PIN_COLOR} strokeWidth="1.2"
                      className="wm-pulse-ring"
                      style={{ filter: 'drop-shadow(0 0 4px oklch(0.42 0.13 42 / 0.70))' }}
                    />
                  )}
                  {active && (
                    <circle cx={cx} cy={cy} r={14}
                      fill={PIN_COLOR} opacity="0.18" pointerEvents="none" />
                  )}
                  {/* Touch target */}
                  <circle cx={cx} cy={cy} r={18} fill="transparent" />

                  <text x={cx} y={cy}
                    textAnchor="middle" dominantBaseline="central"
                    fontSize={active ? 14 : 11}
                    fill={isSelected ? PIN_SELECTED : PIN_COLOR}
                    fillOpacity={active ? 1 : concept.isNew ? 0.92 : 0.78}
                    style={{ transition: 'font-size 150ms, fill-opacity 150ms', userSelect: 'none' }}
                    pointerEvents="none"
                  >
                    {glyph}
                  </text>

                  {concept.isNew && !isSelected && (
                    <circle cx={cx + 7} cy={cy - 7} r={2}
                      fill={PIN_COLOR} opacity="0.9" pointerEvents="none" />
                  )}

                  <text
                    x={cx + lo.dx} y={cy + lo.dy}
                    textAnchor={lo.anchor}
                    dominantBaseline="central"
                    fontFamily="'Marcellus SC', Georgia, serif"
                    fontWeight="bold"
                    fontSize={active ? 11 : 10}
                    letterSpacing="0.08em"
                    fill="#1c1917"
                    fillOpacity={active ? 1 : 0.92}
                    pointerEvents="none"
                    style={{
                      transition: 'fill-opacity 150ms, font-size 150ms',
                      userSelect: 'none',
                      textShadow: '1px 1px 0 #f5efdf, -1px -1px 0 #f5efdf, 1px -1px 0 #f5efdf, -1px 1px 0 #f5efdf, 0 0 5px rgba(245,239,223,0.8)',
                    } as React.CSSProperties}
                  >
                    {concept.name.toUpperCase()}
                  </text>

                  {thinkerName && active && (
                    <text
                      x={cx + lo.dx} y={cy + lo.dy + (active ? 14 : 13)}
                      textAnchor={lo.anchor}
                      dominantBaseline="central"
                      fontFamily="'Inter', system-ui, sans-serif"
                      fontStyle="italic"
                      fontSize={active ? 8.5 : 7.5}
                      letterSpacing="0.02em"
                      fill={AXIS_HINT}
                      fillOpacity={active ? 0.9 : 0.72}
                      pointerEvents="none"
                      style={{
                        transition: 'fill-opacity 150ms, font-size 150ms',
                        userSelect: 'none',
                        textShadow: '1px 1px 0 #f5efdf, -1px -1px 0 #f5efdf, 1px -1px 0 #f5efdf, -1px 1px 0 #f5efdf, 0 0 4px rgba(245,239,223,0.7)',
                      } as React.CSSProperties}
                    >
                      {thinkerName}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        <MapZoomControls onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={reset} />
      </div>

      {/* Side panel (desktop) */}
      {selected && (
        <aside
          className="hidden sm:flex w-[300px] shrink-0 flex-col border border-[--hairline] border-l-0 bg-[--bg-raised] overflow-y-auto"
          style={{ maxHeight: `${H}px` }}
        >
          {/* Panel header */}
          <div className="flex items-start justify-between gap-3 p-4 border-b border-[--hairline] shrink-0">
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-[--fg-faint]">
                <span className="mr-1.5 opacity-70">{CONCEPT_GLYPH[selected.type]}</span>
                {CONCEPT_LABEL[selected.type] ?? 'Konzept'}
              </p>
              <p className="font-display text-[16px] tracking-[0.08em] text-[--fg] leading-tight">
                {selected.name}
              </p>
            </div>
            <button
              onClick={() => setSelected(null)}
              aria-label="Schliessen"
              className="mt-0.5 shrink-0 text-[--fg-faint] hover:text-[--fg] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <div className="p-4 border-b border-[--hairline]">
            <p className="font-prose text-[14px] leading-relaxed text-[--fg-muted]">
              <Annotated text={selected.description} level={levelId} />
            </p>
          </div>

          {/* Thinkers from same school */}
          {authorsOf.length > 0 && (
            <div className="p-4">
              <p className="section-label mb-2.5">Aus dieser Schule</p>
              <div className="flex flex-col gap-1">
                {authorsOf.map(t => (
                  onThinkerClick ? (
                    <button
                      key={t.id}
                      onClick={() => onThinkerClick(t.id)}
                      className="font-ui text-[12px] text-left text-[--fg-muted] hover:text-[--gold] transition-colors"
                    >
                      {t.name}
                    </button>
                  ) : (
                    <span key={t.id} className="font-ui text-[12px] text-[--fg-muted]">{t.name}</span>
                  )
                ))}
              </div>
            </div>
          )}
        </aside>
      )}
      </div>{/* end flex row: canvas + panel */}

      {/* Mobile detail card */}
      <div className="sm:hidden border border-[--hairline] p-4 bg-[--bg-raised]">
        {selected ? (
          <>
            <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-[--fg-faint] mb-1.5">
              <span className="mr-1.5 opacity-70">{CONCEPT_GLYPH[selected.type]}</span>
              {CONCEPT_LABEL[selected.type] ?? 'Konzept'}
            </p>
            <p className="font-display text-[16px] tracking-[0.08em] text-[--fg] mb-2.5">{selected.name}</p>
            <p className="font-prose text-[14px] leading-relaxed text-[--fg-muted]">
              <Annotated text={selected.description} level={levelId} />
            </p>
          </>
        ) : (
          <p className="font-body italic text-[13px] text-[--fg-dim]">
            Konzept antippen für Details.
          </p>
        )}
      </div>

      {/* Legend */}
      <div className="border border-[--hairline] p-4 bg-[--bg-raised]">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {(Object.entries(CONCEPT_LABEL) as [ConceptType, string][]).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2 font-ui text-[11px] text-[--fg-faint]">
              <span className="text-[--gold] opacity-75 text-xs">{CONCEPT_GLYPH[type]}</span>
              <span>{label}</span>
            </div>
          ))}
          <MapHiddenCounter
            hidden={hidden}
            noun={{ singular: 'Konzept', plural: 'Konzepte' }}
            className="font-body italic text-xs text-[--fg-dim]"
          />
        </div>
      </div>

    </div>
  )
}
