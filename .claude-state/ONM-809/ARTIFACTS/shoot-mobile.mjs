import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const shots = [
  { name: "m-canvas-1440", w: 1440, h: 900, full: true },
  { name: "m-canvas-1920", w: 1920, h: 1080, full: true },
];
for (const s of shots) {
  const ctx = await b.newContext({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1.5 });
  const p = await ctx.newPage();
  const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text().slice(0,120));}); p.on("pageerror",e=>errs.push("PE:"+e.message.slice(0,120)));
  try { await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"networkidle", timeout: 25000 }); }
  catch { await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 25000 }); }
  await p.waitForTimeout(4000);
  await p.screenshot({ path: join(OUT, s.name+".png"), fullPage: s.full });
  console.log(`${s.name} saved  errors=${errs.length}${errs.length?" :: "+errs.slice(0,3).join(" | "):""}`);
  await ctx.close();
}
await b.close(); console.log("DONE");
