import React from 'react'

/**
 * Renders text with [[annotation]] markers.
 * Level 1: annotation content shown inline as small italic parenthetical.
 * Level 2+: [[...]] blocks removed, surrounding text preserved.
 */
export function Annotated({ text, level }: { text: string; level: number }) {
  if (level > 1) {
    const stripped = text
      .replace(/\s*\[\[.*?\]\]/gs, '')
      .replace(/\s{2,}/g, ' ')
      .trim()
    return <>{stripped}</>
  }

  const parts = text.split(/(\[\[.*?\]\])/gs)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
          return (
            <span key={i} className="text-[0.88em] italic text-[--fg-dim] opacity-80">
              {part.slice(2, -2)}
            </span>
          )
        }
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}
