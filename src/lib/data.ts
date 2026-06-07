import type { TopicData, Lectio, LectioSummary, Spur, Lebensfrage } from './types'
import dasSelbstRaw                        from '../../data/das-selbst.json'
import philosophieDesGeistesRaw            from '../../data/philosophie-des-geistes.json'
import realismusUndKonstruktivismusRaw     from '../../data/realismus-und-konstruktivismus.json'
import ethikRaw                            from '../../data/ethik.json'
import existenzialismusRaw                 from '../../data/existenzialismus.json'
import politischePhilosophieRaw            from '../../data/politische-philosophie.json'
import lebenskunstRaw                      from '../../data/lebenskunst.json'
import begegnungRaw                         from '../../data/begegnung.json'
import wandlungRaw                          from '../../data/wandlung.json'
import gutUndBoeseRaw                       from '../../data/gut-und-boese.json'
import verwandlungRaw                       from '../../data/verwandlung.json'
import selbstverhaeltnisRaw                 from '../../data/selbstverhaeltnis.json'
import libraryRaw                          from '../../data/library.json'
import hardProblemRaw                      from '../../data/lectio/hard-problem.json'
import werBeobachtetRaw                    from '../../data/lectio/wer-beobachtet.json'
import wennDieWeltWackeltRaw               from '../../data/lectio/wenn-die-welt-wackelt.json'
import warumSollstDuRaw                    from '../../data/lectio/warum-sollst-du.json'
import wennNichtsVorgegebenRaw             from '../../data/lectio/wenn-nichts-vorgegeben.json'
import warumGehorchstDuRaw                from '../../data/lectio/warum-gehorchst-du.json'
import warumGehorchstDuExpositorischRaw   from '../../data/lectio/warum-gehorchst-du-expositorisch.json'
import findestDuOderMachstDuRaw            from '../../data/lectio/findest-du-oder-machst-du.json'
import ruheOderRauschRaw                   from '../../data/lectio/ruhe-oder-rausch.json'
import derWegDesMenschenRaw                from '../../data/lectio/der-weg-des-menschen.json'
import istDerAndereHoelleOderHeimatRaw     from '../../data/lectio/ist-der-andere-hoelle-oder-heimat.json'
import verstehenOderWeitergehenRaw         from '../../data/lectio/verstehen-oder-weitergehen.json'
import stellDieFrageAndersRaw              from '../../data/lectio/stell-die-frage-anders.json'
import werBistDuRaw                        from '../../data/lectio/wer-bist-du-wenn-du-alles-weglaesst.json'
import vomWissenZumGlaubenRaw              from '../../data/lectio/vom-wissen-zum-glauben.json'
import schmerzRaw                          from '../../data/lebensfragen/schmerz.json'
import todRaw                              from '../../data/lebensfragen/tod.json'
import einsamkeitRaw                       from '../../data/lebensfragen/einsamkeit.json'
import veraenderungRaw                     from '../../data/lebensfragen/veraenderung.json'

const TOPICS: Record<string, TopicData> = {
  'das-selbst':                       dasSelbstRaw                    as unknown as TopicData,
  'philosophie-des-geistes':          philosophieDesGeistesRaw        as unknown as TopicData,
  'realismus-und-konstruktivismus':   realismusUndKonstruktivismusRaw as unknown as TopicData,
  'ethik':                            ethikRaw                        as unknown as TopicData,
  'existenzialismus':                 existenzialismusRaw             as unknown as TopicData,
  'politische-philosophie':           politischePhilosophieRaw        as unknown as TopicData,
  'lebenskunst':                      lebenskunstRaw                  as unknown as TopicData,
  'begegnung':                        begegnungRaw                    as unknown as TopicData,
  'wandlung':                         wandlungRaw                     as unknown as TopicData,
  'gut-und-boese':                    gutUndBoeseRaw                  as unknown as TopicData,
  'verwandlung':                      verwandlungRaw                  as unknown as TopicData,
  'selbstverhaeltnis':                selbstverhaeltnisRaw            as unknown as TopicData,
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
  spur?: Spur
  desc?: string
  tags?: string[]
}

export const library: LibraryEntry[] = libraryRaw as LibraryEntry[]

// ─── Lectio Loader ───────────────────────────────────────────

const LECTIOS: Record<string, Lectio> = {
  'hard-problem':          hardProblemRaw          as unknown as Lectio,
  'wer-beobachtet':        werBeobachtetRaw        as unknown as Lectio,
  'wenn-die-welt-wackelt': wennDieWeltWackeltRaw   as unknown as Lectio,
  'warum-sollst-du':       warumSollstDuRaw        as unknown as Lectio,
  'wenn-nichts-vorgegeben':       wennNichtsVorgegebenRaw       as unknown as Lectio,
  'warum-gehorchst-du':                  warumGehorchstDuRaw                   as unknown as Lectio,
  'warum-gehorchst-du-expositorisch':    warumGehorchstDuExpositorischRaw      as unknown as Lectio,
  'findest-du-oder-machst-du':   findestDuOderMachstDuRaw      as unknown as Lectio,
  'ruhe-oder-rausch':            ruheOderRauschRaw             as unknown as Lectio,
  'der-weg-des-menschen':        derWegDesMenschenRaw          as unknown as Lectio,
  'ist-der-andere-hoelle-oder-heimat': istDerAndereHoelleOderHeimatRaw as unknown as Lectio,
  'verstehen-oder-weitergehen':        verstehenOderWeitergehenRaw     as unknown as Lectio,
  'stell-die-frage-anders':            stellDieFrageAndersRaw          as unknown as Lectio,
  'wer-bist-du-wenn-du-alles-weglaesst': werBistDuRaw                  as unknown as Lectio,
  'vom-wissen-zum-glauben':              vomWissenZumGlaubenRaw        as unknown as Lectio,
}

export function getLectio(id: string): Lectio | null {
  return LECTIOS[id] ?? null
}

export function getLectioIds(): string[] {
  return Object.keys(LECTIOS)
}

// ─── Lebensfragen Loader ─────────────────────────────────────

const LEBENSFRAGEN: Record<string, Lebensfrage> = {
  'schmerz':    schmerzRaw    as unknown as Lebensfrage,
  'tod':        todRaw        as unknown as Lebensfrage,
  'einsamkeit':   einsamkeitRaw   as unknown as Lebensfrage,
  'veraenderung': veraenderungRaw as unknown as Lebensfrage,
}

export function getLebensfrage(id: string): Lebensfrage | null {
  return LEBENSFRAGEN[id] ?? null
}

export function getAllLebensfragen(): Lebensfrage[] {
  return Object.values(LEBENSFRAGEN)
}

export function getLebensfrageIds(): string[] {
  return Object.keys(LEBENSFRAGEN)
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
      ton:              l.ton,
    }))
}
