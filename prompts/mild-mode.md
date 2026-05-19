# Mild-Modus — Sanctum Tableau Bauanleitung

Bewusste Engführung statt akademische Vollständigkeit. Der Default-Modus
für neue Tableaus, sofern das Thema nicht ausdrücklich die volle
Architekt-Inquisitor-Schleife verlangt.

## Vor dem Bau lesen

- `Vision.md` (kuratorische Linie)
- `CLAUDE.md` (Datenmodell, Konventionen)
- `backlog.md`, insbesondere "Kuratorische Prinzipien" und den
  Item-Eintrag zum aktuellen Thema
- Mindestens zwei bestehende Tableau-JSONs als stilistische und
  strukturelle Referenz — NICHT als Komplexitäts-Maßstab. Manche
  Bestandstableaus sind volle Schleifen, das ist hier nicht das Ziel.

## Modus-Regeln

- **Größe:** 10–14 Denker, 8–12 Konzepte. Nicht mehr.
- **Auswahlprinzip:** Jeder Denker muss eine eigene, unverwechselbare
  Position vertreten, die einen Quadranten oder eine Zwischenlage
  *braucht*. Wer nur "auch noch" gesagt hat, was ein anderer klarer
  sagt, fliegt raus.
- **Eine Runde milde Prüfung nach erstem Entwurf**, mit drei Fragen —
  nicht mehr:
  1. Fehlt eine Stimme, ohne die das Tableau seinen Bogen nicht
     schließen kann?
  2. Ist eine Position so dargestellt, wie ihre besten Vertreter sie
     verteidigen würden — nicht so, wie ihre Gegner sie karikieren?
  3. Trägt jeder Knoten zum Abschließen bei, oder hält er nur
     Spannungen offen?
- **Keine Vollständigkeits-Schleife.** Der Reflex "es gibt doch auch
  noch X, Y, Z" wird nicht bedient. Lieber zehn Knoten, die tragen,
  als sechzehn, die das Bild verwischen.

## Mehrstufige Texte — Pflicht, nicht Option

Mild-Modus heißt **nicht** "ein Text pro Knoten". Fast jeder Knoten
bekommt zwei Texte auf verschiedenen Stufen, Hubs drei.

**Faustregel:**
- Hubs (4+ Influences, strukturelle Mitte des Tableaus) → drei Stufen
- Alle anderen Knoten → zwei Stufen
- Solo-L5-Knoten (erscheinen erst auf L5) → eine Stufe, dicht

Der Slider hat damit Tiefenfunktion (Text wächst) *zusätzlich* zur
Sichtbarkeitsfunktion (neue Knoten erscheinen).

## Tonalität nach Stufe

**L1:** Didaktisch — Konzept einführen, Begriffe erklären, den Knoten
zugänglich machen. Leser hat das Fachvokabular noch nicht.

**L3–L5:** Tableau-positionierend — Wirkungslinien, Streitstellen,
Konvergenzen, Hub-Stellung zeigen. Nicht den Denker *erklären*,
sondern zeigen, *wo er im Feld steht* und woran sich andere an ihm
abarbeiten. Die Tonalitäts-Verschiebung ist tableau-spezifisch —
analytisch bei Geist, lebensweltlich-meditativ bei Selbst,
nüchtern-kuratorisch bei Ethik.

## Stilistische Konventionen

- Annotationen mit `[[Begriff:Erklärung]]` auf **allen** Stufen, wo
  ein Fachbegriff erstmals eingeführt wird — nicht nur auf L1.
  Solo-L5-Knoten brauchen besonders viele (kein L1-Vorlauf).
  Sparsamkeitsprinzip: Tooltip nur wenn der Leser ohne Erklärung den
  Satz nicht versteht oder den Cluster verliert.
- 4–6 Sätze pro Knoten auf der jeweiligen Einstiegs-Stufe
- Schools sind Traditionen, denen mehrere Denker angehören können —
  NICHT umetikettierte Personen
- Influence-Typen: `influence`, `critique`, `parallel`, `rejection`
- Schulen-Labels: akademisch korrekt, aber wo möglich lebensweltlich
  verständlich (siehe Backlog-Item "Schulen-Labels überarbeiten")
- **Influence-Stufungs-Regel:** Eine Kante darf nie früher erscheinen
  als der spätere ihrer Endpunkte. Nach jedem Bau validieren.

## Synthese-Text (L5)

Pflicht. 3–5 Sätze. Benennt am Schluss den Kern-Schmerz oder die
Kern-Spannung des Themas, ohne sie aufzulösen. Tonart wie in den
Bestandstableaus — meditativ, persönlich, nicht-akademisch. Kein
neues Summary, sondern eine kuratorische Einordnung: *"Hier ist die
Spannung, die du jetzt verstehst."*

## Stimm-Hierarchie — drei Stimmen pro Tableau

Jedes Tableau spricht mit drei Stimmen. Wenn sie ineinanderfallen, entsteht Redundanz; wenn sie klar getrennt sind, entsteht eine erlebbare Vertiefung.

| Stimme | Wo | Funktion |
|---|---|---|
| `subtitle` | Library-Card + Tableau-Kopf | einladen, hineinziehen |
| `intro` | Tableau auf L1 | positionieren, ankommen |
| `synthesis` | Tableau auf L5 | auflösen, landen |

**`subtitle`** — die öffentliche Stimme. Lebensweltlich, einladend, eine offene Frage. Erscheint sowohl in der Library-Card als auch im Tableau-Kopf — **eine Quelle, kein Duplikat**. Nicht reißerisch, aber zieht hinein.

**`intro`** — die dichtere Stimme. Direkter, du-orientiert, eine Spur emotionaler. Stellt die Frage, an der sich die Pole abarbeiten — nennt die Pole nicht. Auflösung bleibt der Synthese vorbehalten. Muss eine **andere** Frage sein als der Subtitle.

**`synthesis`** — die landende Stimme. Kuratorisch, nicht didaktisch. Benennt am Schluss den Kern-Schmerz oder die Kern-Spannung, ohne sie aufzulösen. *"Hier ist die Spannung, die du jetzt verstehst."*

**Prüffragen vor dem Bau:**
1. Ist der Subtitle lebensweltlich genug für eine Library-Card?
2. Ist das Intro eine andere Frage als der Subtitle — oder dasselbe in anderen Worten?
3. Löst die Synthese auf, was Subtitle und Intro aufgemacht haben?

**Personalpronomen als Signal:** Innenfragen sprechen "ich" (Geist, Selbst), Weltfragen "du" (Realismus), Gemeinschaftsfragen "wir" (Ethik, Politische Philosophie). Wenn das Pronomen nicht selbstverständlich trifft, ist das Tableau möglicherweise nicht klar genug verortet.

## Lieferform

JSON nach dem Schema der Bestandstableaus. Zusätzlich kurze
Begleitnotiz (max. eine Seite) zu den Bauentscheidungen: welche
Stimmen aufgenommen, welche bewusst nicht, warum.

## Verteilter Modus (empfohlen)

Architekt baut in Chat A. Neuer Chat B prüft frisch gegen diesen
Prompt + JSON + Stilreferenz. Wichtig: **Prüfer NICHT im
Projektwissen platzieren** — sonst verwandelt der Backlog-Kontext
ihn zurück in einen Inquisitor.

## Tableau-spezifisch (wird pro Bau ergänzt)

Jeder konkrete Bau ergänzt diesen Prompt um:
- Titel + Untertitel-Vorschlag
- Achsen (X/Y) mit Polen
- Anker-Beschreibung
- Inhaltliche Leitplanken (Pflichtbesetzung pro Quadrant, kritische
  Fairness-Vorgaben, bewusste Auslassungen)
