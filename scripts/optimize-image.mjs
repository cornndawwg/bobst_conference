// One-off helper: resize + recompress a source image (PNG/JPEG straight out of
// a PPTX media export) down to a reasonable web thumbnail/carousel size.
// Usage: node scripts/optimize-image.mjs <srcPath> <destPath> [--width=1280]
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const [srcArg, destArg, ...rest] = process.argv.slice(2);
if (!srcArg || !destArg) {
  console.error('Usage: node scripts/optimize-image.mjs <src> <dest> [--width=1280]');
  process.exit(1);
}
const widthArg = rest.find((a) => a.startsWith('--width='));
const width = widthArg ? Number(widthArg.split('=')[1]) : 1280;

const destDir = path.dirname(destArg);
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

await sharp(srcArg)
  .resize({ width, withoutEnlargement: true })
  .jpeg({ quality: 82 })
  .toFile(destArg);

const { size } = fs.statSync(destArg);
console.log(`${destArg} (${(size / 1024).toFixed(0)} KB)`);
