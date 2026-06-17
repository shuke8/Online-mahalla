# TASKS

## 🟢 Bajarildi (verified)

### TASK-024: Сўровнома — биометрик тасдиқлаш ҳолатларини саҳифага қўшиш
**Yaratildi:** 2026-06-17 · **Bajarildi:** 2026-06-17
**Manba:** Foydalanuvchi — "biometrik tasdiqlashda statuslarini ham so'rovnoma bo'limiga qo'sh"
**Status:** DONE

**Tavsif:**
`/dizayn/sorovnoma` саҳифасида биометрик тасдиқ фақат default «кутилмоқда» ҳолатида кўринарди
(scanning/success overlay'ларни preview қилиб бўлмасди). «Биометрик тасдиқлаш — ҳолатлар» бўлими
қўшилди: якунлаш қадамининг 5 ҳолати — кутилмоқда → сканерлаш → муваффақият → хато → тасдиқланган.
Қўшимча: оқимда олдин йўқ эди — **хато (face mismatch) ҳолати** (қизил romka + «реестр сурати
билан мос келмади» + «Қайта уриниш» тугмаси).

**O'zgargan fayllar:**
- `components/mobile/SorovnomaScreen.tsx` — `previewFaceScan?: "scanning"|"success"|"error"` проп
  (статик preview, timer'лар preview'да ўчирилади); `FaceScanState`'га `"error"`; `FaceScanOverlay`
  error tarmoғи + `onRetry`
- `app/dizayn/sorovnoma/page.tsx` — «Биометрик тасдиқлаш — ҳолатлар» бўлими (5 телефон фрейм)

**Verification:**
- tsc --noEmit: 0 error · 0 console error
- Playwright 1440px: 5 ҳолат тўғри render (кутилмоқда/сканерлаш/муваффақият/хато/тасдиқланган);
  error overlay — қизил romka + badge + retry тугма ✓
- Regression: жонли оқим бузилмаган — реал фреймда «Юзни тасдиқлаш» → scanning→success→verified
  (verifiedCards 1→2); preview фреймлар статик қолади (scanning/success overlay 1/1)
- 375px: document horizontal overflow йўқ (375===375)
**Sifat:** 9.5/10

### TASK-023: Альтернатив (шартли) экран previewларни дизайн тизими саҳifaсига кўчириш
**Yaratildi:** 2026-06-16 · **Bajarildi:** 2026-06-16
**Manba:** Ярим қолган рефактор (мид-флайт): TASK-022 фреймлари сўровнома саҳифасидан
олиб ташланган, лекин ҳеч қаерга уланмаган эди (orphaned).
**Status:** DONE

**Tavsif:**
Альтернатив (шартли) тармоқларнинг ТЎЛИҚ ЭКРАН previewлари `/dizayn/sorovnoma` канвасидан
`/dizayn/komponentlar` (дизайн тизими) саҳифасига кўчирилди — каталог + behavior + тўлиқ
экранлар энди битта жойда. `GalleryScreens` (default ёнида альтернатив тармоқ, ёнма-ён) +
«Тўлиқ экран» divider қўшилди. Сўровнома саҳифаси энди планшет фрейми билан тоза тугайди.

**O'zgargan fayllar:**
- `components/mobile/gallery-screens.tsx` — янги (`GalleryScreens`: 6 фрейм, барқарор reference prefill)
- `app/dizayn/komponentlar/page.tsx` — import + «Тўлиқ экран» divider + `<GalleryScreens />`
- `app/dizayn/sorovnoma/page.tsx` — «Альтернатив» бўлим олиб ташланди (SSOT — дизайн тизимида)

**Verification:**
- tsc --noEmit: 0 error
- Playwright: komponentlar 1440px — default «Мавжуд» ёнида «Мавжуд эмас» (майдонлар яширин +
  огоҳлантириш) тўғри render; 0 console error
- Сўровнома: «Альтернатив» бўлим йўқ, планшетда тоза тугайди, horizontal overflow йўқ (375===375)
- 375px: фреймлар вертикал стек, марказда; document overflow йўқ (фон device mockup 384px —
  canvas ичида, бошқа `/dizayn/*` саҳифалар билан бир хил хулқ)
**Sifat:** 9.5/10

### TASK-022: Сўровнома — альтернатив (шартли) ҳолат previewлари
**Yaratildi:** 2026-06-16 · **Bajarildi:** 2026-06-16
**Manba:** Foydalanuvchi — "Томорқа «Мавжуд эмас» танлангандаги кўриниш алоҳида йўқ; шундан
келиб чиқиб бошқа камчиликларни ҳам топиб тузат"
**Status:** DONE

**Tavsif (принципиал камчилик):**
Дизайн макетда ҳар шартли танловнинг фақат default (ижобий) тармоғи кўрсатилган эди, альтернативи йўқ.
Топилган барча шундай камчиликлар тузатилди:
- Томорқа «Мавжуд эмас» — майдонлар яширин + огоҳлантириш + бўлим ўтказилиши
- Фойдаланиш «Фойдаланади/Қисман» — «сабаб» майдони яширин
- Ижара «Истаги йўқ» — «муддат» майдони яширин
- Биометрик тасдиқланган — Сақлаш фаол

**O'zgargan fayllar:**
- `components/mobile/SorovnomaScreen.tsx` — `initialForm?: Partial<FormState>` ва
  `initialFaceVerified?: boolean` preview override проплари (барқарор reference, спурияр reset йўқ)
- `app/dizayn/sorovnoma/page.tsx` — «Альтернатив (шартли) ҳолатлар» бўлими: 5 фрейм
  (Томорқа эмас ×3 қадам, Фойдаланади+ижарасиз, Якунлаш тасдиқланган)

**Verification:**
- tsc 0, 0 console error
- 5 альтернатив фрейм render OK; default фреймлар ва интерактивлик регрессиясиз
**Sifat:** 9.5/10

### TASK-021: Компонентлар ва ҳолатлар — дизайн тизими саҳифаси
**Yaratildi:** 2026-06-16 · **Bajarildi:** 2026-06-16
**Manba:** Foydalanuvchi — "sorovnoma va biometrikada ishlatilgan barcha componentlar dizaynlari,
statuslar dizaynlarini bitta alohida pagega tayyorla; qaysi status tanlansa/tanlanmasa nima bo'ladi"
**Status:** DONE

**Tavsif:**
`/dizayn/komponentlar` — дизайн тизими саҳифаси. 2 қисм: (1) КАТАЛОГ — ҳар компонент барча
ҳолатида; (2) ШАРТЛИ МАНТИҚ — жонли интерактив демолар + қоидалар (танланса → / танланмаса →).
Барча компонент реал манбадан рендер қилинади (SSOT — кўчирма эмас).

**Yangi fayllar:**
- `components/mobile/gallery-kit.tsx` — Section / Spec / Variant / RuleCard каркас
- `components/mobile/gallery-catalog.tsx` — TextField, SelectField, TextArea, SearchTextField,
  ChoiceToggle, SectionCard, InfoNote, FamilyHeader, Stepper(0-3), BiometricCard(2),
  FaceRing(4 ҳолат), Primary/GhostButton, AppBar, пастки тугма ҳолатлари
- `components/mobile/gallery-behavior.tsx` — 4 жонли демо (Томорқа, Фойдаланиш, Ижара, Биометрик gate)
  + 6 RuleCard
- `app/dizayn/komponentlar/page.tsx` — саҳифа қобиғи (intro + каталог + мантиқ)

**O'zgargan fayllar:**
- `SorovnomaScreen.tsx` / `BiometrikaScreen.tsx` — reusable sub-компонентлар named export (additive)
- `app/dizayn/sorovnoma/page.tsx` — header'га «Компонентлар» ҳавола

**Verification:**
- tsc 0, 0 console error
- Каталог барча ҳолат render OK; biometrika dark тайлар OK
- Жонли демо интерактив тест: «Мавжуд эмас» → майдонлар яширилди, огоҳлантириш чиқди ✓
- 6 RuleCard (танланса/танланмаса) render OK; SSOT (реал компонентлар)
**Sifat:** 9.5/10

### TASK-020: Биометрик тасдиқлаш — алоҳида Face ID оқими саҳифаси
**Yaratildi:** 2026-06-16 · **Bajarildi:** 2026-06-16
**Manba:** Foydalanuvchi — "Биометрик тасдиқлаш bulimini qilish uchun yana bitta alohida page qo'sh"
**Status:** DONE

**Tavsif:**
Сўровнома биометрик тасдиқлаш учун алоҳида тўлиқ экранли Face ID оқими саҳифаси —
`/dizayn/biometrika` дизайн макети. Dark immersive (navy-черн) экран, 4 ҳолат:
intro → scanning → success → error.

**Yangi fayllar:**
- `components/mobile/BiometrikaScreen.tsx` — мустақил Face ID оқими (phone/tablet, initialState
  preview, FaceRing бурчак кронштейн + sweep + success/error pop, авто-ўтиш фақат фойдаланувчи
  бошлаганда — preview статик туради)
- `app/dizayn/biometrika/page.tsx` — дизайн канвас: 4 телефон ҳолат + планшет (2 устун intro)
- `app/dizayn/sorovnoma/page.tsx` — header'га «Биометрика →» ҳавола (топилувчанлик)

**Verification:**
- tsc 0, 0 console error
- 4 телефон ҳолат + планшет render OK; scanning preview статик (авто-ўтиш фикс)
- Сўровнома → Биометрика ҳавола ишлайди
**Sifat:** 9.5/10

### TASK-019: Сўровнома — бўлимларни кенгайтириш (нафас олдириш)
**Yaratildi:** 2026-06-16 · **Bajarildi:** 2026-06-16
**Manba:** Foydalanuvchi — "shu dizayndagi bo'limlarni kattaroq qilish kerak, ko'p ma'lumotlar bitta joyda tiqilib qolganday"
**Status:** DONE

**Tavsif:**
`/dizayn/sorovnoma` дизайнида бўлимлар яққол ажралмаган эди — кичик inline сарлавҳа + майдонлар
битта оқимдай қўшилиб кетган, айниқса планшетда 4 бўлим 2 устунга тиқилган. Ҳар форма бўлими
алоҳида **панел-карта**га (`SectionCard`) ўралди: тинтли header (иконка + ном + изоҳ) + падингли тана.

**O'zgartirilgan fayllar:**
- `components/mobile/material.tsx` — янги `SectionCard` примитиви (header + body panel)
- `components/mobile/SorovnomaScreen.tsx` — Томорқа/Фойдаланиш бўлимлари SectionCard'га,
  планшет gap 4→6/5, телефон қадам gap 3→4, FamilyHeader қатор py-2.5→3.5, ReviewStep spacing,
  ижара ички картаси tinted bg, `SectionTitle` олиб ташланди

**Verification:**
- tsc --noEmit: 0 error · Playwright (1200px): 4 телефон қадами + планшет render OK, 0 console error
- Before/After screenshot: бўлимлар энди аниқ ажралган, нафас олади (тиқилиш йўқолди)
- Логика ўзгармаган (wizard, валидатсия, Face ID gate бир хил)
**Sifat:** 9.5/10

**Қўшимча — мобил полиш (foydalanuvchi: "mobileda ham yanada chiroyli qil"):**
- Қадам ўтиш анимацияси (fade + slide up, `prefers-reduced-motion` ҳурмат қилинади)
- Stepper premium: gradient + glow актив дот, h-7→8, йўғонроқ rounded connector, белгиланган қадам яшил ✓
- Контент фони flat → нозик кўк gradient (appbar navy билан боғланади)
- Оила картаси navy header'ига оила бошлиғи монограм аватари (ҒЗ)
- Кейингиси/Сақлаш тугмалари gradient + кучлироқ brand shadow
- Планшет: бошқарувсиз ҳамма бўлим кўринади (landscape кенг — қадамга бўлиш клик кўпайтиради) — атайин қолдирилди, фақат полиш қўшилди
- Verify: tsc 0, 0 console error, wizard навигация ишлайди (frame 0→2 тест), планшет регрессия йўқ

**Қўшимча — кадастр рақами тўлиқ кўриниши (foydalanuvchi):**
- `SearchTextField`'га `stackAction` prop — телефонда input тўлиқ кенглик + «Қидириш» остида
  (19 белгили рақам "20:12:01:05:01:0000" тўлиқ кўринади); планшетда ёнма-ён қолади (кенг жой бор)
- Verify: телефон + планшет иккаласида тўлиқ қиймат кўринади, tsc 0, 0 console error

**Қўшимча — Биометрик тасдиқлаш бўлими (чирой + тушунарли):**
- Not-verified: header band (ном + "Сақлаш учун мажбурий қадам") + "Кутилмоқда" badge,
  юз сканери мини-мотиви (бурчак кронштейн + face силуэти), аниқ сабаб (реестр сурати билан
  солиштириш → сохта сўровнома олдини олиш), 2 ишонч нуқтаси (Бир неча сония / Сурат сақланмайди),
  primary gradient тугма
- Verified: gradient яшил карта + check badge устида, "Биометрик тасдиқ фаол" chip
- Verify: реал flow тест (Юзни тасдиқлаш → скан → verified → Сақлаш yoqildi), tsc 0, 0 console error

### TASK-018: «Ижтимоий реестр» сўровнома — мобил форма дизайни
**Yaratildi:** 2026-06-10 · **Bajarildi:** 2026-06-10
**Manba:** Foydalanuvchi — "dalolatnoma formani duplicate qil, [rasm] сўровнома formasini deep o'rganib mobile design tayyorla"
**Status:** DONE

**Tavsif:**
Дала dalolatnoma макетини (`/dizayn/dalolatnoma`) янги `/dizayn/sorovnoma` route'га дублицате қилиб,
ногиронлиги/ёлғиз/ягона боқувчи оилалар «Ижтимоий реестр» сўровномаси (расмдаги форма, 13 майдон)
учун мобил дизайн (телефон 4-қадамли wizard + планшет 2-устун) тайёрланди.

**Yangi/o'zgargan fayllar:**
- `lib/social-survey-data.ts` (yangi) — модель, опциялар, namunaviy oila, ЖШШИР/телефон форматлаш
- `components/mobile/SorovnomaScreen.tsx` (yangi) — wizard + tablet, shartli mantiq + validatsiya
- `components/mobile/material.tsx` — TextArea, SearchTextField, ChoiceToggle qo'shildi
- `components/atoms/Icon.tsx` — call, drop, calendar, profile, personal-card, ruler qo'shildi
- `app/dizayn/sorovnoma/page.tsx` (yangi) — dizayn-maket sahifa

**Hidden requirement (qo'shildi):** progressive disclosure —
кадастр/манзил/майдон фақат томорқа Мавжуд бўлса; фойдаланмаслик сабаби фақат Фойдаланмайди;
ижара муддати фақат Истаги бор. + кадастр lookup (қидириш + verified) + per-step validatsiya.

**Qo'shimcha (foydalanuvchi so'rovi):** Face ID биометрик тасдиқлаш —
сақлашдан олдин оила бошлиғи юзи орқали тасдиқланиши шарт (сохта сўровномани олдини олиш).
Тўлиқ экранли скан overlay (бурчак кронштейн + sweep чизиқ + success check), BiometricCard
(review + планшет), Save тугмаси gate'ланган (тасдиқлангунча disabled). Commit `b101d62`.

**Verification:**
- tsc --noEmit: 0 error · `npm run build`: pass, route `/dizayn/sorovnoma` generated
- Real brauzer (Playwright): 4 telefon qadami + planshet render OK, pageerror=0
- Shartli mantiq 3/3 interaktiv tasdiqlandi (Мавжуд эмас / Фойдаланади / Истаги йўқ → maydonlar yashirildi)
- Commit `428f7d3`, main'ga push qilindi
**Sifat:** 9.5/10

### TASK-017: /infratuzilma — xarita + kaskad selector + darajaga mos kartalar
**Yaratildi:** 2026-06-06 · **Bajarildi:** 2026-06-06
**Manba:** Foydalanuvchi TZ — xarita yonida selectorlar, viloyat/tuman/MFY tanlash; SAVOL javobi: B
**Status:** DONE

**Tavsif:**
/infratuzilma sahifasiga xarita (viloyat tanlash) + yonida kaskad selectorlar (Вилоят → Туман → МФЙ).
Karta ko'rinish qoidalari:
- Республика (default) yoki Вилоят tanlansa → 4 karta (Оғир маҳалла, Янги маҳалла, Оғир туман, Янги туман)
- Туман tanlansa → 3 karta: ikkala маҳалла kartasi + tuman turiga (оғир/янги) mos bitta туман kartasi
- МФЙ tanlansa → 1 karta: mahalla turiga mos (Оғир маҳалла yoki Янги маҳалла)
Chart kesimi darajaga mos: respublika→viloyatlar, viloyat→tumanlar, tuman→mahallalar, MFY→chart yo'q.
Cheklov: SVG xaritada faqat viloyat konturlari bor — tuman/MFY faqat selectordan.

**Acceptance criteria:**
- 4 daraja bo'yicha to'g'ri karta soni (4/4/3/1) va to'g'ri kategoriyalar
- Xaritadan viloyat tanlash selector bilan sinxron; tuman/MFY tanlanganda xarita viloyatni ko'rsatib turadi
- MFY tanlanganda xarita rangi mahalla holatiga mos (оғир=qizil, янги=yashil — mfy page bilan konsistent)
- Selector kaskad: tuman viloyatsiz disabled, MFY tumansiz disabled; reset tugmasi
- Har daraja raqamlari deterministik va har xil
- 320-1440px overflow yo'q, tsc/console toza

**O'zgargan fayllar:**
- `lib/mock-data.ts` — `TumanStatus` + tumanList'ga status; `buildLevelCategory` refactor;
  `getInfraExplorerCards`/`getInfraExplorerLevel` (daraja qoidalari: 4/4/3/1 karta)
- `components/organisms/InfrastructureSection.tsx` — `InfrastructureCard`/`CategoryAccent`/`GroupHeader`
  export, `chartTitle` prop, breakdown bo'sh bo'lsa chart yashirin. Eslatma: `InfrastructureSection`
  wrapper'ning o'zi endi hech qayerda ishlatilmaydi (dead code — o'chirish alohida ruxsat bilan)
- `components/organisms/InfrastructureExplorer.tsx` — YANGI: xarita + kaskad selectorlar + kartalar
- `app/infratuzilma/page.tsx` — Explorer'ga o'tdi

**Verification natijasi (`.claude-state/TASK-017/verify.mjs`):**
- 21/21 PASS: republic=4, viloyat=4 (tumanlar chart), tuman ogir=3 (Оғир туман, Янги туман yo'q),
  tuman yangi=3 (Янги туман), MFY ogir=1+qizil xarita, MFY yangi=1+yashil xarita; map↔select sinxron;
  disabled kaskad; reset; viloyatlar har xil raqam; 320/375/768/1440 overflow 0; 12× tez almashtirish
  errorsiz; console 0
- Screenshot evidence: `.claude-state/TASK-017/level-*.png`
- Sifat bahosi: 9.4/10

**Qo'shimcha (xarita ichma-ich, 2026-06-06):**
- `components/organisms/RegionDrillMap.tsx` — YANGI: sxematik 12-katakli drill xarita
  (5×4 jitter panja, hover tooltip, legend). Tuman rejimi=ko'k shkala, МФЙ rejimi=holat rangi
  (янги=yashil, оғир=qizil), tanlangan katak oq stroke + boshqalari xira
- Explorer: xarita darajasi breadcrumb (Ўзбекистон → Вилоят → Туман, bosib qaytish),
  daraja almashganda fade+zoom transition; viloyat tanlansa tumanlar xaritasi,
  tuman tanlansa mahallalar xaritasi ochiladi (selector bilan ikki tomonlama sinxron)
- Cheklov: real tuman/МФЙ geo-konturlari yo'q — sxematik panja (demo mock-data ga mos)
- Verification: `verify-drill.mjs` — 17/17 PASS (drill flow xaritadan + selectordan,
  breadcrumb qaytish, highlight, 4 viewport overflow 0, console 0)

---

### TASK-016: МФЙ «Объектлар ва таъмирлаш режаси» — zichlik/spacing redesign
**Yaratildi:** 2026-06-06 · **Bajarildi:** 2026-06-06
**Manba:** Foydalanuvchi — «kontent juda kichkina, tiqib tashlangan, ba'zi joylar bo'sh, chiroyli taqsimlash kerak» (screenshot bilan)
**Status:** DONE

**O'zgargan fayllar:**
- `app/mfy/[id]/page.tsx` — `InfraObjectCard`: header qayta taqsimlandi (ikon 36px, title 14px,
  manzil headerda doim ko'rinadi, o'ngda fiksirlangan progress klaster bar+%+x/y), checklist
  desktop'da 2 ustun chip-grid (matn 13px, badge 10.5px), bitta-ishli karta ham moslashtirildi

**Audit + verification:** `web-ui-review-workspace/mfy-repair-plan/iteration-1/findings.md`
- BEFORE: header 1004×46px (22:1), title 12.5px, badge 9px, progress 4px full-width
- AFTER: 320/375/1440 × ikkala status (оғир/янги) overflow 0, console 0, tsc 0, element yo'qolmagan
- Sifat bahosi: 9.3/10

**Qo'shimcha (2026-06-06):** checklist'da uzun ish nomi — `truncate` o'rniga 2-3 qator wrap
(`line-clamp-3`, `items-start`, icon/badge birinchi qatorga tekis, to'liq matn `title`da).
Evidence: `longtext-1440.png`, `longtext-375.png` (DOM injection test, overflow 0)

---

### TASK-015: «Инфратузилма лойиҳалари» — yagona tab'li blok (redesign)
**Yaratildi:** 2026-06-05 · **Bajarildi:** 2026-06-05
**Manba:** Foydalanuvchi — brainstorm sessiyasi (tab'li variant A + ixcham KPI V2 tanlandi)
**Status:** DONE

**Tavsif:**
Республика/Вилоят/Туман sahifalaridagi 4 ta katta infratuzilma kartasi bitta tab'li blokka
birlashtirildi. Drill-down: Республика → вилоятлар (14), Вилоят → туманлар (12), Туман →
маҳаллалар (12); Туман sahifasida faqat 2 ta маҳалла tabi. `/infratuzilma` eski 4-kartali
ko'rinishda qoldi, blokdan «Батафсил» link beriladi.

**Spec:** `docs/superpowers/specs/2026-06-05-infrastructure-tabbed-section-design.md`
**Plan:** `docs/superpowers/plans/2026-06-05-infrastructure-tabbed-section.md`

**O'zgargan fayllar:**
- `components/organisms/GroupedBarChart.tsx` — YANGI (ekstraksiya + `title` prop)
- `components/organisms/infrastructure-palette.ts` — YANGI (shared palitra)
- `components/organisms/InfrastructureTabbedSection.tsx` — YANGI (tab'li blok, 581→587px balandlik, eski ~2400px+)
- `components/organisms/InfrastructureSection.tsx` — chart/palette importga o'tdi, vizual o'zgarish yo'q
- `lib/mock-data.ts` — `getInfrastructureByLevel` (deterministik seed, Math.random yo'q)
- `app/{respublika,viloyat/[id],tuman/[id]}/page.tsx` — yangi komponent
- `components/molecules/KPIGroup.tsx` — qo'shimcha fix: 320px overflow (pre-existing, flex-wrap)

**Verification natijasi (headless Playwright, `.claude-state/TASK-015/verify.mjs`):**
- 24/24 PASS: 4 tab (respublika/viloyat), 2 tab (tuman); jizzakh≠samarqand raqamlari;
  reload barqaror; tuman chartida tuman nomlari, МФЙ chartida МФЙ nomlari; «Батафсил» →
  /infratuzilma regressiyasiz (4 eski karta); blok balandligi 587px (<900); 320/375/768/1440
  overflow yo'q; console/pageerror 0
- Adversarial: noto'g'ri id (`/viloyat/mavjud-emas`) crash yo'q; 12× tez tab almashtirish OK
- Evidence: `.claude-state/TASK-015/*.png` (respublika-1440/375/320, tuman-1440, infratuzilma-regression)
- Sifat bahosi: 9.5/10

---

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
