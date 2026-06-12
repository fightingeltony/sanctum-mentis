/** Shared types and utilities for the search index — safe to import in Client Components */

export interface SearchEntry {
  type: 'thinker' | 'concept' | 'school' | 'lectio' | 'lebensfrage'
  name: string
  topicId: string
  topicTitle: string
  nodeId?: string
  firstLevel?: number
}

/** Strips diacritics and lowercases — used for accent-insensitive matching */
export function normalize(str: string): string {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}
