/**
 * Sanctum Mentis – Daten-Integritäts-Tests (Regeln 11–21)
 *
 * Ergänzt data-validation.test.ts um die Lücken aus dem Review vom 6.9.26.
 * Nummerierung setzt die Tabelle in schema-referenz.md (Abschnitt 5) fort.
 *
 * 11. Typografie-Norm: kein Geviertstrich, kein ß in Datenstrings
 * 12. Tableau-Struktur: eindeutige IDs, schoolId, versions[firstLevel], Level-Bereiche, Koordinaten, kein `filled`
 * 13. Concept.primaryThinker zeigt auf einen Denker im Tableau oder in einem related_topics-Tableau
 * 14. Influence.from/to sind Thinker- oder Concept-IDs (Konzepte erlaubt seit 6.9.26, Schulen nicht)
 * 15. Annotationen: balancierte [[…]], Term ≤ 8 Wörter, Term und Definition nicht leer
 * 16. Lectio image_status-Parität (image ↔ generiert, image_prompt ohne image ↔ prompt-neu)
 * 17. step_brief nur auf Einzelknoten-Stationen
 * 18. narrative.bridge == transition; ton 'gemischt' → jede Station trägt ton
 * 19. Registrierungs-Parität: library.json ↔ data/*.json ↔ TOPICS; Lebensfragen und Denkräume ↔ data.ts
 * 20. Lebensfragen: aus.tableau / aus.knoten existieren, kuratiert_aus_tableaus stimmt
 * 21. Denkraum-Tisch: Quelle, Karten, Stellen, Verortung, Haltungen referenziell vollständig
 */

import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

// ─── Pfade ────────────────────────────────────────────────────

const PROJECT_ROOT   = path.resolve(__dirname, '../../..')
const DATA_DIR       = path.join(PROJECT_ROOT, 'data')
const LECTIO_DIR     = path.join(DATA_DIR, 'lectio')
const LEBENSFR_DIR   = path.join(DATA_DIR, 'lebensfragen')
const DENKRAUM_DIR   = path.join(DATA_DIR, 'denkraum')
const DATA_TS        = path.join(PROJECT_ROOT, 'src/lib/data.ts')

// ─── Typen (bewusst locker – die Tests prüfen Rohdaten) ───────

type Json = Record<string, unknown>
type Versioned = { id: string; firstLevel: number; versions: Record<string, string> }
type ThinkerJ  = Versioned & { schoolId: string; x?: number; y?: number }
type ConceptJ  = Versioned & { x: number; y: number; primaryThinker?: string; related_topics?: string[] }
type InfluenceJ = { from: string; to: string; firstLevel: number; versions: Record<string, string> }
type SchoolJ   = { id: string }
type LevelJ    = { id: number; filled?: unknown }
type TableauJ  = {
  topic: { id: string; complexityLevels: number }
  levels: LevelJ[]
  schools: SchoolJ[]
  thinkers: ThinkerJ[]
  concepts: ConceptJ[]
  influences: InfluenceJ[]
}
type StepJ = {
  nodeId: string | string[]
  nodeType: string
  step_brief?: string
  ton?: string
  image?: string
  image_prompt?: string
  image_status?: string
  transition: string | null
  narrative?: { bridge: string | null }
}
type LectioJ = { id: string; tableauId: string; ton?: string; path: StepJ[] }
type LebensfrageJ = {
  id: string
  stimmen: Array<{ aus: { tableau: string; knoten: string } }>
  kuratiert_aus_tableaus: string[]
}
type DenkraumJ = {
  id: string
  quelle: { typ: 'lebensfrage' | 'tableau'; id: string }
  haltungen: Record<string, unknown>
  verortung: { optionen: Array<{ id: string; naehe: string[]; reibung_mit: string[]; spiegel: Record<string, string> }> }
  karten: Array<{ knoten: string; x: number; y: number }>
  stellen: Array<{ id: string; zwischen: [string, string]; antwort: { landkarte: Record<string, string>; medaille: Record<string, string> } }>
  uebersehen: { zwischen: [string, string] }
}

// ─── Loader ───────────────────────────────────────────────────

const readJson = <T,>(file: string): T => JSON.parse(fs.readFileSync(file, 'utf-8')) as T
const jsonFiles = (dir: string) => fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()
const idsFromFiles = (dir: string) => jsonFiles(dir).map(f => f.replace(/\.json$/, ''))

const TABLEAU_FILES = jsonFiles(DATA_DIR).filter(f => f !== 'library.json')
const TABLEAUS: Record<string, TableauJ> = Object.fromEntries(
  TABLEAU_FILES.map(f => [f.replace(/\.json$/, ''), readJson<TableauJ>(path.join(DATA_DIR, f))]),
)
const LECTIOS      = jsonFiles(LECTIO_DIR).map(f => readJson<LectioJ>(path.join(LECTIO_DIR, f)))
const LEBENSFRAGEN = jsonFiles(LEBENSFR_DIR).map(f => readJson<LebensfrageJ>(path.join(LEBENSFR_DIR, f)))
const DENKRAEUME   = jsonFiles(DENKRAUM_DIR).map(f => readJson<DenkraumJ>(path.join(DENKRAUM_DIR, f)))

/** Registrierte Schlüssel eines `const NAME: Record<…> = { 'id': …, }`-Blocks in data.ts */
function registeredKeys(constName: string): string[] {
  const src = fs.readFileSync(DATA_TS, 'utf-8')
  const start = src.indexOf(`const ${constName}:`)
  expect(start, `data.ts: Block "const ${constName}" nicht gefunden`).toBeGreaterThan(-1)
  const body = src.slice(start, src.indexOf('\n}', start))
  return [...body.matchAll(/^\s*'([^']+)':/gm)].map(m => m[1])
}

/** Alle String-Werte eines JSON-Baums mit Pfad, optional ohne bestimmte Schlüssel */
function walkStrings(obj: unknown, skipKeys: Set<string>, p = ''): Array<[string, string]> {
  if (typeof obj === 'string') return [[p, obj]]
  if (Array.isArray(obj)) return obj.flatMap((v, i) => walkStrings(v, skipKeys, `${p}[${i}]`))
  if (obj && typeof obj === 'object') {
    return Object.entries(obj as Json)
      .filter(([k]) => !skipKeys.has(k))
      .flatMap(([k, v]) => walkStrings(v, skipKeys, p ? `${p}.${k}` : k))
  }
  return []
}

const allDataFiles = [
  ...TABLEAU_FILES.map(f => path.join(DATA_DIR, f)),
  path.join(DATA_DIR, 'library.json'),
  ...jsonFiles(LECTIO_DIR).map(f => path.join(LECTIO_DIR, f)),
  ...jsonFiles(LEBENSFR_DIR).map(f => path.join(LEBENSFR_DIR, f)),
  ...jsonFiles(DENKRAUM_DIR).map(f => path.join(DENKRAUM_DIR, f)),
]

// ─── 11. Typografie-Norm ──────────────────────────────────────

describe('11 · Typografie-Norm (Halbgeviertstrich, ss statt ß)', () => {
  // image_prompt ist englischer Generierungs-Prompt, Verbrauchsgut – nicht Inhalt.
  const SKIP = new Set(['image_prompt'])

  for (const file of allDataFiles) {
    it(`${path.relative(PROJECT_ROOT, file)} → kein Geviertstrich, kein ß`, () => {
      const hits = walkStrings(readJson<unknown>(file), SKIP)
        .filter(([, s]) => s.includes('—') || s.includes('ß'))
        .map(([p, s]) => `${p}: "${s.slice(0, 70)}"`)
      expect(hits, `Typografie-Verstösse:\n  ${hits.join('\n  ')}`).toHaveLength(0)
    })
  }
})

// ─── 12. Tableau-Struktur ─────────────────────────────────────

describe('12 · Tableau-Struktur', () => {
  for (const [id, t] of Object.entries(TABLEAUS)) {
    const max = t.topic.complexityLevels
    const schoolIds = new Set(t.schools.map(s => s.id))

    it(`${id} → topic.id entspricht dem Dateinamen`, () => {
      expect(t.topic.id).toBe(id)
    })

    it(`${id} → IDs eindeutig je Sammlung, Denker und Konzepte auch untereinander`, () => {
      // Denker und Konzepte teilen den Knotenraum der Sternkarte (Influence-Endpunkte,
      // Lectio-nodeIds) und dürfen sich nicht überschneiden. Eine Schule darf dieselbe
      // ID tragen wie ihr einziger Denker (vedanta, buddhismus – geduldetes Muster).
      const dupesIn = (ids: string[]) => ids.filter((x, i) => ids.indexOf(x) !== i)
      const bad = [
        ...dupesIn(t.thinkers.map(n => n.id)).map(x => `Denker doppelt: ${x}`),
        ...dupesIn(t.concepts.map(n => n.id)).map(x => `Konzept doppelt: ${x}`),
        ...dupesIn(t.schools.map(n => n.id)).map(x => `Schule doppelt: ${x}`),
        ...dupesIn([...t.thinkers, ...t.concepts].map(n => n.id)).map(x => `Denker und Konzept teilen ID: ${x}`),
      ]
      expect(bad, bad.join('\n')).toHaveLength(0)
    })

    it(`${id} → jeder Denker gehört einer existierenden Schule an`, () => {
      const bad = t.thinkers.filter(th => !schoolIds.has(th.schoolId)).map(th => `${th.id} → "${th.schoolId}"`)
      expect(bad, `unbekannte schoolId: ${bad.join(', ')}`).toHaveLength(0)
    })

    it(`${id} → firstLevel und versions-Schlüssel liegen in 1…${max}, versions[firstLevel] vorhanden`, () => {
      const bad: string[] = []
      const nodes: Array<Versioned | InfluenceJ> = [...t.thinkers, ...t.concepts, ...t.influences]
      for (const n of nodes) {
        const label = 'id' in n ? n.id : `${n.from}→${n.to}`
        if (n.firstLevel < 1 || n.firstLevel > max) bad.push(`${label}: firstLevel ${n.firstLevel}`)
        if (!(String(n.firstLevel) in n.versions)) bad.push(`${label}: keine versions["${n.firstLevel}"] – Knoten wäre auf seinem Einstiegslevel unsichtbar`)
        for (const k of Object.keys(n.versions)) {
          const kn = Number(k)
          if (!Number.isInteger(kn) || kn < 1 || kn > max) bad.push(`${label}: versions-Schlüssel "${k}"`)
          else if (kn < n.firstLevel) bad.push(`${label}: versions["${k}"] liegt unter firstLevel ${n.firstLevel}`)
        }
      }
      expect(bad, bad.join('\n')).toHaveLength(0)
    })

    it(`${id} → Koordinaten 0–100 (Denker x/y optional, Konzepte Pflicht)`, () => {
      const inRange = (v: number) => v >= 0 && v <= 100
      const bad: string[] = []
      for (const th of t.thinkers) {
        if ((th.x === undefined) !== (th.y === undefined)) bad.push(`${th.id}: x/y nur halb gesetzt`)
        if (th.x !== undefined && th.y !== undefined && !(inRange(th.x) && inRange(th.y))) bad.push(`${th.id}: (${th.x}, ${th.y})`)
      }
      for (const c of t.concepts) {
        if (typeof c.x !== 'number' || typeof c.y !== 'number' || !(inRange(c.x) && inRange(c.y))) bad.push(`${c.id}: (${c.x}, ${c.y})`)
      }
      expect(bad, bad.join('\n')).toHaveLength(0)
    })

    it(`${id} → levels: ${max} Stufen, kein gepflegtes filled-Feld`, () => {
      expect(t.levels.map(l => l.id)).toEqual(Array.from({ length: max }, (_, i) => i + 1))
      const withFilled = t.levels.filter(l => 'filled' in l).map(l => `L${l.id}`)
      expect(withFilled, `filled wird aus den Daten berechnet (levelsWithFilled) – im JSON entfernen: ${withFilled.join(', ')}`).toHaveLength(0)
    })
  }
})

// ─── 13. Concept.primaryThinker ───────────────────────────────

describe('13 · Concept.primaryThinker zeigt auf einen Denker', () => {
  // Entscheid 6.9.26: Der Anker darf ausserhalb des eigenen Tableaus liegen,
  // wenn das Ziel-Tableau unter related_topics genannt ist (z.B. wahres-selbst → rohr
  // in das-selbst). Das Konzept steht dann als Waise auf der Sternkarte.
  for (const [id, t] of Object.entries(TABLEAUS)) {
    const withAnchor = t.concepts.filter(c => c.primaryThinker !== undefined)
    if (withAnchor.length === 0) continue

    it(`${id} → primaryThinker im Tableau oder in einem related_topics-Tableau`, () => {
      const own = new Set(t.thinkers.map(th => th.id))
      const bad: string[] = []
      for (const c of withAnchor) {
        const pt = c.primaryThinker!
        if (own.has(pt)) continue
        const related = (c.related_topics ?? []).filter(r => TABLEAUS[r]?.thinkers.some(th => th.id === pt))
        if (related.length === 0) bad.push(`${c.id}: primaryThinker "${pt}" weder in ${id} noch in related_topics [${(c.related_topics ?? []).join(', ')}]`)
      }
      expect(bad, bad.join('\n')).toHaveLength(0)
    })
  }
})

// ─── 14. Influence-Endpunkte ──────────────────────────────────

describe('14 · Influence.from/to sind Thinker- oder Concept-IDs', () => {
  // Konzepte als Endpunkt erlaubt (Entscheid 6.9.26); Schulen sind keine Knoten der Sternkarte.
  for (const [id, t] of Object.entries(TABLEAUS)) {
    if (t.influences.length === 0) continue
    it(`${id} → keine Schul-IDs und keine Selbstbezüge als Endpunkt`, () => {
      const nodeIds = new Set([...t.thinkers, ...t.concepts].map(n => n.id))
      const bad: string[] = []
      for (const inf of t.influences) {
        for (const end of [inf.from, inf.to]) {
          if (!nodeIds.has(end)) bad.push(`${inf.from}→${inf.to}: "${end}" ist weder Denker noch Konzept`)
        }
        if (inf.from === inf.to) bad.push(`${inf.from}→${inf.to}: Selbstbezug`)
      }
      expect(bad, bad.join('\n')).toHaveLength(0)
    })
  }
})

// ─── 15. Annotationen ─────────────────────────────────────────

describe('15 · Annotationen [[…]] sind wohlgeformt', () => {
  // Spiegelt annotations.tsx: Doppelpunkt zuerst (Term ≤ 8 Wörter), sonst
  // Halbgeviertstrich (Term ≤ 6 Wörter), sonst Format B (Term = Wort davor).
  for (const [id, t] of Object.entries(TABLEAUS)) {
    it(`${id} → balancierte Klammern, Term und Definition nicht leer`, () => {
      const bad: string[] = []
      const texts: Array<[string, string]> = []
      for (const n of [...t.thinkers, ...t.concepts]) for (const [k, v] of Object.entries(n.versions)) texts.push([`${n.id}.versions.${k}`, v])
      for (const inf of t.influences) for (const [k, v] of Object.entries(inf.versions)) texts.push([`${inf.from}→${inf.to}.versions.${k}`, v])

      for (const [where, text] of texts) {
        const opens = (text.match(/\[\[/g) ?? []).length
        const closes = (text.match(/\]\]/g) ?? []).length
        if (opens !== closes) { bad.push(`${where}: ${opens}× "[[" vs ${closes}× "]]"`); continue }
        for (const m of text.matchAll(/\[\[(.*?)\]\]/g)) {
          const inner = m[1]
          if (inner.includes('[[')) { bad.push(`${where}: verschachtelte Annotation`); continue }
          let term = '', def = ''
          const colon = inner.indexOf(':')
          if (colon !== -1 && inner.slice(0, colon).trim().split(/\s+/).length <= 8) {
            term = inner.slice(0, colon).trim(); def = inner.slice(colon + 1).trim()
          } else {
            const dash = inner.indexOf(' – ')
            if (dash !== -1 && inner.slice(0, dash).trim().split(/\s+/).length <= 6) {
              term = inner.slice(0, dash).trim(); def = inner.slice(dash + 3).trim()
            } else {
              // Format B: Term ist das Wort vor der Klammer
              const before = text.slice(0, m.index).trimEnd()
              term = before.split(/\s+/).pop() ?? ''; def = inner.trim()
            }
          }
          if (!term) bad.push(`${where}: Annotation ohne Term – "${inner.slice(0, 50)}"`)
          if (!def) bad.push(`${where}: Annotation ohne Definition – "${inner.slice(0, 50)}"`)
        }
      }
      expect(bad, bad.join('\n')).toHaveLength(0)
    })
  }
})

// ─── 16. Lectio image_status-Parität ──────────────────────────

describe('16 · Lectio image_status-Parität', () => {
  for (const l of LECTIOS) {
    it(`${l.id} → image ↔ "generiert", image_prompt ohne image ↔ "prompt-neu"`, () => {
      const bad: string[] = []
      l.path.forEach((s, i) => {
        const station = `Station ${i + 1}`
        if (s.image && s.image_status !== 'generiert') bad.push(`${station}: image gesetzt, image_status ist "${s.image_status ?? '–'}" statt "generiert"`)
        if (!s.image && s.image_status === 'generiert') bad.push(`${station}: image_status "generiert" ohne image`)
        if (!s.image && s.image_prompt && s.image_status !== 'prompt-neu') bad.push(`${station}: image_prompt ohne image, image_status ist "${s.image_status ?? '–'}" statt "prompt-neu"`)
        if (s.image_status && !['generiert', 'prompt-neu'].includes(s.image_status)) bad.push(`${station}: unbekannter image_status "${s.image_status}"`)
      })
      expect(bad, bad.join('\n')).toHaveLength(0)
    })
  }
})

// ─── 17. step_brief nur auf Einzelknoten ──────────────────────

describe('17 · step_brief nur auf Einzelknoten-Stationen', () => {
  it('keine Doppelstation (Array-nodeId) trägt step_brief', () => {
    const bad = LECTIOS.flatMap(l =>
      l.path.map((s, i) => ({ s, i }))
        .filter(({ s }) => Array.isArray(s.nodeId) && s.step_brief !== undefined)
        .map(({ s, i }) => `${l.id} Station ${i + 1} [${(s.nodeId as string[]).join(', ')}]`),
    )
    expect(bad, bad.join('\n')).toHaveLength(0)
  })
})

// ─── 18. Erzähl-Konventionen ──────────────────────────────────

describe('18 · narrative.bridge == transition, gemischt → ton pro Station', () => {
  for (const l of LECTIOS) {
    const narrative = l.path.filter(s => s.narrative)
    if (narrative.length === 0 && l.ton !== 'gemischt') continue

    it(`${l.id} → Konventionen eingehalten`, () => {
      const bad: string[] = []
      l.path.forEach((s, i) => {
        if (s.narrative && s.narrative.bridge !== s.transition) bad.push(`Station ${i + 1}: bridge ≠ transition`)
        if (l.ton === 'gemischt' && !s.ton) bad.push(`Station ${i + 1}: ton fehlt (Lectio ist gemischt)`)
      })
      expect(bad, bad.join('\n')).toHaveLength(0)
    })
  }
})

// ─── 19. Registrierungs-Parität ───────────────────────────────

describe('19 · Registrierungs-Parität mit data.ts und library.json', () => {
  it('Tableaus: library.json ↔ data/*.json ↔ TOPICS', () => {
    const library = readJson<Array<{ id: string; status: string }>>(path.join(DATA_DIR, 'library.json'))
    const files = Object.keys(TABLEAUS).sort()
    const available = library.filter(e => e.status === 'available').map(e => e.id).sort()
    expect(available, 'library.json (available) ≠ Dateien in data/').toEqual(files)
    expect(registeredKeys('TOPICS').sort(), 'TOPICS in data.ts ≠ Dateien in data/').toEqual(files)
  })

  it('Lebensfragen: data/lebensfragen/*.json ↔ LEBENSFRAGEN', () => {
    expect(registeredKeys('LEBENSFRAGEN').sort()).toEqual(idsFromFiles(LEBENSFR_DIR))
    expect(LEBENSFRAGEN.map(l => l.id).sort()).toEqual(idsFromFiles(LEBENSFR_DIR))
  })

  it('Denkräume: data/denkraum/*.json ↔ DENKRAEUME', () => {
    expect(registeredKeys('DENKRAEUME').sort()).toEqual(idsFromFiles(DENKRAUM_DIR))
    expect(DENKRAEUME.map(d => d.id).sort()).toEqual(idsFromFiles(DENKRAUM_DIR))
  })
})

// ─── 20. Lebensfragen ─────────────────────────────────────────

describe('20 · Lebensfragen: Stimmen haben eine Tableau-Heimat', () => {
  for (const lf of LEBENSFRAGEN) {
    it(`${lf.id} → aus.tableau / aus.knoten existieren, kuratiert_aus_tableaus stimmt`, () => {
      const bad: string[] = []
      const used = new Set<string>()
      lf.stimmen.forEach((s, i) => {
        const t = TABLEAUS[s.aus.tableau]
        if (!t) { bad.push(`Stimme ${i + 1}: Tableau "${s.aus.tableau}" fehlt`); return }
        used.add(s.aus.tableau)
        const ids = new Set([...t.thinkers, ...t.concepts, ...t.schools].map(n => n.id))
        if (!ids.has(s.aus.knoten)) bad.push(`Stimme ${i + 1}: Knoten "${s.aus.knoten}" nicht in "${s.aus.tableau}"`)
      })
      expect(bad, bad.join('\n')).toHaveLength(0)
      expect([...lf.kuratiert_aus_tableaus].sort(), 'kuratiert_aus_tableaus ≠ tatsächlich genutzte Tableaus').toEqual([...used].sort())
    })
  }
})

// ─── 21. Denkraum-Tisch ───────────────────────────────────────

describe('21 · Denkraum-Tisch: Referenzen vollständig', () => {
  const HALTUNGEN = ['ruhe', 'erschuetterung']

  for (const d of DENKRAEUME) {
    it(`${d.id} → Quelle, Karten, Stellen, Verortung und Haltungen stimmig`, () => {
      const bad: string[] = []

      // Quelle und Karten-Knoten
      let quellKnoten = new Set<string>()
      if (d.quelle.typ === 'tableau') {
        const t = TABLEAUS[d.quelle.id]
        if (!t) bad.push(`Tableau "${d.quelle.id}" fehlt`)
        else quellKnoten = new Set(t.thinkers.map(th => th.id))
      } else {
        const lf = LEBENSFRAGEN.find(l => l.id === d.quelle.id)
        if (!lf) bad.push(`Lebensfrage "${d.quelle.id}" fehlt`)
        else quellKnoten = new Set(lf.stimmen.map(s => s.aus.knoten))
      }
      for (const k of d.karten) {
        if (!quellKnoten.has(k.knoten)) bad.push(`Karte "${k.knoten}" nicht in Quelle`)
        if (k.x < 0 || k.x > 100 || k.y < 0 || k.y > 100) bad.push(`Karte "${k.knoten}": Position (${k.x}, ${k.y})`)
      }

      // Verweise auf Karten
      const karten = new Set(d.karten.map(k => k.knoten))
      const ref = (where: string, ids: string[]) => ids.filter(x => !karten.has(x)).forEach(x => bad.push(`${where} → unbekannte Karte "${x}"`))
      for (const st of d.stellen) {
        ref(`Stelle ${st.id}`, st.zwischen)
        for (const h of HALTUNGEN) {
          if (!st.antwort.landkarte[h]) bad.push(`Stelle ${st.id}: antwort.landkarte.${h} fehlt`)
          if (!st.antwort.medaille[h])  bad.push(`Stelle ${st.id}: antwort.medaille.${h} fehlt`)
        }
      }
      ref('uebersehen', d.uebersehen.zwischen)
      for (const o of d.verortung.optionen) {
        ref(`Verortung ${o.id}`, [...o.naehe, ...o.reibung_mit])
        for (const h of HALTUNGEN) if (!o.spiegel[h]) bad.push(`Verortung ${o.id}: spiegel.${h} fehlt`)
      }
      for (const h of HALTUNGEN) if (!d.haltungen[h]) bad.push(`haltungen.${h} fehlt`)

      // Keine Stelle doppelt kuratiert
      const keys = d.stellen.map(st => [...st.zwischen].sort().join('|'))
      keys.filter((k, i) => keys.indexOf(k) !== i).forEach(k => bad.push(`Stelle doppelt kuratiert: ${k}`))

      expect(bad, bad.join('\n')).toHaveLength(0)
    })
  }
})
