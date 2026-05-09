# Sanctum Mentis — Backlog

## Zuletzt abgeschlossen

### Session 2025-05-09
- [x] **Deployment:** Vercel + GitHub live (sanctum-mentis)
- [x] **Philosophie des Geistes v2:** 16 Denker, 15 Schulen, 17 Konzepte, 17 Einfluss-Kanten
  - Hinzugefügt: Wittgenstein (L1), Davidson (L2), Jackson (L3), Tononi (L5)
  - Entfernt: Putnam
  - Konzept↔Konzept-Kanten in Denker-Kanten integriert (nicht separat modelliert)
  - Einfluss-Mapping: development/opposition/shared_diagnosis → influence/critique/parallel
- [x] **Bug:** `school.name` → `school.label` in InfluenceGraph, ThinkerList, CommandPalette, types.ts
- [x] **library.json:** Subtitle Philosophie des Geistes aktualisiert
- [x] **Stufe 1 — Side-Panel (Frontend):**
  - InfluenceGraph: 320px-Panel rechts, Canvas schrumpft; Ausgehende+Eingehende Einflüsse als klickbare Links
  - QuadrantPlot: 300px-Panel rechts, Canvas schrumpft; Konzept-Typ-Badge + "Aus dieser Schule"
  - Mobile: Fallback-Karte unterhalb Canvas (sm:hidden)

---

## Offen

### Stufe 1 — Content-Erweiterung (1 Nachmittag pro Tableau)
- [ ] **Philosophie des Geistes:** Versioned-Texte für Denker und Konzepte von 1–2 Sätzen auf 4–6 Sätze ausbauen
- [ ] **Das Selbst:** gleiches für alle Denker und Konzepte

### Validierung (nach Content-Erweiterung)
- [ ] Zweites vollständiges Tableau bauen (Erkenntnistheorie: ~6 Denker, ~6 Konzepte, ~8 Einflüsse)
- [ ] Side-Panel in Nutzung beobachten — taugen die Beschreibungen für 4–6 Sätze?

### Entscheidung: Stufe 2 (nach Validierung)
- [ ] Knotentyp-spezifische Panel-Inhalte?
  - Option A: `argument_structure`-Feld für Argumente (Wissensargument, Cogito)
  - Option B: `kernthese` + `kritik`-Felder für Theorien
  - Option C: einheitlich — reiche Fliesstext-Versionen reichen aus
- [ ] Aufwand Stufe 2: ~2–3 Tage Frontend + retrospektive Content-Pflege aller Tableaus

---

## Ideen-Pool

| Idee | Prio | Aufwand |
|------|------|---------|
| Denker-zu-Konzept-Kanten (Wer prägte welches Konzept?) | Mittel | Schema + Content |
| Keyboard-Navigation im Einfluss-Graph (Tab zwischen Knoten) | Niedrig | 0.5d |
| "Clash-Modus": Split-Screen zwei Denker nebeneinander | Niedrig | 2–3d |
| Erkenntnistheorie-Tableau (Platon, Aristoteles, Hume, Kant, Quine, Popper) | Hoch | 1 Nachmittag Content |
| Ethik-Tableau | Mittel | 1d Content |
