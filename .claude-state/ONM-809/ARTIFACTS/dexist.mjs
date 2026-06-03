import { chromium } from "playwright";
const b = await chromium.launch();
for (const u of ["/mfy/yangi-hayot", "/infratuzilma", "/respublika", "/"]) {
  const ctx = await b.newContext({ viewport: { width: 768, height: 800 } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000" + u, { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(2500);
  const ov = await p.evaluate(() => ({ s: document.documentElement.scrollWidth, i: window.innerWidth }));
  console.log(u.padEnd(22), ov.s > ov.i+1 ? "OVERFLOW "+ov.s+">"+ov.i : "ok");
  await ctx.close();
}
await b.close();
