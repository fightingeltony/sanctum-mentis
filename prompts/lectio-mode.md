# Lectio-Modus — Sanctum-Standard für geführte Pfade

**Status:** Konvention v1.4, Mai 2026
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

## Neun methodische Entscheidungen

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

### 4. Stilbruch zwischen Lectio-Stimme und Knoten-Text — methodisch markiert

Im Lesefluss stehen zwei Textsorten nebeneinander:

- **Übergangstexte** (neu für die Lectio): du-orientiert, kurz, kuratorisch bewertend
- **Knoten-Texte** (aus dem Tableau-JSON): er/sie-orientiert, nüchtern, akademisch-beschreibend

Der Stilbruch wird **nicht eliminiert**, sondern **methodisch markiert**: Die Lectio-Stimme umrahmt, der Knoten-Text steht als eigenständiger Block dazwischen. Frontend und Typografie können diesen Wechsel sichtbar machen — die Lectio-Stimme in Akzentfarbe, der Knoten-Text im normalen Lesemodus.

**Verworfene Alternativen:**
- **B) Selektive Neu-Texte** — Knoten-Texte nur für Lectio-Stationen und nur auf der Lectio-`level`-Stufe neu schreiben. Schlanker als volle Doppelpflege, aber: Jede Änderung am Tableau-JSON erfordert dann eine separate Lectio-Prüfung. Zwei Wahrheiten über denselben Knoten, die auseinanderdriften können. Verworfen wegen Pflege-Risiko.
- **C) `summary_lectio`-Feld im Knoten-Schema** — optionales Feld, das auf Standard-Text zurückfällt, wenn leer. Elegant, aber: Verschiebt die Pflegelast in den Datensatz, statt sie zu eliminieren. Würde das Knoten-Schema aufblähen für einen Anwendungsfall, der selten ist. Verworfen wegen Schema-Komplikation.

**Entscheidung A** ist die bewusste Wahl: Der Stilbruch bleibt, wird aber durch Typografie sichtbar gemacht — Lectio-Stimme in Akzentfarbe, Knoten-Text als abgesetzter Block. Zwei Stimmen, zwei visuelle Zonen. Das ist Form, nicht Fehler.

**Konvention für Übergangstexte:** Immer du-Ton. Immer kuratorisch bewertet — kein neutrales "Als nächstes folgt X", sondern eine Aussage über die Funktion des nächsten Knotens im Bogen. 1–3 Sätze.

---

### 5. `level`-Semantik — Lese-Stufe, nicht Sichtbarkeits-Schwelle

`level` in einer Lectio bedeutet: **Lese-Stufe der Knoten-Texte**. Die Lectio zeigt den Text auf dieser Stufe.

Das ist nicht identisch mit der Tableau-Sichtbarkeitslogik (wo Knoten erst ab `firstLevel` auftauchen). Lectio kann Knoten aufnehmen, die im Tableau erst auf höheren Stufen sichtbar sind — z.B. Metzinger (`firstLevel: 5`) in einer L2-Lectio.

**Fallback-Regel:** Wenn ein Knoten keinen Text auf der Lectio-`level`-Stufe hat, wird der Text der **niedrigsten verfügbaren Stufe ≥ firstLevel** gezeigt. Metzinger in einer L2-Lectio zeigt den L5-Text — seinen einzigen. Das ist ehrlich: Lectio überschreibt die Tableau-Sichtbarkeit, weil sie kuratorisch entschieden hat, diesen Knoten an dieser Stelle zu zeigen.

**`level` als Anspruchsindikator für den Nutzer:** Zusätzlich signalisiert `level` die kognitive Anspruchsstufe — L2 ist Grundlagen, L3 Vertiefung. Das hilft dem Nutzer bei der Entscheidung, welche Lectio zu ihm passt.

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

**Konvention für konfrontative Lectios:** Lass jede Stimme ihre eigene Position einnehmen, nicht eine Funktion im Bogen erfüllen. Die Closing Synthesis darf vier Antworten nennen, ohne sie in drei zusammenzudrängen, weil das didaktisch glatter klingt. Auch wenn der Bogen nicht *sauber* schließt — das ist ehrlicher als eine gebogene Position.

**Hinweis zur Pfad-Länge in konfrontativen Lectios:** Hier ist die Antagonismus-Asymmetrie aus den Größen-Richtwerten besonders relevant — 4 Stationen können vollständig sein, jede weitere verwässert die Konfrontation.

---

## Das Lectio-Schema

```json
{
  "id": "lectio-id",
  "tableauId": "tableau-id",
  "title": "Titel des Pfades — benennt den Pfad, nicht das Tableau",
  "focus": "Kurzer Halbsatz zum kuratorischen Ausschnitt",
  "thesis": "Ein Satz — worum es in dieser Lectio wirklich geht",
  "level": 2,
  "estimated_minutes": 15,
  "intro": "Kuratorischer Einstieg, du-Ton, 3–5 Sätze. Benennt die Frage, die die Lectio trägt.",

  "path": [
    {
      "nodeId": "knoten-id",
      "nodeType": "thinker",
      "transition": "Übergangstext nach diesem Schritt. Du-Ton, kuratorisch bewertet, 1–3 Sätze."
    },
    {
      "nodeId": ["knoten-id-a", "knoten-id-b"],
      "nodeType": "thinker",
      "transition": "Übergang nach der Doppelstation."
    }
  ],

  "closing_synthesis": "3–5 Sätze. Lectio-eigene Landung — keine Leihgabe aus dem Tableau. Nennt nur Knoten aus dem Pfad.",

  "closing_question": "Die Schlussfrage. Öffnet emotional, was kognitiv geschlossen wurde. Keine Antwort erwartet."
}
```

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
