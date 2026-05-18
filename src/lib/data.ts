import type { TopicData } from './types'
import dasSelbstRaw                        from '../../data/das-selbst.json'
import philosophieDesGeistesRaw            from '../../data/philosophie-des-geistes.json'
import realismusUndKonstruktivismusRaw     from '../../data/realismus-und-konstruktivismus.json'
import ethikRaw                            from '../../data/ethik.json'
import libraryRaw                          from '../../data/library.json'

const TOPICS: Record<string, TopicData> = {
  'das-selbst':                       dasSelbstRaw                    as unknown as TopicData,
  'philosophie-des-geistes':          philosophieDesGeistesRaw        as unknown as TopicData,
  'realismus-und-konstruktivismus':   realismusUndKonstruktivismusRaw as unknown as TopicData,
  'ethik':                            ethikRaw                        as unknown as TopicData,
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
