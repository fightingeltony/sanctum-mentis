import type { ConceptType } from './types'

export const CONCEPT_GLYPH: Record<ConceptType, string> = {
  axiom:     '◆',
  theory:    '⌘',
  concept:   '❖',
  phenomenon:'◎',
  method:    '⚡',
}

export const CONCEPT_LABEL: Record<ConceptType, string> = {
  axiom:     'Axiom / Urgrund',
  theory:    'Theorie / Modell',
  concept:   'Begriff / Konzept',
  phenomenon:'Phänomen',
  method:    'Methode / Praxis',
}
