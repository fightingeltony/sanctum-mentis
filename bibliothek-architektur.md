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
6. **Externer Blick als Korrektur-Vehikel** — bei Schlüsselelementen lohnt sich ein zweiter Blick

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
