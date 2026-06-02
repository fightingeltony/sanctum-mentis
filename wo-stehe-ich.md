# Wo stehe ich — Sanctum Mentis

**Stand:** 1.6.26 (aktualisiert nach Einsamkeit-Lebensfrage)

---

## Was live ist

**Zwölf Tableaus** — alle auf Vercel, alle vollständig ausgebaut:

- **Philosophie des Geistes** — Hard-Modus, 16 Denker. Das akademisch dichteste Tableau. Einstieg über Descartes historisch korrekt, aber möglicherweise kopflastig für Nicht-Akademiker.
- **Die Landkarte des Selbst** — Mild-Modus, 15 Denker. Meditativer Ton, gut gelungen. Vedanta/Buddhismus als gleichwertige Stimmen.
- **Realismus und Konstruktivismus** — Mild-Modus, 13 Denker. Gabriel als zeitgenössischer Abschluss funktioniert gut.
- **Ethik** — Mild-Modus, 13 Denker. Architektonisch gesetzt (nicht aus persönlichem Anker gewachsen) — bewusste Entscheidung, dokumentiert.
- **Existenzialismus** — Mild-Modus, 13 Denker. Gewachsener Anker. Frankl-Sartre-Streit als kuratorische Pointe. Eröffnet die Existenz-Spur der Sammlung. Konzept-Echo-Pattern erstmals systematisch: Fiktive Endorientierung mit Adler-Verweis.
- **Politische Philosophie** — Mild-Modus, 13 Denker. Zweites Tableau der Handlungs-Spur — macht die Handlungs-Spur erstmals zur echten Gruppe.
- **Lebenskunst** — Mild-Modus, 14 Denker. Existenz-Spur (hue 65). Vier Ecken klar besetzt (Epikur, Aristoteles, Stoa, Montaigne/Mill/Csíkszentmihályi). Erster systematischer Einsatz des `related_topics`-Musters.
- **Begegnung** — Mild-Modus, 11 Denker. Existenz-Spur (hue 35). Buber als Haupt-Hub, Sartre als negativer Gegen-Hub. Reifstes Tableau der Serie (externe Prüfung: Koordinatentest auf Anhieb bestanden, keine Strukturfehler).
- **Wandlung** — Mild-Modus, 11 Denker. Wandlung-Spur (hue 152) — eröffnet die **vierte Sammlungs-Spur**. Freud/Rogers/Perls/Kabat-Zinn als Hubs. Achsen: Verstehen ↔ Erfahren / individuell ↔ relational.
- **Verwandlung** — Mild-Modus, 10 Denker. Wandlung-Spur (hue 156) — **zweites Wandlung-Tableau**. Rilke als erster Dichter-Knoten der Sammlung (Hub, lectio_brief-Stimme). Eckhart als Scharnier-Hub. Achsen: Krise ↔ Praxis / Selbst-getrieben ↔ Welt-getroffen. Drei-Denker-Schule `kontemplative-tradition` (Eckhart/Tolle/Thich Nhat Hanh). Externe Prüfung: „strukturell und tonal das sauberste Tableau der Serie." Wandlung-Spur hat jetzt 2 Tableaus — **Section-Header-Bedingung für diese Spur erfüllt**.
- **Gut und Böse** — Mild-Modus, 11 Denker. Menschenbild-Spur (hue 345, Magenta) — eröffnet die **fünfte Sammlungs-Spur**. Achsen: Menschenbild (gut ↔ böse von Natur) / Ebene (individuell-ontologisch ↔ sozial-situativ). Lectio `stell-die-frage-anders` (destruktiv-aufbauend, L3, 5 Stationen).
- **Das Selbstverhältnis** — Mild-Modus, 11 Denker. Existenz-Spur (hue 71) — staffelt eng an Lebenskunst 65 an. Achsen: Annehmen ↔ Überwinden / Gabe ↔ Errungen. Zwei Quersteller (Buddhismus + IFS) plus Metzinger (L5) als naturalistische Außenanfrage. Zwei Prüfrunden: Stufenverteilung L1–L5 vollständig belegt, Adler gestrichen (Achsen-Konsistenz), `bedingungslose-wertschaetzung` gestrichen. Existenz-Spur hat jetzt vier Tableaus.

**Dreizehn Lectios** — geführte Pfade, alle live:

- `hard-problem` — Geist, narrativ-historisch, L2, 6 Stationen
- `wer-beobachtet` — Selbst, konkurrierend-konfrontativ, L3, 4 Stationen (expositorischer Ton)
- `findest-du-oder-machst-du` — Selbst, dialektisch-revidierend, L3, 5 Stationen
- `wenn-die-welt-wackelt` — Realismus, emotional-kumulativ, L2, 6 Stationen
- `warum-sollst-du` — Ethik, destruktiv-aufbauend, L2, 4 Stationen
- `wenn-nichts-vorgegeben` — Existenzialismus, narrativ-historisch, L2, 5 Stationen (Nietzsche → Kierkegaard → Sartre → Frankl → Camus)
- `warum-gehorchst-du` — Politische Philosophie, L3, 5 Stationen
- `ruhe-oder-rausch` — Lebenskunst, L2, 4 Stationen
- `der-weg-des-menschen` — Begegnung, kontemplativ-vertiefend, L2, 4 Stationen — erste Ein-Werk-Lectio (drei Stationen durch denselben Buber-Knoten via `step_brief`)
- `ist-der-andere-hoelle-oder-heimat` — Begegnung, konkurrierend-konfrontativ, L3, 4 Stationen (Sartre → Hegel → Buber+Marcel → Lévinas)
- `verstehen-oder-weitergehen` — Wandlung, narrativ-historisch, L3, 5 Stationen (alle via step_brief)
- `stell-die-frage-anders` — Gut/Böse, destruktiv-aufbauend, L3, 5 Stationen
- `wer-bist-du-wenn-du-alles-weglaesst` — Selbst, konkurrierend-konfrontativ, L2, 4 Stationen — **erster Test des erzählend-erfahrenden Tons** (Vergleichsfall zu `wer-beobachtet`; eigene Render-Komponente `LectioNarrativeViewer`)

**Lectio-Methode:** `prompts/lectio-mode.md` v1.9 — zehn Entscheidungen, vier kanonisierte Pfad-Typen. Schema-Erweiterungen seit v1.9: `step_brief` (pro-Station-Text), `path_type` (Datenwert), `ton` (expositorisch / erzählend-erfahrend), `LectioNarrative`-Interface. *Kontemplativ-vertiefend* ist als Datenwert gesetzt (Begegnung), noch nicht in der Methode kanonisiert — wartet auf 2. Fall. *Erzählend-erfahrend* ist im Code vollständig gebaut, wartet auf Test-Bestätigung für v1.10.

**Landing Page** hat ein lebendiges Tableau (HeroTableau-Komponente: animiert Das-Selbst-Konzepte Band für Band), eine Lectio-Sektion und erklärt den Unterschied zwischen Karte und Lectio.

**Landing Page** hat eine Lectio-Sektion ("Zwei Wege durch jedes Thema") und erklärt den Unterschied zwischen Karte und Lectio ohne Versprechen.

---

## Was sich gut anfühlt

- Die Erkenntnis-Trias ist geschlossen (Geist / Selbst / Realismus). Beide Handlungs-Tableaus stehen (Ethik + Politische Philosophie), und die Existenz-Spur ist mit drei Tableaus (Existenzialismus, Lebenskunst, Begegnung) die breiteste geworden.
- Mit Wandlung ist die **vierte Sammlungs-Spur** eröffnet, mit Gut/Böse die **fünfte (Menschenbild)**. Die Library-Sichtbarkeits-Bedingung (alle Spuren ≥2 Tableaus) ist **fast erfüllt**: Wandlung-Spur hat jetzt 2 Tableaus (Wandlung + Verwandlung), Menschenbild noch 1 (Gut/Böse). Explizite Section-Header warten auf das zweite Menschenbild-Tableau.
- Die Existenz-Palette ist abgeschlossen: drei warme Hues mit klarer Staffelung (Begegnung 35 · Existenzialismus 45 · Lebenskunst 65). Die Farb-Frage, die monatelang offen war, ist gelöst.
- Die Lectio-Methode hat sich in neun Durchläufen bewährt. Mit Begegnung ist die erste Ein-Werk-Lectio entstanden — ein neuer Pfad-Typ, den ich bewusst *nicht* sofort kanonisiert habe. Das fühlt sich nach kuratorischer Reife an: erst destillieren, wenn ein zweiter Fall ihn bestätigt, nicht beim ersten Wurf postulieren.
- Begegnung ist das reifste Tableau der Serie. Der gewachsene Anker (Bubers „Weg des Menschen", die Retraite-Erfahrung „Wo bist du?") trägt bis in die Lectio hinein, die zum Eingangsmotiv zurückkehrt.
- `bibliothek-architektur.md` hält das kuratorische Selbstverständnis fest — "Bibliothek mit Haltung, ohne Wahrheitsanspruch" bleibt die richtige Formulierung.

---

## Was noch offen ist

**Außenfeedback (erste Runde):** Monique (Coach, Persona-Kern) hat in zwei Runden substantielles Feedback geliefert — siehe `feedback-runde-1.md`. Sie hat die Lectio-Form als tragend bestätigt, die Lebensfragen-Frage ausgelöst und die Wahrheitsanspruchs-Konvention von außen erfahren (nicht gelesen). Das ist kein formaler User-Test, aber echte Persona-Resonanz mit konkreten Konsequenzen (Selbst-Lectio II, Lebensfragen-Form). Der **formale User-Test** (zwei Personen aus der Persona, ohne Erklärung beobachten) ist damit noch ausständig — bleibt priorisierter nächster Schritt.

**Lebensfragen-Library-Sektion:** Live — vier Lebensfragen in eigener Sektion „Ein Weg quer hindurch" (Schmerz · Tod · Einsamkeit · Veränderung). Veränderung ist mit 8 Stimmen aus 5 Tableaus die breiteste der Sammlung. Footer-Link-Phase abgeschlossen.

**Library-Architektur sichtbar machen (Tableau-Spuren):** Bedingung fast erfüllt — Wandlung hat jetzt 2 Tableaus, nur Menschenbild steht noch bei 1. Implizite Hybrid-Lösung (Farbe, Reihenfolge, Eyebrow) trägt für fünf Spuren. Explizite Lösung (Section-Header / Trennstriche / Spur-Filter) umsetzbar, sobald alle Spuren ≥2 Tableaus haben.

**Methoden-Hygiene (lectio-mode.md):** Steht auf v1.9. Drei Klarstellungen aus dem Existenzialismus-Bau warten weiter auf Aufnahme (Pfad-Typ-Destillation, narrativ-historisch ≠ chronologisch streng, Reserve-Brief-Dokumentation). Dazu neu: der fünfte Pfad-Typ *kontemplativ-vertiefend* + die `step_brief`-Disziplin — Aufnahme als v1.10, sobald eine zweite kontemplativ-vertiefende Lectio existiert.

**Schulen-Labels Geist:** Akademisches Vokabular an der Tür. Kein Blocker, aber bekannter Qualitätsmangel.

**Glossar-Tab (Tab V):** Über 170 Annotationen, noch kein zentrales Glossar. Vorarbeit ist gemacht.

**JSON-Validator beim Build:** Der levels-Format-Fehler im Begegnung-Bau (Slider zeigte keine Stufen, weil `level` statt `id` im JSON stand) hat eine blinde Stelle sichtbar gemacht — JSONs werden per `as unknown as` eingebunden, tsc prüft die Struktur nicht. Ein zod-Schema + Referenz-Integritäts- + Koordinaten-Check beim Build würde solche Fehler fangen, bevor sie still im Browser landen.

---

## Was mich aktuell beschäftigt

Der Partnerin-Test läuft — drei Lectios (darunter die neue erzählende Form `wer-bist-du-wenn-du-alles-weglaesst` im direkten Vergleich mit `wer-beobachtet`). Was auf dem Spiel steht: nicht Schönheit, sondern Tiefe. Bleibt jemand dran? Erkennt sich jemand in einer Stimme wieder? Das Ergebnis entscheidet, ob der erzählende Ton zum neuen Standard wird und die anderen ~10 Lectios in dieselbe Form überführt werden. **Sobald ein Ergebnis vorliegt, gehört es nach `feedback-runde-1.md`** — dort lebt die Feedback-Geschichte, hier nur der Stand.

Die Sammlung hat jetzt elf Tableaus, fünf Spuren, dreizehn Lectios und eine neue Lectio-Form. Was ich nicht weiß: Ob der Discovery-Pfad (Bibliothek → Tableau → Lectio) für jemanden ohne Vorwissen trägt. Der formale User-Test — zwei Personen aus der Persona, ohne Erklärung beobachten — ist weiterhin ausständig.

Die Farb-Frage hat sich beruhigt, die Existenz-Spur fühlt sich voll an (drei Tableaus). Die offene Frage ist jetzt: Wann hört eine Spur auf zu wachsen? Das ist keine technische Frage, sondern eine kuratorische — und sie ist für Wandlung und Menschenbild noch nicht gestellt worden, weil beide Spuren gerade erst begonnen haben.
