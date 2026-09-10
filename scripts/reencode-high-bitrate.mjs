// One-off batch re-encode for videos whose source bitrate is far higher than
// needed for smooth progressive-download streaming over the internet (some
// were 12-20 Mbps at 1080p — essentially near-mezzanine exports). Re-encodes
// with NVENC to a VBV-capped ~5 Mbps target, which is visually
// indistinguishable for this kind of screen/product-demo footage but far
// more resilient to real-world network conditions (kiosk on venue Wi-Fi).
//
// Usage: node scripts/reencode-high-bitrate.mjs
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIDEOS_ROOT = path.join(__dirname, '..', 'public', 'videos');
const OUT_ROOT = 'H:\\Bobst_Conference\\_reencode_out';

// Relative to public/videos/
const FILES = [
  'quality-color-consistency/labels/accucheck-full-edit.mp4',
  'productivity-solutions/labels/master-m6-oneecg-connect-live-demo.mp4',
  'sustainability-innovation/flexible-packaging/onebarrier-proof-points.mp4',
  'quality-color-consistency/flexible-packaging/oneecg-proof-points.mp4',
  'quality-color-consistency/folding-carton/drupa-proof-points-die-cutting.mp4',
  'productivity-solutions/folding-carton/tooling-toolink-cito-proof-points.mp4',
  'quality-color-consistency/labels/accucheck-b2-inspection.mp4',
  'productivity-solutions/labels/brook-whittle-full.mp4',
  'sustainability-innovation/labels/expand-label-production.mp4',
  'quality-color-consistency/labels/accucheck-b7-calibration-angle-stitch.mp4',
  'quality-color-consistency/labels/accucheck-b4-colorimetry.mp4',
  'quality-color-consistency/labels/accucheck-b5-barcodes-qr-codes.mp4',
  'quality-color-consistency/labels/accucheck-b3-registration.mp4',
  'quality-color-consistency/labels/accucheck-b9-color-uniformity.mp4',
  'quality-color-consistency/labels/accucheck-b10-nozzle-compensation.mp4',
  'quality-color-consistency/folding-carton/accuplaten-speed-patching.mp4',
  'quality-color-consistency/labels/accucheck-b8-color-to-color.mp4',
  'quality-color-consistency/labels/accucheck-b1-introduction.mp4',
  'quality-color-consistency/labels/accucheck-b11-recap.mp4',
  'lifecycle-performance-services/labels/service-performance-overview.mp4',
  'quality-color-consistency/labels/accucheck-b6-intro-calibration.mp4',
  'productivity-solutions/labels/all-in-one-modular-press.mp4',
  'quality-color-consistency/labels/techproofpoint-connect-quality-reports.mp4',
];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    p.stderr.on('data', (d) => { stderr += d.toString(); });
    p.on('close', (code) => {
      if (code === 0) resolve(stderr);
      else reject(new Error(`${cmd} exited ${code}\n${stderr.slice(-2000)}`));
    });
  });
}

function fmtMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1);
}

async function main() {
  const results = [];
  for (const rel of FILES) {
    const src = path.join(VIDEOS_ROOT, rel);
    const outPath = path.join(OUT_ROOT, rel);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    if (!fs.existsSync(src)) {
      console.warn(`SKIP (missing): ${rel}`);
      continue;
    }

    const origSize = fs.statSync(src).size;
    console.log(`\n[${results.length + 1}/${FILES.length}] Encoding ${rel} (${fmtMB(origSize)} MB)…`);
    const start = Date.now();

    try {
      await run('ffmpeg', [
        '-y',
        '-hwaccel', 'cuda',
        '-i', src,
        '-c:v', 'h264_nvenc',
        '-preset', 'p6',
        '-tune', 'hq',
        '-rc', 'vbr',
        '-cq', '23',
        '-b:v', '5000k',
        '-maxrate', '6000k',
        '-bufsize', '12000k',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        outPath,
      ]);
    } catch (err) {
      console.error(`FAILED: ${rel}\n${err.message}`);
      results.push({ rel, status: 'FAILED' });
      continue;
    }

    const newSize = fs.statSync(outPath).size;
    const secs = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`  -> ${fmtMB(newSize)} MB (${((1 - newSize / origSize) * 100).toFixed(0)}% smaller) in ${secs}s`);
    results.push({ rel, status: 'OK', origSize, newSize });
  }

  console.log('\n=== Summary ===');
  let totalOrig = 0;
  let totalNew = 0;
  for (const r of results) {
    if (r.status === 'OK') {
      totalOrig += r.origSize;
      totalNew += r.newSize;
      console.log(`OK    ${r.rel}  ${fmtMB(r.origSize)} -> ${fmtMB(r.newSize)} MB`);
    } else {
      console.log(`FAIL  ${r.rel}`);
    }
  }
  console.log(`\nTotal: ${fmtMB(totalOrig)} MB -> ${fmtMB(totalNew)} MB`);
}

main();
