import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1700, height: 1000 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 30000 });
await p.waitForTimeout(4000);
const phone = p.locator("figure").nth(1);
// focus режа номи (text input, not readonly, not numeric)
const rejaNomi = phone.locator("input").filter({ hasNot: p.locator("[readonly]") }).first();
await rejaNomi.scrollIntoViewIfNeeded();
await rejaNomi.click();
await p.waitForTimeout(500);
await phone.screenshot({ path: join(OUT, "field-focus.png") });
console.log("focus shot saved");
await b.close();
