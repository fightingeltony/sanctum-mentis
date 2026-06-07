'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import type { Thinker, Influence, School, Quadrants, Level } from '@/lib/types'
import { Annotated } from '@/lib/annotations'

// ─── Constants — Desktop ──────────────────────────────────────
const W = 980, H = 760, PAD_X = 200, PAD_Y = 80
const mapX = (x: number) => PAD_X + (x / 100) * (W - 2 * PAD_X)
const mapY = (y: number) => H - PAD_Y - (y / 100) * (H - 2 * PAD_Y)

// ─── Constants — Mobile (portrait) ───────────────────────────
const MW = 640, MH = 884, MPAD_X = 64, MPAD_Y = 128
const mMapX = (x: number) => MPAD_X + (x / 100) * (MW - 2 * MPAD_X)
const mMapY = (y: number) => MH - MPAD_Y - (y / 100) * (MH - 2 * MPAD_Y)

const LINE_COLOR: Record<string, string> = {
  influence:    'var(--line-influence)',
  'student-of': 'var(--line-influence)',
  parallel:     'var(--line-parallel)',
  critique:     'var(--line-critique)',
  rejection:    'var(--line-rejection)',
}
// Resolved values for SVG attributes (CSS vars don't work in stroke attribute in some browsers)
const LINE_COLOR_RESOLVED: Record<string, string> = {
  influence:    'oklch(0.30 0.03 65)',
  'student-of': 'oklch(0.30 0.03 65)',
  parallel:     'oklch(0.42 0.05 235)',
  critique:     'oklch(0.46 0.10 45)',
  rejection:    'oklch(0.47 0.14 30)',
}
const DASH: Record<string, string | undefined> = {
  influence: undefined, 'student-of': undefined,
  parallel: '1 3.5', critique: '6 3', rejection: '2 3.5',
}

const RKEY = 'sanctum-stern-read'

// ─── Helpers ──────────────────────────────────────────────────

function spikePath(cx: number, cy: number, R: number): string {
  const i = R * 0.2
  return `M ${cx} ${cy - R} L ${cx + i} ${cy - i} L ${cx + R} ${cy} L ${cx + i} ${cy + i} L ${cx} ${cy + R} L ${cx - i} ${cy + i} L ${cx - R} ${cy} L ${cx - i} ${cy - i} Z`
}

function wrapLabel(str: string, max: number): string[] {
  const words = str.split(' ')
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w }
    else cur = (cur + ' ' + w).trim()
  }
  if (cur) lines.push(cur)
  return lines
}

type Pos = { x: number; y: number }

// Desktop: adaptive ellipse, scales with school count
function computeSchoolLayout(thinkers: Thinker[]): {
  present: string[]
  centers: Record<string, Pos>
  layout:  Record<string, Pos>
} {
  const present: string[] = []
  thinkers.forEach(t => { if (!present.includes(t.schoolId)) present.push(t.schoolId) })
  const ccx = W / 2, ccy = H / 2 - 6
  const n = present.length
  const RX = Math.max(210, Math.min(410, 156 + 18.75 * n))
  const RY = Math.max(180, Math.min(300, 157 + 10.6  * n))
  const centers: Record<string, Pos> = {}
  const layout:  Record<string, Pos> = {}
  present.forEach((sid, i) => {
    const ang = (-90 + i * (360 / present.length)) * Math.PI / 180
    centers[sid] = { x: ccx + Math.cos(ang) * RX, y: ccy + Math.sin(ang) * RY }
  })
  present.forEach(sid => {
    const members = thinkers.filter(t => t.schoolId === sid)
    const c = centers[sid]
    if (members.length === 1) {
      layout[members[0].id] = { x: c.x, y: c.y }
    } else {
      const rr = 22 + members.length * 7
      members.forEach((m, j) => {
        const a = (-90 + j * (360 / members.length)) * Math.PI / 180
        layout[m.id] = { x: c.x + Math.cos(a) * rr, y: c.y + Math.sin(a) * rr }
      })
    }
  })
  return { present, centers, layout }
}

// Mobile: 2-column grid — robust on narrow portrait screens
function computeMobileSchoolLayout(thinkers: Thinker[]): {
  present: string[]
  centers: Record<string, Pos & { col: number }>
  layout:  Record<string, Pos>
} {
  const present: string[] = []
  thinkers.forEach(t => { if (!present.includes(t.schoolId)) present.push(t.schoolId) })
  const COLS = 2
  const rows  = Math.ceil(present.length / COLS)
  const gMX = 34, gTop = 70, gBot = MH - 44
  const colW = (MW - 2 * gMX) / COLS
  const rowH = (gBot - gTop) / rows
  const centers: Record<string, Pos & { col: number }> = {}
  const layout:  Record<string, Pos> = {}
  present.forEach((sid, i) => {
    const c = i % COLS, r = Math.floor(i / COLS)
    centers[sid] = { x: gMX + colW * (c + 0.5), y: gTop + rowH * (r + 0.5), col: c }
  })
  present.forEach(sid => {
    const members = thinkers.filter(t => t.schoolId === sid)
    const c = centers[sid]
    if (members.length === 1) {
      layout[members[0].id] = { x: c.x, y: c.y }
    } else {
      const rr = 18 + members.length * 6
      members.forEach((m, j) => {
        const a = (-90 + j * (360 / members.length)) * Math.PI / 180
        layout[m.id] = { x: c.x + Math.cos(a) * rr, y: c.y + Math.sin(a) * rr }
      })
    }
  })
  return { present, centers, layout }
}

// Content key: which version to show at this level; drives read-state tracking
function contentKeyFor(t: Thinker, levelId: number): string {
  const vk = Object.keys(t.versions).map(Number).sort((a, b) => a - b)
  const deeper = vk.filter(k => k <= levelId && k > t.firstLevel)
  if (deeper.length) return String(deeper[deeper.length - 1])
  if (t.lectio_brief) return 'brief'
  const le = vk.filter(k => k <= levelId)
  if (le.length) return String(le[le.length - 1])
  return vk.length ? String(vk[0]) : 'x'
}

function contentFor(t: Thinker, levelId: number): string {
  const k = contentKeyFor(t, levelId)
  if (k === 'brief') return t.lectio_brief ?? ''
  return t.versions[Number(k)] ?? t.lectio_brief ?? ''
}

// ─── Types ────────────────────────────────────────────────────

type ThinkerWithDesc = Thinker & { description: string }
type InfluenceWithDesc = Influence & { description: string }

interface EdgeRefs {
  g:    SVGGElement | null
  line: SVGPathElement | null
  hit:  SVGPathElement | null
  brk:  [SVGLineElement | null, SVGLineElement | null]
}

interface Props {
  thinkers:    ThinkerWithDesc[]
  influences:  InfluenceWithDesc[]
  allThinkers: Thinker[]
  schools:     School[]
  levelId:     number
  levels:      Level[]
  quadrants:   Quadrants
}

// ─── Component ────────────────────────────────────────────────

export default function StarChart({
  thinkers, influences, allThinkers, schools, levelId, levels, quadrants,
}: Props) {

  const [mode,      setMode]      = useState<'axis' | 'school'>('axis')
  const [showLines, setShowLines] = useState(true)
  const [selected,  setSelected]  = useState<string | null>(null)
  const [readSet,   setReadSet]   = useState<Set<string>>(new Set())
  const [isMobile,  setIsMobile]  = useState(false)

  // ── Refs ──────────────────────────────────────────────────
  const svgRef      = useRef<SVGSVGElement | null>(null)
  const stageRef    = useRef<HTMLDivElement | null>(null)
  const cameraRef   = useRef<HTMLDivElement | null>(null)
  const starGRefs   = useRef<Record<string, SVGGElement | null>>({})
  const edgeRefs    = useRef<Record<string, EdgeRefs>>({})
  const posRef      = useRef<Record<string, Pos>>({})
  const drawnPosRef = useRef<Record<string, Pos>>({})
  const morphRafRef = useRef<number | null>(null)
  const modeRef     = useRef<'axis' | 'school'>('axis')
  const selectedRef = useRef<string | null>(null)
  const panRef    = useRef({ scale: 1, tx: 0, ty: 0 })
  const ptrsRef   = useRef(new Map<number, Pos>())
  const dragRef   = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null)
  const pinchRef  = useRef<{ dist: number; mx: number; my: number; tx: number; ty: number; scale: number } | null>(null)
  const didMoveRef = useRef(false)
  const suppressClickRef = useRef(false)
  const deselectRef = useRef<() => void>(() => {})

  // ── isMobile detection ────────────────────────────────────
  useEffect(() => {
    const mq = matchMedia('(max-width: 640px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ── Derived data ──────────────────────────────────────────

  const schoolLayout = useMemo(() => computeSchoolLayout(allThinkers), [allThinkers])
  const mobileSchoolLayout = useMemo(() => computeMobileSchoolLayout(allThinkers), [allThinkers])
  const activeSchoolLayout = useMemo(
    () => isMobile ? mobileSchoolLayout : schoolLayout,
    [isMobile, mobileSchoolLayout, schoolLayout],
  )

  const thinkerById = useMemo(() => {
    const m: Record<string, ThinkerWithDesc> = {}
    thinkers.forEach(t => { m[t.id] = t })
    return m
  }, [thinkers])

  const schoolById = useMemo(() => {
    const m: Record<string, School> = {}
    schools.forEach(s => { m[s.id] = s })
    return m
  }, [schools])

  const adjacency = useMemo(() => {
    const adj: Record<string, Array<{
      edgeId:  string
      otherId: string
      dir:     'in' | 'out'
      edge:    InfluenceWithDesc
    }>> = {}
    thinkers.forEach(t => { adj[t.id] = [] })
    influences.forEach(inf => {
      const eid = `${inf.from}→${inf.to}`
      adj[inf.from]?.push({ edgeId: eid, otherId: inf.to,   dir: 'out', edge: inf })
      adj[inf.to]  ?.push({ edgeId: eid, otherId: inf.from, dir: 'in',  edge: inf })
    })
    return adj
  }, [thinkers, influences])

  const visibleSchoolIds = useMemo(
    () => new Set(thinkers.map(t => t.schoolId)),
    [thinkers],
  )

  // ── Load read set ─────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(RKEY) || '[]') as string[]
      setReadSet(new Set(saved))
    } catch { /* storage unavailable */ }
  }, [])

  // ── Imperative: update star transforms ───────────────────
  const updateStarTransforms = useCallback(() => {
    thinkers.forEach(t => {
      const g = starGRefs.current[t.id]
      if (!g) return
      const drawn = drawnPosRef.current[t.id]
      const cur   = posRef.current[t.id]
      if (!drawn || !cur) return
      const dx = cur.x - drawn.x, dy = cur.y - drawn.y
      if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
        g.removeAttribute('transform')
      } else {
        g.setAttribute('transform', `translate(${dx.toFixed(2)},${dy.toFixed(2)})`)
      }
    })
  }, [thinkers])

  // ── Imperative: redraw edge Bézier paths ─────────────────
  const renderEdges = useCallback(() => {
    influences.forEach(inf => {
      const eid  = `${inf.from}→${inf.to}`
      const refs = edgeRefs.current[eid]
      if (!refs) return
      const A = posRef.current[inf.from]
      const B = posRef.current[inf.to]
      if (!A || !B) return
      const x1 = A.x, y1 = A.y, x2 = B.x, y2 = B.y
      const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1
      const ux = dx / len, uy = dy / len, px = -uy, py = ux
      const bow = Math.max(9, Math.min(56, len * 0.14))
      const cxp = (x1 + x2) / 2 + px * bow
      const cyp = (y1 + y2) / 2 + py * bow
      const d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cxp.toFixed(1)} ${cyp.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
      refs.line?.setAttribute('d', d)
      refs.hit ?.setAttribute('d', d)
      if (inf.type === 'rejection' && refs.brk[0] && refs.brk[1]) {
        const mx  = 0.25 * x1 + 0.5 * cxp + 0.25 * x2
        const my  = 0.25 * y1 + 0.5 * cyp + 0.25 * y2
        const off = 2.4, half = 4.5
        ;[-off, off].forEach((o, i) => {
          const brk = refs.brk[i]!
          brk.setAttribute('x1', (mx + ux * o + px * half).toFixed(1))
          brk.setAttribute('y1', (my + uy * o + py * half).toFixed(1))
          brk.setAttribute('x2', (mx + ux * o - px * half).toFixed(1))
          brk.setAttribute('y2', (my + uy * o - py * half).toFixed(1))
        })
      }
    })
  }, [influences])

  // ── Snap positions to target without animation ────────────
  const syncPositions = useCallback(() => {
    thinkers.forEach(t => {
      const drawn = drawnPosRef.current[t.id]
      if (!drawn) return
      const target = modeRef.current === 'school'
        ? (activeSchoolLayout.layout[t.id] ?? drawn)
        : drawn
      posRef.current[t.id] = { ...target }
    })
    updateStarTransforms()
    renderEdges()
  }, [thinkers, activeSchoolLayout, updateStarTransforms, renderEdges])

  // ── Apply label side (axis: x>55→left; school: outward) ──
  const applyLabelSides = useCallback((m: 'axis' | 'school') => {
    thinkers.forEach(t => {
      const g = starGRefs.current[t.id]
      if (!g) return
      let side: 'left' | 'right'
      if (m === 'school') {
        const c = activeSchoolLayout.centers[t.schoolId] as Pos & { col?: number }
        if (isMobile) {
          // Grid: left column → left side, right column → right side
          side = c && c.x < MW / 2 ? 'left' : 'right'
        } else {
          const lay = activeSchoolLayout.layout[t.id]
          side = lay && c && lay.x < c.x - 0.5 ? 'left' : 'right'
        }
      } else {
        side = (t.x !== undefined && t.x > 55) ? 'left' : 'right'
      }
      const drawnCx = drawnPosRef.current[t.id]?.x ?? 0
      const R   = isMobile
        ? 12 - (t.firstLevel - 1) * 1.1
        : 7.4 - (t.firstLevel - 1) * 0.7
      const off = isMobile ? 8 : 6
      const ldx = side === 'left' ? -(R + off) : (R + off)
      const anc = side === 'left' ? 'end' : 'start'
      const name = g.querySelector<SVGTextElement>('.sc-sname')
      const life = g.querySelector<SVGTextElement>('.sc-slife')
      if (name) { name.setAttribute('x', String(drawnCx + ldx)); name.setAttribute('text-anchor', anc) }
      if (life) { life.setAttribute('x', String(drawnCx + ldx)); life.setAttribute('text-anchor', anc) }
    })
  }, [thinkers, activeSchoolLayout, isMobile])

  // ── Update drawnPos when thinkers/level/isMobile change ──
  useEffect(() => {
    const newDrawn: Record<string, Pos> = {}
    thinkers.forEach(t => {
      if (t.x !== undefined && t.y !== undefined) {
        newDrawn[t.id] = {
          x: isMobile ? mMapX(t.x) : mapX(t.x),
          y: isMobile ? mMapY(t.y) : mapY(t.y),
        }
      }
    })
    drawnPosRef.current = newDrawn
    syncPositions()
    applyLabelSides(modeRef.current)
    thinkers.forEach(t => {
      const g = starGRefs.current[t.id]
      if (g) {
        const k = `${t.id}:${contentKeyFor(t, levelId)}`
        g.classList.toggle('sc-unread', !readSet.has(k))
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thinkers, levelId, isMobile])

  // ── Update unread state when readSet changes ──────────────
  useEffect(() => {
    thinkers.forEach(t => {
      const g = starGRefs.current[t.id]
      if (!g) return
      const k = `${t.id}:${contentKeyFor(t, levelId)}`
      g.classList.toggle('sc-unread', !readSet.has(k))
    })
  }, [readSet, levelId, thinkers])

  // ── Reset pan/zoom on breakpoint change ───────────────────
  useEffect(() => {
    if (morphRafRef.current) cancelAnimationFrame(morphRafRef.current)
    panRef.current = { scale: 1, tx: 0, ty: 0 }
    const camera = cameraRef.current
    if (camera) { camera.style.transform = 'translate(0px,0px) scale(1)' }
  }, [isMobile])

  // ── Morph animation ───────────────────────────────────────
  const morph = useCallback((to: 'axis' | 'school') => {
    if (to === modeRef.current) return
    modeRef.current = to
    setMode(to)
    svgRef.current?.classList.toggle('sc-mode-school', to === 'school')
    applyLabelSides(to)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { syncPositions(); return }
    const starts:  Record<string, Pos> = {}
    const targets: Record<string, Pos> = {}
    thinkers.forEach(t => {
      const cur = posRef.current[t.id]
      if (!cur) return
      starts[t.id] = { ...cur }
      const drawn = drawnPosRef.current[t.id]
      targets[t.id] = to === 'school'
        ? (activeSchoolLayout.layout[t.id] ?? drawn ?? cur)
        : (drawn ?? cur)
    })
    const dur = 820
    const t0  = performance.now()
    if (morphRafRef.current) cancelAnimationFrame(morphRafRef.current)
    function frame(now: number) {
      const k = Math.min(1, (now - t0) / dur)
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2
      thinkers.forEach(t => {
        const s = starts[t.id], tg = targets[t.id]
        if (!s || !tg) return
        posRef.current[t.id] = { x: s.x + (tg.x - s.x) * e, y: s.y + (tg.y - s.y) * e }
      })
      updateStarTransforms()
      renderEdges()
      if (k < 1) morphRafRef.current = requestAnimationFrame(frame)
    }
    morphRafRef.current = requestAnimationFrame(frame)
  }, [thinkers, activeSchoolLayout, syncPositions, applyLabelSides, updateStarTransforms, renderEdges])

  // Cleanup rAF on unmount
  useEffect(() => () => {
    if (morphRafRef.current) cancelAnimationFrame(morphRafRef.current)
  }, [])

  // ── Pan / zoom ────────────────────────────────────────────
  const applyZoom = useCallback(() => {
    const ps     = panRef.current
    const stage  = stageRef.current
    const camera = cameraRef.current
    if (!stage || !camera) return
    const { width, height } = stage.getBoundingClientRect()
    ps.scale = Math.max(1, Math.min(3.4, ps.scale))
    const ow = width  * (ps.scale - 1)
    const oh = height * (ps.scale - 1)
    ps.tx = Math.max(-ow, Math.min(0, ps.tx))
    ps.ty = Math.max(-oh, Math.min(0, ps.ty))
    camera.style.transform = `translate(${ps.tx}px,${ps.ty}px) scale(${ps.scale})`
    camera.style.transformOrigin = '0 0'
  }, [])

  // Wheel + touchstart (both need { passive: false })
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const ps  = panRef.current
      const r   = stage.getBoundingClientRect()
      const mx  = e.clientX - r.left, my = e.clientY - r.top
      const old = ps.scale
      ps.scale *= e.deltaY < 0 ? 1.12 : 0.9
      applyZoom()
      ps.tx = mx - (mx - ps.tx) * (ps.scale / old)
      ps.ty = my - (my - ps.ty) * (ps.scale / old)
      applyZoom()
    }
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault()
    }
    stage.addEventListener('wheel',      onWheel,      { passive: false })
    stage.addEventListener('touchstart', onTouchStart, { passive: false })
    stage.style.touchAction = 'none'
    return () => {
      stage.removeEventListener('wheel',      onWheel)
      stage.removeEventListener('touchstart', onTouchStart)
    }
  }, [applyZoom])

  // Pointer handlers — single-finger pan + two-finger pinch
  const onStagePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as Element).closest('[data-nopan], .sc-star, .sc-edge-hit')) return
    const stage = stageRef.current
    if (!stage) return
    const r   = stage.getBoundingClientRect()
    const pos = { x: e.clientX - r.left, y: e.clientY - r.top }
    ptrsRef.current.set(e.pointerId, pos)
    didMoveRef.current = false

    if (ptrsRef.current.size === 1) {
      dragRef.current  = { x: pos.x, y: pos.y, tx: panRef.current.tx, ty: panRef.current.ty }
      pinchRef.current = null
    }
    if (ptrsRef.current.size === 2) {
      const [a, b] = [...ptrsRef.current.values()]
      pinchRef.current = {
        dist:  Math.hypot(b.x - a.x, b.y - a.y),
        mx:    (a.x + b.x) / 2, my: (a.y + b.y) / 2,
        tx:    panRef.current.tx, ty: panRef.current.ty, scale: panRef.current.scale,
      }
      stage.setPointerCapture(e.pointerId)
    }
  }, [])

  const onStagePointerMove = useCallback((e: React.PointerEvent) => {
    if (!ptrsRef.current.has(e.pointerId)) return
    const stage = stageRef.current
    if (!stage) return
    const r   = stage.getBoundingClientRect()
    const pos = { x: e.clientX - r.left, y: e.clientY - r.top }
    ptrsRef.current.set(e.pointerId, pos)

    if (ptrsRef.current.size === 2 && pinchRef.current) {
      didMoveRef.current = true
      const [a, b]  = [...ptrsRef.current.values()]
      const dist    = Math.hypot(b.x - a.x, b.y - a.y)
      const mx      = (a.x + b.x) / 2, my = (a.y + b.y) / 2
      const { dist: d0, mx: mx0, my: my0, tx: tx0, ty: ty0, scale: s0 } = pinchRef.current
      const factor  = dist / d0
      panRef.current.scale = s0 * factor
      panRef.current.tx    = mx - (mx0 - tx0) * factor
      panRef.current.ty    = my - (my0 - ty0) * factor
      applyZoom()
    } else if (ptrsRef.current.size === 1 && dragRef.current) {
      const dx = pos.x - dragRef.current.x, dy = pos.y - dragRef.current.y
      if (!didMoveRef.current && Math.hypot(dx, dy) < 5) return
      didMoveRef.current  = true
      panRef.current.tx   = dragRef.current.tx + dx
      panRef.current.ty   = dragRef.current.ty + dy
      applyZoom()
    }
  }, [applyZoom])

  const onStagePointerUp = useCallback((e: React.PointerEvent) => {
    const wasTap = ptrsRef.current.size === 1 && !didMoveRef.current
    ptrsRef.current.delete(e.pointerId)
    if (ptrsRef.current.size === 1) {
      const [rem] = [...ptrsRef.current.values()]
      dragRef.current = { x: rem.x, y: rem.y, tx: panRef.current.tx, ty: panRef.current.ty }
      didMoveRef.current = false
    }
    if (ptrsRef.current.size === 0) {
      pinchRef.current = null
      if (didMoveRef.current) {
        suppressClickRef.current = true
        setTimeout(() => { suppressClickRef.current = false }, 0)
      }
      if (wasTap && !suppressClickRef.current) deselectRef.current()
    }
    applyZoom()
  }, [applyZoom])

  // ── Focus / hover (imperative — no re-renders) ────────────
  const clearFocus = useCallback(() => {
    if (selectedRef.current) return
    svgRef.current?.classList.remove('sc-focus')
    Object.values(edgeRefs.current).forEach(r => r?.g?.classList.remove('sc-lit'))
    Object.values(starGRefs.current).forEach(g => g?.classList.remove('sc-active', 'sc-neighbor'))
  }, [])

  const applyFocus = useCallback((centerId: string, eids: string[]) => {
    const svg = svgRef.current
    if (!svg) return
    svg.classList.add('sc-focus')
    const neighborIds = new Set<string>()
    eids.forEach(eid => {
      edgeRefs.current[eid]?.g?.classList.add('sc-lit')
      const [from, to] = eid.split('→')
      neighborIds.add(from === centerId ? to : from)
    })
    Object.keys(starGRefs.current).forEach(id => {
      const g = starGRefs.current[id]
      g?.classList.toggle('sc-active',   id === centerId)
      g?.classList.toggle('sc-neighbor', neighborIds.has(id))
    })
  }, [])

  const focusStar = useCallback((id: string) => {
    if (selectedRef.current) return
    applyFocus(id, (adjacency[id] ?? []).map(a => a.edgeId))
  }, [adjacency, applyFocus])

  const focusEdge = useCallback((eid: string, from: string, to: string) => {
    if (selectedRef.current) return
    const svg = svgRef.current
    if (!svg) return
    svg.classList.add('sc-focus')
    edgeRefs.current[eid]?.g?.classList.add('sc-lit')
    starGRefs.current[from]?.classList.add('sc-neighbor')
    starGRefs.current[to]  ?.classList.add('sc-neighbor')
  }, [])

  // ── Read tracking ─────────────────────────────────────────
  const markRead = useCallback((t: Thinker) => {
    const key = `${t.id}:${contentKeyFor(t, levelId)}`
    setReadSet(prev => {
      if (prev.has(key)) return prev
      const next = new Set(prev)
      next.add(key)
      try { localStorage.setItem(RKEY, JSON.stringify([...next])) } catch { /* noop */ }
      return next
    })
  }, [levelId])

  // ── Select / deselect ─────────────────────────────────────
  const deselect = useCallback(() => {
    selectedRef.current = null
    setSelected(null)
    svgRef.current?.classList.remove('sc-focus')
    Object.values(edgeRefs.current).forEach(r => r?.g?.classList.remove('sc-lit'))
    Object.values(starGRefs.current).forEach(g => g?.classList.remove('sc-active', 'sc-neighbor'))
  }, [])
  deselectRef.current = deselect

  const selectStar = useCallback((id: string) => {
    const t = thinkerById[id]
    if (!t) return
    selectedRef.current = id
    setSelected(id)
    svgRef.current?.classList.remove('sc-focus')
    Object.values(edgeRefs.current).forEach(r => r?.g?.classList.remove('sc-lit'))
    Object.values(starGRefs.current).forEach(g => g?.classList.remove('sc-active', 'sc-neighbor'))
    applyFocus(id, (adjacency[id] ?? []).map(a => a.edgeId))
    markRead(t)
  }, [thinkerById, adjacency, applyFocus, markRead])

  // Auto-deselect if selected thinker no longer visible
  useEffect(() => {
    if (selected && !thinkerById[selected]) deselect()
  }, [thinkers, selected, thinkerById, deselect])

  // ── Counts ────────────────────────────────────────────────
  const totalThinkers   = allThinkers.length
  const visibleCount    = thinkers.length
  const hiddenCount     = totalThinkers - visibleCount

  // ── Cartouche data ────────────────────────────────────────
  const selectedThinker  = selected ? thinkerById[selected]           : null
  const selectedSchool   = selectedThinker ? schoolById[selectedThinker.schoolId] : null
  const selectedContent  = selectedThinker ? contentFor(selectedThinker, levelId) : ''
  const selectedRelations = selected ? (adjacency[selected] ?? []) : []

  // ── Current level label ───────────────────────────────────
  const currentLevel = levels.find(l => l.id === levelId)

  // ── SVG geometry helpers (branch on isMobile) ────────────
  const svgW    = isMobile ? MW    : W
  const svgH    = isMobile ? MH    : H
  const svgPadX = isMobile ? MPAD_X : PAD_X
  const svgPadY = isMobile ? MPAD_Y : PAD_Y
  const vMapX   = isMobile ? mMapX  : mapX
  const vMapY   = isMobile ? mMapY  : mapY

  // ── Axis pole renderers ───────────────────────────────────

  // Horizontal pole (desktop left/right + mobile top/bottom Y-poles)
  function renderPoleLine(
    x: number, baseY: number, anchor: 'start' | 'middle' | 'end',
    label: string, hint: string | undefined, wrapMax: number,
  ) {
    const lines = wrapLabel(label.toUpperCase(), wrapMax)
    const multi = lines.length > 1
    return (
      <g>
        <text x={x} y={baseY - (multi ? 6 : 0)} textAnchor={anchor} className="sc-pole">
          {lines.map((ln, i) => (
            <tspan key={i} x={x} dy={i === 0 ? undefined : 12}>{ln}</tspan>
          ))}
        </text>
        {hint && (
          <text x={x} y={baseY + (multi ? 22 : 16)} textAnchor={anchor} className="sc-pole-hint">
            {wrapLabel(hint, Math.round(wrapMax * 1.6)).map((ln, i) => (
              <tspan key={i} x={x} dy={i === 0 ? undefined : 11}>{ln}</tspan>
            ))}
          </text>
        )}
      </g>
    )
  }

  // Vertical pole — mobile X-poles rotated -90° into side gutters
  function renderPoleVertical(gx: number, label: string, hint: string | undefined) {
    const yc = MH / 2
    const lines = wrapLabel(label.toUpperCase(), 16)
    const multi = lines.length > 1
    const labelY = yc - (multi ? 8 : 0)
    return (
      <g>
        <text
          x={gx} y={labelY} textAnchor="middle" className="sc-pole"
          transform={`rotate(-90,${gx},${yc})`}
        >
          {lines.map((ln, i) => (
            <tspan key={i} x={gx} dy={i === 0 ? undefined : 12}>{ln}</tspan>
          ))}
        </text>
        {hint && (
          <text
            x={gx + 16} y={yc} textAnchor="middle" className="sc-pole-hint"
            transform={`rotate(-90,${gx + 16},${yc})`}
          >
            {hint}
          </text>
        )}
      </g>
    )
  }

  // ─── Render ──────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* ── Controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 16, padding: isMobile ? '2px 4px 8px' : '4px 4px 12px' }}>
        <div className="sc-modeswitch">
          <button className={mode === 'axis'   ? 'sc-on' : ''} onClick={() => morph('axis')}>Karte</button>
          <button className={mode === 'school' ? 'sc-on' : ''} onClick={() => morph('school')}>Schulen</button>
        </div>
        <label className="sc-lines-toggle">
          <input type="checkbox" checked={showLines} onChange={e => setShowLines(e.target.checked)} />
          Linien
        </label>
      </div>

      {/* ── Stage ── */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0, maxWidth: isMobile ? '100%' : `calc(78vh * ${W} / ${H})` }}>
        <div
          ref={stageRef}
          style={{
            position: 'relative', width: '100%', minWidth: 0,
            border: '1px solid var(--hairline-strong)',
            background: 'var(--bg-sunk)',
            overflow: 'hidden', cursor: 'grab',
            aspectRatio: `${svgW} / ${svgH}`, maxHeight: '78vh',
            boxShadow: 'inset 0 0 0 6px var(--bg-sunk), inset 0 0 0 7px var(--hairline)',
          }}
          onPointerDown={onStagePointerDown}
          onPointerMove={onStagePointerMove}
          onPointerUp={onStagePointerUp}
          onPointerCancel={e => { ptrsRef.current.delete(e.pointerId); pinchRef.current = null }}
        >
          <div ref={cameraRef} style={{ position: 'absolute', inset: 0, transformOrigin: '0 0' }}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${svgW} ${svgH}`}
              style={{ width: '100%', height: '100%', display: 'block' }}
            >
              <defs>
                <filter id="sc-grain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" result="n"/>
                  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.045 0"/>
                </filter>
                <radialGradient id="sc-vign" cx="50%" cy="46%" r="62%">
                  <stop offset="60%"  stopColor="oklch(0.22 0.02 65)" stopOpacity={0}/>
                  <stop offset="100%" stopColor="oklch(0.22 0.02 65)" stopOpacity={0.12}/>
                </radialGradient>
                {thinkers.map(t => {
                  const col = schoolById[t.schoolId]?.color ?? 'oklch(0.42 0.10 65)'
                  return (
                    <radialGradient key={t.id} id={`sc-glow-${t.id}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%"   stopColor={col} stopOpacity={0.5}/>
                      <stop offset="100%" stopColor={col} stopOpacity={0}/>
                    </radialGradient>
                  )
                })}
              </defs>

              {/* Background */}
              <rect x={0} y={0} width={svgW} height={svgH} fill="var(--bg-sunk)"/>
              <rect x={0} y={0} width={svgW} height={svgH} filter="url(#sc-grain)" pointerEvents="none"/>

              {/* Graticule */}
              <g className="sc-axischrome" pointerEvents="none">
                {[0.25, 0.5, 0.75].map(t => {
                  const x = svgPadX + t * (svgW - 2 * svgPadX)
                  const y = svgPadY + t * (svgH - 2 * svgPadY)
                  return (
                    <g key={t}>
                      <line x1={x} y1={svgPadY}         x2={x}            y2={svgH - svgPadY} className={t === 0.5 ? 'sc-axis' : 'sc-grid'}/>
                      <line x1={svgPadX} y1={y}          x2={svgW - svgPadX} y2={y}           className={t === 0.5 ? 'sc-axis' : 'sc-grid'}/>
                    </g>
                  )
                })}
                <rect x={svgPadX} y={svgPadY} width={svgW - 2 * svgPadX} height={svgH - 2 * svgPadY} className="sc-frame"/>
              </g>

              {/* Axis labels */}
              <g className="sc-axischrome" pointerEvents="none">
                {isMobile ? (
                  // Mobile: X-poles rotated vertically in narrow side gutters; Y-poles horizontal
                  <>
                    {renderPoleVertical(26, quadrants.axisX.left, quadrants.axisX.leftHint)}
                    {renderPoleVertical(MW - 26, quadrants.axisX.right, quadrants.axisX.rightHint)}
                    {quadrants.axisY.topHint && (
                      <text x={MW / 2} y={60} textAnchor="middle" className="sc-pole-hint">
                        {quadrants.axisY.topHint}
                      </text>
                    )}
                    <text x={MW / 2} y={82} textAnchor="middle" className="sc-pole">
                      {quadrants.axisY.top?.toUpperCase()}
                    </text>
                    <text x={MW / 2} y={MH - MPAD_Y + 46} textAnchor="middle" className="sc-pole">
                      {quadrants.axisY.bottom?.toUpperCase()}
                    </text>
                    {quadrants.axisY.bottomHint && (
                      <text x={MW / 2} y={MH - MPAD_Y + 66} textAnchor="middle" className="sc-pole-hint">
                        {quadrants.axisY.bottomHint}
                      </text>
                    )}
                  </>
                ) : (
                  // Desktop: horizontal X-poles in wide side margins, Y-axis name rotated
                  <>
                    {renderPoleLine(PAD_X - 12,     H / 2, 'end',   quadrants.axisX.left,  quadrants.axisX.leftHint,  14)}
                    {renderPoleLine(W - PAD_X + 12, H / 2, 'start', quadrants.axisX.right, quadrants.axisX.rightHint, 14)}
                    <text x={W / 2} y={H - PAD_Y + 58} textAnchor="middle" className="sc-axisname">
                      {`← ${quadrants.axisX.label} →`}
                    </text>
                    {quadrants.axisY.topHint && (
                      <text x={W / 2} y={PAD_Y - 44} textAnchor="middle" className="sc-pole-hint">
                        {quadrants.axisY.topHint}
                      </text>
                    )}
                    <text x={W / 2} y={PAD_Y - 28} textAnchor="middle" className="sc-pole">
                      {quadrants.axisY.top?.toUpperCase()}
                    </text>
                    <text x={W / 2} y={H - PAD_Y + 24} textAnchor="middle" className="sc-pole">
                      {quadrants.axisY.bottom?.toUpperCase()}
                    </text>
                    {quadrants.axisY.bottomHint && (
                      <text x={W / 2} y={H - PAD_Y + 40} textAnchor="middle" className="sc-pole-hint">
                        {quadrants.axisY.bottomHint}
                      </text>
                    )}
                    <text
                      x={22} y={H / 2} textAnchor="middle" className="sc-axisname"
                      transform={`rotate(-90,22,${H / 2})`}
                    >
                      {`↑ ${quadrants.axisY.label} ↓`}
                    </text>
                    {/* Compass */}
                    <g transform={`translate(${W - PAD_X - 30},${PAD_Y + 34})`} opacity={0.5}>
                      <circle r={15} fill="none" stroke="var(--fg-muted)" strokeWidth={0.5} strokeOpacity={0.8}/>
                      <line x1={0} y1={-15} x2={0} y2={15} stroke="var(--fg-muted)" strokeWidth={0.5}/>
                      <line x1={-15} y1={0} x2={15} y2={0} stroke="var(--fg-muted)" strokeWidth={0.5}/>
                      <polygon points="0,-15 2,-6 0,-8 -2,-6" fill="var(--accent)"/>
                      <text y={-19} textAnchor="middle" className="sc-compass-label" fill="var(--fg-muted)" opacity={0.7}>N</text>
                    </g>
                  </>
                )}
              </g>

              {/* Edges */}
              <g style={showLines ? undefined : { display: 'none' }}>
                {influences.map(inf => {
                  const eid = `${inf.from}→${inf.to}`
                  const col  = LINE_COLOR_RESOLVED[inf.type] ?? LINE_COLOR_RESOLVED.influence
                  const dash = DASH[inf.type]
                  return (
                    <g
                      key={eid}
                      className="sc-edge-g"
                      ref={el => {
                        if (!edgeRefs.current[eid]) {
                          edgeRefs.current[eid] = { g: null, line: null, hit: null, brk: [null, null] }
                        }
                        edgeRefs.current[eid].g = el
                      }}
                    >
                      <path
                        className="sc-edge"
                        fill="none"
                        stroke={col}
                        strokeWidth={1.1}
                        strokeLinecap="round"
                        strokeDasharray={dash}
                        ref={el => { if (edgeRefs.current[eid]) edgeRefs.current[eid].line = el }}
                      />
                      {inf.type === 'rejection' && (
                        <>
                          <line
                            className="sc-brk"
                            stroke={col}
                            ref={el => { if (edgeRefs.current[eid]) edgeRefs.current[eid].brk[0] = el }}
                          />
                          <line
                            className="sc-brk"
                            stroke={col}
                            ref={el => { if (edgeRefs.current[eid]) edgeRefs.current[eid].brk[1] = el }}
                          />
                        </>
                      )}
                      <path
                        className="sc-edge-hit"
                        ref={el => { if (edgeRefs.current[eid]) edgeRefs.current[eid].hit = el }}
                        onMouseEnter={() => focusEdge(eid, inf.from, inf.to)}
                        onMouseLeave={clearFocus}
                      />
                    </g>
                  )
                })}
              </g>

              {/* Stars */}
              <g>
                {thinkers.map(t => {
                  if (t.x === undefined || t.y === undefined) return null
                  const cx    = vMapX(t.x), cy = vMapY(t.y)
                  const col   = schoolById[t.schoolId]?.color ?? 'oklch(0.42 0.10 65)'
                  const isAnchor = t.firstLevel === 1
                  const R     = isMobile
                    ? 12 - (t.firstLevel - 1) * 1.1
                    : 7.4 - (t.firstLevel - 1) * 0.7
                  const off   = isMobile ? 8 : 6
                  const onLeft = t.x > 55
                  const ldx   = onLeft ? -(R + off) : (R + off)
                  const anc   = onLeft ? 'end' : 'start'

                  return (
                    <g
                      key={t.id}
                      className={`sc-star${isAnchor ? ' sc-anchor' : ''}`}
                      ref={el => { starGRefs.current[t.id] = el }}
                      onMouseEnter={() => focusStar(t.id)}
                      onMouseLeave={clearFocus}
                      onClick={e => { e.stopPropagation(); selectStar(t.id) }}
                    >
                      {/* Wide touch / pointer target */}
                      <circle cx={cx} cy={cy} r={isMobile ? 22 : 16} fill="transparent"/>
                      <g className="sc-star-body">
                        <circle className="sc-halo-pulse" cx={cx} cy={cy} r={6} fill="none" stroke={col} strokeWidth={1} opacity={0}/>
                        <circle
                          className="sc-pulse-halo"
                          cx={cx} cy={cy} r={R * 2.2}
                          fill={`url(#sc-glow-${t.id})`}
                          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                        />
                        <circle className="sc-glow" cx={cx} cy={cy} r={R * 1.7} fill={`url(#sc-glow-${t.id})`}/>
                        {isAnchor && <circle className="sc-ring" cx={cx} cy={cy} r={R + 3.5}/>}
                        <path className="sc-spike" d={spikePath(cx, cy, R)}/>
                        <circle cx={cx} cy={cy} r={isAnchor ? 2.4 : 1.8} fill={col}/>
                        <circle className="sc-unread-dot" cx={cx + R * 0.9} cy={cy - R * 0.9} r={1.9} fill={col}/>
                        <text className="sc-sname" x={cx + ldx} y={cy - 1} textAnchor={anc as any} dominantBaseline="central">
                          {t.name}
                        </text>
                        <text className="sc-slife" x={cx + ldx} y={cy + (isMobile ? 18 : 10)} textAnchor={anc as any} dominantBaseline="central">
                          {t.lifespan}
                        </text>
                      </g>
                    </g>
                  )
                })}
              </g>

              {/* School name labels — only visible in school mode */}
              <g className="sc-schoollabels" pointerEvents="none">
                {activeSchoolLayout.present
                  .filter(sid => visibleSchoolIds.has(sid))
                  .map(sid => {
                    const c   = activeSchoolLayout.centers[sid]
                    const allM = allThinkers.filter(t => t.schoolId === sid)
                    const rr  = isMobile
                      ? (allM.length === 1 ? 15 : (18 + allM.length * 6))
                      : (allM.length === 1 ? 18 : (22 + allM.length * 7))
                    const sch = schoolById[sid]
                    const lines = wrapLabel((sch?.label ?? sid).toUpperCase(), 15)
                    const lineSpacing = isMobile ? 15 : 12
                    const baseY = c.y - rr - (isMobile ? 12 : 13) - (lines.length - 1) * lineSpacing
                    return (
                      <text
                        key={sid}
                        x={c.x} y={baseY}
                        textAnchor="middle"
                        className="sc-schoolname"
                        fill={sch?.color ?? 'var(--fg-muted)'}
                      >
                        {lines.map((ln, i) => (
                          <tspan key={i} x={c.x} dy={i === 0 ? undefined : lineSpacing}>{ln}</tspan>
                        ))}
                      </text>
                    )
                  })}
              </g>

              {/* Vignette overlay */}
              <rect x={0} y={0} width={svgW} height={svgH} fill="url(#sc-vign)" pointerEvents="none"/>
            </svg>
          </div>

          {/* ── Zoom controls ── */}
          <div
            data-nopan
            style={{
              position: 'absolute', right: 10, bottom: 10,
              display: 'flex', flexDirection: 'column', gap: 5, zIndex: 4,
            }}
          >
            {[
              { label: 'Vergrössern',  icon: '+',  fn: () => { panRef.current.scale *= 1.25; applyZoom() } },
              { label: 'Verkleinern',  icon: '−',  fn: () => { panRef.current.scale *= 0.8;  applyZoom() } },
              { label: 'Zurücksetzen', icon: '⟲',  fn: () => { panRef.current = { scale: 1, tx: 0, ty: 0 }; applyZoom() } },
            ].map(({ label, icon, fn }) => (
              <button
                key={label}
                aria-label={label}
                onClick={e => { e.stopPropagation(); fn() }}
                style={{
                  width: 30, height: 30, border: '1px solid var(--hairline-strong)',
                  background: 'var(--bg-raised)', color: 'var(--fg-muted)',
                  fontSize: icon === '⟲' ? 12 : 15, cursor: 'pointer',
                  display: 'grid', placeItems: 'center',
                }}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* ── Desktop cartouche — hidden on mobile (replaced by bottom-sheet) ── */}
          {!isMobile && selectedThinker && (
            <aside
              data-nopan
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute', top: 12, right: 12, width: 286, zIndex: 5,
                background: 'var(--bg-raised)',
                border: '1px solid var(--hairline-strong)',
                boxShadow: '0 16px 40px -24px oklch(0.24 0.02 65 / 0.6)',
              }}
            >
              <CartoucheContent
                selectedThinker={selectedThinker}
                selectedSchool={selectedSchool}
                selectedContent={selectedContent}
                selectedRelations={selectedRelations}
                thinkerById={thinkerById}
                levelId={levelId}
                deselect={deselect}
                selectStar={selectStar}
              />
            </aside>
          )}
        </div>

        {/* ── Legend / counter — below the plate ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '6px 18px', padding: '10px 2px 2px',
        }}>
          <div style={{ fontStyle: 'italic', fontSize: 11, color: 'var(--fg-dim)' }}>
            {hiddenCount > 0
              ? `${visibleCount} von ${totalThinkers} Sternen sichtbar · ${hiddenCount} im Dunst`
              : `Alle ${totalThinkers} Sterne sichtbar`}
          </div>
          {showLines && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px' }}>
              <LegendKey color={LINE_COLOR_RESOLVED.influence} label="Linie · Einfluss"/>
              <LegendKey color={LINE_COLOR_RESOLVED.parallel}  label="Parallele · verwandt" dash="1 3"/>
              <LegendKey color={LINE_COLOR_RESOLVED.critique}  label="Kritik · widerspricht" dash="5 3"/>
              <LegendKey color={LINE_COLOR_RESOLVED.rejection} label="Verwerfung · Bruch"    dash="2 3" rejection/>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* ── Mobile bottom-sheet cartouche ── */}
      {isMobile && selectedThinker && (
        <>
          <div className="sc-sheet-scrim" onClick={deselect} />
          <div className="sc-sheet" onClick={e => e.stopPropagation()}>
            {/* Drag handle */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--hairline-strong)' }} />
            </div>
            <CartoucheContent
              selectedThinker={selectedThinker}
              selectedSchool={selectedSchool}
              selectedContent={selectedContent}
              selectedRelations={selectedRelations}
              thinkerById={thinkerById}
              levelId={levelId}
              deselect={deselect}
              selectStar={selectStar}
            />
          </div>
        </>
      )}
    </div>
  )
}

// ─── Cartouche content (shared by desktop aside + mobile sheet) ──

interface CartoucheContentProps {
  selectedThinker:   ThinkerWithDesc
  selectedSchool:    School | null
  selectedContent:   string
  selectedRelations: Array<{ edgeId: string; otherId: string; dir: 'in' | 'out'; edge: InfluenceWithDesc }>
  thinkerById:       Record<string, ThinkerWithDesc>
  levelId:           number
  deselect:          () => void
  selectStar:        (id: string) => void
}

function CartoucheContent({
  selectedThinker, selectedSchool, selectedContent, selectedRelations,
  thinkerById, levelId, deselect, selectStar,
}: CartoucheContentProps) {
  return (
    <>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 10, padding: '14px 14px 10px',
        borderBottom: '1px solid var(--hairline)',
      }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: selectedSchool?.color ?? 'var(--accent)', margin: 0 }}>
            {selectedSchool?.label ?? ''}
          </p>
          <p style={{ fontFamily: "'Marcellus SC', serif", fontSize: 17, letterSpacing: '0.04em', color: 'var(--fg)', margin: '3px 0 0' }}>
            {selectedThinker.name}
          </p>
          {selectedThinker.lifespan && (
            <p style={{ fontStyle: 'italic', fontSize: 11, color: 'var(--fg-faint)', marginTop: 2 }}>
              {selectedThinker.lifespan}
            </p>
          )}
        </div>
        <button
          onClick={e => { e.stopPropagation(); deselect() }}
          aria-label="Schliessen"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-faint)', fontSize: 14, lineHeight: 1, padding: 2, flexShrink: 0 }}
        >
          ✕
        </button>
      </div>
      {/* Body */}
      <div style={{ padding: '13px 14px 12px', fontSize: 13, lineHeight: 1.62, color: 'var(--fg-muted)', maxHeight: 232, overflowY: 'auto' }}>
        {selectedContent
          ? <Annotated text={selectedContent} level={levelId}/>
          : <span style={{ color: 'var(--fg-dim)', fontStyle: 'italic' }}>—</span>
        }
      </div>
      {/* Relations */}
      {selectedRelations.length > 0 && (
        <div style={{ padding: '0 14px 14px' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-faint)', margin: '2px 0 8px' }}>
            Verbindungen
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {selectedRelations.map(({ edgeId, otherId, dir, edge }) => {
              const other = thinkerById[otherId]
              if (!other) return null
              const isInf = edge.type === 'influence' || edge.type === 'student-of'
              const label = isInf
                ? (dir === 'out' ? 'Einfluss →' : '← Einfluss')
                : (edge.type === 'parallel'  ? 'Parallele'
                  : edge.type === 'critique'  ? 'Kritik'
                  : 'Verwerfung')
              return (
                <li
                  key={edgeId}
                  style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 12, color: 'var(--fg-muted)', cursor: 'pointer' }}
                  onClick={e => { e.stopPropagation(); selectStar(otherId) }}
                >
                  <span style={{
                    fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
                    width: 80, flexShrink: 0,
                    color: LINE_COLOR_RESOLVED[edge.type] ?? LINE_COLOR_RESOLVED.influence,
                  }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: "'Marcellus SC', serif", letterSpacing: '0.02em' }}>
                    {other.name}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

// ─── Legend key ───────────────────────────────────────────────

function LegendKey({ color, label, dash, rejection }: {
  color: string; label: string; dash?: string; rejection?: boolean
}) {
  const h = rejection ? 4 : 2
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: 'var(--fg-muted)', letterSpacing: '0.02em' }}>
      <svg width="26" height={h} viewBox={`0 0 26 ${h}`} preserveAspectRatio="none" style={{ flexShrink: 0 }}>
        <line x1="0" y1={h / 2} x2="26" y2={h / 2} stroke={color} strokeWidth="1.6" strokeDasharray={dash}/>
        {rejection && (
          <>
            <line x1="12" y1="0" x2="12" y2="4" stroke={color} strokeWidth="1.2"/>
            <line x1="15" y1="0" x2="15" y2="4" stroke={color} strokeWidth="1.2"/>
          </>
        )}
      </svg>
      {label}
    </div>
  )
}
