# Bild-Stil-Kanon v2

Stand: 3.7.2026 · Belegfall: `wenn-die-welt-wackelt` (6 Stationen, voller Zyklus Motiv → Test → Produktion → Layout)
Ersetzt v1. Was aus v1 weitergilt, ist hier eingearbeitet — v1 muss nicht mehr konsultiert werden.

## Der Kernsatz

**Das Bild trägt die Stimmung der Station, nie ihre These. Bebilderbar ist, wie es sich anfühlt, an dieser Station zu stehen.**

Begründung aus dem Belegfall: Drei Anläufe, Gabriels Sinnfelder-These zu bebildern (Objekt-Arrangement, Fensterlichter, überlagerte Sternkarten), scheiterten alle auf dieselbe Weise — das Bild wurde Diagramm oder die Pointe verpuffte. Der erste Anlauf über die Stimmung („Ruhe nach dem Schwindel — Morgenlicht nach langer Nacht") saß sofort. Stationen, deren Motiv schon vorher funktionierte (Aristoteles' Gefäß, Kuhns Riss), waren rückblickend immer schon Stimmungsbilder. Eine Ontologie kann ein Bild nicht zeigen, ohne zum Diagramm zu werden; ein Gefühl kann es immer.

**Prüfkriterium beim Sichten eines Testbildes:** Fühlst du — oder fragst du? Ein Bild, das Fragen aufwirft („was soll das darstellen?"), trägt noch These. Ein Bild, das sitzt, wird nicht analysiert.

## Die Kurven-Regel

Die Gefühlskurve der Lectio darf sich als **Licht- und Materialkurve** durch die Bilder ziehen. Die Bilder einer Lectio sind Geschwister im Ton, aber jede Station hat ihr eigenes Licht und Material — so entsteht Zusammenhalt ohne Gleichförmigkeit.

Belegfall-Kurve (`wenn-die-welt-wackelt`, emotional-kumulativ):
warmes Nachmittagslicht (Geborgenheit) → blaue Stunde, Konturen verschwimmen (erstes Entgleiten) → kühles Lichtraster (Klarheit mit Kälte) → Riss im vermessenen Boden (die letzte Sicherheit gibt nach) → Nebel ohne Horizont (Schweben) → Morgenlicht nach langer Nacht (Ankommen, nicht Triumph).

Wiederkehrende stille Elemente (z. B. dasselbe Gefäß in Station 1 und 2) dürfen die Kurve verbinden — als Faden, nie als Symbol, das erklärt.

Zweiter Belegfall — Grabungs-Kurve (`warum-sollst-du`, destruktiv-aufbauend):
gefügtes kühles Fundament → Wärme darunter → alte Schichten ohne Grund → aufschauen, es war schon da.

Offener Punkt: Die Kurven-Regel ist bislang nur am emotional-kumulativen und am destruktiv-aufbauenden Pfadtyp belegt. Ob konkurrierend-konfrontative Lectios (Hin und Her der Lager statt Steigerung) eine eigene Kurvenform brauchen, klärt der nächste Belegfall. Bis dahin: Kurve pro Lectio kuratorisch bestimmen, nicht schematisch übertragen.

## Der Standard-Stil-Block

Jeder `image_prompt` = Stil-Block + Stations-Subjekt, wörtlich zusammengesetzt, englisch. Der Stil-Block in aktueller Fassung (inkl. der Zusätze gegen Randartefakte — nicht kürzen):

> Atmospheric image for a contemplative philosophy library. Muted, desaturated palette bedded in parchment warmth. Painterly, analog, slightly grainy, tangible texture — no glossy render, no digital sheen, no modern elements. Calm and timeless, generous quiet space. Vertical portrait composition, 4:5. Fine-art photography meets old fresco. Full-bleed image, edge to edge — no border, no frame, no vignette, no passe-partout, no photo edges. Consistent texture and exposure across the entire frame, including all edges and corners — no washed-out or blurred zones. No people, no faces, no readable text.

Anmerkungen:
- „Full-bleed …" und „Consistent texture …" sind Pflichtbestandteile. Sie verhindern zwei belegte stochastische Randartefakte (eingebrannter Rahmen/Passepartout; ausgeblichene Randzonen). Ursache war die Wendung „fine-art photography meets old fresco", die das Modell gelegentlich als „gedruckter Abzug mit Rand" liest.
- „Single subject" aus v1 ist kein Pflichtbestandteil mehr — es kollidiert mit Stationen, deren Stimmung Mehrzahl braucht. Bei Einzelmotiven darf es ergänzt werden.
- Die Nische erscheint nicht mehr zwingend **im** Bild (v1-Regel entfällt); die Bogen-Nische ist die **Darstellungsform im Viewer**, nicht Bildinhalt. Bilder sind randlos, die Nische rahmt sie im Layout.
- Bei Architektur-Subjekten den Baustein „fine-art photography meets old fresco" weglassen und Wandmalereien explizit ausschließen („no murals, no frescoes") — der Fresko-Baustein kippt dort vom Stil-Adjektiv zum Bildinhalt (belegt: figürliches Fresko im Kant-Test, 3.7.).

## Das Subjekt (der Stations-Teil)

- Beschreibt eine Stimmung als Szene: Raum, Licht, Wetter, Material. Kein Objekt, das etwas bedeutet; kein Arrangement, das etwas erklärt.
- Endet idealerweise mit der Gefühls-Benennung als Leitplanke fürs Modell (z. B. „Tender unease, not menace." / „Not triumphant, not resolved — simply standing steady in gentle light.").
- Deutsch gedacht, englisch geschrieben.

## Workflow (belegt)

1. **Gefühlskurve bestimmen** — kuratorisch, pro Lectio, vor jedem Prompt: Welche Stimmung trägt jede Station? (Architekten-Arbeit, nicht delegierbar.)
2. **Prompts schreiben** — Stil-Block + Subjekt, direkt in die JSON (`image_prompt`), Status auf `prompt-neu`, `image` leer.
3. **Motive kostenlos testen** — Gemini, ein Bild pro Station. Kriterium: fühlen, nicht fragen. Justieren, bis alle sitzen.
4. **Finale Produktion** — Higgsfield via Claude Code: Modell Nano Banana 2, 4:5, 2k, Prompt wörtlich. Nach Generierung fürs Repo auf ~800px Breite herunterrechnen, WebP Qualität ~70 — 2k ist Generierungs-, nicht Ablageformat. Ablage als `public/lectio-images/<lectio-id>/<nodeId>.webp`, Pfad ins `image`-Feld, Status auf `generiert`. Nur Erfolge werden markiert; die Status-Übersicht zeigt Lücken.
5. **Randprüfung** — alle Bilder auf Randartefakte (Rahmen, Vignette, ausgeblichene Zonen) prüfen, bevor committet wird: `node scripts/check-image-edges.js <2k-Original>` (auf dem 2k-Original fahren, nicht auf dem WebP — die Heuristik ist darauf kalibriert), Verdachtsfälle sichten. Die Sichtprüfung allein hat belegte subtile Rahmen zweimal durchgelassen (epikur/marc-aurel-epiktet, 3.7.). Einzelne Ausreißer neu generieren (stochastisch), nie per globalem CSS-Zoom kaschieren.
6. **Layout** — Darstellung in der Bogen-Nische; Größenentscheidungen am echten Bild im echten Layout treffen, nicht an Beschreibungen.

## Geltung

- Format: 4:5 Hochformat, unverändert aus v1.
- Nüchtern-klare Stationen **dürfen** ein Bild tragen (Kant-Präzedenz, 3.7.): Eine fehlende Nische liest sich als Lücke, nicht als Absicht. Das Bild einer nüchternen Station trägt ihre Nüchternheit (kühler, geometrischer, stiller) — Nüchternheit im Bild statt durch Abwesenheit.
- Dieses Dokument ist die maßgebliche Quelle für alle Bild-Prompts. Die `image_prompt`-Felder in den Lectio-JSONs sind Anwendungen (Verbrauchsgut je Generierung), keine zweite Wahrheitsquelle — bei Kanon-Änderung werden Bilder neu generiert, nicht Prompts rückgepflegt.
