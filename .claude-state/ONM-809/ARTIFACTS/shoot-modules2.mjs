import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1300, height: 2200 }, deviceScaleFactor: 1.3 });
const p = await ctx.newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text().slice(0,120));}); p.on("pageerror",e=>errs.push("PE:"+e.message.slice(0,120)));
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(3500);
// phone modules (figure 0) — categorized
await p.locator("figure").nth(0).scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
await p.locator("figure").nth(0).screenshot({ path: join(OUT, "modules2-phone.png") });
// tablet modules (figure 4)
await p.locator("figure").nth(4).scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
await p.locator("figure").nth(4).screenshot({ path: join(OUT, "modules2-tablet.png") });
// search state on phone: type into the phone modules search
const phoneSearch = p.locator("figure").nth(0).getByPlaceholder("Бўлим қидириш…");
await phoneSearch.fill("тадбир");
await p.waitForTimeout(700);
await p.locator("figure").nth(0).scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
await p.locator("figure").nth(0).screenshot({ path: join(OUT, "modules2-search.png") });
const res = await p.locator("figure").nth(0).innerText();
console.log("search 'тадбир' shows results:", /натижа топилди/u.test(res));
console.log("errors:", errs.length, errs.slice(0,3).join(" | "));
await b.close();
