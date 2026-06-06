import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "web-ui-review-workspace/mfy-repair-plan/iteration-1/screenshots";
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();

const LONG_1 = "Йўл четларини ободонлаштириш, пиёдалар йўлакчаларини қайта қуриш ҳамда йўл белгиларини ўрнатиш ишларини олиб бориш";
const LONG_2 = "Асфальт қоплама ётқизиш ва йўл чизиқларини белгилаш, сув оқова тизимини қайта жиҳозлаш";

for (const [vw, tag] of [[1440, "longtext-1440"], [375, "longtext-375"]]) {
  const p = await b.newPage({ viewport: { width: vw, height: 1000 } });
  await p.goto("http://localhost:3000/mfy/mustaqillik", { waitUntil: "networkidle" });
  await p.waitForTimeout(600);

  // Expand all object cards
  await p.evaluate(() => {
    const heads = [...document.querySelectorAll("p")];
    const head = heads.find((e) => e.textContent?.includes("Объектлар ва таъмирлаш режаси"));
    head?.closest("button")?.parentElement
      ?.querySelectorAll("button[aria-expanded='false']")
      .forEach((btn) => btn.click());
  });
  await p.waitForTimeout(400);

  // Inject long work names into 3rd card's checklist (Маҳалла ички йўлларини асфальтлаш)
  await p.evaluate(([l1, l2]) => {
    const lis = [...document.querySelectorAll("li")].filter((li) =>
      li.textContent?.includes("Йўл асосини тайёрлаш") ||
      li.textContent?.includes("Йўл четларини ободонлаштириш") ||
      li.textContent?.includes("Асфальт қоплама ёткизиш") ||
      li.textContent?.includes("Асфальт қоплама ётқизиш")
    );
    const spans = lis.map((li) => li.querySelector("span[title], span.flex-1")).filter(Boolean);
    if (spans[0]) spans[0].textContent = l1;
    if (spans[1]) spans[1].textContent = l2;
  }, [LONG_1, LONG_2]);
  await p.waitForTimeout(200);

  const box = await p.evaluate(() => {
    const heads = [...document.querySelectorAll("p")];
    const head = heads.find((e) => e.textContent?.includes("Маҳалла ички йўлларини асфальтлаш"));
    const card = head?.closest("div.rounded-xl");
    if (!card) return null;
    const bx = card.getBoundingClientRect();
    return { x: Math.max(0, bx.x - 8), y: Math.max(0, bx.y + window.scrollY - 8), width: Math.min(bx.width + 16, window.innerWidth), height: bx.height + 16 };
  });
  if (box) await p.screenshot({ path: `${OUT}/${tag}.png`, clip: box, fullPage: true });
  const { sw, iw } = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
  console.log(`${tag}: overflow=${sw > iw ? "YES" : "no"}, box=${box ? "ok" : "MISSING"}`);
  await p.close();
}
await b.close();
