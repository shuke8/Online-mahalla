import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
// not-found
{
  const ctx = await b.newContext({ viewport: { width: 1024, height: 800 } });
  const p = await ctx.newPage();
  const errs=[]; p.on("pageerror",e=>errs.push(e.message.slice(0,100)));
  await p.goto("http://localhost:3000/infratuzilma/obyektlar/yoq-bunaqa-id", { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  const t = await p.evaluate(()=>document.body.innerText.replace(/\s+/g," ").slice(0,160));
  console.log("NOT-FOUND text:", t);
  console.log("NOT-FOUND pageerrors:", errs.length);
  await p.screenshot({ path: join(OUT,"edge-notfound.png") });
  await ctx.close();
}
// empty search on list
{
  const ctx = await b.newContext({ viewport: { width: 1024, height: 800 } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000/infratuzilma/obyektlar", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  const search = p.locator("input[type='search'], input[type='text'], input").first();
  await search.fill("zzzqqq-yoq-natija");
  await p.waitForTimeout(900);
  const t = await p.evaluate(()=>document.body.innerText.replace(/\s+/g," "));
  console.log("EMPTY-SEARCH hasEmptyMsg:", /топилмади|мавжуд эмас|натижа|бўш|йўқ/iu.test(t));
  await p.screenshot({ path: join(OUT,"edge-emptysearch.png") });
  await ctx.close();
}
await b.close();
