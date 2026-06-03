import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1500, height: 2000 }, deviceScaleFactor: 1.3 });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(6000); // tiles
for (const i of [2,3]) {
  const fig = p.locator("figure").nth(i);
  await fig.scrollIntoViewIfNeeded();
  await p.waitForTimeout(2500);
  await fig.screenshot({ path: join(OUT, `tall-frame-${i}.png`) });
  console.log("tall-frame-"+i+" saved");
}
await b.close();
