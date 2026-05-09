# /add-thinker — Neuen Denker zu einem Themengebiet hinzufügen

Du hilfst dem User, einen neuen Denker korrekt ins JSON-Datenformat von Sanctum Mentis einzutragen.

## Eingabe

Der User übergibt: `$ARGUMENTS`

Extrahiere daraus so viele Infos wie möglich. Was fehlt, frag nach — aber alles auf einmal, nicht Frage für Frage.

**Pflichtfelder:**
- `name` — vollständiger Name des Denkers (z.B. "David Hume")
- `topicId` — in welches Themengebiet? (z.B. "erkenntnistheorie") — entspricht dem Dateinamen in `data/`
- `schoolId` — welcher Schule gehört er an? (muss in `data/<topicId>.json` unter `schools` existieren oder neu angelegt werden)
- `firstLevel` — ab welchem Level (1–5) taucht der Denker auf?
- `versions` — mindestens eine Beschreibung, z.B. für Level `firstLevel`. Weitere für höhere Level sind optional aber wertvoll.

**Optionale Felder:**
- `x`, `y` — Position im Quadranten-Raum (0–100, mathematisch: y=0 unten, y=100 oben). Wenn nicht angegeben, schlag eine plausible Position vor basierend auf der Schulzugehörigkeit und den Achsenbeschriftungen im Topic.
- `lifespan` — Lebensdaten als String, z.B. "1711–1776"

## Vorgehen

1. Lies `data/<topicId>.json` um das existierende Schema zu verstehen (Achsen, Schulen, bestehende Denker).
2. Prüfe ob `schoolId` bereits unter `schools` existiert. Wenn nicht: frag ob eine neue Schule angelegt werden soll (mit `label` und `color` als oklch-Wert).
3. Generiere einen `id`-Slug aus dem Namen (lowercase, Umlaute ersetzen: ä→ae, ö→oe, ü→ue, ß→ss, Leerzeichen→Bindestrich).
4. Schlage `x`/`y`-Position vor wenn nicht angegeben — begründe kurz warum (z.B. "Hume ist Empirist → linke Hälfte der x-Achse").
5. Zeige den fertigen JSON-Block zur Bestätigung:

```jsonc
{
  "id": "hume",
  "name": "David Hume",
  "lifespan": "1711–1776",
  "firstLevel": 2,
  "schoolId": "empirismus",
  "x": 15,
  "y": 40,
  "versions": {
    "2": "Alles Wissen stammt aus Sinneserfahrungen.",
    "4": "Hume zeigt, dass Kausalität keine logische Notwendigkeit ist, sondern eine psychologische Gewohnheit (custom and habit)."
  }
}
```

6. Nach Bestätigung: trag den Block in `data/<topicId>.json` unter `thinkers` ein — alphabetisch nach `name` sortiert ist schön, aber nicht Pflicht.
7. Falls eine neue Schule nötig ist, trag sie gleichzeitig unter `schools` ein.

## JSON-Schema zur Referenz

```typescript
// Thinker
{
  id: string            // slug, eindeutig im Topic
  name: string          // Anzeigename
  lifespan?: string     // "1724–1804"
  firstLevel: number    // 1–5
  schoolId: string      // muss unter schools existieren
  x: number             // 0–100, Quadrant x-Achse
  y: number             // 0–100, y=0 unten / y=100 oben (mathematisch)
  versions: Record<number, string>  // mind. 1 Eintrag
}

// School (falls neu)
{
  id: string
  label: string
  color: string         // oklch(...) — lesbar auf hellem Pergament, z.B. oklch(0.40 0.14 250)
}
```

## Tonalität der Versions-Texte

- Level 1–2: ein Satz, alltagsnah, kein Fachvokabular
- Level 3: zwei Sätze, ein Fachbegriff eingeführt
- Level 4–5: präzise, mit Querverweis auf andere Denker oder Werke erlaubt

## Was du NICHT tust

- Nie `firstLevel` höher setzen als die niedrigste `versions`-Nummer
- Nie Schul-Farben als Hex oder RGB — immer oklch()
- Nicht in `data/library.json` eingreifen (das ist die Topic-Übersicht, kein Denker-Register)
