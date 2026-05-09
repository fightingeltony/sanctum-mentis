interface Props {
  x: number
  y: number
  /** Stroke/fill color for compass lines and labels */
  stroke: string
  /** Optional pointer fill (defaults to stroke) */
  pointer?: string
  /** Container opacity */
  opacity?: number
  /** Show full N/S/W/O labels (default: only N) */
  fullLabels?: boolean
}

export function MapCompass({
  x, y, stroke, pointer = stroke, opacity = 0.5, fullLabels = false,
}: Props) {
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      <circle r={14} fill="none" stroke={stroke} strokeWidth="0.5" strokeOpacity="0.8" />
      <line x1="0" y1="-14" x2="0"  y2="14"  stroke={stroke} strokeWidth="0.5" />
      <line x1="-14" y1="0" x2="14" y2="0"   stroke={stroke} strokeWidth="0.5" />
      <polygon points="0,-14 2,-6 0,-8 -2,-6" fill={pointer} />
      {fullLabels ? (
        <>
          <text y="-18" textAnchor="middle" dominantBaseline="auto"
            fontFamily="'Cinzel Decorative', serif" fontSize={8.5} letterSpacing="0.08em" fill={stroke}>N</text>
          <text y="22"  textAnchor="middle" dominantBaseline="hanging"
            fontFamily="'Cinzel Decorative', serif" fontSize={8.5} letterSpacing="0.08em" fill={stroke}>S</text>
          <text x="-20" y="0" textAnchor="end" dominantBaseline="central"
            fontFamily="'Cinzel Decorative', serif" fontSize={8.5} letterSpacing="0.08em" fill={stroke}>W</text>
          <text x="20"  y="0" textAnchor="start" dominantBaseline="central"
            fontFamily="'Cinzel Decorative', serif" fontSize={8.5} letterSpacing="0.08em" fill={stroke}>O</text>
        </>
      ) : (
        <text y="-18" textAnchor="middle"
          fontFamily="'Cinzel Decorative', serif" fontSize={9} letterSpacing="0.1em" fill={stroke} opacity="0.6">N</text>
      )}
    </g>
  )
}
