import type { Versioned, TopicData, LevelState, Level } from './types';

/**
 * Gibt die neueste Beschreibung zurück, die auf `level` bekannt ist.
 * Kern des Lern-Pacing: wählt die höchste Version-ID ≤ level.
 * Identisches Pattern wie der Spoiler-Schutz der Carta-Librorum-Engine.
 */
export function getVersion(item: Versioned, level: number): string | null {
  const keys = Object.keys(item.versions)
    .map(Number)
    .filter(k => k <= level)
    .sort((a, b) => b - a);
  return keys.length > 0 ? item.versions[keys[0]] : null;
}

/** Prüft, ob ein Element auf diesem Level bereits freigeschaltet ist. */
export function isVisible(item: Versioned, level: number): boolean {
  return item.firstLevel <= level;
}

/** Kontext (Lage der Forschung / Epoche) für ein Level. */
export function getContextForLevel(
  contexts: Record<number, string | null> | undefined,
  level: number,
): string | null {
  if (!contexts) return null;
  const keys = Object.keys(contexts)
    .map(Number)
    .filter(k => k <= level)
    .sort((a, b) => b - a);
  if (keys.length === 0) return null;
  return contexts[keys[0]];
}

/**
 * Berechnet den kompletten sichtbaren Zustand für ein Komplexitäts-Level.
 * Zentraler Entry-Point für die UI.
 */
export function computeLevelState(data: TopicData, levelId: number): LevelState {
  const level: Level = data.levels.find(l => l.id === levelId)
    ?? { id: levelId, label: `Level ${levelId}`, short: `L${levelId}`, filled: false };

  const thinkers = data.thinkers
    .filter(t => isVisible(t, levelId))
    .map(t => ({
      ...t,
      description: getVersion(t, levelId) ?? '',
      isNew: t.firstLevel === levelId,
    }))
    .filter(t => t.description !== '');

  const influences = data.influences
    .filter(i => isVisible(i, levelId))
    .map(i => ({
      ...i,
      description: getVersion(i, levelId) ?? '',
    }))
    .filter(i => i.description !== '');

  const concepts = data.concepts
    .filter(c => isVisible(c, levelId))
    .map(c => ({
      ...c,
      description: getVersion(c, levelId) ?? '',
      isNew: c.firstLevel === levelId,
    }))
    .filter(c => c.description !== '');

  const context = getContextForLevel(data.contextByLevel, levelId);

  return { level, thinkers, influences, concepts, context };
}

/** Anzahl noch nicht freigeschalteter Konzepte. */
export function getHiddenConceptsCount(data: TopicData, level: number): number {
  return data.concepts.filter(c => !isVisible(c, level)).length;
}

/** Slider-Füll-Prozentsatz (für Mobile-Strip). */
export function getSliderPercent(levelId: number, totalLevels: number): number {
  return totalLevels > 1 ? ((levelId - 1) / (totalLevels - 1)) * 100 : 0;
}
