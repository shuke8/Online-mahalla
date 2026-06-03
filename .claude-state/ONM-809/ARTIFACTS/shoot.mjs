import { chromium } from "playwright";

const BASE = "http://localhost:3007";
const OUT = new URL("./", import.meta.url).pathname;

const shots = [
  { name: "entry-1440", url: "/infratuzilma", w: 1440, h: 900, full: false },
  { name: "list-1440", url: "/infratuzilma/obyektlar", w: 1440, h: 900, full: true },
  { name: "list-390", url: "/infratuzilma/obyektlar", w: 390, h: 844, full: true },
  { name: "form-1440", url: "/infratuzilma/obyektlar/torkul-okar-suv", w: 1440, h: 900, full: true },
  { name: "form-768", url: "/infratuzilma/obyektlar/torkul-okar-suv", w: 768, h: 1024, full: true },
  { name: "form-390", url: "/infratuzilma/obyektlar/torkul-okar-suv", w: 390, h: 844, full: true },
  { name: "form-320", url: "/infratuzilma/obyektlar/torkul-okar-suv", w: 320, h: 568, full: true },
];

const browser = await chromium.launch();
for (const s of shots) {
  const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  try {
    await page.goto(BASE + s.url, { waitUntil: "networkidle", timeout: 30000 });
  } catch {
    await page.goto(BASE + s.url, { waitUntil: "domcontentloaded", timeout: 30000 });
  }
  // let map tiles + animations settle
  await page.waitForTimeout(3000);
  // measure horizontal overflow
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
  }));
  await page.screenshot({ path: OUT + s.name + ".png", fullPage: s.full });
  console.log(`${s.name}: saved (${s.w}px) overflowX=${overflow.scrollW > overflow.innerW ? "YES " + overflow.scrollW + ">" + overflow.innerW : "no"} consoleErrors=${errors.length}`);
  if (errors.length) console.log("   ", errors.slice(0, 4).join(" | "));
  await ctx.close();
}
await browser.close();
console.log("DONE");
