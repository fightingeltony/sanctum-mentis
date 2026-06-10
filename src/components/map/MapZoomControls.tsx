interface Props {
  onZoomIn:  () => void
  onZoomOut: () => void
  onReset:   () => void
}

export function MapZoomControls({ onZoomIn, onZoomOut, onReset }: Props) {
  const btn = `
    flex items-center justify-center w-9 h-9
    bg-[var(--bg-raised)] border border-[var(--hairline)]
    text-[var(--fg-muted)] active:text-[var(--fg)]
    transition-colors select-none touch-manipulation
    font-ui text-base leading-none
  `
  return (
    <div className="absolute top-3 right-3 flex flex-col gap-1 z-[2000]" onPointerDown={e => e.stopPropagation()}>
      <button className={btn} onClick={onZoomIn}  aria-label="Vergrößern">+</button>
      <button className={btn} onClick={onZoomOut} aria-label="Verkleinern">−</button>
      <button className={btn} onClick={onReset}   aria-label="Zurücksetzen"
        style={{ fontSize: '10px', letterSpacing: '0.05em' }}>
        ⊙
      </button>
    </div>
  )
}
