import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1300, height: 1600 }, deviceScaleFactor: 1.2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(6000);
const fig = p.locator("figure").nth(4);
await fig.scrollIntoViewIfNeeded();
await p.waitForTimeout(2500);
await fig.screenshot({ path: join(OUT, "tall-frame-4-tablet.png") });
// measure tablet map height + left col height
const d = await p.evaluate(()=>{
  const f=document.querySelectorAll("figure")[4];
  const map=f.querySelector(".leaflet-container");
  const ft=f.getBoundingClientRect().top;
  return { figH:Math.round(f.getBoundingClientRect().height), mapH: map?Math.round(map.getBoundingClientRect().height):"none" };
});
console.log("tablet:", JSON.stringify(d));
await b.close();
