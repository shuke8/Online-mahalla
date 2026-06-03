import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1700, height: 1000 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(4500);
const data = await p.evaluate(() => {
  const fig = document.querySelectorAll("figure")[2];
  const figTop = fig.getBoundingClientRect().top;
  const Y = (el) => el ? Math.round(el.getBoundingClientRect().top - figTop) + "→" + Math.round(el.getBoundingClientRect().bottom - figTop) : "NONE";
  const byText = (re) => [...fig.querySelectorAll("*")].find(e => e.children.length<=3 && re.test(e.textContent||""));
  const map = fig.querySelector(".leaflet-container");
  // the phone form column: parent of headerBlock; find "Маълумотлар" then climb
  const geoTitle = [...fig.querySelectorAll("h3,div")].find(e=>/Геопозиция/.test(e.textContent||"") && e.textContent.length<40);
  const saveBar = [...fig.querySelectorAll("div")].find(d=>/Сақлаш/.test(d.textContent||"") && d.className.includes("shrink-0"));
  // content wrapper = the flex-1 (not appbar). find div.flex-1 that contains "Маълумотлар"
  const content = [...fig.querySelectorAll("div.flex-1")].find(d=>/Маълумотлар/.test(d.textContent||""));
  const col = content?.firstElementChild;
  return {
    figH: Math.round(fig.getBoundingClientRect().height),
    content: content ? Y(content) : "NONE",
    formColumn: col ? Y(col) : "NONE",
    formColumnCls: (col?.className||"").slice(0,45),
    geoTitle: Y(geoTitle),
    map: Y(map),
    saveBar: Y(saveBar),
  };
});
console.log(JSON.stringify(data, null, 1));
await b.close();
