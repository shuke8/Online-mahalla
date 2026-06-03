import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1920, height: 1200 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil: "networkidle", timeout: 25000 });
await p.waitForTimeout(4500);
const figs = p.locator("figure");
const n = await figs.count();
console.log("figures:", n);
for (let i=0;i<n;i++){
  const cap = (await figs.nth(i).locator("figcaption").innerText().catch(()=>"")).trim();
  await figs.nth(i).scrollIntoViewIfNeeded();
  await p.waitForTimeout(1200);
  await figs.nth(i).screenshot({ path: join(OUT, `frame-${i}.png`) });
  console.log(`frame-${i}: ${cap}`);
}
await b.close(); console.log("DONE");
