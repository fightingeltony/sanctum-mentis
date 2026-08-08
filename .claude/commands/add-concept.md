# /add-concept – Neues Konzept zu einem Themengebiet hinzufügen

Du hilfst dem User, ein neues Konzept korrekt ins JSON-Datenformat von Sanctum Mentis einzutragen.

## Eingabe

Der User übergibt: `$ARGUMENTS`

Extrahiere daraus so viele Infos wie möglich. Was fehlt, frag nach – aber alles auf einmal, nicht Frage für Frage.

**Pflichtfelder:**
- `name` – Anzeigename des Konzepts (z.B. "Kategorischer Imperativ")
- `topicId` – in welches Themengebiet? (z.B. "das-selbst") – entspricht dem Dateinamen in `data/`
- `type` – Konzept-Kategorie (s.u.) – wenn nicht klar, schlag eine vor und begründe
- `firstLevel` – ab welchem Level (1–5) taucht das Konzept auf?
- `versions` – mindestens eine Beschreibung für Level `firstLevel`. Weitere für höhere Level optional aber wertvoll.

**Optionale Felder:**
- `x`, `y` – Position im Quadranten-Raum (0–100, mathematisch: y=0 unten, y=100 oben). Wenn nicht angegeben, schlag eine plausible Position vor basierend auf den Achsenbeschriftungen des Topics.
- `schoolId` – Schulzugehörigkeit (falls das Konzept einer bestimmten Schule gehört)
- `labelOffset` – `{ dx, dy, anchor }` um Label-Überlappungen zu vermeiden (Standard: `{ dx: 12, dy: 0, anchor: "start" }`)

## Konzept-Typen (Pflichtfeld `type`)

| Typ | Glyph | Label | Bedeutung |
|-----|-------|-------|-----------|
| `axiom` | ◆ | Axiom / Urgrund | Unumstössliches Fundament – nicht weiter ableitbar. Grundannahme einer ganzen Weltanschauung. Beispiele: Atman, Cogito ergo sum, Tabula rasa (als Behauptung). |
| `theory` | ⌘ | Theorie / Modell | Komplexes Erklärungsgebäude oder Modell – mehrere Annahmen, erklärt ein breites Phänomenfeld. Beispiele: Ego-Tunnel, Individuation, Free-Energy-Prinzip. |
| `concept` | ❖ | Begriff / Konzept | Spezifischer Fachbegriff oder Bauelement innerhalb einer Theorie. Präzise, aber kein eigenständiges Erklärungssystem. Beispiele: A-priori, Nukleares Selbst, Lebensstrom. |
| `phenomenon` | ◎ | Phänomen | Beobachtung oder beschreibbarer Zustand – das Explanandum, nicht die Erklärung. Beispiele: Induktionsproblem, Illusion des Selbst, Flow. |
| `method` | ⚡ | Methode / Praxis | Erkenntnisweg oder anwendbare Praxis. Anleitung zum Tun. Beispiele: Falsifikation, Vipassanā, Epoché. |

**Entscheidungshilfe:**
- Ist es eine Grundannahme die als wahr vorausgesetzt wird? → `axiom`
- Erklärt es viele Phänomene mit einem Modell? → `theory`
- Ist es ein präziser Begriff innerhalb einer Theorie? → `concept`
- Beschreibt es etwas das zu erklären wäre? → `phenomenon`
- Ist es eine Praxis oder Methode? → `method`

## Vorgehen

1. Lies `data/<topicId>.json` um das existierende Schema zu verstehen (Achsen, Schulen, bestehende Konzepte).
2. Generiere einen `id`-Slug aus dem Namen (lowercase, Umlaute ersetzen: ä→ae, ö→oe, ü→ue, ss→ss, Leerzeichen→Bindestrich).
3. Schlage `type` vor falls nicht angegeben – begründe kurz.
4. Schlage `x`/`y`-Position vor wenn nicht angegeben – begründe anhand der Achsenbeschriftungen des Topics.
5. Zeige den fertigen JSON-Block zur Bestätigung:

```jsonc
{
  "id": "kategorischer-imperativ",
  "name": "Kategorischer Imperativ",
  "firstLevel": 3,
  "type": "axiom",
  "schoolId": "kantianismus",
  "x": 65,
  "y": 78,
  "versions": {
    "3": "Handle so, dass die Maxime deines Willens zugleich als allgemeines Gesetz gelten könnte.",
    "5": "Das Sittengesetz ist apriorisch und gilt unabhängig von Neigungen oder Konsequenzen – kategorisch, nicht hypothetisch."
  }
}
```

6. Nach Bestätigung: trag den Block in `data/<topicId>.json` unter `concepts` ein.

## JSON-Schema zur Referenz

```typescript
// Concept
{
  id: string            // slug, eindeutig im Topic
  name: string          // Anzeigename
  firstLevel: number    // 1–5
  type: 'axiom' | 'theory' | 'concept' | 'phenomenon' | 'method'
  schoolId?: string     // optional – welcher Schule zugehörig
  x: number             // 0–100, Quadrant x-Achse
  y: number             // 0–100, y=0 unten / y=100 oben (mathematisch)
  versions: Record<number, string>  // mind. 1 Eintrag
  labelOffset?: { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' }
}
```

## Tonalität der Versions-Texte

- Level 1–2: ein Satz, alltagsnah, kein Fachvokabular
- Level 3: zwei Sätze, ein Fachbegriff eingeführt
- Level 4–5: präzise, philosophisch dicht, Querverweis auf Denker oder Werke erlaubt

## Was du NICHT tust

- Nie `firstLevel` höher setzen als die niedrigste `versions`-Nummer
- Nie einen `type` erfinden der nicht in der Tabelle steht
- Nie `x`/`y` ausserhalb von 0–100 setzen
- Nicht in `data/library.json` eingreifen
