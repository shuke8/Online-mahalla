import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "web-ui-review-workspace/mfy-repair-plan/iteration-1";
mkdirSync(`${OUT}/screenshots`, { recursive: true });
const b = await chromium.launch();

for (const [vw, vh, tag] of [[1440, 900, "1440"], [375, 812, "375"]]) {
  const p = await b.newPage({ viewport: { width: vw, height: vh } });
  await p.goto("http://localhost:3000/mfy/yangi-hayot", { waitUntil: "networkidle" });
  await p.waitForTimeout(800);

  const metrics = await p.evaluate(() => {
    const heads = [...document.querySelectorAll("p")];
    const head = heads.find((e) => e.textContent?.includes("Объектлар ва таъмирлаш режаси"));
    if (!head) return { found: false };
    const wrap = head.closest("button")?.parentElement;
    const list = wrap?.querySelector(":scope > div.space-y-2");
    const cards = list ? [...list.children] : [];
    const r = (el) => { const bx = el.getBoundingClientRect(); return { w: Math.round(bx.width), h: Math.round(bx.height) }; };
    const fs = (el) => (el ? getComputedStyle(el).fontSize : null);
    const cardData = cards.slice(0, 8).map((c) => {
      const title = c.querySelector("p");
      const badge = c.querySelector("span.rounded-full");
      const progress = c.querySelector(".h-1");
      return {
        rect: r(c),
        titleFs: fs(title),
        badgeFs: fs(badge),
        progressH: progress ? r(progress).h : null,
      };
    });
    const li = wrap?.querySelector("li");
    const liData = li ? { fs: fs(li.querySelector("span")), h: r(li).h } : null;
    return {
      found: true,
      sectionW: wrap ? r(wrap).w : null,
      headFs: fs(head),
      cardCount: cards.length,
      cards: cardData,
      checklistItem: liData,
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
    };
  });
  console.log(`=== ${tag} ===`);
  console.log(JSON.stringify(metrics, null, 1));

  await p.evaluate(() => {
    const heads = [...document.querySelectorAll("p")];
    const head = heads.find((e) => e.textContent?.includes("Объектлар ва таъмирлаш режаси"));
    head?.closest("button")?.parentElement
      ?.querySelectorAll("button[aria-expanded='false']")
      .forEach((btn) => btn.click());
  });
  await p.waitForTimeout(400);
  const box = await p.evaluate(() => {
    const heads = [...document.querySelectorAll("p")];
    const head = heads.find((e) => e.textContent?.includes("Объектлар ва таъмирлаш режаси"));
    const wrap = head?.closest("button")?.parentElement;
    if (!wrap) return null;
    const bx = wrap.getBoundingClientRect();
    return { x: Math.max(0, bx.x - 8), y: Math.max(0, bx.y + window.scrollY - 8), width: Math.min(bx.width + 16, window.innerWidth), height: bx.height + 16 };
  });
  if (box) await p.screenshot({ path: `${OUT}/screenshots/section-${tag}-expanded.png`, clip: box, fullPage: true });
  await p.close();
}
await b.close();
