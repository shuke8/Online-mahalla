import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errors = [];
p.on("console", m => { if (m.type()==="error") errors.push(m.text().slice(0,140)); });
p.on("pageerror", e => errors.push("PAGEERR: "+e.message.slice(0,140)));
await p.goto("http://localhost:3000/infratuzilma/obyektlar/torkul-okar-suv", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

// 1) Layer switch test (Yandex -> Google Sat[3857] -> OSM[3857] -> back to Yandex[3395 rebuild])
async function tilesCount(){ return await p.locator("img.leaflet-tile").count(); }
console.log("init tiles:", await tilesCount());
for (const lbl of ["Google Sat","OpenStreetMap","OpenTopoMap","Google Streets","YandexMaps"]) {
  await p.getByText(lbl, { exact: true }).click();
  await p.waitForTimeout(1500);
  const mapPresent = await p.locator(".leaflet-container").count();
  console.log(`layer ${lbl.padEnd(14)} -> mapContainers=${mapPresent} tiles=${await tilesCount()}`);
}

// 2) Validation test: clear режа номи, submit -> expect error
const rejaNomi = p.getByLabel(/режа номи/i).first();
const hasLabel = await rejaNomi.count();
if (hasLabel) { await rejaNomi.fill(""); }
else {
  // fallback: find text input with value Асфальтлаш
  const inp = p.locator("input[value='Асфальтлаш'], input").nth(1);
}
// click Сақлаш
const saveBtn = p.getByRole("button", { name: /Сақлаш/ });
await saveBtn.first().click();
await p.waitForTimeout(800);
const bodyText = await p.evaluate(()=>document.body.innerText);
const hasError = /мажбур|тўлдир|киритинг|хато|нотўғри|тўлдиринг|бўш/iu.test(bodyText);
console.log("after empty submit -> validationErrorShown=", hasError);
await p.screenshot({ path: join(OUT, "interact-validation.png") });

// 3) Refill and submit -> success
if (hasLabel) await rejaNomi.fill("Асфальтлаш");
await saveBtn.first().click();
await p.waitForTimeout(1600);
const bodyText2 = await p.evaluate(()=>document.body.innerText);
const hasSuccess = /сақланди|муваффақ|success/iu.test(bodyText2);
console.log("after valid submit -> successShown=", hasSuccess);
await p.screenshot({ path: join(OUT, "interact-success.png") });

console.log("CONSOLE ERRORS:", errors.length, errors.slice(0,5).join(" || "));
await b.close();
