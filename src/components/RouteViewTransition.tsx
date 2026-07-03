'use client'

// EXPERIMENT · View Transitions (CSS-Modernisierung Schritt 3, 3.7.26)
//
// Routen-Wechsel (Bibliothek → Tableau → Lectio …) bekommen einen kurzen
// Cross-Fade über die native View-Transitions-API, orchestriert von Reacts
// experimenteller <ViewTransition>-Boundary (benötigt das Next-Flag
// `experimental.viewTransition` in next.config.ts).
//
// - Nur Routen-Wechsel — die Sternkarte behält ihre eigenen Übergänge,
//   innerhalb einer Seite animiert hier nichts.
// - prefers-reduced-motion: reduce → keine Transition (globals.css,
//   ::view-transition-Regeln).
// - Browser ohne View-Transitions-Support: normaler harter Wechsel.
//
// Rückbau: Flag in next.config.ts entfernen und diesen Wrapper in
// src/app/layout.tsx durch {children} ersetzen. Keine weiteren
// Abhängigkeiten. Doku: README «View Transitions (Experiment)».

import * as React from 'react'

// Next aliasiert 'react' im App Router auf seine vendored Canary, die
// <ViewTransition> exportiert; die stabilen React-Types (19.2) kennen den
// Export noch nicht — daher der Cast. Fehlt der Export zur Laufzeit
// (z. B. Flag entfernt, React-Version gewechselt), rendern wir die
// Children unverändert — kein Crash, nur kein Cross-Fade.
const ViewTransition = (React as unknown as {
  ViewTransition?: React.ComponentType<{ children: React.ReactNode }>
}).ViewTransition

export default function RouteViewTransition({ children }: { children: React.ReactNode }) {
  if (!ViewTransition) return <>{children}</>
  return <ViewTransition>{children}</ViewTransition>
}
