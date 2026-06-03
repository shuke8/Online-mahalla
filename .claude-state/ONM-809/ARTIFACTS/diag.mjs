import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3007/infratuzilma/obyektlar/torkul-okar-suv", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);
const offenders = await page.evaluate(() => {
  const vw = window.innerWidth;
  const out = [];
  document.querySelectorAll("*").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > vw + 1 || r.right > vw + 1) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.getAttribute("class") || "").slice(0, 70),
        w: Math.round(r.width),
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
    }
  });
  return { vw, count: out.length, top: out.slice(0, 18) };
});
console.log(JSON.stringify(offenders, null, 2));
await browser.close();
