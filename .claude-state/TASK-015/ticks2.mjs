import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/viloyat/jizzakh", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
const info = await p.evaluate(() => {
  const wrappers = [...document.querySelectorAll(".recharts-wrapper")];
  const allSvgTexts = [...document.querySelectorAll("svg text")].map((t) => t.textContent ?? "");
  const arn = allSvgTexts.filter((t) => t.includes("Арнасой") || t.includes("Жиззах"));
  const tickEls = document.querySelectorAll(".recharts-cartesian-axis-tick").length;
  return { wrappers: wrappers.length, svgTextCount: allSvgTexts.length, sample: allSvgTexts.slice(0, 12), arn, tickEls };
});
console.log(JSON.stringify(info, null, 1));
await b.close();
