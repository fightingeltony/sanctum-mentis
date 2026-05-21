import { getVersion } from './complexityEngine'
import type { Versioned } from './types'

export interface LectioNodeResult {
  text: string;
  isLectioBrief: boolean;
}

/**
 * Gibt den Knoten-Text für eine Lectio zurück.
 *
 * Priorität:
 * 1. `lectio_brief` — wenn vorhanden, wird dieser unabhängig vom Level gezeigt.
 *    Kein Annotation-Rendering: Der Brief hat keine [[Begriff:Erklärung]]-Markierungen.
 * 2. Standard: höchste `versions`-Stufe ≤ lectioLevel (identisch mit getVersion).
 * 3. Fallback: niedrigste verfügbare Stufe ≥ firstLevel — greift, wenn
 *    der Knoten einen höheren firstLevel hat als das Lectio-Level
 *    (z.B. Lectio level=2, Knoten firstLevel=5 → zeigt versions["5"]).
 */
export function getLectioNodeText(
  node: Versioned & { lectio_brief?: string },
  lectioLevel: number,
): LectioNodeResult | null {
  // 1. lectio_brief hat Vorrang
  if (node.lectio_brief) {
    return { text: node.lectio_brief, isLectioBrief: true }
  }

  // 2. Standard: höchste Version ≤ lectioLevel
  const standard = getVersion(node, lectioLevel)
  if (standard) return { text: standard, isLectioBrief: false }

  // 3. Fallback: niedrigste verfügbare Version ≥ firstLevel
  const keys = Object.keys(node.versions)
    .map(Number)
    .filter(k => k >= node.firstLevel)
    .sort((a, b) => a - b)
  return keys.length > 0
    ? { text: node.versions[keys[0]], isLectioBrief: false }
    : null
}
