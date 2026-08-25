import { chromium } from 'playwright';

const routes = [
  '#/s/quality-color-consistency/folding-carton',
  '#/s/quality-color-consistency/labels',
];

const browser = await chromium.launch();
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto(`http://localhost:5174/${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const items = await page.locator('.video-carousel__item').count();
  console.log(route, '-> carousel items:', items);

  await page.locator('.video-carousel__arrow--next').click();
  await page.waitForTimeout(600);
  await page.locator('.video-carousel__item--active').click();
  await page.waitForTimeout(1500);

  const iframeCount = await page.locator('.video-overlay__video--embed').count();
  const iframeSrc = iframeCount ? await page.locator('.video-overlay__video--embed').getAttribute('src') : null;
  console.log('  iframe embed count:', iframeCount, 'src:', iframeSrc);

  const safeName = route.replace(/[/#]/g, '_');
  await page.screenshot({ path: `screenshots/embed-check${safeName}.png` });
  console.log('  console errors:', errors.slice(0, 5));
  await page.close();
}
await browser.close();
