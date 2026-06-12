/**
 * Sanctum Mentis — Daten-Validierungs-Tests
 *
 * Prüft alle Tableau-JSONs und Lectio-JSONs auf Konsistenz:
 * 1. Lectio nodeId-Referenzen → existierende Knoten im zugehörigen Tableau
 * 2. Kernel-Substring → kernel muss exakter Teilstring von body-Absatz sein
 * 3. Bild-Existenz → image-Felder müssen in public/ vorhanden sein
 * 4. Influence-Endpunkte → from/to müssen Thinker- oder Konzept-IDs sein
 * 5. primaryThinker → muss nicht-leerer String sein (Waisen-Marker OK)
 */

import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

// ─── Datenpfade ───────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const DATA_DIR     = path.join(PROJECT_ROOT, 'data')
const PUBLIC_DIR   = path.join(PROJECT_ROOT, 'public')
const LECTIO_DIR   = path.join(DATA_DIR, 'lectio')

// ─── Tableau-IDs (aus data.ts) ────────────────────────────────

const TABLEAU_IDS = [
  'das-selbst',
  'philosophie-des-geistes',
  'realismus-und-konstruktivismus',
  'ethik',
  'existenzialismus',
  'politische-philosophie',
  'lebenskunst',
  'begegnung',
  'wandlung',
  'gut-und-boese',
  'verwandlung',
  'selbstverhaeltnis',
]

// ─── Hilfsfunktionen ──────────────────────────────────────────

function loadTableau(id: string): Record<string, unknown> {
  const file = path.join(DATA_DIR, `${id}.json`)
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

function loadLectio(filename: string): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(path.join(LECTIO_DIR, filename), 'utf-8'))
}

function getLectioFiles(): string[] {
  return fs.readdirSync(LECTIO_DIR).filter(f => f.endsWith('.json'))
}

/** Sammelt alle Knoten-IDs (thinker, concept, school) aus einem Tableau */
function collectNodeIds(tableau: Record<string, unknown>): {
  thinkerIds: Set<string>
  conceptIds:  Set<string>
  schoolIds:   Set<string>
  allIds:      Set<string>
} {
  const thinkerIds = new Set<string>()
  const conceptIds  = new Set<string>()
  const schoolIds   = new Set<string>()

  const thinkers = (tableau.thinkers as Array<{ id: string }>) ?? []
  const concepts  = (tableau.concepts  as Array<{ id: string }>) ?? []
  const schools   = (tableau.schools   as Array<{ id: string }>) ?? []

  for (const t of thinkers) thinkerIds.add(t.id)
  for (const c of concepts)  conceptIds.add(c.id)
  for (const s of schools)   schoolIds.add(s.id)

  const allIds = new Set([...thinkerIds, ...conceptIds, ...schoolIds])
  return { thinkerIds, conceptIds, schoolIds, allIds }
}

// ─── 1. Lectio nodeId-Referenzen ──────────────────────────────

describe('Lectio nodeId-Referenzen', () => {
  const lectioFiles = getLectioFiles()

  for (const filename of lectioFiles) {
    const lectio = loadLectio(filename)
    const tableauId = lectio.tableauId as string
    const lectioId  = lectio.id as string

    it(`${lectioId} → alle nodeIds existieren in Tableau "${tableauId}"`, () => {
      expect(tableauId, `${filename} hat kein tableauId`).toBeTruthy()

      const tableau = loadTableau(tableauId)
      const { thinkerIds, conceptIds, schoolIds } = collectNodeIds(tableau)

      const path_ = (lectio.path as Array<Record<string, unknown>>) ?? []

      for (const step of path_) {
        const nodeIds = Array.isArray(step.nodeId)
          ? (step.nodeId as string[])
          : [step.nodeId as string]
        const nodeType = step.nodeType as string

        for (const nodeId of nodeIds) {
          let exists = false
          if (nodeType === 'thinker') {
            exists = thinkerIds.has(nodeId)
          } else if (nodeType === 'concept') {
            exists = conceptIds.has(nodeId)
          } else if (nodeType === 'school') {
            exists = schoolIds.has(nodeId)
          }

          expect(
            exists,
            `${lectioId}: nodeId "${nodeId}" (nodeType: ${nodeType}) nicht in Tableau "${tableauId}" gefunden`
          ).toBe(true)
        }
      }
    })
  }
})

// ─── 2. Kernel-Substring ──────────────────────────────────────

describe('Kernel-Substring in narrative.body', () => {
  const lectioFiles = getLectioFiles()

  for (const filename of lectioFiles) {
    const lectio = loadLectio(filename)
    const lectioId = lectio.id as string
    const path_   = (lectio.path as Array<Record<string, unknown>>) ?? []

    // Nur Lectios mit narrativen Steps prüfen
    const stepsWithNarrative = path_.filter(
      s => s.narrative && typeof s.narrative === 'object'
    )
    if (stepsWithNarrative.length === 0) continue

    it(`${lectioId} → kernels sind Teilstrings von body`, () => {
      for (let i = 0; i < path_.length; i++) {
        const step = path_[i]
        const narrative = step.narrative as Record<string, unknown> | undefined
        if (!narrative) continue

        const kernel = narrative.kernel as string | undefined
        if (!kernel) continue  // kein kernel → kein Check

        const body = (narrative.body as string[]) ?? []
        const bodyText = body.join('\n')

        expect(
          bodyText.includes(kernel),
          `${lectioId} Station ${i + 1}: kernel ist kein Teilstring von body.\n  kernel: "${kernel.slice(0, 60)}..."\n  body (gesamt): "${bodyText.slice(0, 120)}..."`
        ).toBe(true)
      }
    })
  }
})

// ─── 3. closing_kernel-Substring ─────────────────────────────

describe('closing_kernel ist Teilstring der closing_synthesis', () => {
  it('alle gesetzten closing_kernel sind Teilstrings des letzten Synthese-Absatzes', () => {
    const lectioFiles = getLectioFiles()
    let checked = 0

    for (const filename of lectioFiles) {
      const lectio = loadLectio(filename)
      const lectioId = lectio.id as string
      const closingKernel = lectio.closing_kernel as string | undefined

      // Leeres oder fehlendes closing_kernel → kein Fehler
      if (!closingKernel) continue

      const closingSynthesis = lectio.closing_synthesis as string
      expect(
        closingSynthesis,
        `${lectioId}: closing_synthesis fehlt oder ist kein String`
      ).toBeTruthy()

      // closing_kernel muss im LETZTEN Absatz der closing_synthesis vorkommen
      const synthParagraphs = closingSynthesis.split('\n').filter(Boolean)
      const lastParagraph = synthParagraphs[synthParagraphs.length - 1] ?? ''

      expect(
        lastParagraph.includes(closingKernel),
        `${lectioId}: closing_kernel ist kein Teilstring des letzten Synthese-Absatzes.\n  closing_kernel: "${closingKernel.slice(0, 80)}"\n  letzter Absatz: "${lastParagraph.slice(0, 120)}"`
      ).toBe(true)

      checked++
    }

    // Informeller Nachweis: wie viele wurden geprüft (0 = kein Kernel gesetzt, erlaubt)
    expect(checked).toBeGreaterThanOrEqual(0)
  })
})

// ─── 5. Bild-Existenz ─────────────────────────────────────────

describe('Bild-Existenz in public/', () => {
  const lectioFiles = getLectioFiles()

  // Hilfsfunktion: findet alle String-Werte unter Schlüssel "image" rekursiv
  function collectImageRefs(obj: unknown): string[] {
    if (!obj || typeof obj !== 'object') return []
    const refs: string[] = []
    if (Array.isArray(obj)) {
      for (const item of obj) refs.push(...collectImageRefs(item))
    } else {
      for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
        if (key === 'image' && typeof val === 'string') {
          refs.push(val)
        } else {
          refs.push(...collectImageRefs(val))
        }
      }
    }
    return refs
  }

  const lectiosWithImages: Array<{ lectioId: string; imageRefs: string[] }> = []
  for (const filename of lectioFiles) {
    const lectio = loadLectio(filename)
    const lectioId = lectio.id as string
    const imageRefs = collectImageRefs(lectio)
    if (imageRefs.length > 0) {
      lectiosWithImages.push({ lectioId, imageRefs })
    }
  }

  it('alle Lectio-Bilder existieren in public/ (oder keine Bilder referenziert)', () => {
    for (const { lectioId, imageRefs } of lectiosWithImages) {
      for (const imgRef of imageRefs) {
        // imgRef ist relativ zu public/, z.B. "/lectio-images/foo.jpg"
        const normalized = imgRef.startsWith('/') ? imgRef.slice(1) : imgRef
        const absolutePath = path.join(PUBLIC_DIR, normalized)
        expect(
          fs.existsSync(absolutePath),
          `${lectioId}: Bild "${imgRef}" nicht gefunden unter ${absolutePath}`
        ).toBe(true)
      }
    }
    // Wenn keine Bilder referenziert: Test trivially grün
  })
})

// ─── 6. Influence-Endpunkte ───────────────────────────────────

describe('Influence from/to sind gültige Knoten-IDs', () => {
  for (const tableauId of TABLEAU_IDS) {
    const tableau = loadTableau(tableauId)
    const { allIds } = collectNodeIds(tableau)
    const influences = (tableau.influences as Array<{ from: string; to: string; type: string }>) ?? []

    if (influences.length === 0) continue

    it(`${tableauId} → alle Influence from/to sind gültige Knoten-IDs`, () => {
      for (const inf of influences) {
        expect(
          allIds.has(inf.from),
          `${tableauId}: Influence.from "${inf.from}" ist weder Thinker- noch Konzept- noch Schul-ID`
        ).toBe(true)

        expect(
          allIds.has(inf.to),
          `${tableauId}: Influence.to "${inf.to}" ist weder Thinker- noch Konzept- noch Schul-ID`
        ).toBe(true)
      }
    })
  }
})

// ─── 7. primaryThinker ist nicht-leerer String ────────────────

describe('Concept.primaryThinker ist nicht-leerer String', () => {
  for (const tableauId of TABLEAU_IDS) {
    const tableau = loadTableau(tableauId)
    const concepts = (tableau.concepts as Array<{ id: string; primaryThinker?: unknown }>) ?? []
    const withPT = concepts.filter(c => c.primaryThinker !== undefined)

    if (withPT.length === 0) continue

    it(`${tableauId} → primaryThinker-Felder sind nicht-leere Strings`, () => {
      for (const c of withPT) {
        expect(
          typeof c.primaryThinker === 'string' && c.primaryThinker.length > 0,
          `${tableauId}: Konzept "${c.id}" hat primaryThinker = ${JSON.stringify(c.primaryThinker)} (kein nicht-leerer String)`
        ).toBe(true)
      }
    })
  }
})
