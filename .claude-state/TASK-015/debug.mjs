import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 320, height: 800 } });

// 1) Overflow culprits at 320px
for (const url of ["/respublika", "/viloyat/jizzakh"]) {
  await page.goto(`http://localhost:3000${url}`, { waitUntil: "networkidle" });
  const culprits = await page.evaluate(() => {
    const iw = window.innerWidth;
    const out = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > iw + 1 && r.width < document.documentElement.scrollWidth + 5) {
        const cls = (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 80);
        out.push(`${el.tagName}.${cls} right=${Math.round(r.right)} w=${Math.round(r.width)}`);
      }
    });
    return out.slice(0, 12);
  });
  console.log(`\n=== ${url} @320 ===`);
  culprits.forEach((c) => console.log(c));
}

// 2) Chart tick selector check (viloyat)
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/viloyat/jizzakh", { waitUntil: "networkidle" });
const t1 = await page.$$eval(".recharts-xAxis tspan", (els) => els.map((e) => e.textContent).slice(0, 8));
const t2 = await page.$$eval(".recharts-cartesian-axis-tick text", (els) => els.map((e) => e.textContent).slice(0, 8));
console.log("\ntspan all:", JSON.stringify(t1));
console.log("tick text:", JSON.stringify(t2));

// 3) /infratuzilma old card title elements
await page.goto("http://localhost:3000/infratuzilma", { waitUntil: "networkidle" });
const titles = await page.evaluate(() =>
  [...document.querySelectorAll("h1,h2,h3,h4,p")].map((e) => e.textContent?.trim() ?? "").filter((t) => t.includes("инфратузилма")).slice(0, 6)
);
const tags = await page.evaluate(() =>
  [...document.querySelectorAll("h1,h2,h3,h4,p")].filter((e) => e.textContent?.includes("инфратузилма")).map((e) => e.tagName).slice(0, 6)
);
console.log("\ninfra titles:", JSON.stringify(titles), tags);

await browser.close();
