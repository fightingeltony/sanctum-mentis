import type { NextConfig } from "next";
import path from "path";
import fs from "fs";

// Walk up from __dirname until we find a directory containing node_modules/next.
// This makes the config work both in the main project and in git worktrees.
function findProjectRoot(start: string): string {
  let dir = start;
  while (true) {
    if (fs.existsSync(path.join(dir, "node_modules", "next"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return start;
    dir = parent;
  }
}

const nextConfig: NextConfig = {
  turbopack: {
    root: findProjectRoot(__dirname),
  },
  experimental: {
    // EXPERIMENT · View Transitions (CSS-Modernisierung Schritt 3, 3.7.26):
    // sanfter Cross-Fade bei Routen-Wechseln (Bibliothek → Tableau → Lectio).
    // Aktiviert React's <ViewTransition>-Boundary in src/app/layout.tsx
    // (RouteViewTransition). Abschalten: dieses Flag entfernen UND den
    // RouteViewTransition-Wrapper in layout.tsx auf {children} zurückbauen —
    // keine weiteren Abhängigkeiten. Doku: README «View Transitions».
    viewTransition: true,
  },
};

export default nextConfig;
