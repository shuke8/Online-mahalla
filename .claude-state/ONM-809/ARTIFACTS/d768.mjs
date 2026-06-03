import { chromium } from "playwright";
const b = await chromium.launch();
for (const W of [768, 844]) {
  const ctx = await b.newContext({ viewport: { width: W, height: 800 } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000/infratuzilma/obyektlar/torkul-okar-suv", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(3000);
  const r = await p.evaluate(() => {
    const vw = window.innerWidth, out = [];
    document.querySelectorAll("*").forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.right > vw + 1 && b.width > 40) out.push({ tag: el.tagName.toLowerCase(), cls: (el.getAttribute("class")||"").slice(0,80), w: Math.round(b.width), left: Math.round(b.left), right: Math.round(b.right) });
    });
    return out.filter(o=>!o.cls.includes("leaflet-tile")&&!o.cls.includes("leaflet-proxy")).sort((a,b)=>b.right-a.right).slice(0,8);
  });
  console.log("=== W=" + W + " ===");
  console.log(JSON.stringify(r, null, 1));
  await ctx.close();
}
await b.close();
