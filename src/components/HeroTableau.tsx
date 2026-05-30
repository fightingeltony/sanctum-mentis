'use client'

/*
 * HeroTableau — lebendige Tableau-Miniatur für die Landing Page.
 * Läuft den Komplexitäts-Level langsam von Minimum → Maximum (Loop) und füllt
 * dabei das Quadranten-Feld Band für Band. Macht die Kernmechanik sichtbar,
 * statt sie nur zu behaupten. Pausiert bei Hover, respektiert prefers-reduced-motion.
 *
 * → Zielpfad: src/components/HeroTableau.tsx
 * Keine neuen Dependencies. Nutzt die bestehenden --*-Tokens aus globals.css.
 */

import { useEffect, useRef, useState } from 'react'
import type { Quadrants, Level } from '@/lib/types'

export interface HeroPoint {
  id: string
  name: string
  x: number          // 0–100
  y: number          // 0–100
  firstLevel: number // ab welchem Level das Konzept erscheint
}

interface Props {
  quadrants: Quadrants
  levels: Level[]
  points: HeroPoint[]
  /** Konzept-IDs, deren Namen aufs Feld geschrieben werden (Rest bleibt Punkt). */
  labelIds?: string[]
  /** Haltedauer je Level in ms (Default 1450). */
  stepMs?: number
  topicTitle?: string
}

const W = 600, H = 408
const X0 = 64, X1 = 536, Y0 = 44, Y1 = 348
const CX = (X0 + X1) / 2, CY = (Y0 + Y1) / 2
const mapX = (x: number) => X0 + (x / 100) * (X1 - X0)
const mapY = (y: number) => Y1 - (y / 100) * (Y1 - Y0)
const shortOf = (l: Level) => l.short ?? `L${l.id}`

export default function HeroTableau({
  quadrants, levels, points, labelIds = [], stepMs = 1450, topicTitle = '',
}: Props) {
  const minLevel = levels.length ? levels[0].id : 1
  const maxLevel = levels.length ? levels[levels.length - 1].id : 5
  const [level, setLevel] = useState(minLevel)
  const paused = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reduce) { setLevel(maxLevel); return }

    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    const advance = (l: number) => {
      if (cancelled) return
      setLevel(l)
      const next = l >= maxLevel ? minLevel : l + 1
      const delay = l >= maxLevel ? stepMs * 1.9 : stepMs
      const schedule = () => {
        if (paused.current) { timer = setTimeout(schedule, 220); return }
        advance(next)
      }
      timer = setTimeout(schedule, delay)
    }
    timer = setTimeout(() => advance(minLevel), 500)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [minLevel, maxLevel, stepMs])

  const visible = points.filter(p => p.firstLevel <= level)
  const cur = levels.find(l => l.id === level) ?? levels[0]
  const activeIdx = Math.max(0, levels.findIndex(l => l.id === level))
  const fillPct = levels.length > 1 ? (activeIdx / (levels.length - 1)) * 100 : 0
  const labelSet = new Set(labelIds)
  const q = quadrants

  return (
    <div
      className="flex flex-col gap-4"
      onPointerEnter={() => { paused.current = true }}
      onPointerLeave={() => { paused.current = false }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto"
        role="img"
        aria-label={`Konzept-Landschaft${topicTitle ? ` von „${topicTitle}“` : ''}, Komplexität ${cur.label}`}
      >
        {/* quarter grid */}
        {[(X0 + CX) / 2, (CX + X1) / 2].map((x, i) => (
          <line key={`vx${i}`} x1={x} y1={Y0} x2={x} y2={Y1} stroke="oklch(0.35 0.022 65 / 0.15)" strokeWidth={0.6} strokeDasharray="2 5" />
        ))}
        {[(Y0 + CY) / 2, (CY + Y1) / 2].map((y, i) => (
          <line key={`hy${i}`} x1={X0} y1={y} x2={X1} y2={y} stroke="oklch(0.35 0.022 65 / 0.15)" strokeWidth={0.6} strokeDasharray="2 5" />
        ))}

        {/* frame + axis cross */}
        <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="none" stroke="oklch(0.35 0.022 65 / 0.30)" strokeWidth={0.75} />
        <line x1={CX} y1={Y0} x2={CX} y2={Y1} stroke="oklch(0.35 0.022 65 / 0.46)" strokeWidth={1} />
        <line x1={X0} y1={CY} x2={X1} y2={CY} stroke="oklch(0.35 0.022 65 / 0.46)" strokeWidth={1} />

        {/* poles (Y-Achse) + Achsenfrage (X) */}
        <text x={CX} y={Y0 - 14} textAnchor="middle" fontFamily="'Marcellus SC', serif" fontSize={11} letterSpacing="0.20em" fill="oklch(0.30 0.022 65 / 0.85)">{q.axisY.top.toUpperCase()}</text>
        <text x={CX} y={Y1 + 24} textAnchor="middle" fontFamily="'Marcellus SC', serif" fontSize={11} letterSpacing="0.20em" fill="oklch(0.30 0.022 65 / 0.85)">{q.axisY.bottom.toUpperCase()}</text>
        <text x={CX} y={H - 8} textAnchor="middle" fontStyle="italic" fontSize={10} letterSpacing="0.06em" fill="oklch(0.46 0.022 65 / 0.6)">← {q.axisX.label} →</text>

        {/* Konzept-Punkte */}
        {visible.map(p => {
          const PX = mapX(p.x), PY = mapY(p.y)
          const anchor = p.x >= 55 ? 'end' : 'start'
          const lx = PX + (anchor === 'end' ? -11 : 11)
          const isNew = p.firstLevel === level
          return (
            <g key={p.id} className={`hero-pt${isNew ? ' is-new' : ''}`}>
              <rect x={PX - 4} y={PY - 4} width={8} height={8} className="hero-dia" transform={`rotate(45 ${PX} ${PY})`} />
              {labelSet.has(p.id) && (
                <text x={lx} y={PY} className="hero-name" textAnchor={anchor} dominantBaseline="central">
                  {p.name.toUpperCase()}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Mini-Slider — die Mechanik sichtbar gemacht */}
      <div className="flex flex-col gap-2">
        <div className="relative flex h-3 items-center">
          <span className="absolute inset-x-0 h-px" style={{ background: 'var(--hairline-strong)' }} />
          <span className="absolute h-px" style={{ left: 0, width: `${fillPct}%`, background: 'var(--accent)', transition: 'width .7s cubic-bezier(.4,0,.2,1)' }} />
          <span className="hero-thumb" style={{ left: `${fillPct}%` }} />
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex gap-4">
            {levels.map(l => (
              <span
                key={l.id}
                className="font-ui text-[9.5px] tracking-[0.06em]"
                style={{ color: l.id === level ? 'var(--accent)' : 'var(--fg-dim)', fontWeight: l.id === level ? 600 : 400 }}
              >
                {shortOf(l)}
              </span>
            ))}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-ui text-[9.5px] font-semibold tracking-[0.08em]" style={{ color: 'var(--accent)' }}>{shortOf(cur)}</span>
            <span className="font-display text-[13px] tracking-[0.03em]" style={{ color: 'var(--fg-muted)' }}>{cur.label}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-dia { fill: var(--accent); fill-opacity: 0.62; }
        .hero-pt.is-new .hero-dia { animation: heroKindle 0.85s ease-out; }
        .hero-name {
          font-family: 'Marcellus SC', serif; font-size: 9.5px; letter-spacing: 0.07em;
          fill: var(--ink); fill-opacity: 0.85;
          paint-order: stroke; stroke: var(--bg-sunk); stroke-width: 3px; stroke-linejoin: round;
        }
        .hero-thumb {
          position: absolute; width: 11px; height: 11px; border-radius: 2px;
          background: var(--accent); transform: translateX(-50%) rotate(45deg);
          transition: left 0.7s cubic-bezier(.4, 0, .2, 1);
          box-shadow: 0 0 0 4px color-mix(in oklch, var(--accent) 15%, transparent);
        }
        @keyframes heroKindle { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .hero-pt.is-new .hero-dia { animation: none; }
          .hero-thumb { transition: none; }
        }
      `}</style>
    </div>
  )
}
