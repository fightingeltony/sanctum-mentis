import type { TopicData } from './types'
import erkenntnistheorieRaw from '../../data/erkenntnistheorie.json'
import libraryRaw           from '../../data/library.json'

const TOPICS: Record<string, TopicData> = {
  erkenntnistheorie: erkenntnistheorieRaw as unknown as TopicData,
}

export function getTopic(id: string): TopicData | null {
  return TOPICS[id] ?? null
}

export interface LibraryEntry {
  id: string
  title: string
  subtitle?: string
  era?: string
  themeColor: string
  status: 'available' | 'coming'
  desc?: string
  tags?: string[]
}

export const library: LibraryEntry[] = libraryRaw as LibraryEntry[]
