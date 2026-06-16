# Audit & Bestandesaufnahme — Sanctum Mentis

**Stand:** 2026-06-16 · **Art:** Status-Tracker (fortgeschrieben aus Audit 2026-06-16)
**Methode:** Inventar über `data/`, `data/lectio/`, `data/lebensfragen/`, `src/`, `prompts/` und 15 Wurzel-MD-Dateien; Abgleich Code ↔ Daten ↔ Dokumentation.

---

## 1. Bestand in Zahlen

| Ebene | Menge | Bemerkung |
|---|---|---|
| Topic-Tableaus (`data/*.json`) | 12 | alle in `library.json` + `data.ts` registriert — **konsistent** |
| Lectio-Dateien (`data/lectio/*.json`) | 21 | 15 registriert → **6 verwaist**, siehe H3 (offen) |
| Lebensfragen (`data/lebensfragen/*.json`) | 4 | alle 4 registriert — konsistent |
| Source-Dateien (`src/`) | 41 | — |
| Prompt-Dokumente (`prompts/`) | 6 | davon 4 zum Thema Lectio (überlappend) |
| MD-Dateien im Wurzelverzeichnis | 15 | Konventionen, Status, Begleitnotizen — vermischt |

Topic-Größen (Denker/Konzepte/Schulen/Einflüsse): Tableaus liegen meist im Mild-Korridor (10–16 Denker), einzelne im Hard-Bereich (`philosophie-des-geistes` 16/17/15/17).

---

## 2. Befunde nach Priorität

### 🔴 Hoch — wirken auf Korrektheit / führen Mitarbeitende (und Claude) in die Irre

**H1 · CLAUDE.md verweist auf die falsche, veraltete Lectio-Konvention.**

✅ **ERLEDIGT (2026-06-16):** CLAUDE.md verweist jetzt durchgehend auf `prompts/lectio-anleitung.md` (MASSGEBLICH). `lectio-mode.md` nur noch als „historische Detailreferenz erhalten, aber abgelöst" erwähnt. Versionsangabe „v1.9" entfernt. Kein Verweis auf lectio-mode mehr als gültig/maßgeblich.

*(Ursprünglicher Befund: CLAUDE.md Z. 137, 193, 210, 224 nannte durchgehend `prompts/lectio-mode.md` als maßgeblich und schrieb „aktuell v1.9". `lectio-anleitung.md` wurde in CLAUDE.md kein einziges Mal erwähnt.)*

---

**H2 · CLAUDE.md-Liste „Bestehende Lectios" stimmt nicht mit dem geladenen Bestand überein.**

✅ **ERLEDIGT (2026-06-16):** Liste synchronisiert — `annehmen-oder-ueberwinden` (Selbstverhältnis, erzählend-erfahrend) ergänzt; `warum-gehorchst-du-expositorisch` als „derzeit nicht in `data.ts` registriert, Status offen (siehe H3)" gekennzeichnet statt als live behauptet. Liste trägt jetzt Zähler „15 registriert in `data.ts`".

*(Ursprünglicher Befund: `warum-gehorchst-du-expositorisch` als live gelistet, aber in `data.ts` nicht registriert; `annehmen-oder-ueberwinden` registriert und live, aber in CLAUDE.md komplett fehlend.)*

---

**H3 · Sechs verwaiste Lectio-Dateien — Status ungeklärt.**

🟡 **ENTSCHEIDUNG OFFEN:** 6 `*-expositorisch`-Dateien in `data/lectio/`, nicht in `data.ts` registriert, keine aktive Route:
`der-weg-des-menschen-expositorisch`, `ist-der-andere-hoelle-oder-heimat-expositorisch`, `ruhe-oder-rausch-expositorisch`, `verstehen-oder-weitergehen-expositorisch`, `warum-gehorchst-du-expositorisch`, `wenn-nichts-vorgegeben-expositorisch`.

Vermutlich alte Vorläufer der erzählend-erfahrenden Umbauten. Zu entscheiden: nach `prompts/archiv/` bzw. `data/lectio/archiv/` verschieben (empfohlen, nicht löschen) oder einzeln live schalten. `warum-gehorchst-du-expositorisch` ist in CLAUDE.md als Vergleichsfall erwähnt — hängt mit dieser Entscheidung zusammen. Eigener kleiner Faden.

---

### 🟡 Mittel — Konventionsbruch / Doppelung, kein akuter Fehler

**M1 · Schools-Konvention wird breit verletzt, ohne dokumentierte Ausnahme.**

🟡 **ENTSCHEIDUNG OFFEN — ⚠️ NICHT automatisch „korrigieren".** Solo-Schulen können bewusste Konstruktion sein (vgl. das ankerlose Wahre Selbst, Einzelpositionen im Hard-Mode-Tableau). Daten nicht an die Regel anpassen, ohne kuratorisches Urteil. Zu entscheiden: Konvention nachschärfen/relativieren **oder** bewusste Ausnahmen in `topic.meta` festschreiben. Kuratorisch, eigener wacher Faden — betrifft 61 Solo-Schulen über 12 Tableaus (sauberstes: `begegnung` mit 1/5, kritischstes: `das-selbst` mit 12/13).

*(Solo-Schulen / Schulen gesamt je Topic: das-selbst 12/13 · philosophie-des-geistes 14/15 · ethik 8/10 · politische-philosophie 8/10 · realismus-und-konstruktivismus 7/9 · verwandlung 7/8 · selbstverhaeltnis 6/8 · wandlung 5/8 · gut-und-boese + lebenskunst 4/7 bzw. 4/6 · existenzialismus 3/7 · begegnung 1/5)*

---

**M2 · Lectio-Dokumentation ist ein vierfach überlappender Stapel.**

🟢 **HYGIENE:** Archiv-Dateien (`lectio-mode.md` v1.11, `lectio-2.0-richtlinie.md`) nach `prompts/archiv/` verschieben; ~10 Verweise in anderen MD-Dateien auf `lectio-anleitung.md` umbiegen. `schreib-skill-lectio.md` bleibt (Handwerk-Companion, kein Konflikt). Cowork-Kandidat. Eigener Faden — nicht in diesem Durchgang.

---

### 🟢 Niedrig — Hygiene & kuratorische Abgrenzung (kein Bug)

**N1 · Thematische Nähe-Cluster — Abgrenzung prüfen.**

🟢 **HYGIENE / kuratorisch:** Mehrere Tableaus inhaltlich dicht beieinander (wandlung ↔ verwandlung; das-selbst ↔ selbstverhaeltnis; ethik ↔ gut-und-boese). Abgrenzungssätze je Paar in `library.json`-`desc` oder `bibliothek-architektur.md` festhalten. Niedrige Priorität.

---

**N2 · Wurzelverzeichnis vermischt drei Doku-Sorten.**

🟢 **HYGIENE:** 15 lose MD-Dateien mischen lebende Konventionen, Status/Fortschritt und Bau-Begleitnotizen. Organisationspotenzial: `docs/konventionen/`, `docs/status/`, `docs/begleitnotizen/`. Cowork-Kandidat. Eigener Faden.

---

**N3 · Mögliche Schema-Doppelquelle.**

🟢 **HYGIENE:** `schema-referenz.md` im Kopf als „abgeleitet aus `src/lib/types.ts` (Single Source of Truth)" kennzeichnen. Einzeiler — verhindert Drift-Risiko bei zwei Quellen.

---

## 3. Was sauber ist (zur Beruhigung)

- Topic-Registrierung: `library.json` ↔ `data.ts` ↔ Dateien — 12/12 stimmig.
- Lebensfragen: 4/4 stimmig.
- `begegnung` ist das schulkonventions-sauberste Tableau (1/5 Solo).
- Klare `server-only`-Trennung in `data.ts`, separater client-sicherer `searchTypes.ts` — Architektur-Disziplin sichtbar eingehalten.

---

## 4. Empfohlene Reihenfolge (aktualisiert)

1. ~~**H1 + H2**~~ ✅ erledigt 2026-06-16
2. **H3** — Status der 6 `*-expositorisch`-Dateien entscheiden (live / Archiv).
3. **M2** — Lectio-Doku-Stapel aufräumen (Archiv-Ordner), ~10 Verweise umbiegen.
4. **M1** — Schools-Konvention als bewusste Entscheidung klären (nachschärfen vs. `topic.meta` füllen).
5. **N1–N3** — Hygiene, wenn Zeit ist.
