import type { ConceptType } from './types'

export const CONCEPT_GLYPH: Record<ConceptType, string> = {
  principle:   '◆',
  method:      '⌘',
  argument:    '⚖',
  distinction: '⇆',
  school:      '◈',
}

export const CONCEPT_LABEL: Record<ConceptType, string> = {
  principle:   'Prinzip',
  method:      'Methode',
  argument:    'Argument',
  distinction: 'Unterscheidung',
  school:      'Strömung',
}
