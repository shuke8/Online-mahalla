import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = ".claude-state/TASK-017";
mkdirSync(OUT, { recursive: true });
const results = [];
const ok = (name, pass, detail = "") => results.push({ name, pass, detail });

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1440, height: 950 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

const cardTitles = async () =>
  page.$$eval("h3", (els) =>
    els.map((e) => e.textContent?.trim() ?? "").filter((t) => t.includes("инфратузилма"))
  );

await page.goto("http://localhost:3000/infratuzilma", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

// 1) Republic default — 4 cards
let titles = await cardTitles();
ok("Republic: 4 karta", titles.length === 4, titles.join(" | "));
await page.screenshot({ path: `${OUT}/level-republic.png`, fullPage: true });

// Selector disabled states
const tumanDisabled = await page.$eval("select:nth-of-type(1)", () => {
  const sels = [...document.querySelectorAll("select")];
  return sels[1]?.disabled === true && sels[2]?.disabled === true;
});
ok("Default: tuman+mfy select disabled", tumanDisabled);

// 2) Map click → viloyat (jizzakh)
await page.evaluate(() => {
  const path = document.querySelector('svg [data-region-id="jizzakh"], svg path');
  // fallback: find by region click handler — click jizzakh path via its label text sibling
});
// Map clicking: click the path whose title/aria matches Жиззах — use bounding of text label
const clicked = await page.evaluate(() => {
  const texts = [...document.querySelectorAll("svg text")];
  const t = texts.find((x) => x.textContent === "Жиззах");
  if (!t) return false;
  const r = t.getBoundingClientRect();
  const el = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2 - 14);
  if (!el) return false;
  el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  return true;
});
await page.waitForTimeout(600);
titles = await cardTitles();
const viloyatSelVal = await page.$$eval("select", (s) => s[0]?.value);
ok("Map click: viloyat tanlandi (select sinxron)", clicked && viloyatSelVal === "jizzakh", `select=${viloyatSelVal}`);
ok("Viloyat: 4 karta", titles.length === 4, `${titles.length}`);
// chart label tumanlar bo'lishi kerak
await page.waitForTimeout(1200);
const svgTexts = await page.$$eval("svg text", (els) => els.map((e) => e.textContent ?? ""));
ok("Viloyat: chart tumanlar kesimida", svgTexts.some((t) => t.includes("Арнасой") || t.includes("Бахмал")), "");
await page.screenshot({ path: `${OUT}/level-viloyat.png`, fullPage: true });

// 3) Tuman ogir (arnasoy) → 3 cards: 2 mahalla + Оғир туман
await page.selectOption("select >> nth=1", "arnasoy");
await page.waitForTimeout(600);
titles = await cardTitles();
const hasOgirTuman = titles.some((t) => t.includes("Оғир туман"));
const hasYangiTuman = titles.some((t) => t.includes("Янги Ўзбекистон қиёфасидаги туман"));
const mahallaCount = titles.filter((t) => t.includes("маҳалла")).length;
ok("Tuman(ogir): 3 karta", titles.length === 3, titles.join(" | "));
ok("Tuman(ogir): 2 маҳалла + Оғир туман, Янги туман YO'Q", mahallaCount === 2 && hasOgirTuman && !hasYangiTuman);
await page.screenshot({ path: `${OUT}/level-tuman-ogir.png`, fullPage: true });

// 4) Tuman yangi (dostlik) → Янги туман kartasi
await page.selectOption("select >> nth=1", "dostlik");
await page.waitForTimeout(600);
titles = await cardTitles();
ok("Tuman(yangi): Янги туман kartasi", titles.length === 3 && titles.some((t) => t.includes("қиёфасидаги туман")) && !titles.some((t) => t.includes("Оғир туман")), titles.join(" | "));

// 5) MFY ogir (mustaqillik) → 1 karta Оғир маҳалла + xarita qizil
await page.selectOption("select >> nth=2", "mustaqillik");
await page.waitForTimeout(600);
titles = await cardTitles();
ok("MFY(ogir): 1 karta Оғир маҳалла", titles.length === 1 && titles[0].includes("Оғир маҳалла"), titles.join(" | "));
const fillOgir = await page.evaluate(() => {
  const paths = [...document.querySelectorAll("svg path")];
  return paths.some((p) => (p.getAttribute("fill") ?? "").toLowerCase() === "#ef4444" || getComputedStyle(p).fill === "rgb(239, 68, 68)");
});
ok("MFY(ogir): xarita qizil", fillOgir);
await page.screenshot({ path: `${OUT}/level-mfy-ogir.png`, fullPage: true });

// 6) MFY yangi (yangi-hayot) → 1 karta Янги маҳалла + xarita yashil
await page.selectOption("select >> nth=2", "yangi-hayot");
await page.waitForTimeout(600);
titles = await cardTitles();
ok("MFY(yangi): 1 karta Янги маҳалла", titles.length === 1 && titles[0].includes("қиёфасидаги маҳалла"), titles.join(" | "));
const fillYangi = await page.evaluate(() => {
  const paths = [...document.querySelectorAll("svg path")];
  return paths.some((p) => (p.getAttribute("fill") ?? "").toLowerCase() === "#16a34a" || getComputedStyle(p).fill === "rgb(22, 163, 74)");
});
ok("MFY(yangi): xarita yashil", fillYangi);
await page.screenshot({ path: `${OUT}/level-mfy-yangi.png`, fullPage: true });

// 7) Reset
await page.click('button:has-text("Тозалаш")');
await page.waitForTimeout(500);
titles = await cardTitles();
const selVals = await page.$$eval("select", (s) => s.map((x) => x.value));
ok("Reset: republic holatiga qaytdi", titles.length === 4 && selVals.every((v) => v === ""), `selects=${selVals}`);

// 8) Viloyat select orqali ham ishlaydi (map emas)
await page.selectOption("select >> nth=0", "samarqand");
await page.waitForTimeout(500);
titles = await cardTitles();
ok("Select orqali viloyat: 4 karta", titles.length === 4);

// 9) Determinizm: jizzakh vs samarqand raqamlari farqli
const grabFirstKpi = async () => page.$$eval("h3", (els) => {
  const card = els.find((e) => e.textContent?.includes("инфратузилма"))?.closest("div.bg-white");
  return card?.textContent?.slice(0, 400) ?? "";
});
const samText = await grabFirstKpi();
await page.selectOption("select >> nth=0", "jizzakh");
await page.waitForTimeout(500);
const jizText = await grabFirstKpi();
ok("Viloyatlar har xil ma'lumot", samText !== jizText);

// 10) Viewports overflow
for (const w of [320, 375, 768, 1440]) {
  await page.setViewportSize({ width: w, height: 950 });
  await page.goto("http://localhost:3000/infratuzilma", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
  ok(`Overflow yo'q @${w}px`, sw <= iw, `${sw}/${iw}`);
}
await page.setViewportSize({ width: 375, height: 950 });
await page.screenshot({ path: `${OUT}/level-republic-375.png`, fullPage: true });

// 11) Adversarial: rapid select switching
await page.setViewportSize({ width: 1440, height: 950 });
await page.goto("http://localhost:3000/infratuzilma", { waitUntil: "networkidle" });
for (let i = 0; i < 3; i++) {
  await page.selectOption("select >> nth=0", "jizzakh");
  await page.selectOption("select >> nth=1", "arnasoy");
  await page.selectOption("select >> nth=2", "mustaqillik");
  await page.click('button:has-text("Тозалаш")');
}
ok("Adversarial: 12 tez almashtirish errorsiz", errors.length === 0, `errors=${errors.length}`);
ok("Console/page errors yo'q", errors.length === 0, errors.slice(0, 2).join("|"));

await b.close();
let fails = 0;
for (const r of results) {
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}  ${r.detail ? "— " + r.detail : ""}`);
  if (!r.pass) fails++;
}
console.log(`\nTOTAL: ${results.length - fails}/${results.length} pass`);
process.exit(fails ? 1 : 0);
