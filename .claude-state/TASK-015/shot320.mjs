import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 320, height: 800 } });
await p.goto("http://localhost:3000/respublika", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
await p.screenshot({ path: ".claude-state/TASK-015/respublika-320.png", fullPage: true });
await b.close();
