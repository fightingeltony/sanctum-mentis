'use client'

import { useCommandPalette } from './ShellCommandPaletteProvider'

/** Search icon for the shell header — opens the global CommandPalette */
export default function HeaderSearchButton() {
  const palette = useCommandPalette()

  return (
    <button
      onClick={() => palette?.openPalette()}
      className="flex items-center gap-2 font-ui text-[11px] tracking-[0.16em] uppercase
        text-[--fg-muted] hover:text-[--fg] transition-colors"
      aria-label="Suche öffnen (Cmd+K)"
      title="Cmd+K"
    >
      <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6.5" cy="6.5" r="4.5" />
        <line x1="10.5" y1="10.5" x2="13.5" y2="13.5" />
      </svg>
      <span className="hidden sm:inline">Suche</span>
    </button>
  )
}
