# Sanctum Mentis — Backlog

## Zuletzt abgeschlossen

### [x] Das Selbst — Content-Erweiterung
**Datum:** 12.5.26
**Resultat:** Alle 15 Denker und 11 Konzepte auf 4–6 Sätze ausgebaut. L1-Annotationen für Vedanta, Buddhismus, Atman, Anatta. Kurze Einfluss-Einträge (vedanta-buddhismus, buddhismus-jung, jung-metzinger, buddhismus-barrett, jung-ifs) auf 3–4 Sätze erweitert. Meditative Stimme des Tableaus erhalten — kein Inquisitor-Lauf.

### [x] Synthese-Texte auf L5
**Datum:** 12.5.26
**Resultat:** `synthesis`-Feld in `Topic`-Schema (types.ts) ergänzt. Block in TopicViewer über Tabs, sichtbar nur auf L5 — identische visuelle Sprache wie Context-Strip (Label "SYNTHESE" gold, kursiver Fließtext). Texte für beide Bestandstableaus geschrieben: Geistphilosophie (Hard Problem / Reduktionismus vs. Irreduzibilität), Das Selbst (Substanz vs. Prozess / westlich vs. östlich).

### [x] Realismus und Konstruktivismus — Implementierung
**Datum:** 17.5.26
**Resultat:** `data/realismus-und-konstruktivismus.json` angelegt (13 Denker, 9 Konzepte, 17 Influences, 9 Schools). In `data/library.json` registriert, in `src/lib/data.ts` importiert. Erster echter Mild-Modus-Lauf der Reihe — meditative Stimme, kein Inquisitor-Lauf.

### [x] Mild-Prompt + Verteilter Mild-Modus — Workflow-Dokumentation
**Datum:** 17.5.26
**Resultat:** `prompts/mild-mode.md` erstellt (Mild positiv definiert: 10–14 Denker, drei Prüffragen, Architekt-Prüfer-Ablauf). CLAUDE.md um Sektion "Tableau-Bau — Workflow-Konvention" ergänzt. Bedingung für Wiederholbarkeit des verteilten Workflows ist erfüllt.

### [x] Annotation-Tooltip — Rendering-Fix
**Datum:** 17.5.26
**Resultat:** `src/lib/annotations.tsx` vollständig überarbeitet. Zwei Formate unterstützt: (A) `[[term: definition]]` — Term und Definition aus Klammern getrennt; (B) `term [[definition]]` — Term ist das letzte Wort vor `[[]]`, Definition ist der volle Klammer-Inhalt. Tooltip: dunkler Hintergrund (`oklch(0.26)`) statt transparentem Pergament-Look. Behebt: Doppelung (Definition inline + im Tooltip) und unlesbare Darstellung durch gleichen Hintergrund.

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

### [x] Annotation-Rendering als Tooltip statt Inline
**Status:** implementiert 17.5.26 — siehe "Zuletzt abgeschlossen"

---

### [ ] Glossar-Tab (Tab V) aktivieren
**Status:** identifiziert 14.5.26 durch Vergleich mit Carta Librorum
**Kontext:** Carta Librorum hat fünf Tabs (inkl. Glossar), Sanctum hat nur drei (Denker / Netz / Karte). Engine bietet die zusätzlichen Tabs offenbar. Glossar-Tab würde alle Annotationen des Tableaus zentral sammeln — komplementär zum Annotation-Tooltip: Tooltip löst Lese-Stolper-Problem, Glossar bietet zentrale Übersicht.
**Nächster Schritt:** Klären, ob Engine den Tab schon unterstützt oder neu gebaut werden muss.

---

### [ ] Logbuch-Tab (Tab IV) — Zweck klären
**Status:** identifiziert 14.5.26, Zweck offen
**Kontext:** Vierter Tab in Carta Librorum, bei Sanctum fehlend. Mögliche Zwecke: Lese-Spur, Bookmarking, persönliche Notizen, erste Form von Lectio.
**Nächster Schritt:** Beobachten, ob Bedarf entsteht. Aktuell nicht priorisieren.

---

### [ ] UI-Tonart-Vergleich Sanctum vs. Carta
**Status:** Beobachtung 14.5.26
**Kontext:** Carta nutzt narrative Tab-Namen ("Personen", "Beziehungen") und zugängliche Beschreibungen. Sanctum nutzt akademische Tab-Namen ("Denker", "Einflüsse") und definitorische Beschreibungen — präzise, aber kühler. Frage: Tab-Namen lebensweltlicher? "Stimmen" statt "Denker"? "Gespräche" statt "Einflüsse"?
**Risiko:** Marken-Verschiebung Richtung Self-Help. Sanctum braucht den akademischen Anker.
**Tendenz:** Keine vorschnellen Umbenennungen. Tab-Namen lassen wie sie sind. Schulen-Namen beim nächsten Tableau (Ethik) bewusst prüfen.
**Nächster Schritt:** Beim nächsten Tableau Schulen-Namen prüfen. Tab-Frage in den Hinterkopf legen.

---

### [ ] Schulen-Labels im Geist-Tableau überarbeiten
**Status:** identifiziert 14.5.26
**Kontext:** Filter des Geist-Tableaus zeigt akademisches Vokabular pur als ersten Eingang: *Substanzdualismus, Logischer Behaviorismus, Eliminativer Materialismus, Heterophänomenologie...* Das Selbst hat "Vedanta", "Buddhismus"; Realismus hat "Klassischer Empirismus", "Pragmatismus" — beides zugänglicher. Geist ist der akademische Ausreißer an der Tür.
**Vorschlag:** Schulen-Labels mit lebensweltlicheren Bezeichnungen ergänzen. "Substanzdualismus" → "Geist und Körper als zwei Welten". "Eliminativer Materialismus" → "Alltagspsychologie als Irrtum". JSON bleibt akademisch korrekt, Label wird erfahrbar.
**Aufwand:** Gering — einmaliger Pass durch die Schools-Liste.
**Nächster Schritt:** Beim nächsten Geist-Tableau-Pass aufnehmen, eventuell zusammen mit polarem Eingang.

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

### [x] Mild-Prompt als Repo-Standard
**Status:** implementiert 17.5.26 — `prompts/mild-mode.md` erstellt
**Kontext:** Im Backlog gab es keinen ausformulierten Mild-Modus-Prompt — nur die negative Definition ("nicht volle Schleife"). Aus der Realismus-Konversation ist ein erster Prompt entstanden, der Mild positiv definiert: 10–14 Denker, drei Prüffragen, kein Vollständigkeitsreflex. Hat sich am realen Bau bewährt.

---

### [x] Verteilter Mild-Modus: Architekt + Prüfer in getrennten Chats
**Status:** als Workflow-Konvention in CLAUDE.md aufgenommen 17.5.26
**Kontext:** Statt Architekt-Inquisitor-Schleife in einer Instanz: Architekt baut in Chat A, neuer Chat B prüft frisch gegen Mild-Prompt + JSON + Stilreferenz, Architekt arbeitet Befunde in Chat A ein. Prüfer kontaminationsfrei — er hat den Bauprozess nicht miterlebt. Wichtig: Prüfer *nicht* im Projektwissen platzieren, sonst verwandelt der Backlog-Kontext ihn zurück in einen Inquisitor.
**Vorteile:** Saubere Mild-Schleife, keine Selbsttäuschung, dokumentierte Bauentscheidungen.
**Beobachtung aus Realismus-Bau (14.5.26):** Prüfer-Output disziplinierter als erwartet — drei Fragen, präzise, keine Vollständigkeitskritik. Eingriff 3 (L3-Version für Sinnfeld) wurde berechtigt zurückgewiesen — Prüfer kannte Konvention der Reihe besser als der vorschlagende Architekt. Bedingung für Wiederholbarkeit: Mild-Prompt muss als Datei existieren, sonst wird Methode jedes Mal neu erfunden.
**Abschluss:** Workflow in CLAUDE.md unter "Tableau-Bau — Workflow-Konvention" dokumentiert.

---

### [ ] Lectio-Modus — von Nice-to-Have zu Kernfeature
**Status:** Priorität erhöht 10.5.26
**Kontext:** Geführte Tour durchs Tableau (zeitliche Sequenz statt räumlicher Karte) war Nice-to-Have. Mit der Sanctum-Linse ("Punkte setzen, Erkenntnisse landen lassen") wird sie zum Kernmechanismus für Verstehen-Abschließen. Die offene Karte zeigt das Big Picture — gut für Verstehen. Die Tour führt durch das Big Picture — gut für Abschließen. Beide gehören zusammen.
**Verhältnis zu Side-Panel:** Komplementär — Side-Panel ist räumlich strukturiert (Knoten in Beziehung), Lectio temporal (Knoten in Lernreihenfolge).
**Schema-Implikation:** Eine `lectio_path`-Liste pro Tableau, die eine empfohlene Reihenfolge von Knoten plus Übergangstexte definiert.
**Nächster Schritt:** Side-Panel Stufe 1 hat Vorrang; danach Lectio parallel zu oder vor Stufe 2 — nicht mehr danach.

---

### [ ] L1 als Einstiegs-Tour, nicht als Anfänger-Stufe
**Status:** diskutiert 14.5.26, entschieden für Prüfung
**Kontext:** L1 ist aktuell historisch befüllt — frühe Denker bekommen L1-Texte, späte erst auf höheren Stufen. Das macht L1 zur frühe-Denker-Stufe, nicht zur Einsteiger-Stufe. Nicht-Akademiker steigen thematisch ein, nicht historisch.
**Verschiebung:** L1 als kuratierte Einstiegs-Tour — fünf bis sieben Knoten, die zusammen einen verständlichen Bogen ergeben. Auswahl folgt didaktischer Logik, nicht historischer.
**Implikation für Geist-Tableau:** Aktuelle L1-Auswahl (Descartes, Ryle, Wittgenstein) trägt einen Einsteiger vermutlich nicht. Chalmers (Hard Problem) und Nagel wären zugänglicher.
**Verhältnis zu Lectio:** L1 als Einstiegs-Tour ist Lectio-light — kuratorische Arbeit ohne Frontend-Aufwand.
**Nächster Schritt:** Selbsttest am Geist-Tableau — auf L1 stellen, drei Knoten lesen, prüfen ob der Einstieg trägt.

---

### [ ] Default-Stufe und Stufen-Navigation prüfen
**Status:** Beobachtung 14.5.26
**Kontext:** Wenn Tableaus auf L2/L3 öffnen, landen Nicht-Akademiker direkt in akademischer Sprache ohne das Sicherheitsnetz von L1. L1 wird zur Option, die man bewusst wählen muss — statt zum natürlichen Eingang.
**Tendenz:** Default auf L1; wer mehr will, schiebt hoch.
**Nächster Schritt:** Tatsächliche Default-Einstellung im Code prüfen. Kleine technische Reparatur, wenn nötig.

---

### [ ] Polare Eingangs-Karte — kuratorische Signatur erkannt
**Status:** Einsicht 14.5.26
**Kontext:** Selbstbeobachtung als Nutzer: Was funktioniert ist ein Einstieg mit polaren Gegenthesen — Atman gegen Anatta, Realismus gegen Konstruktivismus. Das Geist-Tableau hat das nicht — Eingang über Descartes als Gründungsvater, Spannungen entfalten sich erst später. Könnte erklären, warum Geist mehr Kopfschmerzen macht als die anderen beiden.
**Mögliche Umsetzung:** Beim ersten Öffnen erscheint ein kleines Fenster: *"In diesem Tableau geht es um folgende Spannung: [Pol A] versus [Pol B]."* Drei bis fünf Sätze, klar polar, ohne Auflösung. Die Synthese bleibt auf L5.
**Abgrenzung:** Nicht die Auflösung wandert nach vorne, sondern die Aufmachung der Spannung.
**Nächster Schritt:** Beim nächsten Tableau-Bau bewusst polaren Eingang prüfen.

---

### [ ] Frage hinter der Frage als viertes Eingangs-Element
**Status:** Idee 14.5.26, setzen lassen
**Kontext:** Jedes Tableau hat drei Eingangs-Elemente: Titel, Subtitle, Synthese (L5). Vorschlag: viertes Element — die Lebensfrage hinter der akademischen Frage. Nicht das Thema, sondern der Anker, der es dringlich macht. Beispiele: *Geist: Was unterscheidet einen Schmerz von der Information über einen Schmerz? / Selbst: Kann ich mich ändern, oder bin ich festgelegt? / Realismus: Wo stehe ich, wenn die alten Gewissheiten weichen?*
**Doppelter Nutzen:** (1) Für Nutzer — in fünf Sekunden entscheidbar, ob das Tableau gerade brennt. (2) Für Kurator — eingebauter Resonanzcheck: wenn die Frage nicht formulierbar ist, ist das Tableau möglicherweise zu früh.
**Nächster Schritt:** Beim Ethik-Bau als Testfrage einbauen. Erst wenn die Idee noch glüht — eine Woche liegen lassen.

---

### [ ] Synthese-Sichtbarkeit von L1 aus
**Status:** Idee 14.5.26
**Kontext:** Synthese-Text ist auf L5 sichtbar. Nutzer, die vor dem Detail einen Vogelblick wollen, können ihn einen Klick entfernt erreichen — aber nicht sehen, dass er verfügbar ist.
**Risiko:** Synthese-vorab lesen kann den pädagogischen Bogen kaputtmachen — Auflösung vor dem Streit.
**Tendenz:** Vorsichtig — nicht früher anzeigen, eher Verfügbarkeit auf L5 deutlicher machen. Oder den polaren Eingang (Item oben) als Alternative.
**Nächster Schritt:** In Verbindung mit polarer Eingangs-Karte denken.

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

**Trias-Einsicht (14.5.26):** Mit Realismus-und-Konstruktivismus entsteht eine implizite Trias: Geist (Werkzeug — wie funktioniert Bewusstsein?), Selbst (Beobachter — wer erlebt?), Bühne (Realität — was ist da draußen?). Ethik wäre das fehlende vierte Element: Was tue ich, wenn ich verstanden habe, was Geist, Selbst und Welt sind?
**Tendenz:** Pragmatisch B implementieren, langfristig zu C entwickeln. Landingpage "Ideengeschichte" als Oberbegriff einführen — breit genug für Ethik, Politische Theorie, kontemplative Traditionen.
**Nächster Schritt:** Erst Ethik bauen (schließt die Trias), dann Library-Architektur Option B mit Werkzeug/Beobachter/Bühne/Handlung als impliziter Klammer.

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

### [x] Realismus und Konstruktivismus
**Status:** implementiert 17.5.26 (Architekt-Wurf 14.5.26, milde Prüfung durchlaufen)
**Anker:** Der Streit um Boden. Gabriel aufgeschnappt — schmale epistemische Inkarnation einer größeren Lebensfrage.
**Modus:** Mild — 13 Denker, 9 Konzepte, 17 Influences, 9 Schools. Erster echter Mild-Lauf der Reihe.

---

### [ ] Stoizismus
**Status:** Idee, früher in Konversation erwähnt
**Anker:** unklar
**Achsen-Skizze:** noch nicht entwickelt
**Modus:** vermutlich Mild oder Solo (Tradition mit klaren Klassikern, aber Wert liegt in Klarheit der Lebensphilosophie, nicht in akademischer Vollständigkeit)
**Nächster Schritt:** Anker prüfen, bevor Bau begonnen wird.

---

### [ ] Ethik
**Status:** Idee 14.5.26
**Anker:** Schließt die Erkenntnis-Trias (Geist/Selbst/Bühne) durch eine Handlungsdimension — was tue ich, wenn ich verstanden habe, was Geist, Selbst und Welt sind? Anker-Prüfung steht noch aus: reaktiv oder gewachsen?
**Achsen-Skizze:**
- X: Begründungsquelle — Tugend/Charakter ↔ Regel/Pflicht/Folgen
- Y: Geltungsbereich — Universell ↔ Situativ/Kontextuell
**Modus:** Wahrscheinlich Mild — klassische Schulen klar, Pointe liegt in der Auseinandersetzung, nicht in akademischer Vollständigkeit. Risiko: schulische Trockenheit, wenn nicht lebensweltlich verankert.
**Nächster Schritt:** Anker prüfen, wenn Realismus-Tableau implementiert ist. Nicht vorher bauen.

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

## Validierung

### [ ] User-Test mit zwei Personen aus der Persona
**Status:** Methode 14.5.26
**Kontext:** Fabian ist bisher der einzige Datenpunkt für UX-Beurteilung. Selbstbeobachtung ist wertvoll, aber unzureichend — "ist es zu textlastig?" oder "ist die Navigation klar?" lässt sich nicht aus eigenem Lesen beantworten.
**Methode:** Person aus Persona einladen (Coach, Psychologie/Spiritualität/Philosophie-Hintergrund). App geben, nicht erklären. Daneben sitzen, schweigen. Beobachten: Wo klicken sie? Wo zögern sie? Wann verlieren sie den Faden? Nach 20–30 Minuten knappe Nachbesprechung.
**Risiko:** Falsche Personenauswahl — es muss jemand aus der Sanctum-Persona sein, kein technisch interessierter Bekannter ("Sieht cool aus!") und kein akademischer Philosoph ("Hier fehlt aber Dummett").
**Nächster Schritt:** Nach Ethik-Bau zwei Personen einladen. Eventuell den Coach, der schon Feedback gegeben hat.

---

## Verworfene oder pausierte Ideen

### Verkörperungs-Lösung im Tool
**Datum:** 14.5.26
**Grund:** Sanctum kann strukturell nicht Bauch sein. Es kann auf Verkörperung hindeuten, nicht sie produzieren. Saubere Markenklarheit wichtiger als ambitionierte Versprechen.

### Hemisphären-Asymmetrie als eigenes Tableau
**Datum:** 14.5.26
**Grund:** Keine zweite Achse formulierbar, Feld nicht reif sedimentiert, würde verkleidetes McGilchrist-Tableau werden.

### Archetypen-Tableau aus Peterson-Impuls
**Datum:** 14.5.26
**Grund:** Reaktiver Impuls aus aktuellem Lesen. Das Archetypen-Tableau im Backlog bleibt offen — aber erst wenn der Anker eigenständig gewachsen ist, nicht aus einem Buch-Impuls heraus.

### Typologie-Tableau auf Basis von Insider-Korrelationen
**Datum:** 14.5.26
**Grund:** Reaktiver Impuls aus einem alten Dokument. Das seriöse Typologien-Tableau (→ Themen-Backlog) bleibt offen, aber auf akademisch-kritischer Basis, nicht auf Persönlichkeits-Korrelations-Daten.

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

### Resonanzcheck vor jedem Tableau-Bau
Nicht jedes strukturell fehlende Tableau muss gebaut werden. Vor dem Bau strikt prüfen — was treibt mich? Reaktiv (Buchimpuls, architektonische Vollständigkeit) ist dünner als gewachsen (beschäftigt mich seit Monaten, trifft eine persönliche Frage). Tableaus ohne persönlichen Anker können gut gebaut werden — aber Bewusstsein darüber ist Teil der kuratorischen Reife. Sanctum darf solche Tableaus haben, es muss nur ehrlich darüber sein.

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
