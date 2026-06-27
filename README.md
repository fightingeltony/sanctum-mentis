# Sanctum Mentis

Lern-Companion für Philosophie und verwandte Disziplinen. Ein Komplexitäts-Slider (1–5) steuert, wie tief jede Antwort ausfällt — von der Einsteigerkurzfassung bis zur fachlichen Synthese.

## Aufbau: Tableaus, Lectios, Lebensfragen

Inhalte sind in drei Formen organisiert (begriffliche Definition in `kanon.md`):

- **Tableau** — die Karte eines Feldes: alle Stimmen einer großen Frage gleichzeitig, räumlich, selbstgesteuert. Jedes Tableau ist ein JSON-Datensatz in `data/`.
- **Lectio** — ein kuratierter Pfad *durch ein* Tableau (4–8 Stationen), erreichbar über „Geführte Pfade" im Tableau-Kopf (Route `/lectio/[id]`).
- **Lebensfrage** — eine Sammlung quer *über mehrere* Tableaus zu einer gelebten Lage (Route `/lebensfragen/[id]`).

## Ein Tableau betreten — zwei Ansichten

1. **Denker** — die Stimmen, gruppiert nach Schule, mit Filter und Such-Palette (Cmd+K).
2. **Sternkarte** — die Stimmen als Sterne, Einflüsse als Linien, Konzepte im Akkordeon bzw. als Marker, Schulen als Morph-Gruppen. (Die früher getrennten Sichten „Einflüsse" und „Konzepte" sind hier aufgegangen.)

Jedes Element trägt mehrere Versions-Strings (Level 1 bis Level 5). Die Engine wählt zur Laufzeit die höchste, die der eingestellte Level zulässt.

## Tech-Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- React 19
- cmdk (Command Palette)
- Vitest (Datenvalidierung der JSON-Datensätze)

## Lokal starten

```bash
npm install
npm run dev
```

Dann auf http://localhost:3000 öffnen. Direkter Link zum Beispiel-Tableau: http://localhost:3000/thema/das-selbst

## Neues Tableau anlegen

1. JSON-Datei in `data/` anlegen (Vorlage: `data/das-selbst.json`)
2. In `data/library.json` einen Eintrag mit `id`, `title`, `status` ergänzen
3. In `src/lib/data.ts` importieren und in der `TOPICS`-Map registrieren

(In Claude Code geht das auch über den Skill `/new-topic`.)

## Verwandte Codebase

Geklont aus [Carta Librorum](../carta-librorum), das die gleiche Engine-Architektur als spoilerfreien Buch-Companion einsetzt.
