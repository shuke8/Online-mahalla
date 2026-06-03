import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1700, height: 1000 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/dizayn/dalolatnoma", { waitUntil:"domcontentloaded", timeout: 35000 });
await p.waitForTimeout(4000);
const list = p.locator("figure").nth(1);
const docFrame = p.locator("figure").nth(3);
// click first "Оралиқ ҳужжат" -> doc should show ОРАЛИҚ
await list.getByRole("button", { name: /Оралиқ ҳужжат/ }).first().click();
await p.waitForTimeout(700);
const t = await docFrame.innerText();
console.log("after Оралиқ click -> doc shows ОРАЛИҚ:", /ОРАЛИҚ ДАЛОЛАТНОМА/u.test(t), "| shows ЯКУНИЙ:", /ЯКУНИЙ ДАЛОЛАТНОМА/u.test(t));
await b.close();
