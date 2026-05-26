# Begleitnotiz — Selbst-Lectio 2: "Findest du dein Selbst oder machst du es?"

**Datum:** 23.5.26
**Tableau:** Die Landkarte des Selbst
**Status:** Erster Wurf fertig, Prüfung steht aus

---

## 1. Anker

**Reaktiv gewachsen.** Auslöser war Moniques Feedback zur ersten Selbst-Lectio "Wer beobachtet, wenn du beobachtest?" — Adler fehle als psychologische Stimme. Eigene Beobachtung beim Bau: Die erste Lectio ist spirituell-philosophisch (Vedanta-Anatta-Jung-Metzinger). Adler passt dort tatsächlich nicht hin. Die zweite Lectio nimmt den psychologischen Bogen ernst.

**Anker-Frage:** *"Findest du dein Selbst — oder machst du es?"* — eine Genese-Frage, klar unterscheidbar von der ersten (phänomenologisch). Verbindet sich subtil mit der Frankl-Sartre-Streitstelle aus dem Existenzialismus, ohne sie zu wiederholen (Gegenstand ist Selbst, nicht Sinn).

---

## 2. Stationen-Auswahl

**Fünf Stationen, dialektischer Bogen Bogen C:**

1. **Jung** — der Tiefenkern (Substanz-Pol)
2. **Adler** — schöpferische Antwort (erste Verschiebung)
3. **Kohut** — relationale Konstitution (zweite Verschiebung)
4. **IFS** — Kern mit Vielfalt (dialektische Rückwendung)
5. **Hood** — evolutionäre Konstruktion (Konstrukt-Pol)

**Auswahl-Begründung:**
- **Jung** als Eröffnung — die psychologische Position des gefundenen Tiefenkerns, klare Substanz-Position.
- **Adler** unmittelbar danach — er verschiebt den Kern-Begriff vom Statischen ins Bewegte, ohne ihn ganz aufzulösen. Erste Verschiebung. Vorform des Existenzialismus.
- **Kohut** vertieft die Bewegung — Selbst aus Spiegelung, relationale Konstitution. Zweite Verschiebung.
- **IFS** ist die *dialektische Wendung* — nach drei Stationen, die den Kern zunehmend relativieren, kommt eine Position, die den Kern wieder behauptet, aber radikal anders (mit Vielfalt). Das ist nicht ein vierter linearer Schritt, sondern eine Differenzierung des bisherigen Bogens.
- **Hood** als Konstrukt-Pol — die Lectio endet nicht versöhnlich, sondern offen. Hood ist die zugänglichste Konstruktivistin-Position des Tableaus (Metzinger wäre philosophisch schärfer, aber er sitzt schon in der ersten Lectio).

**Nicht aufgenommen, mit Begründung:**
- **Metzinger** — sitzt in der ersten Lectio. Doppelung würde das Verhältnis der beiden Lectios verwässern. Hood übernimmt die Konstrukt-Position hier mit eigenem Profil (evolutionär-empirisch statt phänomenologisch).
- **Rogers** — humanistisch-organische Position, weder klar Tiefe noch Konstrukt. Passt nicht in den Spannungsbogen.
- **Friston, Barrett** — beide nahe an Hood/Metzinger, würden den Konstrukt-Pol verbreitern, ohne neue Position. Bei Bedarf für spätere Lectio.
- **Vedanta, Buddhismus, Rohr, Almaas** — spirituell-philosophisch, gehören in die erste Lectio.

---

## 3. Pfad-Typ-Beobachtung

Die Lectio hat einen **dialektischen Bogen** — nicht ein monotones Verschieben von Pol zu Pol, sondern eine Bewegung mit Wendung (IFS dreht zurück Richtung Substanz, bevor Hood den Konstrukt-Pol einlöst).

Das ist möglicherweise ein **neuer Pfad-Typ**, der sich beim Bau destilliert hat. Vorläufiger Name: **"dialektisch-revidierend"** oder **"spannungs-mit-rückwendung"**. Bewusst noch nicht in `lectio-mode.md` aufgenommen — Disziplin: nicht *postulieren*, sondern *destillieren*. Bei zwei weiteren Anwendungen dieses Pfad-Typs entscheiden, ob er als Konvention aufgenommen wird.

Zum Vergleich:
- **narrativ-historisch** (Existenzialismus): chronologische Bewegung, Stationen folgen historisch
- **destruktiv-aufbauend** (Ethik): erst Boden zerstören, dann Alternativen
- **dialektisch-revidierend** (Selbst 2, hier): Bewegung mit Wendung, Position wird neu gedacht statt nur kontrastiert

---

## 4. Datenmodell-Beobachtung — Briefs in Lectio-Stationen

**Problem aufgetaucht beim Bau:** Jung kommt in beiden Selbst-Lectios vor. Das bestehende Datenmodell sieht nur einen `lectio_brief` pro Knoten vor — das funktioniert bei einer Lectio pro Tableau, nicht bei mehreren.

**Hybrid-Lösung für jetzt (Vorschlag 3):** Briefs der neuen Lectio sitzen direkt in `lectio.path[].brief`, nicht im Tableau-Knoten. Die bestehenden `lectio_brief`-Felder im Existenzialismus-Tableau bleiben unangetastet.

**Ziel-Architektur (c):** Alle `lectio_brief`-Felder migrieren von `tableau.thinkers[].lectio_brief` zu `lectio.path[].brief`. Das macht Lectios autark und erlaubt beliebig viele Lectios pro Knoten. Migration ist Backlog-Item.

---

## 5. Beobachtung zum Lectio-Familien-Pattern

Mit dieser zweiten Selbst-Lectio etablieren wir ein neues Pattern: **Ein Tableau kann mehrere Lectios tragen.** Bisher hatte jedes Tableau eine Lectio.

Bedingungen, unter denen ein Tableau mehrere Lectios trägt:
- Das Material ist reich genug für mehrere ehrliche Pfade durch dieselbe Frage
- Die Pfade sind **komplementär**, nicht parallel — verschiedene Bögen, nicht verschiedene Auswahlen
- Jede Lectio hat ihren eigenen Fokus, der nicht durch eine einzige Lectio ersetzbar wäre

Das Selbst-Tableau erfüllt diese Bedingungen: Lectio 1 (spirituell-philosophisch) und Lectio 2 (psychologisch-dialektisch) traversieren dasselbe Material aus zwei verschiedenen Perspektiven, beide tragen.

**Andere Tableaus, die das könnten:**
- Existenzialismus (möglicherweise später eine "Religiöser Existenzialismus"-Lectio neben der vorhandenen)
- Ethik (Tugendethik-Lectio neben der bestehenden destruktiv-aufbauenden)
- Geist (Hard-Problem-Lectio + Konstruktivismus-Lectio?)

**Disziplin:** Nicht jedes Tableau braucht mehrere Lectios. Mehrere Lectios entstehen *aus dem Material*, nicht weil "Lectios das Pattern sind". Faustregel: Eine zweite Lectio nur dann, wenn sie aus der ersten nicht herausgeschnitten werden konnte, ohne sie zu verzerren.

---

## 6. Backlog-Items aus diesem Bau

### [ ] Lectio-Brief-Migration: von Tableau-Knoten zu Lectio-Stationen

**Status:** identifiziert 23.5.26 als Folge des Lectio-Familien-Patterns
**Kontext:** Das aktuelle Datenmodell sieht `lectio_brief` als Feld im Tableau-Knoten vor. Bei einem Knoten in mehreren Lectios funktioniert das nicht. Beim Bau der zweiten Selbst-Lectio wurde pragmatisch entschieden, Briefs direkt in `lectio.path[].brief` zu legen — neues Schema-Feld. Bestehende `lectio_brief`-Felder im Existenzialismus-Tableau bleiben vorerst unmigriert.
**Migration:**
1. Bestehende `lectio_brief`-Felder im Existenzialismus-Tableau identifizieren
2. In die zugehörige Lectio-JSON umziehen (in `path[].brief`)
3. Frontend-Rendering anpassen — Brief aus `lectio.path[i].brief` lesen, nicht aus `tableau.thinkers[].lectio_brief`
4. Konvention in `mild-mode.md` / `lectio-mode.md` aufnehmen: Briefs sitzen in der Lectio, nicht im Knoten

**Nächster Schritt:** Beim nächsten Lectio-Bau oder Repo-Refactor.

---

### [ ] Lectio-Familien-Pattern als Konvention in `lectio-mode.md`

**Status:** etabliert 23.5.26 — durch zweite Selbst-Lectio
**Konvention:** Ein Tableau kann mehrere Lectios tragen, wenn das Material mehrere komplementäre Bögen erlaubt. Bedingungen siehe Sektion 5 dieser Begleitnotiz.
**Verhältnis zur Lectio-Beschränkung:** Bisher implizit "eine Lectio pro Tableau", jetzt explizit "ein oder mehrere Lectios pro Tableau, kuratorisch begründet".
**Nächster Schritt:** Bei nächster `lectio-mode.md`-Revision aufnehmen.

---

### [ ] Pfad-Typ "dialektisch-revidierend" — beobachten

**Status:** beobachtet 23.5.26, noch nicht destilliert
**Kontext:** Die zweite Selbst-Lectio hat einen Bogen mit Wendung (Substanz → Bewegung → Beziehung → Substanz-mit-Vielfalt → Konstrukt), der nicht ganz in die bestehenden Pfad-Typen passt (narrativ-historisch, destruktiv-aufbauend, ggf. weitere). Vorläufiger Name: dialektisch-revidierend.
**Disziplin:** Nicht jetzt postulieren. Bei zwei weiteren Lectios mit ähnlichem Bogen als Pfad-Typ aufnehmen.

---

## 7. Verhältnis zur ersten Selbst-Lectio

| Aspekt | Lectio 1 "Wer beobachtet" | Lectio 2 "Findest du oder machst du" |
|---|---|---|
| Bogen | Spirituell-philosophisch | Psychologisch-dialektisch |
| Anker-Frage | Phänomenologisch (Beobachter) | Genetisch (Entstehung) |
| Stationen | Vedanta → Buddhismus → Jung → Metzinger | Jung → Adler → Kohut → IFS → Hood |
| Pol-Spannung | Atman ↔ Anatta (spirituell) | Substanz ↔ Konstrukt (psychologisch) |
| Pfad-Typ | (vermutlich destruktiv-aufbauend) | dialektisch-revidierend (provisorisch) |
| Überlapp | Jung als Schnittstelle | Jung mit anderem Brief, anderer Funktion |

Die beiden Lectios sind **komplementär**: Lectio 1 spielt Kern-vs-Fluss spirituell durch, Lectio 2 psychologisch. Wer beide macht, sieht das Tableau in seiner ganzen Breite. Wer nur eine macht, bekommt einen klaren Fokus.

**Jung in den zwei Lectios — bewusste Funktionsdifferenz:**

Jung wird in den zwei Lectios in unterschiedlichen Funktionen verwendet, weil Jung tatsächlich beide Seiten hat:

- In **Lectio 1** ist Jung die psychologische Stimme, die sich der spirituellen Ontologie-Frage (Atman/Anatta) verweigert — er spielt den Kern-vs-Konstrukt-Streit auf der ontologischen Ebene nicht mit, sondern bleibt im psychischen Raum. Das ist seine Pointe dort.
- In **Lectio 2** ist Jung der Eröffner des psychologischen Bogens — die Position, in der ein Tiefenkern noch klar behauptet wird (als psychische Wirklichkeit, nicht als ontologische Substanz). Das ist seine Pointe hier.

Die Texte in Lectio 2 sind so formuliert, dass die Substanz-Funktion *psychisch* bleibt ("psychische Wirklichkeit", nicht "ontologische Substanz") — damit widerspricht Lectio 2 der Pointe von Lectio 1 nicht. Wer beide Lectios macht, lernt: Jung hat beide Seiten, und welche Seite gerade tragend wird, hängt vom Diskurs ab, in dem er gelesen wird.

Methodische Beobachtung: Bei einem Knoten, der in mehreren Lectios vorkommt, sollte die Funktion *konsistent oder bewusst differenziert* sein — nicht widersprüchlich. Konsistente Funktion ist einfacher, bewusste Differenz reicher (aber benötigt Pflege, dass die Differenz nicht in Widerspruch kippt).

---

## 8. Übergebbar?

**Inhaltlich:** Ja. Bogen trägt, Briefs sind in sich konsistent, dialektische Wendung bei IFS ist im Übergang explizit benannt und in der Closing Synthesis im Vollzug spürbar.

**Was offen ist:**
- Externe Prüfrunde durchlaufen, drei Befunde verarbeitet (siehe Sektion 9)
- Falls Monique sich meldet und Adler-Spezifika ergänzt, ggf. nachjustieren
- Datenmodell-Migration (Backlog-Item) — wird in Claude-Code-Session entschieden

**Empfehlung:** Nach Verarbeitung der Befunde (Sektion 9) committable. Wenn Monique antwortet, ihre Hinweise einarbeiten.

---

## 9. Verarbeitung der Prüfbefunde (zweite Runde, 23.5.26)

Drei Befunde aus der Prüfrunde, alle drei übernommen.

### Befund 1 — Jung-Diskrepanz zwischen Lectio 1 und Lectio 2 (übernommen)

**Korrektur:** Jung-Brief und Jung-Transition in Lectio 2 nachgeschärft. Statt "die psychologische Position des Tiefenkerns am klarsten vertritt" jetzt: "bei ihm ein Tiefenkern noch klar behauptet wird — nicht als ontologische Substanz, sondern als psychische Wirklichkeit". Der Brief macht dieselbe Verschiebung: "archetypische Tiefenstruktur ... nicht als Substanz im philosophischen Sinn, sondern als psychische Wirklichkeit". Damit hält Lectio 2 die Bogen-Funktion (Substanz-seitiger Startpunkt) ohne der Pointe von Lectio 1 (Jung verweigert die ontologische Festlegung) zu widersprechen. Sektion 7 dieser Begleitnotiz dokumentiert die bewusste Funktionsdifferenz.

### Befund 2 — Hood als falscher Pol (übernommen)

**Korrektur:** Hood-Transition formuliert ihn nicht mehr als "anderen Pol des Bogens", sondern als "Ausgang dieses Bogens" mit explizitem Hinweis, dass die radikalste Konstrukt-Position Metzinger ist (in Lectio 1). Closing Synthesis sagt jetzt "Hood am Ausgang" statt "Hood am Ende". Damit ist die Lectio mit dem Tableau-Layout konsistent (Hood bei x=60, Metzinger bei x=72) und verweist zugleich indirekt auf Lectio 1 als die ergänzende Lektüre für die schärfere Konstrukt-Position.

### Befund 3 — Auto-Kommentar in Closing Synthesis (übernommen)

**Korrektur:** Closing Synthesis um die Pfad-Typ-Selbstbeschreibung gekürzt. Der dialektische Charakter wird jetzt im Lesen *vollzogen* (IFS macht die Wendung), ohne dass die Lectio sie *kommentiert*. Die alte Formulierung "Der Bogen geht nicht in einer Linie vom Kern zum Konstrukt — er macht einen Bogen, in dem die Substanz-Position einmal neu gedacht wird" ist gestrichen. Der Pfad-Typ "dialektisch-revidierend" bleibt als methodische Beobachtung in dieser Begleitnotiz (Sektion 3), wo er hingehört. Die Closing Synthesis ist von 683 auf 459 chars geschrumpft — dichter, ohne das eigentliche Geschehen einzubüßen.

### Lessons aus dieser Prüfrunde

- **Lectio-Familien-Konsistenz:** Knoten in mehreren Lectios brauchen entweder konsistente oder bewusst differenzierte Funktion — nie widersprüchliche. Bei bewusster Differenz wie bei Jung muss die Differenz in den Texten so kalibriert sein, dass sie sich gegenseitig nicht aufhebt. Bei zwei weiteren Anwendungen des Patterns als Konvention in `lectio-mode.md` aufnehmen.

- **Bogen-Position vs. Achsen-Position:** Eine Lectio darf eine andere Reihenfolge wählen, als die Tableau-Koordinaten suggerieren — aber sie darf nicht behaupten, eine Position sei der Pol, wenn das Tableau eine schärfere Position kennt. Wenn eine zugänglichere Stimme statt der radikalsten gewählt wird, muss das benannt werden.

- **Lectio-Text vs. Begleitnotiz:** Der Pfad-Typ ist eine kuratorische Beschreibungsebene und gehört in die Begleitnotiz. Die Lectio vollzieht den Pfad, sie kommentiert ihn nicht. Sauber abgegrenzte Ebenen halten die Stimme der Lectio rein.
