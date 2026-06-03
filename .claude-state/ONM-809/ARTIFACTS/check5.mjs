import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1700, height: 1000 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text().slice(0,140));}); p.on("pageerror",e=>errs.push("PE:"+e.message.slice(0,140)));
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(4500);
// per-frame overflow
const r = await p.evaluate(() => {
  const figs=[...document.querySelectorAll("figure")];
  return figs.map((f,i)=>{ const sc=f.querySelector("[class*='overflow-hidden']")?.firstElementChild; const screen=f.querySelector("div[style*='width']"); return {i, cap:(f.querySelector("figcaption")?.textContent||"").trim()}; });
});
console.log("frames:", r.length);
// page horizontal overflow
const pov = await p.evaluate(()=>({s:document.documentElement.scrollWidth,i:window.innerWidth}));
console.log("page overflowX:", pov.s>pov.i+1 ? "FAIL "+pov.s+">"+pov.i : "OK (canvas scrolls)");
// click "Якуний ҳужжат" on a card (Навбаҳор both done) in list (figure 1) -> doc frame (figure 3) updates
const list = p.locator("figure").nth(1);
const docFrame = p.locator("figure").nth(3);
const before = await docFrame.innerText();
const yakBtn = list.getByRole("button", { name: /Якуний ҳужжат/ }).first();
const cnt = await list.getByRole("button", { name: /ҳужжат/ }).count();
console.log("document buttons in list:", cnt);
await yakBtn.click();
await p.waitForTimeout(700);
const after = await docFrame.innerText();
console.log("doc frame changed on click:", before !== after);
console.log("doc shows ЯКУНИЙ:", /ЯКУНИЙ/u.test(after));
console.log("CONSOLE ERRORS:", errs.length, errs.slice(0,4).join(" || "));
await b.close();
