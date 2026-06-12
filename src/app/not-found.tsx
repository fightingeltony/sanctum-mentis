import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="px-8 py-24 max-w-[600px] mx-auto flex flex-col gap-6">
      <p className="font-ui text-[11px] tracking-[0.28em] uppercase" style={{ color: 'var(--accent)' }}>
        404
      </p>
      <h1 className="font-display text-[32px] md:text-[40px]" style={{ color: 'var(--fg)', letterSpacing: '0.06em' }}>
        Nicht gefunden
      </h1>
      <p className="font-body text-[17px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
        Diese Seite gibt es nicht — oder noch nicht.
      </p>
      <Link
        href="/"
        className="self-start inline-flex items-center gap-2 font-ui text-[12px] tracking-[0.18em] uppercase no-underline"
        style={{ color: 'var(--accent)' }}
      >
        Zur Bibliothek
        <span aria-hidden>→</span>
      </Link>
    </div>
  )
}
