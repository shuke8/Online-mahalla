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
const clickSvgLabel = async (text) =>
  page.evaluate((label) => {
    const t = [...document.querySelectorAll("svg text")].find((x) => x.textContent === label);
    if (!t) return false;
    const r = t.getBoundingClientRect();
    const el = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2 - 12);
    if (!el || el.tagName === "text") return false;
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    return true;
  }, text);

await page.goto("http://localhost:3000/infratuzilma", { waitUntil: "networkidle" });
await page.waitForTimeout(900);

// 1) Republic: viloyatlar SVG (14 path), 4 karta
let titles = await cardTitles();
const regionPaths = await page.$$eval("svg path", (els) => els.length);
ok("Republic: viloyat SVG + 4 karta", titles.length === 4 && regionPaths >= 14, `paths=${regionPaths}`);

// 2) Map: Жиззах bosish → tumanlar drill xaritasi (12 polygon)
const c1 = await clickSvgLabel("Жиззах");
await page.waitForTimeout(700);
const tumanCells = await page.$$eval("svg polygon", (els) => els.length);
const hasArnasoy = await page.$$eval("svg text", (els) => els.some((t) => t.textContent === "Арнасой"));
ok("Viloyat: tumanlar drill xaritasi (12 katak)", c1 && tumanCells === 12 && hasArnasoy, `cells=${tumanCells}`);
titles = await cardTitles();
ok("Viloyat: 4 karta", titles.length === 4);
await page.screenshot({ path: `${OUT}/drill-tuman-map.png`, fullPage: false });

// 3) Drill xaritadan Арнасой bosish → mahallalar xaritasi + 3 karta
const c2 = await clickSvgLabel("Арнасой");
await page.waitForTimeout(700);
const mfyLegend = await page.$$eval("span", (els) => els.some((t) => t.textContent === "Оғир маҳалла"));
const hasMfyCell = await page.$$eval("svg text", (els) => els.some((t) => (t.textContent ?? "").includes("Мустақиллик")));
titles = await cardTitles();
ok("Tuman: mahallalar drill xaritasi", c2 && mfyLegend && hasMfyCell);
ok("Tuman(arnasoy=ogir): 3 karta + Оғир туман", titles.length === 3 && titles.some((t) => t.includes("Оғир туман")), titles.join(" | "));
await page.screenshot({ path: `${OUT}/drill-mfy-map.png`, fullPage: false });

// 4) Mahalla xaritasidan Мустақиллик bosish → 1 karta, katak highlight
const c3 = await clickSvgLabel("Мустақиллик");
await page.waitForTimeout(700);
titles = await cardTitles();
const selectedStroke = await page.$$eval("svg polygon", (els) =>
  els.some((p) => p.getAttribute("stroke") === "#FFFFFF" && Number(p.getAttribute("stroke-width")) >= 3)
);
ok("MFY: xaritadan tanlash → 1 karta Оғир маҳалла", c3 && titles.length === 1 && titles[0].includes("Оғир маҳалла"), titles.join(""));
ok("MFY: tanlangan katak highlight (oq stroke)", selectedStroke);
const mfySelVal = await page.$$eval("select", (s) => s[2]?.value);
ok("MFY: select sinxron", mfySelVal === "mustaqillik", `select=${mfySelVal}`);
await page.screenshot({ path: `${OUT}/drill-mfy-selected.png`, fullPage: false });

// 5) Breadcrumb: Жиззах bosish → tumanlar xaritasiga qaytadi, 4 karta
await page.click('nav[aria-label="Харита даражаси"] button:has-text("Жиззах")');
await page.waitForTimeout(600);
titles = await cardTitles();
const backCells = await page.$$eval("svg polygon", (els) => els.length);
ok("Breadcrumb: viloyatga qaytish (tumanlar xaritasi + 4 karta)", titles.length === 4 && backCells === 12);

// 6) Breadcrumb: Ўзбекистон → respublika xaritasi
await page.click('nav[aria-label="Харита даражаси"] button:has-text("Ўзбекистон")');
await page.waitForTimeout(600);
titles = await cardTitles();
const backPaths = await page.$$eval("svg path", (els) => els.length);
ok("Breadcrumb: respublikaga qaytish", titles.length === 4 && backPaths >= 14);

// 7) Selector orqali tanlash ham drill xaritani ochadi
await page.selectOption("select >> nth=0", "samarqand");
await page.waitForTimeout(500);
const samCells = await page.$$eval("svg polygon", (els) => els.length);
ok("Selector: viloyat → tumanlar xaritasi", samCells === 12);
await page.selectOption("select >> nth=1", "dostlik");
await page.waitForTimeout(500);
titles = await cardTitles();
ok("Selector: tuman(yangi) → mahalla xaritasi + Янги туман kartasi", titles.length === 3 && titles.some((t) => t.includes("қиёфасидаги туман")));

// 8) Viewports overflow
for (const w of [320, 375, 768, 1440]) {
  await page.setViewportSize({ width: w, height: 950 });
  await page.waitForTimeout(300);
  const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
  ok(`Overflow yo'q @${w}px`, sw <= iw, `${sw}/${iw}`);
}

ok("Console/page errors yo'q", errors.length === 0, errors.slice(0, 2).join("|"));

await b.close();
let fails = 0;
for (const r of results) {
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}  ${r.detail ? "— " + r.detail : ""}`);
  if (!r.pass) fails++;
}
console.log(`\nTOTAL: ${results.length - fails}/${results.length} pass`);
process.exit(fails ? 1 : 0);
