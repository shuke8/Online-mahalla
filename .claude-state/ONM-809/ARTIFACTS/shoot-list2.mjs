import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1300, height: 1700 }, deviceScaleFactor: 1.4 });
const p = await ctx.newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text().slice(0,120));}); p.on("pageerror",e=>errs.push("PE:"+e.message.slice(0,120)));
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(3500);
for (const [i,name] of [[1,"list2-phone"],[5,"list2-tablet"]]) {
  const fig = p.locator("figure").nth(i);
  await fig.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1000);
  await fig.screenshot({ path: join(OUT, name+".png") });
  console.log(name, "saved");
}
console.log("errors:", errs.length, errs.slice(0,3).join(" | "));
await b.close();
