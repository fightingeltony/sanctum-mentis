# Sanctum Mentis — Backlog

## Zuletzt abgeschlossen

### Session 2026-05-10
- [x] **Mobile Dark-Mode Fix:** `color-scheme: light` in globals.css + Next.js Viewport API — verhindert Chrome Android "Force Dark Mode"
- [x] **Glossar-Modus `[[Annotationen]]`:** `src/lib/annotations.tsx` neu, `Annotated`-Renderer in InfluenceGraph, QuadrantPlot, ThinkerList verdrahtet
- [x] **QuadrantPlot → Denker-Navigation:** `onThinkerClick`-Callback — Klick auf Denker im Konzept-Panel wechselt direkt zum Denker-Tab mit Highlight
- [x] **Content-Erweiterung Philosophie des Geistes:** Alle 16 Denker + 17 Konzept-Beschreibungen auf 4–6 Sätze ausgebaut, L1-Annotationen für Fachbegriffe eingefügt
- [x] **Das Selbst — 10 neue Einfluss-Kanten (L2–L5):** Auflösung der drei parallelen Cluster (Spiritualität / Psychotherapie / Neurowissenschaft); 13 von 15 Denkern jetzt vernetzt
- [x] **Build-Fix:** `s`-Flag aus Regex in annotations.tsx entfernt (ES2018-Inkompatibilität im TypeScript-Target)

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
  - **Mobile (< 640px): altes Design** — Detail-Karte unterhalb des Canvas (`sm:hidden`), kein Side-Panel; ist eine bewusste Entscheidung und soll so bleiben

---

## Konzeptionelle Erweiterungen

### [x] Glossar-Modus auf L1
**Status:** entschieden 10.5.26
**Entscheidung:** Inline-Annotationen im `summary`-Feld via `[[doppelte eckige Klammern]]`.
- Ein `summary`-Feld pro Knoten — keine Duplikate
- Annotationen in `[[...]]` eingebettet
- Frontend L1: Annotationen sichtbar rendern (klein, kursiv)
- Frontend L2+: Annotationen per Regex entfernen (`/\[\[.*?\]\]/g` → leer)
- Skaliert über alle Tableaus ohne Pflegekosten

**Abgegrenzt:** `summary_l1` + `summary_default` abgelehnt — 33 Paare in Geistphilosophie allein, skaliert nicht.
Eigenständige L1-Stimme (andere Beispiele, andere Tonlage) ist Aufgabe des Lectio-Modus, nicht des summary-Feldes.
**Nächster Schritt:** Schema und Frontend umsetzen beim nächsten Tableau-Bau.

---

### [x] Side-Panel "Tiefenbohrung" — Stufe 1
**Status:** abgeschlossen 10.5.26
**Umgesetzt:**
- InfluenceGraph: 320px-Panel rechts, Canvas schrumpft; ausgehende + eingehende Kanten als klickbare Links mit Navigation zwischen Knoten
- QuadrantPlot: 300px-Panel rechts; Konzept-Typ-Badge + "Aus dieser Schule" mit `onThinkerClick`-Navigation zum Denker-Tab
- `Annotated`-Renderer in allen drei Komponenten verdrahtet (ThinkerList, InfluenceGraph, QuadrantPlot)
- Content-Erweiterung Philosophie des Geistes: 4–6 Sätze pro Knoten, L1-Annotationen für Fachbegriffe
- Mobile: Detail-Karte unterhalb Canvas (`sm:hidden`) — bewusste Entscheidung, bleibt so
**Nächster Schritt:** Zweites Tableau (Das Selbst) mit gleicher Tiefe ausbauen, dann über Stufe 2 entscheiden.

---

### [ ] Side-Panel "Tiefenbohrung" — Stufe 2
**Status:** diskutiert 10.5.26, abhängig von Stufe 1
**Kontext:** Knotentyp-spezifische Layouts. Gedankenexperimente brauchen Schritt-für-Schritt-Reveal (Setup → Frage → Antwort → Schluss); Theorien brauchen Kernthese + Hauptargument + Hauptkritik; Methoden brauchen Ziel + Schritte + Limitationen.
**Schema-Implikation:** Optionale Felder `argument_structure`, `kernthese`, `kritik` zusätzlich zu `summary`.
**Aufwand:** 2–3 Tage Frontend + retrospektive Content-Pflege aller bisherigen Tableaus.
**Nächster Schritt:** Erst nach Stufe 1 + zweitem validierten Thema entscheiden, ob die strukturelle Differenzierung den Aufwand rechtfertigt.

---

### [ ] Modi-System für Tableau-Produktion
**Status:** konzeptionell verstanden 10.5.26, nicht codifiziert
**Kontext:** Nicht jedes Thema braucht die volle Architekt-Inquisitor-Schleife. Manche Themen verlieren durch akademische Vollständigkeit ihre Stimme (Beispiel: Landkarte des Selbst hat meditativen Charakter, der durch Inquisitor-Lauf zerstört würde). Andere Themen verlangen sie (Geistphilosophie, Erkenntnistheorie).
**Drei Modi:**
- Solo-Architekt: 8–12 Knoten, ohne kritische Revision, schnell und intuitiv
- Mild: Architekt baut, eine Runde milde Selbstprüfung, ohne vollen Vollständigkeitsanspruch
- Volle Schleife: Architekt → Inquisitor → Architekt, akademische Reife, 16+ Knoten

**Implikation für Library:** `complexity_mode`-Feld im `meta`-Block jedes Tableaus, plus `intended_audience`. Macht die Verschiedenheit der Tableaus zu einem Feature, nicht zu einer Inkonsistenz.
**Nächster Schritt:** In zukünftigen Tableau-Prompts den gewünschten Modus explizit nennen. Meta-Felder bei nächster Schema-Erweiterung mit aufnehmen.

---

### [ ] Lectio-Modus (geführte Tour)
**Status:** Idee, neu am 10.5.26
**Kontext:** Statt offene Karte für Einsteiger eine geführte Tour: "Wir beginnen bei Descartes. Er sagte… Das warf das Problem auf, dass… Darauf antwortete Ryle mit…" Knoten für Knoten, mit Übergangstexten, in didaktisch sinnvoller Reihenfolge.
**Verhältnis zu Side-Panel:** Komplementär — Side-Panel ist räumlich strukturiert (Knoten in Beziehung), Lectio temporal (Knoten in Lernreihenfolge).
**Schema-Implikation:** Eine `lectio_path`-Liste pro Tableau, die eine empfohlene Reihenfolge von Knoten plus Übergangstexte definiert.
**Nächster Schritt:** Erst nach Side-Panel Stufe 1 in Erwägung ziehen — könnte sich als wichtiger erweisen als Stufe 2.

---

### [ ] Cross-References zwischen Tableaus (`related_topics`)
**Status:** diskutiert 10.5.26, vorgeschlagen
**Kontext:** Tableaus überlappen legitim. Metzinger erscheint in Geistphilosophie als Bewusstseinstheoretiker und in Landkarte des Selbst als Ego-Tunnel-Theoretiker. Predictive Processing/Free Energy Principle taucht in beiden auf. Buddhistische Tradition ist in einem ausgeschlossen, im anderen zentral. Nutzer sollten diese Beziehungen sehen können.
**Schema-Vorschlag:**
```json
"related_topics": [
  {
    "id": "landkarte-des-selbst",
    "relation": "Behandelt das Selbst als Struktur innerhalb des hier diskutierten Bewusstseins. Geteilte Knoten: Metzinger (hier als Bewusstseinstheoretiker, dort als Theoretiker des Selbst)."
  }
]
```
**Nächster Schritt:** Bei nächstem Tableau-Bau pilotieren — `related_topics` als Standardfeld mit aufnehmen.

---

### [ ] Konzept↔Konzept-Kanten im Datenmodell
**Status:** verschoben 10.5.26
**Kontext:** Aktuelles Sanctum-Datenmodell unterstützt nur Denker↔Denker-Influences. In Geistphilosophie v2 gab es drei Konzept↔Konzept-Kanten (selbstmodell→qualia, epoche→heterophaenomenologie, funktionalismus→predictive_processing) und eine Konzept→Person-Kante (intentionalitaet→husserl), die durch Reformulierung in Personenkanten gerettet wurden. Künftige Tableaus werden ähnliche Kanten brauchen.
**Aufwand laut Claude Code:** ~2 Stunden Frontend (types, SVG-Rendering für Konzept-Nodes, Kollisionslogik, Tests).
**Nächster Schritt:** Wenn drittes Tableau wieder Konzept-Kanten produziert, Schema-Erweiterung priorisieren. Vorher nicht.

---

### [ ] Schools-Schema: Konsistenzprinzip
**Status:** Beobachtung 10.5.26, kein konkretes Item
**Kontext:** Bei Geistphilosophie-Implementierung wurde sichtbar, dass `schools` als 1:1 zu Denkern befüllt war (Implementierungsmuster aus Landkarte des Selbst, kein konzeptuelles Prinzip). Korrigiert auf "Schulen sind Denker-Traditionen, denen mehrere Denker angehören können."
**Implikation:** Bei künftigen Tableaus bewusst prüfen — sind die Schulen tatsächlich Traditionen oder umetikettierte Personen?
**Nächster Schritt:** Beim nächsten Tableau-Bau aktiv beachten. Eventuell beide Bestandstableaus retrospektiv prüfen.

---

## Themen-Backlog

### [ ] Realismus und Konstruktivismus
**Status:** Idee 10.5.26
**Anker:** Markus Gabriel / Neuer Realismus aufgeschnappt; das eigentliche Tableau-Thema steckt eine Ebene darüber.
**Achsen-Skizze:**
- X: Realismus ↔ Konstruktivismus (Status der Wirklichkeit)
- Y: Empirie/Welt ↔ Sprache/Kategorien (Quelle der Erkenntnis)

**Mögliche Denker:** Aristoteles, Locke, Berkeley, Kant, Russell, James, Dewey, Goodman, Putnam (Realismus-Phase + Spätphase als interne Spannung), Rorty, Latour, Searle, Boghossian, Gabriel, Ferraris
**Modus:** Volle Schleife (klassisches erkenntnistheoretisches Schwergewicht)
**Nächster Schritt:** Als nächstes Tableau erwägen, wenn Side-Panel Stufe 1 steht. Vorher: Anker prüfen — was treibt mich konkret an dem Thema?

---

### [ ] Stoizismus
**Status:** Idee, früher in Konversation erwähnt
**Anker:** unklar
**Achsen-Skizze:** noch nicht entwickelt
**Modus:** vermutlich Mild (Tradition mit klaren Klassikern, aber Wert liegt in Klarheit der Lebensphilosophie, nicht in akademischer Vollständigkeit)
**Nächster Schritt:** Anker prüfen, bevor Bau begonnen wird.

---

## Verworfene oder pausierte Ideen

### Neuer Realismus als eigenständiges Tableau
**Datum:** 10.5.26
**Grund:** Zu schmal — Neuer Realismus ist eine Strömung, vergleichbar mit "Predictive Processing" oder "Funktionalismus" in Geistphilosophie. Solche Strömungen sind Knoten, keine Tableau-Themen. Außerdem Aktualitätsproblem: noch keine akademische Sedimentierung. Gabriel sitzt sinnvoll als L5-Knoten in einem Tableau "Realismus und Konstruktivismus".

---

## Kuratorische Prinzipien

Sammlung der Prinzipien, die sich beim Bauen herausgeschält haben — keine ToDo-Items, sondern Leitlinien.

- **Größencheck für neue Themen:** Wenn man nicht spontan zwei Achsen formulieren kann, die das Thema produktiv aufspannen, ist es zu schmal für ein Tableau.
- **Reifecheck für neue Themen:** Tableaus brauchen historische Sedimentierung — klare Vorläufer, Klassiker, zeitgenössische Erben. Aktuelle Bewegungen ohne stabilisierte Form eignen sich schlecht.
- **Persönlicher Resonanzcheck:** Bevor ein Thema gebaut wird, prüfen — was treibt mich? Reaktive Themen ("hab heute davon gelesen") sind dünner als gewachsene ("beschäftigt mich seit Monaten").
- **Modus-Bewusstheit:** Nicht jedes Tableau muss durch die volle Architekt-Inquisitor-Schleife. Die Library wird stärker, wenn Verschiedenheit der Tableaus kuratiert ist statt zufällig.
- **Datensatz vs. Produkt:** Ein guter Datensatz ist nicht gleich ein gutes Produkt. Side-Panel und Glossar entscheiden, ob die Datensatzqualität auch im Frontend ankommt.

---

## Format für neue Items aus Diskussionen

Bei Bedarf am Ende eines Diskussions-Chats Claude bitten: "Fass mir die Backlog-relevanten Punkte aus diesem Chat zusammen, im Format meiner backlog.md."

**Item-Vorlage:**
```
### [ ] [Titel]
**Status:** diskutiert [Datum], [Entscheidung offen/getroffen]
**Kontext:** [2-3 Zeilen Problem]
**Optionen:** [durchgedachte Wege]
**Tendenz/Entscheidung:** [wenn vorhanden]
**Nächster Schritt:** [konkret oder "warten auf X"]
```
