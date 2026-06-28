'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { TopicData, LectioSummary } from '@/lib/types'
import { computeLevelState } from '@/lib/complexityEngine'
import LevelSlider from './LevelSlider'
import ThinkerList from './ThinkerList'
import StarChart from './StarChart'
import { useCommandPalette } from './ShellCommandPaletteProvider'

type Tab = 'denker' | 'sternkarte'

const VALID_TABS = ['denker', 'sternkarte'] as const

/**
 * Stufen-Gedächtnis pro Tableau — sitzungsweit, in-memory (Variante B, 28.6.26).
 * Modul-globale Map: überlebt client-seitige Navigation (Tableau A → B → A behält A's
 * Stand), wird aber bei Hard-Reload mit der JS-Laufzeit geleert → Default L1.
 * Bewusst KEIN localStorage/sessionStorage — keine Persistenz über die Sitzung hinaus.
 */
const levelMemory = new Map<string, number>()

interface Props {
  data: TopicData
  /** Lectios for this tableau — shown as guided-path discovery in the header */
  lectios?: LectioSummary[]
}

export default function TopicViewer({ data, lectios }: Props) {
  const searchParams = useSearchParams()

  // Read URL params client-side — keeps the page as SSG
  const rawTab    = searchParams.get('tab') ?? undefined
  const rawLevel  = searchParams.get('level') ?? undefined
  const rawHighlight = searchParams.get('highlight') ?? undefined

  const initialTab: Tab | undefined = (VALID_TABS as readonly string[]).includes(rawTab ?? '')
    ? rawTab as Tab
    : undefined
  const initialLevel  = rawLevel ? Number(rawLevel) : undefined
  const initialHighlight = rawHighlight
  const [levelId, setLevelId] = useState(1)
  const [tab, setTab]         = useState<Tab>('denker')
  const [menuOpen, setMenuOpen]     = useState(false)
  const [highlightId, setHighlightId] = useState<string | null>(null)
  // Signal NUR für nutzerinitiierte Level-Wechsel (nicht für URL/localStorage-Restore):
  // 'up' fokussiert die Denker-Liste auf Neu/Vertieft, 'down' öffnet zurück auf „Alle".
  const [levelAction, setLevelAction] = useState<{ dir: 'up' | 'down'; tick: number } | null>(null)
  const levelTick = useRef(0)

  const palette = useCommandPalette()

  /* ── Level initialisation: URL param > Sitzungs-Gedächtnis (in-memory) ── */
  useEffect(() => {
    if (initialLevel !== undefined && !isNaN(initialLevel) && initialLevel >= 1) {
      const n = Math.min(initialLevel, data.topic.complexityLevels)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLevelId(n) // Client-only init from URL param — runs once on mount, not cascading
      levelMemory.set(data.topic.id, n)
    } else {
      const saved = levelMemory.get(data.topic.id)
      if (saved !== undefined) {
        const n = Math.min(saved, data.topic.complexityLevels)
        if (n >= 1) setLevelId(n) // Client-only init from session memory — runs once on mount
      }
    }
  }, [data.topic.id, data.topic.complexityLevels, initialLevel])

  /* ── Tab + highlight from URL params ── */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialTab) setTab(initialTab) // Client-only init from URL param — runs once on mount
    if (initialHighlight) {
      // Defer highlight until level has re-rendered so the card is in the DOM
      const t = setTimeout(() => setHighlightId(initialHighlight), 0)
      return () => clearTimeout(t)
    }
  }, [initialHighlight, initialTab])

  function handleLevelChange(id: number) {
    if (id !== levelId) {
      levelTick.current += 1
      setLevelAction({ dir: id > levelId ? 'up' : 'down', tick: levelTick.current })
    }
    setLevelId(id)
    levelMemory.set(data.topic.id, id)
  }

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const state = useMemo(() => computeLevelState(data, levelId), [data, levelId])

  const tabs: { id: Tab; label: string; mobileLabel: string; numeral: string; count: number | null }[] = [
    { id: 'denker',     label: 'Denker',    mobileLabel: 'Denker', numeral: 'I',  count: state.thinkers.length },
    { id: 'sternkarte', label: 'Sternkarte', mobileLabel: 'Stern', numeral: 'II', count: null },
  ]

  const activeIdx = Math.max(0, data.levels.findIndex(l => l.id === levelId))
  const fillPct   = data.levels.length > 1 ? (activeIdx / (data.levels.length - 1)) * 100 : 0

  return (
    <div className="shell">

      {/* ── Mobile top bar ── */}
      <header className="mobile-bar">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="burger"
          aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
        >
          <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
        </button>

        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-display text-[11px] tracking-[0.18em] uppercase text-[var(--fg)] truncate">
            {data.topic.title}
          </span>
        </div>

        {/* Search button — opens the global palette via context */}
        <button
          onClick={() => palette?.openPalette()}
          className="flex items-center justify-center w-8 h-8 text-[var(--fg-dim)]
            hover:text-[var(--fg)] transition-colors"
          aria-label="Suche öffnen (Cmd+K)"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="6.5" cy="6.5" r="4.5" />
            <line x1="10.5" y1="10.5" x2="13.5" y2="13.5" />
          </svg>
        </button>
      </header>

      {menuOpen && (
        <div className="sidebar-overlay" onClick={closeMenu} />
      )}

      {/* ── Left rail ── */}
      <aside className={`sidebar-rail ${menuOpen ? 'open' : ''}`}>

        <div>
          <Link
            href="/"
            onClick={closeMenu}
            className="font-ui text-[10px] tracking-[0.22em] uppercase text-[var(--fg-faint)]
              hover:text-[var(--gold)] transition-colors no-underline"
          >
            Sanctum · Mentis
          </Link>
          <div
            className="h-px my-3"
            style={{
              background: 'linear-gradient(90deg, var(--gold) 0%, var(--gold) 18px, var(--hairline) 18px)'
            }}
          />
          <h1 className="font-display text-[18px] tracking-[0.18em] uppercase text-[var(--fg)]">
            Lern–Companion
          </h1>
        </div>

        <nav className="flex flex-col">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 py-3 border-b border-[var(--hairline)]
              font-ui text-[11px] tracking-[0.16em] uppercase text-[var(--fg-muted)]
              hover:text-[var(--fg)] transition-colors no-underline"
          >
            <span className="text-[14px]">⌂</span>
            Home
          </Link>
          <Link
            href="/themen"
            onClick={closeMenu}
            className="flex items-center gap-3 py-3 border-b border-[var(--hairline)]
              font-ui text-[11px] tracking-[0.16em] uppercase text-[var(--fg-muted)]
              hover:text-[var(--fg)] transition-colors no-underline"
          >
            <span className="text-[14px]">☰</span>
            Alle Themen
          </Link>
        </nav>

        <div className="hidden md:flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2
              className="font-prose text-[24px] font-medium leading-tight text-[var(--fg)] mt-1.5"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {data.topic.title}
            </h2>
            {data.topic.subtitle && (
              <p className="font-body italic text-[15px] text-[var(--fg-muted)]">
                {data.topic.subtitle}
              </p>
            )}
            {data.topic.era && (
              <p className="font-ui text-[11px] tracking-[0.10em] uppercase text-[var(--fg-dim)] mt-2">
                {data.topic.era}
              </p>
            )}
          </div>
          <div>
            <p className="section-label mb-4">Komplexitäts-Level</p>
            <LevelSlider
              levels={data.levels}
              value={levelId}
              onChange={handleLevelChange}
            />
          </div>
          <p className="font-ui text-[11px] text-[var(--fg-faint)]">
            <span className="text-[var(--fg-muted)]">{state.thinkers.length}</span>
            {' von '}
            <span className="text-[var(--fg-muted)]">{data.thinkers.length}</span>
            {' Denkern freigeschaltet'}
          </p>
        </div>

      </aside>

      {/* ── Main content ── */}
      <main className="main-content min-w-0">

        {data.topic.intro && (
          <p
            className="font-body italic text-[17px] leading-relaxed px-4 sm:px-5 mb-5"
            style={{ color: 'var(--accent)' }}
          >
            {data.topic.intro}
          </p>
        )}

        {lectios && lectios.length > 0 && (
          <div className="px-4 sm:px-5 mb-6">
            <p className="font-ui text-[11px] tracking-[0.06em] text-[var(--fg-faint)] mb-2">
              Geführte Pfade
            </p>
            <div className="flex flex-col gap-2">
              {lectios.map(l => (
                <Link
                  key={l.id}
                  href={`/lectio/${l.id}`}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded
                    no-underline transition-colors group"
                  style={{ border: '1px solid var(--hairline)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'var(--bg-raised)'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span
                      className="shrink-0 transition-transform group-hover:translate-x-0.5"
                      style={{ color: 'var(--accent)' }}
                    >
                      →
                    </span>
                    <span
                      className="font-body text-[14px] leading-snug truncate"
                      style={{ color: 'var(--fg)' }}
                    >
                      {l.title}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 shrink-0">
                    {(l.ton === 'erzählend-erfahrend' || l.ton === 'gemischt') && (
                      <span
                        className="font-ui text-[9px] tracking-[0.16em] uppercase px-1.5 py-0.5"
                        style={{
                          color: 'var(--accent)',
                          border: '1px solid color-mix(in oklch, var(--accent) 35%, transparent)',
                          borderRadius: '2px',
                        }}
                      >
                        Erzählend
                      </span>
                    )}
                    <span
                      className="font-ui text-[11px] tracking-[0.02em]"
                      style={{ color: 'var(--fg-faint)' }}
                    >
                      {l.stationCount} Stationen · ~{l.estimated_minutes} Min
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {levelId === data.topic.complexityLevels && data.topic.synthesis && (
          <div className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-5 px-4 sm:px-5 py-4 border border-[var(--hairline)] bg-[var(--bg-raised)] mb-6 items-start">
            <span className="font-ui text-[10px] font-medium tracking-[0.22em] uppercase text-[var(--gold)] pt-0.5 shrink-0">
              Synthese
            </span>
            <p className="font-body italic text-[15px] text-[var(--fg-muted)] leading-relaxed">
              {data.topic.synthesis}
            </p>
          </div>
        )}

        <nav className="tabbar-desktop" role="tablist">
          {tabs.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`pb-3 font-ui text-[11px] tracking-[0.22em] uppercase
                border-b border-transparent -mb-px transition-colors
                flex items-center gap-2 whitespace-nowrap shrink-0
                ${tab === t.id
                  ? 'text-[var(--fg)] border-[var(--gold)]'
                  : 'text-[var(--fg-faint)] hover:text-[var(--fg-muted)]'
                }`}
            >
              <span className={`font-display text-[10px] tracking-[0.15em] mr-0.5
                ${tab === t.id ? 'text-[var(--gold)]' : 'text-[var(--fg-dim)]'}`}>
                {t.numeral}
              </span>
              <span>{t.label}</span>
              {t.count !== null && (
                <span className={`font-prose italic text-[12px] tracking-normal normal-case
                  ${tab === t.id ? 'text-[var(--gold-soft)]' : 'text-[var(--fg-dim)]'}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {tab === 'denker' && (
          <ThinkerList
            thinkers={state.thinkers}
            schools={data.schools}
            context={state.context}
            currentLevel={state.level}
            levelAction={levelAction}
            listStyle={data.topic.thinkerListStyle}
            highlightId={highlightId}
            onHighlightDone={() => setHighlightId(null)}
          />
        )}
        {tab === 'sternkarte' && (
          <div className="px-4 sm:px-5 py-4">
            <StarChart
              thinkers={state.thinkers}
              allThinkers={data.thinkers}
              influences={state.influences}
              schools={data.schools}
              concepts={state.concepts}
              levelId={levelId}
              levels={data.levels}
              quadrants={data.topic.quadrants}
            />
          </div>
        )}
      </main>

      {/* ── Mobile bottom bar ── */}
      <div className="bottom-tab-bar">
        <div className="slider-strip">
          <span className="font-display text-[10px] tracking-[0.14em] uppercase text-[var(--gold)] shrink-0 w-[5.5rem]">
            {state.level.label}
          </span>
          <input
            type="range"
            className="slider flex-1"
            min={0}
            max={data.levels.length - 1}
            step={1}
            value={activeIdx}
            onChange={e => handleLevelChange(data.levels[parseInt(e.target.value)].id)}
            aria-label="Komplexität"
            style={{ '--slider-fill': `${fillPct}%` } as React.CSSProperties}
          />
        </div>

        <nav className="tabs-row flex" role="tablist" aria-label="Tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className="bottom-tab-btn"
            >
              <span className={`font-display text-[9px] tracking-[0.12em] transition-colors
                ${tab === t.id ? 'text-[var(--gold)]' : 'text-[var(--fg-dim)]'}`}>
                {t.numeral}
              </span>
              <span className={`font-ui text-[10px] tracking-[0.12em] transition-colors
                ${tab === t.id ? 'text-[var(--fg)]' : 'text-[var(--fg-faint)]'}`}>
                {t.mobileLabel}
              </span>
              {t.count !== null && (
                <span className={`font-prose italic text-[9px] tracking-normal normal-case transition-colors
                  ${tab === t.id ? 'text-[var(--gold-soft)]' : 'text-[var(--fg-dim)]'}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

    </div>
  )
}
