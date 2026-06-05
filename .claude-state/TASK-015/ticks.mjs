import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/viloyat/jizzakh", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
const classes = await p.evaluate(() => {
  const svg = document.querySelector("section svg.recharts-surface, section .recharts-wrapper svg");
  if (!svg) return { found: false };
  const gs = [...svg.querySelectorAll("g")].map((g) => g.getAttribute("class")).filter(Boolean);
  const texts = [...svg.querySelectorAll("text")].map((t) => t.textContent).slice(0, 10);
  return { found: true, gClasses: [...new Set(gs)].slice(0, 12), texts };
});
console.log(JSON.stringify(classes, null, 1));
await b.close();
