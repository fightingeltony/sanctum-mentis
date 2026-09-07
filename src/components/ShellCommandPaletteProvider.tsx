'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false })

interface PaletteCtx {
  openPalette: () => void
}

const Ctx = createContext<PaletteCtx | null>(null)

/** Use this in any client component to programmatically open the global palette */
export function useCommandPalette(): PaletteCtx | null {
  return useContext(Ctx)
}

export default function ShellCommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen]           = useState(false)
  const [everOpened, setEverOpened] = useState(false)

  // Fokus-Rückweg: den Öffner merken, bevor das Suchfeld per autoFocus den Fokus nimmt
  const openerRef = useRef<HTMLElement | null>(null)
  const rememberOpener = () => { openerRef.current = document.activeElement as HTMLElement | null }

  const openPalette  = useCallback(() => { rememberOpener(); setOpen(true); setEverOpened(true) }, [])
  const closePalette = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (open) return
    const opener = openerRef.current
    openerRef.current = null
    if (opener && opener.isConnected && opener !== document.body) opener.focus({ preventScroll: true })
  }, [open])

  /* Global Cmd+K / Ctrl+K shortcut */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        rememberOpener()
        setOpen(prev => {
          if (!prev) setEverOpened(true)
          return !prev
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Ctx.Provider value={{ openPalette }}>
      {children}
      {everOpened && (
        <CommandPalette open={open} onClose={closePalette} />
      )}
    </Ctx.Provider>
  )
}
