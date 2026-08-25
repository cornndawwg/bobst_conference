// Verifies the home page fits within a single 1920x1080 (16:9 kiosk) screen
// without requiring scroll, and captures a screenshot for visual review.
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const PORT = process.env.PORT || 5173;
const outDir = path.resolve('screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const sizes = [
  { width: 1920, height: 1080, name: '1920x1080' },
  { width: 1600, height: 900, name: '1600x900' },
  { width: 1366, height: 768, name: '1366x768' },
];

const routes = [
  { path: '/', name: 'hub' },
  { path: '/#/s/productivity-solutions', name: 'station-productivity' },
  { path: '/#/s/digital-solutions', name: 'station-digital' },
];

const browser = await chromium.launch();

for (const route of routes) {
  for (const size of sizes) {
    const page = await browser.newPage({ viewport: { width: size.width, height: size.height } });
    await page.goto(`http://localhost:${PORT}${route.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const { scrollHeight, clientHeight } = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
    }));

    const fits = scrollHeight <= clientHeight;
    console.log(
      `[${route.name} @ ${size.name}] viewport=${clientHeight}px content=${scrollHeight}px -> ${fits ? 'FITS (no scroll)' : `OVERFLOW by ${scrollHeight - clientHeight}px`}`
    );

    await page.screenshot({ path: path.join(outDir, `fold-${route.name}-${size.name}.png`) });
    await page.close();
  }
}

await browser.close();
