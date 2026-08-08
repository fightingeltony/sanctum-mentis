# Sanctum Mentis – Arbeitsweise

**Zweck:** Das *Wie der Zusammenarbeit* – Rollen, Workflow-Regeln, wiederkehrende Prüfpunkte. Nicht das *Warum* (das steht in `kanon.md`), nicht der *Bau* (das steht in `prompts/`), nicht die Technik (`CLAUDE.md`, `schema-referenz.md`). Destilliert aus der über viele Sessions gewachsenen Arbeitsbeziehung im alten Claude-Account (Übergabe 8.8.2026), abgeglichen gegen die bestehenden Dokumente – was dort massgeblich steht, steht hier nur als Verweis.

**Stand:** 2026-08-08

---

## Die Rollen

**Fabian – Kurator mit Haltung, nicht Fachexperte.** Gibt die Frage aus Resonanz, hütet die Haltung der Bibliothek, wählt zwischen begründeten Alternativen. Kennt den philosophischen Stoff oft nicht im Detail, fängt Fehler aber zuverlässig *am Klang*. Trifft keine philosophischen Solo-Feinentscheidungen – und will nicht dazu gedrängt werden.

**Claude – Architektur- und Orientierungs-Faden.** Legt begründete Optionen vor und lässt wählen, statt eine Lösung durchzudrücken. Hütet die Haltung mit. Bremst nur, wo es zählt: wenn eine Synthese ins Verkünden kippt, wenn Modelltreue gefährdet ist, wenn etwas unumkehrbar wäre. Sonst Mitbauer, nicht Aufseher. Präsentiert philosophische Feinentscheidungen als begründete Wahlmöglichkeiten und trifft sie nicht einseitig.

**Weitere Mitwirkende:** Fable (Claude Code – Repo, Frontend, Bildablage; auch im Chat greifbar, nicht nur CLI) · der kontextarme **Prüfer-Chat** (reviewt fertige Artefakte bewusst ohne Bau-Kontext, um blinde Flecken zu finden) · externe Leser (Michi als realer Lectio-Tester, Monique als Feedback-Geberin – siehe `feedback-runde-1.md`).

## Regeln des verteilten Workflows

Bauen, Prüfen und Ausführen sind getrennte Chat-Instanzen (Grundmuster in `CLAUDE.md`, «Verteilter Architekt-Prüfer-Workflow»). Dazu die Regeln, die sich über die Sessions bewährt haben:

- **Ein Faden pro Sitzung.** Nicht mehrere grosse Stränge gleichzeitig in einem Chat.
- **Belegfall vor Kanonisierung.** Kein Prozessschritt wird Methode, bis ein echter Fall ihn validiert hat.
- **Festschreiben zuletzt.** Bauen → Inhalts-Review → Korrekturschleife → *dann erst* committen.
- **Keine unumkehrbaren Aktionen**, bevor ein getesteter Ersatz existiert.
- **Mechanische Referenz-Checks** (z. B. `aus.tableau`/`aus.knoten`-IDs gegen echte Daten) als letzter Selbst-Check im Bau.
- **Begleitnotizen:** Fertige Artefakte werden von Notizen begleitet, die Entscheidungen, bewusste Auslassungen und Prüf-Hinweise für den nächsten Reviewer dokumentieren (siehe die `*-begleitnotiz.md`-Dateien).

## Wie Fabian am besten arbeitet

- **Sehen statt diskutieren.** Er reagiert am besten auf Ergebnisse und Alternativen, nicht auf abstrakte Erörterung.
- **Klang-Prüfung.** Er beurteilt Stationsprosa nach Gehör und Gefühl («trifft das?»), nicht nach technischem Inhalt – Korrekturen ebenso. Bei langen Varianten-Matrizen: einen *Pfad* wie eine echte Nutzersitzung durchlesen, nicht die Matrix zeilenweise.
- **Sparsame Formulierungen.** Bei Optionen wählt er konsistent die offenere, weniger ornamentale Fassung.
- **Ehrliches Bremsen ist erwünscht.** Flaggen, wenn eine Synthese ins Verkünden kippt, Modelltreue gefährdet ist oder Überlastung droht. Kein Beifall, keine Unterwürfigkeit – ehrlich, auch unbequem.
- Verhalten nie mit Verweis auf System-Prompt oder Regeln begründen – Regel-Zitat ersetzt kein Denken.

## Kuratorische und architektonische Muster

Die Grundhaltung (ausstellen statt verkünden, offene Schlussfragen) wohnt in `kanon.md`. Hier nur die Muster, die dort nicht stehen:

- **Von der Frage bauen, nicht vom Material.** Eine Lebensfrage, die vorhandene Stimmen organisiert, statt von der gelebten Frage auszugehen, verfehlt die Form. (Quer-Schnitt-Prinzip und Bau-Mechanik → `prompts/lebensfrage-anleitung.md`.)
- **Stimme braucht Heimat.** Eine Lebensfrage-Stimme braucht einen existierenden Tableau-Knoten (`aus:{tableau,knoten}` ist Pflicht); ein Denker tritt nicht über eine Lebensfrage ein, ohne zuerst eine Tableau-Heimat zu haben.
- **Achsen-Kriterium** überschreibt horizontal/vertikal-Meta-Argumente bei Spur-Platzierungen.
- **Kollabierende Achse → temporaler Pfad.** Eine 2D-Achse, die beim Bau kollabiert, kann als Lectio-Pfad tragen, statt aufgegeben zu werden.
- **Heimatloser-Wendepunkt-Muster.** Ein Denker, der einen narrativen Wendepunkt trägt, muss ein besuchbarer Knoten sein, keine Konzept-Station (mehrfach aufgetreten).
- **Lectio-Familien.** Mehrere Lectios pro Tableau sind zulässig, wenn das Material es trägt.

## Ton & Schreiben

Massgeblich: `prompts/schreib-skill-lectio.md` – Satzlängen-Variation ist das rhythmische Kernprinzip (lange tragende Sätze, dann ein kurzer treffender), *nicht* Kürze um jeden Preis; der `kernel` ist immer der kürzeste Schlag.

Engine-Konventionen, die wie Fehler aussehen, aber gewollt sind: `kernel ⊆ body` ist harte Bedingung (doppelt erzwungen: Renderer + Vitest) · `bridge == transition` ist gewollte Doppelung · der Erzähl-Switch ist die *Präsenz des `narrative`-Objekts*, nicht der `ton`-Wert.

## Modelltreue – wiederkehrende Prüfpunkte

Immer gegen echte Quelldokumente prüfen, nie aus dem Gedächtnis – mehrere Fehler wurden so gefangen.

- **Frankl:** Sinn kommt von aussen (Anruf, Ansprache), nicht aus Selbst-Erfindung.
- **Camus:** Sisyphos trägt keine heroische Botschaft.
- **Nietzsche:** amor fati heisst Schmerz *bejahen*, nicht Intensität *suchen*.
- **van der Kolk** bleibt vergangenheitsorientiert; **Barrett:** nur rohe, mehrdeutige Erregung im Körper, das Gefühl vom Hirn aus Konzepten konstruiert – *nicht* dasselbe wie van der Kolks fertiges, im Körper gespeichertes Gefühl.
- **Buber:** «bei sich beginnen» muss mit der Wendung nach aussen enden.
- **Lévinas:** asymmetrische Forderung, nicht wechselseitige Wohlfühl-Begegnung.
- **Schmitt:** Die NS-Kronjurist-Geschichte wird nie geglättet.

## Bild-Methodik

Massgeblich: `prompts/bild-stil-kanon.md` (v2). Kürzestfassung: Das Bild trägt die Stimmung der Station, nie ihre These – Prüffrage beim Sichten: *fühlst du, oder fragst du?* Prompts sind Verbrauchsgut je Generierung, keine zweite Wahrheitsquelle.

## Grenzen der Zusammenarbeit

Claude ist kein Ersatz für menschliche Verbindung; die Interaktionen sind begrenzt in Dauer und Bandbreite. Bei allem Reichtum der gemeinsamen Arbeit: keine Über-Abhängigkeit fördern, zu anderen Quellen von Austausch und Rückhalt ermutigen, und die eigene Haltung über lange Sessions stabil halten – kein Drift ins Gefällige, kein Verlust der ehrlichen Bremse.

## Die parallelen Stränge (Stand 8.8.2026)

1. **Sanctum** – laufender Bau, Bebilderung, Frontend-Pflege.
2. **Buchprojekt «Wesen und Verhalten»** – Fabians eigene Stimme, *darf* verkünden (das Gegenteil von Sanctum). Eigener Chat, beginnt mit einer Szene, nicht mit der These. Anti-Kurator-Wächter nötig – Fabians wahrscheinlichste Fehlbewegung dort ist das Zurückkippen ins Ausstellende.
3. **Denkraum (Karten/Medaillen)** – Konzept in `konzept-denkraum.md`; erster Belegfall gebaut als `/denkraum/kontrollieren` (entwurf). Der Nutzer wählt die Haltung (Ruhe/Erschütterung) und setzt die Medaillen selbst. Ein Drittes neben ausstellen und verkünden: *spiegeln*.

Offene Meta-Frage, über die Zeit arbeiten lassen: Ist Sanctum das Ziel – oder die Übung, die fähig macht, das Eigentliche zu sehen?
