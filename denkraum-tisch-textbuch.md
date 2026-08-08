# Denkraum-Tisch – Textbuch (Formulierungs-Übergabe)

**Zweck:** Alle Texte des Denkraum-Tisch-Prototyps (`/denkraum/kontrollieren`) an einem Ort, jeder mit eindeutiger Adresse – für einen separaten Formulierungs-Chat. Es geht NUR um Formulierungen: kein Text bekommt neue Inhalte, keiner verliert Substanz.

**Rückgabeformat (wichtig):** Eine einfache Liste, nur die geänderten Texte:

```
V2 → «neuer Wortlaut»
O1.echo → «neuer Wortlaut»
```

Fable (Claude Code) spielt die Liste dann mechanisch ein. Nicht Genanntes bleibt unverändert.

**Stand:** 2026-08-08 · alle Texte ENTWURF

---

## Was der Denkraum-Tisch ist (Kontext in fünf Sätzen)

Ein interaktiver Raum zur Lebensfrage «Was habe ich wirklich in der Hand?». Zuerst beantwortet der Nutzer die Frage selbst (Verortung, vier Ich-Antworten) und wählt eine Haltung (Ruhe = sehen, wer neben ihm steht / Erschütterung = sehen, wer ihm widerspricht). Dann liegt ein Tisch vor ihm: sechs Stimmen als Karten, er selbst als Marker mitten darunter. Er tippt zwei Stimmen an und zieht damit eine Verbindung – und entscheidet: **Landkarte** (die beiden reden über verschiedene Ebenen, die Spannung klärt sich) oder **Medaille** (ein echter Widerspruch, er bleibt). Das entstehende Linienbild ist sein Spiegel; in der Erschütterung kann er sich zeigen lassen, welche Verbindung er übersehen hat.

Grundhaltung (kanon.md): ausstellen und spiegeln, nie verkünden. Das Werkzeug behauptet keine Widersprüche – es fragt.

## Ziel-Ton (das wichtigste Kriterium, vom Kurator am 8.8. gesetzt)

**Klar, direkt, abholend – nicht philosophisch schwammig.** Alltagssprache vor Philosophensprache: Ein Satz, den dir ein Freund am Küchentisch sagen könnte, schlägt jede Formulierung, die nach Seminar klingt. Fachwörter und Denker-Vokabular (»das feste Ich«, »das Unverfügbare«, »Kontingenz«) sind in den Nutzer-zugewandten Texten (Block 1–4) verboten – was gemeint ist, wird in Erlebnis-Sprache gesagt. Belegfall der Korrektur: O4.echo hiess erst *«Ich bin nicht sicher, ob es das feste Ich gibt, das etwas in der Hand hätte»* (Seminarsprache) und heisst jetzt *«Ich suche den, der bei mir am Steuer sitzt – und finde niemanden»* (Erleben, konkretes Bild). In den kuratierten Stellen (Block 5) dürfen Denker-Positionen präzise bleiben – aber auch dort: erst das Erleben, dann der Begriff.

## Stilregeln (Kurzfassung, massgeblich: prompts/schreib-skill-lectio.md)

- **Satzlängen-Variation:** langer tragender Satz, dann ein kurzer Schlag. Nicht Kürze um jeden Preis.
- **Kein Halbsatz-Pathos:** kein Satz, der bedeutungsvoll klingt und beim zweiten Lesen nichts sagt.
- **Du nah, nicht belehrend.** Kein Doziermodus, keine dritte Person über den Leser.
- **Konkret vor abstrakt.** Sparsame, offene Formulierungen – die weniger ornamentale Fassung gewinnt.
- Schweizer Orthografie (ss statt ß), Halbgeviertstrich ` – `, keine Versalien.
- Laut lesen: Wo die Stimme stockt, ist der Rhythmus falsch.

---

## Block 1 · Verortung (PRIORITÄT – hier klemmt es am meisten)

Der erste Bildschirm. Die Lebensfrage wird dem Nutzer selbst gestellt, vier Antwort-Karten. `label` = die kurze Ich-Antwort auf der Karte, `echo` = der eine Satz darunter, der sie ausbuchstabiert.

| Adresse | Ort | Aktueller Text |
|---|---|---|
| **V1** | Einleitungszeile über der Frage | Sechs Stimmen haben auf diese Frage geantwortet. Aber zuerst antwortest du. |
| **V2** | Die Frage selbst (Serif, gross) | Was hast du wirklich in der Hand? |
| **O1.label** | Antwort-Karte 1 (Loslassen) | Weniger, als ich denke. |
| **O1.echo** | darunter | Vieles, was mich nachts wachhält, liegt gar nicht bei mir – es wäre eine Erleichterung, das zuzugeben. |
| **O2.label** | Antwort-Karte 2 (Ergreifen) | Mehr, als ich zugebe. |
| **O2.echo** | darunter | ›Das kann ich nicht ändern‹ sage ich öfter, als es stimmt. |
| **O3.label** | Antwort-Karte 3 (Empfangen) | Das Wichtigste habe ich nie gemacht. |
| **O3.echo** | darunter | Die Menschen, die mich halten, habe ich nicht ausgesucht. |
| **O4.label** | Antwort-Karte 4 (Einwand) | Wer fragt da eigentlich? *(Label gefällt – nicht anfassen)* |
| **O4.echo** | darunter | Ich suche den, der bei mir am Steuer sitzt – und finde niemanden. |

Zweck der vier Antworten: Sie müssen sich wie echte, heutige Selbstauskünfte anfühlen (nicht wie Positions-Etiketten), zusammen den Raum aufspannen (Loslassen / Ergreifen / Empfangen / Einwand) – und keine darf die «richtige» sein.

## Block 2 · Haltungswahl

| Adresse | Ort | Aktueller Text |
|---|---|---|
| **H0** | Frage (Serif) | Und in welcher Haltung willst du heute denken? |
| **H1.label** | Karte 1 | Ruhe |
| **H1.sub** | darunter | Sehen, wer neben dir steht. Ordnung finden. |
| **H2.label** | Karte 2 | Erschütterung |
| **H2.sub** | darunter | Sehen, wer dir widerspricht. Das Wackeln zulassen. |
| **H3** | Zurück-Link | ← anders antworten |

## Block 3 · Der Stand (Panel-Text direkt nach dem Eintreten)

Je Verortung × Haltung ein Text. Zweck: dem Nutzer zeigen, wo er auf dem Tisch steht – Ruhe benennt die Nachbarn, Erschütterung die Widersprechenden und deren schärfste Frage. Endet jeweils mit einer Handlungs-Einladung.

| Adresse | (Verortung · Haltung) | Aktueller Text |
|---|---|---|
| **S1.ruhe** | Weniger · Ruhe | Du stehst beim Loslassen – Epiktet ist dein Nachbar. Von ihm kannst du die Schärfe lernen: nicht alles aufgeben, sondern genau unterscheiden, was deins ist. Sieh dich um, und zieh eine Verbindung, wo es dich interessiert. |
| **S1.ersch** | Weniger · Erschütterung | Du stehst beim Loslassen – und zwei Stimmen auf diesem Tisch halten genau das für deine bequemste Ausrede. Sartre würde fragen: Was genau kannst du angeblich nicht ändern? Zieh eine Verbindung zu denen, die dir widersprechen – oder weich ihnen aus, das sagt auch etwas. |
| **S2.ruhe** | Mehr · Ruhe | Du stehst beim Ergreifen – Sartre und Nietzsche stehen dir bei: Die Freiheit ist unbequem, aber sie ist deine. Sieh dich um, und zieh eine Verbindung, wo es dich interessiert. |
| **S2.ersch** | Mehr · Erschütterung | Du stehst beim Ergreifen – und für die Stimmen des Empfangens ist genau dieses Greifen die Wurzel deiner Unruhe. Augustinus würde fragen: Was tust du, wenn der Wille, der zugreifen soll, selbst gespalten ist? Zieh eine Verbindung zu denen, die dir widersprechen – oder weich ihnen aus, das sagt auch etwas. |
| **S3.ruhe** | Daneben · Ruhe | Du stehst beim Empfangen – das Wahre Selbst und Augustinus stehen neben dir: Das Entscheidende machst du nicht, es kommt dir zu. Sieh dich um, und zieh eine Verbindung, wo es dich interessiert. |
| **S3.ersch** | Daneben · Erschütterung | Du stehst beim Empfangen – und Nietzsche hält genau das für die eleganteste Kapitulation: Ohnmacht, zur Hingabe verklärt. Kannst du ihn widerlegen – oder nur anders leben? Zieh eine Verbindung zu denen, die dir widersprechen – oder weich ihnen aus, das sagt auch etwas. |
| **S4.ruhe** | Wer fragt · Ruhe | Du stehst neben dem Streit – beim Buddhismus, der die Frage selbst fallen lässt. Von dort aus wirkt das Ringen der anderen seltsam laut. Sieh dich um, und zieh eine Verbindung, wo es dich interessiert. |
| **S4.ersch** | Wer fragt · Erschütterung | Du stehst neben dem Streit – aber die Frage zu verlassen heisst nicht, sie zu gewinnen. Mit ihr fällt aber auch etwas weg, das du vielleicht behalten wolltest. Nietzsche würde sagen: das halbe Leben. Zieh eine Verbindung zu ihm – oder weich ihm aus, das sagt auch etwas. |

## Block 4 · Tisch-Beschriftungen und UI-Mikrotexte

| Adresse | Ort | Aktueller Text |
|---|---|---|
| **R1–R4** | Regionen-Labels auf der Fläche (kursiv, dezent, klickbar) | das Loslassen · das Ergreifen · das Empfangen · der Einwand |
| **R1.hint** | Panel-Text beim Klick aufs Label | Die Stimmen hier sagen: Halte weniger fest. Vieles liegt nicht bei dir – und das anzuerkennen befreit. |
| **R2.hint** | Panel-Text | Die Stimmen hier sagen: Du hast mehr in der Hand, als du zugibst – nimm es. |
| **R3.hint** | Panel-Text | Die Stimmen hier sagen: Das Entscheidende machst du nicht – es kommt dir zu, wenn du es lässt. |
| **R4.hint** | Panel-Text | Hier steht die Stimme, die die Frage selbst anzweifelt: Wer ist es denn, der etwas in der Hand hätte? |
| **U16** | Panel-Eyebrow der Regionen-Ansicht | Eine Gegend des Tisches |
| **C1** | Chip auf Nachbar-Karten (Ruhe) | neben dir |
| **C2** | Chip auf widersprechenden Karten (Erschütterung) | widerspricht dir |
| **U1** | Panel-Eyebrow «Stand»-Ansicht | Wo du stehst |
| **U2** | Hilfezeile darunter | Eine Stimme antippen, um sie zu lesen – eine zweite, um eine Verbindung zu ziehen. |
| **U3** | Panel-Eyebrow Stimmen-Ansicht | Eine Stimme |
| **U4** | Hilfezeile Stimmen-Ansicht | Tippe eine zweite Stimme an, um eine Verbindung zu ziehen. |
| **U5** | Panel-Eyebrow Verbindungs-Ansicht | Eine Verbindung |
| **U6** | Wahl-Button 1 (Label + Unterzeile) | Landkarte / Sie reden über Verschiedenes – das klärt sich |
| **U7** | Wahl-Button 2 (Label + Unterzeile) | Medaille / Ein echter Widerspruch – er bleibt |
| **U8** | Löse-Aktion | ◦ Verbindung lösen |
| **U9** | Erschütterungs-Aktion (Panel-Fuss) | Was übersehe ich? |
| **U10** | Rück-Aktion (Panel-Fuss) | ◦ Zurück zum Stand |
| **U11** | Panel-Eyebrow Übersehen-Ansicht | Die übersehene Verbindung |
| **U12** | Hilfezeile Übersehen-Ansicht | Wenn du sie ziehen willst: die beiden Stimmen nacheinander antippen. |
| **U13** | Hinweis bei nicht kuratierter Verbindung | Zu dieser Verbindung hat der Tisch noch nichts zu sagen – deine Setzung bleibt trotzdem stehen. Vielleicht siehst du hier etwas, das er noch nicht sieht. |
| **U14** | Kopfzeile rechts | Denkraum · Beta |
| **U15** | Zwei-Bilder-Erklärung – erscheint im Verbindungs-Panel, bis der Nutzer seine erste Wahl getroffen hat, danach nie wieder. Die Begriffe **Landkarte**/**Medaille** werden hier explizit benannt (fett), damit die Zuordnung zu den Wahl-Buttons unmissverständlich ist | Für deine Entscheidung gibt es zwei Bilder. **Landkarte**: Zwei Karten desselben Gebiets – Strassenkarte und geologische Karte – zeigen Verschiedenes, und doch widerspricht keine der anderen; die Spannung löst sich auf, sobald du die Ebenen trennst. **Medaille**: ein Stück, zwei Seiten – nie beide zugleich zu sehen; dieser Widerspruch bleibt. |

## Block 5 · Die drei kuratierten Stellen (heute stil-überarbeitet – Prüfung willkommen, aber nicht Priorität)

Je Stelle: `reibung` (benennt die Spannung), `frage`, dann vier Antworttexte (Wahl Landkarte/Medaille × Haltung Ruhe/Erschütterung). Adressen: **ST1** = Epiktet↔Sartre (loslassen-oder-ausrede), **ST2** = Nietzsche↔Augustinus (werk-oder-gabe), **ST3** = Buddhismus↔Nietzsche (frage-oder-boden). Felder: `.reibung`, `.frage`, `.lk.ruhe`, `.lk.ersch`, `.med.ruhe`, `.med.ersch`.

**ST1.reibung** — Epiktet sagt: Gib das Unverfügbare auf – fast nichts liegt in deiner Macht, und das anzuerkennen ist Befreiung. Sartre hört genau darin die Ausrede: ›Das liegt nicht in meiner Macht‹ ist ihm der eleganteste Weg, der eigenen Freiheit auszuweichen. Dieselbe Geste – etwas loslassen – ist für den einen Weisheit, für den anderen Flucht.

**ST1.frage** — Reden die beiden über Verschiedenes – oder widersprechen sie einander wirklich? Landkarte oder Medaille?

**ST1.lk.ruhe** — Vieles spricht für deine Lesart. Epiktet redet von den Dingen – Besitz, Ruf, Ausgang der Pläne –, Sartre von deiner Stellungnahme zu ihnen. Frankl hat die beiden Karten übereinandergelegt: Den Schlag hast du nicht in der Hand, deine Antwort darauf schon. So gelesen widersprechen sich die beiden nicht – sie vermessen verschiedene Schichten desselben Lebens. Du kannst beide behalten.

**ST1.lk.ersch** — Die Ebenentrennung trägt weit: Epiktet vermisst die Dinge, Sartre die Stellungnahme – und Frankl zeigt, dass sich beides schichten lässt. Aber ein Rest sperrt sich. Sartres Verdacht zielt nicht auf eine andere Ebene, er zielt auf Epiktets Geste selbst: Woher weisst du, ob dein Loslassen Einsicht ist – oder die bequeme Erzählung eines Menschen, der nicht handeln will? Darauf antwortet keine Ebenentrennung – die Frage bleibt an dir hängen, jedes Mal neu, wenn du etwas ›nicht in meiner Macht‹ nennst.

**ST1.med.ruhe** — Du lässt den Widerspruch stehen – und das hat seine eigene Ruhe. Ob ein Loslassen Weisheit ist oder Flucht, entscheidet kein Grundsatz, sondern der einzelne Fall – und weil du das weisst, musst du die Spannung nicht mehr wegerklären. Du trägst die Medaille einfach bei dir. Welche Seite oben liegt, zeigt dir der Moment.

**ST1.med.ersch** — Dann gilt die Frage dir. Wenn dieselbe Geste Weisheit oder Flucht sein kann und nichts von aussen entscheidet, welche von beiden du gerade vollziehst – dann steht jedes deiner Loslassen unter Verdacht, auch das ehrlichste. Sartre würde sagen: gerade das ehrlichste. Ablegen lässt sich diese Medaille nicht. Was bleibt, ist Wachheit – für den Moment, in dem aus deiner Gelassenheit eine Ausrede wird.

**ST2.reibung** — Nietzsche sagt: Du hast dich selbst in der Hand, wenn du den Mut hast, dich zu ergreifen – alles andere ist verschenktes Leben. Augustinus hat genau das versucht und ist daran zerbrochen: Der Wille, der sich ergreifen sollte, war selbst gespalten, und das Entscheidende fiel ihm zu, als er es nicht mehr machen konnte. Für die eine Seite ist das Empfangen verklärte Ohnmacht. Für die andere ist das Ergreifen die Wurzel der Unruhe.

**ST2.frage** — Reden die beiden über Verschiedenes – oder widersprechen sie einander wirklich? Landkarte oder Medaille?

**ST2.lk.ruhe** — Deine Lesart hat Kraft: Vielleicht reden die beiden von verschiedenen Phasen – es gibt Strecken, auf denen du ringen musst, und Schwellen, an denen sich deine Hand öffnen muss. Augustinus selbst kannte beides: das jahrelange Ringen und den Moment, der ihm zufiel. So gelesen ergänzen sich Werk und Gabe wie Anspannung und Ausatmen – jedes zu seiner Zeit.

**ST2.lk.ersch** — Die Phasen-Lesart ist elegant – vielleicht zu elegant. Denn die beiden reden nicht über verschiedene Phasen, sie bewerten dieselbe Bewegung entgegengesetzt: Was Augustinus Gnade nennt, nennt Nietzsche Kapitulation; was Nietzsche Selbstschöpfung nennt, ist für die Gegenseite genau die Anstrengung, die das Entscheidende verstellt. Jeder hält die Grundgeste des anderen für Selbstbetrug. Auf einer Karte, auf der beide Wege friedlich nebeneinander liegen, hat einer von beiden schon verloren.

**ST2.med.ruhe** — Du erkennst hier eine echte Medaille – und kannst trotzdem gelassen mit ihr leben. Dass sich Werk und Gabe nicht verrechnen lassen, heisst nicht, dass du dich heute endgültig entscheiden musst. Es heisst nur: Du wirst nie beide Seiten zugleich sehen. Die meisten Leben wenden die Medaille mehrmals – es gibt Jahre des Ergreifens und Jahre des Empfangens, und keines widerlegt das andere.

**ST2.med.ersch** — Dann steht hier die vielleicht härteste Stelle des Tisches. Denn diese Medaille lässt sich nicht von aussen betrachten: Du stehst immer schon auf einer Seite. Fragst du ›was soll ich tun‹, hast du das Werk gewählt; wartest du, hast du gewählt zu empfangen. Es gibt keinen neutralen Ort, von dem aus du prüfen könntest, welche Seite recht hat – die Prüfung selbst wäre schon Werk. An dieser Stelle entscheidet sich etwas über dich, nicht über die Denker.

**ST3.reibung** — Der Buddhismus beantwortet die Frage nicht – er bestreitet ihre Voraussetzung: das feste Ich, das etwas in der Hand hätte. Wo kein Halter ist, ist nichts zu halten, und der Streit der anderen fällt in sich zusammen. Aber mit dem Streit fällt auch, was an ihm hing: Wenn es kein Ich gibt, zählt auch nicht mehr, was Nietzsche unbedingt gezählt sehen will – dein Ringen, dein Werk, die Haltung, die du gegen alles behauptest.

**ST3.frage** — Siehst du hier die tiefere Ebene, auf der sich alles klärt – oder eine Medaille: die Freiheit von der Frage auf der einen Seite, ihr Gewicht auf der anderen?

**ST3.lk.ruhe** — So gelesen ist der Buddhismus keine weitere Stimme im Streit, sondern die Karte unter den Karten: Alle anderen vermessen, wie ein Ich mit der Welt umgeht – er vermisst, ob es dieses Ich so überhaupt gibt. Der Streit um viel oder wenig Kontrolle löst sich dann nicht, er wird gegenstandslos – so wie die Frage nach dem Rand der Erde gegenstandslos wurde, als die Karte rund wurde. Das kann eine grosse Entlastung sein.

**ST3.lk.ersch** — Vielleicht. Aber die tiefere Ebene hat ihren Preis. Wer die Frage auflöst, gewinnt sie nicht – er verlässt sie, und mit ihr alles, was an ihr hing: den Ernst deines Ringens, das Gewicht deiner Entscheidungen, den Stolz auf das, was du gegen Widerstand geworden bist. Die runde Karte hat den Rand der Erde nicht erklärt, sie hat ihn abgeschafft. Ob das Klärung ist oder Verlust, sagt dir die Ebene selbst nicht.

**ST3.med.ruhe** — Du hältst beides fest: die Entlastung, die im Nachlassen des Greifens liegt – und das Gewicht, das nur ein Leben hat, das sein Ringen ernst nimmt. Als Medaille gelesen musst du den Buddhismus nicht widerlegen und Nietzsche nicht aufgeben. Du weisst nur, dass du nie beide Seiten zugleich sehen wirst: Wer loslässt, sieht das Gewicht nicht mehr; wer ringt, nicht die Freiheit. Das ist kein Scheitern – näher kommt hier niemand heran.

**ST3.med.ersch** — Dann ist dies die Medaille, die am meisten kostet. Denn sie liegt nicht zwischen zwei Meinungen, sondern zwischen zwei Weisen, überhaupt jemand zu sein: ein Ich, das sein Leben führt – oder ein Geschehen, das sich führen lässt und auch das noch loslässt. Zwischen ihnen gibt es keinen Kompromiss und keine Mischung; jeder Versuch, beides zu haben, steht schon auf der Seite des Ich. Wenn dich heute etwas von diesem Tisch begleitet, dann vielleicht diese Unruhe.

## Block 6 · Die übersehene Verbindung

**UE1** (Epiktet↔Buddhismus, nur Erschütterung) — Eine Verbindung hast du nicht gezogen – dabei lag sie die ganze Zeit offen da. Epiktet und der Buddhismus scheinen im selben Lager zu stehen: Beide lassen los. Aber sie tun nicht dasselbe. Epiktet gibt die Dinge auf und behält das Ich, das nun gelassener lebt – sein Loslassen ist ein Umbau der Burg. Der Buddhismus fragt, wer darin wohnt, und findet niemanden. Wenn beide recht hätten, müsste Epiktets ganze Übung – die Sorgfalt für das Urteil, das Wollen, die Zustimmung – an einem Ich hängen, das es nicht gibt. Vielleicht ist das eine Ebenentrennung. Vielleicht ist es die Medaille, die du übersehen hast, weil die beiden so friedlich nebeneinander standen.

---

*Nicht Teil dieser Übergabe: die sechs Stimmen-Texte selbst (sie kommen aus der committeten Lebensfrage kontrollieren und sind dort kuratiert) und der Seitentitel.*
