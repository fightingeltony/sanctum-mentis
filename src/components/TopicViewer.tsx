'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import type { TopicData } from '@/lib/types'
import { computeLevelState } from '@/lib/complexityEngine'
import LevelSlider from './LevelSlider'
import ThinkerList from './ThinkerList'
import InfluenceGraph from './InfluenceGraph'
import QuadrantPlot from './QuadrantPlot'
import CommandPalette from './CommandPalette'

type Tab = 'denker' | 'einfluesse' | 'quadrant'

interface Props {
  data: TopicData
}

export default function TopicViewer({ data }: Props) {
  const [levelId, setLevelId] = useState(1)
  const [tab, setTab] = useState<Tab>('denker')
  const [menuOpen, setMenuOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [highlightId, setHighlightId] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(`mentis:level:${data.topic.id}`)
    if (saved !== null) {
      const n = Math.min(Number(saved), data.topic.complexityLevels)
      if (n >= 1) setLevelId(n)
    }
  }, [data.topic.id, data.topic.complexityLevels])

  function handleLevelChange(id: number) {
    setLevelId(id)
    localStorage.setItem(`mentis:level:${data.topic.id}`, String(id))
  }

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const state = useMemo(() => computeLevelState(data, levelId), [data, levelId])

  const tabs: { id: Tab; label: string; mobileLabel: string; numeral: string; count: number | null }[] = [
    { id: 'denker',     label: 'Denker',     mobileLabel: 'Denker', numeral: 'I',   count: state.thinkers.length },
    { id: 'einfluesse', label: 'Einflüsse',  mobileLabel: 'Netz',   numeral: 'II',  count: state.influences.length },
    { id: 'quadrant',   label: 'Konzepte',   mobileLabel: 'Karte',  numeral: 'III', count: state.concepts.length },
  ]

  const activeIdx = Math.max(0, data.levels.findIndex(l => l.id === levelId))
  const fillPct = data.levels.length > 1 ? (activeIdx / (data.levels.length - 1)) * 100 : 0

  return (
    <div className="shell">

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        thinkers={state.thinkers}
        schools={data.schools}
        onSelect={(id) => {
          setCmdOpen(false)
          setTab('denker')
          setHighlightId(id)
        }}
      />

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
          <span className="font-display text-[11px] tracking-[0.18em] uppercase text-[--fg] truncate">
            {data.topic.title}
          </span>
        </div>

        <button
          onClick={() => setCmdOpen(true)}
          className="flex items-center justify-center w-8 h-8 text-[--fg-dim]
            hover:text-[--fg] transition-colors"
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
            className="font-ui text-[10px] tracking-[0.22em] uppercase text-[--fg-faint]
              hover:text-[--gold] transition-colors no-underline"
          >
            Sanctum · Mentis
          </Link>
          <div
            className="h-px my-3"
            style={{
              background: 'linear-gradient(90deg, var(--gold) 0%, var(--gold) 18px, var(--hairline) 18px)'
            }}
          />
          <h1 className="font-display text-[18px] tracking-[0.18em] uppercase text-[--fg]">
            Lern–Companion
          </h1>
        </div>

        <nav className="flex flex-col">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 py-3 border-b border-[--hairline]
              font-ui text-[11px] tracking-[0.16em] uppercase text-[--fg-muted]
              hover:text-[--fg] transition-colors no-underline"
          >
            <span className="text-[14px]">⌂</span>
            Home
          </Link>
          <Link
            href="/themen"
            onClick={closeMenu}
            className="flex items-center gap-3 py-3 border-b border-[--hairline]
              font-ui text-[11px] tracking-[0.16em] uppercase text-[--fg-muted]
              hover:text-[--fg] transition-colors no-underline"
          >
            <span className="text-[14px]">☰</span>
            Alle Themen
          </Link>
        </nav>

        <div className="hidden md:flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2
              className="font-prose text-[24px] font-medium leading-tight text-[--fg] mt-1.5"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {data.topic.title}
            </h2>
            {data.topic.subtitle && (
              <p className="font-body italic text-[15px] text-[--fg-muted]">
                {data.topic.subtitle}
              </p>
            )}
            {data.topic.era && (
              <p className="font-ui text-[11px] tracking-[0.10em] uppercase text-[--fg-dim] mt-2">
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
          <p className="font-ui text-[11px] text-[--fg-faint]">
            <span className="text-[--fg-muted]">{state.thinkers.length}</span>
            {' von '}
            <span className="text-[--fg-muted]">{data.thinkers.length}</span>
            {' Denkern freigeschaltet'}
          </p>
        </div>

      </aside>

      {/* ── Main content ── */}
      <main className="main-content min-w-0">

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
                  ? 'text-[--fg] border-[--gold]'
                  : 'text-[--fg-faint] hover:text-[--fg-muted]'
                }`}
            >
              <span className={`font-display text-[10px] tracking-[0.15em] mr-0.5
                ${tab === t.id ? 'text-[--gold]' : 'text-[--fg-dim]'}`}>
                {t.numeral}
              </span>
              <span>{t.label}</span>
              {t.count !== null && (
                <span className={`font-prose italic text-[12px] tracking-normal normal-case
                  ${tab === t.id ? 'text-[--gold-soft]' : 'text-[--fg-dim]'}`}>
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
            listStyle={data.topic.thinkerListStyle}
            highlightId={highlightId}
            onHighlightDone={() => setHighlightId(null)}
          />
        )}
        {tab === 'einfluesse' && (
          <InfluenceGraph
            thinkers={state.thinkers}
            influences={state.influences}
            schools={data.schools}
            currentLevel={state.level}
            topic={data.topic}
          />
        )}
        {tab === 'quadrant' && (
          <QuadrantPlot
            concepts={state.concepts}
            totalConcepts={data.concepts.length}
            thinkers={state.thinkers}
            levelId={levelId}
            currentLevel={state.level}
            quadrants={data.topic.quadrants}
            onThinkerClick={(id) => { setTab('denker'); setHighlightId(id) }}
          />
        )}
      </main>

      {/* ── Mobile bottom bar ── */}
      <div className="bottom-tab-bar">
        <div className="slider-strip">
          <span className="font-display text-[10px] tracking-[0.14em] uppercase text-[--gold] shrink-0 w-[5.5rem]">
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
                ${tab === t.id ? 'text-[--gold]' : 'text-[--fg-dim]'}`}>
                {t.numeral}
              </span>
              <span className={`font-ui text-[10px] tracking-[0.12em] transition-colors
                ${tab === t.id ? 'text-[--fg]' : 'text-[--fg-faint]'}`}>
                {t.mobileLabel}
              </span>
              {t.count !== null && (
                <span className={`font-prose italic text-[9px] tracking-normal normal-case transition-colors
                  ${tab === t.id ? 'text-[--gold-soft]' : 'text-[--fg-dim]'}`}>
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
