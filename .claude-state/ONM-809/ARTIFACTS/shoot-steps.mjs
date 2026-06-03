import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1400, height: 1600 }, deviceScaleFactor: 1.4 });
const p = await ctx.newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text().slice(0,120));}); p.on("pageerror",e=>errs.push("PE:"+e.message.slice(0,120)));
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(5500);
const total = await p.locator("figure").count();
console.log("total figures:", total);
// phone dalolatnoma steps: indices 2,3,4,5
for (const [i,name] of [[2,"step1-malumot"],[3,"step2-rasm"],[4,"step3-xarita"],[5,"step4-yakun"]]) {
  const fig = p.locator("figure").nth(i);
  await fig.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
  await fig.screenshot({ path: join(OUT, name+".png") });
  console.log(name, "->", (await fig.locator("figcaption").innerText().catch(()=>"")).trim());
}
console.log("errors:", errs.length, errs.slice(0,3).join(" | "));
await b.close();
