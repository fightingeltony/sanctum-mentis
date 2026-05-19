'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { buildGlobalSearchIndex, normalize } from '@/lib/searchIndex'
import type { SearchEntry } from '@/lib/searchIndex'

interface Props {
  open: boolean
  onClose: () => void
}

const TYPE_LABEL: Record<SearchEntry['type'], string> = {
  thinker: 'Denker',
  concept: 'Konzept',
  school:  'Schule',
}

export default function CommandPalette({ open, onClose }: Props) {
  const router     = useRouter()
  const allEntries = useMemo(() => buildGlobalSearchIndex(), [])
  const [search, setSearch] = useState('')

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  /* Reset search when palette opens */
  useEffect(() => {
    if (open) setSearch('')
  }, [open])

  function handleSelect(entry: SearchEntry) {
    onClose()

    const params = new URLSearchParams()
    if (entry.type === 'thinker') {
      params.set('highlight', entry.nodeId)
      params.set('tab', 'denker')
    } else if (entry.type === 'concept') {
      params.set('tab', 'quadrant')
    } else {
      // school → denker tab with school visible
      params.set('tab', 'denker')
    }
    if (entry.firstLevel !== undefined) {
      params.set('level', String(entry.firstLevel))
    }

    router.push(`/thema/${entry.topicId}?${params.toString()}`)
  }

  if (!open) return null

  const hits = search.trim()
    ? allEntries.filter(e => normalize(e.name).includes(normalize(search)))
    : []

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
        <Command shouldFilter={false} loop>

          {/* ── Search input ── */}
          <div
            className="flex items-center gap-3 px-5 border-b border-[--hairline]"
            style={{ paddingTop: '14px', paddingBottom: '14px' }}
          >
            <span className="font-body text-[18px] text-[--fg-dim] leading-none select-none">⌕</span>
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder="Denker, Konzepte, Schulen …"
              className="flex-1 bg-transparent outline-none font-prose text-[16px]
                text-[--fg] placeholder:text-[--fg-dim]"
            />
            <kbd className="font-ui text-[9px] tracking-[0.12em] uppercase text-[--fg-faint]
              border border-[--hairline] px-1.5 py-0.5 rounded-[2px] select-none">
              esc
            </kbd>
          </div>

          {/* ── Results ── */}
          <Command.List className="overflow-y-auto p-2" style={{ maxHeight: '420px' }}>
            {!search.trim() ? (
              <p className="py-10 text-center font-body italic text-[14px] text-[--fg-dim]">
                Denker, Konzepte oder Schulen suchen …
              </p>
            ) : hits.length === 0 ? (
              <p className="py-10 text-center font-body italic text-[14px] text-[--fg-dim]">
                Nichts gefunden.
              </p>
            ) : (
              hits.map(entry => (
                <Command.Item
                  key={`${entry.topicId}-${entry.type}-${entry.nodeId}`}
                  value={`${entry.topicId}-${entry.type}-${entry.nodeId}`}
                  onSelect={() => handleSelect(entry)}
                  className="flex items-center gap-3 px-4 py-3 rounded-[4px] cursor-pointer
                    aria-selected:bg-[--bg-sunk] outline-none"
                >
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    {/* Name + type badge */}
                    <div className="flex items-baseline justify-between gap-3 min-w-0">
                      <span className="font-prose font-medium text-[14px] text-[--fg] leading-tight truncate">
                        {entry.name}
                      </span>
                      <span className="font-ui text-[9px] tracking-[0.14em] uppercase text-[--fg-faint] shrink-0">
                        {TYPE_LABEL[entry.type]}
                      </span>
                    </div>
                    {/* Tableau + level */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-ui text-[11px] text-[--fg-dim]">
                        {entry.topicTitle}
                      </span>
                      {entry.firstLevel !== undefined && (
                        <span className="font-ui text-[10px] tracking-[0.10em] text-[--fg-faint]">
                          — L{entry.firstLevel}
                        </span>
                      )}
                    </div>
                  </div>
                </Command.Item>
              ))
            )}
          </Command.List>

          {/* ── Footer ── */}
          <div className="flex items-center gap-4 px-5 py-2.5 border-t border-[--hairline]">
            <span className="font-ui text-[9px] tracking-[0.12em] uppercase text-[--fg-faint]">
              ↑↓ navigieren
            </span>
            <span className="font-ui text-[9px] tracking-[0.12em] uppercase text-[--fg-faint]">
              ↵ öffnen
            </span>
            <span className="font-ui text-[9px] tracking-[0.12em] uppercase text-[--fg-faint] ml-auto">
              {allEntries.length} Einträge in {Object.keys(
                allEntries.reduce((acc, e) => ({ ...acc, [e.topicId]: 1 }), {})
              ).length} Tableaus
            </span>
          </div>

        </Command>
      </div>
    </div>
  )
}
