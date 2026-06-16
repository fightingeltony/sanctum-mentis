# Wo stehe ich — Sanctum Mentis

**Stand:** 16.6.26 (aktualisiert nach Audit-Zyklus + Bild-Fixes)

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

**Fünfzehn Lectios** — geführte Pfade, alle live (15 aktiv; 6 deaktivierte -expositorisch-Varianten im Ordner, nicht eingebunden):

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
- `vom-wissen-zum-glauben` — Verwandlung, konkurrierend-konfrontativ, L3, 6 Stationen — **zweiter Belegfall erzählend-erfahrend** (Augustinus → Stoa → Rilke → Eckhart → James → Jung; Tonwechsel bei James bewusst markiert; durchlaufende Figur: die Glaswand)
- `annehmen-oder-ueberwinden` — Selbstverhältnis, konkurrierend-konfrontativ, L2, 4 Stationen — **dritter Belegfall erzählend-erfahrend** (Rogers → Nietzsche → Marc Aurel → Buddhismus; Abendszene als durchlaufende Figur; mit image_prompts)

**Lectio-Navigation:** `LectioNarrativeViewer` hat sichtbaren Zurück-Button im Footer (drei Spalten: ← zurück · Dots · weiter →), `← Verlassen`-Button (Border-Box, top-left), und `Erzählend`-Badge auf Lectio-Karten + in der Schwelle-Metazeile.

**Lectio-Prosa:** `prompts/schreib-skill-lectio.md` (neu) — Handwerkskasten für Lectio-Prosa (Satzrhythmus, Variation, Belegbeispiele, Fehler-Katalog). `prompts/lectio-2.0-richtlinie.md` aktualisiert (Regel 1 + 4: Rhythmus statt Kürze, Schreib-Skill als vorgelagerte Instanz). Beide Lectios rhythmisch überarbeitet (wer-bist-du: Sofa-Intro + alle 4 Stationen; vom-wissen-zum-glauben: Glaswand-Figur + alle 6 Stationen).

**Lectio-Methode:** `prompts/lectio-anleitung.md` — **maßgebliche Bau-Anleitung** (Stand 14.6.26), konsolidiert aus lectio-mode v1.10 + 2.0-Richtlinie + Schreib-Skill. Bewährt durch vollen Bau `annehmen-oder-ueberwinden` + zwei closing_kernel-Bauten. `lectio-mode.md` (v1.11) und `lectio-2.0-richtlinie.md` als Archiv markiert. `closing_kernel` auf zwei Lectios gesetzt (wer-bist-du + vom-wissen-zum-glauben). *Kontemplativ-vertiefend* wartet auf 2. Fall.

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

**Außenfeedback (erste Runde) ✓ abgeschlossen:** Partnerin-Test abgehakt. Erzählend-erfahrend-Ton bestätigt — Kanonisierung als v1.10 kann jetzt erfolgen. Der **formale User-Test** (zwei Personen aus der Persona, ohne Erklärung beobachten) bleibt ausständig.

**Lebensfragen-Library-Sektion:** Live — vier Lebensfragen in eigener Sektion „Ein Weg quer hindurch" (Schmerz · Tod · Einsamkeit · Veränderung). Veränderung ist mit 8 Stimmen aus 5 Tableaus die breiteste der Sammlung. Footer-Link-Phase abgeschlossen.

**Library-Architektur sichtbar machen (Tableau-Spuren):** Bedingung fast erfüllt — Wandlung hat jetzt 2 Tableaus, nur Menschenbild steht noch bei 1. Implizite Hybrid-Lösung (Farbe, Reihenfolge, Eyebrow) trägt für fünf Spuren. Explizite Lösung (Section-Header / Trennstriche / Spur-Filter) umsetzbar, sobald alle Spuren ≥2 Tableaus haben.

**Methoden-Hygiene:** `lectio-anleitung.md` ist maßgeblich (Stand 14.6.26). `lectio-mode.md` (v1.11) und `lectio-2.0-richtlinie.md` als Archiv markiert. Der fünfte Pfad-Typ *kontemplativ-vertiefend* wartet auf zweiten Fall vor Kanonisierung.

**Schulen-Labels Geist:** Akademisches Vokabular an der Tür. Kein Blocker, aber bekannter Qualitätsmangel.

**Glossar-Tab (Tab V):** Über 170 Annotationen, noch kein zentrales Glossar. Vorarbeit ist gemacht.

**JSON-Validator beim Build:** Der levels-Format-Fehler im Begegnung-Bau (Slider zeigte keine Stufen, weil `level` statt `id` im JSON stand) hat eine blinde Stelle sichtbar gemacht — JSONs werden per `as unknown as` eingebunden, tsc prüft die Struktur nicht. Ein zod-Schema + Referenz-Integritäts- + Koordinaten-Check beim Build würde solche Fehler fangen, bevor sie still im Browser landen.

---

## Was mich aktuell beschäftigt

Der Audit-Zyklus dieser Session ist abgeschlossen: CLAUDE.md zeigt jetzt korrekt auf `lectio-anleitung.md` (H1+H2), 6 expositorische Vorläufer liegen in `archiv/lectio-expositorisch/` (H3), Vitest-Regel 10 sichert Registrierungs-Parität gegen Wiederkehr, leere Bild-Nischen im Deploy sind durch 10 committete PNGs behoben. `audit-bestandesaufnahme.md` ist der Status-Tracker für offene Audit-Punkte (M1–N3, nicht in backlog.md doppeln).

Die offene Bau-Arbeit: zweite Selbstverhältnis-Lectio (Werk/Gabe-Diagonale) und zweites Menschenbild-Tableau (Section-Header-Bedingung). Der formale User-Test — zwei Personen aus der Persona, ohne Erklärung beobachten — bleibt ausständig.
