import Link from 'next/link'

export default function LandingPage() {
  return (
    <section className="px-8 md:px-12 py-16 md:py-28 max-w-[820px] mx-auto">

      <p className="font-ui text-[11px] tracking-[0.30em] uppercase text-[--accent] mb-6">
        Sanctum Mentis
      </p>

      <h1
        className="font-prose font-medium text-[36px] md:text-[52px] leading-[1.1] text-[--fg] mb-8"
        style={{ textWrap: 'balance' } as React.CSSProperties}
      >
        Lerne Philosophie auf deinem Tempo.
      </h1>

      <p className="font-body text-[18px] md:text-[20px] text-[--fg-muted] leading-relaxed mb-10 max-w-[60ch]">
        Ein Komplexitäts-Slider steuert, wie tief jede Antwort ausfällt — von der
        Einsteigerkurzfassung bis zur fachlichen Synthese. Denker, Einflüsse und
        die zentralen Konzepte werden so freigeschaltet, wie du bereit bist.
      </p>

      <div className="flex flex-wrap gap-4 mb-16">
        <Link
          href="/themen"
          className="inline-flex items-center gap-2 px-5 py-3 border font-ui text-[12px] tracking-[0.18em] uppercase
            no-underline transition-colors"
          style={{
            color: 'var(--accent)',
            borderColor: 'var(--accent)',
          }}
        >
          Bibliothek öffnen
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/thema/erkenntnistheorie"
          className="inline-flex items-center gap-2 px-5 py-3 border border-[--hairline] font-ui text-[12px] tracking-[0.18em] uppercase
            text-[--fg-muted] hover:text-[--fg] no-underline transition-colors"
        >
          Direkt zur Erkenntnistheorie
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-[--hairline]">
        {[
          {
            num: 'I',
            title: 'Slider statt Suche',
            text: 'Stell ein, wie tief du gehen willst — der Inhalt passt sich an, nicht umgekehrt.',
          },
          {
            num: 'II',
            title: 'Einflüsse als Karte',
            text: 'Wer kritisierte wen? Wer war Schüler von wem? Im Graph wird der Streit sichtbar.',
          },
          {
            num: 'III',
            title: 'Konzepte verortet',
            text: 'Jeder Begriff bekommt eine Position im Quadranten-Raum — du siehst auf einen Blick, wo er steht.',
          },
        ].map(item => (
          <div key={item.num} className="flex flex-col gap-2">
            <span className="font-display text-[12px] tracking-[0.20em] text-[--gold]">
              {item.num}
            </span>
            <h3 className="font-prose font-medium text-[16px] text-[--fg]">
              {item.title}
            </h3>
            <p className="font-body text-[14px] text-[--fg-muted] leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
