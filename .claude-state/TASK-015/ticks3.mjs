import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/viloyat/jizzakh", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
const r = await p.evaluate(() => {
  const tick = document.querySelector(".recharts-cartesian-axis-tick");
  return {
    combo: document.querySelectorAll(".recharts-cartesian-axis-tick text").length,
    tickHTML: tick ? tick.outerHTML.slice(0, 300) : null,
  };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
