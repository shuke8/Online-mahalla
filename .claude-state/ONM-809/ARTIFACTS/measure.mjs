import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1700, height: 1000 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(4500);
const data = await p.evaluate(() => {
  const fig = document.querySelectorAll("figure")[2]; // phone form
  const screen = fig.querySelector("div[style*='min-height']") || fig.querySelector("div[style*='width']");
  const root = screen?.firstElementChild;
  const kids = root ? [...root.children].map(c => ({ cls:(c.className||"").slice(0,40), h: Math.round(c.getBoundingClientRect().height) })) : [];
  const saveBtn = [...fig.querySelectorAll("button")].find(x=>/Сақлаш|Сақланмоқда/.test(x.textContent||""));
  const map = fig.querySelector(".leaflet-container");
  return {
    figH: Math.round(fig.getBoundingClientRect().height),
    screenH: screen ? Math.round(screen.getBoundingClientRect().height) : null,
    rootH: root ? Math.round(root.getBoundingClientRect().height) : null,
    rootCls: (root?.className||"").slice(0,60),
    kids,
    saveBtnVisible: saveBtn ? saveBtn.getBoundingClientRect().height>0 : false,
    saveBtnTop: saveBtn ? Math.round(saveBtn.getBoundingClientRect().top) : null,
    mapH: map ? Math.round(map.getBoundingClientRect().height) : "NO MAP",
  };
});
console.log(JSON.stringify(data, null, 1));
await b.close();
