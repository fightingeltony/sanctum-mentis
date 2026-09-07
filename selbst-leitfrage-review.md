# Die Landkarte des Selbst – Leitfrage und Auftrag an Claude

Stand: 7.9.2026. Review-Vorlage nach dem gemergten Einstiegs-PR #1, Ausgangsstand `459328e`. Dieser PR enthält einen kuratorischen Vorschlag; er ändert keine Produkttexte oder Tableau-Daten.

## Die Frage, die das Tableau tragen soll

Fabian hat seine bisherige Lesart ausdrücklich klargestellt:

> «Ich habe die Landkarte des Selbst immer davon aus gelesen, dass die Frage ist, gibt es einen individuellen, unverkennbaren Kern, ein unveränderbares Selbst oder ist es fluide, entwickelt sich.»

Diese Frage ist der Ausgangspunkt des Reviews. Der zwischenzeitliche Vorschlag von Codex, Descartes und Hume als neue Einstiegsdenker aufzunehmen, ist keine beschlossene Umsetzung. Zwei zusätzliche Denker wären ein erheblicher Eingriff und würden die Ausgangsfrage in Richtung der Gewissheit des eigenen Denkens verschieben. Für diesen Korrekturschritt sollen die vorhandenen Stimmen die Grundlage bleiben.

Das Ziel ist ein verständlicher Zugang zur persönlichen Frage nach Beständigkeit und Entwicklung. Die Antwort soll im Tableau offenbleiben.

## Was am bestehenden Tableau dazu passt – und wo es verrutscht

Alle folgenden Fundstellen liegen in `data/das-selbst.json`.

| Fundstelle | Bestehender Wortlaut / Befund | Konsequenz für das Review |
|---|---|---|
| `topic.intro` | «Bin ich ein Kern, den ich freilegen kann – oder ein Muster, das ich gerade bin?» | Fabians Lesart ist im bestehenden Rahmen angelegt. |
| `topic.quadrants.axisX` | «Substanz & Konstanz» / «Prozess & Fluidität», mit «ein bleibender Kern» / «ein wandelnder Vollzug» | Die Achse bündelt verschiedene Fragen. Ein entwickeltes Selbst kann vergleichsweise stabil und individuell sein. |
| `topic.entry.intro` und Vedanta L1 | Veränderliche Gedanken und Gefühle führen zum «stillen Zeugen», der derselbe bleibt. | Das Alltagsbeispiel legt einen bleibenden persönlichen Kern nahe, während Advaita einen die Individualität überschreitenden Grund meint. |
| Vedanta L2, Atman-Erklärung | «das göttliche, unveränderliche Ich» | «Ich» kann erneut als unverwechselbare Persönlichkeit gelesen werden. Der neue L1-Text allein beseitigt das Problem nicht. |
| Buddhismus L2 und `lectio_brief` | «ständig wechselnder Strom» beziehungsweise «kein Kern, nur Bewegung» | Als Antwort auf die persönliche Entwicklungsfrage droht Nicht-Selbst zur Lehre von einem bloss flexiblen Selbst zu werden. |
| `topic.synthesis` | «Die westliche Tradition sucht ein stabiles Zentrum […] östliche Traditionen und Neurowissenschaft bestreiten es» | Diese Pauschalisierung verdeckt bereits die im Tableau vertretene Advaita-Position. |
| Schluss von `topic.synthesis` | «Das Selbst ist kein Ding, aber auch keine blosse Illusion. Es ist ein Prozess – und du bist mitten darin.» | Die Synthese entscheidet die offene Leitfrage zugunsten einer Position. |

Die bisherige Inhaltsprüfung der gekürzten L1-Texte ist kein Nachweis dafür, dass das Stimmenpaar Fabians Leitfrage angemessen eröffnet. Der neue Befund betrifft die Rahmung und die Übergänge zwischen verschiedenen Selbstbegriffen.

## Drei Unterscheidungen für das Review

Diese Unterscheidungen dienen der Redaktion; sie sollen nicht als zusätzliche Begriffsliste auf den Einstiegsbildschirm.

- **Individuell**: Was macht gerade diesen Menschen unverwechselbar? Das setzt keine Unveränderlichkeit voraus.
- **Bleibend oder entwickelt**: Ist etwas schon vorhanden, wird es zugänglich, oder entsteht es im Leben? Entwicklung und Kontinuität können zusammengehen.
- **Spiritueller Grund**: Was meinen Traditionen mit einem Selbst jenseits der persönlichen Eigenschaften? Das beantwortet die Frage nach individueller Eigenart nicht unmittelbar.

Advaita und die hier herangezogene frühe buddhistische Nicht-Selbst-Lehre sind eine begründbare Gegenüberstellung zur Frage eines bleibenden Selbst. Sie sind aber kein einfaches Ja/Nein-Paar zur Frage nach einer unverwechselbaren Persönlichkeit. Auch «fluide» und «Anatta» sind keine austauschbaren Begriffe.

## Konkreter Textvorschlag zur Prüfung

Die folgenden Texte sind ein Entwurf für Claude, keine freigegebene Neufassung. Sie halten die persönliche Frage im Vordergrund und nehmen die Antwort nicht vorweg.

**Einstieg (`topic.entry.intro`):**

> Du veränderst dich im Laufe deines Lebens. Entdeckst du dabei, wer du im Grunde schon bist – oder entsteht erst durch dein Leben, wer du bist?

**Offene Rückfrage (`topic.entry.reflection`):**

> Was macht dich unverwechselbar – und muss es dafür unverändert bleiben?

**Mögliche Synthese (`topic.synthesis`):**

> Die Stimmen dieser Landkarte fragen auf unterschiedliche Weise, was dich ausmacht und was sich an dir verändern kann. Manche suchen etwas, das schon vorhanden ist und entdeckt werden kann. Andere untersuchen, wie ein Selbst in Erfahrungen und Beziehungen entsteht. Wieder andere stellen infrage, ob wir überhaupt etwas als festes Selbst auffassen sollten. Dabei meinen sie mit «Selbst» nicht immer dasselbe: die persönliche Eigenart, ein zusammenhängendes Erleben oder einen spirituellen Grund. Was müsste bleiben, damit du dich als dich selbst erkennst – und was dürfte sich verändern?

Dieser Entwurf verbessert den Rahmen. Er löst die Auswahl der ersten Stimmen noch nicht: Mit unveränderten L1-Karten wäre der Sprung von persönlicher Entwicklung zum spirituellen Grund weiterhin vorhanden. Deshalb den Einstiegstext nicht isoliert als fertige Korrektur übernehmen.

## Empfohlener nächster Schritt für Claude

Zuerst einen kurzen, zusammenhängenden Einstieg aus vorhandenen Stimmen vorlegen. Die Auswahl soll von Fabians Frage ausgehen. Kein Zweierduell erzwingen, falls die vorhandenen Positionen diese Aufteilung nicht tragen.

Jung, Kohut, Rogers und IFS sind bereits vorhanden und berühren laut Datensatz Entwicklung, Selbstzusammenhang oder einen zugänglichen Grund. Das macht sie zu Prüfstellen, noch nicht zu einem empfohlenen neuen Stimmenpaar. Ihre gegenwärtigen Texte sind selbst zu prüfen: Insbesondere Jungs Selbst nicht ungeprüft auf «entsteht erst durch Individuation» reduzieren; aus einem therapeutischen Self-Modell nicht ohne Begründung einen unveränderlichen individuellen Wesenskern machen. Auch Entwicklungspositionen nicht mit Beliebigkeit oder völliger Formlosigkeit gleichsetzen.

Claude soll als Ergebnis liefern:

1. Einen lesbaren Entwurf von der Ausgangsfrage über die vorhandenen Stimmen bis zur offenen Rückfrage, mit kurzer Begründung der Auswahl und Quellen für die entscheidenden Aussagen.
2. Eine konkrete Liste der nötigen Datenänderungen, einschliesslich möglicher L1/L2-Verschiebungen. Falls die vorhandenen Stimmen die Frage nicht ausreichend tragen, diese Grenze benennen, bevor neue Denker vorgeschlagen werden.
3. Eine begründete Einschätzung, ob Advaita/Buddhismus später als spirituelle Vertiefung erscheinen oder mit einer verständlichen Überleitung Teil des Einstiegs bleiben können.
4. Einen Vorschlag für die widerspruchsfreie Synthese. Die Lage und Beschriftung der Kartenachsen zunächst prüfen; Änderungen daran wären eine eigene kuratorische Entscheidung.

Für einen späteren Implementierungs-PR alle betroffenen Ausgaben mitdenken: `versions`, Konzepte, Einflüsse, `lectio_brief` und bestehende Lectios. Bestehende Versionen nicht überschreiben, um eine Stimme früher sichtbar zu machen. Keine automatische Übertragung auf andere Tableaus und kein zusätzlicher UI-Mechanismus für diesen Schritt.

## Quellenbasis und Grenzen

- [Śaṅkara, Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/shankara/): Advaita versteht Atman als nichtduales Bewusstsein, identisch mit Brahman und jenseits der Individualität. Fachliche Einordnung des zentralen Rahmungsproblems.
- [Brihadaranyaka Upanishad 3.4.2 mit Shankaras Kommentar](https://vivekavani.com/bru3c4v2/): Primärtext und Kommentar zur Rede vom Erkennenden beziehungsweise Zeugen. Kein Beleg für einen individuellen Persönlichkeitskern.
- [SN 22.59, Übersetzung von Ñanamoli Thera](https://accesstoinsight.org/tipitaka/sn/sn22/sn22.059.nymo.html): Körper, Gefühl, Wahrnehmung, Gestaltungen und Bewusstsein werden auf Veränderlichkeit und die Identifikation als Selbst hin befragt. Die Lehrrede begründet keine Gleichsetzung von Nicht-Selbst mit persönlicher Entwicklungsfähigkeit.

Diese Quellen tragen die Diagnose zum bisherigen Stimmenpaar. Eine Quellensichtung und unabhängige Inhaltsprüfung eines neu zusammengestellten Einstiegs stehen noch aus. Die psychologischen Positionen oben sind deshalb ausdrücklich Prüfaufträge.

## Prüfung dieses PRs

Dokumentationsänderung: Fundstellen am aktuellen Tableau geprüft, Entwurf von Implementierung getrennt, keine neuen Knoten und keine Änderung an Daten, UI oder Versionslogik. Keine Laufzeittests erforderlich. Die bestehenden technischen Prüfungen aus PR #1 bestätigen nicht die hier erneut offene kuratorische Eignung.
