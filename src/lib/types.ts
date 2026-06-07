// Sanctum Mentis — Core Type Definitions
// Lern-Companion: Denker, Konzepte, Schulen, Einflüsse — gefiltert nach Komplexitäts-Level.

/** Sammlungs-Spur — kuratorische Architektur-Ebene */
export type Spur = 'erkenntnis' | 'handlung' | 'existenz' | 'wandlung' | 'menschenbild'

/** Themen-spezifisches Theme — wird als CSS-Variablen injiziert */
export interface TopicTheme {
  accent:     string;
  accentSoft: string;
}

/** Quadranten-Achsen — definieren den 2D-Raum für Konzepte und Denker */
export interface Quadrants {
  axisX: {
    label: string;
    left: string;   leftHint?: string;   // optionaler Erklär-Untertitel
    right: string;  rightHint?: string;
  };
  axisY: {
    label: string;
    top: string;    topHint?: string;
    bottom: string; bottomHint?: string;
  };
}

/** Ein Themengebiet (z.B. Erkenntnistheorie, Ethik, Politische Philosophie) */
export interface Topic {
  id: string;
  title: string;
  subtitle?: string;
  intro?: string;           // lebensweltliche Einstiegsfrage, sichtbar ab L1
  era?: string;             // freier Tag, z.B. "Antike – 21. Jh."
  theme?: TopicTheme;
  complexityLevels: number; // typischerweise 5
  quadrants: Quadrants;
  graphLayout?: 'manual' | 'auto';
  thinkerListStyle?: 'cards' | 'grouped';
  synthesis?: string;       // kuratorische Einordnung, sichtbar nur auf L5
}

/** Ein Komplexitäts-Level (1 … complexityLevels) */
export interface Level {
  id: number;
  label: string;       // "Einstieg", "Vertiefung", "Synthese", …
  short: string;       // "L1", "L2", …
  filled: boolean;
  description?: string;
}

/** Eine philosophische Schule / Strömung */
export interface School {
  id: string;
  label: string;
  color: string;       // direkt verwendbar (oklch / hex)
  glyph: string;       // Symbol für die Liste, z.B. "◈"
  motto?: string;
  gx?: number;         // Layout-Anker für Influence-Graph (auto)
  gy?: number;
  labelDir?: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
  cluster?: { cx: number; cy: number; rx: number; ry: number; lx: number; ly: number; ta: 'start' | 'middle' | 'end' };
  lectio_brief?: string;    // optional 2–3-Satz-Ankerpunkt für Lectio-Modus
}

/**
 * Kern-Interface: Versionierte Inhalte.
 * `versions` ist Level-ID → Beschreibungstext. Die Engine wählt die höchste
 * Version-ID ≤ aktuelles Level. Auf Level 1 sieht der Lernende nur die
 * einfachste Erklärung; auf Level 5 die volle Tiefe.
 */
export interface Versioned {
  firstLevel: number;
  versions: Record<number, string>;
}

/** Ein Denker (Philosoph, Theoretiker, Schule-Vertreter) */
export interface Thinker extends Versioned {
  id: string;
  name: string;
  schoolId: string;
  lifespan?: string;        // z.B. "1724–1804"
  graphX?: number;          // SVG-Position im Influence-Graph (manual layout)
  graphY?: number;
  lectio_brief?: string;    // optional 2–3-Satz-Ankerpunkt für Lectio-Modus
}

/** Beziehungstypen zwischen Denkern bzw. zwischen Denkern und Konzepten */
export type InfluenceType =
  | 'influence'    // X beeinflusste Y
  | 'critique'     // Y kritisierte X
  | 'student-of'   // Y war Schüler von X
  | 'parallel'     // entwickelten unabhängig Ähnliches
  | 'rejection'    // Y verwarf X komplett

/** Eine Beziehung zwischen zwei Denkern */
export interface Influence extends Versioned {
  from: string;       // Thinker.id
  to:   string;       // Thinker.id
  type: InfluenceType;
}

/** Konzept-Kategorien für Filterung im QuadrantPlot */
export type ConceptType =
  | 'axiom'        // Unumstößliches Fundament, nicht weiter ableitbar (Atman, Cogito)
  | 'theory'       // Komplexes Erklärungsgebäude oder Modell (Ego-Tunnel, Individuation)
  | 'concept'      // Spezifischer Begriff / Bauelement innerhalb einer Theorie (Tabula rasa)
  | 'phenomenon'   // Beobachtung oder beschreibbarer Zustand (Induktionsproblem, Flow)
  | 'method'       // Erkenntnisweg oder anwendbare Praxis (Falsifikation, Meditation)

/** Ein Konzept im Quadranten-Raum */
export interface Concept extends Versioned {
  id: string;
  name: string;
  x: number;        // 0–100, Position im Quadranten-Raum
  y: number;        // 0–100, Position im Quadranten-Raum
  type: ConceptType;
  schoolId?: string;
  primaryThinker?: string;  // optionaler Denker-ID-Override für das Karten-Label
  labelOffset?: { dx: number; dy: number; anchor: 'middle' | 'start' | 'end' };
  lectio_brief?: string;    // optional 2–3-Satz-Ankerpunkt für Lectio-Modus
}

/** Kompletter Datensatz für ein Themengebiet */
export interface TopicData {
  topic: Topic;
  levels: Level[];
  schools: School[];
  thinkers: Thinker[];
  influences: Influence[];
  concepts: Concept[];
  contextByLevel?: Record<number, string | null>;
}

// ─── Engine Utility Types ────────────────────────────────────

/** Ergebnis der Engine für die UI */
export interface LevelState {
  level: Level;
  thinkers: Array<Thinker & { description: string; isNew: boolean; isDeepened: boolean }>;
  influences: Array<Influence & { description: string }>;
  concepts: Array<Concept & { description: string; isNew: boolean }>;
  context: string | null;
}

// ─── Lectio Types ────────────────────────────────────────────

/** Erzählende Ergänzung für eine Lectio-Station (ton: 'erzählend-erfahrend') */
export interface LectioNarrative {
  hook: string;     // Einstieg über Alltagserfahrung
  body: string[];   // 1–3 Absätze, Lehre erzählend
  kernel: string;   // EXAKTER Teilstring aus body → als <em class="kernel"> hervorheben
  bridge: string;   // Übergang; identisch mit step.transition
}

/** Eine Station im Lectio-Pfad */
export interface LectioStep {
  nodeId: string | string[];
  nodeType: 'thinker' | 'concept' | 'school';
  brief?: string;
  step_brief?: string;   // überschreibt den Knoten-Text NUR für diese Station
                         // (Ein-Werk-Lectio: derselbe Knoten an mehreren Stationen
                         // mit verschiedenem Text). Annotationsfrei, wie lectio_brief.
                         // Nur für Einzelknoten-Stationen — nicht bei Doppelstationen.
  narrative?: LectioNarrative;  // erzählende Form — nur bei ton: 'erzählend-erfahrend'
  transition: string;
}

/** Ein kuratorischer Lesepfad durch ein Tableau */
export interface Lectio {
  id: string;
  tableauId: string;
  title: string;
  focus: string;
  thesis: string;
  path_type?: string;    // u.a. 'narrativ-historisch', 'konkurrierend-konfrontativ',
                         // 'emotional-kumulativ', 'destruktiv-aufbauend',
                         // 'kontemplativ-vertiefend' — bisher implizit, jetzt benennbar
  ton?: 'expositorisch' | 'erzählend-erfahrend';  // fehlendes Feld = expositorisch
  level: number;
  estimated_minutes: number;
  intro: string;
  path: LectioStep[];
  closing_synthesis: string;
  closing_question: string;
}

/** Kompakte Lectio-Vorschau für Discovery im Tableau-Kopf */
export interface LectioSummary {
  id: string;
  title: string;
  focus: string;
  estimated_minutes: number;
  stationCount: number;
  ton?: string;
}

// ─── Lebensfragen Types ──────────────────────────────────────

/** Herkunft einer Stimme in einer Lebensfrage */
export interface LebensfragQuelle {
  tableau: string;
  knoten: string;
}

/** Eine Stimme in einer Lebensfrage */
export interface LebensfrageStimme {
  aus: LebensfragQuelle;
  ueberschrift: string;
  text: string;
}

/** Tableau-übergreifende Stimmen-Sammlung zu einer konkreten Lebensfrage */
export interface Lebensfrage {
  id: string;
  title: string;
  anker: string;
  intro: string;
  stimmen: LebensfrageStimme[];
  schluss: string;
  kuratiert: string;
  kuratiert_aus_tableaus: string[];
}
