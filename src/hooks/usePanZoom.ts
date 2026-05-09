'use client'

import { useCallback, useEffect, useRef } from 'react'

interface PanZoom { tx: number; ty: number; scale: number }

interface Options {
  minScale?: number
  maxScale?: number
}

export interface PanZoomHandle {
  containerRef: React.RefObject<HTMLDivElement | null>
  wrapperRef:   React.RefObject<HTMLDivElement | null>
  /** True while pointer is being dragged — check before handling click/tap on children */
  suppressClick: React.MutableRefObject<boolean>
  reset:   () => void
  zoomIn:  () => void
  zoomOut: () => void
  /** Spread onto the container div */
  handlers: {
    onPointerDown:   (e: React.PointerEvent) => void
    onPointerMove:   (e: React.PointerEvent) => void
    onPointerUp:     (e: React.PointerEvent) => void
    onPointerCancel: (e: React.PointerEvent) => void
  }
}

export function usePanZoom(svgW: number, svgH: number, opts: Options = {}): PanZoomHandle {
  const { minScale = 0.25, maxScale = 5 } = opts

  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef   = useRef<HTMLDivElement>(null)
  const suppressClick = useRef(false)

  // Live transform state — kept in a ref so event handlers don't need stale closures
  const pz = useRef<PanZoom>({ tx: 0, ty: 0, scale: 1 })

  // ── DOM helpers ────────────────────────────────────────────────────────────

  function applyDom({ tx, ty, scale }: PanZoom) {
    pz.current = { tx, ty, scale }
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`
    }
  }

  function clamp(tx: number, ty: number, scale: number): PanZoom {
    const el = containerRef.current
    if (!el) return { tx, ty, scale }
    const { width, height } = el.getBoundingClientRect()
    const s  = Math.min(Math.max(scale, minScale), maxScale)
    const pad = 80 // minimum px of map that must stay visible
    return {
      tx:    Math.min(Math.max(tx,  pad - svgW * s),  width  - pad),
      ty:    Math.min(Math.max(ty,  pad - svgH * s),  height - pad),
      scale: s,
    }
  }

  // ── Fit to container (initial + reset) ───────────────────────────────────

  const fitToContainer = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    if (!width || !height) return
    const s  = Math.min(width / svgW, height / svgH)
    const tx = (width  - svgW * s) / 2
    const ty = (height - svgH * s) / 2
    applyDom({ tx, ty, scale: s })
  }, [svgW, svgH]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fitToContainer()
    const ro = new ResizeObserver(fitToContainer)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [fitToContainer])

  // ── Wheel (must be non-passive to preventDefault) ─────────────────────────

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const rect = containerRef.current!.getBoundingClientRect()
      const mx   = e.clientX - rect.left
      const my   = e.clientY - rect.top
      const { tx, ty, scale } = pz.current
      const factor    = e.deltaY < 0 ? 1.12 : 0.88
      const newScale  = Math.min(Math.max(scale * factor, minScale), maxScale)
      const newTx     = mx - (mx - tx) * (newScale / scale)
      const newTy     = my - (my - ty) * (newScale / scale)
      applyDom(clamp(newTx, newTy, newScale))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [minScale, maxScale]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Pointer tracking ──────────────────────────────────────────────────────

  const ptrs       = useRef(new Map<number, { x: number; y: number }>())
  const dragStart  = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const pinchState = useRef({ dist: 0, mx: 0, my: 0 })
  const didMove    = useRef(false)
  const lastTap    = useRef(0)

  function clientToContainer(e: React.PointerEvent) {
    const r = containerRef.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  function onPointerDown(e: React.PointerEvent) {
    // Capture is deferred until actual movement starts — see onPointerMove.
    // Capturing immediately would redirect the browser's `click` event to the
    // container div, preventing child SVG elements' onClick from firing.
    const pos = clientToContainer(e)
    ptrs.current.set(e.pointerId, pos)
    didMove.current = false

    if (ptrs.current.size === 1) {
      dragStart.current = { x: pos.x, y: pos.y, tx: pz.current.tx, ty: pz.current.ty }
    }
    if (ptrs.current.size === 2) {
      const [a, b] = [...ptrs.current.values()]
      pinchState.current = {
        dist: Math.hypot(b.x - a.x, b.y - a.y),
        mx:   (a.x + b.x) / 2,
        my:   (a.y + b.y) / 2,
      }
    }
    // cursor is set to 'grabbing' only once actual drag movement is detected (see onPointerMove)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!ptrs.current.has(e.pointerId)) return
    const pos = clientToContainer(e)
    ptrs.current.set(e.pointerId, pos)

    const { tx, ty, scale } = pz.current

    if (ptrs.current.size === 1) {
      const dx = pos.x - dragStart.current.x
      const dy = pos.y - dragStart.current.y
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        if (!didMove.current) {
          // Capture pointer only once we're sure it's a drag, not a tap.
          containerRef.current?.setPointerCapture(e.pointerId)
          if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
        }
        didMove.current = true
      }
      if (!didMove.current) return
      applyDom(clamp(dragStart.current.tx + dx, dragStart.current.ty + dy, scale))

    } else if (ptrs.current.size === 2) {
      if (!didMove.current) containerRef.current?.setPointerCapture(e.pointerId)
      didMove.current = true
      const [a, b] = [...ptrs.current.values()]
      const dist = Math.hypot(b.x - a.x, b.y - a.y)
      const mx   = (a.x + b.x) / 2
      const my   = (a.y + b.y) / 2

      const factor   = dist / pinchState.current.dist
      const newScale = Math.min(Math.max(scale * factor, minScale), maxScale)
      // Zoom towards pinch midpoint + pan by midpoint delta
      const newTx    = mx - (pinchState.current.mx - tx) * (newScale / scale) - (pinchState.current.mx - mx)
      const newTy    = my - (pinchState.current.my - ty) * (newScale / scale) - (pinchState.current.my - my)

      applyDom(clamp(newTx, newTy, newScale))
      pinchState.current = { dist, mx, my }
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    const wasSingleTap = ptrs.current.size === 1 && !didMove.current
    ptrs.current.delete(e.pointerId)

    if (ptrs.current.size === 0) {
      if (containerRef.current) containerRef.current.style.cursor = 'grab'
    }

    // Clamp after drag ends
    applyDom(clamp(pz.current.tx, pz.current.ty, pz.current.scale))

    if (didMove.current) {
      suppressClick.current = true
      // Let the browser's click event fire, then clear the flag
      setTimeout(() => { suppressClick.current = false }, 0)
    }

    // Double-tap to zoom in / reset
    if (wasSingleTap) {
      const now = Date.now()
      if (now - lastTap.current < 320) {
        lastTap.current = 0
        const pos = clientToContainer(e)
        const { tx, ty, scale } = pz.current
        if (scale > 1.1) {
          fitToContainer()
        } else {
          const newScale = Math.min(2.5, maxScale)
          const newTx    = pos.x - (pos.x - tx) * (newScale / scale)
          const newTy    = pos.y - (pos.y - ty) * (newScale / scale)
          applyDom(clamp(newTx, newTy, newScale))
        }
        suppressClick.current = true
        setTimeout(() => { suppressClick.current = false }, 0)
      } else {
        lastTap.current = now
      }
    }
  }

  // ── Zoom controls ─────────────────────────────────────────────────────────

  function zoomAt(factor: number) {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const { tx, ty, scale } = pz.current
    const cx = width / 2, cy = height / 2
    const ns = Math.min(Math.max(scale * factor, minScale), maxScale)
    applyDom(clamp(cx - (cx - tx) * (ns / scale), cy - (cy - ty) * (ns / scale), ns))
  }

  return {
    containerRef,
    wrapperRef,
    suppressClick,
    reset:   fitToContainer,
    zoomIn:  () => zoomAt(1.5),
    zoomOut: () => zoomAt(1 / 1.5),
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
  }
}
