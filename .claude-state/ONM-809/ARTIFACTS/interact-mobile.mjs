import { chromium } from "playwright";
import { fileURLToPath } from "url"; import { dirname, join } from "path";
const OUT = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1700, height: 1000 }, deviceScaleFactor: 1.5 });
const p = await ctx.newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text().slice(0,140));}); p.on("pageerror",e=>errs.push("PE:"+e.message.slice(0,140)));
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 25000 });
await p.waitForTimeout(4000);

const phoneForm = p.locator("figure").nth(1);

// 1) empty submit -> validation (сарфланган маблағлар is empty by default for torkul)
await phoneForm.getByRole("button", { name: /Сақлаш/ }).click();
await p.waitForTimeout(600);
let t = await phoneForm.innerText();
console.log("empty-submit validationError:", /киритинг|танланг|катта|мумкин эмас/iu.test(t));

// 2) fill маблағ, submit -> success
// find the numeric/text input under "Сарфланган маблағлар"
const mablagInput = phoneForm.locator("input[inputmode='numeric']").first();
await mablagInput.scrollIntoViewIfNeeded();
await mablagInput.fill("412000000");
await p.waitForTimeout(300);
await phoneForm.getByRole("button", { name: /Сақлаш/ }).click();
await p.waitForTimeout(1600);
t = await phoneForm.innerText();
console.log("valid-submit success:", /сақланди|муваффақ/iu.test(t));

// 3) layer switch inside tablet map (figure 2)
const tablet = p.locator("figure").nth(2);
for (const lbl of ["Google Sat","OpenStreetMap","YandexMaps"]) {
  await tablet.getByText(lbl, { exact:true }).click();
  await p.waitForTimeout(1000);
}
const mapsInTablet = await tablet.locator(".leaflet-container").count();
console.log("tablet leaflet-containers after switches:", mapsInTablet);

// 4) list -> form sync: click 3rd card in list (figure 0), check phone form header changes
const before = (await phoneForm.locator("text=/Объект коди/i").first().isVisible().catch(()=>false));
await p.locator("figure").nth(0).getByText(/Навбаҳор/).first().click();
await p.waitForTimeout(800);
const t1 = await phoneForm.innerText();
console.log("list->form sync (Навбаҳор code 2602182360619208):", t1.includes("2602182360619208"));

console.log("CONSOLE ERRORS:", errs.length, errs.slice(0,4).join(" || "));
await b.close();
