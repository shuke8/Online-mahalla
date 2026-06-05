import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = ".claude-state/TASK-015";
mkdirSync(OUT, { recursive: true });
const results = [];
const ok = (name, pass, detail = "") => results.push({ name, pass, detail });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

const grabKpis = async () =>
  page.$$eval("section .grid.grid-cols-2 p.font-extrabold", (els) => els.map((e) => e.textContent));

// AC2: different viloyat → different numbers
await page.goto("http://localhost:3000/viloyat/jizzakh", { waitUntil: "networkidle" });
const jizzaxKpis = await grabKpis();
await page.goto("http://localhost:3000/viloyat/samarqand", { waitUntil: "networkidle" });
const samKpis = await grabKpis();
ok("AC2: viloyatlar har xil raqam", JSON.stringify(jizzaxKpis) !== JSON.stringify(samKpis), `jizzakh=${jizzaxKpis} vs samarqand=${samKpis}`);

// AC4(reload): deterministic
await page.goto("http://localhost:3000/viloyat/jizzakh", { waitUntil: "networkidle" });
const reload1 = await grabKpis();
await page.reload({ waitUntil: "networkidle" });
const reload2 = await grabKpis();
ok("AC4: reload'da barqaror", JSON.stringify(reload1) === JSON.stringify(reload2), `${reload1} === ${reload2}`);

// AC3: viloyat chart shows tuman names
await page.waitForTimeout(1500);
const xLabels = await page.$$eval("svg text", (els) => els.map((e) => e.textContent));
ok("AC3: viloyat chartida tuman nomlari", xLabels.some((l) => l && (l.includes("Арнасой") || l.includes("Жиззах шаҳри"))), `labels=${xLabels.slice(0, 6)}`);

// AC1+8: republic — 4 tabs, switching works
await page.goto("http://localhost:3000/respublika", { waitUntil: "networkidle" });
const tabs = await page.$$('[role="tab"]');
ok("AC1: respublikada 4 tab", tabs.length === 4, `tabs=${tabs.length}`);
const kpiBefore = await grabKpis();
for (let i = 1; i < tabs.length; i++) { await tabs[i].click(); await page.waitForTimeout(250); }
const kpiAfter = await grabKpis();
ok("AC8: tab almashganda kontent o'zgaradi", JSON.stringify(kpiBefore) !== JSON.stringify(kpiAfter), `${kpiBefore} → ${kpiAfter}`);
await page.screenshot({ path: `${OUT}/respublika-1440.png`, fullPage: true });

// AC1 height: tabbed section height vs old 4-card (~2400px+)
const sectionH = await page.$$eval("section.bg-white.rounded-2xl", (els) => Math.max(...els.map((e) => e.getBoundingClientRect().height)));
ok("AC1: blok balandligi ixcham (<900px)", sectionH < 900, `height=${Math.round(sectionH)}px`);

// AC5: Батафсил link
await page.click('a[href="/infratuzilma"]:has-text("Батафсил")');
await page.waitForURL("**/infratuzilma");
await page.waitForSelector('h3:has-text("инфратузилма")', { timeout: 10000 }).catch(() => {});
const oldCards = await page.$$eval("h3", (els) => els.filter((e) => e.textContent?.includes("инфратузилма")).length);
ok("AC5: Батафсил → /infratuzilma, eski ko'rinish", page.url().includes("/infratuzilma") && oldCards >= 2, `url=${page.url()}, oldCards=${oldCards}`);
await page.screenshot({ path: `${OUT}/infratuzilma-regression.png`, fullPage: true });

// AC3(tuman): 2 tabs + mahalla names
await page.goto("http://localhost:3000/tuman/jizzakh-city", { waitUntil: "networkidle" });
const tumanTabs = await page.$$('[role="tab"]');
ok("AC3: tumanда 2 tab", tumanTabs.length === 2, `tabs=${tumanTabs.length}`);
await page.waitForTimeout(1500);
const mfyLabels = await page.$$eval("svg text", (els) => els.map((e) => e.textContent));
ok("AC3: tuman chartida МФЙ nomlari", mfyLabels.some((l) => l && (l.includes("Янги ҳаёт") || l.includes("Мустақиллик"))), `labels=${mfyLabels.slice(0, 6)}`);
await page.screenshot({ path: `${OUT}/tuman-1440.png`, fullPage: true });

// AC6: viewports — no horizontal overflow
for (const w of [320, 375, 768, 1440]) {
  for (const url of ["/respublika", "/viloyat/jizzakh", "/tuman/jizzakh-city"]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto(`http://localhost:3000${url}`, { waitUntil: "networkidle" });
    const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
    ok(`AC6: ${url} @${w}px overflow yo'q`, sw <= iw, `scrollWidth=${sw} innerWidth=${iw}`);
  }
}
await page.setViewportSize({ width: 375, height: 800 });
await page.goto("http://localhost:3000/respublika", { waitUntil: "networkidle" });
await page.screenshot({ path: `${OUT}/respublika-375.png`, fullPage: true });

// Adversarial: invalid id
await page.goto("http://localhost:3000/viloyat/mavjud-emas", { waitUntil: "networkidle" });
const advTabs = await page.$$('[role="tab"]');
ok("ADV: noto'g'ri id crash qilmaydi", advTabs.length === 4 && errors.length === 0, `tabs=${advTabs.length}`);

// Adversarial: rapid tab switching
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/respublika", { waitUntil: "networkidle" });
for (let cycle = 0; cycle < 3; cycle++) {
  const t = await page.$$('[role="tab"]');
  for (const tab of t) await tab.click();
}
ok("ADV: tez tab almashtirish (12 klik)", errors.length === 0, `errors=${errors.length}`);

ok("AC7: console/page error yo'q", errors.length === 0, errors.slice(0, 3).join(" | "));

await browser.close();
let fails = 0;
for (const r of results) {
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}  — ${r.detail}`);
  if (!r.pass) fails++;
}
console.log(`\nTOTAL: ${results.length - fails}/${results.length} pass`);
process.exit(fails ? 1 : 0);
