import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/infratuzilma/obyektlar/torkul-okar-suv", { waitUntil: "networkidle" });
await p.waitForTimeout(3500);
// full viewport (detailed)
await p.screenshot({ path: join(OUT, "detail-1440-viewport.png") });
console.log("viewport saved");
await b.close();
