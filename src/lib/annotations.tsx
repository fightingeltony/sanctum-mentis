'use client'

import React, { useState, useRef, useEffect } from 'react'

function tryInlineSplit(content: string): { term: string; definition: string } | null {
  // Colon first — explicit [[term:definition]] format; em-dash may appear inside the definition
  const colonIdx = content.indexOf(':')
  if (colonIdx !== -1) {
    const candidate = content.slice(0, colonIdx).trim()
    if (candidate.split(/\s+/).length <= 8) {
      return { term: candidate, definition: content.slice(colonIdx + 1).trim() }
    }
  }
  // Em-dash fallback — for annotations without a colon separator
  const dashIdx = content.indexOf(' — ')
  if (dashIdx !== -1) {
    const candidate = content.slice(0, dashIdx).trim()
    if (candidate.split(/\s+/).length <= 6) {
      return { term: candidate, definition: content.slice(dashIdx + 3).trim() }
    }
  }
  return null
}

function AnnotationTooltip({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = useState(false)
  const [nudge, setNudge] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [open])

  // Nudge tooltip back into viewport if it overflows left or right edge
  useEffect(() => {
    if (!open || !tooltipRef.current) return
    const MARGIN = 8
    const rect = tooltipRef.current.getBoundingClientRect()
    if (rect.right > window.innerWidth - MARGIN) {
      setNudge(-(rect.right - window.innerWidth + MARGIN))
    } else if (rect.left < MARGIN) {
      setNudge(MARGIN - rect.left)
    } else {
      setNudge(0)
    }
  }, [open])

  return (
    <span ref={ref} className="relative inline-block">
      <span
        role="button"
        tabIndex={0}
        onClick={e => { e.stopPropagation(); setOpen(v => !v) }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(v => !v)
          }
        }}
        className="cursor-help rounded-sm border-b border-dotted focus-visible:outline-none focus-visible:ring-1"
        style={{ color: 'var(--accent)', borderBottomColor: 'var(--accent)', outlineColor: 'var(--accent)' }}
      >
        {term}
      </span>
      {open && (
        <span
          ref={tooltipRef}
          role="tooltip"
          className="absolute top-full left-0 z-50 mt-1 w-60 max-w-[min(240px,80vw)] rounded px-3 py-2 text-[0.82em] leading-snug shadow-lg"
          style={{
            background: 'oklch(0.26 0.020 65)',
            color: 'oklch(0.92 0.015 80)',
            border: '1px solid oklch(0.35 0.020 65)',
            transform: nudge !== 0 ? `translateX(${nudge}px)` : undefined,
          }}
        >
          {definition}
        </span>
      )}
    </span>
  )
}

function renderItalic(text: string, keyPrefix: string): React.ReactNode[] {
  const segments = text.split(/(\*[^*]+\*)/g)
  return segments.map((seg, i) => {
    if (seg.startsWith('*') && seg.endsWith('*') && seg.length > 2) {
      return <em key={`${keyPrefix}-em-${i}`}>{seg.slice(1, -1)}</em>
    }
    return seg
  })
}

export function Annotated({ text, level: _level }: { text: string; level: number }) {
  const parts = text.split(/(\[\[.*?\]\])/g)
  const nodes: React.ReactNode[] = []

  parts.forEach((part, i) => {
    if (!part.startsWith('[[') || !part.endsWith(']]')) {
      nodes.push(...renderItalic(part, String(i)))
      return
    }

    const content = part.slice(2, -2)

    // Format A: [[term: definition]] or [[term — definition]] — term inside brackets
    const split = tryInlineSplit(content)
    if (split) {
      nodes.push(<AnnotationTooltip key={i} term={split.term} definition={split.definition} />)
      return
    }

    // Format B: term [[definition]] — term is the last word before [[]] in the text
    const prev = nodes[nodes.length - 1]
    if (typeof prev === 'string' && prev.trim().length > 0) {
      const trimmed = prev.trimEnd()
      const lastSpace = trimmed.lastIndexOf(' ')
      const rawTerm = lastSpace === -1 ? trimmed : trimmed.slice(lastSpace + 1)
      // Strip leading punctuation (e.g. "(" from "(Atman")
      const term = rawTerm.replace(/^[^\p{L}]+/u, '')
      const leadingPunct = rawTerm.slice(0, rawTerm.length - term.length)
      const before = (lastSpace === -1 ? '' : trimmed.slice(0, lastSpace + 1)) + leadingPunct
      nodes[nodes.length - 1] = before
      nodes.push(<AnnotationTooltip key={i} term={term} definition={content} />)
    } else {
      nodes.push(<AnnotationTooltip key={i} term={content.split(/\s+/)[0]} definition={content} />)
    }
  })

  return <>{nodes}</>
}
