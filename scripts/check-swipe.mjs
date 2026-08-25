// Verifies touch-swipe gesture support on the video carousel.
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const PORT = process.env.PORT || 5173;
const outDir = path.resolve('screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, hasTouch: true });
const page = await context.newPage();

await page.goto(`http://localhost:${PORT}/#/s/productivity-solutions/labels`, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.locator('.video-carousel').scrollIntoViewIfNeeded();
await page.waitForTimeout(400);

const activeBefore = await page.locator('.video-carousel__item--active').getAttribute('data-index');
console.log('Active before swipe:', activeBefore);

const stageBox = await page.locator('.video-carousel__stage').boundingBox();
const startX = stageBox.x + stageBox.width * 0.75;
const endX = stageBox.x + stageBox.width * 0.25;
const y = stageBox.y + stageBox.height / 2;

// Simulate a left swipe (finger moves right-to-left) -> should go to "next"
await page.touchscreen.tap(startX, y).catch(() => {});
const cdp = await context.newCDPSession(page);
await cdp.send('Input.dispatchTouchEvent', {
  type: 'touchStart',
  touchPoints: [{ x: startX, y }],
});
await cdp.send('Input.dispatchTouchEvent', {
  type: 'touchMove',
  touchPoints: [{ x: endX, y }],
});
await cdp.send('Input.dispatchTouchEvent', {
  type: 'touchEnd',
  touchPoints: [],
});

await page.waitForTimeout(700);
const activeAfter = await page.locator('.video-carousel__item--active').getAttribute('data-index');
console.log('Active after left-swipe:', activeAfter);
await page.screenshot({ path: path.join(outDir, 'carousel-swipe-result.png') });

await browser.close();
