# Lectio-Modus — Sanctum-Standard für geführte Pfade

**Status:** Konvention v1.11, Mai 2026. **Ersetzt durch `prompts/lectio-anleitung.md` (Stand 2026-06-14). Bleibt als historische Detailreferenz erhalten.**
**Anwendungsbereich:** Alle Lectio-Bauten in Sanctum Mentis.

---

## Was Lectio ist

Die Karte (Tableau) zeigt alles gleichzeitig: Denker im Netz, Konzepte im Quadranten, Stufen als Tiefenregler. Der Nutzer navigiert räumlich und selbstgesteuert.

Lectio ist ein anderer Modus. **Lectio ist eine kuratorische Sequenz** — eine Reihenfolge von Knoten, die der Kurator für den Nutzer getroffen hat, damit er nicht selbst entscheiden muss, was als nächstes kommt.

Die Karte sagt: *Hier ist alles. Erforsche.* Lectio sagt: *Komm mit. Ich zeige dir den Bogen.*

**Das Ziel ist nicht Überblick — Überblick gibt die Karte besser.** Das Ziel ist Verstehen-Abschließen: Der Nutzer verlässt die Lectio mit einem geschlossenen Bogen, einer Spannung, die er jetzt *trägt*.

### Verhältnis zur Tableau-Karte

Lectio ist komplementär, nicht konkurrierend:

- **Karte** — räumlich, explorativ, vollständig, selbstgesteuert
- **Lectio** — temporal, geführt, selektiv, kuratorisch

Eine Lectio durch ein Tableau mit 15 Denkern führt typischerweise durch 4–8 davon. Die anderen bleiben in der Karte erreichbar. Lectio ist die kuratierte Route, nicht der vollständige Stadtplan.

---

## Sanctum-Vision für Lectio

Lectio ist die natürliche Form für **Verstehen-Abschließen**. Die Karte zeigt das Big Picture — gut für Verstehen. Die Lectio führt durch das Big Picture — gut für Abschließen. Beide gehören zusammen.

Lectio ist außerdem der erste Schritt zu Kopf-Herz-Bauch: Sie kann *zur* Fühlen-Schicht hinführen — durch die Schlussfrage, die den Bogen kognitiv schließt und emotional öffnet. Sie kann diese Schicht aber nicht erzwingen. Die Schlussfrage öffnet die Tür; was dahinter passiert, gehört dem Nutzer.

---

## Zehn methodische Entscheidungen

### 1. Eigene Landung — keine Leihgabe

Jede Lectio hat eine eigene `closing_synthesis` (2–3 Sätze). Sie ist **nicht** der Tableau-Synthese-Text, der auf L5 erscheint.

**Begründung:** Verschiedene Lectios durch dasselbe Tableau handeln von verschiedenen Pfaden — sie müssen unterschiedlich landen. Außerdem sind alle anderen Lectio-Texte (Intro, Übergänge) kuratorisch eigenständig. Die Landung darf keine Ausnahme sein.

**Konvention:** Die `closing_synthesis` nennt nur Denker, die im Pfad vorkamen. Kein Knoten taucht in der Landung auf, den die Tour nicht besucht hat.

---

### 2. Knoten-Doppelung erlaubt

Ein Pfad-Schritt kann einen oder mehrere Knoten enthalten. `nodeId` kann ein String (ein Knoten) oder ein Array (mehrere Knoten als eine Station) sein.

**Begründung:** Manche Denker gehören als Paar zusammen — Ryle + Wittgenstein, Chalmers + Jackson. Die Methode erzwingt kein 1:1-Verhältnis zwischen Station und Knoten.

**Konvention:** Knoten-Arrays bei einer Station nur verwenden, wenn die Denker dieselbe Funktion im Bogen haben. Nicht als Abkürzung, um zwei Stationen zu sparen.

**Gegenkonvention:** Doppelstationen werden *vermieden*, wo der Bruch zwischen den Positionen der lehrende Moment ist. Vedanta und Buddhismus teilen die kontemplative Tradition, aber ihre Antagonie ist der zentrale didaktische Punkt — sie gehören als getrennte Stationen, nicht als Paar.

---

### 3. Pfad, nicht Tableau — Selektivität als Stärke

Eine Lectio behandelt immer einen **Pfad durch ein Tableau**, nicht das Tableau selbst. Selektivität ist keine Limitation — sie ist die kuratorische Aussage.

**Konvention für Titel und Focus:** Der Titel benennt den Pfad, nicht das Tableau. "Warum das Rätsel nicht verschwindet" ist eine Hard-Problem-Lectio, keine Geist-Lectio. Das `focus`-Feld beschreibt in einem Halbsatz, welchen Ausschnitt diese Lectio behandelt — für den Nutzer zur Orientierung, für den Kurator zur Disziplin.

**Konvention für Vollständigkeit:** Wenn ein Tableau mehrere Stränge hat (Beispiel: Geist hat Hard-Problem-Strang und Enaktivismus-Strang), gehören diese in separate Lectios — nicht in eine aufgeblähte Tour. Fehlende Stränge müssen nicht entschuldigt werden. Der Titel und das `focus`-Feld machen den Ausschnitt transparent.

---

### 4. Eigene Knoten-Stimme — `lectio_brief` als dichter Anker

Im Lesefluss stehen zwei Textsorten nebeneinander:

- **`lectio_brief`-Texte** (eigenes Feld pro Knoten): dichte 2–3-Satz-Stimme des Denkers, atmosphärisch, in sich stehend
- **Übergangstexte** (neu für die Lectio): du-orientiert, kuratorisch bewertend, 1–3 Sätze

Beide werden im Lectio-Kontext gezeigt. Die Lectio-Stimme bewertet und überleitet; der `lectio_brief` sagt, was der Denker meint, ohne ihn ausführlich zu erklären.

**Schema-Erweiterung:** Knoten (Denker, Konzepte, Schulen) bekommen ein optionales Feld `lectio_brief` neben `versions`. Wenn vorhanden, wird es im Lectio-Modus gezeigt — unabhängig von der `level`-Wahl der Lectio. Wenn nicht vorhanden, greift die alte Fallback-Regel auf `versions` (siehe Punkt 5).

```json
{
  "id": "vedanta",
  "name": "Vedanta",
  "versions": { "1": "...", "3": "..." },
  "lectio_brief": "Hinter allem, was in dir geschieht — Gedanken, Gefühle, Erinnerungen — liegt ein stiller Zeuge, der das alles bemerkt. Dieser Zeuge ist unveränderlich, unzerstörbar und identisch mit dem Grund aller Wirklichkeit. Du musst ihn nicht herstellen. Du musst ihn wiederfinden."
}
```

**Schreib-Disziplin für `lectio_brief`:**
- **Dicht, nicht didaktisch.** Sagt, was der Denker meint, nicht wie das Argument funktioniert.
- **Anschlussfähig an die Lectio-Stimme.** Lässt Raum für die kuratorische Bewertung danach.
- **2–3 Sätze, mit Pointe.** Klare Position, dichter Kern am Ende.
- **Keine Annotationen.** Kein `[[Begriff:Erklärung]]` — wer in der Lectio liest, soll lesen, nicht recherchieren. Fachbegriffe (Atman, Anatta, Ego-Tunnel) werden durch Kontext oder Lectio-Stimme erschlossen.

**Konvention für Übergangstexte:** Immer du-Ton. Immer kuratorisch bewertet — keine Wiederholung des `lectio_brief`, sondern Bewertung *und* Brücke zum nächsten Knoten.

---

### 4.1 Methodische Revision — warum diese Lösung statt der ursprünglichen

In v1 stand hier die Entscheidung A: Stilbruch zwischen Lectio-Stimme und Tableau-Knoten-Text wird typografisch markiert, aber inhaltlich akzeptiert. Optionen B (selektive Neu-Texte) und C (`summary_lectio`-Feld) wurden mit Pflegeaufwand bzw. Schema-Komplikation begründet verworfen.

**Diese Begründung war falsch.** Beim Live-Test des Selbst-Skripts auf `level: 3` zeigte sich: Die Tableau-Knoten-Texte sind ausführliche Lehrtexte (5–7 Sätze, akademisch). Sie sagen schon vollständig, was die Lectio-Stimme dann kuratorisch wiederholt. Das produziert **Redundanz**, nicht **Stilbruch**. Die Lectio-Stimme wird zur Paraphrase des Knoten-Texts, statt zur eigenständigen Bewertung.

Das `lectio_brief`-Feld löst das: Der Brief ist atmosphärisch und dicht (kein Lehrtext), die Lectio-Stimme bewertet und überleitet (kein Erklärtext). Zwei Funktionen, keine zwei Wahrheiten.

**Pflegeaufwand:** 20–25 Briefs über die geplanten vier Lectios — einmaliger Aufwand, beim Lectio-Bau mit eingeplant. Bei späteren Tableaus mit Lectio-Vorausschau (Existenzialismus etc.) werden Briefs gleich beim Knoten mitgeschrieben.

**Methodische Folge:** Lectio ist nicht mehr rein auf Tableau-Daten aufgesetzt — sie definiert die Knoten teilweise mit. Das ist eine Verschiebung, aber eine ehrliche: Die Knoten bekommen damit zwei legitime Funktionen, nicht zwei konkurrierende Stimmen.

---

### 5. `level`-Semantik — Fallback, nicht Default

`level` in einer Lectio kommt nur dann zum Tragen, wenn ein Knoten **kein `lectio_brief`** hat. In dem Fall wird der `versions`-Text dieser Stufe gezeigt (analog zur Tableau-Logik).

Bei Knoten **mit** `lectio_brief` wird dieser unabhängig von `level` gezeigt — das ist der Default-Fall für gut gepflegte Lectios.

**Fallback-Regel:** Wenn weder `lectio_brief` noch ein Text auf der Lectio-`level`-Stufe existiert, wird der Text der **niedrigsten verfügbaren Stufe ≥ firstLevel** gezeigt. Metzinger in einer L2-Lectio ohne `lectio_brief` zeigt den L5-Text — seinen einzigen.

**`level` als Anspruchsindikator für den Nutzer:** Auch wenn `lectio_brief` den Lese-Text liefert, signalisiert `level` weiterhin die kognitive Anspruchsstufe der Lectio insgesamt — L2 ist Grundlagen, L3 Vertiefung. Das hilft dem Nutzer bei der Entscheidung, welche Lectio zu ihm passt.

---

### 6. `closing_question` ist Lectio-eigen

Die Schlussfrage gehört zur Lectio, nicht zum Tableau. Sie ist auf den spezifischen Pfad und seine These gemünzt — eine andere Lectio durch dasselbe Tableau hat eine andere Schlussfrage.

**Schema-Konsequenz:** `closing_question` ist ein eigenständiges Feld auf dem Lectio-Objekt — nicht der letzte Eintrag im `path`-Array. Das macht strukturell klar: keine Knoten-ID, keine Station, sondern Lectio-Abschluss.

**Funktion der Schlussfrage:** Sie schließt den Bogen kognitiv und öffnet ihn emotional. Sie ist die erste Geste Richtung Fühlen — eine persönliche Frage, die den philosophischen Inhalt ins eigene Leben bringt. Sie fordert keine Antwort. Sie öffnet einen Raum.

**Konvention Kopf-Herz-Bauch:** Wenn die Lectio die Bewegung Verstehen → Fühlen → Handeln trägt, lebt sie in den Übergangstexten und der Schlussfrage — nicht im Schema. Kein `resonance`-Tag, keine Pflicht-Markierung. Die Bewegung ist eine Stimm-Eigenschaft der Lectio, keine Datenstruktur. Frühe Übergänge dürfen analytisch sein, spätere körperlich, die Schlussfrage persönlich. Aber nicht jede Lectio muss diese Bewegung machen — manche bleiben ganz im Kopf, manche starten direkt im Bauch.

**Konvention Zirkel-Signatur:** Wenn die Intro einen körperlichen oder erfahrungsnahen Anker setzt (Zeh stoßen, Atem, Innehalten), gewinnt die Schlussfrage durch Rückkehr zu diesem Anker — derselbe Ort, aber nach dem Pfad. Hard Problem: Zeh am Anfang, Zeh am Ende. Atman/Anatta: Beobachten am Anfang, Beobachten am Ende. Das ist nicht Pflicht — aber wenn der Anker es trägt, schließt sich die Lectio von selbst.

---

### 7. Pacing — Verweilen ermöglichen, nicht erzwingen

Lectio divina, der Namensgeber, hat als Kern den Aufenthalt zwischen den Schritten. Sanctum-Lectio kann diese Tiefe nicht erzwingen — aber sie kann sie ermöglichen oder verhindern.

**Schema-Konsequenz:** Kein `pause_after`-Feld. Das ist eine Frontend-Entscheidung, keine Content-Entscheidung.

**Frontend-Anforderung (nicht im JSON):** Zwischen Übergangstext und nächstem Schritt gibt es eine explizite Weiter-Schwelle. Kein automatisches Weiterscrollen. Der Button-Text signalisiert: *"Bereit für den nächsten Gedanken?"* — nicht "Weiter". Das ist der minimale Hinweis auf Verweilen, ohne es aufzuzwingen.

---

### 8. Knoten-Typen — Denker, Konzepte, Schulen

Lectio-Stationen können Denker (`thinker`), Konzepte (`concept`) oder Schulen (`school`) sein. Das `nodeType`-Feld bestimmt, welcher Datensatz gezogen wird — alle drei haben `versions`-Felder mit Stufen-Texten, auf die die Fallback-Regel (Punkt 5) anwendbar ist.

**Konzepte als Stationen:** Erlaubt, aber mit Einschränkung. Konzepte erscheinen im Tableau immer im Zusammenhang mit Denkern — ohne diesen Kontext kann ein Konzept-Knoten früh in der Lectio orientierungslos wirken.

**Best Practice:** Konzepte als Stationen erst *nach* mindestens einem Denker einsetzen, der den Begriff eingeführt hat. Cogito als Station funktioniert nach Descartes, nicht als Einstieg. Qualia als Station funktioniert nach Nagel oder Chalmers, nicht davor.

**Schulen als Stationen:** Selten sinnvoll. Schul-Texte beschreiben eine Tradition, keine Argumentation. Lectio braucht Argumente, keine Etiketten. Schulen bleiben besser als Hintergrundwissen in der Karte.

**`nodeType`-Werte:** `"thinker"` | `"concept"` | `"school"`

---

### 9. Pfad-Typen — narrativ oder konfrontativ

Lectios können nach zwei Mustern aufgebaut sein:

**Narrativ-historisch:** Stationen lösen sich chronologisch ab, jede antwortet auf die vorige. Descartes → Sprachkritik → Nagel → Chalmers → Dennett → Metzinger. Der Bogen entsteht aus der historischen Entfaltung des Problems.
**Risiko:** Vereinfachung historischer Komplexität — die Stationen werden zu Etappen eines linearen Fortschritts gepresst, der so nicht stattgefunden hat.

**Konkurrierend-konfrontativ:** Stationen sind gleichzeitige Antworten auf dieselbe Frage. Vedanta vs. Buddhismus vs. Metzinger vs. Jung — keine Ablösung, sondern Konfrontation. Der Bogen entsteht aus der Spannung zwischen den Positionen.
**Risiko:** Bogen-Zwang. Wenn alle Stationen dieselbe Frage beantworten, entsteht Druck, sie in einen abschließenden Bogen zu pressen — und manche Stimmen werden dabei gebogen, in eine Vermittler-Rolle gedrängt oder mit einer Funktion belegt, die nicht ihre eigene ist.

**Emotional-kumulativ:** Stationen lösen sich nicht historisch ab und antworten sich nicht konkurrierend — sie kumulieren in einer emotionalen Bewegung. Jede Station nimmt die emotionale Lage der vorigen mit und vertieft oder kehrt sie um. Beispiel: Schwindel-Lectio durch Realismus (Aristoteles als Festigkeit, Berkeley als erster Riss, Kant als Rettung mit Verlust, Kuhn als Radikalisierung, Rorty als Schwindel-Mitte, Gabriel als Rückkehr ohne Naivität).
**Risiko:** Wenn die kumulative Bewegung dramatisch erzählt wird, kann die Lectio einzelne Positionen als bloße Stadien einer Reise behandeln, statt sie in ihrer Eigenständigkeit zu respektieren. Berkeley als "Stachel für Kant" zu behandeln verkürzt ihn. Jede Station verdient eigene Würdigung, auch wenn sie im Bogen eine bestimmte Funktion erfüllt.
**Konvention:** In emotional-kumulativen Lectios trägt jeder Übergang einen kleinen Schwindel-Indikator — sonst verflacht der Bogen zur historischen Aufzählung. Sätze wie "Was bleibt dann sicher?" nach Kuhn oder "Wie soll man dann noch handeln?" nach Rorty halten die emotionale Bewegung wach.

**Variante: destruktiv-aufbauend.** Eine Unterform des emotional-kumulativen Pfad-Typs, bei der die ersten Stationen das Fundament demontieren und eine letzte Station nicht in Reife landet, sondern in einem qualitativ anderen Zugang. Beispiel: Ethik-Lectio durch die Begründungs-Frage (Kant baut Fundament aus Vernunft, Hume zeigt Gefühl darunter, Nietzsche zeigt Genealogie darunter, Levinas gibt die Suche auf und beschreibt etwas vor der Begründung).
**Besonderes Risiko:** Wenn die letzte Station eine attraktive "Lösung" anbietet, kann die Lectio sie als finale Antwort markieren — und damit die Frage schließen, die sie eigentlich öffnen sollte. Siehe Punkt 10: Offener Ausgang.

**Konvention Wortmotiv:** Über die punktuellen Indikatoren hinaus trägt der Bogen einen wiederkehrenden Wortteppich — Bilder, die sich durch Intro, Übergänge und Schlussfrage ziehen. Bei der Schwindel-Lectio: *verrutschen*, *wackeln*, *Selbstverständlichkeit*, *Schwindel*. Das Motiv wird nicht überstrapaziert, aber es kehrt wieder. So spürt der Leser am Ende, dass die Lectio den Titel eingelöst hat — der Schwindel ist nicht nur Thema, sondern Textur.

**Konvention für konfrontative Lectios:** Lass jede Stimme ihre eigene Position einnehmen, nicht eine Funktion im Bogen erfüllen. Die Closing Synthesis darf vier Antworten nennen, ohne sie in drei zusammenzudrängen, weil das didaktisch glatter klingt. Auch wenn der Bogen nicht *sauber* schließt — das ist ehrlicher als eine gebogene Position.

**Hinweis zur Pfad-Länge in konfrontativen Lectios:** Hier ist die Antagonismus-Asymmetrie aus den Größen-Richtwerten besonders relevant — 4 Stationen können vollständig sein, jede weitere verwässert die Konfrontation.

**Methodische Klarstellung 1 — Pfad-Typ-Destillation:** Pfad-Typen entstehen *nach* überraschenden Lectios, nicht *beim* Bau. Wenn ein Bau das vorhandene Vokabular nicht braucht, ist das ein Signal — kein Defizit. Wenn ein Bau wirklich etwas Neues tut, wird der Typ nach dem Bau destilliert, nicht vorab postuliert. Nur ein belegter Fall rechtfertigt noch keinen neuen Typ — erst der zweite, unabhängige Fall sichert die Destillation. Auslöser: Existenzialismus-Bau (25.5.26) versuchte vorab Typ „existenziell-zugespitzt" zu postulieren — nach Prüfung zurückgezogen.

**Methodische Klarstellung 2 — narrativ-historisch ≠ chronologisch streng:** Narrativ-historische Pfade dürfen historisch leicht versetzt sein (Beispiel: Nietzsche vor Kierkegaard im Existenzialismus-Pfad), wenn zwei Bedingungen erfüllt sind: (a) die phänomenologische Reihenfolge trägt besser als die historische, (b) der Übergangstext macht die Versetzung explizit. Die Lectio ist ein Bogen, kein Geschichtsbuch.

**Methodische Klarstellung 3 — Reserve-Briefs dokumentieren:** `lectio_brief`-Felder dürfen vorausschauend für Stationen künftiger Lectios geschrieben werden (Reserve-Briefs), wenn (a) das Material trägt, (b) die künftige Lectio im Backlog steht, (c) der Reserve-Brief in der Begleitnotiz explizit als solcher benannt wird. Nicht dokumentierte Reserve-Briefs sind unsichtbare Schulden.

---

### 10. Offener Ausgang — Sanctum verkündet keine Wahrheit

Eine Sanctum-Lectio darf eine Haltung haben, aber keine Wahrheit verkünden. Die kuratorisch stärkste Position darf spürbar sein — aber sie darf nicht als finale Antwort markiert werden.

**Begründung:** Sanctum ist eine Bibliothek, kein Verkündungs-Raum. Der Leser muss am Ende einer Lectio eigene Gedanken haben dürfen, die nicht vorweggenommen sind. Wenn die Closing Synthesis eine These formuliert, statt eine Möglichkeit zu zeigen, wird die Lectio zur Predigt. Der Leser hat dann nichts mehr zu tun, außer zuzustimmen oder zu widersprechen — beides ist falsch, weil beides die Frage schließt.

**Praktische Folgen:**

- **Closing Synthesis ist Beobachtung, keine Lösung.** Sätze wie "Ethik beginnt vor der Begründung" sind philosophische Thesen — sie gehören nicht in die Lectio-Stimme. Erlaubt ist: "Es ist die Frage, ob die Begründungs-Suche der richtige Weg war." Verboten ist: "Ethik beginnt nicht in Begründungen."
- **Phänomenologische statt ontologische Formulierungen.** Beschreibe, was passiert (*"Ein Denker beobachtet, was schon geschehen war..."*), nicht was ist (*"Ethik ist..."*). Beschreibung lässt offen, Behauptung schließt.
- **Schlussfrage öffnet, sie schließt nicht.** Eine echte Frage hat mehrere mögliche Antworten und drängt den Leser nicht in eine. *"Hattest du dafür einen Grund?"* ist offen. *"Warst du nicht schon angesprochen, bevor du fragtest?"* ist eine Suggestiv-Frage und damit verschlossen.
- **Die kuratorisch stärkste Position darf gezeigt werden** — als Möglichkeit, nicht als Antwort. Die Formulierung *"Du musst nicht zustimmen. Aber du hast die Möglichkeit gesehen"* ist die Haltung dieser Konvention in einem Satz.

**Wo diese Konvention besonders wichtig wird:** Bei der destruktiv-aufbauenden Variante (Punkt 9), wo die letzte Station eine attraktive Alternative zu den demontierten Positionen bietet. Hier ist die Versuchung zur Lösung am größten. Auch bei Lectios mit einer ausgeprägten kuratorischen Stimme, die eine Position überzeugend findet — der Architekt schreibt überzeugend, der Inquisitor muss prüfen, ob das Überzeugen zur Vorgabe wird.

**Wann diese Konvention nicht greift:** Bei den anderen Pfad-Typen (narrativ-historisch, konkurrierend-konfrontativ, emotional-kumulativ ohne destruktiv-aufbauend) ist die Versuchung zur Lösung typischerweise geringer, weil das Material selbst Spannung trägt. Aber die Konvention gilt auch dort — Geist, Selbst und Realismus haben sie zufällig erfüllt, weil ihre Themen sich nicht leicht lösen lassen. Bei Ethik wurde sie sichtbar, weil Levinas eine Lösung anbietet.

---

### 10.1 `closing_kernel` — Schreib-Disziplin

Der `closing_kernel` ist Punkt 10, sichtbar gemacht: Das Frontend hebt genau diesen Teilstring im letzten Absatz der `closing_synthesis` hervor. Das macht die Wahl konsequenzreich — der hervorgehobene Satz bekommt mehr Gewicht als der Rest der Synthese.

**Grundregel:** Wähle den Satz, der die Frage am weitesten offen hält, nicht den, der die meiste Deutung liefert. Der `closing_kernel` hebt die offene Haltung hervor, nie die Deutung.

**Belegte Fehlerformen:**

**(1) Kein Satz, der eine Position krönt.** Hervorgehoben macht er aus gleichberechtigten Stimmen heimlich eine Antwort. — Beleg: „Wer bist du wenn du alles weglässt", verworfener Kandidat B: *„deine eigene Antwort, die du längst in dir trägst"* legt dem Leser eine Gewissheit in den Mund, die die konfrontativ-gleichberechtigte Synthese nicht trägt.

**(2) Kein Satz, der eine beiläufige These der Synthese ausstellt.** Ein Satz, der im Fließtext nur als Beobachtung tragbar war, kippt hervorgehoben in Verkündung. — Beleg: „Vom Wissen zum Glauben", verworfener Kandidat C: *„auffällig, wohin sie zeigen"* macht die Gruppierung hervorgehoben zur Pointe.

**Tendenz (ein Fall, noch kein Kanon):** Der stärkste `closing_kernel` ist die spezifischste offene Beobachtung, die dieser Pfad erlaubt — nicht die allgemeinste Erlaubnis, die jede Lectio teilen könnte. Offen — bestätigt oder verworfen durch den nächsten Fall.

---

## Das Lectio-Schema

```json
{
  "id": "lectio-id",
  "tableauId": "tableau-id",
  "title": "Titel des Pfades — benennt den Pfad, nicht das Tableau",
  "focus": "Kurzer Halbsatz zum kuratorischen Ausschnitt",
  "thesis": "Ein Satz — worum es in dieser Lectio wirklich geht",
  "path_type": "narrativ-historisch",
  "ton": "expositorisch",
  "level": 2,
  "estimated_minutes": 15,
  "intro": "Kuratorischer Einstieg, du-Ton, 3–5 Sätze. Benennt die Frage, die die Lectio trägt.",

  "path": [
    {
      "nodeId": "knoten-id",
      "nodeType": "thinker",
      "transition": "Übergangstext nach diesem Schritt. Du-Ton, kuratorisch bewertet, 1–3 Sätze.",
      "step_brief": "Optionaler Text, der den Knoten-Text NUR für diese Station überschreibt. Nur für Einzelknoten. Annotationsfrei."
    },
    {
      "nodeId": ["knoten-id-a", "knoten-id-b"],
      "nodeType": "thinker",
      "transition": "Übergang nach der Doppelstation."
    }
  ],

  "closing_synthesis": "3–5 Sätze. Lectio-eigene Landung — keine Leihgabe aus dem Tableau. Nennt nur Knoten aus dem Pfad.",

  "closing_kernel": "Optionaler Teilstring des letzten Absatzes der closing_synthesis — wird im Frontend hervorgehoben. Schreib-Disziplin: Punkt 10.1.",

  "closing_question": "Die Schlussfrage. Öffnet emotional, was kognitiv geschlossen wurde. Keine Antwort erwartet."
}
```

**`path_type`-Werte:** `"narrativ-historisch"` | `"konkurrierend-konfrontativ"` | `"emotional-kumulativ"` | `"destruktiv-aufbauend"` | `"kontemplativ-vertiefend"` (Datenwert, noch nicht kanonisierter Methoden-Typ — wartet auf zweiten, unabhängigen Fall; sobald ein zweiter kontemplativ-vertiefender Bau vorliegt, wird dieser Typ in Punkt 9 als vollständige Methoden-Konvention aufgenommen und die Warnung hier entfernt).

**`ton`-Werte:** `"expositorisch"` (Default, wenn Feld fehlt) | `"erzählend-erfahrend"` (in Validierung — erster Fall: `wer-bist-du-wenn-du-alles-weglaesst`; eigene Render-Komponente `LectioNarrativeViewer`, eigenes `narrative`-Interface pro Station; Kanonisierung nach Partnerin-Test).

**`step_brief`:** Überschreibt den Knoten-Text *nur für diese eine Station* — ermöglicht Ein-Werk-Lectios (derselbe Knoten an mehreren Stationen mit verschiedenem Text). Engine-Priorität: `step_brief` → `lectio_brief` → `versions[level]` → Fallback. Nur für Einzelknoten, nicht für Doppelstationen.

---

## Größen und Richtwerte

| Parameter | Richtwert | Pilot-Befund |
|---|---|---|
| Knoten im Pfad | 4–8 (4 bei Antagonismus-Lectios) | 6 / 4 ✓ |
| Lesezeit | 12–20 Minuten | ~15 Min. ✓ |
| Lectios pro Tableau | 1–3 (je nach Strängen) | — |
| Intro-Länge | 3–5 Sätze | 5 Sätze ✓ |
| Übergang-Länge | 1–3 Sätze | 1–2 Sätze ✓ |
| Closing Synthesis | 3–5 Sätze | 5 Sätze ✓ |

**Hinweis zu Intro und Closing Synthesis:** Diese beiden Texte tragen strukturell mehr als Übergänge — Intro eröffnet den Rahmen, Closing Synthesis schließt ihn. Sie dürfen länger sein als Übergänge. 3–5 Sätze ist der ehrliche Richtwert, geerdet am Pilot.

**Hinweis zur Pfad-Länge:** Antagonismus-Lectios mit hoher Spannungsdichte (z.B. Atman vs. Anatta) können mit 4 Stationen vollständig sein. Jeder zusätzliche Knoten verwässert dann die Konzentration, statt sie zu erweitern. Qualität vor Quantität: Wenn der Bogen mit weniger trägt, ist weniger besser.

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

## Verhältnis zu anderen Prompts

- `mild-mode.md` — Tableau-Bau. Lectio baut *auf* Tableau-Datensätzen auf, folgt aber eigenen Regeln.
- `hard-mode.md` — Tableau-Bau für akademisch sensible Themen. Lectio ist immer mild — kein Hard-Mode-Äquivalent.
- `bibliothek-architektur.md` — Sammlungs-Architektur. Lectio ist ein Zugangs-Modus, kein neues Tableau-Format.

---

## Versionsgeschichte

- **v1 (Mai 2026):** Sieben methodische Entscheidungen auf Basis des ersten Pilot-Skripts (Hard Problem / Philosophie des Geistes). Schema daraus abgeleitet.
- **v1.1 (Mai 2026):** Drei Nachbesserungen nach externer Challenge: Punkt 4 mit verworfenen Alternativen B/C explizit begründet; Punkt 8 (Knoten-Typen) neu; Größen-Richtwerte am Pilot geerdet.
- **v1.2 (Mai 2026):** Kopf-Herz-Bauch-Bewegung als Stimm-Konvention bei Punkt 6 ergänzt — bewusste Entscheidung gegen ein `resonance`-Schema-Feld, weil die Bewegung in der Stimme lebt, nicht in Tags. Pilot-Skript: Intro auf Zeh-Anker umgestellt, Descartes-Übergang mit Ryle-Brücke geschärft, Closing Question schließt den Bogen zum Zeh zurück.
- **v1.3 (Mai 2026):** Zwei methodische Befunde aus dem zweiten Skript (Selbst-Tableau, Atman vs. Anatta): Zirkel-Signatur als Konvention bei Punkt 6 (Intro-Anker kehrt in Schlussfrage zurück); Pfad-Länge auf 4–8 erweitert, mit explizitem Antagonismus-Hinweis (weniger ist besser bei hoher Spannungsdichte).
- **v1.4 (Mai 2026):** Nach zweiter Challenge des zweiten Skripts: Punkt 9 (Pfad-Typen narrativ vs. konfrontativ) neu, mit Bogen-Zwang-Warnung; Punkt 2 um Gegenkonvention zur Doppelstation-Vermeidung bei Bruchstellen ergänzt. Selbst-Skript: `focus`-Feld spezifischer, Jung-Übergang und Closing Synthesis neu — Jung steht jetzt als eigenständige psychologische Position, nicht als Vermittler.
- **v1.5 (Mai 2026):** Methodische Revision von Punkt 4 nach Live-Test der Selbst-Lectio. Tableau-Knoten-Texte erzeugen mit der Lectio-Stimme Redundanz, nicht Stilbruch — Lectio-Stimme paraphrasiert den Knoten-Text. Lösung: neues Feld `lectio_brief` (2–3 Sätze, atmosphärisch, dicht) als eigene Knoten-Stimme im Lectio-Modus. Punkt 5 entsprechend angepasst (`level` wird Fallback statt Default). Sektion 4.1 dokumentiert die Revision explizit.
- **v1.6 (Mai 2026):** Dritter Pfad-Typ aus dem Realismus-Skript: emotional-kumulativ. Stationen kumulieren in einer emotionalen Bewegung (Festigkeit → Erschütterung → Schwindel → Reife), nicht in Argumentation oder Konfrontation. Punkt 9 entsprechend erweitert, mit Konvention zum Schwindel-Indikator in jedem Übergang. Realismus-Skript: vier Übergänge nachgezogen (Berkeley respektvoller, Kuhn mit Schwindel-Indikator, Rorty mit Vokabular-Erfahrung, Closing Synthesis mit klarem Adressaten).
- **v1.7 (Mai 2026):** Konvention Wortmotiv ergänzt (Gemini-Impuls): emotional-kumulative Lectios tragen einen wiederkehrenden Wortteppich durch den ganzen Bogen, der den Titel als Textur einlöst. Realismus-Skript: Closing Question um Bild "im Schwindel zu stehen" geschärft.
- **v1.11 (Jun 2026):** Punkt 10.1 `closing_kernel` — Schreib-Disziplin ergänzt. Zwei unabhängige Baufälle belegten die Lücke: Anleitung hatte nur die Mechanik (Substring-Validierung), keine Wahl-Regel. Grundregel: offene Haltung hervorheben, nie die Deutung. Zwei belegte Fehlerformen dokumentiert (krönende Position, beiläufige These). Tendenz (ein Fall) notiert. `closing_kernel` neu im Schema-Block.
- **v1.10 (Mai 2026):** Vier Zuflüsse aus der Bauserie Mai 2026. (1) Punkt 9 um drei methodische Klarstellungen erweitert: Pfad-Typ-Destillation (Typen entstehen nach, nicht vor dem Bau; Auslöser: Existenzialismus), narrativ-historisch ≠ chronologisch streng (leichte Versetzung erlaubt, wenn im Übergang explizit), Reserve-Brief-Dokumentation (vorausschauende lectio_briefs nur mit Begleitnotiz-Eintrag). (2) Schema um `path_type`, `ton`, `step_brief` ergänzt und kanonisiert. (3) `ton: 'erzählend-erfahrend'` als neue Lectio-Dimension eingeführt — erster Fall `wer-bist-du-wenn-du-alles-weglaesst`, eigene Render-Komponente, in Validierung (Partnerin-Test ausstehend). (4) `kontemplativ-vertiefend` als Datenwert dokumentiert — methodisch noch nicht kanonisiert, wartet auf 2. Fall.
- **v1.9 (Mai 2026):** Kanon-Block „Tableau / Lectio / Lebensfrage — die drei Formen" aufgenommen (wortgleich in `bibliothek-architektur.md` und `mild-mode.md`). Stellt klar: Lectio ist Tiefe *in einem* Feld und wohnt im Tableau; Lebensfrage ist Breite *über* Felder und wohnt neben der Bibliothek. Bau-Regel ergänzt: Lectio überschreitet nie Tableau-Grenzen.
- **v1.8 (Mai 2026):** Vierte Schicht aus der Ethik-Lectio. Punkt 9 um Variante "destruktiv-aufbauend" erweitert (Stationen demontieren das Fundament, letzte Station bietet qualitativ anderen Zugang). Punkt 10 neu: Offener Ausgang — Sanctum verkündet keine Wahrheit, kuratorisch stärkste Position darf spürbar sein, aber nicht als finale Antwort markiert werden. Phänomenologische statt ontologische Formulierungen. Diese Konvention betrifft alle Pfad-Typen, wurde aber bei Ethik sichtbar, weil Levinas eine attraktive Lösung anbietet. Ethik-Skript entsprechend an drei Stellen geöffnet: Thesis, Intro, Closing Synthesis.
