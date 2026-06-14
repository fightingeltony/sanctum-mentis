'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { normalize } from '@/lib/searchTypes'
import type { SearchEntry } from '@/lib/searchTypes'

interface Props {
  open: boolean
  onClose: () => void
}

const TYPE_LABEL: Record<SearchEntry['type'], string> = {
  thinker:     'Denker',
  concept:     'Konzept',
  school:      'Schule',
  lectio:      'Lectio',
  lebensfrage: 'Lebensfrage',
}

// Module-level cache so the index is fetched only once per session
let _indexPromise: Promise<SearchEntry[]> | null = null

function fetchIndex(): Promise<SearchEntry[]> {
  if (!_indexPromise) {
    _indexPromise = fetch('/api/search-index')
      .then(r => {
        if (!r.ok) throw new Error(`search-index fetch failed: ${r.status}`)
        return r.json() as Promise<SearchEntry[]>
      })
      .catch(err => {
        // Reset so the next open can retry
        _indexPromise = null
        throw err
      })
  }
  return _indexPromise
}

export default function CommandPalette({ open, onClose }: Props) {
  const router = useRouter()
  const [search, setSearch]         = useState('')
  const [allEntries, setAllEntries] = useState<SearchEntry[] | null>(null)
  const [indexError, setIndexError] = useState(false)
  const hasFetched = useRef(false)

  // Fetch index on first open
  useEffect(() => {
    if (!open || hasFetched.current) return
    hasFetched.current = true
    setIndexError(false)
    fetchIndex()
      .then(entries => setAllEntries(entries))
      .catch(() => setIndexError(true))
  }, [open])

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setSearch('') // Clears stale search term each time the palette re-opens
  }, [open])

  function handleSelect(entry: SearchEntry) {
    onClose()

    if (entry.type === 'lectio') {
      router.push(`/lectio/${entry.topicId}`)
      return
    }
    if (entry.type === 'lebensfrage') {
      router.push(`/lebensfragen/${entry.topicId}`)
      return
    }

    const params = new URLSearchParams()
    if (entry.type === 'thinker') {
      params.set('highlight', entry.nodeId ?? '')
      params.set('tab', 'denker')
    } else if (entry.type === 'concept') {
      params.set('tab', 'sternkarte')
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

  const loading = allEntries === null && !indexError

  const hits = !loading && !indexError && search.trim()
    ? allEntries!.filter(e => normalize(e.name).includes(normalize(search)))
    : []

  // Count only tableau entries for the Tableaus counter
  const tableauEntries = allEntries?.filter(e =>
    e.type === 'thinker' || e.type === 'concept' || e.type === 'school'
  ) ?? []
  const tableauCount = new Set(tableauEntries.map(e => e.topicId)).size

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh]"
      style={{ background: 'var(--overlay-modal)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[580px] mx-4 border border-[var(--hairline-strong)] rounded-[6px] overflow-hidden"
        style={{ background: 'var(--bg-raised)', boxShadow: '0 24px 64px oklch(0.15 0.020 65 / 0.30)' }}
        onClick={e => e.stopPropagation()}
      >
        <Command shouldFilter={false} loop>

          {/* ── Search input ── */}
          <div
            className="flex items-center gap-3 px-5 border-b border-[var(--hairline)]"
            style={{ paddingTop: '14px', paddingBottom: '14px' }}
          >
            <span className="font-body text-[18px] text-[var(--fg-dim)] leading-none select-none">⌕</span>
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder="Denker, Konzepte, Lectios, Lebensfragen …"
              className="flex-1 bg-transparent outline-none font-prose text-[16px]
                text-[var(--fg)] placeholder:text-[var(--fg-dim)]"
            />
            <kbd className="font-ui text-[9px] tracking-[0.12em] uppercase text-[var(--fg-faint)]
              border border-[var(--hairline)] px-1.5 py-0.5 rounded-[2px] select-none">
              esc
            </kbd>
          </div>

          {/* ── Results ── */}
          <Command.List className="overflow-y-auto p-2" style={{ maxHeight: '420px' }}>
            {loading ? (
              <p className="py-10 text-center font-body italic text-[14px] text-[var(--fg-dim)]">
                Lade Index …
              </p>
            ) : indexError ? (
              <p className="py-10 text-center font-body italic text-[14px] text-[var(--fg-dim)]">
                Suche derzeit nicht verfügbar.
              </p>
            ) : !search.trim() ? (
              <p className="py-10 text-center font-body italic text-[14px] text-[var(--fg-dim)]">
                Denker, Konzepte, Lectios oder Lebensfragen suchen …
              </p>
            ) : hits.length === 0 ? (
              <p className="py-10 text-center font-body italic text-[14px] text-[var(--fg-dim)]">
                Nichts gefunden.
              </p>
            ) : (
              hits.map(entry => (
                <Command.Item
                  key={`${entry.topicId}-${entry.type}-${entry.nodeId ?? entry.topicId}`}
                  value={`${entry.topicId}-${entry.type}-${entry.nodeId ?? entry.topicId}`}
                  onSelect={() => handleSelect(entry)}
                  className="flex items-center gap-3 px-4 py-3 rounded-[4px] cursor-pointer
                    aria-selected:bg-[var(--bg-sunk)] outline-none"
                >
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    {/* Name + type badge */}
                    <div className="flex items-baseline justify-between gap-3 min-w-0">
                      <span className="font-prose font-medium text-[14px] text-[var(--fg)] leading-tight truncate">
                        {entry.name}
                      </span>
                      <span className="font-ui text-[9px] tracking-[0.14em] uppercase text-[var(--fg-faint)] shrink-0">
                        {TYPE_LABEL[entry.type]}
                      </span>
                    </div>
                    {/* Tableau + level */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-ui text-[11px] text-[var(--fg-dim)]">
                        {entry.topicTitle}
                      </span>
                      {entry.firstLevel !== undefined && (
                        <span className="font-ui text-[10px] tracking-[0.10em] text-[var(--fg-faint)]">
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
          <div className="flex items-center gap-4 px-5 py-2.5 border-t border-[var(--hairline)]">
            <span className="font-ui text-[9px] tracking-[0.12em] uppercase text-[var(--fg-faint)]">
              ↑↓ navigieren
            </span>
            <span className="font-ui text-[9px] tracking-[0.12em] uppercase text-[var(--fg-faint)]">
              ↵ öffnen
            </span>
            <span className="font-ui text-[9px] tracking-[0.12em] uppercase text-[var(--fg-faint)] ml-auto">
              {allEntries !== null
                ? `${allEntries.length} Einträge in ${tableauCount} Tableaus`
                : '…'}
            </span>
          </div>

        </Command>
      </div>
    </div>
  )
}
