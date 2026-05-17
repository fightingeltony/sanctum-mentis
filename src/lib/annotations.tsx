'use client'

import React, { useState, useRef, useEffect } from 'react'

function parseAnnotation(content: string): { term: string; definition: string } {
  // 1. Split on first ' — ' if term is short enough
  const dashIdx = content.indexOf(' — ')
  if (dashIdx !== -1) {
    const candidate = content.slice(0, dashIdx).trim()
    if (candidate.split(/\s+/).length <= 6) {
      return { term: candidate, definition: content }
    }
  }

  // 2. Split on first ':' if term is short enough
  const colonIdx = content.indexOf(':')
  if (colonIdx !== -1) {
    const candidate = content.slice(0, colonIdx).trim()
    if (candidate.split(/\s+/).length <= 8) {
      return { term: candidate, definition: content }
    }
  }

  // 3. Fallback: first 4 words
  const words = content.split(/\s+/)
  return {
    term: words.slice(0, 4).join(' ') + (words.length > 4 ? ' …' : ''),
    definition: content,
  }
}

function AnnotationTooltip({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

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

  return (
    <span ref={ref} className="relative">
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
        className="cursor-help rounded-sm border-b border-dotted border-[--accent] text-[--accent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--accent]"
      >
        {term}
      </span>
      {open && (
        <span
          role="tooltip"
          className="absolute top-full left-0 z-50 mt-1 w-60 max-w-[min(240px,80vw)] rounded border border-[--hairline-strong] bg-[--bg-raised] px-3 py-2 text-[0.82em] leading-snug text-[--fg-muted] shadow-md"
        >
          {definition}
        </span>
      )}
    </span>
  )
}

export function Annotated({ text, level }: { text: string; level: number }) {
  if (level > 1) {
    const stripped = text
      .replace(/\s*\[\[.*?\]\]/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim()
    return <>{stripped}</>
  }

  const parts = text.split(/(\[\[.*?\]\])/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
          const content = part.slice(2, -2)
          const { term, definition } = parseAnnotation(content)
          return <AnnotationTooltip key={i} term={term} definition={definition} />
        }
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}
