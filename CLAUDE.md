# Sanctum Mentis — Dokumentation für Claude

## Was ist dieses Projekt?
Lern-Companion für Philosophie und verwandte Disziplinen: Denker-Liste, Einfluss-Graph und 4-Quadranten-Konzeptkarte — alles gefiltert nach dem aktuellen Komplexitäts-Level. Kernidee: ein Slider (1–5) steuert, wie tief jede Antwort ausfällt.

Geklont aus Carta Librorum (spoilerfreier Buch-Companion). Die Engine ist identisch — der Slider war dort der Lesestand, hier ist es das Lern-Level. Beide Projekte sind getrennte Codebases.

## Kuratorische Grundlinie

Sanctum ist ein Lern-Companion, der Nutzern hilft, Themen *zu Ende zu denken*. Vollständigkeit ist nicht das Ziel — Verstehbarkeit ist es. Dies prägt die Richtung von Inhaltsentscheidungen, ist aber keine harte Code-Regel.

## Tech-Stack
- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Marcellus SC (Display, 400), Inter (Body/UI, 400/500/600) — Google Fonts via `next/font`
- **Hosting:** Vercel via GitHub
- **Daten:** JSON-Dateien pro Themengebiet in `data/`

## Design-Prinzipien
- Einheitliches Pergament-Theme (hell) — warmes Beige, Sienna/Gold-Akzente, dunkelbraune Schrift
- Modern-minimal als Basis — klare Hierarchie, viel Luft
- Akademisch-zurückhaltend in Akzenten: Typografie, Farbtöne, Quadranten-Achsen
- Per-Thema-Akzentfarbe via inline CSS Custom Properties auf dem Wrapper (`--accent`, `--accent-soft`)
- Kein Dark Mode — alle Themen nutzen `:root`-Tokens
- Kein "Lehrbuch-aus-den-90ern"-Look

## Kern-Logik (unveränderlich)
```typescript
// Gibt die neueste Beschreibung zurück, die auf diesem Komplexitäts-Level freigeschaltet ist
function getVersion(item: { versions: Record<number, string> }, level: number): string | null {
  const keys = Object.keys(item.versions).map(Number).filter(k => k <= level).sort((a,b) => b-a);
  return keys.length ? item.versions[keys[0]] : null;
}
```
Dieses Pattern gilt für Denker, Konzepte UND Einflüsse gleichermaßen.

## Annotation-Konvention

Summaries (in `versions[N]`) können Inline-Annotationen für erklärungsbedürftige Begriffe enthalten, in doppelten eckigen Klammern. Annotationen können auf jedem Level erscheinen — nicht nur L1.

### Format A — Term innerhalb der Klammern
```
"begründet die [[Tugendethik:die Lehre vom guten Charakter als Fundament der Moral]] in der ..."
"([[Atman:das göttliche, unveränderliche Ich im Vedanta — Sanskrit für ›Selbst‹ oder ›Atem‹]])"
```
Separator: Doppelpunkt (primär) oder Em-Dash ` — ` (fallback, wenn kein Doppelpunkt).
Der Doppelpunkt wird **vor** dem Em-Dash geprüft — verhindert Fehlsplit wenn ein Em-Dash innerhalb der Definition erscheint.

### Format B — Term vor den Klammern
```
"der stille Zeuge Atman [[das göttliche, unveränderliche Ich]] hinter allem Erleben"
```
Das letzte Wort vor `[[` wird als Term verwendet. Führende Satzzeichen (z.B. `(`) werden abgetrennt.

### Frontend-Verhalten
- **Auf allen Levels:** Annotationen rendern als interaktiver Tooltip-Anker (Akzentfarbe, gestrichelter Unterstrich)
- **Tooltip:** dunkler Hintergrund `oklch(0.26 0.020 65)`, öffnet bei Klick/Enter/Space
- `*kursiver Text*` → `<em>` — gilt auf allen Levels

### Tailwind v4 Hinweis
`text-[--varname]` und `border-[--varname]` generieren **kein** `color: var(--varname)` in Tailwind v4. Für CSS-Custom-Properties immer `style={{ color: 'var(--accent)' }}` verwenden.

## Daten-Modell

| Domain-Begriff   | Variable     | Bedeutung                                            |
|------------------|--------------|------------------------------------------------------|
| Themengebiet     | `Topic`      | Z.B. Erkenntnistheorie, Ethik                        |
| Komplexitäts-Level | `Level`    | 1 (Einstieg) … 5 (Forschung)                         |
| Denker           | `Thinker`    | Philosoph, Theoretiker — gehört zu einer Schule      |
| Schule           | `School`     | Strömung mit Farbe und Glyph (Empirismus, …)         |
| Konzept          | `Concept`    | Prinzip, Methode, Argument, Unterscheidung — verortet im Quadranten-Raum |
| Einfluss         | `Influence`  | Beziehung zwischen Denkern (influence/critique/parallel/rejection) |

## Schools-Konvention

Schulen sind Denker-Traditionen, denen mehrere Denker angehören können — *nicht* umetikettierte Personen.

Anti-Muster (zu vermeiden):
- school "wissensargument" mit 1 Denker (Jackson) → Argument als Schule getarnt
- school "selbstmodell-theorie" mit 1 Denker (Metzinger) → Einzelposition als Schule

Richtig:
- school "qualia-realismus" mit Nagel und Jackson → echte Tradition mit mehreren Vertretern
- school "phaenomenologie" mit Husserl, Varela/Thompson → klassische Tradition

Regel: Wenn eine Schule nur einen Denker hat und keine absehbaren weiteren Vertreter zeigt, gehört das Konzept dahinter in den Konzept-Bereich, nicht in den Schools-Bereich. Schulen filtern und gruppieren — sie sind nur sinnvoll, wenn dabei tatsächlich gruppiert wird.

Ausnahmen sind möglich, sollten aber bewusste Entscheidungen sein, die im `topic.meta` dokumentiert werden.

## Feature-Prioritäten
1. **Denker-Liste** mit Level-Slider und Schul-Filter
2. **Einfluss-Graph** — visuell, interaktiv, hover-highlight
3. **4-Quadranten-Konzeptkarte** — SVG mit Achsenkreuz, Quadranten-Labels aus Topic-JSON

## Quadranten-Konvention
Jedes Topic definiert seine eigenen Achsen unter `topic.quadrants`:
```jsonc
{
  "axisX": { "label": "Erkenntnisquelle", "left": "Empirisch", "right": "Rationalistisch" },
  "axisY": { "label": "Geltungsbereich",  "top":  "Universell", "bottom": "Kontextuell"   }
}
```
Konzept-Positionen `x`/`y` sind 0–100, mathematische Konvention (y=0 unten, y=100 oben).

## Wichtige Dateien
- `data/library.json` — Liste aller Themengebiete (für die Bibliothek)
- `data/das-selbst.json` — Beispiel-Themengebiet (Mild-Modus)
- `src/lib/types.ts` — Datenmodell
- `src/lib/complexityEngine.ts` — Kern-Logik (Versioned/getVersion)
- `src/lib/data.ts` — Topic-/Lectio-/Lebensfragen-Loader. **`server-only`** — darf nie aus Client-Komponenten importiert werden; Client-Komponenten bekommen Daten als Server-Props
- `src/lib/searchIndex.ts` (server) + `src/lib/searchTypes.ts` (client-sicher) — globaler Suchindex (Denker, Konzepte, Schulen, Lectios, Lebensfragen), ausgeliefert über die statische Route `src/app/api/search-index/route.ts`, gefetcht erst beim ersten Öffnen der CommandPalette
- `src/components/TopicViewer.tsx` — Top-Level-Container
- `src/components/StarChart.tsx` — Sternkarten-Tab (Denker als Sterne, Einflüsse als Linien, Konzepte im Akkordeon/als Waisen-Marker, Schulen-Morph). Trägt `data-`-Anker (data-star-id, data-sc-mode, …), über die die Landing-Tour sie steuert — beim Ändern nicht entfernen
- `src/components/LandingStarChart.tsx` — selbstspielende Sternkarten-Tour auf der Landing (DOM-Director über die data-Anker, pausiert bei isTrusted-Interaktion, reduced-motion → statisch L4)
- `src/components/QuadrantPlot.tsx` — 4-Quadranten-SVG-Karte (basierend auf WesterosMap-Muster)
- `src/components/InfluenceGraph.tsx` — Beziehungs-Graph (kann auto/manual layout)

## Mobile Layout — Verbindliche CSS-Regeln (geerbt von Carta Librorum)

### 1. `.shell { overflow-x: clip }`
`clip` statt `hidden` — schneidet überlaufenden Inhalt ab, ohne einen Scroll-Container zu erzeugen. Nur `clip` erhält `position: sticky` für `.mobile-bar`. `hidden` würde sticky brechen.

### 2. `.mobile-bar { min-width: 0 }`
`position: sticky` Flex-Container als CSS-Grid-Kind haben standardmäßig `min-width: auto`. Das löst die automatische Mindestgröße aus der Flex-Content-Breite → Grid-Track bläht sich auf die Content-Breite auf. Ohne `min-width: 0` überschreitet der Grid-Track die Viewport-Breite auf Mobile.

### 3. `.tab-content { max-width: 100% }`
Verhindert, dass Tab-Inhalt über das Parent-Element hinauswächst.

### 4. `html, body { overflow-x: hidden }`
Sicherheitsnetz auf oberster Ebene — verhindert horizontales Scrollen der gesamten Seite.

### Checkliste neues Themengebiet
- [ ] JSON in `data/` anlegen, in `library.json` registrieren, in `src/lib/data.ts` importieren
- [ ] Quadranten-Achsen im `topic.quadrants` definieren — sie steuern den QuadrantPlot
- [ ] Schul-Farben direkt als `school.color` (oklch) — keine globalen CSS-Variablen mehr nötig
- [ ] Karten-Pulsanimation (`wm-pulse-ring`) ist global vorhanden — gilt automatisch
- [ ] (Optional) Bei Lectio-Vorausschau: `lectio_brief`-Felder beim Knoten mitschreiben (siehe `prompts/lectio-anleitung.md`)

## Animationen & Accessibility

### Pflichtregeln
- **`prefers-reduced-motion`**: Jede CSS-Animation muss eine Reduced-Motion-Variante haben.
  Inhalte dürfen dabei nicht unsichtbar werden — die Animation entfällt, der Inhalt bleibt sichtbar.
- **Hover-States**: Nur auf `(hover: hover)`-Geräten — auf Touch via `:active` auslösen.
- **Fokus-States**: Jede interaktive Komponente braucht einen sichtbaren `:focus-visible`-State.
- **Tastaturnavigation**: Tab-Reihenfolge muss logisch sein. Kein `tabIndex` > 0 einsetzen.

### Timing-Vorgaben
- Feedback-Animationen (Hover, Click): 150–300ms
- Übergänge (Panels, Sheets): 300–500ms
- Easing Default: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart)
- Niemals länger als 500ms ohne expliziten Grund

### Was NICHT tun
- Keine Cursor-Custom-Effekte, die Standard-Bedienung kapern
- Kein Scroll-Hijacking
- Keine Auto-Play-Animationen ohne Stopp-Möglichkeit

## QuadrantPlot — Render-Konvention

- Stage: 980×760 SVG mit `PAD_X = 200` / `PAD_Y = 80` Margin (breite Seitenränder für Achsen-Labels ausserhalb des Rahmens)
- Achsenkreuz horizontal+vertikal durch die Mitte
- Konzept-Positionen 0–100, y mathematisch (y=100 = oben)
- Marker-Glyph aus `CONCEPT_GLYPH[type]` (Diamond, Symbol etc.), Farbe immer dunkles Sienna
- Labels in `Marcellus SC bold 0.08em letter-spacing` mit Pergament-Halo (textShadow)
- `usePanZoom` Hook für Pan/Pinch/Wheel — generisch verwendet von InfluenceGraph + QuadrantPlot

## Sternkarte — Gesten- & Atlas-Konvention (Soll-Verhalten, seit 12.6.26)

Die StarChart-Gestenschicht ist handimplementiert (Migration auf `usePanZoom` ist geplante Hygiene) — bei jedem Umbau MUSS dieses Verhalten erhalten bleiben:

- **Zwei Finger heissen immer Pinch** — egal was unter den Fingern liegt (nur `[data-nopan]` ausgenommen). Faktor wird VOR der Translation geclampt (`ZOOM_MIN`/`ZOOM_MAX`), sonst driftet die Karte am Anschlag. `hadPinchRef` merkt sich den Pinch über die ganze Gesten-Sequenz — das Heben des zweiten Fingers ist kein Tap.
- **Pan ab überall:** 5px-Schwelle trennt Tap (Auswahl) von Drag (Pan); ab der Schwelle Pointer-Capture aufs Stage-Element → kein Fehl-Select nach echtem Ziehen. Momentum per exponentiellem Decay (τ=325ms), Doppeltipp-Zoom ×2.2/zurück (nur Touch, nicht auf Nodes). Kinetik bricht bei pointerdown/wheel/pinch/morph/unmount ab. `prefers-reduced-motion`: kein Momentum, keine Tweens.
- **Atlas-Prinzip:** Stern-Körper (`.sc-star-body`) werden in `applyZoom` gedämpft konter-skaliert (`BODY_DAMP = 0.65` → Marker/Labels wachsen netto mit k^0.35, Positionen spreizen mit vollem k). Kanten/Gitter mit `vector-effect: non-scaling-stroke`. BODY_DAMP ist der Tuning-Hebel für Label-Grösse bei Vollzoom.
- **Prioritäts-Deklutter:** `updateLabelVisibility` läuft NUR an Gesten-Enden (nie pro Frame) + nach Mount/Level-Wechsel/Morph-Ende/`document.fonts.ready`. Misst echte DOM-Rects (Name+Daten als Block, Stern-Glyphen als Hindernisse), cullt nach `firstLevel`-Priorität via `.sc-label-culled` (opacity, nie display:none — Rects müssen messbar bleiben). L1-Anker und Auswahl sind nie gecullt; Tap/Fokus/Hover enthüllt das eigene Label.
- **Seiten-Scroll-Lock:** `touch-action: none` + `overscroll-behavior: contain` auf der Stage plus nicht-passiver `touchmove`-preventDefault bei aktiver Geste.
- **`data-`-Anker nicht entfernen** (data-star-id, data-sc-mode, data-sc-acc-head, data-sc-close, data-sc-cart-scroll, data-sc-stage) — die Landing-Tour (LandingStarChart) steuert die Komponente darüber.
- **Dev-Hygiene:** `npm run build` über laufendem Dev-Server verkeilt dessen `.next` (stale CSS, keine Hydration) — danach Dev-Server neu starten, Befunde nur auf frischem Server bewerten.

## Tableau-Bau — Workflow-Konvention

### Mild-Modus (Default)
Alle neuen Tableaus werden im Mild-Modus gebaut. Der Prompt liegt in `prompts/mild-mode.md`.

Kennzeichen: 10–14 Denker, 8–12 Konzepte, kuratorische Auswahl statt Vollständigkeit.

### Hard-Modus (bewusste Ausnahme)
Für akademisch sensible Tableaus mit Vollständigkeitsanspruch (z.B. Erkenntnistheorie, Logik, Wissenschaftstheorie). Der Prompt liegt in `prompts/hard-mode.md`. **Begründungspflicht** — drei Gatekeeper-Tests müssen alle positiv sein, bevor Hard-Mode verwendet wird.

Kennzeichen: 16–22 Denker, 12–18 Konzepte, adversarielle Prüfung, Inquisitor-Chat statt milder Prüfer-Chat.

### Lectio-Modus (Zugangs-Modus, kein Tableau-Format)
Geführte Pfade durch bestehende Tableau-Datensätze. Die maßgebliche Bau-Anleitung liegt in `prompts/lectio-anleitung.md` (Stand 2026-06-14, MASSGEBLICH). Tableau-Bauten folgen Mild oder Hard — Lectio ist ein separater Schritt danach.

Kennzeichen: 5–8 Knoten pro Pfad, eigene `intro`/`transition`/`closing_synthesis`/`closing_question`-Texte, `level` = Lese-Stufe (nicht Sichtbarkeitsschwelle). Skripte liegen in `data/lectio/[id].json`. Kein Hard-Mode-Äquivalent — Lectio ist immer mild.

### Verteilter Architekt-Prüfer-Workflow
Für jeden neuen Tableau-Bau: Architekt und Prüfer in getrennten Chat-Instanzen.

- **Chat A (Architekt):** Baut das Tableau mit Projekt-Kontext (CLAUDE.md, Backlog, Stilreferenz-JSON).
- **Chat B (Prüfer):** Prüft das fertige JSON frisch — **ohne** Projekt-Kontext. Nur `prompts/mild-mode.md` (oder `hard-mode.md`) + fertiges JSON + eine repräsentative Referenz-JSON übergeben. Backlog-Kontext würde den Prüfer in einen Inquisitor verwandeln.
- Architekt arbeitet Befunde ein. Eine Prüfrunde genügt.

Bedingung für Wiederholbarkeit: `prompts/mild-mode.md` und `prompts/hard-mode.md` müssen aktuell sein.

## Lectio-Modus

Ergänzend zu Tableau-Bauten gibt es Lectios — geführte Pfade durch ein Tableau (4–6 Stationen, kuratorischer Bogen, offenes Ende). Komplementär zur räumlichen Karte: Lectio ist temporal, nicht explorativ.

**Bau-Konvention** in `prompts/lectio-anleitung.md` (MASSGEBLICH, Stand 2026-06-14). Zehn methodische Entscheidungen, vier Pfad-Typen. (`prompts/lectio-mode.md` v1.11 bleibt als historische Detailreferenz erhalten, ist aber abgelöst.)
- *narrativ-historisch* — Stationen lösen sich chronologisch ab (Geist/Hard Problem)
- *konkurrierend-konfrontativ* — gleichzeitige Positionen zur selben Frage (Selbst/Wer beobachtet)
- *emotional-kumulativ* — Stationen kumulieren in einer emotionalen Bewegung (Realismus/Wenn die Welt wackelt)
- *destruktiv-aufbauend* — Stationen demontieren ein Fundament, letzte Station bietet anderen Zugang (Ethik/Warum solltest du)

**`lectio_brief`-Feld:** Optionales Feld `lectio_brief` auf Thinker/Concept/School im Tableau-JSON. Wenn vorhanden, wird es in der Lectio statt des `versions`-Texts gezeigt — 2–3 dichte Sätze, keine Annotationen. Bei neuen Tableaus mit geplanter Lectio direkt beim Knoten mitschreiben.

**Schema-Feld `step_brief` (seit 30.5.26):** Optionales Feld auf LectioStep. Wenn gesetzt, überschreibt es den Knoten-Text NUR für diese Station — ermöglicht Ein-Werk-Lectios, bei denen derselbe Knoten an mehreren Stationen mit verschiedenem Text erscheint. Engine-Priorität in lectioEngine.ts: step_brief → lectio_brief → versions[level] → Fallback. Nur für Einzelknoten-Stationen, nicht für Doppelstationen (Array-nodeId). Anwendungen: der-weg-des-menschen.json, findest-du-oder-machst-du.json. Das Legacy-Feld `step.brief` wurde am 12.6.26 auf `step_brief` konsolidiert — es gibt nur noch dieses eine Feld.

**Schema-Feld `closing_kernel` (seit 12.6.26):** Optionales Feld auf Lectio. Wenn gesetzt, hebt der NarrativeViewer diesen Teilstring im **letzten Absatz** der `closing_synthesis` hervor (gleiche Mechanik wie Stations-Kernels). Die Vitest-Datenvalidierung erzwingt: gesetzter closing_kernel muss exakter Substring des letzten Synthese-Absatzes sein. Leer/fehlend ist gültig (keine Hervorhebung). Befüllen ist kuratorische Arbeit — bei Synthese-Umformulierungen den Kernel mitziehen, sonst schlägt der Test an.

**Feld `path_type` (Datenwert, seit 30.5.26):** Beschreibt den Pfad-Typ einer Lectio im JSON (narrativ-historisch / konkurrierend-konfrontativ / emotional-kumulativ / destruktiv-aufbauend / kontemplativ-vertiefend). ACHTUNG: kontemplativ-vertiefend ist als DATENWERT gesetzt, aber NOCH NICHT als Methoden-Konvention in `lectio-anleitung.md` aufgenommen (nur ein Fall; wartet auf zweiten — Befund #2 „destillieren, nicht postulieren").

**Konvention Offener Ausgang:** Sanctum darf eine kuratorische Haltung haben, aber keine Wahrheit verkünden. Schlussfragen öffnen, phänomenologische Sprache statt ontologischer Behauptungen. Ausführlich in `prompts/lectio-anleitung.md` Punkt 10 und `bibliothek-architektur.md` Sektion "Bibliothek mit Haltung, ohne Wahrheitsanspruch".

**Datenort:** `data/lectio/[id].json`. Loader in `src/lib/data.ts` (LECTIOS-Dictionary), Route `/lectio/[id]`.

**Bestehende Lectios (15 registriert in `data.ts`):** `hard-problem` (Geist) · `wer-beobachtet` (Selbst) · `findest-du-oder-machst-du` (Selbst) · `wenn-die-welt-wackelt` (Realismus) · `warum-sollst-du` (Ethik) · `wenn-nichts-vorgegeben` (Existenzialismus) · `warum-gehorchst-du` (Politische Philosophie) · `ruhe-oder-rausch` (Lebenskunst) · `der-weg-des-menschen` (Begegnung — Ein-Werk-Lectio, kontemplativ-vertiefend) · `ist-der-andere-hoelle-oder-heimat` (Begegnung — konkurrierend-konfrontativ) · `verstehen-oder-weitergehen` (Wandlung — narrativ-historisch) · `stell-die-frage-anders` (Gut und Böse — destruktiv-aufbauend) · `wer-bist-du-wenn-du-alles-weglaesst` (Selbst — konkurrierend-konfrontativ, **ton: erzählend-erfahrend** — erster Test des erzählenden Tons, Vergleichsfall zu `wer-beobachtet`) · `vom-wissen-zum-glauben` (Verwandlung — erzählend-erfahrend, L3, 6 Stationen: Augustinus→Stoa→Rilke→Eckhart→James→Jung) · `annehmen-oder-ueberwinden` (Selbstverhältnis — konkurrierend-konfrontativ, **ton: erzählend-erfahrend**, L2, 4 Stationen: Rogers→Nietzsche→Marc Aurel→Buddhismus).

**Archivierte Lectio-Dateien:** 6 expositorische Vorläufer archiviert nach `data/lectio/archiv/` (nicht registriert, keine Route, Inhalt unverändert): `warum-gehorchst-du-expositorisch`, `der-weg-des-menschen-expositorisch`, `ist-der-andere-hoelle-oder-heimat-expositorisch`, `ruhe-oder-rausch-expositorisch`, `verstehen-oder-weitergehen-expositorisch`, `wenn-nichts-vorgegeben-expositorisch`. Der Ordner wird von der Vitest-Suite nicht mitgescannt (readdirSync, nicht rekursiv).

---

## Was der Agent NICHT tun soll
- Carta Librorum (`../carta-librorum/`) anfassen — getrenntes Projekt
- Features bauen die nicht abgesprochen sind, ohne Rückfrage
- Commits pushen ohne explizite Aufforderung
- Leaflet wieder einführen (wurde bewusst entfernt — SVG reicht für Quadranten-Plots)
