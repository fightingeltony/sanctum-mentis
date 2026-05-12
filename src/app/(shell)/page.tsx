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
+        Bücher, Suchmaschinen, KI — alles Wissen der Welt ist heute zur Hand.
+        Was uns fehlt, ist Kontext. Die Möglichkeit, ein Thema einmal zu Ende
+        zu verstehen — Punkte zu setzen, Erkenntnisse landen zu lassen.
+      </p>
+      <p className="font-body text-[18px] md:text-[20px] text-[--fg-muted] leading-relaxed mb-10 max-w-[60ch]">
+        Sanctum Mentis macht aus dem Gewirr eine Karte. Jedes Thema der
+        Ideengeschichte wird zu einer interaktiven Landschaft, in der Denker,
+        Konzepte und ihre Konflikte sichtbar werden. Du wählst die Tiefe —
+        vom Einstieg bis zur Synthese.
+      </p>

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
          href="/thema/philosophie-des-geistes"
          className="inline-flex items-center gap-2 px-5 py-3 border border-[--hairline] font-ui text-[12px] tracking-[0.18em] uppercase
            text-[--fg-muted] hover:text-[--fg] no-underline transition-colors"
        >
          Direkt zur Philosophie des Geistes
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
            text: 'Konzepte schweben nicht länger im luftleeren Raum. Jede Idee erhält einen logischen Platz im Koordinatensystem, damit dein Gehirn das "Big Picture" intuitiv abspeichern kann.',
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
