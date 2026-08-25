// Generates poster thumbnail JPGs for videos by loading each one in a
// headless browser, seeking to a representative frame, and screenshotting
// just the video element. Used because ffmpeg isn't available in this
// environment.
//
// Usage: node scripts/generate-posters.mjs <videoUrlDir> <outDir> [--seek=8]
// Reads every .mp4 in public/<videoUrlDir>, writes posters to public/<outDir>.
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const [videoDirArg, outDirArg, ...rest] = process.argv.slice(2);
if (!videoDirArg || !outDirArg) {
  console.error('Usage: node scripts/generate-posters.mjs <videos/relative/dir> <posters/relative/dir> [--seek=8]');
  process.exit(1);
}
const seekArg = rest.find((a) => a.startsWith('--seek='));
const defaultSeek = seekArg ? Number(seekArg.split('=')[1]) : 8;

const publicDir = path.resolve('public');
const videoFsDir = path.join(publicDir, videoDirArg);
const outDir = path.join(publicDir, outDirArg);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(videoFsDir).filter((f) => f.toLowerCase().endsWith('.mp4'));
// Smallest files first so quick wins land before any slow/huge file.
files.sort((a, b) => fs.statSync(path.join(videoFsDir, a)).size - fs.statSync(path.join(videoFsDir, b)).size);

const PORT = process.env.PORT || 5173;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`timeout: ${label}`)), ms)),
  ]);
}

for (const file of files) {
  const outFile = file.replace(/\.mp4$/i, '.jpg');
  const url = `http://localhost:${PORT}/${videoDirArg}/${file}`;
  try {
    await page.setContent(`
      <html><body style="margin:0;background:#000;">
        <video id="v" src="${url}" preload="metadata" style="width:640px;height:360px;object-fit:cover;" muted></video>
      </body></html>
    `);
    const videoEl = page.locator('#v');
    await withTimeout(
      page.evaluate(async (seek) => {
        const v = document.getElementById('v');
        if (v.readyState < 1) {
          await new Promise((resolve) => v.addEventListener('loadedmetadata', resolve, { once: true }));
        }
        v.currentTime = seek;
        await new Promise((resolve) => v.addEventListener('seeked', resolve, { once: true }));
      }, defaultSeek),
      90000,
      file
    );
    await page.waitForTimeout(300);
    await videoEl.screenshot({ path: path.join(outDir, outFile), quality: 82, type: 'jpeg' });
    console.log('Generated poster for', file);
  } catch (err) {
    console.log('FAILED poster for', file, '-', err.message);
  }
}

await browser.close();
