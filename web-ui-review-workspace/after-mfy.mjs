import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "web-ui-review-workspace/mfy-repair-plan/iteration-1/screenshots";
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();

const shoot = async (page, tag) => {
  await page.evaluate(() => {
    const heads = [...document.querySelectorAll("p")];
    const head = heads.find((e) => e.textContent?.includes("Объектлар ва таъмирлаш режаси"));
    head?.closest("button")?.parentElement
      ?.querySelectorAll("button[aria-expanded='false']")
      .forEach((btn) => btn.click());
  });
  await page.waitForTimeout(400);
  const box = await page.evaluate(() => {
    const heads = [...document.querySelectorAll("p")];
    const head = heads.find((e) => e.textContent?.includes("Объектлар ва таъмирлаш режаси"));
    const wrap = head?.closest("button")?.parentElement;
    if (!wrap) return null;
    const bx = wrap.getBoundingClientRect();
    return { x: Math.max(0, bx.x - 8), y: Math.max(0, bx.y + window.scrollY - 8), width: Math.min(bx.width + 16, window.innerWidth), height: bx.height + 16 };
  });
  if (box) await page.screenshot({ path: `${OUT}/${tag}.png`, clip: box, fullPage: true });
};

const errors = [];
for (const [vw, tag] of [[1440, "after-1440"], [375, "after-375"], [320, "after-320"]]) {
  for (const [id, suffix] of [["mustaqillik", "ogir"], ["yangi-hayot", "yangi"]]) {
    const p = await b.newPage({ viewport: { width: vw, height: 900 } });
    p.on("pageerror", (e) => errors.push(String(e)));
    p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await p.goto(`http://localhost:3000/mfy/${id}`, { waitUntil: "networkidle" });
    await p.waitForTimeout(600);
    await shoot(p, `${tag}-${suffix}`);
    const { sw, iw } = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
    console.log(`${tag}-${suffix}: overflow=${sw > iw ? `YES ${sw}>${iw}` : "no"}`);
    await p.close();
  }
}
console.log("console/page errors:", errors.length);
await b.close();
