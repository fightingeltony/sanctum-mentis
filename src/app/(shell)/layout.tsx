import Link from 'next/link'
import HeaderSearchButton from '@/components/HeaderSearchButton'

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: [
          'radial-gradient(ellipse at 30% 20%, oklch(0.90 0.030 75 / 0.5) 0%, transparent 60%)',
          'radial-gradient(ellipse at 70% 80%, oklch(0.86 0.028 75 / 0.4) 0%, transparent 55%)',
        ].join(', '),
      }}
    >
      {/* ── Header ── */}
      <header className="border-b border-[--hairline]">
        <div className="max-w-[1100px] mx-auto px-8 md:px-12 py-5 flex items-baseline justify-between gap-6">
          <Link
            href="/"
            className="font-display text-[14px] tracking-[0.22em] uppercase text-[--fg]
              hover:text-[--gold] transition-colors no-underline"
          >
            Sanctum · Mentis
          </Link>
          <nav className="flex items-baseline gap-6">
            <Link
              href="/themen"
              className="font-ui text-[11px] tracking-[0.16em] uppercase text-[--fg-muted]
                hover:text-[--fg] transition-colors no-underline"
            >
              Themen
            </Link>
            <HeaderSearchButton />
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
      <footer className="border-t border-[--hairline] mt-12">
        <div className="max-w-[1100px] mx-auto px-8 md:px-12 py-8 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-3">
            <p className="font-body italic text-[13px] text-[--fg-dim]">
              Sanctum Mentis — eine Bibliothek der großen Fragen.
            </p>
            <p className="font-ui text-[10px] tracking-[0.16em] uppercase text-[--fg-faint]">
              Alpha
            </p>
          </div>
          <p className="font-ui text-[11px] tracking-[0.04em]" style={{ color: 'var(--fg-faint)' }}>
            <Link
              href="/lebensfragen"
              className="no-underline hover:text-[--fg-muted] transition-colors"
            >
              Lebensfragen
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
