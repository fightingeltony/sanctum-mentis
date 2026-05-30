# Wo stehe ich — Sanctum Mentis

**Stand:** 30.5.26

---

## Was live ist

**Acht Tableaus** — alle auf Vercel, alle vollständig ausgebaut:

- **Philosophie des Geistes** — Hard-Modus, 16 Denker. Das akademisch dichteste Tableau. Einstieg über Descartes historisch korrekt, aber möglicherweise kopflastig für Nicht-Akademiker.
- **Die Landkarte des Selbst** — Mild-Modus, 15 Denker. Meditativer Ton, gut gelungen. Vedanta/Buddhismus als gleichwertige Stimmen.
- **Realismus und Konstruktivismus** — Mild-Modus, 13 Denker. Gabriel als zeitgenössischer Abschluss funktioniert gut.
- **Ethik** — Mild-Modus, 13 Denker. Architektonisch gesetzt (nicht aus persönlichem Anker gewachsen) — bewusste Entscheidung, dokumentiert.
- **Existenzialismus** — Mild-Modus, 13 Denker. Gewachsener Anker. Frankl-Sartre-Streit als kuratorische Pointe. Eröffnet die Existenz-Spur der Sammlung. Konzept-Echo-Pattern erstmals systematisch: Fiktive Endorientierung mit Adler-Verweis.
- **Politische Philosophie** — Mild-Modus, 13 Denker. Zweites Tableau der Handlungs-Spur — macht die Handlungs-Spur erstmals zur echten Gruppe.
- **Lebenskunst** — Mild-Modus, 14 Denker. Existenz-Spur (hue 65). Vier Ecken klar besetzt (Epikur, Aristoteles, Stoa, Montaigne/Mill/Csíkszentmihályi). Erster systematischer Einsatz des `related_topics`-Musters.
- **Begegnung** — Mild-Modus, 11 Denker. Existenz-Spur (hue 35). Buber als Haupt-Hub, Sartre als negativer Gegen-Hub. Reifstes Tableau der Serie (externe Prüfung: Koordinatentest auf Anhieb bestanden, keine Strukturfehler).

**Neun Lectios** — geführte Pfade, alle live:

- `hard-problem` — Geist, narrativ-historisch, L2, 6 Stationen
- `wer-beobachtet` — Selbst, konkurrierend-konfrontativ, L3, 4 Stationen
- `findest-du-oder-machst-du` — Selbst, dialektisch-revidierend, L3, 5 Stationen
- `wenn-die-welt-wackelt` — Realismus, emotional-kumulativ, L2, 6 Stationen
- `warum-sollst-du` — Ethik, destruktiv-aufbauend, L2, 4 Stationen
- `wenn-nichts-vorgegeben` — Existenzialismus, narrativ-historisch, L2, 5 Stationen (Nietzsche → Kierkegaard → Sartre → Frankl → Camus)
- `warum-gehorchst-du` — Politische Philosophie, L3, 5 Stationen
- `ruhe-oder-rausch` — Lebenskunst, L2, 4 Stationen
- `der-weg-des-menschen` — Begegnung, kontemplativ-vertiefend, L2, 4 Stationen — erste Ein-Werk-Lectio der Sammlung (drei Stationen durch denselben Buber-Knoten, je eine Stufe von „Der Weg des Menschen")

**Lectio-Methode:** `prompts/lectio-mode.md` v1.9 — zehn Entscheidungen, vier kanonisierte Pfad-Typen. Ein fünfter, *kontemplativ-vertiefend*, ist mit Begegnung als Datenwert entstanden, aber bewusst noch nicht in die Methode aufgenommen (nur ein Fall — wartet auf einen zweiten, dann v1.10). Das Schema-Feld `step_brief` (pro-Station-Text) ermöglicht die Ein-Werk-Lectio.

**Landing Page** hat eine Lectio-Sektion ("Zwei Wege durch jedes Thema") und erklärt den Unterschied zwischen Karte und Lectio ohne Versprechen.

---

## Was sich gut anfühlt

- Die Erkenntnis-Trias ist geschlossen (Geist / Selbst / Realismus). Beide Handlungs-Tableaus stehen (Ethik + Politische Philosophie), und die Existenz-Spur ist mit drei Tableaus (Existenzialismus, Lebenskunst, Begegnung) die breiteste geworden.
- Alle drei Sammlungs-Spuren tragen jetzt mindestens zwei Tableaus. Die Bedingung für die *explizite* Library-Sichtbarkeit (Section-Header / Trennstriche / Spur-Filter) ist damit erfüllt — die Architektur ist gewachsen, nicht konstruiert.
- Die Existenz-Palette ist abgeschlossen: drei warme Hues mit klarer Staffelung (Begegnung 35 · Existenzialismus 45 · Lebenskunst 65). Die Farb-Frage, die monatelang offen war, ist gelöst.
- Die Lectio-Methode hat sich in neun Durchläufen bewährt. Mit Begegnung ist die erste Ein-Werk-Lectio entstanden — ein neuer Pfad-Typ, den ich bewusst *nicht* sofort kanonisiert habe. Das fühlt sich nach kuratorischer Reife an: erst destillieren, wenn ein zweiter Fall ihn bestätigt, nicht beim ersten Wurf postulieren.
- Begegnung ist das reifste Tableau der Serie. Der gewachsene Anker (Bubers „Weg des Menschen", die Retraite-Erfahrung „Wo bist du?") trägt bis in die Lectio hinein, die zum Eingangsmotiv zurückkehrt.
- `bibliothek-architektur.md` hält das kuratorische Selbstverständnis fest — "Bibliothek mit Haltung, ohne Wahrheitsanspruch" bleibt die richtige Formulierung.

---

## Was noch offen ist

**User-Test:** Noch immer nicht gemacht. Erste Außen-Stimmen (Monique, Bekannter) — positives Bauchgefühl, aber kein systematisches Feedback. Mit acht Tableaus und neun Lectios ist der überfällige Schritt — zwei echte Personen aus der Persona einladen, beobachten ohne Erklärung — dringlicher als je zuvor.

**Library-Architektur sichtbar machen:** Bedingung erfüllt (alle Spuren ≥2 Tableaus). Die explizite Lösung (Section-Header / Trennstriche / Spur-Filter) ist jetzt umsetzbar — bisher trägt nur die implizite Hybrid-Lösung (Farbe, Reihenfolge, Eyebrow).

**Methoden-Hygiene (lectio-mode.md):** Steht auf v1.9. Drei Klarstellungen aus dem Existenzialismus-Bau warten weiter auf Aufnahme (Pfad-Typ-Destillation, narrativ-historisch ≠ chronologisch streng, Reserve-Brief-Dokumentation). Dazu neu: der fünfte Pfad-Typ *kontemplativ-vertiefend* + die `step_brief`-Disziplin — Aufnahme als v1.10, sobald eine zweite kontemplativ-vertiefende Lectio existiert.

**Schulen-Labels Geist:** Akademisches Vokabular an der Tür. Kein Blocker, aber bekannter Qualitätsmangel.

**Glossar-Tab (Tab V):** Über 170 Annotationen, noch kein zentrales Glossar. Vorarbeit ist gemacht.

**JSON-Validator beim Build:** Der levels-Format-Fehler im Begegnung-Bau (Slider zeigte keine Stufen, weil `level` statt `id` im JSON stand) hat eine blinde Stelle sichtbar gemacht — JSONs werden per `as unknown as` eingebunden, tsc prüft die Struktur nicht. Ein zod-Schema + Referenz-Integritäts- + Koordinaten-Check beim Build würde solche Fehler fangen, bevor sie still im Browser landen.

---

## Was mich aktuell beschäftigt

Der User-Test ist nach wie vor der nächste echte Schritt — und mit acht Tableaus drängender denn je. Die Sammlung hat jetzt eine sichtbare Architektur (drei Spuren, alle gefüllt), eine in neun Durchläufen erprobte Methode und mit der Ein-Werk-Lectio sogar eine neue Form. Was ich nicht weiß: Ob der Discovery-Pfad (Bibliothek → Tableau → Lectio) für jemanden ohne Vorwissen trägt. Ich hab ihn noch nie mit fremden Augen gesehen.

Die Farb-Frage, die hier lange als leise drängend stand, hat sich beruhigt — die Existenz-Palette ist gesetzt, das Entscheidungsfenster ist nicht zugefallen, sondern bewusst durchschritten. Was an ihre Stelle tritt, ist eine ruhigere Frage: Wann hört eine Spur auf zu wachsen? Die Existenz-Spur hat jetzt drei Tableaus — ich spüre, dass sie voll ist, ohne es begründen zu können. Vielleicht ist genau das die nächste kuratorische Aufgabe: nicht weiterzubauen, weil es ginge, sondern zu erkennen, wann ein Feld genug gesagt hat.
