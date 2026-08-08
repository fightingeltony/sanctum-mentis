import 'server-only'
import type { TopicData, Lectio, LectioSummary, Spur, Lebensfrage, DenkraumTisch, DenkraumTischResolved } from './types'
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
import wennDieWeltWackeltRaw               from '../../data/lectio/wenn-die-welt-wackelt.json'
import warumSollstDuRaw                    from '../../data/lectio/warum-sollst-du.json'
import wennNichtsVorgegebenRaw             from '../../data/lectio/wenn-nichts-vorgegeben.json'
import warumGehorchstDuRaw                from '../../data/lectio/warum-gehorchst-du.json'
import findestDuOderMachstDuRaw            from '../../data/lectio/findest-du-oder-machst-du.json'
import ruheOderRauschRaw                   from '../../data/lectio/ruhe-oder-rausch.json'
import derWegDesMenschenRaw                from '../../data/lectio/der-weg-des-menschen.json'
import istDerAndereHoelleOderHeimatRaw     from '../../data/lectio/ist-der-andere-hoelle-oder-heimat.json'
import verstehenOderWeitergehenRaw         from '../../data/lectio/verstehen-oder-weitergehen.json'
import stellDieFrageAndersRaw              from '../../data/lectio/stell-die-frage-anders.json'
import werBistDuRaw                        from '../../data/lectio/wer-bist-du-wenn-du-alles-weglaesst.json'
import vomWissenZumGlaubenRaw              from '../../data/lectio/vom-wissen-zum-glauben.json'
import annehmenOderUeberwindenRaw          from '../../data/lectio/annehmen-oder-ueberwinden.json'
import schmerzRaw                          from '../../data/lebensfragen/schmerz.json'
import todRaw                              from '../../data/lebensfragen/tod.json'
import einsamkeitRaw                       from '../../data/lebensfragen/einsamkeit.json'
import veraenderungRaw                     from '../../data/lebensfragen/veraenderung.json'
import kontrollierenRaw                    from '../../data/lebensfragen/kontrollieren.json'
import kontrollierenTischRaw               from '../../data/denkraum/kontrollieren.json'
import dasSelbstTischRaw                   from '../../data/denkraum/das-selbst.json'
import { getVersion }                      from './complexityEngine'

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

// ─── Landing-Extrakt ─────────────────────────────────────────
// Schlanker TopicData-Abzug für die selbstspielende Landing-Sternkarte.
// Geometrie und Versions-SCHLÜSSEL bleiben erhalten (Sichtbarkeit,
// isNew/isDeepened und Linien pro Level bleiben identisch), die Texte
// werden durch ein Leerzeichen ersetzt – sie machen ~85% des Payloads aus.
// Die Volltexte holt LandingStarChart lazy über /api/landing-topic,
// bevor die Tour startet (gleiches Muster wie der Suchindex).

export const LANDING_TOPIC_ID = 'das-selbst'

function blankVersions(versions: Record<number, string>): Record<number, string> {
  const out: Record<number, string> = {}
  for (const k of Object.keys(versions)) out[Number(k)] = ' '
  return out
}

export function getLandingChartData(id: string): TopicData | null {
  const full = TOPICS[id]
  if (!full) return null
  return {
    topic: {
      id: full.topic.id,
      title: full.topic.title,
      complexityLevels: full.topic.complexityLevels,
      quadrants: full.topic.quadrants,
    },
    levels: full.levels,
    schools: full.schools,
    thinkers: full.thinkers.map(t => ({
      id: t.id, name: t.name, schoolId: t.schoolId, lifespan: t.lifespan,
      x: t.x, y: t.y, firstLevel: t.firstLevel,
      versions: blankVersions(t.versions),
    })),
    influences: full.influences.map(i => ({
      from: i.from, to: i.to, type: i.type, firstLevel: i.firstLevel,
      versions: blankVersions(i.versions),
    })),
    concepts: full.concepts.map(c => ({
      id: c.id, name: c.name, x: c.x, y: c.y, type: c.type,
      schoolId: c.schoolId, primaryThinker: c.primaryThinker,
      labelOffset: c.labelOffset, firstLevel: c.firstLevel,
      versions: blankVersions(c.versions),
    })),
  }
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
  'wenn-die-welt-wackelt': wennDieWeltWackeltRaw   as unknown as Lectio,
  'warum-sollst-du':       warumSollstDuRaw        as unknown as Lectio,
  'wenn-nichts-vorgegeben':       wennNichtsVorgegebenRaw       as unknown as Lectio,
  'warum-gehorchst-du':                  warumGehorchstDuRaw                   as unknown as Lectio,
  'findest-du-oder-machst-du':   findestDuOderMachstDuRaw      as unknown as Lectio,
  'ruhe-oder-rausch':                      ruheOderRauschRaw                  as unknown as Lectio,
  'der-weg-des-menschen':                  derWegDesMenschenRaw               as unknown as Lectio,
  'ist-der-andere-hoelle-oder-heimat':          istDerAndereHoelleOderHeimatRaw   as unknown as Lectio,
  'verstehen-oder-weitergehen':            verstehenOderWeitergehenRaw        as unknown as Lectio,
  'stell-die-frage-anders':            stellDieFrageAndersRaw          as unknown as Lectio,
  'wer-bist-du-wenn-du-alles-weglaesst': werBistDuRaw                  as unknown as Lectio,
  'vom-wissen-zum-glauben':              vomWissenZumGlaubenRaw        as unknown as Lectio,
  'annehmen-oder-ueberwinden':           annehmenOderUeberwindenRaw    as unknown as Lectio,
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
  'kontrollieren': kontrollierenRaw as unknown as Lebensfrage,
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

// ─── Denkraum-Tisch Loader (Prototyp v2, Beta) ───────────────

const DENKRAEUME: Record<string, DenkraumTisch> = {
  'kontrollieren': kontrollierenTischRaw as unknown as DenkraumTisch,
  'das-selbst':    dasSelbstTischRaw     as unknown as DenkraumTisch,
}

export function getDenkraumIds(): string[] {
  return Object.keys(DENKRAEUME)
}

export function getDenkraumIdForLebensfrage(lebensfrageId: string): string | null {
  return Object.values(DENKRAEUME)
    .find(d => d.quelle.typ === 'lebensfrage' && d.quelle.id === lebensfrageId)?.id ?? null
}

export function getDenkraumIdForTableau(tableauId: string): string | null {
  return Object.values(DENKRAEUME)
    .find(d => d.quelle.typ === 'tableau' && d.quelle.id === tableauId)?.id ?? null
}

/** Tableau-Texte tragen [[Annotationen]] und *Kursiv*-Marker – der Tisch
 *  rendert rohen Text, also beides entfernen (Term behalten, Definition weg). */
function entferneMarkup(text: string): string {
  return text
    .replace(/\[\[([^\]]+)\]\]/g, (_, inhalt: string) => {
      const doppelpunkt = inhalt.indexOf(':')
      if (doppelpunkt !== -1) return inhalt.slice(0, doppelpunkt)
      const strich = inhalt.indexOf(' – ')
      if (strich !== -1) return inhalt.slice(0, strich)
      return ''
    })
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/ {2,}/g, ' ')
    .trim()
}

/** Joint die Karten mit ihrer Quelle (Lebensfrage-Stimmen oder Tableau-Denker).
 *  Wirft bei kaputten Referenzen – Datentippfehler scheitern beim SSG-Build. */
export function getDenkraumTisch(id: string): DenkraumTischResolved | null {
  const d = DENKRAEUME[id]
  if (!d) return null

  let karten
  if (d.quelle.typ === 'tableau') {
    const topic = getTopic(d.quelle.id)
    if (!topic) throw new Error(`Denkraum ${id}: Tableau '${d.quelle.id}' fehlt`)
    const byId = new Map(topic.thinkers.map(t => [t.id, t]))
    karten = d.karten.map(k => {
      const t = byId.get(k.knoten)
      if (!t) throw new Error(`Denkraum ${id}: Denker '${k.knoten}' nicht im Tableau '${d.quelle.id}'`)
      const roh = t.lectio_brief ?? getVersion(t, 3) ?? ''
      return { ...k, name: t.name, these: k.these ?? '', text: entferneMarkup(roh) }
    })
  } else {
    const lf = getLebensfrage(d.quelle.id)
    if (!lf) throw new Error(`Denkraum ${id}: Lebensfrage '${d.quelle.id}' fehlt`)
    const byKnoten = new Map(lf.stimmen.map(s => [s.aus.knoten, s]))
    karten = d.karten.map(k => {
      const s = byKnoten.get(k.knoten)
      if (!s) throw new Error(`Denkraum ${id}: Stimme '${k.knoten}' nicht in Lebensfrage '${d.quelle.id}'`)
      const [name, ...rest] = s.ueberschrift.split(':')
      return { ...k, name, these: k.these ?? rest.join(':').trim(), text: s.text }
    })
  }

  const kartenIds = new Set(d.karten.map(k => k.knoten))
  for (const st of d.stellen) {
    for (const z of st.zwischen) {
      if (!kartenIds.has(z)) throw new Error(`Denkraum ${id}: Stelle '${st.id}' referenziert unbekannte Karte '${z}'`)
    }
  }
  for (const opt of d.verortung.optionen) {
    for (const z of [...opt.naehe, ...opt.reibung_mit]) {
      if (!kartenIds.has(z)) throw new Error(`Denkraum ${id}: Verortung '${opt.id}' referenziert unbekannte Karte '${z}'`)
    }
  }

  return { ...d, karten }
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
