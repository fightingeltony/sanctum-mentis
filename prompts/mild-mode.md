# Mild-Modus — Sanctum-Standard für Tableau-Bauten

**Status:** Konvention, gültig seit v2-Etappe (Mai 2026)
**Anwendungsbereich:** Alle Tableau-Bauten in Sanctum Mentis, sofern nicht explizit anders angegeben.

---

## Was der Mild-Modus ist

Der Mild-Modus ist der **Default-Bauweg** für Sanctum-Tableaus. Er steht zwischen zwei Extremen:

- **Solo-Architekt** (8–12 Knoten, ohne kritische Revision, schnell und intuitiv) — verzichtet auf Prüfung, verliert dadurch oft die Tableau-Stimme.
- **Volle Schleife** (Architekt → Inquisitor → Architekt, 16+ Knoten, akademische Reife) — produziert vollständige Datensätze, kann aber meditative oder lebensweltliche Stimmen zerstören.

Mild ist die **bewusst gemäßigte Mitte**: 10–14 Denker, eine Runde milde Selbstprüfung, kein Vollständigkeitsreflex. Mild ist nicht "abgespecktes Voll". Mild ist eine **eigene Methode** mit eigenen Erfolgsbedingungen.

---

## Sanctum-Vision in einem Satz

Sanctum hilft Nutzern, **ein Thema zu Ende zu denken** — nicht alle Positionen zu kennen. **Verstehbarkeit, nicht Vollständigkeit.**

Jede Bauentscheidung in einem Mild-Tableau muss sich an dieser Vision messen lassen. Wenn ein Knoten nicht hilft, das Thema verstehbar abzuschließen, gehört er nicht ins Tableau — auch wenn er akademisch wichtig wäre.

---

## Drei Mild-Prüffragen

Beim Bau und beim Prüfen eines Mild-Tableaus stelle dich diesen drei Fragen, in dieser Reihenfolge:

### 1. Trägt der Anker?

Bevor irgendetwas gebaut wird: Was ist die **Lebensfrage hinter der akademischen Frage**? Welche Frage des Nutzers macht dieses Tableau dringlich? Ist sie formulierbar in einem Satz?

Wenn die Lebensfrage nicht formulierbar ist, ist das Tableau möglicherweise zu früh. Ist sie formulierbar, dann ist sie der innere Maßstab für alle späteren Entscheidungen — sie wird zur Intro-Frage des Tableaus.

**Zwei Ankertypen:**
- **Gewachsen** — eine echte Frage des Kurators, lebensweltlich, persönlich. Ergibt warme, einladende Tableaus (Beispiel: Selbst, Realismus).
- **Architektonisch** — eine kuratorische Frage, die ein Feld schließt oder eine Gruppe ergänzt. Ergibt nüchternere, strukturell motivierte Tableaus (Beispiel: Ethik als Brücke zur Handlungs-Spur).

Beide sind legitim. Wichtig: Architektonische Anker müssen *als solche markiert* werden — sie verlangen nüchternere Sprache und keine forcierte Lebensweltlichkeit.

### 2. Trägt die polare Spannung?

Jedes Tableau braucht eine zentrale Spannung, die durch die Achsen sichtbar wird. Zwei Achsen, je zwei Pole:

- **X-Achse:** die Hauptspannung des Feldes
- **Y-Achse:** eine zweite, unabhängige Dimension

**Test:** Lassen sich die Denker des Feldes nicht-trivial in die vier Quadranten verteilen, ohne dass ein Quadrant systematisch leer bleibt oder die Verteilung gequält wirkt? Falls einer der Quadranten dünn besetzt ist, ist das oft eine wertvolle Aussage (siehe Ethik Q3: Charakter/Beziehung). Aber dieser Befund muss **bewusst** sein, nicht zufällig.

**Prüfe besonders die Achsen-Beschriftung:** Sind die Pole für Nicht-Akademiker zugänglich? Wenn nicht, kommen erklärende Untertitel hinzu (`leftHint`, `rightHint`, `topHint`, `bottomHint` im Schema). Knapp, neutral, ohne subtile Wertung zugunsten eines Pols.

### 3. Trägt die Mild-Disziplin?

Vollständigkeitsreflex ist der größte Feind des Mild-Modus. Vor jedem zusätzlichen Knoten frage:

- Wird das Tableau durch diesen Knoten **abschlussfähiger** oder nur **vollständiger**?
- Würde ein Nutzer am Ende sagen: *"Jetzt habe ich verstanden"* — oder eher: *"Jetzt weiß ich, dass es noch mehr gibt"*?

Mild zielt auf das erste. Akademische Vollständigkeit ist erlaubt, wo sie hilft. Sie ist nicht das Ziel.

---

## Tableau-Größen (Richtwerte, keine Regeln)

| Element | Richtwert |
|---|---|
| Denker | 10–14 |
| Konzepte | 8–12 |
| Schulen | 6–10 |
| Influences | 12–18 |

Abweichungen nach unten sind okay (Solo-Wurf). Abweichungen deutlich nach oben (16+ Denker) sind ein Signal, dass du nicht mehr Mild baust, sondern in volle Schleife rutschst. Dann diese Entscheidung **bewusst** treffen, nicht heimlich.

---

## Stufen-Verteilung über alle 5 Komplexitäts-Level

**Verteilung der Denker** über die fünf Stufen — als Faustregel:

| Stufe | Anteil | Funktion |
|---|---|---|
| L1 | 2–4 Denker | Einstieg, zugänglichste Positionen |
| L2 | 2–3 Denker | Erste Vertiefung |
| L3 | 2–4 Denker | Hauptkörper |
| L4 | 2–3 Denker | Spezialisierung |
| L5 | 1–2 Denker | Synthese, Solo-Positionen |

**Beispiel Selbst:** 2-1-6-4-2. **Beispiel Ethik v2:** 4-3-3-2-1.

Keine starre Vorgabe — Tableau-spezifische Variationen sind erwartet. Aber alle fünf Stufen müssen mit Inhalt belegt sein. **Wenn der Slider auf L5 nichts mehr zeigt, was er auf L3 nicht schon zeigte, ist das Tableau auf der Tiefe nicht durchgebaut.**

**Influence-Stufungs-Regel:** Eine Influence-Kante darf nie früher erscheinen als der spätere ihrer Endpunkte. Eine Kante zwischen einem L1-Denker und einem L4-Denker hat firstLevel ≥ 4. Beim Bau validieren, bei v2-Erweiterungen prüfen.

---

## Mehrstufige Texte sind die Regel

**Mild-Modus heißt nicht "ein Text pro Knoten".** Realismus-Konvention und v2-Etappe haben gezeigt: Fast jeder Knoten bekommt **zwei Stufen**, zentrale Hubs **drei**.

**Faustregel:**
- **Hubs** (4+ Influences, strukturelle Mitte) → drei Stufen
- **Reguläre Knoten** → zwei Stufen
- **Solo-L5-Knoten** → eine Stufe

**Beispiel-Verteilung:**
- Aristoteles als Hub: L1, L3, L5
- Reguläre L2-Knoten: L2 + L4
- Levinas als Solo-L5: nur L5

### Tonalität der höheren Stufen

L1-Texte sind **didaktisch**: Konzepte einführen, Begriffe erklären, den Knoten zugänglich machen.

L3–L5-Texte sind **tableau-positionierend**: Wirkungslinien, Streitstellen, Konvergenzen, Hub-Stellung. Nicht den Denker erklären, sondern zeigen, wo er im Feld steht und woran sich andere an ihm abarbeiten.

Diese Tonalitäts-Verschiebung ist nicht starr, sondern tableau-spezifisch:
- **Analytisch** (Geist, Realismus): präzise, knappe Begriffe — *"Φ ist Tononis formales Maß"*
- **Lebensweltlich** (Selbst): verwandte Topologien, geteilte Diagnosen — *"Atman, Wahres Selbst und Self meinen verwandte Topologien"*
- **Kuratorisch-nüchtern** (Ethik): Hub-Stellung, strukturelle Mitte — *"Kant ist nicht eine Position unter anderen"*

---

## Annotations-Syntax — `[[Begriff:Erklärung]]`

**Einheitliche Form:** Der Begriff steht vor dem Doppelpunkt im Klammer-Inhalt, die Erklärung dahinter:

```
Die [[Phronesis:praktische Klugheit, die im Einzelfall erkennt, was zu tun ist]] zeigt sich nur in Erfahrung.
```

**Rendering:** Der Begriff erscheint im Fließtext mit gestrichelter Tooltip-Unterstreichung, die Erklärung wird beim Hover/Tap als Tooltip angezeigt.

### Tooltips bis L5

Annotationen gehören **nicht nur** auf L1 (Einsteigerbegriffe), sondern auf **alle Stufen**, wo der Text einen Fachbegriff erstmals einführt, der ohne Erklärung den Leser ausschließen würde.

**Solo-L5-Knoten brauchen besonders viele Tooltips**, weil sie ohne L1-Vorlauf erscheinen und ihre Spezialtermini im Moment der ersten Erwähnung erklären müssen.

### Sparsamkeit als Prinzip

Nicht jeder Begriff verdient einen Tooltip. **Pro Tooltip die Frage stellen:** Wird der Leser ohne diese Erklärung den Satz nicht verstehen oder den Text-Cluster verlieren?

- **Wenn ja:** Tooltip setzen.
- **Wenn nein:** Begriff im Fließtext lassen, Tooltip einsparen.

Doppelte Tooltips für denselben Begriff in eng benachbarten Texten vermeiden — einmal erklärt, gilt im Tableau-Cluster.

---

## Konzept-Typologie — fünf Glyphen, klare Funktionen

Konzept-Knoten haben ein `type`-Feld, das im Frontend als Glyph gerendert wird. Die Typologie ist verbindlich für alle Tableaus seit 23.5.26.

| Glyph | Typ | Was es ist | Test-Frage |
|---|---|---|---|
| ◆ | `axiom` | gesetzte Grundannahme, aus der ein Gebäude folgt | Lässt sich der Knoten als Satz formulieren, der eine Position behauptet? |
| ⌘ | `theory` | strukturiertes Modell, oft an Autor gekoppelt | Hat der Knoten innere Struktur (Komponenten, Mechanik)? Beantwortet er "Wie funktioniert X?" |
| ❖ | `concept` | Terminus, mit dem ein Denker arbeitet | Steht der Knoten *für* etwas, ohne selbst Theorie zu sein? |
| ◎ | `phenomenon` | beobachtbare Lage oder Bewegung | Würde das Phänomen ohne den Namen existieren? |
| ⚡ | `method` | Vorgehensweise, Praxis | Lässt sich der Knoten als Anleitung formulieren? Ist er anwendbar? |

### Beispiele aus dem Bestand (nach Re-Typisierung 23.5.26)

**Axiom ◆** — Cogito, Atman, Anatta, Existenz vor Essenz, Kategorischer Imperativ, Utility, Verantwortung für die Zukunft

**Theory ⌘** — Funktionalismus, Anomaler Monismus, IIT, Predictive Processing, Phänomenales Selbstmodell, Lebens-Geist-Kontinuität, Ego-Tunnel, Free Energy Principle, Individuation, Lebensstil, Welterzeugung, Sinnfeld, Pragmatische Wahrheit, Paradigma und Inkommensurabilität, Tod als Strukturprinzip, Fiktive Endorientierung, Is-Ought-Brücke durch Praxis

**Concept ❖** — Intentionalität, Qualia, Mary's Room, Chinesisches Zimmer, Phenomenal vs. Access Consciousness, Primäre/sekundäre Qualitäten, Ding an sich, Eudaimonia, Phronesis, Ren, Das Antlitz, Geworfenheit, Absurdität, Ich-Du

**Phenomenon ◎** — Hard Problem, Sein-Sollen-Lücke, Mauvaise foi, Angst

**Method ⚡** — Heterophänomenologie, Epoché, Kategorienfehler, Genealogie der Moral

### Klärungen für Grenzfälle

**Gedankenexperimente sind concepts, keine phenomena.** Mary's Room, Chinesisches Zimmer, Zombies sind erfundene Szenarien — begriffliche Werkzeuge, keine beobachtbaren Vorkommnisse. Sie funktionieren *argumentativ wie* Phänomene (sie sollen Intuitionen hervorrufen), aber sie *sind* keine.

**Imperative sind axioms, keine concepts.** "Handle so, dass die Maxime…" (Kant) oder "Handle so, dass die Wirkungen…" (Jonas) sind gesetzte Forderungen, keine Begriffe. Auch wenn der Knoten "Kategorischer Imperativ" oder "Verantwortung für die Zukunft" heißt — sein Inhalt ist eine Setzung.

**Theorie vs. Methode bei Verfahren mit Theorie-Hintergrund** (z.B. Logotherapie, Predictive Processing als kognitive Praxis): Der dominante Aspekt entscheidet. Wenn der Knoten primär "wie funktioniert es" beantwortet → theory. Wenn primär "wie macht man es" → method. Bei Logotherapie ist im Existenzialismus-Tableau die Theorie dominant. In einem Psychotherapie-Tableau wäre dieselbe Sache als method getaggt — Tableau-Kontext entscheidet.

**Phänomen vs. Begriff bei "Angst", "Qualia" und ähnlichen Doppelnatur-Konzepten:** Wenn das Phänomen ohne den Namen existieren würde → phenomenon. Wenn der Knoten spezifisch der Begriff dieses Denkers ist → concept. Angst existiert vor Kierkegaard, Qualia existieren als Erleben vor Nagel — die Knoten sitzen für die Phänomene, nicht für die Begriffe. Geworfenheit ist umgekehrt Heideggers Terminus für eine Lage — der Knoten sitzt für den Begriff, nicht für die nackte Lage.

**Streitstellen sind keine Konzepte.** Eine Streitstelle ("Sinn finden vs. Sinn machen", "Realismus vs. Konstruktivismus") ist eine Beziehung zwischen Positionen, kein Knoten. Sie gehört in die Influences als Kante, nicht in die Konzepte. Wenn die räumliche Sichtbarkeit im Quadranten verloren geht, ist das eine Frontend-Aufgabe (Hervorhebung der Critique-Kante), nicht eine Daten-Aufgabe.

### Disziplin beim Bau

Beim Mitschreiben eines neuen Konzept-Knotens immer fragen, in dieser Reihenfolge:

1. Ist es eine **gesetzte Forderung** oder eine **gesetzte Grundannahme**? → axiom
2. Hat es **innere Struktur** und ist es einem Autor zugeordnet? → theory
3. Lässt es sich als **Anleitung** anwenden? → method
4. Würde es **ohne den Namen existieren**? → phenomenon
5. Sonst: → concept

Default ist nicht `concept`. Wenn die ersten vier Fragen alle ehrlich mit Nein beantwortet werden, ist concept richtig — sonst nicht.

---

## Stimm-Hierarchie eines Tableaus

Ein Tableau spricht mit **drei Stimmen**, jede mit eigener Funktion. Die Stimmen dürfen nicht ineinanderfallen, sonst entsteht Redundanz.

### `subtitle` — die einladende Stimme

Erscheint in der **Library-Card und im Tableau-Kopf** — die erste Frage, die der Nutzer sieht. Atmosphärisch, einladend. Format: kurze Aussage gefolgt von einer offenen Frage als Echo.

**Beispiele:**
- *Das Rätsel im Kopf — Wo wird aus Materie eigentlich Gefühl?* (Geist)
- *Die Suche nach dem Kern — Wer bist du, wenn du alles weglässt?* (Selbst)
- *Das Gewicht deiner Freiheit.* (Ethik)

### `intro` — die zuspitzende Stimme

Erscheint im Tableau auf L1 als zweite Eingangsfrage. Direkter, konkrete Du-Frage. Stellt dem Nutzer die Tableau-Spannung am eigenen Leib.

**Beispiele:**
- *Wenn du Schmerz fühlst — was passiert da eigentlich?* (Geist)
- *Bin ich ein Kern, den ich freilegen kann — oder ein Muster, das ich gerade bin?* (Selbst)
- *Was sollst du tun, wenn es keine einfache Antwort gibt?* (Ethik)

**Wichtig:** Intro nennt **keine Pole**. Sie stellt die Frage, an der sich die Pole abarbeiten — sie nimmt die Synthese nicht vorweg.

### `synthesis` — die landende Stimme

Erscheint auf L5. Drei bis fünf Sätze, kuratorisch. Hier wird der Bogen geschlossen, die Spannungen ausformuliert, die Positionen genannt.

### Du-Konsistenz

Subtitle und Intro sprechen einheitlich **"du"**. Das gewinnt an Direktheit. Die Synthese auf L5 darf anders sprechen (kuratorisch, dritte Person) — aber an der Tür spricht das Tableau persönlich.

---

## Tableau / Lectio / Lebensfrage — die drei Formen (Kanon)

> **Kanonische Quelle: `kanon.md`** (Abschnitt „Die drei Formen — Reichweite, Wohnort, Bau-Regel"). Bei Abweichung gilt `kanon.md`. Der Volltext steht hier bewusst mit, damit ein kontextfreier Prüfer-Chat die Definition vor Augen hat — Änderungen aber immer zuerst in `kanon.md`.

Sanctum kennt drei Formen, in denen Wissen zugänglich wird. Sie sind nicht drei gleichrangige Geschwister nebeneinander, sondern unterscheiden sich in **Reichweite** und **Wohnort**. Wer eine neue Form baut, muss wissen, welche davon er gerade bedient.

### Tableau — die Fläche

Das Tableau ist die **Karte eines Feldes**. Alle Stimmen eines Themas gleichzeitig sichtbar, räumlich angeordnet, selbstgesteuert begehbar. Es behauptet keinen Pfad — es zeigt das ganze Feld und überlässt dem Nutzer, wohin er geht.

Das Tableau ist die **Quelle, aus der die beiden anderen Formen schöpfen.** Sowohl Lectio als auch Lebensfrage greifen auf Tableau-Knoten zurück; keine von beiden erzeugt eigenes Stimmen-Material.

### Lectio — Tiefe in *einem* Feld

Die Lectio ist eine **kuratierte Sequenz innerhalb eines einzigen Tableaus.** Sie wohnt im Tableau und verlässt es nie. Sie nimmt 4–8 der vorhandenen Knoten und legt sie in eine Reihenfolge, die einen Bogen trägt — vertikal, ein Feld in die Tiefe.

- **Reichweite:** ein Tableau.
- **Wohnort:** *im* Tableau (Discovery im Tableau-Kopf, Route `/lectio/[id]`). **Nicht** als eigene Top-Level-Form in der Bibliothek sichtbar.
- **Achse:** Tiefe. Sie fragt nicht „was sagen andere Felder dazu", sondern „wie hängt dieses eine Feld in sich zusammen".

### Lebensfrage — Breite *über* Felder

Die Lebensfrage ist eine **kuratierte Sammlung quer über mehrere Tableaus.** Sie nimmt eine gelebte Situation („Was tue ich mit Schmerz?", „Wie stelle ich mich zum Tod?") und versammelt dazu Stimmen aus verschiedenen Feldern — horizontal, eine Lebenslage aus mehreren Blickwinkeln beleuchtet.

- **Reichweite:** mehrere Tableaus.
- **Wohnort:** *neben* der Bibliothek (eigener Bereich, Route `/lebensfragen/[id]`). Sichtbar auf Top-Level, weil sie keinem einzelnen Tableau gehört.
- **Achse:** Breite. Sie fragt nicht „wie hängt ein Feld zusammen", sondern „was haben die Felder dieser einen Lebenslage zu sagen".

### Die Asymmetrie ist die Aussage

| Form | Reichweite | Achse | Wohnort | sichtbar als |
|---|---|---|---|---|
| **Tableau** | ein Feld, ganz | Fläche | Bibliothek | Library-Card |
| **Lectio** | Ausschnitt *eines* Feldes | Tiefe (vertikal) | *im* Tableau | Discovery im Tableau-Kopf |
| **Lebensfrage** | Ausschnitt *über* Felder | Breite (horizontal) | *neben* der Bibliothek | eigener Bereich |

Lectio ist **Tiefe in einem Feld**, Lebensfrage ist **Breite über Felder**, Tableau ist die **Fläche, aus der beide schöpfen.** Diese drei Sätze sind die kürzeste tragfähige Fassung des Kanons.

Daraus folgt die Bau-Regel: Eine Lectio darf nie Tableau-Grenzen überschreiten (sonst wird sie zur Lebensfrage), und eine Lebensfrage muss mindestens zwei Tableaus berühren (sonst ist sie eine Lectio mit falschem Wohnort). Wer beim Bau merkt, dass eine Lectio nach einem fremden Feld greift, baut in Wahrheit eine Lebensfrage — und umgekehrt.

Für den Tableau-Bau heißt das konkret: Ein im Mild-Modus gebautes Tableau ist die **Fläche**. Beim Bau ist nicht zu planen, welche Lectios oder Lebensfragen später daraus schöpfen — das Tableau muss als ganzes Feld tragen, nicht als Vorrat für spätere Pfade. Umgekehrt gilt die schon dokumentierte Disziplin: Knoten bewusst lebensweltlich anschlussfähig schreiben (vgl. `lectio_brief`- und Reserve-Brief-Konvention), damit Lectio und Lebensfrage später ohne Nachbau andocken können. Die Fläche zuerst — die Pfade finden sich danach.

---

## Verteilter Mild-Modus (empfohlen, nicht Pflicht)

**Workflow:**

- **Chat A (Architekt):** Baut das Tableau auf Basis dieses Prompts plus Anker-Klärung mit dem Kurator. Liefert JSON, Begleitnotiz und kuratorische Entscheidungen.

- **Chat B (Prüfer):** Externer Chat, **ohne Projektwissen verknüpft** (sonst wird er zum Inquisitor). Bekommt das fertige JSON, diesen Mild-Prompt und ein bestehendes Tableau als Stilreferenz. Prüft gegen die drei Mild-Prüffragen — knapp, ohne Vollständigkeitsreflex.

- **Architekt arbeitet Befunde ein.**

**Bedingung für Wiederholbarkeit:** Dieser Prompt muss als Datei existieren. Sonst wird die Methode jedes Mal neu erfunden.

---

## Schema-Felder, die ein Mild-Tableau füllen muss

```json
{
  "topic": {
    "id": "...",
    "title": "...",
    "subtitle": "...",
    "intro": "...",
    "synthesis": "...",
    "theme": { "accent": "...", "accentSoft": "..." },
    "complexityLevels": 5,
    "quadrants": {
      "axisX": {
        "label": "...",
        "left": "...", "leftHint": "...",
        "right": "...", "rightHint": "..."
      },
      "axisY": {
        "label": "...",
        "top": "...", "topHint": "...",
        "bottom": "...", "bottomHint": "..."
      }
    }
  },
  "levels": [ ... ],
  "schools": [ ... ],
  "thinkers": [ ... ],
  "concepts": [ ... ],
  "influences": [ ... ]
}
```

Pflichtfelder pro Knoten:
- **Denker:** `id`, `name`, `lifespan`, `firstLevel`, `schoolId`, `x`, `y`, `versions` (mit mind. Text auf `firstLevel`, idealerweise mehrstufig)
- **Konzept:** `id`, `name`, `type`, `firstLevel`, `x`, `y`, `versions`
- **Influence:** `from`, `to`, `type`, `firstLevel` (≥ max der Endpunkte), `versions`
- **Schule:** `id`, `label`, `color`, `glyph`, `gx`, `gy`, `labelDir`

---

## Koordinaten-Konvention: X und Y

Knoten haben `x` und `y`-Koordinaten von 0 bis 100. Die Konvention ist **mathematisch**, nicht CSS-/Screen-orientiert:

- **x = 0** ist links, **x = 100** ist rechts
- **y = 0** ist **unten** am bottom-Pol der Y-Achse, **y = 100** ist **oben** am top-Pol

Das heißt: Wenn die Y-Achse als `axisY: { top: "Spirituell", bottom: "Wissenschaftlich" }` definiert ist, dann sitzen Knoten mit hohem y (z.B. 88) **oben am spirituellen Pol**, Knoten mit niedrigem y (z.B. 22) **unten am wissenschaftlichen Pol**.

**Warnung:** Bei intuitivem Bau gibt es die Versuchung, hohe Y-Werte mit "tieferer/ernsthafterer Position" zu assoziieren und sie deshalb dem dramatischeren Pol zuzuordnen. Das ist falsch. Y folgt der Achsen-Definition, nicht der Dramaturgie.

### Plausibilitäts-Pflichttest nach Koordinaten-Setzung

Nach dem Setzen aller Koordinaten — und bevor die Begleitnotiz geschrieben wird — folgenden Test durchführen:

1. Drei **Anker-Knoten** wählen, deren Position in jedem der vier Pole eindeutig sein muss.
2. Für jeden Anker laut sagen: *"X ist am [Pol]-Pol der [X|Y]-Achse, also müsste seine [x|y]-Koordinate [niedrig | hoch] sein."*
3. Im JSON nachschauen — wenn auch nur ein Anker auf der falschen Seite sitzt: **systematischer Inversionsverdacht**. Alle anderen Knoten ebenfalls prüfen.

Konkretes Beispiel für ein Existenzialismus-Tableau (Y: Entwurf oben ↔ Geworfenheit unten):
- Sartre ist *der* Entwurfs-Denker → y muss HOCH sein
- Heidegger ist *der* Geworfenheits-Denker → y muss NIEDRIG sein
- Sartre y=18, Heidegger y=85 → **Achtung, beide invertiert** → systematischer Fix nötig

Der Test kostet drei Minuten. Sein Auslassen kostet später eine externe Beobachtung und einen Patch-Lauf.

### Warum dieser Test in den Prompt gehört

Der Inversionsbug ist *systematisch konsistent*: Alle Knoten passen relativ zueinander, nur eben gespiegelt. Interne Selbstprüfung übersieht das, weil die Spannungen zwischen den Knoten stimmen. Nur ein externer Achsen-Anker-Test ("wo erwarte ich Sartre, wo Heidegger?") deckt den Bug auf.

---

## Validierungs-Checkliste vor Lieferung

Vor der Übergabe an Claude Code / das Repo:

- [ ] Alle Schulen-Referenzen (`schoolId`) verweisen auf existierende Schulen
- [ ] Alle Influence-Endpunkte (`from`, `to`) verweisen auf existierende Knoten
- [ ] Jeder Knoten hat mindestens einen Text auf seinem `firstLevel`
- [ ] Jede Influence-Stufe ≥ max(firstLevel der Endpunkte)
- [ ] Annotations-Syntax durchgängig `[[Begriff:Erklärung]]` mit Doppelpunkt
- [ ] Mehrstufige Texte vorhanden (12+ von 13 Denkern, 8+ von 10 Konzepten)
- [ ] Tooltips auf allen fünf Stufen verteilt (nicht nur L1–L2)
- [ ] Subtitle, Intro, Synthese alle gefüllt
- [ ] Achsen-Hints für alle vier Pole gefüllt
- [ ] Stufen-Verteilung über L1–L5 (kein Stau auf einer Stufe)
- [ ] **Koordinaten-Plausibilitätstest** mit drei Anker-Knoten durchgeführt (y=100 oben, y=0 unten)

---

## Begleitnotiz beim Liefern

Jedes neu gebaute Tableau wird mit einer **Begleitnotiz** geliefert, die festhält:

1. Anker (gewachsen oder architektonisch, mit Begründung)
2. Achsenwahl (welche Alternativen wurden geprüft und warum diese gewählt)
3. Aufgenommene Denker mit Begründung der Wahl
4. Bewusst nicht aufgenommene Denker (mit Begründung)
5. Stufen-Verteilung
6. Synthese-Text mit Erklärung der drei Spannungen
7. Lessons für den Backlog

Begleitnotizen sind nicht für die App, sondern für die kuratorische Selbstvergewisserung. Sie helfen, beim nächsten Tableau-Bau zu wissen, was funktioniert hat und was nicht.

---

## Was Mild nicht ist

- **Nicht "abgespecktes Voll"** — Mild ist eine eigene Methode mit eigenen Erfolgsbedingungen.
- **Nicht "ohne Prüfung"** — Mild hat eine Runde milde Selbstprüfung gegen die drei Prüffragen.
- **Nicht "schnell und schlampig"** — Mild verlangt sorgfältige Anker-Klärung, mehrstufige Texte, einheitliche Annotation. Sie ist nicht weniger Arbeit als die volle Schleife, sondern anders fokussiert.
- **Nicht "ohne Tooltips"** — Mild-Tableaus haben Tooltips über alle fünf Stufen, sparsam aber gezielt.

---

## Wann statt Mild den vollen Schleife verwenden?

Volle Schleife ist gerechtfertigt, wenn:

- Das Feld akademisch hochsensibel ist und Vollständigkeit eingeklagt würde (z.B. Erkenntnistheorie, Logik)
- Das Tableau später als wissenschaftliche Referenz dienen soll
- Es ein methodisches Schaustück werden soll, nicht ein lebensweltliches Werkzeug

In allen anderen Fällen: Mild ist Default.

---

## Wann statt Mild Solo verwenden?

Solo (8–12 Knoten, ohne Prüfung) ist gerechtfertigt, wenn:

- Das Tableau ein erster Wurf ist, der bewusst nicht reif werden soll
- Es ein Skizzen-Tableau für eine Idee ist (z.B. ein neues Feld erforschen)
- Geschwindigkeit wichtiger ist als Reife

Solo-Tableaus werden **als solche markiert** in der Begleitnotiz. Sie sind keine fertigen Tableaus.

---

## Versionshistorie

- **v1** (14.5.26): Erster Wurf, entwickelt während Realismus-Bau. Drei Prüffragen, 10–14 Denker, verteilter Modus.
- **v2** (19.5.26): Erweitert nach v2-Etappe (Ethik, Selbst, Realismus, Geist). Hinzugekommen: Mehrstufige Texte als Regel, Tooltips bis L5, einheitliche Annotations-Syntax `[[Begriff:Erklärung]]`, Stimm-Hierarchie (Subtitle/Intro/Synthese), Du-Konsistenz, Achsen-Hints, Influence-Stufungs-Regel, Validierungs-Checkliste.
- **v2.1** (23.5.26): Konzept-Typologie als verbindliche Konvention aufgenommen. Fünf Glyphen (◆ axiom, ⌘ theory, ❖ concept, ◎ phenomenon, ⚡ method) mit klaren Tests und Grenzfall-Klärungen (Gedankenexperimente, Imperative, Theorie-vs-Methode, Phänomen-vs-Begriff, Streitstellen). Bestandstableaus retrospektiv typisiert. Streitstellen werden ab v2.1 nicht mehr als Konzept-Knoten geführt, sondern als hervorgehobene Critique-Kanten in den Influences.
- **v2.2** (26.5.26): Y-Achsen-Konvention explizit aufgenommen (y=100 ist oben am top-Pol, y=0 ist unten am bottom-Pol). Pflicht-Plausibilitätstest mit drei Anker-Knoten nach Koordinaten-Setzung eingeführt. Anlass: Y-Inversionsbug in drei Mild-Tableaus entdeckt (Realismus, Ethik, Existenzialismus), gefixt durch y_neu = 100 - y_alt. Geist und Selbst (Vollmodus) waren korrekt.
