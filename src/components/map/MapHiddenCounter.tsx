interface Props {
  hidden: number
  /** "Ort" or "weiterer Ort" — singular form. Plural appends "e". */
  noun?: { singular: string; plural: string }
  className?: string
}

export function MapHiddenCounter({
  hidden,
  noun = { singular: 'weiterer Ort', plural: 'weitere Orte' },
  className = 'font-body italic text-xs text-[--fg-dim] mt-4',
}: Props) {
  if (hidden <= 0) return null
  return (
    <p className={className}>
      {hidden} {hidden === 1 ? noun.singular : noun.plural} noch unentdeckt …
    </p>
  )
}
