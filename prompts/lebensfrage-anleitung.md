# Lebensfrage — Bau-Anleitung (Entwurf)

**Status:** KANDIDAT (Stand 2026-06-26). Destilliert aus den vier bestehenden
Lebensfragen — `einsamkeit`, `schmerz`, `tod`, `veraenderung` — und noch *nicht*
an einem Neubau bewährt. Wird erst MASSGEBLICH, wenn ein echter Lebensfragen-Bau
sie geprüft hat (wie die Lectio-Anleitung durch „annehmen-oder-ueberwinden"). Bis
dahin gilt: Was alle vier teilen, steht hier als Regel; was variiert, als Freiheit;
was die vier Fälle nicht entscheiden, ausdrücklich als **Notiz, kein Kanon**.

**Anwendungsbereich:** Alle Lebensfragen-Bauten in Sanctum Mentis
(`data/lebensfragen/<id>.json`).

**Verhältnis der Quellen:** Die Mechanik (Felder) steht in `schema-referenz.md` §3.
Die Haltung (ausstellen statt verkünden, der Streit bleibt offen, vereinfachen ohne
zu deuten) steht in `kanon.md` und gilt hier unverändert. Diese Anleitung trägt nur
das *Bau-Spezifische* der Form — die Reihenfolge der Entscheidungen, die
Schreibdisziplin, die typischen Fehler. Die Form-Abgrenzung Tableau / Lectio /
Lebensfrage ist kanonisch und unten wortgleich aus der Lectio-Anleitung übernommen.

---

## Was eine Lebensfrage ist

Das Tableau ist ein Sternbild von Stimmen zu *einer* großen Frage; eine Lectio führt
durch *ein* Tableau in die Tiefe. Eine **Lebensfrage reicht über mehrere Tableaus
hinweg** — sie nimmt eine gelebte Lage („Wie halte ich meine Einsamkeit?", „Was tue
ich mit Schmerz?") und versammelt dazu Stimmen aus verschiedenen Feldern.

Jede Stimme stammt aus einem konkreten Tableau-Knoten (`aus: {tableau, knoten}`),
wird aber **zur Lebensfrage hin neu geschrieben** — sie ist kein Auszug aus dem
`versions`-Text des Tableaus, sondern eine eigene Antwort dieses Denkers auf *diese*
Frage.

**Das definierende Prinzip — Quer-Lager, nicht Tableau-Gruppen.** Eine Lebensfrage
existiert nur dann zu Recht, wenn die Frage *quer* zu den Tableaus schneidet. Die
Stimmen werden nicht nach Herkunft gruppiert, sondern nach ihrer **Antwort** auf die
Frage. Die Lager, die der Schluss sichtbar macht, verlaufen quer durch die
Herkunfts-Tableaus — bei „Einsamkeit" steht das Lager *Mangel* (Buber und Winnicott
aus `begegnung`) gegen das Lager *Grundverfassung* (Heidegger und Sartre aus
`existenzialismus`), aber die Lager-Grenze ist nicht die Tableau-Grenze: Fromm aus
`begegnung` hält beides zusammen, Rilke aus `verwandlung` steht allein.

Daraus folgt das schärfste Kriterium der Form: **Decken sich deine Lager mit den
Tableau-Grenzen, hast du keine Lebensfrage gebaut, sondern mehrere Lectios
nebeneinandergestellt.** Die Tableau-Herkunft ist nur Buchhaltung (`aus`), nicht
Baulogik.

---

## Der Bau-Prozess — die Reihenfolge der Entscheidungen

Die Reihenfolge ist nicht beliebig. Wer mit dem Material beginnt statt mit der Frage,
baut eine dekorative Stimmen-Sammlung — Stimmen, die *auch noch etwas* zum Thema sagen,
statt Stimmen, die sich *streiten*.

### 1. Die Frage zuerst — und ihren Modus einkreisen

Eine Lebensfrage beginnt mit der Frage, nie mit den verfügbaren Stimmen. Und die Frage
ist in allen vier Fällen eine **Handlungs- oder Haltungsfrage an den Leser**, keine
Definitionsfrage:

- nicht „Was *ist* Schmerz?", sondern „Was *tue ich* mit Schmerz?"
- nicht „Was *ist* der Tod?", sondern „Wie *begegne ich* dem Tod?"
- nicht „Ändert sich der Mensch?", sondern „Kann *ich* mich *wirklich* ändern?"

Drei der vier Fragen kreisen ihren eigenen Schlüsselbegriff ein. „Kann ich mich
wirklich ändern?" — das Intro sagt ausdrücklich, das Wort, auf das es ankommt, sei
*wirklich*. Diese Verengung auf das eine entscheidende Wort ist das, was die Frage
*ziehen* lässt, statt sie breit auslaufen zu lassen.

**Resonanz-Check vor dem Bau** (`„Zieht mich wirklich?"`): Steht die Frage so, dass
*du* sie nicht fertig beantworten kannst? Wenn du eine Antwort hast, die du nur noch
belegen willst, ist es keine Lebensfrage — dann verkündest du.

### 2. Die Lager bestimmen — nicht die Tableaus

Erst nach der Frage: Welche grundverschiedenen *Antworten* gibt es auf sie? Das sind
die Lager. Bei „Einsamkeit" sind es drei — *Wunde / Mangel*, *Grundverfassung*,
*Bedingung von etwas*; der `anker` benennt sie schon. Bei „Veränderung" laufen sie
feiner: *ja, aber langsam* / *ja, aber nicht durch dich* / *die Frage selbst ist
falsch gestellt*.

Die Lager sind die Baueinheit. Erst wenn sie stehen, geht man auf die Suche nach den
Stimmen, die jedes Lager am stärksten besetzen — **egal, in welchem Tableau sie
wohnen.**

### 3. Stimmen wählen — Lager-Kriterium, nicht Tableau-Kriterium

Man wählt nicht „zwei aus Existenzialismus, drei aus Begegnung". Man holt für jedes
Lager seine stärksten Stimmen. Eine Stimme kommt hinein, wenn sie ein Lager *besetzt
oder verschiebt*, nicht, weil ihr Tableau noch nicht vertreten ist.

Das löst die scheinbare Spannung bei „Tod" sauber auf: Fünf der neun Stimmen stammen
allein aus `existenzialismus` — fast das halbe Feld aus *einem* Tableau. Trotzdem
trägt es, weil die fünf untereinander zerstritten sind (Heidegger gegen Camus gegen
Frankl gegen Tillich): Sie fallen in *verschiedene Lager*. **Es kippt nicht bei zu
vielen Stimmen aus einem Tableau, sondern bei zu vielen Stimmen im selben Lager.**
Zwei Stimmen, die dasselbe sagen, sind eine zu viel — die schwächere fliegt.

`kuratiert_aus_tableaus` führt *alle berücksichtigten* Tableaus, nicht nur die, aus
denen am Ende Stimmen stammen (so das Schema). In den vier Fällen sind es drei bis fünf
— die Mehrzahl ist Pflicht, sonst ist es eine Lectio mit falschem Wohnort.

### 4. Jede Stimme zur Frage hin schreiben

Der Knoten liefert die Position; die Frage bestimmt, was von ihr sichtbar wird. Derselbe
Knoten klingt in verschiedenen Lebensfragen verschieden: Marc Aurel trennt bei „Schmerz"
das Urteil vom Ereignis, bei „Tod" ordnet er das Sterben als Werk der Natur ein. Buber
steht in drei der vier Fragen — jedes Mal anders gewendet. **Wer dieselbe Stimme zweimal
gleich schreiben könnte, hat sie nicht auf die Frage hin geschrieben.**

Die Probe: Streiche den Namen aus der Überschrift. Beantwortet der Text noch erkennbar
*diese* Frage — oder referiert er nur die allgemeine Lehre des Denkers? Letzteres ist
Voice-Padding (siehe Schreibdisziplin).

### 5. Den Schluss als Quer-Schnitt schreiben

Der Schluss ist der Ort, an dem die Lager sichtbar werden — und zwar quer zu den
Tableaus. Er folgt in allen vier Fällen derselben Dramaturgie (siehe unten). Er ist das
strukturelle Gegenteil einer Lectio-`closing_synthesis`: Die `closing_synthesis` landet
*einen* Bogen durch *ein* Feld; der Lebensfrage-`schluss` ordnet einen *Streit über
Felder hinweg*, ohne ihn zu schlichten.

---

## Die feste Dramaturgie der vier Felder

Alle vier Lebensfragen tragen dieselben vier Felder in derselben Reihenfolge. Das ist
Regel, nicht Zufall.

### `anker` — die Frage gespannt

Kurzer Einstieg, der die Frage in direkter Form nennt und die Spannung andeutet. Länge
variiert (siehe Freiheit) — von zwei knappen Sätzen („Schmerz ist universal und
unausweichlich. Aber wie umgehen mit ihm?") bis zu einem dichten Absatz, der schon die
Lager vorzeichnet. Beides trägt.

### `intro` — die Frage geöffnet, *bevor* eine Stimme spricht

Das Intro tut in allen vier Fällen dreierlei:

1. **Macht die Frage konkret** — ein Alltagsbild, das den Leser in die Lage zieht: der
   verpuffte Vorsatz, das Verschieben auf nächstes Jahr, das Ziehen beim Kaffee, die
   Einsamkeit mitten unter Menschen.
2. **Kündigt den Dissens an** — „sie sind sich nicht einig", „neun Stimmen, neun
   Antworten". Der Leser weiß, bevor er beginnt, dass ihn kein Konsens erwartet.
3. **Verbietet die Ratschlags-Lesart** — am deutlichsten bei „Einsamkeit": *Lies sie
   nicht als Ratschläge. Lies sie als verschiedene Antworten auf die eine Frage.* Die
   Stimmen stellen aus, sie raten nicht.

### `stimmen` — `ueberschrift` + `text`

**`ueberschrift` = `Name: Pointe-zu-dieser-Frage`.** Der Name nennt den Knoten; der
Teil nach dem Doppelpunkt ist die Zuspitzung *dieser Stimme auf diese Frage* — nicht
die allgemeine Position des Denkers. „Heidegger: Verloren im ›Man‹ — und nie wirklich
bei dir." „Epikur: Der Tod geht dich nichts an." Die Überschrift ist schon ein
Mini-Argument, kein Etikett.

**`text`** trägt eine Position, gewendet auf die Frage. Die Pointe sitzt hinten — der
Text endet fast immer bei dem, was diese Stimme dem Leser *zumutet* oder *anbietet*
(Heidegger: „warst du je wirklich allein genug, um dir selbst zu begegnen"; Sartre:
„das ehrliche Gesicht der Freiheit"). Die Reihenfolge der Stimmen ist kuratorisch, nicht
hierarchisch — keine Stimme wird als die richtige ans Ende gestellt.

### `schluss` — den Streit ordnen, nicht schlichten

Vier Schritte, in allen vier Fällen:

1. **Zahl der Stimmen, Dissens bekräftigt** — „Neun Antworten, und sie sind sich nicht
   einig."
2. **Die Lager gegeneinandergestellt** — *wer* zieht *wohin*, quer zu den Tableaus
   („Epikur und Marc Aurel wollen dir die Furcht nehmen; Heidegger und Yalom wollen,
   dass der Tod dich aufweckt").
3. **Auflösung ausdrücklich verweigert** — „Keine dieser Stimmen löst die anderen auf."
4. **Wendung zum Leser** — *du* trägst gerade vielleicht eine mehr; das darf wechseln;
   vielleicht widersprichst du allen. Das ist die haltungstreue Landung: keine Antwort,
   sondern die Rückgabe der Frage an den, der sie gestellt hat.

---

## Schreibdisziplin

### Der typische Fehler: Voice-Padding

Die eine Gefahr, gegen die der ganze Bau-Prozess gerichtet ist: Stimmen, die das Thema
*dekorieren*, statt ein Lager zu *tragen*. Eine gepaddete Stimme erkennt man daran, dass
sie auch in jeder anderen Lebensfrage zum selben Knoten stehen könnte — sie referiert die
Lehre, statt die Frage zu beantworten. Sie entsteht fast immer, wenn man mit dem Material
beginnt („was könnte X noch dazu sagen?") statt mit den Lagern („welches Lager ist noch
unbesetzt, und wer besetzt es am schärfsten?").

Gegenmittel: Jede Stimme muss ein Lager *besetzen oder verschieben*. Besetzt sie nur ein
schon vertretenes Lager schwächer als eine vorhandene Stimme, fliegt sie.

### Eine gute Stimme

- beantwortet erkennbar *diese* Frage (Namens-Streich-Probe, siehe oben),
- trägt ihre Pointe hinten,
- bleibt **modelltreu**: Sie darf nie mehr oder anderes behaupten, als ihr
  Tableau-Knoten hergibt. Der Drang, eine Position zugänglicher zu machen, indem man sie
  ans vertraute (oft westlich-individuelle) Verständnis anschmiegt, ist eine Falle —
  zugänglich ≠ vertraut. Im Zweifel den Herkunfts-Knoten gegenlesen.
- **stellt aus, sie verkündet keinen Weg** — verschärft bei Schmerz, Einsamkeit, Tod.
  Erfahrungsnähe darf nicht ins Ratgeberhafte oder ins Ästhetisieren von Leid kippen
  (`kanon.md`, Wellbeing).

### Ton

Phänomenologische, nahbare Sprache — der Leser soll die Lage *spüren*, bevor er den Namen
des Denkers liest. Satzlängen variieren (ein tragender langer Satz, dann ein kurzer, der
trifft); das ist der erzählend-erfahrende Standard, kein Stakkato. Laut lesen, auf Klang
prüfen, nicht auf Länge.

---

## Was variiert — Freiheit, nicht Regel

Über die vier Fälle hinweg variabel; ausdrücklich **nicht** kanonisiert:

- **Stimmenzahl:** 6 / 9 / 9 / 8. Kein fester Wert, aber keine unter ~6 — die Untergrenze
  liegt da, wo der Streit erst mehrstimmig wird (mehrere Lager mit je mehreren Stimmen).
- **`anker`-Länge:** von zwei Sätzen bis zum dichten, lagervorzeichnenden Absatz.
- **Schluss-Wendung zum Leser:** mal als zurückgegebene Frage („würdest du heute anders
  leben?"), mal als Aussage („du findest deine Antwort genau dort, wo du widersprichst").
  Beides haltungstreu.

---

## Notiz, kein Kanon — wartet auf den nächsten Fall

Beobachtungen aus den vier Fällen, die für eine Regel noch nicht genug hergeben:

- **Obergrenze pro Tableau.** „Tod" zieht fünf von neun Stimmen aus `existenzialismus`
  und trägt, weil sie auf verschiedene Lager verteilt sind. Ob es eine harte Obergrenze
  gibt, ab der eine Lebensfrage auch bei verteilten Lagern zur verkappten Lectio wird,
  entscheiden vier Fälle nicht. Das Lager-Kriterium (Punkt 3) ist das belegte Werkzeug;
  eine Tableau-Quote ist es nicht.
- **Untergrenze der Stimmenzahl.** „Keine unter sechs" ist aus vier Fällen abgelesen,
  nicht hergeleitet. Ob fünf trägt, wenn die Frage nur drei scharfe Lager hat, ist offen.
- **Verhältnis Lager-Zahl zu Stimmen-Zahl.** Plausibel, dass die Stimmenzahl der Zahl der
  Lager × Besetzungstiefe folgt — aber aus vier Fällen nicht sauber ablesbar.

---

## Prozess je Lebensfrage (Checkliste)

1. **Frage zuerst** formulieren — Handlungs-/Haltungsfrage, Schlüsselwort einkreisen.
   Resonanz-Check: zieht sie *dich*, oder hast du die Antwort schon?
2. **Lager bestimmen** — die grundverschiedenen Antworten auf die Frage. Das ist die
   Baueinheit.
3. **Stimmen wählen** nach Lager-Kriterium, quer über die Tableaus. Pro Lager die
   stärksten; keine Dopplung im selben Lager.
4. **Quer-Schnitt prüfen:** Decken sich die Lager mit den Tableau-Grenzen? Dann ist es
   keine Lebensfrage — neu gruppieren oder als Lectio erkennen.
5. **Mindestens zwei** (real: drei bis fünf) Tableaus berührt; `kuratiert_aus_tableaus`
   führt alle berücksichtigten.
6. **Jede Stimme zur Frage hin schreiben** — Namens-Streich-Probe; modelltreu zum Knoten.
7. **Voice-Padding-Check:** Trägt jede Stimme ein Lager, oder dekoriert sie nur?
8. **`anker` / `intro` / `schluss`** nach der festen Dramaturgie; Intro-Dreifaches
   (konkret / Dissens / kein Ratschlag); Schluss ordnet, schlichtet nicht.
9. **Offener Ausgang:** verweigert der Schluss die Auflösung ausdrücklich und gibt die
   Frage an den Leser zurück?
10. **Laut lesen** (Klang). **Achtung:** Lebensfragen sind **nicht Vitest-geprüft** — keine
    Maschine fängt hier Drift. Die ganze Prüflast liegt beim Menschen. `aus.tableau` /
    `aus.knoten` müssen von Hand gegen reale Tableau-IDs geprüft werden; ein Tippfehler
    fällt nirgends auf.

---

## Tableau / Lectio / Lebensfrage — die drei Formen (Kanon)

> **Kanonische Quelle: `kanon.md`** (Abschnitt „Die drei Formen — Reichweite, Wohnort,
> Bau-Regel"). Bei Abweichung gilt `kanon.md`. Der Volltext steht hier bewusst mit, damit
> diese Anleitung als Übergabe-Artefakt selbsttragend bleibt — Änderungen aber immer
> zuerst in `kanon.md`.

Sanctum kennt drei Formen. Sie unterscheiden sich in **Reichweite** und **Wohnort**.

- **Tableau — die Fläche.** Die Karte eines Feldes; alle Stimmen eines Themas gleichzeitig,
  räumlich, selbstgesteuert. Die **Quelle**, aus der die beiden anderen schöpfen — keine
  erzeugt eigenes Stimmen-Material.
- **Lectio — Tiefe in *einem* Feld.** Kuratierte Sequenz innerhalb *eines* Tableaus, 4–8
  Knoten in eine Reihenfolge gelegt. Wohnt im Tableau, verlässt es nie. Achse: Tiefe.
- **Lebensfrage — Breite *über* Felder.** Kuratierte Sammlung quer über mehrere Tableaus zu
  einer gelebten Lage. Wohnt *neben* der Bibliothek, sichtbar auf Top-Level. Achse: Breite.

Daraus die Bau-Regel: Eine Lectio darf nie Tableau-Grenzen überschreiten (sonst wird sie
zur Lebensfrage), und eine Lebensfrage muss mindestens zwei Tableaus berühren (sonst ist sie
eine Lectio mit falschem Wohnort). Wer beim Bau merkt, dass eine Lectio nach einem fremden
Feld greift, baut in Wahrheit eine Lebensfrage — und umgekehrt.

---

## Herkunft dieser Anleitung

Destilliert am 2026-06-26 aus den vier bestehenden Lebensfragen (`einsamkeit`, `schmerz`,
`tod`, `veraenderung`), gegen `schema-referenz.md` §3 (Felder) und `kanon.md` (Haltung)
geprüft, in der Form an `lectio-anleitung.md` orientiert (Aufbau, Status-Zeile,
Regel/Freiheit/Notiz-Trennung), aber inhaltlich eigenständig — Lebensfrage ist eine andere
Form als Lectio.

**Status der Bewährung:** KANDIDAT. Wird MASSGEBLICH, sobald ein echter Lebensfragen-Bau
sie geprüft hat. Belegfall vor Kanonisierung. Bis dahin bleiben die „Notiz, kein
Kanon"-Punkte offen und werden vom ersten Neubau entschieden.
