// Generates poster thumbnail JPGs for the label videos by loading each video
// in a headless browser, seeking to a representative frame, and screenshotting
// just the video element. Used because ffmpeg isn't available in this environment.
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const videos = [
  { file: 'die-plate-change.mp4', seek: 4, out: 'die-plate-change.jpg' },
  { file: 'brook-whittle-full.mp4', seek: 8, out: 'brook-whittle.jpg' },
  { file: 'master-m6-oneecg-connect-live-demo.mp4', seek: 25, out: 'master-m6.jpg' },
];

const publicDir = path.resolve('public');
const outDir = path.join(publicDir, 'posters', 'label');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const PORT = process.env.PORT || 5173;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`timeout: ${label}`)), ms)),
  ]);
}

for (const v of videos) {
  const url = `http://localhost:${PORT}/videos/label/${v.file}`;
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
      }, v.seek),
      45000,
      v.file
    );
    await page.waitForTimeout(300);
    await videoEl.screenshot({ path: path.join(outDir, v.out), quality: 82, type: 'jpeg' });
    console.log('Generated poster for', v.file);
  } catch (err) {
    console.log('FAILED poster for', v.file, '-', err.message);
  }
}

await browser.close();
