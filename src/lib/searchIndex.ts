import { getAllTopics } from './data'

export interface SearchEntry {
  type: 'thinker' | 'concept' | 'school'
  name: string
  topicId: string
  topicTitle: string
  nodeId: string
  firstLevel?: number
}

/** Lazily built, cached for the lifetime of the module */
let _cache: SearchEntry[] | null = null

export function buildGlobalSearchIndex(): SearchEntry[] {
  if (_cache) return _cache

  const entries: SearchEntry[] = []
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

  _cache = entries
  return entries
}

/** Strips diacritics and lowercases — used for accent-insensitive matching */
export function normalize(str: string): string {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}
