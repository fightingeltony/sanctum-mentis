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
  suppressClick: React.MutableRefObject<boolean>
  reset:   () => void
  zoomIn:  () => void
  zoomOut: () => void
  handlers: {
    onPointerDown:   (e: React.PointerEvent) => void
    onPointerMove:   (e: React.PointerEvent) => void
    onPointerUp:     (e: React.PointerEvent) => void
    onPointerCancel: (e: React.PointerEvent) => void
  }
}

export function usePanZoom(svgW: number, svgH: number, opts: Options = {}): PanZoomHandle {
  const { minScale = 0.25, maxScale = 5 } = opts

  const containerRef  = useRef<HTMLDivElement>(null)
  const wrapperRef    = useRef<HTMLDivElement>(null)
  const suppressClick = useRef(false)

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
    const s   = Math.min(Math.max(scale, minScale), maxScale)
    const pad = 80
    return {
      tx:    Math.min(Math.max(tx,  pad - svgW * s),  width  - pad),
      ty:    Math.min(Math.max(ty,  pad - svgH * s),  height - pad),
      scale: s,
    }
  }

  // ── Fit to container ──────────────────────────────────────────────────────

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
    if (containerRef.current) containerRef.current.style.touchAction = 'none'
    fitToContainer()
    const ro = new ResizeObserver(fitToContainer)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [fitToContainer])

  // ── Wheel ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const rect = containerRef.current!.getBoundingClientRect()
      const mx   = e.clientX - rect.left
      const my   = e.clientY - rect.top
      const { tx, ty, scale } = pz.current
      const factor   = e.deltaY < 0 ? 1.12 : 0.88
      const newScale = Math.min(Math.max(scale * factor, minScale), maxScale)
      applyDom(clamp(mx - (mx - tx) * (newScale / scale), my - (my - ty) * (newScale / scale), newScale))
    }
    // Prevent iOS from stealing multi-touch before pointer events fire,
    // which would trigger pointercancel on the first finger and cause a jump.
    function onTouchStart(e: TouchEvent) {
      if (e.touches.length > 1) e.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
    }
  }, [minScale, maxScale]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Pointer tracking ──────────────────────────────────────────────────────

  const ptrs      = useRef(new Map<number, { x: number; y: number }>())
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  // Pinch start state — absolute, never updated mid-gesture.
  // Each frame computes directly from here to avoid floating-point drift.
  const pinchStart = useRef({ dist: 0, mx: 0, my: 0, tx: 0, ty: 0, scale: 1 })
  const didMove   = useRef(false)
  const lastTap   = useRef(0)

  function clientToContainer(e: React.PointerEvent) {
    const r = containerRef.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  function onPointerDown(e: React.PointerEvent) {
    const pos = clientToContainer(e)
    ptrs.current.set(e.pointerId, pos)
    didMove.current = false

    if (ptrs.current.size === 1) {
      dragStart.current = { x: pos.x, y: pos.y, tx: pz.current.tx, ty: pz.current.ty }
    }
    if (ptrs.current.size === 2) {
      const [a, b] = [...ptrs.current.values()]
      const { tx, ty, scale } = pz.current
      pinchStart.current = {
        dist:  Math.hypot(b.x - a.x, b.y - a.y),
        mx:    (a.x + b.x) / 2,
        my:    (a.y + b.y) / 2,
        tx, ty, scale,
      }
      // Capture immediately so the browser stops treating this as a page gesture.
      containerRef.current?.setPointerCapture(e.pointerId)
    }
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
          containerRef.current?.setPointerCapture(e.pointerId)
          if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
        }
        didMove.current = true
      }
      if (!didMove.current) return
      applyDom(clamp(dragStart.current.tx + dx, dragStart.current.ty + dy, scale))

    } else if (ptrs.current.size === 2) {
      didMove.current = true
      const [a, b] = [...ptrs.current.values()]
      const dist   = Math.hypot(b.x - a.x, b.y - a.y)
      const mx     = (a.x + b.x) / 2
      const my     = (a.y + b.y) / 2

      // Absolute computation from pinch-start state — no frame-to-frame
      // accumulation, no floating-point drift.
      const { dist: d0, mx: mx0, my: my0, tx: tx0, ty: ty0, scale: s0 } = pinchStart.current
      const factor   = dist / d0
      const newScale = Math.min(Math.max(s0 * factor, minScale), maxScale)
      const newTx    = mx - (mx0 - tx0) * factor
      const newTy    = my - (my0 - ty0) * factor

      applyDom(clamp(newTx, newTy, newScale))
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    const wasSingleTap = ptrs.current.size === 1 && !didMove.current
    ptrs.current.delete(e.pointerId)

    // 2→1 transition: reinitialize single-pan from the remaining finger's
    // current position. Without this, dragStart still points to where the
    // first finger was at gesture start → wrong dx/dy → jump.
    if (ptrs.current.size === 1) {
      const [remaining] = [...ptrs.current.values()]
      dragStart.current = { x: remaining.x, y: remaining.y, tx: pz.current.tx, ty: pz.current.ty }
      didMove.current = false
    }

    if (ptrs.current.size === 0) {
      if (containerRef.current) containerRef.current.style.cursor = 'grab'
    }

    applyDom(clamp(pz.current.tx, pz.current.ty, pz.current.scale))

    if (didMove.current) {
      suppressClick.current = true
      setTimeout(() => { suppressClick.current = false }, 0)
    }

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
          applyDom(clamp(pos.x - (pos.x - tx) * (newScale / scale), pos.y - (pos.y - ty) * (newScale / scale), newScale))
        }
        suppressClick.current = true
        setTimeout(() => { suppressClick.current = false }, 0)
      } else {
        lastTap.current = now
      }
    }
  }

  // When iOS cancels a pointer (e.g. after stealing the gesture despite our
  // preventions), reinitialize cleanly for the remaining finger.
  function onPointerCancel(e: React.PointerEvent) {
    ptrs.current.delete(e.pointerId)
    if (ptrs.current.size === 1) {
      const [remaining] = [...ptrs.current.values()]
      dragStart.current = { x: remaining.x, y: remaining.y, tx: pz.current.tx, ty: pz.current.ty }
      didMove.current = false
    }
    if (ptrs.current.size === 0) {
      if (containerRef.current) containerRef.current.style.cursor = 'grab'
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
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel },
  }
}
