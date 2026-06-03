import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1300, height: 1700 }, deviceScaleFactor: 1.1 });
const p = await ctx.newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text().slice(0,120));}); p.on("pageerror",e=>errs.push("PE:"+e.message.slice(0,120)));
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(6000);
const figs = await p.locator("figure").count();
console.log("total figures:", figs);
// tablet frames: 4=modules, 5=list, 6=form, 7=document
const map = { 4:"tablet-modules", 5:"tablet-list", 7:"tablet-document" };
for (const [i,name] of Object.entries(map)) {
  const fig = p.locator("figure").nth(Number(i));
  await fig.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1500);
  await fig.screenshot({ path: join(OUT, name+".png") });
  const cap=(await fig.locator("figcaption").innerText().catch(()=>"")).trim();
  console.log(name, "->", cap);
}
console.log("errors:", errs.length, errs.slice(0,3).join(" | "));
await b.close();
