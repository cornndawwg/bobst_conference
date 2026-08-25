// Visual QA helper: screenshots every route (top-of-page + full scrolled page)
// so styling can be diffed against the home page / brand reference.
// Usage: run `npm run dev` in one terminal, then `npm run screenshot` in another.
import { chromium } from 'playwright';
import path from 'path';

const PORT = process.env.PORT || 5173;
const BASE_URL = `http://localhost:${PORT}`;

const routes = [
  { path: '/', name: 'hub' },
  { path: '/#/s/productivity-solutions', name: 'productivity-solutions-home' },
  { path: '/#/s/productivity-solutions/flexible-packaging', name: 'productivity-flexible-packaging' },
  { path: '/#/s/productivity-solutions/folding-carton', name: 'productivity-folding-carton' },
  { path: '/#/s/productivity-solutions/labels', name: 'productivity-labels' },
  { path: '/#/s/quality-color-consistency', name: 'quality-home' },
  { path: '/#/s/quality-color-consistency/labels', name: 'quality-labels' },
  { path: '/#/s/sustainability-innovation', name: 'sustainability-home' },
  { path: '/#/s/lifecycle-performance-services', name: 'lifecycle-home' },
  { path: '/#/s/digital-solutions', name: 'digital-home' },
];

const outDir = path.resolve('screenshots');
const fs = await import('fs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.setViewportSize({ width: 1600, height: 1000 });

for (const r of routes) {
  await page.goto(`${BASE_URL}${r.path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // let animations/reveal finish
  await page.screenshot({ path: path.join(outDir, `${r.name}-top.png`) });

  // Scroll through the whole page in steps so IntersectionObserver-based
  // reveal animations actually fire (headless fullPage screenshots don't scroll).
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = 400;
  for (let y = 0; y < scrollHeight; y += step) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  const fullPath = path.join(outDir, `${r.name}-full.png`);
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log('Captured', r.name);
}

await browser.close();
