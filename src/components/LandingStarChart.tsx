'use client'

// LandingStarChart — selbstspielende Sternkarte für die Landing-Page.
// Daten kommen als Server-Prop; data.ts ist server-only.

import {
  useState, useEffect, useRef, useMemo, useCallback,
} from 'react'
import { computeLevelState } from '@/lib/complexityEngine'
import StarChart from '@/components/StarChart'
import type { TopicData, Level } from '@/lib/types'

// ─── Props ───────────────────────────────────────────────────────────────────

interface Props {
  data: TopicData
}

// ─── Tour state ──────────────────────────────────────────────────────────────

interface TourHandle {
  cancel: boolean
  timers: Set<ReturnType<typeof setTimeout>>
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function LandingStarChart({ data }: Props) {
  // ── Level state ───────────────────────────────────────────────────────────
  const [levelId, setLevelId] = useState(1)
  const state = useMemo(
    () => computeLevelState(data, levelId),
    [data, levelId],
  )

  // ── Tour control refs ─────────────────────────────────────────────────────
  const wrapRef     = useRef<HTMLDivElement>(null)
  const cursorRef   = useRef<HTMLDivElement>(null)
  const captionRef  = useRef<HTMLDivElement>(null)
  const tourRef     = useRef<TourHandle>({ cancel: true, timers: new Set() })
  const runTourRef  = useRef<() => void>(() => {}) // stable ref so the loop can self-schedule
  const [tourRunning,  setTourRunning]  = useState(false)
  const [tourDone,     setTourDone]     = useState(false)
  const userPausedRef = useRef(false)

  // ── Reduced-motion detection ──────────────────────────────────────────────
  const prefersReducedMotion = useRef(false)
  // useState(false) avoids SSR/client hydration mismatch; set once after mount
  const [rmq, setRmq] = useState(false)
  useEffect(() => {
    const matches = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    prefersReducedMotion.current = matches
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRmq(matches) // Client-only init: reads matchMedia unavailable during SSR
  }, [])

  // ── Tour helpers ──────────────────────────────────────────────────────────

  // tWait is NOT a useCallback — it's defined locally inside runTour
  // so it can close over the local handle `h` instead of tourRef.current.

  const cancelTour = useCallback(() => {
    tourRef.current.cancel = true
    tourRef.current.timers.forEach(id => clearTimeout(id))
    tourRef.current.timers.clear()
    setTourRunning(false)
    // Hide cursor & caption
    if (cursorRef.current)  { cursorRef.current.style.opacity  = '0' }
    if (captionRef.current) { captionRef.current.style.opacity = '0' }
  }, [])

  // Fix #2: Play button gets data-lsc-play so handleUserInteract can skip it
  // Move fake cursor to element's centre, relative to wrapRef
  const moveCursorTo = useCallback((el: Element | null) => {
    if (!el || !cursorRef.current || !wrapRef.current) return
    const eRect = el.getBoundingClientRect()
    const wRect = wrapRef.current.getBoundingClientRect()
    cursorRef.current.style.left = `${eRect.left + eRect.width  / 2 - wRect.left}px`
    cursorRef.current.style.top  = `${eRect.top  + eRect.height / 2 - wRect.top }px`
    cursorRef.current.style.opacity = '0.92'
  }, [])

  // Tap animation — remove/re-add class to re-trigger
  const tap = useCallback(() => {
    const c = cursorRef.current
    if (!c) return
    c.classList.remove('lsc-cursor-tap')
    void c.offsetWidth // force reflow
    c.classList.add('lsc-cursor-tap')
  }, [])

  const say = useCallback((txt: string) => {
    if (!captionRef.current || !wrapRef.current) return
    captionRef.current.textContent = txt
    // Fix #3: position caption over the stage, not below it
    const stageEl = wrapRef.current.querySelector('[data-sc-stage]')
    if (stageEl) {
      const stageRect = stageEl.getBoundingClientRect()
      const wrapRect  = wrapRef.current.getBoundingClientRect()
      // 48px ≈ caption pill height + 14px gap
      const topPx = stageRect.bottom - wrapRect.top - 48
      captionRef.current.style.top    = `${topPx}px`
      captionRef.current.style.bottom = ''
    }
    captionRef.current.style.opacity = '1'
    captionRef.current.style.transform = 'translateX(-50%)'
  }, [])

  const hideSay = useCallback(() => {
    if (!captionRef.current) return
    captionRef.current.style.opacity = '0'
  }, [])

  const hideCursor = useCallback(() => {
    if (cursorRef.current) cursorRef.current.style.opacity = '0'
  }, [])

  // Dispatch a trusted-less click on an element — works on SVG <g> too
  const dispatch = useCallback((el: Element | null) => {
    if (!el) return
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
  }, [])

  // Selector helper against wrapRef
  const qs = useCallback((sel: string): Element | null => {
    return wrapRef.current?.querySelector(sel) ?? null
  }, [])

  // ── Main tour ─────────────────────────────────────────────────────────────

  const runTour = useCallback(async () => {
    if (prefersReducedMotion.current) { setLevelId(4); return }
    if (!wrapRef.current) return

    // Fix #1: Generation-token pattern — each invocation owns its LOCAL handle.
    // Cancel any previous tour first, then install the new handle.
    cancelTour()
    const h: TourHandle = { cancel: false, timers: new Set() }
    tourRef.current = h

    // tWait closes over h — never touches tourRef.current
    const tWait = (ms: number): Promise<void> =>
      new Promise(res => {
        const id = setTimeout(() => { h.timers.delete(id); res() }, ms)
        h.timers.add(id)
      })

    // Guard: bail if THIS handle was cancelled OR superseded
    const g = () => { if (h.cancel || tourRef.current !== h) throw 'x' }

    setTourRunning(true)
    setTourDone(false)

    // Fix #5: derive max level from data instead of hardcoding 5
    const RN = ['I', 'II', 'III', 'IV', 'V']
    const maxL = data.levels.length || 5

    try {
      // 0 · Reset
      const closeEl = qs('[data-sc-close]')
      if (closeEl) dispatch(closeEl)
      const axisBtn = qs('[data-sc-mode="axis"]')
      if (axisBtn) dispatch(axisBtn)
      setLevelId(1)
      await tWait(700); g()

      // 1 · Level-Stufen aufziehen (L1→maxL)
      for (let n = 1; n <= maxL; n++) {
        setLevelId(n)
        const lvl: Level | undefined = data.levels.find(l => l.id === n)
        const shortName = lvl ? lvl.label : `Level ${n}`
        say(`Stufe ${RN[n - 1] ?? String(n)} · ${shortName} — der Inhalt wächst mit`)
        await tWait(n === 1 ? 900 : 1050); g()
      }
      await tWait(550); g()

      // 2 · Denker antippen (vedanta)
      say('Tippe einen Denker')
      const starEl = qs('[data-star-id="vedanta"]')
      moveCursorTo(starEl)
      await tWait(700); g()
      tap(); await tWait(260)
      dispatch(starEl)
      await tWait(1500); g()

      // 3 · Cartouche scrollen
      say('Seine Position, in deiner Tiefe')
      const scrollEl = qs('[data-sc-cart-scroll]') as HTMLElement | null
      if (scrollEl) {
        const behavior = prefersReducedMotion.current ? 'auto' : 'smooth'
        scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior })
      }
      await tWait(1500); g()

      // 4 · Akkordeon aufklappen
      say('Konzepte sind beim Denker verankert')
      const accHead = qs('[data-sc-acc-head]')
      moveCursorTo(accHead)
      await tWait(650); g()
      tap(); await tWait(240)
      dispatch(accHead)
      await tWait(2100); g()

      // 5 · Schliessen + Schulen-Modus
      say('Zurück — und in den Schulen-Modus')
      const closeBtn = qs('[data-sc-close]')
      moveCursorTo(closeBtn)
      await tWait(600); g()
      tap(); await tWait(240)
      dispatch(closeBtn)
      await tWait(450); g()

      const schoolBtn = qs('[data-sc-mode="school"]')
      moveCursorTo(schoolBtn)
      await tWait(600); g()
      tap(); await tWait(240)
      dispatch(schoolBtn)
      await tWait(2100); g()

      // 6 · Zurück auf L1
      hideCursor()
      say('… und wieder zurück zum Einstieg')
      for (let n = maxL; n >= 1; n--) {
        setLevelId(n)
        await tWait(680); g()
      }
      await tWait(700); g()
      dispatch(qs('[data-sc-mode="axis"]'))
      await tWait(1700); g()
      hideSay()
      await tWait(400)

    } catch {
      // Fix #1: if this handle was cancelled or superseded, do nothing at all
      return
    }

    // Fix #1: only act if this invocation is still the current, uncancelled one
    if (tourRef.current === h && !h.cancel) {
      setTourRunning(false)
      setTourDone(true)
      if (!userPausedRef.current) {
        // Loop — use runTourRef to avoid the forward-reference lint error
        const loopId = setTimeout(() => runTourRef.current(), 600)
        h.timers.add(loopId)
      }
    }
  }, [data, cancelTour, moveCursorTo, tap, say, hideSay, hideCursor, dispatch, qs])

  // Keep the ref in sync after each render so the loop setTimeout always calls the latest version
  useEffect(() => {
    runTourRef.current = runTour
  })

  // ── User-interaction pause ────────────────────────────────────────────────
  const handleUserInteract = useCallback((e: Event) => {
    // Only react to trusted events (our dispatched clicks are not trusted)
    if (!(e as MouseEvent).isTrusted) return
    // Fix #2: skip events originating from the play/pause button itself
    if ((e.target as Element | null)?.closest('[data-lsc-play]')) return
    if (tourRef.current.cancel) return // already stopped
    cancelTour()
    userPausedRef.current = true
  }, [cancelTour])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    wrap.addEventListener('pointerdown', handleUserInteract, { capture: true })
    wrap.addEventListener('wheel',       handleUserInteract, { capture: true })
    wrap.addEventListener('keydown',     handleUserInteract, { capture: true })
    return () => {
      wrap.removeEventListener('pointerdown', handleUserInteract, { capture: true })
      wrap.removeEventListener('wheel',       handleUserInteract, { capture: true })
      wrap.removeEventListener('keydown',     handleUserInteract, { capture: true })
    }
  }, [handleUserInteract])

  // ── IntersectionObserver — start/stop tour on visibility ─────────────────
  useEffect(() => {
    if (prefersReducedMotion.current) {
      setLevelId(4)
      return
    }

    let wasVisible = false

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (!wasVisible && !userPausedRef.current) {
            wasVisible = true
            runTour()
          }
        } else {
          if (wasVisible) {
            wasVisible = false
            // Left viewport mid-tour — cancel, restart when back (unless user paused)
            if (!userPausedRef.current) {
              cancelTour()
            }
          }
        }
      },
      { threshold: 0.35 },
    )

    const el = wrapRef.current
    if (el) observer.observe(el)

    return () => {
      observer.disconnect()
      cancelTour()
    }
  }, [data, runTour, cancelTour])

  // ── Play button handler ───────────────────────────────────────────────────
  // Fix #2: read from ref, not React state — avoids stale-closure race
  const handlePlayPause = useCallback(() => {
    if (!tourRef.current.cancel) {
      // Tour is currently running — pause it
      cancelTour()
      userPausedRef.current = true
    } else {
      // Tour is stopped — (re)start it
      userPausedRef.current = false
      runTour()
    }
  }, [cancelTour, runTour])

  // ── Slider fill style (matches TopicViewer pattern) ──────────────────────
  const maxLevel  = data?.levels.length ?? 5
  const fillPct   = maxLevel > 1 ? ((levelId - 1) / (maxLevel - 1)) * 100 : 0
  const currentLevel: Level | undefined = data?.levels.find(l => l.id === levelId)
  const levelLabel = currentLevel
    ? `${currentLevel.short} · ${currentLevel.label}`
    : `L${levelId}`

  // ── Play button label ─────────────────────────────────────────────────────
  const playLabel = tourRunning
    ? 'Tour läuft'
    : tourDone
      ? 'Nochmal abspielen'
      : 'Tour abspielen'

  if (!state) {
    return (
      <div style={{ padding: '24px 0', color: 'var(--fg-dim)', fontStyle: 'italic', fontSize: 13 }}>
        Lade…
      </div>
    )
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      {/* ── Echte StarChart ── */}
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

      {/* ── Steuerzeile: Slider + Level-Name + Play-Button ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 2px 4px', flexWrap: 'wrap',
      }}>
        {/* Level-Name */}
        <span style={{
          fontSize: 11, letterSpacing: '0.14em', color: 'var(--fg-muted)',
          whiteSpace: 'nowrap', minWidth: '6.5rem',
          fontFamily: 'var(--font-ui), Inter, system-ui, sans-serif',
        }}>
          {levelLabel}
        </span>

        {/* Slider */}
        <input
          type="range"
          className="slider"
          min={1}
          max={maxLevel}
          step={1}
          value={levelId}
          style={{ '--slider-fill': `${fillPct}%` } as React.CSSProperties}
          onChange={e => {
            setLevelId(Number(e.target.value))
          }}
          aria-label="Komplexitäts-Level"
        />

        {/* Play/Pause Button — ausgeblendet bei reduced-motion */}
        {!rmq && (
          <button
            data-lsc-play
            onClick={handlePlayPause}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '7px 14px',
              border: `1px solid ${tourRunning ? 'color-mix(in oklch, var(--accent) 45%, transparent)' : 'var(--hairline-strong)'}`,
              background: 'var(--bg-raised)',
              color: tourRunning ? 'var(--accent)' : 'var(--fg-muted)',
              fontSize: 11, letterSpacing: '0.12em',
              cursor: 'pointer',
              transition: 'color 200ms, border-color 200ms',
              fontFamily: 'var(--font-ui), Inter, system-ui, sans-serif',
              whiteSpace: 'nowrap',
            }}
            aria-label={playLabel}
          >
            <span style={{ fontSize: tourRunning ? 9 : 10 }} aria-hidden>
              {tourRunning ? '❚❚' : '▶'}
            </span>
            {playLabel}
          </button>
        )}
      </div>

      {/* ── Caption overlay — absolut unten-mittig über der Stage ── */}
      {/* Fix #3: top is set dynamically by say() against [data-sc-stage] bounds */}
      <div
        ref={captionRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0, // overwritten by say() on each call
          transform: 'translateX(-50%) translateY(6px)',
          zIndex: 9,
          pointerEvents: 'none',
          background: 'oklch(0.22 0.02 65 / 0.92)',
          color: 'oklch(0.95 0.01 85)',
          fontSize: 12.5,
          letterSpacing: '0.01em',
          padding: '8px 16px',
          borderRadius: '100px',
          opacity: 0,
          transition: 'opacity 350ms cubic-bezier(0.22, 1, 0.36, 1), transform 350ms cubic-bezier(0.22, 1, 0.36, 1)',
          maxWidth: '80%',
          textAlign: 'center',
          // kein nowrap — auf Mobile darf die Pille mehrzeilig umbrechen
          overflowWrap: 'break-word',
          fontFamily: 'var(--font-ui), Inter, system-ui, sans-serif',
        }}
      />

      {/* ── Fake cursor — Pergament-Ring-Optik ── */}
      {!rmq && (
        <div
          ref={cursorRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 22,
            height: 22,
            marginLeft: -11,
            marginTop: -11,
            border: '2px solid var(--accent)',
            borderRadius: '50%',
            background: 'color-mix(in oklch, var(--accent) 20%, transparent)',
            zIndex: 30,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'left 500ms cubic-bezier(0.22, 1, 0.36, 1), top 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms',
            boxShadow: '0 1px 6px oklch(0.2 0.02 65 / 0.4)',
          }}
        />
      )}
    </div>
  )
}
