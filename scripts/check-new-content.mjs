import { chromium } from 'playwright';

const routes = [
  '#/s/productivity-solutions',
  '#/s/productivity-solutions/flexible-packaging',
  '#/s/productivity-solutions/folding-carton',
  '#/s/quality-color-consistency/flexible-packaging',
  '#/s/quality-color-consistency/folding-carton',
  '#/s/quality-color-consistency/labels',
  '#/s/sustainability-innovation/flexible-packaging',
  '#/s/sustainability-innovation/labels',
  '#/s/lifecycle-performance-services/flexible-packaging',
  '#/s/lifecycle-performance-services/labels',
  '#/s/digital-solutions/flexible-packaging',
  '#/s/digital-solutions/folding-carton',
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
  const cardImgCount = await page.locator('.card__image').count();
  console.log(`${route} -> videos=${videoCount} slides=${slideCount} cardImages=${cardImgCount}`);
  const safeName = route.replace(/[/#]/g, '_');
  await page.screenshot({ path: `screenshots/newcontent${safeName}.png`, fullPage: true });
  if (errors.length) console.log('  ERRORS:', errors.slice(0, 5));
  await page.close();
}
await browser.close();
