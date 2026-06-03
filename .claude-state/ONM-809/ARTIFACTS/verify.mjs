import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const OUT = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE || "http://localhost:3000";

const shots = [
  { name: "v2-form-1440", url: "/infratuzilma/obyektlar/torkul-okar-suv", w: 1440, h: 900, full: true },
  { name: "v2-form-768", url: "/infratuzilma/obyektlar/torkul-okar-suv", w: 768, h: 1024, full: true },
  { name: "v2-form-390", url: "/infratuzilma/obyektlar/torkul-okar-suv", w: 390, h: 844, full: true },
  { name: "v2-form-320", url: "/infratuzilma/obyektlar/torkul-okar-suv", w: 320, h: 568, full: true },
  { name: "v2-list-390", url: "/infratuzilma/obyektlar", w: 390, h: 844, full: true },
  { name: "v2-form-390-landscape", url: "/infratuzilma/obyektlar/torkul-okar-suv", w: 844, h: 390, full: true },
];

const browser = await chromium.launch();
for (const s of shots) {
  const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 120)); });
  page.on("pageerror", (e) => errors.push("PAGEERR: " + e.message.slice(0, 120)));
  try { await page.goto(BASE + s.url, { waitUntil: "networkidle", timeout: 30000 }); }
  catch { await page.goto(BASE + s.url, { waitUntil: "domcontentloaded", timeout: 30000 }); }
  await page.waitForTimeout(3500);
  const ov = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, i: window.innerWidth }));
  await page.screenshot({ path: join(OUT, s.name + ".png"), fullPage: s.full });
  const bad = ov.s > ov.i + 1;
  console.log(`${s.name.padEnd(24)} ${String(s.w).padStart(4)}px  overflowX=${bad ? "FAIL " + ov.s + ">" + ov.i : "OK"}  errors=${errors.length}${errors.length ? " :: " + errors.slice(0,2).join(" | ") : ""}`);
  await ctx.close();
}
await browser.close();
console.log("DONE");
