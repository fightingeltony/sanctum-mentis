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
};

export default nextConfig;
