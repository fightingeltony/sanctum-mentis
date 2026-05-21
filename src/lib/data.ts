import type { TopicData, Lectio, LectioSummary } from './types'
import dasSelbstRaw                        from '../../data/das-selbst.json'
import philosophieDesGeistesRaw            from '../../data/philosophie-des-geistes.json'
import realismusUndKonstruktivismusRaw     from '../../data/realismus-und-konstruktivismus.json'
import ethikRaw                            from '../../data/ethik.json'
import libraryRaw                          from '../../data/library.json'
import hardProblemRaw                      from '../../data/lectio/hard-problem.json'
import werBeobachtetRaw                    from '../../data/lectio/wer-beobachtet.json'

const TOPICS: Record<string, TopicData> = {
  'das-selbst':                       dasSelbstRaw                    as unknown as TopicData,
  'philosophie-des-geistes':          philosophieDesGeistesRaw        as unknown as TopicData,
  'realismus-und-konstruktivismus':   realismusUndKonstruktivismusRaw as unknown as TopicData,
  'ethik':                            ethikRaw                        as unknown as TopicData,
}

export function getTopic(id: string): TopicData | null {
  return TOPICS[id] ?? null
}

export function getAllTopics(): TopicData[] {
  return Object.values(TOPICS)
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

// ─── Lectio Loader ───────────────────────────────────────────

const LECTIOS: Record<string, Lectio> = {
  'hard-problem':   hardProblemRaw   as unknown as Lectio,
  'wer-beobachtet': werBeobachtetRaw as unknown as Lectio,
}

export function getLectio(id: string): Lectio | null {
  return LECTIOS[id] ?? null
}

export function getLectioIds(): string[] {
  return Object.keys(LECTIOS)
}

export function getLectiosByTableauId(tableauId: string): LectioSummary[] {
  return Object.values(LECTIOS)
    .filter(l => l.tableauId === tableauId)
    .map(l => ({
      id:               l.id,
      title:            l.title,
      focus:            l.focus,
      estimated_minutes: l.estimated_minutes,
      stationCount:     l.path.length,
    }))
}
