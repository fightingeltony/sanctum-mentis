# v2-Erweiterung aller Tableaus — Etappenabschluss

**Status:** Archiv — aufgegangen in mild-mode v2 (Stand Mai 2026).

**Datum:** 18.–19.5.26
**Umfang:** Vier Tableaus (Ethik, Selbst, Realismus, Geist)
**Anlass:** Tooltip-Renderer-Bug bei Ethik, Selbstbeobachtung am Live-Tool: Slider ab L3 ohne Wirkung

Diese Notiz fasst die v2-Erweiterung als methodische Etappe zusammen. Die vier Einzel-Begleitnotizen bleiben als Detail-Dokumente erhalten — dieser Beleg überspannt sie.

---

## Auslöser

Beim Live-Test des frisch gebauten Ethik-Tableaus (v1) fielen zwei Befunde auf, die zusammen die Etappe auslösten:

1. **Slider ab L3 stumm:** Ab Stufe 3 änderte sich nichts mehr — alle Knoten hatten je nur einen Text auf ihrer `firstLevel`. Im Vergleich zu Realismus, das den Slider bis L5 mit Tiefenfunktion bedient, fiel das deutlich ab.
2. **Tooltip-Renderer-Bug:** Die `[[Begriff:Erklärung]]`-Annotationen in Ethik wurden vom Renderer verschluckt — der Anker-Text verschwand mitsamt der Klammer. Bei Realismus mit alter Syntax `[[Begriff Erklärung]]` funktionierte das Rendering.

Beide Befunde gehörten zusammen: Sie zeigten, dass die Mild-Modus-Konvention nur teilweise umgesetzt war und der Renderer mit zwei konkurrierenden Syntaxen kämpfte.

---

## Eingriff

Die v2-Erweiterung folgte einer einheitlichen Konvention, angewandt auf alle vier Tableaus mit jeweils tableau-spezifischer Gewichtung:

1. **Annotations-Syntax** durchgängig auf `[[Begriff:Erklärung]]` mit Doppelpunkt-Trenner umgestellt — ein einheitliches Pattern für den Renderer
2. **Mehrstufige Texte** dort ergänzt, wo nur ein Text pro Knoten existierte — Realismus-Konvention als Vorlage
3. **Tooltips bis L5** systematisch verteilt — vorher meist auf L1–L2 konzentriert, jetzt über alle fünf Stufen
4. **Stufungs-Konsistenz** geprüft und repariert — eine Influence-Stufe in Realismus (locke→berkeley) war fehlplatziert

---

## Vorher / Nachher

| Tableau | Annotationen v1 | Annotationen v2 | Mehrstufige Knoten v1 | Mehrstufige Knoten v2 | Aufwand |
|---|---|---|---|---|---|
| **Ethik** | 21 (Mischformat) | 21 (neu) | gemischt | 12 / 13 Denker, Kant 3-stufig | Vollbau (v1 + Erweiterung) |
| **Selbst** | 20 (alt) | 42 (neu) | 0 / 15 Denker | 13 / 15 Denker, drei Hubs 3-stufig | Großer Lauf |
| **Realismus** | 24 (gemischt) | 37 (neu) | 12 / 13 Denker | unverändert | Kleiner Lauf |
| **Geist** | 22 (nur L1–L2) | 73 (alle Stufen) | 16 / 16 Denker | unverändert | Tooltip-Lauf bis L5 |

Die Häufung bei Geist (von 0 auf 51 zusätzliche Tooltips auf L3–L5) spiegelt die analytische Reife des Tableaus — die zeitgenössische Bewusstseinsdebatte (Tononi, Metzinger, Clark) führt besonders viele Spezialbegriffe ein.

---

## Drei Konventionen, die sich herauskristallisiert haben

Aus den vier Läufen lassen sich drei Konventionen formulieren, die für künftige Tableaus gelten sollten — sowohl bei Neuaufbau als auch bei v2-artigen Erweiterungen.

### 1. Mehrstufige Texte sind die Regel

Mild-Modus heißt **nicht** "ein Text pro Knoten". Die Realismus-Vorlage zeigt: Fast jeder Knoten bekommt zwei Stufen, zentrale Hubs drei. Der Slider gewinnt damit eine Tiefenfunktion zusätzlich zur Sichtbarkeitsfunktion.

**Faustregel:** Hubs (4+ Influences, strukturelle Mitte) bekommen drei Stufen; alle anderen Knoten je zwei; Solo-L5-Knoten bleiben einstufig.

### 2. Tonalität auf höheren Stufen

L1-Texte sind didaktisch: Konzepte einführen, Begriffe erklären, den Knoten an sich zugänglich machen.

L3–L5-Texte sind **tableau-positionierend**: Wirkungslinien, Streitstellen, Konvergenzen, Hub-Stellung. Nicht den Denker erklären, sondern zeigen, wo er im Feld steht und woran sich andere an ihm abarbeiten.

Diese Tonalitäts-Verschiebung ist nicht starr, sondern tableau-spezifisch:
- **Geist** (analytisch): "Ein System ist genau dann und in dem Maße bewusst, wie es Φ realisiert."
- **Selbst** (lebensweltlich-meditativ): "Verwandte Topologie", "geteilte Diagnose".
- **Realismus** (philosophisch-streng): "Strukturelle Passung zwischen Welt und Geist."
- **Ethik** (nüchtern-kuratorisch): "Hub-Stellung", "strukturelle Mitte".

### 3. Tooltips bis L5 — sparsam, aber gezielt

Annotationen gehören nicht nur auf L1 (Einsteiger-Begriffe), sondern auch auf L3–L5 dort, wo der Text einen Fachbegriff erstmals einführt, der ohne Erklärung den Leser ausschließen würde.

**Solo-L5-Knoten brauchen besonders viele Tooltips**, weil sie ohne L1-Vorlauf erscheinen und ihre Spezialtermini im Moment der ersten Erwähnung erklären müssen.

**Sparsamkeit bleibt Prinzip:** Nicht jeder Begriff verdient einen Tooltip. Pro Tooltip die Frage stellen: Wird der Leser ohne diese Erklärung den Satz nicht verstehen oder den Text-Cluster verlieren? Wenn nicht, kein Tooltip.

---

## Methodische Lessons

### Die Influence-Stufungs-Regel

Eine Kante darf nie früher erscheinen als der spätere ihrer Endpunkte. Mehrfach in den Läufen geprüft und einmal korrigiert (Realismus: locke→berkeley war auf L1, musste auf L2). Bei jedem Tableau-Bau standardmäßig validieren.

### Distinct vs. Solo-L5

Im Selbst-Lauf wurde klar: "Rohr bleibt Solo-L5" ist keine Schwäche, sondern eine Aussage. Manche Knoten gehören ans Ende — ihre erste Begegnung passt nicht früher. Sie bekommen einen einzigen, dichten Text und keinen zweiten. Nicht jeder Knoten muss zweistufig sein, um die Konvention zu erfüllen.

### Bauen ohne den Renderer

Im Lauf der Etappe wurde sichtbar: Wenn das JSON-Bauen vom Renderer entkoppelt ist, kann man Annotationen ergänzen, die der Renderer noch nicht beherrscht. Das ist okay, solange die Annotationen syntaktisch konsistent sind — der Renderer wird sie spätestens beim nächsten Bug-Fix-Lauf richtig bedienen. **Was im JSON syntaktisch sauber ist, bleibt — auch wenn das Frontend gerade noch hinterherhinkt.**

### Verteilter Mild-Modus skaliert

Architekt baut, externer Prüfer-Chat (ohne Projektwissen) prüft gegen Mild-Prompt und Bestands-JSON. Hat sich bei Ethik bewährt — nicht bei den v2-Läufen explizit eingesetzt, aber als Grundprinzip durchgehalten: Nicht der Erstwurf zählt, sondern die zweite Sicht.

---

## Was diese Etappe schließt

- **Annotation-Rendering als Tooltip** — Renderer-Fix abgeschlossen. Markdown-Italic, `[[Begriff:Erklärung]]`-Tooltip, Tooltips auf allen Levels.
- **Lebensweltliche Eingangs-Anker** — `topic.intro`-Feld implementiert, alle vier Tableaus befüllt.
- **Stufen-Wechsel-Indikator** — `↑ Vertieft`-Tag + Filter + Fade-Animation für Textänderungen beim Slider-Wechsel.
- **Mehrstufige Texte als Regel** — in `prompts/mild-mode.md` aufgenommen.

## Was offen bleibt

- **Glossar-Tab (Tab V)** — mit 173+ Tooltips über vier Tableaus jetzt deutlich lohnenswerter als bei Identifikation (14.5.26).
- **Schulen-Labels Geist-Tableau** — lebensweltlicher formulieren.
- **Polare Eingangs-Karte** — `intro`-Feld löst den lebensweltlichen Anker, aber nicht den polaren Kontrast.
