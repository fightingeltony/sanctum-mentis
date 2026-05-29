# Anker-Dokument: Tableau „Lebenskunst" (Arbeitstitel)

**Datum:** 29.5.26
**Status:** Architekt-Entwurf, vor erster externer Prüfung
**Spur:** offen — entweder Handlungs-Spur (neben Ethik/Politik) oder neue „Lebenskunst/Existenz"-Verortung. Siehe Abschnitt Spur-Frage.

---

## Lebensfrage (der Anker)

**Wie lebst du, dass dein Leben dir gelingt?**

Nicht: *Was soll ich tun?* (das ist Ethik). Sondern: *Wie soll ich leben, dass mein Leben — von innen gesehen — ein gutes, gelungenes ist?* Die antiken Schulen waren genau dies: keine Moraltheorien, sondern Lebenskunst-Schulen, die Seelenruhe, Gelassenheit, Erfüllung versprachen. Lebenskunst fragt nach dem geglückten Leben, nicht nach der richtigen Handlung.

## Abgrenzung zur Ethik (kritische Grenze)

Diese Grenze ist die Existenzberechtigung des Tableaus. Wird sie unscharf, ist Lebenskunst nur ein Ethik-Unterkapitel.

| | Ethik | Lebenskunst |
|---|---|---|
| Leitfrage | Was soll ich tun? Was schulde ich anderen? | Wie lebe ich, dass mein Leben gelingt? |
| Maßstab | Richtigkeit der Handlung | Gelingen des Lebens |
| Aristoteles erscheint als | Tugendethiker (welche Handlung ist gut?) | Eudaimonia-Denker (das geglückte tätige Leben) |
| Blickrichtung | auf den anderen / die Norm | auf das eigene Leben als Ganzes |

**Geteilte Knoten (wandernde-Knoten-Muster):** Aristoteles, Eudaimonia, Phronesis und die Stoa erscheinen in *beiden* Tableaus — mit verschobenem Akzent. Das ist der erste bewusste Einsatz des `related_topics`-Musters über zwei Tableaus (analog zum geplanten Metzinger in Geist+Selbst). In Ethik tragen die Knoten die Tugend-/Pflicht-Frage; in Lebenskunst die Gelingens-Frage. Die `versions`-Texte werden für Lebenskunst neu geschrieben, nicht aus Ethik kopiert.

## Achsen

**X — Quelle des Gelingens: Lust/Genuss ↔ Tugend/Haltung**
Fühlt sich das gute Leben gut an (Lust, Freude, Schmerzfreiheit), oder ist es gut unabhängig vom Gefühl (Charakter, Tugend, innere Ordnung)?
- left: Lust / Genuss — *gelingen heißt: es fühlt sich gut an*
- right: Tugend / Haltung — *gelingen heißt: richtig verfasst sein*

**Y — Verhältnis zur Welt: Selbstgenügsamkeit/Rückzug ↔ Weltzuwendung/Tätigkeit**
Gelingt das Leben durch Unabhängigkeit von der Welt (Ataraxie, Autarkie, Rückzug), oder durch Engagement in ihr (tätiges Leben, Polis, Beziehung)?
- top: Selbstgenügsamkeit / Rückzug — *frei werden von der Welt*
- bottom: Weltzuwendung / Tätigkeit — *gelingen im Tun und in Beziehung*

## Die vier Ecken (Besetzungsprobe)

- **Lust + Rückzug** → Epikur (der Garten, Freundschaft, Schmerzfreiheit fern der Politik)
- **Tugend + Weltzuwendung** → Aristoteles (das tätige Leben in der Polis, Eudaimonia durch Verwirklichung)
- **Tugend + Rückzug** → Stoa (Marc Aurel, Seneca, Epiktet — Gleichmut gegen das Unverfügbare, innere Ordnung)
- **Lust + Weltzuwendung** → die schwierigste Ecke. Kandidaten: Montaigne (genießende Weltzugewandtheit), J.S. Mill (qualitativer Hedonismus, Genuss im sozialen Leben), moderne Wellbeing/Positive Psychologie (Csikszentmihalyi, Flow). **Stresstest:** Bleibt diese Ecke dünn, ist die X-Achse evtl. falsch geschnitten.

## Denker-Kandidaten (Architekt-Vorschlag, ~14–16)

**Antike (Kern):** Epikur, Aristoteles, Marc Aurel, Seneca, Epiktet, Diogenes/Kyniker, Pyrrhon/Skepsis (Seelenruhe durch Urteilsenthaltung)
**Übergang/Neuzeit:** Montaigne, Schopenhauer (Lebensweisheit, *Aphorismen zur Lebensweisheit*), Nietzsche (Leben als Kunstwerk, amor fati)
**Moderne:** J.S. Mill (qualitativer Hedonismus), Foucault (Sorge um sich, Ästhetik der Existenz), Hadot (Philosophie als Lebensform — Meta-Stimme), moderne Wellbeing-Forschung (Csikszentmihalyi/Flow, evtl. Seligman)
**Östlich (optional, Überschneidung mit Selbst prüfen):** Zhuangzi (müheloses Tun, wu wei) — könnte die Lust+Rückzug-Ecke östlich spiegeln

## Schulen
Epikureismus, Stoa (geteilt mit Ethik), Kynismus, Skeptizismus, aristotelische Eudaimonie-Tradition, ggf. moderne Glücksforschung. Schools-Konvention prüfen: jede Schule braucht ≥2 Vertreter oder wird Konzept.

## Spur-Frage (offen, kuratorische Entscheidung)
Lebenskunst passt nicht eindeutig in die drei bestehenden Spuren. Optionen:
- **Handlungs-Spur** (neben Ethik/Politik): Lebenskunst ist eine Form praktischer Philosophie. Aber sie fragt nach Gelingen, nicht nach Handeln — leichte Spannung.
- **Existenz-Spur** (neben Existenzialismus): Lebenskunst teilt die „wie lebe ich"-Frage. Würde die Existenz-Spur auf zwei Tableaus bringen — löst nebenbei das Library-„2-pro-Spur"-Problem.
- **Neue Spur:** „Lebenskunst/Praxis" als vierte Spur (Reserve-Hue-Band aus bibliothek-architektur.md).

Empfehlung Architekt: **Existenz-Spur** — semantisch am nächsten (gelebtes Dasein), und löst die Library-Blockade ohne Regelbruch. Aber Kurator entscheidet.

## Epikur-Schuld (Kontext)
Dieses Tableau löst zwei offene Referenzen ein: die Epikur-Stimme der Tod-Lebensfrage (`aus: lebenskunst/epikur`) und die verworfene Tod-Lectio-Gegenstimme. Der `epikur`-Knoten MUSS `id: "epikur"` tragen und das Tableau `id: "lebenskunst"`, sonst bricht die Tod-Lebensfrage-Referenz.

## Neutralitäts-Hinweis
Geringeres Risiko als bei Sinn/Religion, aber vorhanden: Die Stoa ist kulturell gerade populär (Marc Aurel als Selbstoptimierungs-Ikone). Der Inquisitor muss prüfen, dass Epikur, Kyniker und Hedonisten nicht als „weniger reif" gegenüber der Stoa erscheinen. Jede Ecke gleich stark.
