# Sanctum Mentis

Lern-Companion für Philosophie. Ein Komplexitäts-Slider (1–5) steuert, wie tief jede Antwort ausfällt — von der Einsteigerkurzfassung bis zur fachlichen Synthese.

## Drei Sichten pro Themengebiet

1. **Denker** — gruppiert nach philosophischer Schule, mit Filter und Such-Palette (Cmd+K).
2. **Einflüsse** — Graph der Beziehungen (beeinflusste, kritisierte, war Schüler von, parallel, verwarf).
3. **Konzepte** — verortet im 4-Quadranten-Raum, dessen Achsen pro Thema definiert werden (z.B. "Empirisch ↔ Rationalistisch" / "Universell ↔ Kontextuell").

Jedes Element trägt mehrere Versions-Strings (Level 1 bis Level 5). Die Engine wählt zur Laufzeit die höchste, die der eingestellte Level zulässt.

## Tech-Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- React 19
- cmdk (Command Palette)

## Lokal starten

```bash
npm install
npm run dev
```

Dann auf http://localhost:3000 öffnen. Direkter Link zum Beispiel-Themengebiet: http://localhost:3000/thema/erkenntnistheorie

## Neues Themengebiet anlegen

1. JSON-Datei in `data/` anlegen (Vorlage: `data/erkenntnistheorie.json`)
2. In `data/library.json` einen Eintrag mit `id`, `title`, `status` ergänzen
3. In `src/lib/data.ts` importieren und in der `TOPICS`-Map registrieren

## Verwandte Codebase

Geklont aus [Carta Librorum](../carta-librorum), das die gleiche Engine-Architektur als spoilerfreien Buch-Companion einsetzt.
