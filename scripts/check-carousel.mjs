// Visual QA for the Labels page video carousel: captures the default state,
// after clicking "next", and the fullscreen player after selecting a video.
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const PORT = process.env.PORT || 5173;
const outDir = path.resolve('screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

await page.goto(`http://localhost:${PORT}/#/s/productivity-solutions/labels`, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const carousel = page.locator('.video-carousel');
await carousel.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(outDir, 'carousel-1-default.png') });

// Click "next" arrow to rotate the carousel
await page.locator('.video-carousel__arrow--next').click();
await page.waitForTimeout(700);
await page.screenshot({ path: path.join(outDir, 'carousel-2-after-next.png') });

// Click the now-active (front) item to open fullscreen playback
await page.locator('.video-carousel__item--active').click();
await page.waitForTimeout(1200);
await page.screenshot({ path: path.join(outDir, 'carousel-3-fullscreen.png') });

const videoState = await page.evaluate(() => {
  const v = document.querySelector('.video-overlay__video');
  return v ? { src: v.currentSrc, paused: v.paused, currentTime: v.currentTime, readyState: v.readyState } : null;
});
console.log('Video overlay state:', JSON.stringify(videoState));

// Close it
await page.locator('.video-overlay__close').click();
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(outDir, 'carousel-4-closed.png') });

await browser.close();
