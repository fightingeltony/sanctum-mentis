// Rand-Artefakt-Gate für Lectio-Bilder (Bild-Stil-Kanon v2, Workflow Schritt 5).
//
// Prüft pro Kante den äusseren 10px-Streifen gegen den Streifen 14–24px weiter
// innen. Zwei belegte Artefakt-Formen werden erkannt:
//   1. Eingebrannter Rahmen/Passepartout: gleichmässiger Aussenstreifen mit
//      Farbsprung zum Innenbild (outerStd < 18 UND diff > 12).
//   2. Vollflächig glatter Randstreifen: outerStd < 5 – der Kanon verlangt
//      Korn ("slightly grainy"), eine derart glatte Kante ist fast immer
//      künstlich. Achtung: dunkle glatte Bildinhalte (Vorhang, Schatten)
//      können hier falsch anschlagen – Verdachtsfälle immer sichten, nie
//      blind neu generieren.
//
// Kalibriert auf 2k-Originale (1856×2304). Auf herunterskalierten Bildern
// (800px-WebP) schlägt die Uniformitäts-Regel häufiger falsch an, weil das
// Korn weggeglättet ist – Gate deshalb VOR der WebP-Konvertierung fahren.
//
// Aufruf:  node scripts/check-image-edges.js <bild> [<bild> ...]
// Exit-Code 1, wenn mindestens ein Bild Verdacht zeigt.
// eslint-disable-next-line @typescript-eslint/no-require-imports -- Node-CLI-Skript, kein ESM
const sharp = require('sharp');

async function stats(file, region) {
  // sharp.stats() ignoriert die Pipeline – extract erst über toBuffer materialisieren
  const buf = await sharp(file).extract(region).png().toBuffer();
  const s = await sharp(buf).stats();
  return { mean: s.channels.slice(0, 3).map(c => c.mean), std: s.channels.slice(0, 3).map(c => c.stdev) };
}
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const avgStd = s => (s[0] + s[1] + s[2]) / 3;

async function checkFile(file) {
  const { width: w, height: h } = await sharp(file).metadata();
  const T = 10, G = 14, I = 10;
  const edges = {
    top:    [{ left: 0, top: 0, width: w, height: T },       { left: 0, top: T + G, width: w, height: I }],
    bottom: [{ left: 0, top: h - T, width: w, height: T },   { left: 0, top: h - T - G - I, width: w, height: I }],
    left:   [{ left: 0, top: 0, width: T, height: h },       { left: T + G, top: 0, width: I, height: h }],
    right:  [{ left: w - T, top: 0, width: T, height: h },   { left: w - T - G - I, top: 0, width: I, height: h }],
  };
  let flagged = false;
  for (const [name, [outer, inner]] of Object.entries(edges)) {
    const o = await stats(file, outer);
    const i = await stats(file, inner);
    const d = dist(o.mean, i.mean);
    const suspect = avgStd(o.std) < 5 || (avgStd(o.std) < 18 && d > 12);
    if (suspect) flagged = true;
    console.log('  ' + name.padEnd(7), 'diff=' + d.toFixed(1).padStart(6), 'outerStd=' + avgStd(o.std).toFixed(1).padStart(6), suspect ? '  << RAHMEN-VERDACHT' : '');
  }
  return flagged;
}

(async () => {
  const files = process.argv.slice(2);
  if (files.length === 0) {
    console.error('Aufruf: node scripts/check-image-edges.js <bild> [<bild> ...]');
    process.exit(2);
  }
  let anyFlagged = false;
  for (const file of files) {
    console.log(file);
    const flagged = await checkFile(file);
    console.log(flagged ? '  ERGEBNIS: VERDACHT – sichten!' : '  ERGEBNIS: sauber');
    if (flagged) anyFlagged = true;
  }
  process.exit(anyFlagged ? 1 : 0);
})();
