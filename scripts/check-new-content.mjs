import { chromium } from 'playwright';

const routes = [
  '#/s/productivity-solutions/flexible-packaging',
  '#/s/productivity-solutions/folding-carton',
  '#/s/productivity-solutions/labels',
  '#/s/quality-color-consistency/flexible-packaging',
  '#/s/sustainability-innovation/flexible-packaging',
  '#/s/sustainability-innovation/labels',
  '#/s/lifecycle-performance-services/folding-carton',
  '#/s/lifecycle-performance-services/labels',
];

const browser = await chromium.launch();
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push('PAGEERROR: ' + err.message));
  await page.goto(`http://localhost:5173/${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const videoCount = await page.locator('.video-carousel__item').count();
  const slideCount = await page.locator('.slide-deck__slide').count();
  console.log(`${route} -> videos=${videoCount} slides=${slideCount}`);
  const safeName = route.replace(/[/#]/g, '_');
  await page.screenshot({ path: `screenshots/round2${safeName}.png`, fullPage: true });
  if (errors.length) console.log('  ERRORS:', errors.slice(0, 5));
  await page.close();
}
await browser.close();
