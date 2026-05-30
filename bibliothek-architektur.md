# Architektur der Bibliothek

**Datum:** 19.5.26
**Anlass:** Selbstbeobachtung am Live-Tool — die Library-Page wirkt als Liste, nicht als Architektur. Außerdem: drei konkurrierende Fragen-Ebenen pro Tableau, die nicht klar voneinander abgegrenzt waren.
**Status:** kuratorische Selbstvergewisserung, nicht Implementierungs-Notiz

Diese Notiz hält fest, was die Sammlung gerade *ist*. Nicht, was sie tun soll — das gehört in den Backlog. Sondern was sich beim Bau und beim Betrachten als Struktur herauskristallisiert hat.

---

## Die Bibliothek als Architektur, nicht Liste

Die vier abgeschlossenen Tableaus bilden keine zufällige Sammlung. Sie ordnen sich entlang zweier Achsen:

### Erkenntnis-Trias

Drei Tableaus bilden zusammen ein geschlossenes Feld — sie beantworten die drei Grundfragen jeder Erkenntnistheorie:

- **Geist** — Was *ist* Erkennen? (Bewusstsein, Materie, das Phänomenale)
- **Selbst** — Wer erkennt? (das Subjekt der Erkenntnis)
- **Realismus** — Was wird erkannt? (Welt, Konstruktion, Wahrheit)

Akt, Subjekt, Objekt. Wenn man die drei zusammen liest, hat man das Erkenntnis-Feld in seiner ganzen Spannung. Ein viertes Tableau "Erkenntnistheorie" wäre redundant — es würde die Trias nur als Meta-Tableau dublieren.

Diese Geschlossenheit ist nicht zufällig, sie ist kuratorische Entscheidung. Bei Bedarf revidierbar — aber gegenwärtig: geschlossen.

### Handlungs-Spur

Daneben beginnt eine zweite Spur:

- **Ethik** — Was *sollen* wir tun? (gegenwärtig, gebaut als architektonische Ergänzung der Trias)
- **Politische Philosophie** — Wie wollen wir zusammenleben? (geplant)

Ethik ist die erste Stimme einer Handlungs-Dimension, die der Erkenntnis-Trias gegenübersteht. Sie wurde bewusst mit architektonischem statt persönlich-gewachsenem Anker gebaut — als Brücke zwischen "Wissen, wie es ist" und "Wissen, was zu tun ist".

### Die Asymmetrie ist Information

Reihe 1 (Trias) ist geschlossen. Reihe 2 (Handlung) ist offen — sie beginnt mit Ethik und wartet auf Politische Philosophie. Diese Asymmetrie ist nicht zu reparieren, sondern ehrlich zu zeigen: Die Sammlung ist nicht fertig, aber sie folgt einer Architektur.

---

## Implikation für die Library-Card-Anordnung

Wenn die Library-Page diese Architektur sichtbar macht, gewinnt sie:

- Trennende Kapitelmarkierungen (klein, in Akzentfarbe), die Trias und Handlungs-Spur voneinander absetzen
- Oder zwei Reihen mit klarer Bedeutung: Reihe 1 die Trias, Reihe 2 die Handlung
- Oder eine implizite Anordnung, die durch Position und Abstand die Gruppierung lesbar macht

**Nicht jetzt umsetzen.** Die Gruppierung lohnt erst, wenn die Handlungs-Spur mindestens zwei live geschaltete Tableaus hat. Sonst wirkt sie vorzeitig — eine Gruppe aus einem Tableau ist keine Gruppe.

**Hinweis für künftige Tableaus:** Jedes neue Tableau muss sich verorten. Entweder es schließt sich einer bestehenden Gruppe an (Handlung, Erkenntnis), oder es eröffnet eine neue. Das ist kuratorische Reife, nicht Bürokratie — eine Sammlung ohne Architektur wird beliebig.

---

## Tableau / Lectio / Lebensfrage — die drei Formen (Kanon)

> **Kanonische Definition.** Dieser Block ist wortgleich in `bibliothek-architektur.md`, `prompts/lectio-mode.md` und `prompts/mild-mode.md` hinterlegt. Änderungen an einer Stelle müssen in allen drei nachgezogen werden — es gibt nur eine Quelle der Wahrheit.

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

---

## Farb-Architektur der Sammlung

Akzentfarben werden ab 23.5.26 nicht mehr pro Tableau einzeln vergeben, sondern folgen einer Spur-Logik. Jede Spur hat ein eigenes Hue-Band; innerhalb des Bands differenzieren Tableaus durch Hue-Position. Lightness und Chroma bleiben konstant, damit die Spuren als gleichwertig wahrgenommen werden.

**Update 28.5.26:** Farbarchitektur nach Farb-Runde neu kalibriert. Die Bänder haben sich verschoben — Existenz ist jetzt warm (≈35–70°, amber-gold), Handlung ist oliv-grün (100–128°), das frühere grüne Band (110–160°) ist freie Reserve. Symbolik-Beschreibungen sind provisorisch und müssen vom Kurator revidiert werden.

**Update 29.5.26:** Lebenskunst (hue 65, Existenz-Spur) eingebunden. Existenz-Band jetzt mit zwei Tableaus (Existenzialismus 45, Lebenskunst 65) — Bandbreite ≈35–70° bestätigt.

**Update 30.5.26:** Begegnung (hue 35, Existenz-Spur) eingebunden — sitzt am unteren, wärmsten Rand des Existenz-Bands. Staffelung jetzt Begegnung 35 · Existenzialismus 45 · Lebenskunst 65. Lebenskunst-L von 0.45 auf 0.44 angeglichen (Korridor-Hygiene). Existenzialismus oklch(0.42 0.10 45) als final bestätigt. Deklaration der Begegnung-Akzent-Korrektur (Hue 25→35) siehe `begegnung-aenderung.md`.

| Spur | Hue-Band | Symbolik (provisorisch) |
|---|---|---|
| Erkenntnis-Trias | 165°–295° (grün bis blau-violett) | Erkenntnis als distanzierende Operation |
| Handlungs-Spur | 100°–128° (oliv-grün) | Handlung als geerdet, nüchtern — *zu präzisieren* |
| Existenz-Spur | 35°–70° (warm amber-gold) | Existenz als Unmittelbarkeit, gelebtes Dasein — *zu präzisieren* |

**Reserve:** Das frühere Existenz-Band (110–160°, erdig-grün) ist jetzt frei. Offen insgesamt ca. 200°+ (Magenta-Pink, Cyan-Blau, Gelb, Erdig-Grün) für künftige Spuren. Beim Hinzukommen einer vierten Spur wird das nächste Band entschieden — das ist *Erweiterung*, kein Umfärben.

**Konstante Stellschrauben:** L ≈ 0.42–0.45, C ≈ 0.10–0.13.

**Aktueller Bestand (Stand 30.5.26):**

```
Selbst                   oklch(0.42 0.12 295)   Erkenntnis-Trias
Geist                    oklch(0.44 0.13 240)   Erkenntnis-Trias
Realismus                oklch(0.42 0.11 165)   Erkenntnis-Trias
Begegnung                oklch(0.43 0.12  35)   Existenz-Spur
Existenzialismus         oklch(0.42 0.10  45)   Existenz-Spur
Lebenskunst              oklch(0.44 0.11  65)   Existenz-Spur
Politische Philosophie   oklch(0.44 0.12 128)   Handlungs-Spur
Ethik                    oklch(0.45 0.12 100)   Handlungs-Spur
```

**Verhältnis zu „Library-Architektur sichtbar machen":** Die Farb-Architektur ist *implizite* Spur-Sichtbarmachung. Explizite Sichtbarmachung (Trennstriche, Header, zwei Reihen) bleibt eigenes Backlog-Item, ausgelöst sobald die Handlungs-Spur ein zweites live-Tableau hat.

## Spur-Sichtbarkeit — Hybrid

Die Spur-Architektur wird in der Library *implizit* sichtbar gemacht — ohne harte Section-Header oder Trennstriche:

- **Farbe** als Familien-Signal (kühl / warm / erdig) — die drei Hue-Bänder sind auf einen Blick wahrnehmbar
- **Reihenfolge** in `library.json` gruppiert nach Spur (Erkenntnis → Handlung → Existenz)
- **Eyebrow-Markierung** pro Card — kleiner Spur-Name (`ERKENNTNIS`, `HANDLUNG`, `EXISTENZ`) über dem Card-Titel, in der Spur-Farbe des Tableaus, uppercase, ca. 11px

Keine harten Section-Header, keine Trennstriche zwischen Spuren. Begründung: Zwei der drei Spuren haben aktuell nur ein Tableau — Section-Header würden "Sektion mit einer Karte" zeigen, was unfertig wirkt. Die Hybrid-Lösung trägt jetzt und skaliert mit wachsender Sammlung.

**Bedingung für explizite Sichtbarkeits-Lösung** (Section-Header, Trennstriche, ggf. Spur-Filter): Alle bestehenden Spuren tragen mindestens zwei Tableaus. Stand 29.5.26: Erkenntnis (3) ✓, Handlung (2: Ethik + Politische Philosophie) ✓, Existenz (2: Existenzialismus + Lebenskunst) ✓. **Bedingung erfüllt** — explizite Sichtbarkeits-Lösung kann jetzt umgesetzt werden.

---

## Die Stimm-Hierarchie eines Tableaus

Beim Sortieren der Eingangs-Fragen ist klar geworden: ein Tableau spricht mit **drei Stimmen**, jede mit einer eigenen Funktion. Wenn die Stimmen ineinanderfallen, entsteht Redundanz; wenn sie klar getrennt sind, entsteht eine erlebbare Vertiefung.

### `subtitle` — die einladende Stimme

Erscheint in der **Library-Card und im Tableau-Kopf** — die erste Frage, die der Nutzer überhaupt sieht. Atmosphärisch, einladend. Format: kurze Aussage gefolgt von einer offenen Frage als Echo.

Beispiele:
- *Das Rätsel im Kopf — Wo wird aus Materie eigentlich Gefühl?* (Geist)
- *Die Suche nach dem Kern — Wer bist du, wenn du alles weglässt?* (Selbst)
- *Wo endet die Welt und wo beginnst du?* (Realismus)
- *Das Gewicht deiner Freiheit.* (Ethik)

Eine Stimme, eine Quelle — der Subtitle wird **nicht** auf Library-Card und Tableau separat gepflegt. Die Library-Card liest direkt aus dem JSON.

### `intro` — die zuspitzende Stimme

Erscheint im Tableau auf L1 als zweite Eingangsfrage. Direkter, eine konkrete Du-Frage. Sie nimmt den Nutzer, der schon eingetreten ist, und stellt ihm die Tableau-Spannung am eigenen Leib.

Beispiele:
- *Wenn du Schmerz fühlst — was passiert da eigentlich?* (Geist)
- *Bin ich ein Kern, den ich freilegen kann — oder ein Muster, das ich gerade bin?* (Selbst)
- *Kannst du der Welt trauen, oder beginnt sie erst in deinem Kopf?* (Realismus)
- *Was sollst du tun, wenn es keine einfache Antwort gibt?* (Ethik)

Wichtig: Intro **nimmt nicht die Synthese vorweg**. Sie stellt die Frage, an der sich die Pole abarbeiten — sie nennt die Pole nicht. Auflösung bleibt der Synthese vorbehalten.

### `synthesis` — die landende Stimme

Erscheint auf L5. Hier wird der Bogen geschlossen — die Spannungen werden ausformuliert, die Positionen genannt, der Streit positioniert. *"Hier ist die Spannung, die du jetzt verstehst."*

Drei bis fünf Sätze, kuratorisch, nicht didaktisch.

### Die drei zusammen

Drei Stimmen, drei Funktionen, drei Orte:

| Stimme | Wo | Funktion |
|---|---|---|
| `subtitle` | Library-Card + Tableau-Kopf | einladen, hineinziehen |
| `intro` | Tableau auf L1 | zuspitzen, am Leib stellen |
| `synthesis` | Tableau auf L5 | auflösen, landen |

Das ist der Bogen, den die Sanctum-Vision verlangt: Punkte setzen, Erkenntnisse landen lassen. Subtitle ist der Punkt, an dem das Thema sich dem Nutzer anbietet; Intro ist der Punkt, an dem das Thema ihn ankommen lässt; Synthese ist der Punkt, an dem es sich schließt.

---

## Du-Konsistenz als Sammlung-Signatur

Beim Sortieren der Eingangsfragen ist eine Versuchung sichtbar geworden, die nicht trägt: die Idee, dass Personalpronomen architektur-tragend sein müssten — *ich* für Innenfragen (Geist, Selbst), *du* für die Welt-Frage (Realismus), *wir* für die Gemeinschafts-Frage (Ethik).

Was sich beim wirklichen Schreiben gezeigt hat: Diese Pronomen-Architektur klingt sauber, fühlt sich aber inkonsistent an. Die Sammlung wird durch die **einheitliche Du-Adressierung** stärker — alle vier Tableaus sprechen den Nutzer direkt an. Das gewinnt an Konsistenz und Direktheit; das *wir* in *"Wie wollen wir leben?"* (Ethik-Vorform) fiel in die Lehrbuch-Falle, weil es vom Nutzer wegging in eine abstrakte Gemeinschaft.

**Sammlungs-Signatur:** Subtitle und Intro sprechen "du". Die Synthese auf L5 darf anders sprechen — sie ist kuratorisch, nicht einladend. Aber an der Tür spricht das Tableau persönlich.

Diese Erkenntnis ist eine Revision: In einer früheren Fassung dieser Notiz hatte ich Personalpronomen als Architektur-Signal benannt. Die Du-Konsistenz ist die ehrlichere Beobachtung.

---

## Bibliothek mit Haltung, ohne Wahrheitsanspruch

Beim Bau der Ethik-Lectio (Begründungs-Frage mit Levinas-Landung) wurde eine Konvention sichtbar, die alle vier Tableaus schon implizit erfüllt hatten — die aber zum ersten Mal explizit werden musste, weil das Material eine Versuchung zur Lösung anbot.

**Sanctum darf eine Haltung haben — aber keine Wahrheit verkünden.**

Eine Lectio, eine Synthese, ein Tableau zeigt einen Blick auf das Feld. Die kuratorisch stärkste Position darf spürbar sein. Aber sie darf nicht als finale Antwort markiert werden. Der Leser muss am Ende eigene Gedanken haben dürfen, die nicht vorweggenommen sind.

**Praktische Folgen für Sammlungs-Bauten:**

- **Phänomenologische statt ontologische Sprache.** Sanctum beschreibt, was passiert (*"Levinas beobachtet, was schon geschehen war..."*), nicht was ist (*"Ethik ist..."*). Beschreibung lässt offen, Behauptung schließt.
- **Synthese und Closing sind Beobachtung, keine Lösung.** Sätze wie *"Ethik beginnt vor der Begründung"* sind philosophische Thesen — sie gehören nicht in die Sanctum-Stimme. Erlaubt: *"Es ist die Frage, ob die Begründungs-Suche der richtige Weg war."*
- **Schlussfragen öffnen, sie schließen nicht.** Eine echte Frage hat mehrere mögliche Antworten und drängt den Leser nicht in eine.
- **Die kuratorisch stärkste Position darf gezeigt werden** — als Möglichkeit, nicht als Antwort. Die Formulierung *"Du musst nicht zustimmen. Aber du hast die Möglichkeit gesehen"* ist die Haltung dieser Konvention in einem Satz.

**Wo diese Konvention besonders wichtig wird:** Bei Lectios mit einer destruktiv-aufbauenden Bewegung (siehe `prompts/lectio-mode.md` Punkt 9), wo eine letzte Station eine attraktive Alternative zu den demontierten Positionen anbietet. Auch bei Themen, in denen der Kurator selbst eine starke Überzeugung hat — der Architekt schreibt überzeugend, der Inquisitor muss prüfen, ob das Überzeugen zur Vorgabe wird.

**Sammlungs-Signatur:** Bibliothek mit Haltung, ohne Wahrheitsanspruch. Das schließt an die Du-Konsistenz an — Sanctum spricht den Leser persönlich an, aber gibt ihm nicht vor, was er denken soll. Die Bibliothek zeigt das Feld; der Leser geht hindurch.

Methodische Vertiefung der Konvention in `prompts/lectio-mode.md` Punkt 10 (Offener Ausgang). Sollte sinngemäß auch in `prompts/mild-mode.md` für Synthese-Texte aufgenommen werden.

---

## Methodische Notiz: Externer Blick als Korrektur-Vehikel

Bei der Subtitle-Findung wurden zwei Iterationen mit Gemini gegengeprüft. Die Befunde haben den Wurf substanziell verbessert:

- **"Lehrbuch-Falle" bei Ethik** *("Wie wollen wir leben?")* — wäre Schulbuch-Sprache geworden
- **"Philosophie-Kopf-Satz" bei Geist** *("Wer denkt, wenn ich denke?")* — clever, aber ohne Berührung
- **Aufzählungs-Subtitle bei Selbst** *("Wesen, Geschichte oder Illusion")* — wie ein Inhaltsverzeichnis

Diese Diagnosen kamen nicht aus dem eigenen Kopf, sondern aus dem externen Blick. Sie haben den Ensemble-Wurf merklich verbessert. Lesson: Bei textlichen Schlüsselelementen (Subtitle, Intro, Synthese) lohnt sich ein zweiter Blick durch eine andere Stimme, bevor man sich auf eine Formulierung festlegt. Ähnlich wie beim verteilten Mild-Modus mit getrennten Architekt/Prüfer-Chats — nur auf der textlichen Mikro-Ebene.

Wichtig: Nicht alles übernehmen, was die andere Stimme vorschlägt. Bei Realismus war Geminis Frage *"Kannst du der Welt trauen, wenn sie erst in deinem Kopf zu einer Welt wird?"* stilistisch stark, aber konstruktivistisch gefärbt — sie nahm einen Pol der Achse vorweg. Die abgemilderte Form *"...oder beginnt sie erst in deinem Kopf?"* erhält die Stärke, behält die Neutralität.

---

## Was diese Notiz festhält

1. **Erkenntnis-Trias geschlossen** — Geist, Selbst, Realismus bilden ein vollständiges Feld
2. **Handlungs-Spur offen** — Ethik allein, wartet auf Politische Philosophie
3. **Library-Architektur sichtbar machen** ist Folgearbeit, lohnt erst bei zwei Handlungs-Tableaus
4. **Drei Stimmen pro Tableau** — Subtitle (einladend), Intro (zuspitzend), Synthese (landend)
5. **Du-Konsistenz als Sammlung-Signatur** — Subtitle und Intro sprechen einheitlich "du", nicht gemischte Pronomen
6. **Bibliothek mit Haltung, ohne Wahrheitsanspruch** — Sanctum darf Position zeigen, aber nicht verkünden. Phänomenologische statt ontologischer Sprache, Synthese als Beobachtung, Schlussfragen als Öffnung
7. **Externer Blick als Korrektur-Vehikel** — bei Schlüsselelementen lohnt sich ein zweiter Blick

Diese Punkte sind keine ToDo-Liste, sondern Leitlinien. Sie helfen, beim nächsten Tableau-Bau zu wissen, wo der neue Knoten in die Sammlung hineinwächst.

---

## Finales Ensemble der Eingangsfragen

Nach Iteration und externer Prüfung:

| Tableau | Subtitle | Intro |
|---|---|---|
| **Selbst** | Die Suche nach dem Kern — Wer bist du, wenn du alles weglässt? | Bin ich ein Kern, den ich freilegen kann — oder ein Muster, das ich gerade bin? |
| **Geist** | Das Rätsel im Kopf — Wo wird aus Materie eigentlich Gefühl? | Wenn du Schmerz fühlst — was passiert da eigentlich? |
| **Realismus** | Wo endet die Welt und wo beginnst du? | Kannst du der Welt trauen, oder beginnt sie erst in deinem Kopf? |
| **Ethik** | Das Gewicht deiner Freiheit. | Was sollst du tun, wenn es keine einfache Antwort gibt? |

---

## Backlog-Folgen

Aus dieser Notiz ergeben sich zwei neue Items für `backlog.md`:

1. **Library-Architektur sichtbar machen** — Frontend-Aufgabe, ausgelöst sobald Politische Philosophie live ist. Trennende Kapitelmarkierungen oder klare Reihen-Logik.

2. **Stimm-Hierarchie als Konvention** in `prompts/mild-mode.md` aufnehmen — Subtitle (einladend, atmosphärisch, Du-Form), Intro (zuspitzend, direkte Du-Frage), Synthese (landend, kuratorisch). Künftige Tableaus folgen dieser Dreiteilung.

Außerdem sind folgende Backlog-Items durch diese Klärung **erledigt** oder **präzisiert:**

- `[ ] Polare Eingangs-Karte` — durch Intro-Feld umgesetzt, ohne explizite Pol-Nennung
- `[ ] Frage hinter der Frage als viertes Eingangs-Element` — durch Intro-Feld umgesetzt
- `[ ] Lebensweltliche Eingangs-Anker prüfen` — durch Subtitle-Überarbeitung aller vier Tableaus erledigt

---

## Was diese Notiz nicht festhält

Was die Bibliothek einmal werden *könnte*. Frage-Architektur (Sanctum Quaestiones), Lectio-Modus, Tab-Erweiterungen, Verkörperungs-Lösungen — all das steht im Backlog und gehört dort hin. Diese Notiz beschränkt sich auf das, was *jetzt* steht und was darin als Architektur erkennbar geworden ist.

Sanctum ist gerade eine kleine, gut sortierte Bibliothek — vier Tableaus, zwei Gruppen, drei Stimmen pro Tableau, fünf Stufen pro Stimme. Das ist eine Architektur, die trägt. Was kommt, baut darauf auf.
