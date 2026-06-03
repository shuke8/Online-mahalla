import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1700, height: 1000 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 30000 });
await p.waitForTimeout(4000);
const phone = p.locator("figure").nth(1);
const editable = phone.locator("input:not([readonly])").first(); // Режа номи
await editable.scrollIntoViewIfNeeded();
await editable.focus();
await p.waitForTimeout(500);
await phone.screenshot({ path: join(OUT, "field-focus2.png") });
const cls = await editable.evaluate(el => el.value + " | focused=" + (document.activeElement===el));
console.log("focused input:", cls);
await b.close();
