'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import type { Lectio, LectioNarrative, TopicData } from '@/lib/types'

// --voice per Stimme (Schul-Farben aus dem Design-Handoff)
const VOICE_COLORS: Record<string, string> = {
  vedanta:     'oklch(0.48 0.13 55)',
  buddhismus:  'oklch(0.44 0.11 75)',
  jung:        'oklch(0.40 0.09 200)',
  metzinger:   'oklch(0.40 0.10 240)',
}

// Ordinalzahlen für das Stimmen-Label
const ORDINAL = ['Erste', 'Zweite', 'Dritte', 'Vierte', 'Fünfte', 'Sechste', 'Siebte', 'Achte']

const storageKey = (id: string) => `sanctum-lectio-${id}-station`

interface Props {
  lectio: Lectio
  topicData?: TopicData
}

/** Hebt den kernel-Teilstring im Absatz-HTML hervor. */
function renderWithKernel(text: string, kernel: string): React.ReactNode {
  if (!kernel || !text.includes(kernel)) return text
  const parts = text.split(kernel)
  return (
    <>
      {parts[0]}
      <em className="kernel">{kernel}</em>
      {parts.slice(1).join(kernel)}
    </>
  )
}

interface StoryParagraphProps {
  p: string
  narrative: LectioNarrative
  isHook: boolean
  isBridge: boolean
}

function StoryParagraph({ p, narrative, isHook, isBridge }: StoryParagraphProps) {
  const className = isHook ? 'hook' : isBridge ? 'bridge' : ''
  const content = (!isHook && !isBridge)
    ? renderWithKernel(p, narrative.kernel)
    : p
  return <p className={className || undefined}>{content}</p>
}

export default function LectioNarrativeViewer({ lectio, topicData }: Props) {
  // Stationen: 0 = Schwelle, 1…N = Stimmen, N+1 = Synthese
  const voiceSteps = lectio.path.filter(s => s.narrative)
  const totalStations = 1 + voiceSteps.length + 1

  const [idx, setIdx] = useState(0)
  const [active, setActive] = useState(0)
  const [revealKey, setRevealKey] = useState(0) // bump → CSS re-trigger
  const stationRefs = useRef<(HTMLElement | null)[]>([])
  const touchYRef = useRef<number | null>(null)
  const reducedMotion = useRef(false)

  // localStorage initialisieren
  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saved = parseInt(localStorage.getItem(storageKey(lectio.id)) ?? '', 10)
    if (!isNaN(saved) && saved >= 0 && saved < totalStations) {
      setIdx(saved)
      setActive(saved)
    }
  }, [totalStations, lectio.id])

  const show = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(totalStations - 1, i))
    setIdx(clamped)
    setActive(clamped)
    setRevealKey(k => k + 1)
    localStorage.setItem(storageKey(lectio.id), String(clamped))
    // scroll to top for active station
    const el = stationRefs.current[clamped]
    if (el) el.scrollTop = 0
  }, [totalStations, lectio.id])

  const next = useCallback(() => { if (idx < totalStations - 1) show(idx + 1) }, [idx, totalStations, show])
  const prev = useCallback(() => { if (idx > 0) show(idx - 1) }, [idx, show])

  // Tastatur
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); next()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault(); prev()
      } else if (e.key === 'Home') {
        show(0)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [next, prev, show])

  // Touch-Swipe
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchYRef.current = e.touches[0].clientY }
    const onEnd = (e: TouchEvent) => {
      if (touchYRef.current === null) return
      const el = stationRefs.current[idx]
      const scrollable = el ? el.scrollHeight > el.clientHeight + 6 : false
      const dy = touchYRef.current - e.changedTouches[0].clientY
      if (!scrollable && Math.abs(dy) > 48) { if (dy > 0) next(); else prev() }
      touchYRef.current = null
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [idx, next, prev])

  // Counter-Text
  const voiceIdx = idx - 1 // 0-based within voices; negative for Schwelle
  const isSchwelle = idx === 0
  const isSynthese = idx === totalStations - 1
  const isVoice = !isSchwelle && !isSynthese
  const counterNum = isSchwelle ? '·' : isSynthese ? '✦' : String(idx).padStart(2, '0')
  const counterLabel = isSchwelle
    ? 'Schwelle'
    : isSynthese
    ? 'Synthese'
    : (voiceSteps[voiceIdx] ? String(voiceSteps[voiceIdx].nodeId) : '')

  const activeVoiceColor = isVoice && voiceIdx >= 0
    ? VOICE_COLORS[String(voiceSteps[voiceIdx].nodeId)] ?? 'var(--accent)'
    : 'var(--accent)'

  // Klick auf leere Stage-Ränder → nächste Station
  const onStageClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('a, button, .story, .invite, .untertitel, .frage, .kicker')) return
    next()
  }

  // Synthesetext in Kernel-Absätze aufteilen
  const synthParagraphs = lectio.closing_synthesis.split('\n').filter(Boolean)

  return (
    <>
      {/* Grain overlay */}
      <div aria-hidden className="grain" />

      {/* Brand (oben links) */}
      <div className="brand" aria-hidden>
        <span className="glyph" />
        Sanctum Mentis · Lectio
      </div>

      {/* Counter (oben rechts) */}
      <div className="lc-counter" aria-live="polite" aria-atomic>
        <span className="num" style={{ color: activeVoiceColor }}>{counterNum}</span>
        {' '}
        <span className="lbl">{counterLabel}</span>
      </div>

      {/* Stage */}
      <div
        className="stage"
        style={{ ['--voice' as string]: activeVoiceColor }}
        onClick={onStageClick}
      >

        {/* 0 · Schwelle */}
        <section
          ref={el => { stationRefs.current[0] = el }}
          className={`station threshold${active === 0 ? ' active' : ''}`}
          aria-hidden={active !== 0}
        >
          <div className="station-inner">
            <p
              className="meta reveal"
              style={{ ['--d' as string]: '.1s' }}
              key={`meta-${revealKey}`}
            >
              {lectio.tableauId === 'das-selbst' ? 'Die Landkarte des Selbst' : lectio.title}
              {' · '}{voiceSteps.length} Stimmen{' · '}~{lectio.estimated_minutes} Min
            </p>
            <h1
              className="frage serif reveal"
              style={{ ['--d' as string]: '.3s' }}
              key={`frage-${revealKey}`}
            >
              {lectio.title}
            </h1>
            <p
              className="untertitel reveal"
              style={{ ['--d' as string]: '.6s' }}
              key={`ut-${revealKey}`}
            >
              Eine Lectio durch {voiceSteps.length} Stimmen — langsam zu lesen.
            </p>
            <div
              className="invite reveal"
              style={{ ['--d' as string]: '.9s' }}
              key={`inv-${revealKey}`}
            >
              {lectio.intro.split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <button
              className="enter reveal"
              style={{ ['--d' as string]: '1.3s' }}
              key={`btn-${revealKey}`}
              onClick={e => { e.stopPropagation(); next() }}
            >
              <span className="label">Eintreten</span>
              <span className="dot breath" aria-hidden />
            </button>
          </div>
        </section>

        {/* 1…N · Stimmen */}
        {voiceSteps.map((step, vi) => {
          const stationIdx = vi + 1
          const nodeId = Array.isArray(step.nodeId) ? step.nodeId[0] : step.nodeId
          const voiceColor = VOICE_COLORS[nodeId] ?? 'var(--accent)'
          const narrative = step.narrative!
          const isActive = active === stationIdx
          const ordinal = ORDINAL[vi] ?? `${vi + 1}.`

          // Denker-Name aus topicData; Fallback: nodeId kapitalisiert
          const thinkerMatch = topicData?.thinkers.find(t => t.id === nodeId)
          const schoolMatch = !thinkerMatch ? topicData?.schools.find(s => s.id === nodeId) : undefined
          const displayName = thinkerMatch?.name ?? schoolMatch?.label
            ?? (nodeId.charAt(0).toUpperCase() + nodeId.slice(1).replace(/-/g, ' '))

          return (
            <section
              key={nodeId}
              ref={el => { stationRefs.current[stationIdx] = el }}
              className={`station voice${isActive ? ' active' : ''}`}
              style={{ ['--voice' as string]: voiceColor }}
              aria-hidden={!isActive}
            >
              <div className="station-inner">
                <p
                  className="v-eyebrow reveal"
                  style={{ ['--d' as string]: '.1s' }}
                  key={`vey-${stationIdx}-${revealKey}`}
                >
                  {ordinal} Stimme · {displayName}
                </p>
                <div
                  className="niche-wrap reveal"
                  style={{ ['--d' as string]: '.3s' }}
                  key={`nw-${stationIdx}-${revealKey}`}
                >
                  <div className="halo" aria-hidden />
                  <div className="niche">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/lectio-images/lectio-${nodeId}.webp`}
                      alt=""
                      className="niche-img"
                    />
                  </div>
                </div>
                <h2
                  className="v-name serif reveal"
                  style={{ ['--d' as string]: '.5s' }}
                  key={`vn-${stationIdx}-${revealKey}`}
                >
                  {displayName}
                </h2>
                <div
                  className="story reveal"
                  style={{ ['--d' as string]: '.75s' }}
                  key={`vs-${stationIdx}-${revealKey}`}
                >
                  <p className="hook">{narrative.hook}</p>
                  {narrative.body.map((p, i) => (
                    <StoryParagraph
                      key={i}
                      p={p}
                      narrative={narrative}
                      isHook={false}
                      isBridge={false}
                    />
                  ))}
                  <p className="bridge">{narrative.bridge}</p>
                </div>
              </div>
            </section>
          )
        })}

        {/* Synthese */}
        <section
          ref={el => { stationRefs.current[totalStations - 1] = el }}
          className={`station synth${active === totalStations - 1 ? ' active' : ''}`}
          aria-hidden={active !== totalStations - 1}
        >
          <div className="station-inner">
            <p
              className="eyebrow reveal"
              style={{ ['--d' as string]: '.1s' }}
              key={`sey-${revealKey}`}
            >
              Nach den vier Stimmen
            </p>
            <div
              className="story reveal"
              style={{ ['--d' as string]: '.4s' }}
              key={`ss-${revealKey}`}
            >
              {synthParagraphs.map((p, i) => {
                const isLast = i === synthParagraphs.length - 1
                if (isLast) {
                  return (
                    <p key={i}>
                      {renderWithKernel(p, 'Das ist deine eigene Antwort, die du längst hattest, bevor die Frage gestellt wurde.')}
                    </p>
                  )
                }
                return <p key={i} className={i === 0 ? 'hook' : undefined}>{p}</p>
              })}
            </div>
            <p
              className="kicker serif reveal"
              style={{ ['--d' as string]: '.9s' }}
              key={`sk-${revealKey}`}
            >
              {/* closing_question mit <em> um den letzten Teil */}
              {lectio.closing_question.includes('Oder ')
                ? <>
                    {lectio.closing_question.split('Oder ')[0]}Oder{' '}
                    <em>{lectio.closing_question.split('Oder ')[1]}</em>
                  </>
                : lectio.closing_question
              }
            </p>
            <div
              className="synth-actions reveal"
              style={{ ['--d' as string]: '1.4s' }}
              key={`sa-${revealKey}`}
            >
              <button
                className="btn"
                onClick={e => { e.stopPropagation(); show(0) }}
              >
                ◦ Von vorn
              </button>
              <Link
                href={`/thema/${lectio.tableauId}`}
                className="btn solid"
                onClick={e => e.stopPropagation()}
              >
                Zur Landkarte →
              </Link>
            </div>
          </div>
        </section>

      </div>{/* /stage */}

      {/* Fuß: weiter + Dots */}
      <div className="lc-foot">
        <button
          className={`weiter${idx === totalStations - 1 ? ' hide' : ''}`}
          onClick={e => { e.stopPropagation(); next() }}
          aria-label="Nächste Station"
        >
          <span>weiter</span>
          <span className="arr" aria-hidden>↓</span>
        </button>
        <div className="dots" role="tablist" aria-label="Stationen">
          {Array.from({ length: totalStations }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Station ${i + 1}`}
              onClick={e => { e.stopPropagation(); show(i) }}
            >
              <span className="mark" />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ── Layout-Tokens — erben vom Shell-Theme ── */
        :global(body) { overflow: hidden; }

        .grain {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          opacity: 0.05; mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .brand {
          position: fixed; top: 26px; left: 30px; z-index: 6;
          font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase;
          color: var(--fg-faint); display: flex; align-items: center; gap: 9px;
        }
        .glyph {
          width: 7px; height: 7px; border: 1px solid var(--accent);
          transform: rotate(45deg); opacity: 0.8; display: inline-block;
        }
        .lc-counter {
          position: fixed; top: 26px; right: 30px; z-index: 6;
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--fg-faint); display: flex; align-items: baseline; gap: 10px;
        }
        .lc-counter .num { font-weight: 600; transition: color .6s; }

        .stage {
          position: fixed; inset: 0; z-index: 1;
          background: radial-gradient(120% 100% at 50% 34%, var(--bg) 0%, var(--bg) 44%, var(--bg-deep) 100%);
        }
        .station {
          position: absolute; inset: 0;
          display: flex; overflow-y: auto; overflow-x: hidden;
          opacity: 0; visibility: hidden;
          transition: opacity .7s ease; scrollbar-width: none;
        }
        .station::-webkit-scrollbar { width: 0; height: 0; }
        .station.active { opacity: 1; visibility: visible; }
        .station-inner {
          margin: auto; width: 100%;
          padding: 92px 32px 150px; text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }

        /* staggered reveal */
        .reveal { opacity: 0; transform: translateY(16px); }
        .station.active .reveal {
          opacity: 1; transform: none;
          transition: opacity 1.15s cubic-bezier(0.2,0.7,0.2,1),
                      transform 1.15s cubic-bezier(0.2,0.7,0.2,1);
          transition-delay: var(--d, 0s);
        }

        .eyebrow, .meta {
          font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--voice); margin: 0 0 26px; transition: color .6s;
        }
        .meta { color: var(--fg-faint); letter-spacing: 0.24em; }

        /* Schwelle */
        .frage {
          font-family: var(--font-display), 'Marcellus SC', serif;
          font-size: clamp(30px, 4.4vw, 56px); line-height: 1.16;
          color: var(--fg); margin: 0; max-width: 18ch;
        }
        .untertitel {
          font-style: italic; font-size: clamp(14px, 1.45vw, 17px);
          color: var(--fg-faint); margin: 24px 0 0; max-width: 48ch; line-height: 1.55;
        }
        .invite { max-width: 50ch; margin: 34px auto 0; }
        .invite p {
          font-size: clamp(15px, 1.55vw, 17.5px); line-height: 1.74;
          color: var(--fg-muted); margin: 0 0 1em;
        }
        .enter {
          margin-top: 40px; display: inline-flex; flex-direction: column;
          align-items: center; gap: 12px;
          background: none; border: none; cursor: pointer;
          color: var(--fg-muted); font-family: inherit; padding: 8px 14px;
        }
        .enter .label {
          font-size: 11px; letter-spacing: 0.26em; text-transform: uppercase;
          transition: color .3s;
        }
        .enter:hover .label { color: var(--voice); }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--voice); }
        .breath { animation: breathe 4.6s ease-in-out infinite; }

        /* Stimme */
        .v-eyebrow {
          font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--voice); margin: 0 0 22px; transition: color .6s;
        }
        .niche-wrap { position: relative; margin: 0 0 22px; }
        .niche {
          position: relative; z-index: 2;
          width: 116px; height: 146px;
          border-radius: 58px 58px 7px 7px; overflow: hidden;
          box-shadow: 0 1px 0 oklch(1 0 0 / 0.5) inset, 0 14px 30px -18px oklch(0.24 0.02 65 / 0.5);
        }
        .niche::after {
          content: ''; position: absolute; inset: 0; z-index: 3; pointer-events: none;
          border-radius: inherit; box-shadow: 0 0 0 1px var(--voice) inset; opacity: 0.3;
        }
        .niche-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .halo {
          position: absolute; z-index: 1; left: 50%; top: 50%;
          width: 220px; height: 220px; transform: translate(-50%,-50%);
          border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, color-mix(in oklch, var(--voice) 16%, transparent) 0%, transparent 64%);
          animation: halo 6.5s ease-in-out infinite;
        }
        .v-name {
          font-family: var(--font-display), 'Marcellus SC', serif;
          font-size: clamp(24px, 2.8vw, 34px); letter-spacing: 0.02em;
          color: var(--fg); margin: 0 0 30px; font-weight: 400;
        }

        /* Story */
        .story { max-width: 42ch; margin: 0 auto; text-align: left; }
        .story p {
          font-size: clamp(16px, 1.65vw, 18px); line-height: 1.78;
          color: var(--fg-muted); margin: 0 0 1.05em;
        }
        .story p.hook { color: var(--fg); }
        .story p.bridge {
          font-style: italic; color: var(--fg-faint);
          font-size: clamp(15px, 1.5vw, 16.5px); margin-top: 1.3em;
        }
        .story :global(em.kernel) {
          font-style: normal; font-weight: 500; color: var(--voice); transition: color .6s;
        }

        /* Synthese */
        .kicker {
          font-family: var(--font-display), 'Marcellus SC', serif;
          font-size: clamp(22px, 2.7vw, 33px); line-height: 1.4; color: var(--fg);
          margin: 36px auto 0; max-width: 22ch; letter-spacing: 0.008em; text-align: center;
        }
        .kicker em { font-style: normal; color: var(--accent); }
        .synth-actions {
          display: flex; gap: 14px; margin-top: 48px;
          flex-wrap: wrap; justify-content: center;
        }
        .btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 22px; font-size: 11px;
          letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; cursor: pointer;
          border: 1px solid var(--hairline-strong); color: var(--fg-muted); background: none;
          transition: border-color .25s, color .25s, background .25s;
        }
        .btn:hover { border-color: var(--accent); color: var(--accent); }
        .btn.solid { border-color: var(--accent); color: var(--paper); background: var(--accent); }
        .btn.solid:hover {
          background: oklch(0.36 0.12 295); border-color: oklch(0.36 0.12 295); color: var(--paper);
        }

        /* Fuß */
        .lc-foot {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 6;
          padding: 52px 0 26px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          pointer-events: none;
          background: linear-gradient(to top,
            var(--bg-deep) 38%,
            color-mix(in oklch, var(--bg-deep) 55%, transparent) 70%,
            transparent);
        }
        .weiter {
          pointer-events: auto; background: none; border: none; cursor: pointer;
          display: inline-flex; flex-direction: column; align-items: center; gap: 7px;
          color: var(--fg-dim); font-family: inherit;
          font-size: 9.5px; letter-spacing: 0.26em; text-transform: uppercase;
          transition: color .3s, opacity .4s;
        }
        .weiter:hover { color: var(--voice); }
        .arr { animation: nudge 3.6s ease-in-out infinite; }
        .weiter.hide { opacity: 0; pointer-events: none; }

        .dots { pointer-events: auto; display: flex; align-items: center; gap: 12px; }
        .dots button {
          width: 8px; height: 8px; padding: 0; border: none; background: none;
          cursor: pointer; display: grid; place-items: center;
        }
        .mark {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--hairline-strong);
          transition: background .35s, width .35s, border-radius .35s;
          display: block;
        }
        .dots button[aria-selected="true"] .mark {
          background: var(--voice); width: 18px; border-radius: 3px;
        }
        .dots button:hover .mark { background: var(--fg-faint); }

        @keyframes breathe { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes halo {
          0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(0.92); }
          50%      { opacity: 0.9; transform: translate(-50%,-50%) scale(1.06); }
        }
        @keyframes nudge {
          0%,100% { transform: translateY(0); opacity: .65; }
          50%      { transform: translateY(4px); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .station.active .reveal { transition: none; opacity: 1; transform: none; }
          .halo, .breath, .arr { animation: none; }
          .station { transition: none; }
        }
        @media (max-width: 640px) {
          .niche { width: 104px; height: 132px; border-radius: 52px 52px 6px 6px; }
          .station-inner { padding: 82px 22px 148px; }
        }
      `}</style>
    </>
  )
}
