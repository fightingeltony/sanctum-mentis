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
        Komplexe Ideen. Endlich klar verortet.
      </h1>

      <p className="font-body text-[18px] md:text-[20px] text-[--fg-muted] leading-relaxed mb-5 max-w-[60ch]">
        Bücher, Suchmaschinen, KI — alles Wissen der Welt ist heute zur Hand.
        Was uns fehlt, ist Kontext. Die Möglichkeit, ein Thema einmal zu Ende
        zu verstehen — Punkte zu setzen, Erkenntnisse landen zu lassen.
      </p>
      <p className="font-body text-[18px] md:text-[20px] text-[--fg-muted] leading-relaxed mb-10 max-w-[60ch]">
        Sanctum Mentis macht aus dem Gewirr eine Karte. Jedes Thema der
        Ideengeschichte wird zu einer interaktiven Landschaft, in der Denker,
        Konzepte und ihre Konflikte sichtbar werden. Du wählst die Tiefe —
        vom Einstieg bis zur Synthese.
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
          href="/lebensfragen"
          className="inline-flex items-center gap-2 px-5 py-3 border border-[--hairline] font-ui text-[12px] tracking-[0.18em] uppercase
            text-[--fg-muted] hover:text-[--fg] no-underline transition-colors"
        >
          Lebensfragen
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-[--hairline]">
        {[
          {
            num: 'I',
            title: 'Komplexität auf Abruf',
            text: 'Du bestimmst die Tiefe. Statt dich sofort mit Fachjargon zu überladen, wächst der Inhalt mit deinem Verständnis mit – vom einfachen Einstiegs-Überblick bis zur tiefen akademischen Synthese.',
          },
          {
            num: 'II',
            title: 'Die Debatte im Fokus',
            text: 'Ideen entstehen durch Reibung. Erkenne sofort, wer auf wem aufbaut und wo Weltanschauungen hart aufeinanderprallen. Der abstrakte Streit der Denker wird visuell greifbar.',
          },
          {
            num: 'III',
            title: 'Wissen räumlich verankert',
            text: 'Konzepte schweben nicht länger im luftleeren Raum. Jede Idee findet ihren Platz im Koordinatensystem — und du siehst, wie sie zusammenhängt mit den anderen. Erst dort, im Zusammenhang, lässt sich Wissen zu Ende denken.',
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

      {/* ── Zwei Wege ── */}
      <div className="mt-16 pt-10 border-t border-[--hairline]">
        <h2 className="font-prose font-medium text-[17px] md:text-[19px] text-[--fg] mb-2">
          Zwei Wege durch jedes Thema
        </h2>
        <p className="font-body italic text-[15px] text-[--fg-muted] mb-8 max-w-[52ch]">
          Manche Themen liest man besser räumlich, andere als Reise.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Karte */}
          <div
            className="rounded px-5 pt-5 pb-6 flex flex-col gap-4"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--hairline)' }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <line x1="16" y1="3" x2="16" y2="29" stroke="currentColor" strokeOpacity="0.2" />
              <line x1="3" y1="16" x2="29" y2="16" stroke="currentColor" strokeOpacity="0.2" />
              <circle cx="9"  cy="9"  r="2"   fill="currentColor" fillOpacity="0.45" />
              <circle cx="23" cy="11" r="2"   fill="currentColor" fillOpacity="0.45" />
              <circle cx="11" cy="23" r="1.5" fill="currentColor" fillOpacity="0.45" />
              <circle cx="22" cy="22" r="2"   fill="currentColor" fillOpacity="0.45" />
              <circle cx="21" cy="7"  r="1.5" fill="currentColor" fillOpacity="0.45" />
            </svg>
            <div>
              <h3 className="font-prose font-medium text-[14px] text-[--fg] mb-2">Die Karte</h3>
              <p className="font-body text-[13px] text-[--fg-muted] leading-relaxed">
                Die Karte zeigt das ganze Feld auf einmal. Denker, Konzepte, Schulen — alles gleichzeitig sichtbar. Du erkundest selbst, wohin du gehst, wählst die Tiefe und folgst deiner eigenen Frage.
              </p>
            </div>
          </div>

          {/* Lectio */}
          <div
            className="rounded px-5 pt-5 pb-6 flex flex-col gap-4"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--hairline)' }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <line x1="16" y1="7" x2="16" y2="25" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="2 2" />
              <circle cx="16" cy="7"  r="2.5" fill="currentColor" fillOpacity="0.55" />
              <circle cx="16" cy="16" r="2.5" fill="currentColor" fillOpacity="0.42" />
              <circle cx="16" cy="25" r="2.5" fill="currentColor" fillOpacity="0.30" />
            </svg>
            <div>
              <h3 className="font-prose font-medium text-[14px] text-[--fg] mb-2">Die Lectio</h3>
              <p className="font-body text-[13px] text-[--fg-muted] leading-relaxed">
                Die Lectio führt dich durch einen kuratierten Pfad. Vier bis sechs Stationen aus dem Tableau, ein Bogen, ein offenes Ende. Nicht alle Denker, sondern die, die zusammen eine Frage tragen. Die Karte bleibt offen für alles, was die Lectio weglässt.
              </p>
            </div>
          </div>

        </div>

        <p className="font-body italic text-[12px] text-[--fg-faint] mt-5">
          Komplementär, nicht alternativ.
        </p>
      </div>

    </section>
  )
}
