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

### `subtitle` — die öffentliche Stimme

Erscheint in der **Library-Card und im Tableau-Kopf** — die erste Frage, die der Nutzer überhaupt sieht. Lebensweltlich, einladend, eine offene Frage. Sie wirbt nicht reißerisch, aber sie zieht hinein.

Beispiele:
- *Wer denkt, wenn ich denke?* (Geist)
- *Was bin ich wirklich — Wesen, Geschichte oder Illusion?* (Selbst)
- *Was ist da draußen wirklich los, wenn ich nicht hinschaue?* (Realismus)
- *Wie wollen wir leben?* (Ethik)

Eine Stimme, eine Quelle — der Subtitle wird **nicht** auf Library-Card und Tableau separat gepflegt. Die Library-Card liest direkt aus dem JSON.

### `intro` — die dichtere Stimme

Erscheint im Tableau auf L1 als zweite Eingangsfrage. Direkter, du-orientiert, eine Spur emotionaler. Sie nimmt den Nutzer, der schon eingetreten ist, und positioniert ihn vor der Tableau-Karte.

Beispiele:
- *Wenn du Schmerz fühlst — was passiert da eigentlich?* (Geist)
- *Bin ich ein Kern, den ich freilege — oder ein Muster, das ich gerade bin?* (Selbst)
- *Wo stehst du, wenn die alten Gewissheiten weichen?* (Realismus)
- *Was sollst du tun, wenn du frei bist?* (Ethik)

Wichtig: Intro **nimmt nicht die Synthese vorweg**. Sie stellt die Frage, an der sich die Pole abarbeiten — sie nennt die Pole nicht. Auflösung bleibt der Synthese vorbehalten.

### `synthesis` — die landende Stimme

Erscheint auf L5. Hier wird der Bogen geschlossen — die Spannungen werden ausformuliert, die Positionen genannt, der Streit positioniert. *"Hier ist die Spannung, die du jetzt verstehst."*

Drei bis fünf Sätze, kuratorisch, nicht didaktisch.

### Die drei zusammen

Drei Stimmen, drei Funktionen, drei Orte:

| Stimme | Wo | Funktion |
|---|---|---|
| `subtitle` | Library-Card + Tableau-Kopf | einladen, hineinziehen |
| `intro` | Tableau auf L1 | positionieren, ankommen |
| `synthesis` | Tableau auf L5 | auflösen, landen |

Das ist der Bogen, den die Sanctum-Vision verlangt: Punkte setzen, Erkenntnisse landen lassen. Subtitle ist der Punkt, an dem das Thema sich dem Nutzer anbietet; Intro ist der Punkt, an dem das Thema ihn ankommen lässt; Synthese ist der Punkt, an dem es sich schließt.

---

## Personalpronomen als Architektur-Signal

Bei der Subtitle-Wahl wurde sichtbar: Die vier Tableaus sprechen mit verschiedenen Personalpronomen, und das ist kein Zufall.

- **Geist** und **Selbst** sprechen "ich" — Innenfragen
- **Realismus** spricht "du" — eine Du-Frage, Standpunkt zur Welt
- **Ethik** spricht "wir" — die einzige Wir-Frage, gemeinsame Sache

Das spiegelt die Reichweite der jeweiligen Frage: Wo Erkenntnis individuell ist (Geist, Selbst), wo sie eine Welt befragt (Realismus), wo sie eine Gemeinschaft bindet (Ethik).

Bei künftigen Tableaus diese Linse anwenden: Wenn das Personalpronomen nicht "selbstverständlich" trifft, ist das Tableau möglicherweise nicht klar genug verortet. *Politische Philosophie* wird vermutlich "wir" sprechen, wie Ethik. Ein Tableau über *Schönheit* könnte "ich" oder "du" sein. *Geschichte* möglicherweise "wir".

---

## Was diese Notiz festhält

1. **Erkenntnis-Trias geschlossen** — Geist, Selbst, Realismus bilden ein vollständiges Feld
2. **Handlungs-Spur offen** — Ethik allein, wartet auf Politische Philosophie
3. **Library-Architektur sichtbar machen** ist Folgearbeit, lohnt erst bei zwei Handlungs-Tableaus
4. **Drei Stimmen pro Tableau** — Subtitle (öffentlich), Intro (dicht), Synthese (landend)
5. **Personalpronomen als Architektur-Signal** — Reichweite der Frage wird in der Sprache hörbar

Diese Punkte sind keine ToDo-Liste, sondern Leitlinien. Sie helfen, beim nächsten Tableau-Bau zu wissen, wo der neue Knoten in die Sammlung hineinwächst.

---

## Backlog-Folgen

Aus dieser Notiz ergeben sich zwei neue Items für `backlog.md`:

1. **Library-Architektur sichtbar machen** — Frontend-Aufgabe, ausgelöst sobald Politische Philosophie live ist. Trennende Kapitelmarkierungen oder klare Reihen-Logik.

2. **Stimm-Hierarchie als Konvention** in `prompts/mild-mode.md` aufnehmen — Subtitle (öffentlich, lebensweltlich), Intro (dicht, du-orientiert), Synthese (landend, kuratorisch). Künftige Tableaus folgen dieser Dreiteilung.

Außerdem sind folgende Backlog-Items durch diese Klärung **erledigt** oder **präzisiert:**

- `[ ] Polare Eingangs-Karte` — durch Intro-Feld umgesetzt, ohne explizite Pol-Nennung
- `[ ] Frage hinter der Frage als viertes Eingangs-Element` — durch Intro-Feld umgesetzt
- `[ ] Lebensweltliche Eingangs-Anker prüfen` — durch Subtitle-Überarbeitung aller vier Tableaus erledigt

---

## Was diese Notiz nicht festhält

Was die Bibliothek einmal werden *könnte*. Frage-Architektur (Sanctum Quaestiones), Lectio-Modus, Tab-Erweiterungen, Verkörperungs-Lösungen — all das steht im Backlog und gehört dort hin. Diese Notiz beschränkt sich auf das, was *jetzt* steht und was darin als Architektur erkennbar geworden ist.

Sanctum ist gerade eine kleine, gut sortierte Bibliothek — vier Tableaus, zwei Gruppen, drei Stimmen pro Tableau, fünf Stufen pro Stimme. Das ist eine Architektur, die trägt. Was kommt, baut darauf auf.
