'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import type { Concept, Level, Thinker, Quadrants, ConceptType } from '@/lib/types'
import { CONCEPT_GLYPH, CONCEPT_LABEL } from '@/lib/conceptTypes'
import { MapHiddenCounter } from './map/MapHiddenCounter'
import { MapZoomControls } from './map/MapZoomControls'
import { usePanZoom } from '@/hooks/usePanZoom'

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
}

const W = 980, H = 700
const PAD_X = 200  // wider horizontal margin to fit axis labels outside the frame
const PAD_Y = 60
const PIN_COLOR     = 'oklch(0.32 0.09 42)'  // dark sienna
const PIN_SELECTED  = 'oklch(0.26 0.10 42)'
const AXIS_COL      = 'oklch(0.35 0.022 65 / 0.55)'
const AXIS_LABEL    = 'oklch(0.28 0.022 65 / 0.85)'
const AXIS_HINT     = 'oklch(0.40 0.022 65 / 0.55)'

// Convert normalized 0-100 (math convention: y=0 bottom) into SVG coords (y=0 top).
function mapX(x: number) { return PAD_X + (x / 100) * (W - 2 * PAD_X) }
function mapY(y: number) { return H - PAD_Y - (y / 100) * (H - 2 * PAD_Y) }

export default function QuadrantPlot({
  concepts, totalConcepts, thinkers = [], levelId, currentLevel, quadrants,
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

      {/* Plot stage */}
      <div
        ref={containerRef}
        className="relative overflow-hidden border border-[--hairline] bg-[--bg-sunk]"
        style={{
          aspectRatio: `${W}/${H}`,
          maxHeight:   `${H}px`,
          maxWidth:    '100%',
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

            {/* ── Axis labels (X axis) — outside the frame ── */}
            <text x={PAD_X - 12} y={H / 2}
              textAnchor="end" dominantBaseline="middle"
              fontFamily="'Marcellus SC', serif"
              fontWeight="bold" fontSize={11} letterSpacing="0.18em"
              fill={AXIS_LABEL}
              pointerEvents="none"
            >
              {quadrants.axisX.left.toUpperCase()}
            </text>
            <text x={W - PAD_X + 12} y={H / 2}
              textAnchor="start" dominantBaseline="middle"
              fontFamily="'Marcellus SC', serif"
              fontWeight="bold" fontSize={11} letterSpacing="0.18em"
              fill={AXIS_LABEL}
              pointerEvents="none"
            >
              {quadrants.axisX.right.toUpperCase()}
            </text>
            <text x={W / 2} y={H - PAD_Y / 2}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="'Inter', system-ui, sans-serif"
              fontStyle="italic" fontSize={10} letterSpacing="0.08em"
              fill={AXIS_HINT}
              pointerEvents="none"
            >
              ← {quadrants.axisX.label} →
            </text>

            {/* ── Axis labels (Y axis) — outside the frame ── */}
            <text x={W / 2} y={PAD_Y - 14}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="'Marcellus SC', serif"
              fontWeight="bold" fontSize={11} letterSpacing="0.18em"
              fill={AXIS_LABEL}
              pointerEvents="none"
            >
              {quadrants.axisY.top.toUpperCase()}
            </text>
            <text x={W / 2} y={H - PAD_Y + 18}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="'Marcellus SC', serif"
              fontWeight="bold" fontSize={11} letterSpacing="0.18em"
              fill={AXIS_LABEL}
              pointerEvents="none"
            >
              {quadrants.axisY.bottom.toUpperCase()}
            </text>
            {/* ── Concept markers ── */}
            {concepts.map(concept => {
              const isSelected = selected?.id === concept.id
              const isHovered  = hovered === concept.id
              const isPulsing  = pulsing.has(concept.id)
              const active     = isSelected || isHovered
              const lo         = concept.labelOffset ?? { dx: 12, dy: 0, anchor: 'start' as const }
              const cx         = mapX(concept.x)
              const cy         = mapY(concept.y)
              const glyph      = CONCEPT_GLYPH[concept.type] ?? '◆'

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
                </g>
              )
            })}
          </svg>
        </div>

        <MapZoomControls onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={reset} />
      </div>

      {/* Detail card + legend */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-4 items-start">
        {selected ? (
          <div className="border border-[--hairline] p-5 bg-[--bg-raised] min-h-[100px]">
            <p className="font-ui text-[10px] font-medium tracking-[0.22em] uppercase text-[--fg-faint] mb-2">
              <span className="mr-1.5 opacity-70">{CONCEPT_GLYPH[selected.type]}</span>
              {CONCEPT_LABEL[selected.type] ?? 'Konzept'}
            </p>
            <p className="font-display text-[18px] tracking-[0.10em] text-[--fg] mb-3">
              {selected.name}
            </p>
            <p className="font-prose text-[15px] leading-relaxed text-[--fg-muted]">
              {selected.description}
            </p>
            {authorsOf.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[--hairline]">
                <p className="font-ui text-[10px] tracking-[0.18em] uppercase text-[--fg-faint] mb-2.5">
                  Aus dieser Schule
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {authorsOf.map(t => (
                    <span key={t.id} className="font-ui text-[12px] text-[--fg-muted]">
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="border border-[--hairline] p-5 bg-[--bg-raised] min-h-[100px]">
            <p className="font-body italic text-[14px] text-[--fg-dim]">
              Wähle ein Konzept im Quadranten, um mehr zu erfahren.
            </p>
          </div>
        )}

        <div className="border border-[--hairline] p-5 bg-[--bg-raised]">
          <p className="section-label mb-3">Legende</p>
          <div className="flex flex-col gap-2.5">
            {(Object.entries(CONCEPT_LABEL) as [ConceptType, string][]).map(([type, label]) => (
              <div key={type} className="flex items-center gap-3 font-ui text-[11px] text-[--fg-faint]">
                <span className="w-5 text-center text-[--gold] opacity-75 text-xs">
                  {CONCEPT_GLYPH[type]}
                </span>
                <span>{label}</span>
              </div>
            ))}
            <MapHiddenCounter
              hidden={hidden}
              noun={{ singular: 'Konzept', plural: 'Konzepte' }}
              className="font-body italic text-xs text-[--fg-dim] mt-2 border-t border-[--hairline] pt-2"
            />
          </div>
        </div>
      </div>

    </div>
  )
}
