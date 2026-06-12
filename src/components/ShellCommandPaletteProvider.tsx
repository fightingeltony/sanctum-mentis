'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
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

  const openPalette  = useCallback(() => { setOpen(true); setEverOpened(true) }, [])
  const closePalette = useCallback(() => setOpen(false), [])

  /* Global Cmd+K / Ctrl+K shortcut */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
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
