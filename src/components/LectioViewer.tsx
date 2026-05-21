'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { Lectio, LectioStep, TopicData } from '@/lib/types'
import { getLectioNodeText } from '@/lib/lectioEngine'
import { Annotated } from '@/lib/annotations'

interface Props {
  lectio: Lectio
  topicData: TopicData
}

export default function LectioViewer({ lectio, topicData }: Props) {
  const [revealed, setRevealed] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  // Smooth-scroll to newly revealed element after React has updated the DOM
  useEffect(() => {
    if (revealed === 0) return
    const el = stepRefs.current[revealed - 1]
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.25
    window.scrollTo({ top, behavior: 'smooth' })
  }, [revealed])

  function advance() {
    setRevealed(r => r + 1)
  }

  const { path } = lectio
  const isClosingVisible = revealed > path.length

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[680px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        {/* ── Back link ── */}
        <Link
          href={`/thema/${lectio.tableauId}`}
          className="inline-flex items-center gap-2 font-ui text-[12px] tracking-[0.06em]
            text-[--fg-faint] hover:text-[--fg-muted] transition-colors no-underline mb-10"
        >
          <span style={{ color: 'var(--accent)' }}>←</span>
          {topicData.topic.title}
        </Link>

        {/* ── Header ── */}
        <header className="mb-10">
          <h1
            className="font-display text-[28px] sm:text-[34px] tracking-[0.05em] leading-tight mb-3"
            style={{ color: 'var(--accent)' }}
          >
            {lectio.title}
          </h1>

          <p className="font-body italic text-[15px] text-[--fg-muted] mb-6">
            {lectio.focus}
          </p>

          <blockquote
            className="font-body text-[16px] leading-relaxed text-[--fg-muted] my-6 pl-4"
            style={{ borderLeft: '2px solid var(--accent)' }}
          >
            {lectio.thesis}
          </blockquote>

          <p className="font-ui text-[12px] tracking-[0.04em] text-[--fg-faint] mb-8">
            {topicData.topic.title}
            <span className="mx-2" style={{ color: 'var(--accent)' }}>·</span>
            {path.length} Stationen
            <span className="mx-2" style={{ color: 'var(--accent)' }}>·</span>
            ~{lectio.estimated_minutes} Min
          </p>

          {/* Intro — Lectio-Stimme */}
          <LectioVoice text={lectio.intro} />
        </header>

        {/* ── First threshold ── */}
        {revealed === 0 && (
          <Threshold label="Erste Station öffnen" onAdvance={advance} isFirst />
        )}

        {/* ── Stations ── */}
        {path.map((step, i) => {
          if (revealed <= i) return null
          const nodeIds = Array.isArray(step.nodeId) ? step.nodeId : [step.nodeId]
          const isFrontier = revealed === i + 1
          const isLastStep = i === path.length - 1

          return (
            <div
              key={i}
              ref={el => { stepRefs.current[i] = el }}
              className="lectio-step-enter"
            >
              {/* Station header */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="font-display text-[11px] tracking-[0.12em]"
                  style={{ color: 'var(--accent)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[--fg-faint]" aria-hidden>·</span>
                <span className="font-body text-[13px] tracking-[0.02em] text-[--fg-muted]">
                  {nodeIds.map(id => getNodeName(id, step.nodeType, topicData)).join(' & ')}
                </span>
              </div>

              {/* Node block(s) */}
              <div className="mb-5">
                {nodeIds.map((nodeId, j) => (
                  <React.Fragment key={nodeId}>
                    {j > 0 && (
                      <div
                        className="my-4 h-px"
                        style={{ background: 'var(--hairline)' }}
                      />
                    )}
                    <div
                      className="rounded px-5 py-4"
                      style={{ background: 'var(--bg-raised)', border: '1px solid var(--hairline)' }}
                    >
                      <NodeTextBlock
                        nodeId={nodeId}
                        nodeType={step.nodeType}
                        topicData={topicData}
                        lectioLevel={lectio.level}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Transition text — Lectio-Stimme */}
              <LectioVoice text={step.transition} className="mb-2" />

              {/* Threshold — only at frontier */}
              {isFrontier && (
                <Threshold
                  label={isLastStep ? "Den Bogen schließen" : "Bereit für den nächsten Gedanken?"}
                  onAdvance={advance}
                />
              )}
            </div>
          )
        })}

        {/* ── Closing ── */}
        {isClosingVisible && (
          <div
            ref={el => { stepRefs.current[path.length] = el }}
            className="lectio-step-enter"
          >
            {/* Closing divider */}
            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-px" style={{ background: 'var(--hairline)' }} />
              <span
                className="font-display text-[13px] tracking-[0.2em]"
                style={{ color: 'var(--accent)' }}
              >
                ✦
              </span>
              <div className="flex-1 h-px" style={{ background: 'var(--hairline)' }} />
            </div>

            {/* Closing synthesis */}
            <LectioVoice text={lectio.closing_synthesis} className="mb-10" />

            {/* Closing question */}
            <div className="my-10">
              <p
                className="font-body italic text-[18px] sm:text-[20px] leading-relaxed"
                style={{ color: 'var(--accent)' }}
              >
                {lectio.closing_question}
              </p>
            </div>

            {/* Return link */}
            <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--hairline)' }}>
              <Link
                href={`/thema/${lectio.tableauId}`}
                className="font-ui text-[13px] tracking-[0.04em] no-underline
                  transition-colors"
                style={{ color: 'var(--fg-muted)' }}
              >
                Zurück zur Karte
                <span className="mx-2 text-[--fg-faint]">·</span>
                <span style={{ color: 'var(--accent)' }}>{topicData.topic.title}</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

// ── Sub-components ───────────────────────────────────────────

function LectioVoice({ text, className = '' }: { text: string; className?: string }) {
  return (
    <p
      className={`font-body italic text-[16px] leading-relaxed ${className}`}
      style={{ color: 'var(--accent)' }}
    >
      {text}
    </p>
  )
}

function NodeTextBlock({
  nodeId,
  nodeType,
  topicData,
  lectioLevel,
}: {
  nodeId: string
  nodeType: LectioStep['nodeType']
  topicData: TopicData
  lectioLevel: number
}) {
  if (nodeType === 'school') {
    const school = topicData.schools.find(s => s.id === nodeId)
    if (!school) return <NodeFallback />
    return (
      <p className="font-body text-[15px] leading-relaxed text-[--fg]">
        {school.lectio_brief ?? school.motto ?? school.label}
      </p>
    )
  }

  const node = nodeType === 'thinker'
    ? topicData.thinkers.find(t => t.id === nodeId)
    : topicData.concepts.find(c => c.id === nodeId)

  if (!node) return <NodeFallback />

  const result = getLectioNodeText(node, lectioLevel)
  if (!result) return <NodeFallback />

  return (
    <p className="font-body text-[15px] leading-relaxed text-[--fg]">
      {result.isLectioBrief
        ? result.text
        : <Annotated text={result.text} level={lectioLevel} />
      }
    </p>
  )
}

function NodeFallback() {
  return (
    <p className="font-body text-[14px] text-[--fg-faint] italic">
      [Knoten nicht verfügbar]
    </p>
  )
}

function Threshold({
  label,
  onAdvance,
  isFirst = false,
}: {
  label: string
  onAdvance: () => void
  isFirst?: boolean
}) {
  return (
    <div className={`${isFirst ? 'mt-2' : 'mt-12'} mb-8`}>
      {/* Divider with glyph */}
      <div className="relative flex items-center mb-8">
        <div className="flex-1 h-px" style={{ background: 'var(--hairline)' }} />
        <span
          className="mx-4 font-display text-[18px] select-none"
          style={{ color: 'var(--accent)', opacity: 0.5 }}
          aria-hidden
        >
          ·
        </span>
        <div className="flex-1 h-px" style={{ background: 'var(--hairline)' }} />
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={onAdvance}
          className="font-ui text-[13px] tracking-[0.04em] px-6 py-3
            border transition-colors min-h-[44px] focus-visible:outline-none
            focus-visible:ring-2"
          style={{
            color: 'var(--accent)',
            borderColor: 'var(--accent)',
            background: 'transparent',
            outlineColor: 'var(--accent)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-soft)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
          }}
        >
          {label}
        </button>
      </div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────

function getNodeName(
  nodeId: string,
  nodeType: LectioStep['nodeType'],
  topicData: TopicData,
): string {
  if (nodeType === 'thinker') return topicData.thinkers.find(t => t.id === nodeId)?.name ?? nodeId
  if (nodeType === 'concept') return topicData.concepts.find(c => c.id === nodeId)?.name ?? nodeId
  if (nodeType === 'school')  return topicData.schools.find(s => s.id === nodeId)?.label ?? nodeId
  return nodeId
}
