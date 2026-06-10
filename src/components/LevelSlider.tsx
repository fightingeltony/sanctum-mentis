'use client'

import React from 'react'
import type { Level } from '@/lib/types'

interface Props {
  levels: Level[]
  value: number
  onChange: (level: number) => void
}

export default function LevelSlider({ levels, value, onChange }: Props) {
  const current = levels.find(l => l.id === value) ?? levels[0]
  const n = levels.length
  const activeIdx = Math.max(0, levels.findIndex(l => l.id === value))
  const fillPct = n > 1 ? (activeIdx / (n - 1)) * 100 : 0

  return (
    <div className="flex flex-col gap-3">

      {/* Label row */}
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-[13px] tracking-[0.16em] uppercase text-[var(--gold)]">
          {current.label}
        </span>
        <span className="font-ui text-[11px] text-[var(--fg-faint)]">
          {current.short}
        </span>
      </div>

      {/* Range slider */}
      <input
        type="range"
        className="slider"
        min={0}
        max={n - 1}
        step={1}
        value={activeIdx}
        onChange={e => onChange(levels[parseInt(e.target.value)].id)}
        aria-label="Komplexitäts-Level"
        style={{ '--slider-fill': `${fillPct}%` } as React.CSSProperties}
      />

      {/* Tick labels */}
      <div className="flex justify-between">
        {levels.map(l => (
          <button
            key={l.id}
            onClick={() => onChange(l.id)}
            title={l.filled ? l.label : `${l.label} — noch nicht ausgearbeitet`}
            className={`font-ui text-[9px] tracking-[0.10em] uppercase transition-colors
              ${l.id === value ? 'text-[var(--gold)]' : l.filled ? 'text-[var(--fg-dim)] hover:text-[var(--fg-muted)]' : 'text-[var(--fg-dim)] opacity-35'}`}
          >
            {l.short}
          </button>
        ))}
      </div>
    </div>
  )
}
