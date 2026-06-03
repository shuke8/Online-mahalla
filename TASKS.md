# TASKS

## 🟢 Bajarildi (verified)

### TASK-014: МФЙ харита ранги — ҳолатга қараб (оғир=қизил, янги=яшил)
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "оғир МФЙ бўлса харитада ранги қизил, янги Ўзбекистон МФЙ бўлса яшил бўлсин"
**Status:** DONE

**O'zgargan fayллар:**
- `components/organisms/UzbekistanMap.tsx` — `selectedColor?` prop: танланган регион fill'и шу рангга
  бўлади (стрек оқ), бошқалар аввалгидек value→кўк. Additive — бошқа саҳифаларга таъсир йўқ.
- `app/mfy/[id]/page.tsx` — `mfyMapColor = ogir ? "#ef4444" : "#16a34a"`; харитага `selectedColor` узатилди.

**Verification (headless Playwright):**
- /mfy/mustaqillik (ogir) → Жиззах региони fill `#ef4444` (қизил). Скриншот: `map-ogir.png`.
- /mfy/yangi-hayot (yangi) → Жиззах региони fill `#16a34a` (яшил). Скриншот: `map-yangi.png`.
- Status badge ранги билан мос; қолган регионлар кўк. tsc 0, overflowX=0, pageerror=0.

---

### TASK-013: Бош экран орқа фон — V1 (юмшоқ brand gradient) танланди
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "girih pattern ёқмади; Mobbin'дан фон вариантлари топ; 3 версияни танлаш имкони
бер" → "version 1ни қолдир"
**Status:** DONE

**Mobbin тадқиқот:** профессионал app'лар (Rocket Money, Alan, Lovi, Forest) геометрик pattern эмас,
юмшоқ gradient / тоза фон ишлатади. 3 йўналиш чиқарилди.

**O'zgargan fayллар:**
- `components/mobile/ModulesScreen.tsx` — `ModulesBg` тип + `MODULES_BG_STYLES` (gradient/clean/mesh) +
  `bgVariant` prop (default gradient). Girih pattern олиб ташланди; `public/uzbek-pattern.svg` ўчирилди (orphan).
- `app/dizayn/fon-preview/page.tsx` — ЯНГИ: интерактив preview, 3 та телефон frame ёнма-ён, ҳар бири
  ўз фони билан; select карта (босиб танлаш) + "Танланган: VN" badge.

**Variantlar:**
- V1 gradient — навы wash тепадан эрийди (тавсия)
- V2 clean — нақшсиз тоза фон
- V3 mesh — navy/teal/indigo хира blob'лар

**Якуний (V1 танлангач):**
- `ModulesScreen` — V1 gradient hardcode қилинди; `ModulesBg`/`MODULES_BG_STYLES`/`bgVariant` (clean/mesh scaffolding) олиб ташланди.
- `app/dizayn/fon-preview/page.tsx` ўчирилди (қарор қабул қилинди → 404).
- Verification: asосий app V1 gradient рендер, tsc 0, overflowX=0, pageerror=0, fon-preview=404.
  Скриншот: `home-final-v1.png` (+ `bg-v1/v2/v3`, `fon-preview.png` солиштириш архиви).

---

## 🟢 Bajarildi (verified)

### TASK-012: Планшет Далолатнома — Геопозиция (map жуда катта эди)
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "Планшет · Далолатнома дизайнда Геопозиция бўлими яхши чиқмаган, map бунақа катта керак эмас"
**Status:** DONE

**Sabab:** Планшет 2 устун `items-stretch` + ўнг устун map `h-full` → чап устун (форма) баландлигига
чўзилиб ~700px+ улкан харита.

**O'zgargan fayл:** `components/mobile/DalolatnomaScreen.tsx` (планшет layout):
- `items-stretch` → `items-start` (устунлар тепага текисланади, чўзилмайди).
- Харита `h-full` → `h-[280px]` (нормал ўлчам) + устида hint + остида Координаталар ихчам картаси.
- Layout баланс: "Қилинган иш расми" чап устундан ЎНГ устунга (Геопозиция остига) кўчирилди —
  чап=маълумот, ўнг=визуал далил (харита+расмлар). Figure 1522px → 1227px.

**Verification (headless Playwright, /dizayn/dalolatnoma):**
- Планшет Далолатнома: map нормал ўлчам, Координаталар картаси, расмлар ўнгда, иккала устун баланс.
  Скриншот: `tablet-geo-fixed.png`. overflowX=0, pageerror=0, tsc 0.

---

### TASK-011: Бош экран — чап sidebar (drawer)
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "Бош экран (модуллар) бўлимида sidebar очилиши учун имконият бўлсин"
**Status:** DONE

**O'zgargan fayллар:**
- `components/mobile/SideDrawer.tsx` — ЯНГИ. DeviceFrame ичида абсолют overlay: backdrop + чапдан сирғалувчи
  панель. Профил шапкаси (navy gradient + glass avatar, ҳоким ёрдамчиси fio + маҳалла), меню (Профил,
  Билдиришномалар[badge], Ҳисоботлар, Маҳаллани танлаш, Созламалар, Ёрдам), Чиқиш + версия. Escape/backdrop/X — ёпади.
- `components/mobile/material.tsx` — `AppBar`'га `leading` слот (onBack бўлмаганда — мас. гамбургер).
- `components/mobile/ModulesScreen.tsx` — drawer state + AppBar leading гамбургер (3 чизиқ SVG) + `<SideDrawer/>`,
  root `relative`.

**Verification (headless Playwright, /dizayn/dalolatnoma):**
- Гамбургер бос → drawer чапдан сирғалиб очилди; Профил/Чиқиш/Ҳоким ёрдамчиси/Созламалар рендер.
  Скриншот: `drawer-open.png`. overflowX=0, pageerror=0, tsc 0.
- Эслатма: dashboard nav гамбургери ҳам "Менюни очиш" aria-label — collision (md:hidden, контекст бошқа), реал бук эмас.

**Refinement (фойдаланувчи: "refresh button ўрнига profile button"):**
- AppBar trailing: refresh икон → профил avatar тугмаси (glass circle + people икон + ring); босилганда drawer
  (профил) очилади. tsc 0, overflowX=0, pageerror=0, click→drawer тасдиқланди. Скриншот: `home-profile-btn.png`.

---

### TASK-010: Бош экран — welcome hero + тезкор статистика
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "Бош экран модуллар рўйхатида нимадур етишмаётгандай — дизайнга қўш,
тўлдириб чиройли қилиб тур"
**Status:** DONE

**O'zgargan fayл:** `components/mobile/ModulesScreen.tsx`:
- Welcome hero (категория кўринишда, тепада): navy gradient икон + "Хуш келибсиз" + маҳалла (mfyData.name) +
  glass "22-март" чипи; subtle navy-tinted gradient фон.
- 3 та `StatMini` карта: Объектлар (infraObjects=6) · Тугалланган (interim&final done=2) · Билдиришнома
  (badge sum=419) — tinted икон + рақам + label.
- import'га mfyData қўшилди (infraObjects энди ишлатилади).

**Verification (headless Playwright, /dizayn/dalolatnoma):**
- Хуш келибсиз + Янги ҳаёт МФЙ + 22-март; 6 Объектлар / 2 Тугалланган / 419 Билдиришнома — рендер OK.
  Скриншот: `home-hero.png`. grid+list иккаласида кўринади, қидирувда яширин. overflowX=0, pageerror=0, tsc 0.

**Refinement (фойдаланувчи: "Объектлар/Тугалланган/Билдиришнома stat'лар керак эмас — орқа фонга енгил миллий нақш қўй"):**
- 3 та `StatMini` карта + objTotal/objDone + StatMini компонент + infraObjects import олиб ташланди (welcome hero қолди).
- `public/uzbek-pattern.svg` — ЯНГИ: 8-бурчакли юлдуз girih (navy stroke ~0.13-0.16 alpha), 100×100 tileable.
- Контент орқа фонига `backgroundImage` (96px tile) — енгил миллий нақш бутун бош экран бўйлаб.
  Скриншот: `home-pattern2.png`, `pattern-zoom.png`. tsc 0, overflowX=0, pageerror=0.

### TASK-009: Ҳужжат экрани — "Юклаб олиш" ўрнига "Ҳужжат", "Улашиш" олиб ташлаш
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "Ҳужжат (тугалланган) screenда 'юклаб олиш' ўрнига 'ҳужжат' button бўлсин;
улашиш керак эмас — ҳужжат ўзида бу функция бор"
**Status:** DONE

**O'zgargan faylлар:**
- `components/mobile/DocumentScreen.tsx`:
  - Пастки бар: 2 тугма (Улашиш + Юклаб олиш PDF) → битта full-width "Ҳужжат" (document-text икон, navy primary).
  - AppBar trailing: 2 икон (юклаб олиш + улашиш) → битта "Ҳужжат" икон (document-text). Улашиш олиб ташланди.
  - Юқори изоҳ янгиланди.

**Verification (headless Playwright, /dizayn/dalolatnoma):**
- "Улашиш" матни — йўқ; "Юклаб олиш" матни — йўқ (page text текширилди).
- Пастда битта "Ҳужжат" тугмаси (document икон). Скриншот: `doc-hujjat-btn.png`. tsc 0, pageerror 0.

### TASK-008: Қидирув майдонини бирхиллаштириш (Обектлар ↔ Бош экран)
**Yaratildi:** 2026-06-03 · **Bajarildi:** 2026-06-03
**Manba:** Foydalanuvchi — "Обектлар рўйхати ва Бош экран (модуллар) input'и ўлчами ва border radiusи ҳар хил"
**Status:** DONE

**Sabab:** 2 та экранда search markup алоҳида эди — ObjectsListScreen (rounded-full, 46px, 13.5px, text-secondary
икон, енгил shadow) ≠ ModulesScreen (rounded-2xl, 52px, 15px, navy икон, кучли shadow).

**Yechim (Single Source of Truth):**
- `components/mobile/material.tsx` — янги `SearchField` экспорти (ягона ўлчам/радиус/shadow; `className` орқали
  wrap'га мослашади — flex-1, w-full max-w-md). Канон = ModulesScreen стили (rounded-2xl, min-h-52, navy икон, 15px).
- `ModulesScreen.tsx` + `ObjectsListScreen.tsx` — иккаласи ҳам `<SearchField/>` ишлатади. Энди айнан бир хил,
  келажакда divergenция бўлмайди.

**Verification (headless Playwright):**
- Обектлар search энди rounded-2xl + 52px + navy икон (аввал rounded-full/46px). Скриншот: `cmp-objects-search.png`.
- Иккала экран бир хил компонент → конструкция бўйича айнан бир хил. tsc 0, overflowX=0, pageerror=0.

---

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

**Refinement (фойдаланувчи: "обектлар рўйхатини compactlash — кўпайса контент узун бўлади, асосий эмас, қуйи даражага туш):**
- `InfraObjectCard` — тўлиқ карта (ҳар бири ~5 қатор checklist) → ИХЧАМ accordion қатор. Йопиқ: иконка(7×7) +
  ном + ингичка progress bar + N/M + chevron (~40px). Босилганда: manzil + Режа checklist очилади.
- Container `grid lg:grid-cols-2` → бир устунли `space-y-2`. Сарлавҳага сони badge'и қўшилди.
  Default йопиқ — обектлар кўпайса ҳам контент узун бўлмайди. Скриншот: `mfy-compact-collapsed/expanded.png`.
  tsc 0, overflowX=0, pageerror=0, accordion toggle тасдиқланди.

**Refinement 2 (фойдаланувчи: "объект номи ва таъмирлаш режаси битта бўлиши мумкин, мас. Қудуқни таъмирлаш"):**
- `InfraObjectCard` — `plan.length <= 1` бўлса accordion ЭМАС: иконка + ном + manzil + ҳолат badge
  (Бажарилди/Жараёнда/Режада) тўғридан-тўғри инлайн. Chevron/progress bar йўқ (очиш керак эмас).
- Дата: `mfyInfrastructure.ogir`га "Қудуқни таъмирлаш" (type "water", 1 ишли) қўшилди; `MfyInfraObject.type`га
  "water", `OBJECT_TYPE_ICON`га water→construct. Скриншот: `mfy-single-item.png`, `mfy-single-row.png`.
  tsc 0, overflowX=0, pageerror=0.

**Refinement 3 (фойдаланувчи: "бажарилган ишлар ёзуви устидан чизиқ керак эмас"):**
- `InfraObjectCard` checklist — done item'дан `line-through` олиб ташланди (фақат яшил tick + muted матн қолди).
  `textDecorationLine: none` тасдиқланди. Скриншот: `mfy-no-strike.png`. tsc 0, pageerror=0.

**Refinement 4 (фойдаланувчи: "бирортаси тўлиқ бажарилган бўлса шуни ҳам кўрсат"):**
- `InfraObjectCard` — `isComplete = done === total` бўлса: яшил икон + тўлиқ ЯШИЛ progress bar + "✓ Бажарилди"
  badge (N/M ўрнига) + енгил яшил border/фон. Қисман (кўк) ва жараёнда (сариқ) дан фарқли.
- Дата: ogir'га "Спорт майдончасини қуриш" (4/4 done) қўшилди. Скриншот: `mfy-objects-done.png`.
  tsc 0, overflowX=0, pageerror=0.

**Refinement 5 (фойдаланувчи: "бўлимни ўзини ҳам compact ҳолатга келтириш имконияти бўлсин"):**
- `MfyInfraSection` — "Объектлар ва таъмирлаш режаси" сарлавҳаси босиладиган (toggle) бўлди: chevron +
  `objectsOpen` state (default очиқ). Босилганда БУТУН рўйхат йиғилади/очилади. Икки даражали compaction:
  бўлим ўзи + ҳар объект accordion. Скриншот: `mfy-section-open/collapsed.png`. tsc 0, overflowX=0, pageerror=0.

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
