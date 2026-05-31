'use client'

import { useMemo, useState } from 'react'
import type { Thinker, Influence, School, InfluenceType, Level, Topic } from '@/lib/types'
import { usePanZoom } from '@/hooks/usePanZoom'
import { MapZoomControls } from './map/MapZoomControls'
import { Annotated } from '@/lib/annotations'

interface ThinkerWithDesc extends Thinker { description: string }
interface InfluenceWithDesc extends Influence { description: string }

interface Props {
  thinkers: ThinkerWithDesc[]
  influences: InfluenceWithDesc[]
  schools: School[]
  currentLevel: Level
  topic: Topic
}

// Build positions + cluster halos directly from data (topic.graphLayout === 'manual').
// Falls back to auto-layout for any thinker without graphX/graphY.
function manualLayout(thinkers: Thinker[], schools: School[]): {
  positions: Record<string, { x: number; y: number }>
  clusters: Array<{ school: string; cx: number; cy: number; rx: number; ry: number; lx: number; ly: number; ta: 'start' | 'middle' | 'end' }>
} | null {
  const positions: Record<string, { x: number; y: number }> = {}
  for (const t of thinkers) {
    if (t.graphX === undefined || t.graphY === undefined) return null
    positions[t.id] = { x: W / 2 + t.graphX, y: H / 2 + t.graphY }
  }
  const clusters = schools
    .filter(s => s.cluster)
    .map(s => ({ school: s.id, ...s.cluster! }))
  return { positions, clusters }
}

const INFLUENCE_COLOR: Record<InfluenceType, string> = {
  'influence':   'oklch(0.48 0.12 145)',  // green
  'critique':    'oklch(0.45 0.17 25)',   // red-orange
  'student-of':  'oklch(0.48 0.12 75)',   // amber
  'parallel':    'oklch(0.50 0.008 85)',  // gray
  'rejection':   'oklch(0.40 0.17 350)',  // magenta
}

const INFLUENCE_LABEL: Record<InfluenceType, string> = {
  'influence':   'Beeinflusst',
  'critique':    'Kritik',
  'student-of':  'Schüler',
  'parallel':    'Parallel',
  'rejection':   'Verwirft',
}

// Edge dash patterns — shape is the primary differentiator, color secondary
const EDGE_STYLE: Record<InfluenceType, {
  dashArray?: string
  lineCap?: 'round' | 'square' | 'butt'
  double?: boolean
}> = {
  'influence':  { },
  'critique':   { dashArray: '2.5 2.5', lineCap: 'square' },
  'student-of': { dashArray: '8 3 1 3', lineCap: 'round' },
  'parallel':   { dashArray: '5 6', lineCap: 'round' },
  'rejection':  { double: true },
}

const W = 1100, H = 780, R = 18

function autoLayout(thinkers: Thinker[], schools: School[]): {
  positions: Record<string, { x: number; y: number }>
  clusters: Array<{ school: string; cx: number; cy: number; rx: number; ry: number; lx: number; ly: number; ta: 'start' | 'middle' | 'end' }>
} {
  const cx0 = W / 2, cy0 = H / 2
  const stageR = Math.min(W, H) / 2 - 70
  const schoolMeta = new Map(schools.map(s => [s.id, s]))

  const bySchool = new Map<string, Thinker[]>()
  for (const t of [...thinkers].sort((a, b) => a.id.localeCompare(b.id))) {
    if (!bySchool.has(t.schoolId)) bySchool.set(t.schoolId, [])
    bySchool.get(t.schoolId)!.push(t)
  }

  const schoolList = [...bySchool.keys()]
  const F = schoolList.length
  const positions: Record<string, { x: number; y: number }> = {}

  type ClusterGeo = { school: string; fx: number; fy: number; haloR: number; nx: number; ny: number }
  const geo: ClusterGeo[] = []

  schoolList.forEach((school, fIdx) => {
    const meta = schoolMeta.get(school)
    let fx: number, fy: number
    if (meta?.gx !== undefined && meta?.gy !== undefined) {
      fx = cx0 + meta.gx
      fy = cy0 + meta.gy
    } else {
      const angle = (fIdx / Math.max(F, 1)) * Math.PI * 2 - Math.PI / 2
      fx = cx0 + Math.cos(angle) * stageR * 0.62
      fy = cy0 + Math.sin(angle) * stageR * 0.62
    }

    const members = bySchool.get(school)!
    const n = members.length
    const innerR = n <= 1 ? 0 : Math.min(110, 18 + n * 9)
    const haloR  = innerR + R + 16

    const HP = haloR + 8
    fx = Math.max(HP, Math.min(W - HP, fx))
    fy = Math.max(HP, Math.min(H - HP, fy))

    members.forEach((t, mIdx) => {
      if (n === 1) {
        positions[t.id] = { x: fx, y: fy }
      } else {
        const a = (mIdx / n) * Math.PI * 2 - Math.PI / 2
        positions[t.id] = { x: fx + Math.cos(a) * innerR, y: fy + Math.sin(a) * innerR }
      }
    })

    const dirX = fx - cx0, dirY = fy - cy0
    const dirLen = Math.sqrt(dirX * dirX + dirY * dirY) || 1
    geo.push({ school, fx, fy, haloR, nx: dirX / dirLen, ny: dirY / dirLen })
  })

  // Iterative relaxation
  const nodeList = thinkers.map(t => ({
    id:     t.id,
    school: t.schoolId,
    x:      positions[t.id].x,
    y:      positions[t.id].y,
  }))
  const schoolAnchor = new Map(geo.map(g => [g.school, { fx: g.fx, fy: g.fy }]))

  const N          = thinkers.length
  const RELAX_ITER = Math.min(120, 30 + N * 1.2) | 0
  const MIN_DIST   = 92
  const PULL       = Math.max(0.008, 0.05 / (1 + N * 0.025))

  for (let iter = 0; iter < RELAX_ITER; iter++) {
    for (let j = 0; j < nodeList.length; j++) {
      for (let k = j + 1; k < nodeList.length; k++) {
        const a = nodeList[j], b = nodeList[k]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        if (dist < MIN_DIST) {
          const half = (MIN_DIST - dist) / 2
          const fx = (dx / dist) * half
          const fy = (dy / dist) * half
          a.x -= fx; a.y -= fy
          b.x += fx; b.y += fy
        }
      }
    }
    for (const node of nodeList) {
      const anchor = schoolAnchor.get(node.school)
      if (anchor) {
        node.x += (anchor.fx - node.x) * PULL
        node.y += (anchor.fy - node.y) * PULL
      }
    }
  }
  const PX = R + 52, PYT = R + 6, PYB = R + 28
  for (const node of nodeList) {
    node.x = Math.max(PX, Math.min(W - PX, node.x))
    node.y = Math.max(PYT, Math.min(H - PYB, node.y))
    positions[node.id] = { x: node.x, y: node.y }
  }

  // Label placement
  const TW = 96
  const TH = 8

  const COMPASS = [
    { nx:  1,     ny:  0     },
    { nx:  0.707, ny: -0.707 },
    { nx:  0,     ny: -1     },
    { nx: -0.707, ny: -0.707 },
    { nx: -1,     ny:  0     },
    { nx: -0.707, ny:  0.707 },
    { nx:  0,     ny:  1     },
    { nx:  0.707, ny:  0.707 },
  ]

  function clears(lx: number, ly: number, ta: 'start' | 'middle' | 'end',
                  cx: number, cy: number, r: number): boolean {
    const left  = ta === 'start'  ? lx         : ta === 'end' ? lx - TW * 2 : lx - TW
    const right = ta === 'start'  ? lx + TW * 2 : ta === 'end' ? lx          : lx + TW
    const top = ly - TH, bot = ly + TH
    const nearX = Math.max(left, Math.min(right, cx))
    const nearY = Math.max(top,  Math.min(bot,   cy))
    return Math.hypot(nearX - cx, nearY - cy) > r + 3
  }

  const placedLabels: Array<{ left: number; right: number; top: number; bottom: number }> = []

  function labelBbox(lx: number, ly: number, ta: 'start' | 'middle' | 'end') {
    const left  = ta === 'start' ? lx : ta === 'end' ? lx - TW * 2 : lx - TW
    const right = ta === 'start' ? lx + TW * 2 : ta === 'end' ? lx : lx + TW
    return { left, right, top: ly - TH, bottom: ly + TH }
  }

  function overlapsPlaced(lx: number, ly: number, ta: 'start' | 'middle' | 'end'): boolean {
    const b = labelBbox(lx, ly, ta)
    return placedLabels.some(p =>
      b.left < p.right + 4 && b.right > p.left - 4 &&
      b.top  < p.bottom + 4 && b.bottom > p.top - 4
    )
  }

  const NODE_SIDE  = R
  const NODE_ABOVE = R
  const NODE_BELOW = R + 16
  const NODE_PAD   = 4
  function clearsNodes(lx: number, ly: number, ta: 'start' | 'middle' | 'end'): boolean {
    const lLeft  = ta === 'start' ? lx : ta === 'end' ? lx - TW * 2 : lx - TW
    const lRight = ta === 'start' ? lx + TW * 2 : ta === 'end' ? lx : lx + TW
    const lTop = ly - TH, lBot = ly + TH
    return nodeList.every(node =>
      lRight  < node.x - NODE_SIDE  - NODE_PAD ||
      lLeft   > node.x + NODE_SIDE  + NODE_PAD ||
      lBot    < node.y - NODE_ABOVE - NODE_PAD ||
      lTop    > node.y + NODE_BELOW + NODE_PAD
    )
  }

  const DIR_HINT: Record<string, { nx: number; ny: number }> = {
    N:  { nx:  0,     ny: -1     },
    NE: { nx:  0.707, ny: -0.707 },
    E:  { nx:  1,     ny:  0     },
    SE: { nx:  0.707, ny:  0.707 },
    S:  { nx:  0,     ny:  1     },
    SW: { nx: -0.707, ny:  0.707 },
    W:  { nx: -1,     ny:  0     },
    NW: { nx: -0.707, ny: -0.707 },
  }

  const clusters = geo.map(({ school, fx, fy, haloR, nx: preferNx, ny: preferNy }) => {
    const meta = schoolMeta.get(school)

    let targetNx: number, targetNy: number
    if (meta?.labelDir && DIR_HINT[meta.labelDir]) {
      targetNx = DIR_HINT[meta.labelDir].nx
      targetNy = DIR_HINT[meta.labelDir].ny
    } else {
      targetNx = preferNx
      targetNy = fy < H * 0.30 ? Math.abs(preferNy) + 0.3 : preferNy
    }

    const dirs = [...COMPASS].sort((a, b) =>
      (a.nx - targetNx) ** 2 + (a.ny - targetNy) ** 2 -
      ((b.nx - targetNx) ** 2 + (b.ny - targetNy) ** 2)
    )

    for (const dir of dirs) {
      for (const extraDist of [0, 9, 18, 27, 36, 45, 54, 63, 72, 90, 108, 126]) {
        const dist = haloR + 12 + extraDist
        const lx = fx + dir.nx * dist
        const ly = fy + dir.ny * dist
        const ta: 'start' | 'middle' | 'end' =
          dir.nx >  0.35 ? 'start' :
          dir.nx < -0.35 ? 'end'   : 'middle'

        const { left, right } = labelBbox(lx, ly, ta)

        if (left < 4 || right > W - 4 || ly - TH < 4 || ly + TH > H - 4) continue
        if (!clears(lx, ly, ta, fx, fy, haloR)) continue
        if (geo.some(o => o.school !== school && !clears(lx, ly, ta, o.fx, o.fy, o.haloR))) continue
        if (overlapsPlaced(lx, ly, ta)) continue
        if (!clearsNodes(lx, ly, ta)) continue

        placedLabels.push(labelBbox(lx, ly, ta))
        return { school, cx: fx, cy: fy, rx: haloR, ry: haloR, lx, ly, ta }
      }
    }

    const ly = fy - haloR - 14 > H / 2 ? fy - haloR - 14 : fy + haloR + 14
    const lyClamped = Math.max(14, Math.min(H - 14, ly))
    placedLabels.push(labelBbox(fx, lyClamped, 'middle'))
    return {
      school, cx: fx, cy: fy, rx: haloR, ry: haloR,
      lx: fx, ly: lyClamped, ta: 'middle' as const,
    }
  })

  return { positions, clusters }
}

function nodeLabel(name: string): string {
  const titles = new Set(['von', 'van', 'de', 'di', 'Sir', 'Lord'])
  const base = name.replace(/\s*\(.*?\)/g, '').trim()
  const words = base.split(' ').filter(w => !titles.has(w))
  if (words.length <= 1) return words[0] ?? name
  const first = words[0]
  const last  = words[words.length - 1]
  if (words.length === 2 && last.length <= 8) return `${first} ${last}`
  if (last.length >= 8) return `${first} ${last[0]}.`
  return `${first} ${last}`
}

const STAGE_BG = 'oklch(0.94 0.022 85)'

function curveD(ax: number, ay: number, bx: number, by: number) {
  const mx = (ax + bx) / 2, my = (ay + by) / 2
  const dx = bx - ax, dy = by - ay
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const offset = 24
  const cx = mx - (dy / len) * offset
  const cy = my + (dx / len) * offset
  return { d: `M${ax},${ay} Q${cx},${cy} ${bx},${by}`, lx: cx, ly: cy }
}

export default function InfluenceGraph({ thinkers, influences, schools, currentLevel, topic }: Props) {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [activeEdge, setActiveEdge] = useState<InfluenceWithDesc | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [hoveredSchool, setHoveredSchool] = useState<string | null>(null)
  const [hiddenTypes, setHiddenTypes] = useState<Set<InfluenceType>>(new Set())
  const [hiddenSchools, setHiddenSchools] = useState<Set<string>>(new Set())

  const { positions, clusters } = useMemo(() => {
    if (topic.graphLayout === 'manual') {
      const m = manualLayout(thinkers, schools)
      if (m) return m
    }
    return autoLayout(thinkers, schools)
  }, [thinkers, schools, topic.graphLayout])

  const schoolLabels = useMemo(
    () => Object.fromEntries(schools.map(s => [s.id, s.label])),
    [schools],
  )
  const schoolColors = useMemo(
    () => Object.fromEntries(schools.map(s => [s.id, s.color])),
    [schools],
  )

  const visibleSchools = useMemo(
    () => schools.filter(s => thinkers.some(t => t.schoolId === s.id)),
    [schools, thinkers],
  )

  const visibleThinkers = useMemo(
    () => thinkers.filter(t => !hiddenSchools.has(t.schoolId)),
    [thinkers, hiddenSchools],
  )

  const nodeDegree = useMemo(() => {
    const deg = new Map<string, number>()
    for (const t of thinkers) deg.set(t.id, 0)
    for (const i of influences) {
      deg.set(i.from, (deg.get(i.from) ?? 0) + 1)
      deg.set(i.to,   (deg.get(i.to)   ?? 0) + 1)
    }
    return deg
  }, [thinkers, influences])

  const HUB_THRESHOLD = 3

  const visibleInfluences = useMemo(() => {
    const hiddenIds = new Set(thinkers.filter(t => hiddenSchools.has(t.schoolId)).map(t => t.id))
    return influences.filter(i =>
      !hiddenTypes.has(i.type) && !hiddenIds.has(i.from) && !hiddenIds.has(i.to)
    )
  }, [influences, hiddenTypes, hiddenSchools, thinkers])

  function toggleType(type: InfluenceType) {
    setHiddenTypes(prev => {
      const next = new Set(prev)
      next.has(type) ? next.delete(type) : next.add(type)
      return next
    })
  }
  function toggleSchool(id: string) {
    setHiddenSchools(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  if (!thinkers.length) {
    return (
      <p className="py-14 text-center font-body italic text-[--fg-dim] text-sm">
        Noch keine Einflüsse bekannt.
      </p>
    )
  }

  const detail = (() => {
    if (activeNode) {
      const t = thinkers.find(x => x.id === activeNode)
      if (t) return { eyebrow: schoolLabels[t.schoolId] ?? 'Denker', name: t.name, lifespan: t.lifespan, desc: t.description }
    }
    if (activeEdge) {
      const a = thinkers.find(x => x.id === activeEdge.from)
      const b = thinkers.find(x => x.id === activeEdge.to)
      return {
        eyebrow: INFLUENCE_LABEL[activeEdge.type],
        name: `${a?.name ?? ''} → ${b?.name ?? ''}`,
        desc: activeEdge.description,
      }
    }
    return null
  })()

  const focusId = activeNode ?? hoveredNode

  function isEdgeFocused(rel: InfluenceWithDesc) {
    if (focusId) return rel.from === focusId || rel.to === focusId
    if (activeEdge) return rel === activeEdge
    if (hoveredSchool) return false
    return false
  }
  function isNodeFocused(id: string) {
    if (focusId) {
      return id === focusId || visibleInfluences.some(
        r => (r.from === focusId && r.to === id) || (r.to === focusId && r.from === id)
      )
    }
    if (activeEdge) return id === activeEdge.from || id === activeEdge.to
    if (hoveredSchool) return thinkers.find(t => t.id === id)?.schoolId === hoveredSchool
    return false
  }
  const anyFocused = focusId !== null || activeEdge !== null || hoveredSchool !== null

  const { containerRef, wrapperRef, suppressClick, reset, zoomIn, zoomOut, handlers } =
    usePanZoom(W, H)

  function clickNode(id: string) {
    if (suppressClick.current) return
    setActiveEdge(null)
    setActiveNode(prev => prev === id ? null : id)
  }
  function clickEdge(rel: InfluenceWithDesc) {
    if (suppressClick.current) return
    setActiveNode(null)
    setActiveEdge(prev => prev === rel ? null : rel)
  }
  function clear() {
    if (suppressClick.current) return
    setActiveNode(null); setActiveEdge(null)
  }

  const hoveredTooltip = (() => {
    if (!hoveredNode) return null
    const pos = positions[hoveredNode]
    const t = thinkers.find(x => x.id === hoveredNode)
    if (!pos || !t) return null
    const color = schoolColors[t.schoolId] ?? 'var(--fg-faint)'
    const label = t.name
    const tw = label.length * 8.2 + 24
    const above = pos.y > 80
    const ty = above ? pos.y - R - 22 : pos.y + R + 38
    const tx = Math.max(tw / 2 + 8, Math.min(W - tw / 2 - 8, pos.x))
    return { pos, color, label, tw, ty, tx }
  })()

  const outgoingInfluences = activeNode ? influences.filter(i => i.from === activeNode) : []
  const incomingInfluences = activeNode ? influences.filter(i => i.to   === activeNode) : []
  const thinkerMap = Object.fromEntries(thinkers.map(t => [t.id, t]))

  return (
    <div className="tab-content">

      <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
        <span className="font-display text-2xl tracking-[0.10em] text-[--fg]">Einflüsse</span>
        <span className="font-body italic text-[14px] text-[--fg-faint] whitespace-nowrap">
          Komplexität: {currentLevel.label}
        </span>
      </div>

      <div className="flex flex-col gap-4">

        {/* Graph stage + side panel */}
        <div className="flex items-stretch">

        {/* Graph stage */}
        <div
          ref={containerRef}
          className="relative overflow-hidden border border-[--hairline] bg-[--bg-sunk] flex-1 min-w-0"
          style={{
            height:      'clamp(320px, 60dvh, 650px)',
            cursor:      'grab',
            touchAction: 'none',
            userSelect:  'none',
          }}
          {...handlers}
        >
          <div
            ref={wrapperRef}
            style={{
              position:        'absolute',
              top: 0, left: 0,
              width:           W,
              height:          H,
              transformOrigin: '0 0',
              willChange:      'transform',
            }}
          >
          <svg
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            style={{ display: 'block' }}
            onClick={clear}
          >
            <rect width={W} height={H} fill="transparent" />

            {/* Cluster halos */}
            {clusters.map(cl => {
              const color = schoolColors[cl.school] ?? 'var(--gold-soft)'
              const count = thinkers.filter(t => t.schoolId === cl.school).length
              if (count === 0) return null
              const label = (schoolLabels[cl.school] ?? cl.school).toUpperCase()
              const active = hoveredSchool === cl.school
              return (
                <g
                  key={cl.school}
                  onMouseEnter={() => setHoveredSchool(cl.school)}
                  onMouseLeave={() => setHoveredSchool(null)}
                  style={{ cursor: 'default' }}
                >
                  <ellipse
                    cx={cl.cx} cy={cl.cy} rx={cl.rx} ry={cl.ry}
                    fill={color}
                    fillOpacity={active ? 0.08 : 0.03}
                    stroke={color}
                    strokeOpacity={active ? 0.35 : 0.08}
                    strokeWidth={active ? 1 : 0.5}
                    style={{ transition: 'fill-opacity 150ms, stroke-opacity 150ms' }}
                  />
                  <text
                    x={cl.lx} y={cl.ly}
                    textAnchor={cl.ta}
                    dominantBaseline="middle"
                    fontFamily="'Marcellus SC', serif"
                    fontSize={11} letterSpacing="0.22em"
                    fontWeight={600}
                    fill={color}
                    fillOpacity={active ? 1 : 0.52}
                    style={{ transition: 'fill-opacity 150ms' }}
                  >
                    {label}
                  </text>
                </g>
              )
            })}

            {/* Edges */}
            {visibleInfluences.map((rel, i) => {
              const a = positions[rel.from], b = positions[rel.to]
              if (!a || !b) return null
              const { d, lx, ly } = curveD(a.x, a.y, b.x, b.y)
              const active = isEdgeFocused(rel)
              const dimmed = anyFocused && !active
              const stroke = INFLUENCE_COLOR[rel.type]
              const opacity = dimmed ? 0.04 : active ? 0.92 : 0.18
              const style = EDGE_STYLE[rel.type]

              return (
                <g key={i}>
                  {style.double ? (
                    <>
                      <path d={d} fill="none"
                        stroke={stroke} strokeWidth={active ? 4 : 2.5}
                        strokeOpacity={opacity}
                        style={{ transition: 'stroke-opacity 200ms' }} />
                      <path d={d} fill="none"
                        stroke={STAGE_BG} strokeWidth={active ? 1.8 : 1}
                        strokeOpacity={dimmed ? 0 : 1} />
                    </>
                  ) : (
                    <path d={d} fill="none"
                      stroke={stroke}
                      strokeWidth={active ? 2 : 1}
                      strokeOpacity={opacity}
                      strokeDasharray={style.dashArray}
                      strokeLinecap={style.lineCap ?? 'round'}
                      style={{ transition: 'stroke-opacity 200ms, stroke-width 200ms' }} />
                  )}

                  {active && (
                    <text
                      x={lx} y={ly}
                      textAnchor="middle" dominantBaseline="middle"
                      fontFamily="'Inter', system-ui, sans-serif"
                      fontStyle="italic"
                      fontSize={11}
                      fill={INFLUENCE_COLOR[rel.type]}
                      opacity={0.9}
                      pointerEvents="none"
                    >
                      {INFLUENCE_LABEL[rel.type]}
                    </text>
                  )}

                  <path d={d} fill="none" stroke="transparent" strokeWidth={22}
                    style={{ cursor: 'pointer' }}
                    onClick={e => { e.stopPropagation(); clickEdge(rel) }} />
                </g>
              )
            })}

            {/* Nodes */}
            {visibleThinkers.map(t => {
              const pos = positions[t.id]
              if (!pos) return null
              const color = schoolColors[t.schoolId] ?? 'var(--fg-faint)'
              const active = isNodeFocused(t.id)
              const dimmed = anyFocused && !active
              const shortName = nodeLabel(t.name)
              const isHub = (nodeDegree.get(t.id) ?? 0) >= HUB_THRESHOLD
              const showLabel = isHub || active

              return (
                <g
                  key={t.id}
                  style={{ cursor: 'pointer', opacity: dimmed ? 0.15 : 1, transition: 'opacity 200ms' }}
                  onClick={e => { e.stopPropagation(); clickNode(t.id) }}
                  onMouseEnter={() => setHoveredNode(t.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {active && (
                    <circle cx={pos.x} cy={pos.y} r={R + 8}
                      fill={color} fillOpacity={0.08}
                      stroke={color} strokeOpacity={0.4} strokeWidth={0.5} />
                  )}
                  <circle
                    cx={pos.x} cy={pos.y} r={R}
                    fill={STAGE_BG}
                    stroke={color}
                    strokeWidth={active ? 1.5 : 1}
                    strokeOpacity={active ? 1 : 0.72}
                    style={{ transition: 'stroke-width 200ms' }}
                  />
                  <circle cx={pos.x} cy={pos.y} r={R + 12} fill="transparent" />
                  <text
                    x={pos.x} y={pos.y}
                    textAnchor="middle" dominantBaseline="central"
                    fontFamily="'Marcellus SC', serif"
                    fontSize={11}
                    fill={color}
                    fillOpacity={active ? 1 : 0.85}
                    pointerEvents="none"
                  >
                    {t.name[0]}
                  </text>
                  {showLabel && (
                    <text
                      x={pos.x} y={pos.y + R + 13}
                      textAnchor="middle"
                      fontFamily="'Inter', system-ui, sans-serif"
                      fontSize={11}
                      fill="oklch(0.24 0.022 65)"
                      opacity={active ? 1 : isHub ? 0.72 : 0.9}
                      pointerEvents="none"
                    >
                      {shortName}
                    </text>
                  )}
                </g>
              )
            })}

            {hoveredTooltip && (
              <g pointerEvents="none">
                <rect
                  x={hoveredTooltip.tx - hoveredTooltip.tw / 2} y={hoveredTooltip.ty - 14}
                  width={hoveredTooltip.tw} height={26}
                  rx={3}
                  fill={STAGE_BG} fillOpacity={0.97}
                  stroke={hoveredTooltip.color} strokeOpacity={0.55} strokeWidth={0.75}
                />
                <text
                  x={hoveredTooltip.tx} y={hoveredTooltip.ty + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fontFamily="'Inter', system-ui, sans-serif"
                  fontSize={14}
                  fill="oklch(0.24 0.022 65)"
                  letterSpacing="0.02em"
                >
                  {hoveredTooltip.label}
                </text>
              </g>
            )}
          </svg>
          </div>
          <MapZoomControls onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={reset} />
        </div>

        {/* Side panel (desktop) */}
        {detail && (
          <aside
            className="hidden sm:flex w-[320px] shrink-0 flex-col border border-[--hairline] border-l-0 bg-[--bg-raised] overflow-y-auto"
            style={{ maxHeight: 'clamp(320px, 60dvh, 650px)' }}
          >
            {/* Panel header */}
            <div className="flex items-start justify-between gap-3 p-4 border-b border-[--hairline] shrink-0">
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-[--fg-faint]">{detail.eyebrow}</p>
                <p className="font-display text-[16px] tracking-[0.08em] text-[--fg] leading-tight">{detail.name}</p>
                {detail.lifespan && (
                  <p className="font-ui text-[10px] tracking-[0.12em] uppercase text-[--fg-dim] mt-0.5">{detail.lifespan}</p>
                )}
              </div>
              <button
                onClick={clear}
                aria-label="Schliessen"
                className="mt-0.5 shrink-0 text-[--fg-faint] hover:text-[--fg] transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <div className="p-4 border-b border-[--hairline]">
              <p className="font-prose text-[14px] leading-relaxed text-[--fg-muted]">
                <Annotated text={detail.desc} level={currentLevel.id} />
              </p>
            </div>

            {/* Outgoing influences */}
            {activeNode && outgoingInfluences.length > 0 && (
              <div className="p-4 border-b border-[--hairline]">
                <p className="section-label mb-2.5">Ausgehende Einflüsse</p>
                <div className="flex flex-col gap-1.5">
                  {outgoingInfluences.map(inf => {
                    const target = thinkerMap[inf.to]
                    return (
                      <button key={inf.to} onClick={() => clickNode(inf.to)}
                        className="flex items-start gap-2 text-left group">
                        <span className="text-[12px] mt-0.5 shrink-0" style={{ color: INFLUENCE_COLOR[inf.type] }}>→</span>
                        <div className="min-w-0">
                          <span className="font-ui text-[12px] text-[--fg-muted] group-hover:text-[--fg] transition-colors">
                            {target?.name ?? inf.to}
                          </span>
                          <span className="font-ui text-[10px] tracking-[0.12em] uppercase text-[--fg-faint] ml-1.5">
                            {INFLUENCE_LABEL[inf.type]}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Incoming influences */}
            {activeNode && incomingInfluences.length > 0 && (
              <div className="p-4">
                <p className="section-label mb-2.5">Eingehende Einflüsse</p>
                <div className="flex flex-col gap-1.5">
                  {incomingInfluences.map(inf => {
                    const source = thinkerMap[inf.from]
                    return (
                      <button key={inf.from} onClick={() => clickNode(inf.from)}
                        className="flex items-start gap-2 text-left group">
                        <span className="text-[12px] mt-0.5 shrink-0 inline-block"
                          style={{ color: INFLUENCE_COLOR[inf.type], transform: 'rotate(180deg)' }}>→</span>
                        <div className="min-w-0">
                          <span className="font-ui text-[12px] text-[--fg-muted] group-hover:text-[--fg] transition-colors">
                            {source?.name ?? inf.from}
                          </span>
                          <span className="font-ui text-[10px] tracking-[0.12em] uppercase text-[--fg-faint] ml-1.5">
                            {INFLUENCE_LABEL[inf.type]}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </aside>
        )}
        </div>{/* end flex row: canvas + panel */}

        {/* Mobile detail card */}
        <div className="sm:hidden border border-[--hairline] p-4 bg-[--bg-raised]">
          {detail ? (
            <>
              <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-[--fg-faint] mb-1.5">{detail.eyebrow}</p>
              <p className="font-display text-[17px] tracking-[0.08em] text-[--fg] mb-2.5">{detail.name}</p>
              <p className="font-prose text-[14px] leading-relaxed text-[--fg-muted]">
                <Annotated text={detail.desc} level={currentLevel.id} />
              </p>
            </>
          ) : (
            <p className="font-body italic text-[13px] text-[--fg-dim]">
              Denker oder Verbindung antippen für Details.
            </p>
          )}
        </div>

        {/* Filter legend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">

          {/* Schools filter */}
          <div className="border border-[--hairline] p-4 bg-[--bg-raised] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="section-label">Schulen</p>
              <div className="flex gap-3">
                <button onClick={() => setHiddenSchools(new Set())}
                  className="font-ui text-[10px] tracking-[0.12em] uppercase text-[--fg-faint] hover:text-[--fg-muted] transition-colors">
                  Alle
                </button>
                <button onClick={() => setHiddenSchools(new Set(visibleSchools.map(s => s.id)))}
                  className="font-ui text-[10px] tracking-[0.12em] uppercase text-[--fg-faint] hover:text-[--fg-muted] transition-colors">
                  Keine
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 max-h-[180px] overflow-y-auto pr-1">
              {visibleSchools.map(s => {
                const hidden = hiddenSchools.has(s.id)
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSchool(s.id)}
                    onMouseEnter={() => { if (!hidden) setHoveredSchool(s.id) }}
                    onMouseLeave={() => setHoveredSchool(null)}
                    className="flex items-center gap-2 font-ui text-[11px] text-left w-full transition-opacity"
                    style={{ opacity: hidden ? 0.28 : 1, color: 'var(--fg-faint)' }}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                    <span style={{ textDecoration: hidden ? 'line-through' : 'none' }}>{s.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Influence type filter */}
          <div className="border border-[--hairline] p-4 bg-[--bg-raised] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="section-label">Einfluss-Typ</p>
              <div className="flex gap-3">
                <button onClick={() => setHiddenTypes(new Set())}
                  className="font-ui text-[10px] tracking-[0.12em] uppercase text-[--fg-faint] hover:text-[--fg-muted] transition-colors">
                  Alle
                </button>
                <button onClick={() => setHiddenTypes(new Set(Object.keys(INFLUENCE_LABEL) as InfluenceType[]))}
                  className="font-ui text-[10px] tracking-[0.12em] uppercase text-[--fg-faint] hover:text-[--fg-muted] transition-colors">
                  Keine
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {(Object.entries(INFLUENCE_LABEL) as [InfluenceType, string][]).map(([type, label]) => {
                const style = EDGE_STYLE[type]
                const hidden = hiddenTypes.has(type)
                return (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className="flex items-center gap-3 font-ui text-[11px] text-left transition-opacity"
                    style={{ opacity: hidden ? 0.28 : 1, color: 'var(--fg-faint)' }}
                  >
                    <svg width="28" height="12" className="flex-shrink-0">
                      {style.double ? (
                        <>
                          <line x1="0" y1="6" x2="28" y2="6"
                            stroke={INFLUENCE_COLOR[type]} strokeWidth="3" strokeOpacity="0.8" />
                          <line x1="0" y1="6" x2="28" y2="6"
                            stroke={STAGE_BG} strokeWidth="1.2" />
                        </>
                      ) : (
                        <line x1="0" y1="6" x2="28" y2="6"
                          stroke={INFLUENCE_COLOR[type]} strokeWidth="1.5"
                          strokeDasharray={style.dashArray}
                          strokeLinecap={style.lineCap ?? 'round'}
                          strokeOpacity="0.85" />
                      )}
                    </svg>
                    <span style={{ textDecoration: hidden ? 'line-through' : 'none' }}>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
