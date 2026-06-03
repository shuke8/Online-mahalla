import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1700, height: 1000 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(4500);
const data = await p.evaluate(() => {
  const fig = document.querySelectorAll("figure")[2];
  const figTop = fig.getBoundingClientRect().top;
  // the phone single-column form is the flex flex-col gap-4 p-3.5 inside content(flex-1)
  const col = fig.querySelector(".flex-1 > div"); // first child of content
  const rel = (el) => { const r = el.getBoundingClientRect(); return { top: Math.round(r.top-figTop), h: Math.round(r.height) }; };
  const colInfo = col ? { cls:(col.className||"").slice(0,50), ...rel(col), childCount: col.children.length } : null;
  const kids = col ? [...col.children].map(c => ({ cls:(c.className||c.tagName||"").slice(0,30), ...rel(c) })) : [];
  // upload blocks count
  const uploads = fig.querySelectorAll("input[type=file]").length;
  return { figH: Math.round(fig.getBoundingClientRect().height), colInfo, kids, fileInputs: uploads };
});
console.log(JSON.stringify(data, null, 1));
await b.close();
