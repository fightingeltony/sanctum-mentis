import { getAllTopics, getLectioIds, getLectio, getTopic, getAllLebensfragen } from './data'
import type { SearchEntry } from './searchTypes'

export type { SearchEntry }
export { normalize } from './searchTypes'

/** Lazily built, cached for the lifetime of the module */
let _cache: SearchEntry[] | null = null

export function buildGlobalSearchIndex(): SearchEntry[] {
  if (_cache) return _cache

  const entries: SearchEntry[] = []

  // ─── Tableau entries (thinkers, concepts, schools) ───────────────────────
  for (const data of getAllTopics()) {
    for (const t of data.thinkers) {
      entries.push({
        type: 'thinker',
        name: t.name,
        topicId: data.topic.id,
        topicTitle: data.topic.title,
        nodeId: t.id,
        firstLevel: t.firstLevel,
      })
    }
    for (const c of data.concepts) {
      entries.push({
        type: 'concept',
        name: c.name,
        topicId: data.topic.id,
        topicTitle: data.topic.title,
        nodeId: c.id,
        firstLevel: c.firstLevel,
      })
    }
    for (const s of data.schools) {
      entries.push({
        type: 'school',
        name: s.label,
        topicId: data.topic.id,
        topicTitle: data.topic.title,
        nodeId: s.id,
        // schools have no firstLevel
      })
    }
  }

  // ─── Lectio entries ───────────────────────────────────────────────────────
  for (const id of getLectioIds()) {
    const lectio = getLectio(id)
    if (!lectio) continue
    const tableau = getTopic(lectio.tableauId)
    entries.push({
      type: 'lectio',
      name: lectio.title,
      topicId: lectio.id,
      topicTitle: tableau ? tableau.topic.title : lectio.tableauId,
      // no nodeId, no firstLevel for lectios
    })
  }

  // ─── Lebensfragen entries ─────────────────────────────────────────────────
  for (const lf of getAllLebensfragen()) {
    entries.push({
      type: 'lebensfrage',
      name: lf.title,
      topicId: lf.id,
      topicTitle: 'Quer durch die Bibliothek',
      // no nodeId, no firstLevel
    })
  }

  _cache = entries
  return entries
}
