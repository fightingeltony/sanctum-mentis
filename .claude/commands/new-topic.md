# /new-topic — Neues Themengebiet anlegen

Du legst ein neues Themengebiet für Sanctum Mentis an. Das sind drei Schritte: JSON-Datei erstellen, in library.json registrieren, in data.ts importieren.

## Eingabe

Der User übergibt: `$ARGUMENTS`

Extrahiere daraus: Titel des Themengebiets, ggf. erste Ideen für Denker oder Achsen.

**Pflichtfelder die du brauchst:**
- `title` — Anzeigename, z.B. "Bewusstsein & Kognition"
- `id` — slug, z.B. "bewusstsein" (lowercase, Bindestrich statt Leerzeichen)
- `subtitle` — ein Satz der das Thema beschreibt
- `axisX` — linke und rechte Beschriftung (z.B. "Empirisch" ↔ "Rationalistisch")
- `axisY` — obere und untere Beschriftung (z.B. "Universell" ↔ "Kontextuell")
- `accent` — Akzentfarbe als oklch(), z.B. `oklch(0.42 0.14 250)` für Blau-Violett

Was fehlt, frag nach — alles auf einmal.

## Schritt 1 — data/<id>.json anlegen

Erstelle `data/<id>.json` mit dieser Vorlage:

```jsonc
{
  "topic": {
    "id": "<id>",
    "title": "<title>",
    "subtitle": "<subtitle>",
    "theme": {
      "accent": "<accent>",
      "accentSoft": "<accent mit / 0.15 am Ende>"
    },
    "complexityLevels": 5,
    "quadrants": {
      "axisX": {
        "label": "<axisX-label>",
        "left": "<left>",
        "right": "<right>"
      },
      "axisY": {
        "label": "<axisY-label>",
        "top": "<top>",
        "bottom": "<bottom>"
      }
    }
  },
  "levels": [
    { "id": 1, "label": "Einstieg",     "short": "L1" },
    { "id": 2, "label": "Grundlagen",   "short": "L2" },
    { "id": 3, "label": "Vertiefung",   "short": "L3" },
    { "id": 4, "label": "Analyse",      "short": "L4" },
    { "id": 5, "label": "Synthese",     "short": "L5" }
  ],
  "thinkers": [],
  "schools": [],
  "concepts": [],
  "influences": []
}
```

## Schritt 2 — data/library.json ergänzen

Lies `data/library.json` und füge einen neuen Eintrag hinzu:

```json
{
  "id": "<id>",
  "title": "<title>",
  "subtitle": "<subtitle>",
  "accent": "<accent>",
  "status": "available"
}
```

## Schritt 3 — src/lib/data.ts registrieren

Lies `src/lib/data.ts`. Dort gibt es ein Import-Pattern und eine TOPICS-Map. Füge hinzu:

```typescript
import <camelCaseId>Data from '../../data/<id>.json'
// und in der TOPICS-Map:
'<id>': <camelCaseId>Data as unknown as TopicData,
```

## Nach allen drei Schritten

Zeige eine Zusammenfassung:
- Welche Dateien wurden geändert
- Direktlink zum neuen Topic: http://localhost:3030/thema/<id>
- Nächster Schritt: `/add-thinker` aufrufen um erste Denker hinzuzufügen

## Was du NICHT tust

- Keine Denker, Schulen oder Konzepte in die neue Datei eintragen — das ist Aufgabe von `/add-thinker`
- `accentSoft` ist immer `accent` + ` / 0.15` in der oklch-Schreibweise: `oklch(0.42 0.14 250 / 0.15)`
- Status ist immer `"available"` — nie `"coming"` für ein gerade angelegtes Topic
