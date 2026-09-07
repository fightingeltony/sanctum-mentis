# Selbst-Tableau – ein verständlicher erster Gegensatz

Stand: 7.9.2026. Lokaler Belegfall, noch nicht mit externen Lesern geprüft.

## Absicht und Umfang

Auf L1 sollen Besucher den Gegensatz zwischen dem bleibenden Selbst der hier vertretenen Advaita-Tradition und der buddhistischen Nicht-Selbst-Lehre in eigenen Worten ausdrücken können. Erst danach wählen sie, ob sie räumlich erkunden, genauer lesen oder einem geführten Pfad folgen möchten.

Der Belegfall gilt ausschliesslich für `das-selbst`. Die Landing, der Denkraum und andere Tableaus wurden nicht umgebaut. Er ist keine neue Bau-Konvention.

## Offene Produktfrage für das Review

Der Belegfall reduziert die Textdichte und räumt den ersten Bildschirm auf. Er belegt noch keinen verständlichen Gesamtfluss. Auch nach der Überarbeitung wurde der Einstieg als voraussetzungsreich wahrgenommen: Stufenbezeichnungen wie «L2» und räumliche Formulierungen wie «wer steht neben dir?» verlangen weiterhin ein Verständnis des Systems. Letzteres betrifft den unveränderten Denkraum.

Im Review deshalb zwei Fragen getrennt beantworten: Sind die konkreten Änderungen tragfähig? Und reichen sie aus, um einen Erstbesucher ohne Erklärung durch einen Gedanken zu führen? Die technische Prüfung beantwortet nur die erste Frage teilweise. Eine grundlegend andere Führung von einer Alltagserfahrung zur Gegenstimme ist bisher ein Vorschlag, keine implementierte oder geprüfte Lösung.

Die technische Option `topic.entry` steht allen Tableaus offen. Eine Übertragung braucht pro Feld eine verständliche Ausgangsfrage und eigene L1-Texte für Stimmen, Konzepte und Verbindungen. Bei den bestehenden Tableaus beginnen auf L1 zwei bis vier Stimmen; die Auswahl darf nicht automatisch auf ein Zweierpaar reduziert werden. Die längeren Texte können nur dann nach L2 verschoben werden, wenn vorhandene L2-Versionen dabei nicht überschrieben werden. Vor einer breiten Übernahme bleibt die Leserprobe offen.

## Was sich konkret ändert

- Eine alltagsnahe Frage eröffnet L1: «Wenn sich deine Gedanken und Gefühle verändern – was bleibt dann von dir?»
- Die zwei Stimmen beschreiben dieselbe Alltagsszene, mit je einem erklärten Fachbegriff. Ihre Positionen bleiben ausdrücklich als Positionen erkennbar.
- Auf L1 entfallen in der Denker-Liste Schulgruppen, Filter und Neu-Badges. Die beiden Stimmen stehen direkt nebeneinander, mobil untereinander. Auf L2 kehrt die normale Liste zurück.
- Nach den Stimmen folgt die offene Frage «Braucht Veränderung etwas, das unverändert bleibt?» sowie der direkte Weg zur Sternkarte oder auf L2. Die bestehenden Lectios und der Denkraum bleiben danach erreichbar.
- Auch die zwei L1-Konzepte und ihre Verbindung sind kürzer, damit der Schritt auf die Sternkarte keinen Sprung in die alte Textdichte erzeugt.
- Die bisherigen fünf längeren L1-Texte sind auf L2 erhalten. Beim Vedanta-Text ist nur die Zugehörigkeit zur Advaita-Tradition präzisiert. Bestehende Versionen ab L3, Sichtbarkeitsschwellen, Positionen, Schulen und die Versionslogik bleiben erhalten. L2 zeigt dadurch neben Jung auch die beiden Einstiegsstimmen als vertieft.

Technisch aktiviert das optionale `topic.entry`-Objekt die reduzierte L1-Liste. Seine Felder `intro` und `reflection` enthalten die beiden Fragen. Das normale `topic.intro` gilt weiterhin ab L2. Die Sternkarte behält ihre vorhandenen Ansichten und Gesten; die Pfade folgen auch dort auf L1 nach der Karte. Für diesen Einstieg zeigt sie ausdrücklich den Stufentext statt des sonst beim ersten Öffnen bevorzugten `lectio_brief`. Ihre Gelesen-Markierung folgt demselben Textschlüssel. Die Lectios behalten ihre eigenen Kurztexte.

## Quellen und Inhaltsprüfung

Die Neufassungen sind eigene Zusammenfassungen, keine Übersetzungen. Abgeglichen am 7.9.2026:

- [Brihadaranyaka Upanishad 3.4.2 mit Shankaras Kommentar](https://vivekavani.com/bru3c4v2/): Grundlage für den Zeugen des Erlebens und die hier dargestellte Advaita-Lesart. «Zeuge» bezeichnet keine zusätzliche innere Person.
- [SN 22.59, Anatta-lakkhana Sutta, Übersetzung von Ñanamoli Thera](https://accesstoinsight.org/tipitaka/sn/sn22/sn22.059.nymo.html): Grundlage für Veränderlichkeit, fehlende vollständige Beherrschbarkeit und die Frage, ob das Erlebte als Selbst aufgefasst werden kann.

Ein unabhängiger Prüfer hat die fünf neuen L1-Texte gegengelesen. Eingearbeitet: symmetrische Kennzeichnung der Perspektiven, Anatta über Identifikation erklären, «etwas» statt «jemanden» in der Schlussfrage. Danach Freigabe für L1. Diese Prüfung deckt die alten höheren Level ausdrücklich nicht ab.

## Technische Prüfung

- 55 bestehende Vitest-Tests bestanden; Produktionsbuild inklusive TypeScript und 42 statischen Seiten erfolgreich. Der erste Build scheiterte am eingeschränkten Google-Fonts-Zugriff, der erneute Lauf mit Netzwerkzugriff bestand.
- ESLint: keine Fehler, eine bereits bestehende Warnung zu `_weg` in `DenkraumTisch.tsx`.
- Datenvergleich gegen den Ausgangsstand: Nur `topic.entry` und die L1/L2-Fassungen der fünf genannten Knoten geändert; andere Knoten, bestehende höhere Versionen und Metadaten unverändert.
- Browserprüfung auf Desktop sowie mit 390 und 320 Pixeln Viewport-Breite: lesbare Umbrüche, vollständige L1-Pfadtitel und keine horizontale Seitenüberbreite bei 320 Pixeln.
- L1 → L2 zeigt Jung als neu und die beiden Einstiegsstimmen als vertieft. Rückweg zu L1, Sternkarten-Wechsel per Enter, Stufentext im mobilen Sternkarten-Panel, Konzept-Akkordeon und Begriffserklärung per Enter geprüft.

Das ist eine responsive Browserprüfung, kein Test der Pinch- und Pan-Gesten auf einem echten Touch-Gerät.

## Kurzer Test mit zwei oder drei Erstbesuchern

Noch offen – Browserprüfungen ersetzen keine Leserbeobachtung. Pro Person etwa zehn Minuten; mindestens eine Person nutzt ihr eigenes Smartphone. Ein frischer Seitenaufruf von `/thema/das-selbst?level=1&tab=denker` setzt denselben Ausgangspunkt.

1. Nur sagen: «Schau dir diese Seite an. Sag gern laut, was dir auffällt.» Begriffe und Bedienung zunächst nicht erklären.
2. Nach dem Lesen fragen: «Wie würdest du den Unterschied zwischen den beiden Stimmen jemand anderem erklären?» Antwort möglichst wörtlich notieren. Nicht auf ein bestimmtes Vokabular hinführen.
3. Fragen: «Welche Frage ist für dich noch offen?» Auch «keine» oder Unverständnis gelten als Beobachtung, nicht als falsche Antwort.
4. Bitten: «Geh dort weiter, wo es dich interessiert.» Beobachten, ob Sternkarte, L2, Lectio oder ein anderer Weg selbstständig gefunden wird. Erst bei einer Bitte um Hilfe eingreifen und den Moment notieren.
5. Danach fragen: «Was hat sich verändert, als du weitergegangen bist? Was war unklar oder anstrengend?» Auf dem Smartphone auch beobachten, ob Text und Bedienung gut erreichbar sind.

| Person / Gerät | Gegensatz in eigenen Worten | Offene Frage | Gewählter Weg | Wo Hilfe nötig war | Wörtlicher Kommentar |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |

Ein positives Signal wäre, dass Besucher den bleibenden Grund und die Nicht-Selbst-Frage unterscheiden und ohne Erklärung weitergehen können. Warnsignale wären «Buddhismus sagt, ich existiere nicht», ein blosses Wiederholen der Fachwörter oder eine Sackgasse beim nächsten Schritt. Mit dieser kleinen Runde lassen sich konkrete Verständnishürden finden; sie belegt noch keinen allgemeinen Lernerfolg.

Erst nach den Beobachtungen entscheiden, ob diese Form auch anderen Tableaus hilft. Bis dahin keine Übernahme in den Kanon.
