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
