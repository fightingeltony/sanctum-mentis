# Sanctum Mentis — Backlog

## Zuletzt abgeschlossen

### [x] Das Selbst — Content-Erweiterung
**Datum:** 12.5.26
**Resultat:** Alle 15 Denker und 11 Konzepte auf 4–6 Sätze ausgebaut. L1-Annotationen für Vedanta, Buddhismus, Atman, Anatta. Kurze Einfluss-Einträge (vedanta-buddhismus, buddhismus-jung, jung-metzinger, buddhismus-barrett, jung-ifs) auf 3–4 Sätze erweitert. Meditative Stimme des Tableaus erhalten — kein Inquisitor-Lauf.

### [x] Synthese-Texte auf L5
**Datum:** 12.5.26
**Resultat:** `synthesis`-Feld in `Topic`-Schema (types.ts) ergänzt. Block in TopicViewer über Tabs, sichtbar nur auf L5 — identische visuelle Sprache wie Context-Strip (Label "SYNTHESE" gold, kursiver Fließtext). Texte für beide Bestandstableaus geschrieben: Geistphilosophie (Hard Problem / Reduktionismus vs. Irreduzibilität), Das Selbst (Substanz vs. Prozess / westlich vs. östlich).

### [x] Landingpage-Überarbeitung
**Datum:** 11.5.26
**Resultat:** Hero-Block mit Vision-Klammer neu geschrieben. "Erste interaktive..."-Behauptung entfernt. "Philosophie und Psychologie" geöffnet zu "Ideengeschichte". Sektion III von Speicher-Metapher befreit, Du-Du-Ton durchgehalten. Footer-Untertitel auf "eine Bibliothek der großen Fragen" umgestellt.

### Session 2026-05-10
- [x] **Mobile Dark-Mode Fix:** `color-scheme: light` in globals.css + Next.js Viewport API — verhindert Chrome Android "Force Dark Mode"
- [x] **Glossar-Modus `[[Annotationen]]`:** `src/lib/annotations.tsx` neu, `Annotated`-Renderer in InfluenceGraph, QuadrantPlot, ThinkerList verdrahtet
- [x] **QuadrantPlot → Denker-Navigation:** `onThinkerClick`-Callback — Klick auf Denker im Konzept-Panel wechselt direkt zum Denker-Tab mit Highlight
- [x] **Content-Erweiterung Philosophie des Geistes:** Alle 16 Denker + 17 Konzept-Beschreibungen auf 4–6 Sätze ausgebaut, L1-Annotationen für Fachbegriffe eingefügt
- [x] **Das Selbst — 10 neue Einfluss-Kanten (L2–L5):** Auflösung der drei parallelen Cluster (Spiritualität / Psychotherapie / Neurowissenschaft); 13 von 15 Denkern jetzt vernetzt. Meditative Stimme explizit erhalten — kein Inquisitor-Lauf, gezielte Anreicherung. Erste Anwendung des Prinzips "Anreicherung statt Erweiterung".
- [x] **Build-Fix:** `s`-Flag aus Regex in annotations.tsx entfernt (ES2018-Inkompatibilität im TypeScript-Target)
- [x] **CLAUDE.md:** Drei neue Konventions-Sektionen ergänzt — Kuratorische Grundlinie, L1-Glossar-Konvention, Schools-Konvention
- [x] **Repo-Aufräumarbeiten:** Karteileiche `data/erkenntnistheorie.json` gelöscht; README.md Vorlage-Referenz auf `data/das-selbst.json` umgestellt

### Session 2025-05-09
- [x] **Deployment:** Vercel + GitHub live (sanctum-mentis)
- [x] **Philosophie des Geistes v2:** 16 Denker, 15 Schulen, 17 Konzepte, 17 Einfluss-Kanten
  - Hinzugefügt: Wittgenstein (L1), Davidson (L2), Jackson (L3), Tononi (L5)
  - Entfernt: Putnam
  - Konzept↔Konzept-Kanten in Denker-Kanten integriert (nicht separat modelliert)
  - Einfluss-Mapping: development/opposition/shared_diagnosis → influence/critique/parallel
  - *Retrospektive: Volle Inquisitor-Schleife hat Vollständigkeit über Verstehbarkeit gestellt — bei zukünftigen Tableaus bewusster prüfen, ob die volle Schleife wirklich passt.*
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

### [ ] Synthese-Texte auf L5 einführen
**Status:** vorgeschlagen 10.5.26, dringend
**Kontext:** Aktuelle Tableaus zeigen auf L5 alle Knoten und Spannungen, aber ohne expliziten Erkenntnis-Landungs-Moment. Die Sanctum-Vision ("Wissen zur Ruhe kommen lassen") verlangt einen Ort, an dem der Bogen sichtbar geschlossen wird. Der Slider-Zustand "Synthese" suggeriert das, aber liefert es nicht.
**Schema:** Neues Feld `synthesis` im topic-Block, drei bis fünf Sätze, sichtbar nur auf L5. Nicht ein neues Summary, sondern eine kuratorische Einordnung — *"Hier ist die Spannung, die du jetzt verstehst."*
**Aufwand:** Pro Tableau eine halbe Stunde Schreibarbeit. Frontend: minimal.
**Nächster Schritt:** Bei beiden Bestandstableaus retroaktiv ergänzen, dann als Standard für neue Tableaus.

---

### [ ] Lebensweltliche Eingangs-Anker prüfen
**Status:** vorgeschlagen 10.5.26
**Kontext:** Tableau-Subtitles sind teilweise akademisch formuliert. Die Sanctum-Vision verlangt lebensweltliche Anker, die einen Nutzer bei einer Frage abholen, die er selbst hat. *Lebensfragen sind die kraftvollste Form von "Ein Thema zu Ende denken"*.
**Beispiel:** Geistphilosophie könnte statt "Vom Gespenst in der Maschine zur Architektur des Selbst" etwas wie "Wenn ich Schmerz fühle — was passiert da eigentlich?" tragen. (Beispiel, nicht festgelegt.)
**Nächster Schritt:** Bestandstableaus prüfen, gegebenenfalls Subtitle überarbeiten.

---

### [ ] Side-Panel "Tiefenbohrung" — Stufe 2
**Status:** diskutiert 10.5.26, abhängig von Stufe 1 + zweitem Tableau
**Kontext:** Knotentyp-spezifische Layouts. Gedankenexperimente brauchen Schritt-für-Schritt-Reveal (Setup → Frage → Antwort → Schluss); Theorien brauchen Kernthese + Hauptargument + Hauptkritik; Methoden brauchen Ziel + Schritte + Limitationen.
**Schema-Implikation:** Optionale Felder `argument_structure`, `kernthese`, `kritik` zusätzlich zu `summary`.
**Aufwand:** 2–3 Tage Frontend + retrospektive Content-Pflege aller bisherigen Tableaus.
**Nächster Schritt:** Erst nach Stufe 1 + zweitem validierten Thema entscheiden, ob die strukturelle Differenzierung den Aufwand rechtfertigt.

---

### [ ] Modi-System für Tableau-Produktion
**Status:** konzeptionell verstanden 10.5.26, nicht codifiziert — Mild neuer Default
**Kontext:** Nicht jedes Thema braucht die volle Architekt-Inquisitor-Schleife. Manche Themen verlieren durch akademische Vollständigkeit ihre Stimme (Beispiel: Landkarte des Selbst hat meditativen Charakter, der durch Inquisitor-Lauf zerstört würde). Andere Themen verlangen sie (Geistphilosophie, Erkenntnistheorie).
**Retrospektive:** Die Erweiterung von 13 auf 16 Denker in Geistphilosophie hat den Datensatz vollständiger gemacht, aber nicht abschlussfähiger — bei zukünftigen Tableaus bewusst vorprüfen, ob die volle Schleife wirklich passt.
**Drei Modi:**
- Solo-Architekt: 8–12 Knoten, ohne kritische Revision, schnell und intuitiv
- Mild: Architekt baut, eine Runde milde Selbstprüfung, ohne vollen Vollständigkeitsanspruch — **neuer Default**
- Volle Schleife: Architekt → Inquisitor → Architekt, akademische Reife, 16+ Knoten — bewusste Ausnahme

**Implikation für Library:** `complexity_mode`-Feld im `meta`-Block jedes Tableaus, plus `intended_audience`. Macht die Verschiedenheit der Tableaus zu einem Feature, nicht zu einer Inkonsistenz.
**Nächster Schritt:** In zukünftigen Tableau-Prompts den gewünschten Modus explizit nennen. Meta-Felder bei nächster Schema-Erweiterung mit aufnehmen.

---

### [ ] Lectio-Modus — von Nice-to-Have zu Kernfeature
**Status:** Priorität erhöht 10.5.26
**Kontext:** Geführte Tour durchs Tableau (zeitliche Sequenz statt räumlicher Karte) war Nice-to-Have. Mit der Sanctum-Linse ("Punkte setzen, Erkenntnisse landen lassen") wird sie zum Kernmechanismus für Verstehen-Abschließen. Die offene Karte zeigt das Big Picture — gut für Verstehen. Die Tour führt durch das Big Picture — gut für Abschließen. Beide gehören zusammen.
**Verhältnis zu Side-Panel:** Komplementär — Side-Panel ist räumlich strukturiert (Knoten in Beziehung), Lectio temporal (Knoten in Lernreihenfolge).
**Schema-Implikation:** Eine `lectio_path`-Liste pro Tableau, die eine empfohlene Reihenfolge von Knoten plus Übergangstexte definiert.
**Nächster Schritt:** Side-Panel Stufe 1 hat Vorrang; danach Lectio parallel zu oder vor Stufe 2 — nicht mehr danach.

---

### [ ] Frage-Architektur (Sanctum Quaestiones)
**Status:** Idee 10.5.26, nicht jetzt umsetzen
**Kontext:** Lebensfragen ("Was ist Liebe?", "Wie gehe ich mit Verlust um?", "Wie finde ich zu mir selbst?") als Anker, der Knoten aus mehreren Tableaus quer zusammenzieht. Andere Architektur als die Feld-orientierten Tableaus — *horizontal* statt *vertikal*. Nicht ein anderes Projekt, sondern eine zweite Sicht auf denselben Datenkern.
**Verhältnis zu Lectio:** Lectio-Modus ist die natürliche technische Form dafür — geführter Pfad durch Knoten, nur Tableau-übergreifend.
**Persona:** Coach (eigene Buch-Arbeit zu Transformationsprozess, Psychologie + Spiritualität + Mythologie) — Menschen, die selbst an inneren Synthesen arbeiten, sind die natürliche Nutzergruppe.
**Voraussetzung:** Mindestens fünf bis sieben Tableaus mit lebensweltlich relevanten Knoten.
**Nächster Schritt:** Im Hinterkopf behalten; beim Tableau-Aufbau bewusst Knoten produzieren, die später für Frage-Architektur nutzbar sind (lebensweltliche Konzepte, ethische Implikationen, praktische Anwendungen).

---

### [ ] Bibliotheks-Architektur strukturieren
**Status:** vorgeschlagen 10.5.26, mittelfristig
**Kontext:** Aktuell zwei Tableaus, flache Struktur. Ab fünf bis zehn Tableaus wird Strukturierung nötig.
**Optionen:**
- A) Flache Liste mit Tags ("Philosophie", "Psychologie", "Spiritualität") — flexibel, aber bei vielen Tableaus unübersichtlich
- B) Kategorien als Hauptebene, Tableaus darin — klar navigierbar, aber Mehrfach-Zugehörigkeit schwierig
- C) Kuratierte Pfade plus Bibliothek — lädt zum Eintauchen ein, höherer Pflegeaufwand

**Tendenz:** Pragmatisch B implementieren, langfristig zu C entwickeln. Landingpage "Ideengeschichte" als Oberbegriff einführen — breit genug für Ethik, Politische Theorie, kontemplative Traditionen.
**Nächster Schritt:** Sobald drittes Tableau existiert, B implementieren.

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
**Kontext:** Bei Geistphilosophie-Implementierung wurde sichtbar, dass `schools` als 1:1 zu Denkern befüllt war (Implementierungsmuster aus Landkarte des Selbst, kein konzeptuelles Prinzip). Korrigiert auf Prinzip: "Schulen sind Denker-Traditionen, denen mehrere Denker angehören können — nicht umetikettierte Personen."
**Implikation:** Bei künftigen Tableaus bewusst prüfen — sind die Schulen tatsächlich Traditionen oder umetikettierte Personen?
**Nächster Schritt:** Beim nächsten Tableau-Bau aktiv beachten. Eventuell beide Bestandstableaus retrospektiv prüfen.

---

## Landingpage

### [x] Vision-Klammer ergänzen
**Status:** vorgeschlagen 10.5.26, dringend
**Kontext:** Aktuelle Landingpage hat drei klar formulierte Feature-Sektionen (Komplexität auf Abruf / Debatte im Fokus / Wissen räumlich verankert), aber keine Vision-Sektion. Die Diagnose, die Sanctum eigentlich bewegt — *"Wir haben alles Wissen der Welt zur Hand, was uns fehlt ist Kontext, die Möglichkeit ein Thema zu Ende zu verstehen"* — taucht nirgends auf.
**Tonart-Beispiel:**
> *Wir leben in einer Zeit, in der alles Wissen der Welt zur Hand ist. Bücher, Suchmaschinen, KI. Was uns fehlt, ist Kontext. Die Möglichkeit, ein Thema einmal zu Ende zu verstehen — Punkte zu setzen, Erkenntnisse landen zu lassen. Sanctum Mentis macht aus dem Gewirr eine Karte.*

**Nächster Schritt:** Tonart-Beispiel als Ausgangspunkt nehmen, eigene Formulierung finden, dann implementieren.

---

### [x] "Erste interaktive..."-Behauptung zurücknehmen
**Status:** vorgeschlagen 10.5.26
**Kontext:** Die Behauptung *"Sanctum Mentis ist das erste interaktive Navigationssystem für Philosophie und Psychologie"* ist faktisch angreifbar — es gibt mehrere akademische Vorgängerprojekte (Phaidra, PhilPapers-Mapping). Ein vorgebildeter Nutzer verliert sofort Vertrauen.
**Mögliche Varianten:**
- *"Sanctum Mentis kartiert die klügsten Konzepte der Geschichte..."*
- *"Sanctum Mentis ist ein neues Navigationssystem für die Ideengeschichte..."*
- *"Sanctum Mentis verbindet Philosophie und Psychologie zu einer interaktiven Landkarte..."*

**Nächster Schritt:** Eine der Varianten wählen oder eigene formulieren.

---

### [x] "Philosophie und Psychologie" thematisch öffnen
**Status:** vorgeschlagen 10.5.26
**Kontext:** Aktuelle Landingpage definiert Sanctum als *"Navigationssystem für Philosophie und Psychologie"*. Das zementiert das Produkt zu früh — Sanctum kann legitim auch Tableaus zu Ethik, Politischer Theorie, Wissenschaftstheorie, kontemplativen Traditionen produzieren.
**Vorschlag:** *"Ideengeschichte"* als Oberbegriff einführen — breit genug für alles, was Sanctum jemals tun wird, ohne abstrakt zu werden.
**Nächster Schritt:** Gemeinsam mit Vision-Klammer überarbeiten.

---

### [x] Sektion III "Wissen räumlich verankert" — Tonbruch beheben
**Status:** vorgeschlagen 10.5.26
**Kontext:** Aktueller Erklärtext: *"...damit dein Gehirn das 'Big Picture' intuitiv abspeichern kann."* Speicher-Metapher bricht den Ton; *"Big Picture"* in Anführungszeichen wirkt unsicher; bricht aus dem Du-Du-Muster der anderen Sektionen aus.
**Vorschlag:**
> *"Konzepte schweben nicht länger im luftleeren Raum. Jede Idee findet ihren Platz im Koordinatensystem — und du siehst, wie sie zusammenhängt mit den anderen. Erst dort, im Zusammenhang, lässt sich Wissen zu Ende denken."*

**Nächster Schritt:** Erklärtext überarbeiten.

---

### [x] "Direkt zur Erkenntnistheorie"-Button anpassen
**Status:** erledigt 10.5.26
**Umgesetzt:** Option A — Button zeigt jetzt auf "Philosophie des Geistes".
**Nächster Schritt:** Option C (*"Empfohlener Einstieg"*) sobald mehrere Tableaus existieren.

---

## Architektur-Ideen für Cross-Domain-Verbindungen

### [ ] Cross-App-Verkörperung (Sanctum × Carta Librorum)
**Status:** Idee 10.5.26, langfristig
**Kontext:** Charaktere aus Carta-Librorum-Büchern (Game of Thrones, Herr der Ringe, Ken Follett) bekommen archetypische/psychologische Lesart, die auf Sanctum-Knoten verweist. Verbindet beide Apps zu einem Wissens-Netzwerk, in dem Theorie und Erzählung als gleichwertige Knoten aufeinander beziehbar sind.
**Drei Implementierungs-Tiefen:**
- A) Tag (Charakter verweist auf Sanctum-Knoten)
- B) Sub-Layer (eigener "Archetypische Lesart"-Tab pro Charakter)
- C) Bidirektionale Brücke

**Risiken:** Reduktionismus-Falle, Auswahlproblem (welche Linse?), Spoiler-Logik, Charakter-Mismatch.
**Voraussetzung:** Sanctum hat ein Tableau zu Archetypen oder mythologischen Strukturen.
**Strategischer Wert:** Hoch — validiert die Engine als Cross-Domain-Werkzeug.
**Nächster Schritt:** Im Hinterkopf behalten. Konkret werden, sobald ein Sanctum-Tableau zu Archetypen existiert.

---

## Themen-Backlog

### [ ] Realismus und Konstruktivismus
**Status:** Idee 10.5.26
**Anker:** Markus Gabriel / Neuer Realismus aufgeschnappt; das eigentliche Tableau-Thema steckt eine Ebene darüber.
**Achsen-Skizze:**
- X: Realismus ↔ Konstruktivismus (Status der Wirklichkeit)
- Y: Empirie/Welt ↔ Sprache/Kategorien (Quelle der Erkenntnis)

**Mögliche Denker:** Aristoteles, Locke, Berkeley, Kant, Russell, James, Dewey, Goodman, Putnam (Realismus-Phase + Spätphase als interne Spannung), Rorty, Latour, Searle, Boghossian, Gabriel, Ferraris
**Modus:** zu prüfen — vor dem Bauen entscheiden, ob volle Schleife nötig oder Mild genügt
**Nächster Schritt:** Als nächstes Tableau erwägen, wenn Side-Panel Stufe 1 steht. Vorher: Anker prüfen — was treibt mich konkret an dem Thema?

---

### [ ] Stoizismus
**Status:** Idee, früher in Konversation erwähnt
**Anker:** unklar
**Achsen-Skizze:** noch nicht entwickelt
**Modus:** vermutlich Mild oder Solo (Tradition mit klaren Klassikern, aber Wert liegt in Klarheit der Lebensphilosophie, nicht in akademischer Vollständigkeit)
**Nächster Schritt:** Anker prüfen, bevor Bau begonnen wird.

---

### [ ] Typologien
**Status:** Idee 10.5.26
**Anker:** Persönlichkeitstypologien als verschiedene Theorien dessen, was Persönlichkeit *ist* — nicht als kommerzielle Test-Werkzeuge.
**Achsen-Skizze:**
- X: Statisch (Typ als Wesensmerkmal) ↔ Prozessual (Typ als Entwicklungsdynamik)
- Y: Empirisch-deskriptiv ↔ Phänomenologisch-erfahrungsnah

**Mögliche Knoten:** Jung, Briggs/Myers, Costa/McCrae (Big Five), Ichazo, Naranjo, Riso/Hudson (Enneagramm), Galen, Hippokrates; ggf. ayurvedische und chinesische Traditionen.
**Modus:** Volle Schleife — kuratorisch riskant, braucht Inquisitor-Sorgfalt.
**Lebensweltlichkeit:** Sehr hoch.
**Risiken:** Kommerzialisiertes Feld, Wissenschaftlichkeitsstreit, Identifikations-Falle.
**Voraussetzung:** Eigene Position klären — was ist überhaupt ein "Persönlichkeitstyp"? Werkzeug oder Wesen?
**Verhältnis zu Landkarte des Selbst:** Verwandt, aber andere Frage (taxonomisch vs. ontologisch).
**Nächster Schritt:** Anker prüfen, Voraussetzungs-Frage beantworten.

---

### Weitere Themen-Kandidaten (notiert, nicht ausgearbeitet)
- **Religions- und Theologiegeschichte** — höchste strukturelle Passung
- **Theorien der Liebe / Beziehungsmodelle** — massentauglich
- **Modelle der Aufmerksamkeit / Achtsamkeit** — zeitgemäß
- **Architekturkritik / Stadtplanung** — Anschluss an Alltag
- **Schulen der Psychotherapie** — Anschluss an Landkarte des Selbst
- **Wissenschaftstheorie** — verbindet sich gut mit Geistphilosophie
- **Ethik** — klassisches Tableau-Material
- **Politische Theorie** — klassisch, aber politisch aufgeladen
- **Archetypen oder mythologische Strukturen** — Voraussetzung für Cross-App-Verkörperung

---

## Verworfene oder pausierte Ideen

### Neuer Realismus als eigenständiges Tableau
**Datum:** 10.5.26
**Grund:** Zu schmal — Neuer Realismus ist eine Strömung, vergleichbar mit "Predictive Processing" oder "Funktionalismus" in Geistphilosophie. Solche Strömungen sind Knoten, keine Tableau-Themen. Außerdem Aktualitätsproblem: noch keine akademische Sedimentierung. Gabriel sitzt sinnvoll als L5-Knoten in einem Tableau "Realismus und Konstruktivismus".

---

## Offene Grundsatzfragen

### Kopf-Herz-Bauch
**Status:** beobachten, nicht jetzt entscheiden
**Kontext:** Aktuelle Sanctum-Architektur ist kopflastig. Tableaus organisieren Wissen, Lectio führt durch Wissen — beides kognitive Modi. Die persönliche Bewegung des Kurators (Wissen muss vom Kopf über das Herz in den Bauch wandern) ist im Tool nicht abgebildet.
**Drei mögliche Antworten:**
- A) Herz/Bauch als Tableau-Ebenen (vermutlich überladen)
- B) Herz/Bauch als zusätzliche Eintritte in die Bibliothek (Frage-Architektur deckt das teilweise ab)
- C) Herz/Bauch im Lectio-Modus integrieren (geführte Tour als Brücke vom Verstehen zum Verkörpern)

**Tendenz:** C, weil Lectio sowieso geplant ist und die natürliche Stelle für diese Bewegung wäre.
**Nächster Schritt:** Beobachten, ob die Frage wiederkommt.

---

## Kuratorische Prinzipien

Sammlung der Prinzipien, die sich beim Bauen herausgeschält haben — keine ToDo-Items, sondern Leitlinien für jede Entscheidung.

### Verstehen-Abschließen als Maßstab
Sanctum hilft Nutzern, Themen *zu Ende zu denken*, nicht alle möglichen Positionen zu kennen. Prüffrage für jede Datensatz-Entscheidung: *Hilft diese Erweiterung beim Abschließen, oder hält sie nur Spannungen offen?* Vollständigkeit ist nicht das Ziel — Verstehbarkeit ist es.

### Größencheck für neue Themen
Wenn man nicht spontan zwei Achsen formulieren kann, die das Thema produktiv aufspannen, ist es zu schmal für ein Tableau. Strömungen und Schulen sind Knoten, keine Tableau-Themen.

### Reifecheck für neue Themen
Tableaus brauchen historische Sedimentierung — klare Vorläufer, Klassiker, zeitgenössische Erben. Aktuelle Bewegungen ohne stabilisierte Form eignen sich schlecht.

### Persönlicher Resonanzcheck
Bevor ein Thema gebaut wird, prüfen — was treibt mich? Reaktive Themen ("hab heute davon gelesen") sind dünner als gewachsene ("beschäftigt mich seit Monaten").

### Modus-Bewusstheit
Nicht jedes Tableau muss durch die volle Architekt-Inquisitor-Schleife. Die Library wird stärker, wenn Verschiedenheit der Tableaus *kuratiert* ist statt zufällig.

### Anreicherung statt Erweiterung
Manche Datensätze brauchen mehr Beziehungen, nicht mehr Knoten. Die Operation "Influence-Anreicherung" ist additiv, schmal und stilerhaltend — geeignet für Datensätze, deren Stimme stimmt, aber deren Netz dünn ist.

### Datensatz vs. Produkt
Ein guter Datensatz ist nicht gleich ein gutes Produkt. Side-Panel, Glossar und Synthese-Texte entscheiden, ob die Datensatzqualität auch im Frontend ankommt.

---

## Format für neue Items aus Diskussionen

Bei Bedarf am Ende eines Diskussions-Chats Claude bitten: *"Fass mir die Backlog-relevanten Punkte aus diesem Chat zusammen, im Format meiner backlog.md."*

**Item-Vorlage:**
```
### [ ] [Titel]
**Status:** diskutiert [Datum], [Entscheidung offen/getroffen]
**Kontext:** [2-3 Zeilen Problem]
**Optionen:** [durchgedachte Wege]
**Tendenz/Entscheidung:** [wenn vorhanden]
**Nächster Schritt:** [konkret oder "warten auf X"]
```

## Anmerkung zum Übergabe-Workflow

Diese Datei ist als *Übergabe-Dokument* an Claude Code gedacht, nicht als paralleles Backlog. Claude Code pflegt das eigentliche Backlog im Repo. Der typische Übergabe-Prompt:

> *"Hier ist ein aktualisierter Backlog-Stand aus einer Diskussion. Gleiche das mit unserer bestehenden Backlog-Datei ab. Neue Items aufnehmen, bestehende ergänzen wo der zusätzliche Kontext hilfreich ist, Duplikate ignorieren. Bei Konflikten frag mich. Zeig mir den Diff vor dem Speichern."*

Damit bleibt die Wahrheit im Repo, und die Konversations-Datei ist nur das Vehikel.
