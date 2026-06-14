# Sanctum Mentis — Schema-Referenz

**Primärquelle:** `src/lib/types.ts`  
**Ergänzt aus:** Daten-Gebrauch, Vitest-Suite (`src/lib/__tests__/data-validation.test.ts`)  
**Zweck:** Nachschlagewerk für Bau und Prüfung — vollständig, kein Tutorial.  
**Stand:** 2026-06-14

---

## Die drei Datei-Formate

| Format | Dateiort | Top-Level-Interface | Inhalt |
|---|---|---|---|
| **Tableau** | `data/<id>.json` | `TopicData` | Ein Themengebiet: Denker, Konzepte, Schulen, Influences |
| **Lectio** | `data/lectio/<id>.json` | `Lectio` | Ein Lesepfad durch ein Tableau |
| **Lebensfrage** | `data/lebensfragen/<id>.json` | `Lebensfrage` | Tableau-übergreifende Stimmen-Sammlung |

Tableaus sind die Quelle; Lectios und Lebensfragen schöpfen aus ihnen, erzeugen aber keine eigenen Knoten.

---

## 1. Tableau-Format (`TopicData`)

```
TopicData
 ├── topic: Topic
 ├── levels: Level[]
 ├── schools: School[]
 ├── thinkers: Thinker[]
 ├── influences: Influence[]
 ├── concepts: Concept[]
 └── contextByLevel?: Record<number, string | null>
```

### 1.1 `Topic`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `string` | ✓ | URL-Slug, muss mit Dateiname übereinstimmen (z. B. `"das-selbst"`) |
| `title` | `string` | ✓ | Langer Titel, z. B. `"Die Landkarte des Selbst"` |
| `subtitle` | `string?` | — | Einladende Kurzformel für Library-Card und Tableau-Kopf — atmosphärisch, Du-Form |
| `intro` | `string?` | — | Zuspitzende Du-Frage, sichtbar ab L1 direkt im Tableau — stellt die Spannung am Leib |
| `era` | `string?` | — | Freier Zeittag, z. B. `"Antike – 21. Jh."` |
| `theme` | `TopicTheme?` | — | Akzentfarben als CSS-Custom-Property-Werte |
| `complexityLevels` | `number` | ✓ | Anzahl Level, immer `5` |
| `quadrants` | `Quadrants` | ✓ | Achsen-Definition für Sternkarte und Konzept-Karte |
| `graphLayout` | `'manual' \| 'auto'?` | — | Layout-Modus des InfluenceGraph; `'manual'` liest `graphX/Y` aus Thinker-Knoten |
| `thinkerListStyle` | `'cards' \| 'grouped'?` | — | Darstellungsform der Denker-Liste; `'grouped'` gruppiert nach Schule |
| `synthesis` | `string?` | — | Kuratorischer Abschlusstext, **nur auf L5 sichtbar** |

#### `TopicTheme`

| Feld | Typ | Bedeutung |
|---|---|---|
| `accent` | `string` | Hauptakzentfarbe (oklch), z. B. `"oklch(0.42 0.12 295)"` — als `--accent` injiziert |
| `accentSoft` | `string` | Gedämpfte Variante mit Transparenz — als `--accent-soft` injiziert |

**Hinweis:** Tailwind v4 unterstützt `text-[--varname]` nicht. CSS-Custom-Properties immer als `style={{ color: 'var(--accent)' }}` verwenden.

#### `Quadrants`

| Feld | Typ | Bedeutung |
|---|---|---|
| `axisX.label` | `string` | Name der X-Achse, z. B. `"Natur des Selbst"` |
| `axisX.left` | `string` | Linker Pol (x=0) |
| `axisX.leftHint` | `string?` | Erklärender Untertitel für den linken Pol |
| `axisX.right` | `string` | Rechter Pol (x=100) |
| `axisX.rightHint` | `string?` | Erklärender Untertitel für den rechten Pol |
| `axisY.label` | `string` | Name der Y-Achse |
| `axisY.top` | `string` | Oberer Pol (y=100) |
| `axisY.topHint` | `string?` | Erklärender Untertitel für den oberen Pol |
| `axisY.bottom` | `string` | Unterer Pol (y=0) |
| `axisY.bottomHint` | `string?` | Erklärender Untertitel für den unteren Pol |

**Koordinaten-Konvention (wichtig):** y=0 ist **unten** (bottom-Pol), y=100 ist **oben** (top-Pol). Mathematische Konvention, nicht CSS/Screen-Konvention. Fehler erzeugt gespiegelte Sternkarte.

---

### 1.2 `Level`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `number` | ✓ | Level-Nummer 1–5 |
| `label` | `string` | ✓ | Langer Label, z. B. `"Einstieg"`, `"Grundlagen"`, `"Synthese"` |
| `short` | `string` | ✓ | Kurz-Label, z. B. `"L1"` |
| `filled` | `boolean` | ✓ | Wird im Frontend gesetzt (Engine), **nicht in den JSON-Daten** |
| `description` | `string?` | — | Optionale Erklärung des Levels |

---

### 1.3 `School`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `string` | ✓ | Bezeichnet die Schule, referenziert in `Thinker.schoolId` |
| `label` | `string` | ✓ | Anzeigename, z. B. `"Empirismus"` |
| `color` | `string` | ✓ | Farbe direkt verwendbar (oklch oder hex) — keine globalen CSS-Variablen |
| `glyph` | `string` | ✓ | Unicode-Symbol in der Denker-Liste, z. B. `"◈"` |
| `motto` | `string?` | — | Kurzer charakterisierender Satz |
| `gx` | `number?` | — | **InfluenceGraph:** x-Position des Schul-Ankers im SVG (auto layout) |
| `gy` | `number?` | — | **InfluenceGraph:** y-Position des Schul-Ankers im SVG (auto layout) |
| `labelDir` | `'N'\|'NE'\|'E'\|'SE'\|'S'\|'SW'\|'W'\|'NW'?` | — | **Sternkarte:** Richtung, in die das Schul-Label vom Anker weggedrückt wird (verhindert Label-Kollisionen) |
| `cluster` | `ClusterDef?` | — | **Sternkarte:** Ellipsen-Hülle um eine Schul-Gruppe im Schulen-Modus |
| `lectio_brief` | `string?` | — | 2–3-Satz-Ankerpunkt für Lectio-Modus; überschreibt `versions`-Text wenn gesetzt |

#### `cluster` (Sternkarte-spezifisch)

```typescript
{
  cx: number;   // Ellipsen-Mittelpunkt x (SVG-Koordinaten, 0–100-Skalierung)
  cy: number;   // Ellipsen-Mittelpunkt y
  rx: number;   // Halbachse x
  ry: number;   // Halbachse y
  lx: number;   // Label-Position x
  ly: number;   // Label-Position y
  ta: 'start' | 'middle' | 'end';  // text-anchor des Cluster-Labels
}
```

Nur relevant im Schulen-Modus der Sternkarte. Nicht von der Vitest-Suite geprüft.

---

### 1.4 `Versioned` (Basis-Interface)

Alle Knoten (Thinker, Concept, Influence) erben `Versioned`.

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `firstLevel` | `number` | ✓ | Frühestes Level, ab dem dieser Knoten sichtbar wird (1–5) |
| `versions` | `Record<number, string>` | ✓ | Map von Level-ID → Beschreibungstext; Engine wählt die höchste vorhandene Schlüssel-ID ≤ aktivem Level |

**Engine-Logik:**
```typescript
function getVersion(item, level): string | null {
  const keys = Object.keys(item.versions).map(Number).filter(k => k <= level).sort((a,b) => b-a);
  return keys.length ? item.versions[keys[0]] : null;
}
```

Mindestens ein `versions`-Eintrag auf `firstLevel` ist Pflicht. Hubs (≥4 Influences) sollten 3 Stufen haben, reguläre Knoten 2, Solo-L5-Knoten 1.

---

### 1.5 `Thinker` (extends Versioned)

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `string` | ✓ | Eindeutiger Bezeichner, als `nodeId` in Lectios referenziert |
| `name` | `string` | ✓ | Anzeigename |
| `schoolId` | `string` | ✓ | Referenz auf `School.id` im selben Tableau |
| `lifespan` | `string?` | — | Lebensdaten, z. B. `"1724–1804"` oder `"~500 v. Chr. –"` |
| `x` | `number?` | — | Position auf der X-Achse, 0–100; links = Empirisch/Substanz, rechts = Rationalistisch/Prozess (je nach Tableau-Achse) |
| `y` | `number?` | — | Position auf der Y-Achse, 0–100; **y=100 = oben (top-Pol), y=0 = unten (bottom-Pol)** |
| `graphX` | `number?` | — | **InfluenceGraph manual layout:** absolute SVG-x-Position des Knotens |
| `graphY` | `number?` | — | **InfluenceGraph manual layout:** absolute SVG-y-Position des Knotens |
| `lectio_brief` | `string?` | — | 2–3-Satz-Ankerpunkt für Lectio-Modus; Fallback-Kette: `step_brief` → `lectio_brief` → `versions[level]` |
| `firstLevel` | `number` | ✓ | geerbt |
| `versions` | `Record<number, string>` | ✓ | geerbt; Text kann `[[Begriff:Erklärung]]`-Annotationen enthalten |

**Vitest-geprüft:** `Thinker.id` muss als `nodeId` in Lectios vorhanden sein (Regel 1).

---

### 1.6 `Influence` (extends Versioned)

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `from` | `string` | ✓ | `Thinker.id` des Ausgangsknotens (Quelle der Beziehung) |
| `to` | `string` | ✓ | `Thinker.id` des Zielknotens |
| `type` | `InfluenceType` | ✓ | Art der Beziehung (siehe unten) |
| `firstLevel` | `number` | ✓ | Muss ≥ `max(from.firstLevel, to.firstLevel)` sein — Kante erscheint nie früher als ihr spätester Endpunkt |
| `versions` | `Record<number, string>` | ✓ | Beschreibungstext der Beziehung |

#### `InfluenceType`

| Wert | Bedeutung |
|---|---|
| `'influence'` | X beeinflusste Y — from = Influencer, to = Beeinflusster; im UI: „Einfluss →/← Einfluss" je nach Perspektive |
| `'critique'` | Intellektuelle Konfrontation zwischen zwei Positionen. Mehrheitsmuster in den Daten: from = Kritiker, to = Kritisierter (wie `influence`); einzelne Einträge weichen ab. Die StarChart rendert `critique` undirektional als „Kritik" — die from/to-Richtung ist im UI nicht sichtbar und nicht bedeutungstragend; die Beziehung lebt im `versions`-Text. |
| `'parallel'` | Unabhängige Entwicklung von Ähnlichem — symmetrisch, Richtung bedeutungslos |
| `'rejection'` | Vollständige Ablehnung einer Position. Richtungskonvention in den Daten inkonsistent (nicht bedeutungstragend). Rendert undirektional als „Verwerfung" ohne Richtungsangabe; die Bedeutung lebt im `versions`-Text. |

**Vitest-geprüft:** `from` und `to` müssen gültige Knoten-IDs im Tableau sein (Regel 6).

---

### 1.7 `Concept` (extends Versioned)

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `string` | ✓ | Eindeutiger Bezeichner, als `nodeId` in Lectios referenziert |
| `name` | `string` | ✓ | Anzeigename |
| `x` | `number` | ✓ | Position 0–100 auf X-Achse |
| `y` | `number` | ✓ | Position 0–100 auf Y-Achse (y=100 oben) |
| `type` | `ConceptType` | ✓ | Glyph-Kategorie (siehe unten) |
| `schoolId` | `string?` | — | Zugehörige Schule (färbt den Konzept-Marker in deren Farbe) |
| `primaryThinker` | `string?` | — | `Thinker.id`-Override: Wenn gesetzt, wird das Konzept im Sternkarten-Akkordeon unter diesem Denker eingeklappt statt als Waisen-Marker zu erscheinen. Wenn der Denker nicht sichtbar ist oder `primaryThinker` fehlt, erscheint das Konzept als eigener Marker an x/y. |
| `labelOffset` | `LabelOffset?` | — | Feinpositionierung des Konzept-Labels in der Sternkarte (verhindert Label-Kollision) |
| `lectio_brief` | `string?` | — | 2–3-Satz-Ankerpunkt für Lectio-Modus |
| `firstLevel` | `number` | ✓ | geerbt |
| `versions` | `Record<number, string>` | ✓ | geerbt |

#### `ConceptType` (Glyph-Mapping)

| Wert | Glyph | Bedeutung | Test-Frage |
|---|---|---|---|
| `'axiom'` | ◆ | Gesetzte Grundannahme oder Forderung, nicht weiter ableitbar | Lässt sich als Satz formulieren, der eine Position behauptet? |
| `'theory'` | ⌘ | Strukturiertes Modell mit innerer Logik | Hat innere Struktur? Beantwortet „Wie funktioniert X?" |
| `'concept'` | ❖ | Terminus, mit dem ein Denker arbeitet | Steht für etwas, ohne selbst Theorie zu sein? |
| `'phenomenon'` | ◎ | Beobachtbare Lage oder Bewegung | Würde es ohne den Namen existieren? |
| `'method'` | ⚡ | Anwendbares Verfahren oder Praxis | Lässt sich als Anleitung formulieren? |

#### `LabelOffset` (Sternkarte-spezifisch)

```typescript
{
  dx: number;                        // horizontale Verschiebung in SVG-Einheiten
  dy: number;                        // vertikale Verschiebung
  anchor: 'middle' | 'start' | 'end';  // SVG text-anchor
}
```

Nur für Fälle, wo der automatische Label-Placement kollidiert.

---

### 1.8 `TopicData.contextByLevel`

| Feld | Typ | Bedeutung |
|---|---|---|
| `contextByLevel` | `Record<number, string \| null>?` | Level-ID → Kontexttext; erscheint als Kontext-Strip unter dem Level-Slider; `null` = kein Text auf diesem Level |

---

## 2. Lectio-Format (`Lectio`)

```
Lectio
 ├── id, tableauId, title, focus, thesis
 ├── path_type?, ton?, level, estimated_minutes
 ├── intro
 ├── path: LectioStep[]
 ├── closing_synthesis, closing_kernel?, closing_question
```

### 2.1 `Lectio` (Top-Level)

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `string` | ✓ | URL-Slug, muss mit Dateiname übereinstimmen |
| `tableauId` | `string` | ✓ | Referenz auf das Eltern-Tableau (`Topic.id`) |
| `title` | `string` | ✓ | Anzeigename der Lectio |
| `focus` | `string` | ✓ | Ein-Satz-Beschreibung des kuratorischen Fokus (für Discovery-Karte) |
| `thesis` | `string` | ✓ | Explizitere Einleitung, sichtbar auf der Lectio-Seite vor `intro` |
| `path_type` | `string?` | — | Pfad-Typ-Bezeichner: `'narrativ-historisch'`, `'konkurrierend-konfrontativ'`, `'emotional-kumulativ'`, `'destruktiv-aufbauend'`, `'kontemplativ-vertiefend'` — kuratorische Selbst-Beschreibung, kein Render-Schalter |
| `ton` | `'expositorisch' \| 'erzählend-erfahrend' \| 'gemischt'?` | — | Fehlend = `expositorisch`; steuert welchen Viewer die Lectio bekommt (siehe Render-Pfade unten) |
| `level` | `number` | ✓ | Empfohlenes Einstiegs-Level (1–5); beeinflusst welche Knoten-Texte angezeigt werden |
| `estimated_minutes` | `number` | ✓ | Geschätzte Lesedauer in Minuten |
| `intro` | `string` | ✓ | Einleitungstext vor der ersten Station |
| `path` | `LectioStep[]` | ✓ | Geordnete Stationen des Lesepfads |
| `closing_synthesis` | `string` | ✓ | Abschluss-Text nach der letzten Station |
| `closing_kernel` | `string?` | — | Exakter Teilstring des **letzten Absatzes** von `closing_synthesis` → wird hervorgehoben. Constraint: `closing_synthesis.split('\n').filter(Boolean).last.includes(closing_kernel)` |
| `closing_question` | `string` | ✓ | Offene Schlussfrage an den Leser |

**Vitest-geprüft:**
- `closing_kernel ⊆ letzter Absatz der closing_synthesis` (Regel 3 / describe block 3)
- Alle `nodeId`-Referenzen im `path` müssen im Tableau existieren (Regel 1)

---

### 2.2 `LectioStep`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `nodeId` | `string \| string[]` | ✓ | ID(s) des Tableau-Knotens — `string[]` für Doppelstationen (zwei Knoten gleichzeitig) |
| `nodeType` | `'thinker' \| 'concept' \| 'school'` | ✓ | Knotentyp (muss mit dem Typ im Tableau übereinstimmen) |
| `transition` | `string` | ✓ | Übergangstext zur nächsten Station; in erzählenden Lectios inhaltlich identisch mit `narrative.bridge` |
| `step_brief` | `string?` | — | Überschreibt den Knoten-Text **nur für diese Station** (kein `versions`-Fallback, kein `lectio_brief`). Für Ein-Werk-Lectios, die denselben Knoten mehrfach mit verschiedenem Text zeigen. Nur bei Einzelknoten-Stationen (kein `string[]`-`nodeId`). Annotationsfrei. |
| `ton` | `'erzählend-erfahrend' \| 'nüchtern-klar' \| 'expositorisch'?` | — | Per-Step-Ton-Override — aktiv bei `Lectio.ton === 'gemischt'`; steuert visuellen Stil der Station |
| `narrative` | `LectioNarrative?` | — | Erzählende Form; **Rendering-Gate:** Stationen ohne `narrative` werden im `LectioNarrativeViewer` vollständig ignoriert |
| `image` | `string?` | — | Öffentlicher Bildpfad, z. B. `"/lectio-images/Ruhe oder Rausch/lectio-epikur.png"` — zeigt Bild-Nische im erzählenden Viewer |
| `image_prompt` | `string?` | — | Generierungs-Prompt für das Bild; **nicht im UI verwendet**, nur Datensicherung |

**Vitest-geprüft:** Alle referenzierten `image`-Pfade müssen in `public/` existieren (Regel 5).

**Render-Pfade:**

| `Lectio.ton` | `step.narrative` | Render-Ergebnis |
|---|---|---|
| `expositorisch` oder fehlt | fehlt | Expositorischer Viewer: `step_brief` → `lectio_brief` → `versions[level]`, dann `transition` |
| `erzählend-erfahrend` | vorhanden | Narrativer Viewer: `hook → body → bridge`, `image`-Nische wenn `!!step.image && stepTon !== 'nüchtern-klar'` |
| `gemischt` | vorhanden | Narrativer Viewer, per-Step `ton` steuert visuellen Stil |
| `gemischt` | fehlt | Station wird im narrativen Viewer ausgelassen |

---

### 2.3 `LectioNarrative`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `hook` | `string` | ✓ | Einstieg über Alltagserfahrung — persönlich, ohne Denker-Namen |
| `body` | `string[]` | ✓ | 1–3 Absätze erzählende Lehre — hier sitzt der `kernel` |
| `kernel` | `string` | ✓ | **Exakter Teilstring** aus mindestens einem `body`-Absatz; wird als `<em class="kernel">` hervorgehoben. Constraint: `body.join('\n').includes(kernel)` |
| `bridge` | `string` | ✓ | Übergang zur nächsten Station — inhaltlich identisch mit `step.transition` (redundante Kopie; Renderer liest `narrative.bridge`, ignoriert `step.transition`) |

**Vitest-geprüft:** `kernel ⊆ body.join('\n')` (Regel 2 / describe block 2).

**Render-Detail:** `kernel` wird nur in `body`-Absätzen hervorgehoben, nie in `hook` oder `bridge`. Bei mehreren Body-Absätzen: erster Absatz, der `kernel` enthält, wird hervorgehoben (de facto immer der letzte, kurze Schlag-Absatz).

---

### 2.4 Text-Fallback-Kette (Station-Text)

Für expositorische Stationen (oder erzählende Stationen im expositorischen Viewer):

```
step_brief  →  lectio_brief (aus Knoten)  →  versions[level]
```

Für erzählende Stationen:

```
narrative.{hook, body, kernel, bridge}  [kein Fallback — step_brief/lectio_brief werden ignoriert]
```

---

### 2.5 `LectioSummary` (Kompakt-Vorschau)

Wird von `getLectiosByTableauId()` geliefert für die Discovery-Karten im Tableau-Kopf.

| Feld | Typ | Bedeutung |
|---|---|---|
| `id` | `string` | Lectio-ID |
| `title` | `string` | Anzeigename |
| `focus` | `string` | Ein-Satz-Beschreibung |
| `estimated_minutes` | `number` | Lesedauer |
| `stationCount` | `number` | Anzahl Stationen (`path.length`) |
| `ton` | `string?` | Ton-Feld der Lectio |

---

## 3. Lebensfragen-Format (`Lebensfrage`)

Nirgends außerhalb von `types.ts` dokumentiert.

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `string` | ✓ | URL-Slug, muss mit Dateiname in `data/lebensfragen/` übereinstimmen |
| `title` | `string` | ✓ | Anzeigename als Frage, z. B. `"Was tue ich mit Schmerz?"` |
| `anker` | `string` | ✓ | Ein-Satz-Einstieg — nennt die Frage in direkter Form |
| `intro` | `string` | ✓ | Längerer Einleitungstext mit konkreter Alltagssituation (kann `\n`-Absätze enthalten) |
| `stimmen` | `LebensfrageStimme[]` | ✓ | Geordnete Stimmen-Sammlung (Reihenfolge ist kuratorisch, nicht hierarchisch) |
| `schluss` | `string` | ✓ | Abschluss — benennt Spannungen, gibt keine Lösung; phänomenologische Sprache |
| `kuratiert` | `string` | ✓ | Datum-String, z. B. `"Mai 2026"` — macht die Lebensfrage zeitlich verortbar |
| `kuratiert_aus_tableaus` | `string[]` | ✓ | Array der `Topic.id`s, die berücksichtigt wurden (nicht nur die, aus denen Stimmen stammen) |

### 3.1 `LebensfrageStimme`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `aus.tableau` | `string` | ✓ | `Topic.id` des Herkunfts-Tableaus |
| `aus.knoten` | `string` | ✓ | `Thinker.id` / `Concept.id` des Herkunfts-Knotens im Tableau |
| `ueberschrift` | `string` | ✓ | Kurze Überschrift der Stimme, z. B. `"Buddhismus: Schmerz und Leid sind nicht dasselbe"` |
| `text` | `string` | ✓ | Stimmen-Text; **zur Lebensfrage hin neu geschrieben** — kein Copy-Paste aus `versions`; keine `[[Annotationen]]` |

**Nicht Vitest-geprüft:** Lebensfragen-Daten werden von keiner Vitest-Regel geprüft.

---

## 4. Annotation-Syntax (in `versions`-Texten)

Annotationen werden in `Thinker.versions`, `Concept.versions`, `Influence.versions` und `Topic.synthesis` verwendet. **Nicht** in `lectio_brief`, `step_brief`, `LebensfrageStimme.text`.

### Format A — Term innerhalb der Klammern

```
"begründet die [[Tugendethik:die Lehre vom guten Charakter als Fundament der Moral]] in der ..."
"([[Atman:das göttliche, unveränderliche Ich im Vedanta — Sanskrit für ›Selbst‹ oder ›Atem‹]])"
```

Separator: **Doppelpunkt** (primär), Em-Dash ` — ` (Fallback wenn kein Doppelpunkt). Doppelpunkt wird **vor** Em-Dash geprüft.

### Format B — Term vor den Klammern

```
"der stille Zeuge Atman [[das göttliche, unveränderliche Ich]] hinter allem Erleben"
```

Das letzte Wort vor `[[` wird als Term verwendet. Führende Satzzeichen (z. B. `(`) werden abgetrennt.

### Kursiv

```
*kursiver Text* → <em>
```

Gilt auf allen Leveln.

---

## 5. Vitest-Regeln (automatisch geprüft)

Datei: `src/lib/__tests__/data-validation.test.ts`

| Regel | Was wird geprüft | Schlägt fehl wenn |
|---|---|---|
| 1 | Lectio `nodeId`-Referenzen | nodeId existiert nicht im zugehörigen Tableau |
| 2 | `narrative.kernel ⊆ narrative.body` | kernel nicht als Teilstring in `body.join('\n')` |
| 3 | `closing_kernel ⊆ letzter Absatz von closing_synthesis` | gesetzter kernel nicht im letzten Synthese-Absatz |
| 4 | (nicht vergeben) | — |
| 5 | `step.image`-Existenz in `public/` | referenzierter Bildpfad nicht vorhanden |
| 6 | `Influence.from/to` sind gültige Knoten-IDs | from/to nicht in Thinker-, Concept- oder School-IDs des Tableaus |
| 7 | `Concept.primaryThinker` ist nicht-leerer String | primaryThinker gesetzt, aber kein String oder leer |
| 8 | Legacy-Feld `brief` in `LectioStep` | Irgendeine Station hat `'brief' in step` (statt `step_brief`) |
| 9 | `closing_kernel`-Überblick | informativ, schlägt nie fehl — zeigt welche Lectios closing_kernel gesetzt haben |

**Nicht geprüft:** Lebensfragen-Daten, `school.cluster`, `labelOffset`, Koordinaten-Plausibilität, Schulen-Konvention (Ein-Denker-Schulen), `firstLevel`-Stufungs-Regel für Influences.

---

## 6. Abweichungen `mild-mode.md` vs. `types.ts`

| Thema | `mild-mode.md §Schema-Felder` | `types.ts` (Primärquelle) |
|---|---|---|
| Optionale Felder Thinker | listet: id, name, lifespan, firstLevel, schoolId, x, y, versions | zusätzlich: `graphX`, `graphY`, `lectio_brief` |
| Optionale Felder Concept | listet: id, name, type, firstLevel, x, y, versions | zusätzlich: `schoolId`, `primaryThinker`, `labelOffset`, `lectio_brief` |
| Optionale Felder School | nicht aufgeführt | `gx`, `gy`, `labelDir`, `cluster`, `lectio_brief`, `motto` |
| Optionale Felder Influence | listet: from, to, type, firstLevel, versions | vollständig (identisch) |
| Lectio-Format | nicht aufgeführt | vollständig in types.ts |
| Lebensfragen-Format | nicht aufgeführt | vollständig in types.ts |

`mild-mode.md` bleibt unverändert — sie ist Prüf-Anleitung, keine Schema-Referenz.
