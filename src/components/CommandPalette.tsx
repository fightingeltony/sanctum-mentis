'use client'

import { useEffect } from 'react'
import { Command } from 'cmdk'
import type { Thinker, School } from '@/lib/types'

interface ThinkerWithDesc extends Thinker {
  description: string
}

interface Props {
  open: boolean
  onClose: () => void
  thinkers: ThinkerWithDesc[]
  schools: School[]
  onSelect: (thinkerId: string) => void
}

export default function CommandPalette({ open, onClose, thinkers, schools, onSelect }: Props) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh]"
      style={{ background: 'var(--overlay-modal)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[580px] mx-4 border border-[--hairline-strong] rounded-[6px] overflow-hidden"
        style={{ background: 'var(--bg-raised)', boxShadow: '0 24px 64px oklch(0.15 0.020 65 / 0.30)' }}
        onClick={e => e.stopPropagation()}
      >
        <Command>
          <div className="flex items-center gap-3 px-5 border-b border-[--hairline]"
            style={{ paddingTop: '14px', paddingBottom: '14px' }}>
            <span className="font-body text-[18px] text-[--fg-dim] leading-none select-none">⌕</span>
            <Command.Input
              autoFocus
              placeholder="Denker suchen …"
              className="flex-1 bg-transparent outline-none font-prose text-[16px]
                text-[--fg] placeholder:text-[--fg-dim]"
            />
            <kbd className="font-ui text-[9px] tracking-[0.12em] uppercase text-[--fg-faint]
              border border-[--hairline] px-1.5 py-0.5 rounded-[2px] select-none">
              esc
            </kbd>
          </div>

          <Command.List className="overflow-y-auto p-2" style={{ maxHeight: '400px' }}>
            <Command.Empty className="py-12 text-center font-body italic text-[14px] text-[--fg-dim]">
              Kein Denker gefunden.
            </Command.Empty>

            {thinkers.map(t => {
              const school = schools.find(s => s.id === t.schoolId)
              const color = school?.color ?? 'var(--gold)'
              return (
                <Command.Item
                  key={t.id}
                  value={t.name}
                  onSelect={() => onSelect(t.id)}
                  className="flex items-start gap-3 px-4 py-3 rounded-[4px] cursor-pointer
                    aria-selected:bg-[--bg-sunk] outline-none"
                >
                  <span
                    className="w-[3px] self-stretch rounded-full shrink-0 mt-0.5"
                    style={{ background: color }}
                  />

                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 min-w-0 flex-wrap">
                      <span className="font-prose font-medium text-[14px] text-[--fg] leading-tight">
                        {t.name}
                      </span>
                      {t.lifespan && (
                        <span className="font-ui text-[9px] tracking-[0.10em] text-[--fg-dim]">
                          {t.lifespan}
                        </span>
                      )}
                      {school && (
                        <span
                          className="font-ui text-[9px] tracking-[0.14em] uppercase shrink-0"
                          style={{ color }}
                        >
                          {school.label}
                        </span>
                      )}
                    </div>
                    <p className="font-prose text-[12px] text-[--fg-muted] leading-relaxed"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      } as React.CSSProperties}>
                      {t.description}
                    </p>
                  </div>
                </Command.Item>
              )
            })}
          </Command.List>

          <div className="flex items-center gap-4 px-5 py-2.5 border-t border-[--hairline]">
            <span className="font-ui text-[9px] tracking-[0.12em] uppercase text-[--fg-faint]">
              ↑↓ navigieren
            </span>
            <span className="font-ui text-[9px] tracking-[0.12em] uppercase text-[--fg-faint]">
              ↵ öffnen
            </span>
            <span className="font-ui text-[9px] tracking-[0.12em] uppercase text-[--fg-faint] ml-auto">
              {thinkers.length} Denker freigeschaltet
            </span>
          </div>
        </Command>
      </div>
    </div>
  )
}
