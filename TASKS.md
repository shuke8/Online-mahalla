# TASKS

## 🟢 Bajarildi (verified)

### TASK-007: Мобил Бош саҳифа — бўлимлар grid ↔ list кўриниши
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "Бош саҳифада бўлимлар ҳозирги (grid) ёки list кўринишига ўзгартириш имконияти бўлсин"
**Status:** DONE

**O'zgargan fayллар:**
- `components/mobile/ModulesScreen.tsx`:
  - `useViewMode()` hook — grid/list танлов localStorage (`onm-modules-view`) + телефон↔планшет CustomEvent sync,
    SSR'да "grid" (hydration-safe — `featured` pattern билан бир хил).
  - Контент тепасида toolbar: "Барча бўлимлар"/натижа сони + `ViewToggle` (иконкали segmented: тўр | рўйхат).
  - `renderModules()` — гуруҳни танланган кўринишда чизади; featured/категория/қидирув ҳаммаси toggle'га бўйсунади.
  - `ModuleRow` — горизонтал қатор (иконка + ном + badge/Фаол + star). Star PressCard'дан ташқари (валид HTML).

**Verification (headless Playwright, /dizayn/dalolatnoma):**
- Grid (default) ↔ List almashtirish ишлайди; toolbar toggle faol ҳолат navy. Скриншот: `modules-grid.png`, `modules-list.png`.
- List'да star тоggle → "Танланган бўлимлар" пайдо (featured ишлайди). localStorage persist (grid→list→grid).
- Телефон+планшет 2 toggle sync. overflowX=0, pageerror=0, tsc --noEmit 0 error.

**Refinement (фойдаланувчи: "grid↔list toggle'ни search input билан бир қаторга қўй"):**
- ViewToggle navy зонага, search box ёнига кўчирилди (search flex-1 + toggle shrink-0, бир қаторда).
  Toggle уйғун кўриниш: оқ rounded-2xl + search box билан бир хил shadow; тугмалар h-9 (touch).
- Контент toolbar олиб ташланди; қидирув натижа сони ўз жойига (results бранчига) қайтарилди.
  Скриншот: `search-toggle-row.png` (grid), `search-toggle-list.png` (list). tsc 0, overflowX=0, pageerror=0.

---

### TASK-006: Мобил Далолатнома — Обектлар рўйхати маҳалла бўйича
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "мобил Далолатнома дизайнида Обектлар рўйхати вилоят бўйича эмас,
маҳалла бўйича маълумот чиқиши керак"
**Status:** DONE

**O'zgargan fayллар:**
- `lib/mock-data.ts` — 6 та `infraObjects` барчаси `mfyName: "Янги ҳаёт МФЙ"` га; shortName'дан "X МФЙ — "
  префикс олинди (обект иши қолди: Оқар сув таъминоти, Сув тармоғи...); description маҳалла номи янгиланди;
  изоҳ янгиланди (барча обект битта маҳаллага тегишли).
- `components/mobile/ObjectsListScreen.tsx` — AppBar subtitle `· Жиззах` (вилоят) → `· ${mfyName}` (маҳалла).

**Verification (headless Playwright, /dizayn/dalolatnoma):**
- AppBar subtitle: "6 та обект · Янги ҳаёт МФЙ" (вилоят эмас, маҳалла). Скриншот: `infra-shots/objscreen-top.png`.
- Карталар: "Оқар сув таъминоти / Сув тармоғи / Электр тармоғи..." — барчаси Янги ҳаёт МФЙ.
- Регрессия: DocumentScreen иерархия тўғри (МФЙ: Янги ҳаёт / Туман: Жиззах шаҳри / Вилоят: Жиззах вилояти),
  DalolatnomaScreen shortName/description рендер OK. pageerror=0, tsc --noEmit 0 error.

**Refinement (фойдаланувчи: "ҳар cardда Янги ҳаёт МФЙ такрорлаш шарт эмас"):**
- `ObjectsListScreen` карта иккиламчи қаторидан маҳалла олиб ташланди (AppBar'да бир марта етарли).
  Ўрнига обектга хос: `rejaNomi · quvvati shortUnit` (мас. "Асфальтлаш · 3 км", "Электр тармоғи тортиш · 2.4 км").
- `shortUnit()` helper: "Километр (км)" → "км". Скриншот: `infra-shots/objscreen-nomfy.png`. tsc 0, pageerror 0.

**Refinement 2 (фойдаланувчи: "формада киритиладиган маълумотлардан фойдаланиб чиқариб тур"):**
- Карта энди далолатнома формаси (DalolatnomaScreen) киритма майдонларини акс эттиради: Режа номи · Қуввати ·
  Ўлчов бирлиги + **Сарфланган маблағ**. Аввал sarflanganMablag кўрсатилмаган эди.
- `formatMablag()` + `spaceThousands()` helper (детерминистик, hydration-safe): 412000000 → "412 млн сўм".
  sarflanganMablag=0 бўлса "Маблағ киритилмаган" (форма ҳолатини билдиради). Скриншот: `infra-shots/objscreen-mablag.png`.
- Электр тармоғи → "412 млн сўм" (киритилган, қалин); Оқар сув → "Маблағ киритилмаган". tsc 0, pageerror 0.

**Refinement 3 (фойдаланувчи: "truncate text ва иконни олиб ташла, фақат title ва маблағ қолсин"):**
- Картадан `rejaNomi · quvvati` truncate қатори + construct/wallet иконкалари олиб ташланди. Энди контент: title + маблағ.
  `shortUnit()` helper ўчирилди (ишлатилмайди). Чап обект иконкаси + ҳолат чиплари (Оралиқ/Якуний + №ID) сақланди (тузилма).
  Скриншот: `infra-shots/objscreen-final.png`. tsc 0, pageerror 0.

---

### TASK-005: МФЙ инфратузилма картига объект + таъмирлаш режаси қўшиш
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "МФЙ инфратузилма cardi пастида объект, маданият уйини таъмирлаш, Режаси:
газон босиш, бино юзини сувоқ қилиш — маълумотларни ҳам қўшиш"
**Status:** DONE

**O'zgargan fayllar:**
- `lib/mock-data.ts` — `MfyInfraObject` + `InfraWorkStatus` типлари; `mfyInfrastructure` (ogir+yangi)
  га `objects[]` дата (ҳар бири {type, name, address, plan:[{work,status}]}). 6 объект, реал ишлар.
- `app/mfy/[id]/page.tsx` — `MfyInfraSection` ичида (gauge'лардан кейин) "Объектлар ва таъмирлаш режаси"
  бўлими + `InfraObjectCard` компонент (икон+ном+manzil, progress badge N/M + бар, Режа checklist),
  `OBJECT_TYPE_ICON` + `WORK_STATUS_CONFIG` (done/in_progress/pending — ранг+икон+badge).

**Verification (headless Playwright, dev server :3000):**
- /mfy/mustaqillik (ogir, кўк) + /mfy/yangi-hayot (yangi, teal) — иккаласида объект бўлими рендер.
- Desktop 1440: 2 устун карта; "Маданият уйини капитал таъмирлаш" (1/5) → ✓Газон босиш(Бажарилди),
  ⟳Бино юзини сувоқ қилиш(Жараёнда)... — фойдаланувчи мисоли айнан. Скриншот: `infra-shots/mfyobj3-*.png`.
- Mobile 390 + 375 + 320: 1 устунга stack, overflowX=0, console+pageerror=0.
- done=strikethrough+яшил tick, in_progress=сариқ refresh, pending=кулранг clock. tsc --noEmit: 0 error.

---

### TASK-004: Инфратузилма картларини респ./вилоят/туман саҳифаларига қўшиш
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "dashboarddagi infratuzilma bulimidagi cardlarni respublika/viloyat/tuman pagelariga qo'sh"
**Status:** DONE

**O'zgargan fayllar:**
- `components/organisms/InfrastructureSection.tsx` — YANGI. 2 гуруҳ × 2 карта (Маҳалла + Туман даражаси)
  умумий компонент. Жонли render коди (`InfrastructureCard`, `GroupedBarChart`+custom tooltip,
  `RadialGauge`/`StatCard` ишлатиш, `GroupHeader`, `CategoryAccent`, `INFRA_PALETTE`) кўчирилди — Single Source of Truth.
- `app/infratuzilma/page.tsx` — refactor: энди `<InfrastructureSection />` ишлатади. Ўлик код
  (ChartToggle, FunnelChart, BulletChart, SimpleRegionRow, RegionDetailRow — ҳеч қаерда render бўлмаган) олиб ташланди. 847 → 17 қатор.
- `app/respublika/page.tsx`, `app/viloyat/[id]/page.tsx`, `app/tuman/[id]/page.tsx` — асосий grid'дан кейин
  "Инфратузилма лойиҳалари" сарлавҳа + `<InfrastructureSection />` қўшилди.

**Verification (headless Playwright, dev server :3000):**
- 4 саҳифа HTTP 200. tsc --noEmit: 0 error.
- Desktop 1440px: infratuzilma + respublika + viloyat + tuman — картлар 2 устунда тўғри, gauge/bar chart рендер OK (screenshot: `.claude-state/ONM-809/ARTIFACTS/infra-shots/`).
- Mobile 375px: картлар 1 устунга stack, мой бўлим overflowX=0, console error=0 (infratuzilma baseline тоза).
- Regression: infratuzilma визуал ўзгармади (worтdан-сўзга кўчирилган жонли код).

**Pre-existing 2 bug — ТУЗАТИЛДИ (фойдаланувчи "a" тасдиқлади):**
- BUG-A (FIXED): 375px overflow 267px → 0. `EntrepreneurshipPrograms.tsx` Tooltip'га `allowEscapeViewBox` +
  `contentStyle.maxWidth:220` + `whiteSpace:normal` + `wordBreak:break-word` — узун program номи бир қатор
  549px ўрнига wrap бўлади, viewport ичида қолади.
- BUG-B (FIXED): Hydration mismatch → 0. `KPIGroup` `toLocaleString("uz-UZ")` → `"en-US"` (2 жой).
  uz-UZ ICU Node↔Chromium фарқ қилар эди; en-US детерминистик + қолган dashboard (StatCard, вергул) билан мос.

**Re-verify (headless Playwright, 375px+1440px, respublika/viloyat/tuman/home):**
- Барча саҳифа overflowX=0, console+pageerror=0. tsc --noEmit: 0 error.
- Скриншот: `infra-shots/*-375-fixed.png`, `entrep-tooltip-375.png` (tooltip wrap тоза).

**Қолган риск:** иш дарахтида аввалги сессиялардан кўп tracked-эмас WIP файл бор — commit алоҳида ҳал қилинади.

---

### TASK-003: Бош саҳифа — бўлимларни "танланган"га (featured) олиш
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "дизайндаги Бош саҳифа бўлимига, бўлимларни featureга олиш имкониятини қўш"
**Status:** DONE

**Tavsif:** Мобил илова Бош саҳифаси (`ModulesScreen.tsx`) — ҳар модул картасида юлдузча (star)
toggle; танланганлар тепада "Танланган бўлимлар" бўлимида кўрсатилади.

**O'zgargan fayllar:**
- `components/atoms/Icon.tsx` — `star` (iconsax `Star1`) иконкаси қўшилди.
- `components/mobile/ModulesScreen.tsx` — `useFeaturedModules` hook (localStorage `onm-featured-modules` + `onm-featured-changed` CustomEvent билан телефон↔планшет жонли sync), "Танланган бўлимлар" бўлими (oltin star + сони), `ModuleTile`'га star overlay (PressCard `<button>` ичида эмас — ёнида, sibling — валид HTML; sanoq badge top-right, star top-left).

**Verification (real brauzer, /dizayn/dalolatnoma):**
- Star бос → "Танланган бўлимлар" тепада пайдо, сони 1→2; oltin тўла star; категорияда ҳам sync.
- Star қайта бос → олиб ташланди, сони 2→1→0, бўлим йўқолди (clean empty default).
- Reload → localStorage сақланди (persistence).
- Console: 0 error (бошида `setState while rendering` хатоси бор эди — dispatch updater ичидан event-handler'га кўчирилди, fix verified).
- badge(5/383/31) + star, ФАОЛ + star — конфликтсиз. tsc --noEmit: 0 error.

**WOW:** oltin star fill/outline ҳолатлар, hover (border+ranг), active:scale, aria-pressed+aria-label, телефон↔планшет live sync, localStorage persist.

---

### TASK-002: Далолатнома киритиш UI референслари → Figma moodboard
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "dalolatnoma kiritish bo'limlari dizayniga mos dizaynlar top, Figmada yangi file yarat, joylashtir"
**Status:** DONE (artefakt tayyor + vizual verified; Figma'ga import — 1 qadamli drag, foydalanuvchi)

**Natija (deliverable):**
- `.claude-state/ONM-809/ARTIFACTS/dalolatnoma-moodboard.svg` — 5 kategoriya, 19 referans (rasm+label+navy sarlavha), 1400×4040, base64 ichida. Figma'ga drag → tahrirlanadigan rasm+matn qatlamlari.
- `.claude-state/ONM-809/ARTIFACTS/dalolatnoma-moodboard.png` — flat fallback (1400×4040).
- Manba rasmlar: `ARTIFACTS/mobbin/*.webp` (asl) + `mobbin/jpg/*.jpg`. Curatsiya: `figma-references.md`.

**Texnik qaror (muhim):** Rasmiy Figma connector (`mcp__claude_ai_Figma`) va Figma MCP (Interactive) — faqat O'QISH + "Generate Diagram" (FigJam). Tashqi rasmni kanvasga qatlam qilib joylash tool'i yo'q (Figma REST API yozmaydi; faqat Plugin API yozadi). Shu sabab "official connector orqali file yaratib dizayn qo'shish" imkonsiz → SVG-import yo'li tanlandi (uchinchi tomon plaginsiz, sof native Figma import).

**Verification:** SVG Chrome headless'da render → PNG (1400×4040) → 4 band vizual tekshirildi. 19 rasm ham to'g'ri yuklangan, distortion yo'q, layout tartibli.

**Cleanup:** talk-to-figma yo'li bekor qilindi — plagin manifestlari asliga qaytarildi (.bak), lokal rasm server (8765) to'xtatildi, test frame (Figma 1:2) o'chirildi.

---



### TASK-001 (ONM-809): Оралиқ ва якуний далолатнома — МОБИЛ ИЛОВА дизайни
**Yaratildi:** 2026-06-02
**Manba:** Jira ONM-809 (Online-Mahalla, label DESIGNER) + Telegram "JIRA files" (35/36 mockup)
**Status:** DONE
**Spec:** `.claude-state/ONM-809/SPEC.md` · **Evidence:** `.claude-state/ONM-809/ARTIFACTS/frame-*.png`, `m-canvas-*.png`

**Muhim tuzatish:** Bu website feature EMAS — **mobil ilova (Android telefon + planshet) dizayni**.
Web loyihada **dizayn preview** sifatida, device frame ichida ko'rsatiladi. Buyurtmachi keyin
nativ mobil ilovani o'zi yozadi. (Avvalgi web-integratsiya — nav/breadcrumb/desktop sahifa — qaytarildi.)

**Yetkazilgan (route: `/dizayn/dalolatnoma`):**
To'liq ekran dizayn-canvas (dashboard nav yashirin), 3 ta device frame:
- **Телефон · Обектлар рўйхати** — Android Material: status bar, navy app bar, qidiruv, filtr chip, obyekt kartalari (код/ID + Оралиқ/Якуний status chip), empty state.
- **Телефон · Далолатнома** — bir ustun: obyekt header (тавсиф + readonly код/ID), Оралиқ/Якуний toggle, Material maydonlar (Режа ID readonly, Режа номи, Қуввати, Ўлчов бирлиги select, Сарфланган маблағлар), 2× rasm upload (Файл/Камера), геопозиция xaritasi, sticky **Сақлаш** bar.
- **Планшет · Далолатнома (landscape)** — 2 ustun: chap maydonlar+upload, o'ng kengaytirilgan xarita (mockup'ga mos).

**Komponentlar:** `components/mobile/DeviceFrame.tsx`, `ModulesScreen.tsx` (bosh ekran), `ObjectsListScreen.tsx`, `DalolatnomaScreen.tsx`, `DocumentScreen.tsx` (tayyor hujjat), `material.tsx` (Material primitivlar). Reuse: `InfraMap` (5 layer), `ImageUpload`, `infraObjects`.

**Canvas: 5 ekran (to'liq oqim):** Бош (модуллар) → Обектлар → Далолатнома форма → Ҳужжат (тугалланган) + Планшет форма.

**AC-1 to'liq qoplandi (qo'shimcha):**
- "Модуллар экрани" — bosh ekran, infra moduli ajratilgan (kirish oqimi).
- "Ҳужжатни кўриш" — ro'yxat kartasida tayyor (done) akt uchun "Оралиқ/Якуний ҳужжат" tugmasi → rasmiy далолатнома ҳужжат ekrani (Тасдиқланган, obyekt, иш тафсилоти, расм, геолокация, имзо/муҳр, PDF/улашиш).

**Input dizayni:** maydonlar rounded-xl, elevated, navy focus glow, leading ikonka, readonly muted (chiroyliroq).

**Verification (Playwright headless):**
- `npm run build` (toza, `.next` qayta) ✓ — barcha route, TypeScript toza.
- 3 frame vizual ko'rildi — Android Material, xaritalar (Yandex) yuklanadi, mockup'ga sodiq.
- Forma: bo'sh submit → validatsiya; to'liq → "Далолатнома сақланди" success.
- Xarita 5 layer almashadi (Yandex CRS rebuild, 1 container, 0 error).
- Ro'yxат → forma sync (karta bosilsa forma yangilanadi).
- 0 console error.

**Pre-existing fix'lar (oldingi bosqichdan, saqlangan):** recharts formatter type (build blocker), tsconfig vendored MCP exclude, DashboardNav 768px overflow.

**Qolgan:** Сақлаш mock (900ms) — nativ ilovada real endpointga ulanadi (dizayn — referens).
