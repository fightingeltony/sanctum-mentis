// Sanctum Mentis — Core Type Definitions
// Lern-Companion: Denker, Konzepte, Schulen, Einflüsse — gefiltert nach Komplexitäts-Level.

/** Themen-spezifisches Theme — wird als CSS-Variablen injiziert */
export interface TopicTheme {
  accent:     string;
  accentSoft: string;
}

/** Quadranten-Achsen — definieren den 2D-Raum für Konzepte und Denker */
export interface Quadrants {
  axisX: { label: string; left: string; right: string };
  axisY: { label: string; top: string;  bottom: string };
}

/** Ein Themengebiet (z.B. Erkenntnistheorie, Ethik, Politische Philosophie) */
export interface Topic {
  id: string;
  title: string;
  subtitle?: string;
  era?: string;             // freier Tag, z.B. "Antike – 21. Jh."
  theme?: TopicTheme;
  complexityLevels: number; // typischerweise 5
  quadrants: Quadrants;
  graphLayout?: 'manual' | 'auto';
  thinkerListStyle?: 'cards' | 'grouped';
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
  name: string;
  color: string;       // direkt verwendbar (oklch / hex)
  glyph: string;       // Symbol für die Liste, z.B. "◈"
  motto?: string;
  gx?: number;         // Layout-Anker für Influence-Graph (auto)
  gy?: number;
  labelDir?: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
  cluster?: { cx: number; cy: number; rx: number; ry: number; lx: number; ly: number; ta: 'start' | 'middle' | 'end' };
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
  | 'principle'    // Grundprinzip ("Cogito ergo sum")
  | 'method'       // Methode (Dialektik, Phänomenologie)
  | 'argument'     // Argument (Gottesbeweis, Trolley-Problem)
  | 'distinction'  // Unterscheidung (a priori / a posteriori)
  | 'school'       // Strömung/Position als Knoten

/** Ein Konzept im Quadranten-Raum */
export interface Concept extends Versioned {
  id: string;
  name: string;
  x: number;        // 0–100, Position im Quadranten-Raum
  y: number;        // 0–100, Position im Quadranten-Raum
  type: ConceptType;
  schoolId?: string;
  labelOffset?: { dx: number; dy: number; anchor: 'middle' | 'start' | 'end' };
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
  thinkers: Array<Thinker & { description: string; isNew: boolean }>;
  influences: Array<Influence & { description: string }>;
  concepts: Array<Concept & { description: string; isNew: boolean }>;
  context: string | null;
}
