# Lectio 2.0 — Überarbeitungs-Richtlinie

**Zweck:** Leitfaden für die Überarbeitung bestehender Lectios in den erzählend-erfahrenden Ton. Entstanden aus dem Partnerin-Test (Herz-Typ) an der Selbst-Lectio „Wer bist du, wenn du alles weglässt?" plus zwei Stil-Proben am Geist-Tableau.

**Status:** in Erprobung. Die bestehenden (expositorischen) Lectios bleiben vorerst parallel live — Rückweg offen, falls 2.0 sich nicht bewährt. Belegfall vor Kanonisierung.

---

## Die Grundidee

Lectio 2.0 holt ab und ist nahbar. Sie erklärt nicht von oben, sie nimmt mit. Der Leser soll *spüren*, worum es geht, bevor er den Namen des Denkers liest. Maßstab dafür ist nicht Tiefe, sondern Nähe.

**Aber:** Nahbar heißt NICHT länger. Das war der zentrale Fehler der ersten Überarbeitung — „mehr Geschichte" wurde als „mehr Text" missverstanden. Das Ergebnis war zu lang, zu viel zu lesen, und sprachlich holprig (verschachtelte Sätze). Der Herz-Typ las weniger, nicht mehr.

---

## Die vier Regeln

### 1. Länge: kurz halten — Referenz ist die ERSTE erzählende Fassung
Maßstab ist die erste erzählende Fassung der Selbst-Lectio (vor dem Szenen-Ausbau), nicht die ausgebaute. Pro Station: ein knapper erzählender Block, kein Doppel-Absatz. Wenn eine Station länger wird als die Referenz, ist sie zu lang — egal wie schön das Bild ist. Im Zweifel kürzen.

Faustregel `narrative.body`: 1 Absatz, nicht 2–3. Wenige Sätze. Lieber ein starkes Bild als drei.

### 2. „Mehr Geschichte" heißt mehr Konkretheit, nicht mehr Worte
Eine Geschichte kann in zwei Sätzen stecken. Nahbarkeit kommt von der *Konkretheit* des Bildes, nicht von seiner Ausführlichkeit. „Dein Daumen hält inne überm Handy" ist nahbar in sieben Worten. Der Scroll-Moment war als kurzer Hook stark — falsch wurde er erst als ausgewalzter Absatz. Bild setzen, dann weiter. Nicht im Bild verweilen, bis es zerredet ist.

### 3. „Wo sinnvoll und möglich" — nicht jede Station verträgt eine Geschichte
Die wichtigste Regel, und sie ist ein Kriterium, kein Pauschalgebot:

**Erzählend, wo eine ERFAHRUNG im Zentrum steht. Nüchtern-klar, wo ein ARGUMENT im Zentrum steht.**

Beleg aus den Stil-Proben (Geist-Tableau):
- **Nagel** (Fledermaus, „wie fühlt es sich an") — erfahrungszentriert → erzählender Ton trägt und *verbessert*. Der Kippmoment von der Fledermaus auf dich selbst wird körperlich spürbar.
- **Davidson** (anomaler Monismus, Brückengesetze) — argumentzentriert → erzählender Ton *bricht und schadet sogar*. Die Figur verschwindet, sobald das Argument beginnt; der erzählerische Anlauf weckt eine Erfahrungserwartung, die das Argument nicht einlöst — eine Tür, hinter der eine Wand steht.

Konsequenz: Der Ton wird nicht gleichmäßig über die Lectio gelegt. Innerhalb *einer* Lectio dürfen erzählende und nüchterne Stationen wechseln. Der Übergang wird bewusst gesetzt, nicht versteckt. Auflösung ist die einzelne STATION, nicht das Tableau.

Test vor dem Erzählen: Schauen die Stimmen auf eine gemeinsame Erfahrung (dann erzählend)? Oder verhandeln sie ein begriffliches Problem (dann nüchtern)?

### 4. Sprache: kurze, klare Sätze
Die Holprigkeit der langen Fassung kam von Verschachtelung — Bilder, die in lange Sätze gequetscht wurden. Lieber zwei einfache Sätze als einen verschachtelten. Klarer Rhythmus vor Dichte. Wenn ein Satz beim Vorlesen stockt, teilen.

---

## Durchlaufende Figur — nur bei gemeinsamer Erfahrung
Eine einzige Figur/Szene durch alle Stationen (wie der Scroll-Moment in der Selbst-Lectio) trägt NUR, wenn alle Stimmen dieselbe Erfahrung verschieden deuten. Beim Selbst ja (alle schauen auf den Moment des Sich-Bemerkens). Bei einem argument-getriebenen Tableau (politische Philosophie, große Teile von Geist) nein — dort würde die Figur künstlich. Nicht erzwingen.

## Modell-Treue bleibt
Der erzählende Ton verführt dazu, eine Position *zugänglicher* zu machen, indem man sie ans vertraute (oft westlich-individuelle) Verständnis anschmiegt. Das ist eine Falle: zugänglich ≠ vertraut. Beispiel-Fehler: Vedanta als „finde deinen individuellen Kern" erzählt, obwohl der Knoten die Einheit Atman=Brahman meint (überpersönlich). Die erzählte Stimme darf nie mehr oder anderes behaupten, als ihr Tableau-Knoten hergibt. Im Zweifel den Knoten gegenlesen.

## Wellbeing bleibt
Erfahrungsnähe darf nicht ins Ästhetisieren von Leid oder ins Ratgeberhafte kippen. Die Stimme stellt aus, sie verkündet keinen Weg. (Gilt verschärft bei Themen wie Schmerz, Einsamkeit, Selbstannahme.)

---

## Prozess je Lectio
1. Stationen durchgehen: je Station entscheiden — Erfahrung (erzählend) oder Argument (nüchtern)?
2. Für die erzählenden: ein konkretes, KURZES Bild. Referenzlänge einhalten.
3. Knoten gegenlesen (Modell-Treue).
4. Laut lesen (Sprach-Check, Regel 4).
5. Gesamtlänge gegen die erste erzählende Selbst-Lectio prüfen.
6. Bestehende Fassung NICHT löschen, bis 2.0 sich am Nutzer bewährt hat.

---

## Bild-Konsistenz prüfen (bei jeder Überarbeitung)

**Architektur:** Jede Station hat genau ein Bild. Die Bilder leben NICHT in der Lectio-JSON — sie sind ein entkoppelter Strom. Workflow: pro Station wird ein **Prompt** geliefert (Grundprompt unten), das Bild wird extern erzeugt (Gemini) und eingefügt. Grundregel des Bild-Modus-Kanons: **Bilder stimmen ein, illustrieren nicht.** Hochformat (~4:5), Nische als Bildsprache, gedämpft, analog, kein digitaler Glanz.

**Der Prüfschritt:** Nach jeder Textüberarbeitung jede Station fragen — *stimmt das bestehende Bild noch auf die NEUE Bedeutung ein?*
- **Reine Kürzung / Sprachglättung** (Bedeutung unverändert) → Bild bleibt. Kein neuer Prompt nötig.
- **Bedeutungsverschiebung** (die Aussage der Station hat sich geändert) → Bild neu denken, neuen Prompt liefern. Das bestehende Bild stimmt sonst auf die alte Lesart ein und arbeitet leise gegen den Text.

**Belegfall:** Beim Selbst-Lectio-Umbau wurden drei Stationen nur gekürzt (Buddhismus, Jung, Metzinger → Bilder bleiben), aber Vedanta inhaltlich korrigiert (von „individueller Kern, der im Inneren ruht" zu „überpersönlicher Grund, in dem das Ich verschwindet"). Das alte Nischen-Bild (Licht ruht in geschlossener Nische = verborgener Kern) stimmt auf die ALTE Lesart ein. Nur diese eine Station braucht ein neues Bild — eine Öffnung, an der das Innen ins Grenzenlose übergeht.

**Faustregel:** Eine Textänderung, die den Vedanta-/Modell-Treue-Test ausgelöst hat (Bedeutung war falsch/verschoben), löst fast immer auch den Bild-Check aus. Reine Längen-/Sprachänderungen nie.

## Grundprompt für Stationsbilder (Referenz)

```
Atmospheric still image for a contemplative philosophy library.
Soft, warm, dim light falling from one side, like candlelight in a quiet
sanctum. Muted, desaturated palette bedded in parchment warmth. Tangible
texture — no glossy render, no vector cleanness, no digital sheen.
Single subject, generous empty space, calm and timeless mood.
Vertical composition (portrait, roughly 4:5), subject centered or slightly
off-center, holding together within a tall narrow niche.
NOT illustrative, NOT a portrait, NO face, NO diagram, NO text, NO symbols
that explain. It evokes an atmosphere, it does not depict a thesis.
Painterly, analog, slightly grainy. Fine-art photography meets old fresco.
```
Pro Station wird der Subject-Teil ersetzt; der Rahmen bleibt. Das Bild stimmt auf die *Atmosphäre* der Station ein, bebildert nie die These.
