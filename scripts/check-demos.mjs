import { chromium } from 'playwright';
import { mkdirSync, readdirSync } from 'fs';

const BASE = 'http://localhost:5173';
const OUT = 'screenshots/demos';
mkdirSync(OUT, { recursive: true });

// Derived from the slide art on disk so this keeps covering every demo
// as more are added, rather than a hard-coded count drifting out of date.
const DEMO_COUNT = readdirSync('public/images/demos').filter((f) => f.endsWith('.jpg')).length;

// Kiosk target plus a couple of common panel sizes.
const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

  for (const route of ['#/', '#/demos']) {
    await page.goto(`${BASE}/${route}`, { waitUntil: 'load' });
    await page.waitForTimeout(900);

    const fits = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollHeight: doc.scrollHeight,
        viewportHeight: window.innerHeight,
        overflow: doc.scrollHeight - window.innerHeight,
      };
    });

    const label = route === '#/' ? 'hub' : 'demos-index';
    console.log(
      `${vp.name} ${label}: content ${fits.scrollHeight}px vs viewport ${fits.viewportHeight}px -> ` +
        (fits.overflow <= 1 ? 'FITS FOLD' : `OVERFLOWS by ${fits.overflow}px`)
    );
    await page.screenshot({ path: `${OUT}/${vp.name}-${label}.png` });
  }

  // Each demo slide, full-bleed.
  for (let n = 1; n <= DEMO_COUNT; n++) {
    await page.goto(`${BASE}/#/demos/${n}`, { waitUntil: 'load' });
    await page.waitForTimeout(500);
    const info = await page.evaluate(() => {
      const img = document.querySelector('.demo-slide__image');
      if (!img) return null;
      const r = img.getBoundingClientRect();
      return {
        rendered: `${Math.round(r.width)}x${Math.round(r.height)}`,
        natural: `${img.naturalWidth}x${img.naturalHeight}`,
        loaded: img.complete && img.naturalWidth > 0,
      };
    });
    console.log(`${vp.name} demo ${n}:`, JSON.stringify(info));
    if (vp.name === '1920x1080') {
      await page.screenshot({ path: `${OUT}/demo-${n}.png` });
    }
  }

  await page.close();
}

await browser.close();
