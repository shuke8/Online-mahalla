# Инфратузилма лойиҳалари — yagona tab'li blok (redesign)

**Sana:** 2026-06-05
**Holat:** Tasdiqlangan (brainstorm yakuni)
**Scope:** `app/respublika`, `app/viloyat/[id]`, `app/tuman/[id]` sahifalaridagi «Инфратузилма лойиҳалари» bo'limi

## Muammo

Joriy `InfrastructureSection` (581 qator) har sahifada 4 ta bir xil strukturali katta karta chiqaradi
(«Оғир маҳалла», «Янги Ўзбекистон маҳалла», «Оғир туман», «Янги Ўзбекистон туман»):

1. Sahifa vertikal juda cho'zilib ketadi (4 × to'liq karta ≈ 2400px+)
2. Kategoriyalararo taqqoslash qiyin — kartalar ustma-ust, yonma-yon emas
3. Республика, Вилоят va Туман sahifalarida **bir xil global ma'lumot** ko'rinadi — drill-down yo'q

## Yechim

4 kategoriya **bitta tab'li blok**ga birlashadi. Har sahifa o'z darajasidagi kesimni ko'rsatadi.

### Komponent arxitekturasi

| Fayl | O'zgarish |
|---|---|
| `components/organisms/GroupedBarChart.tsx` | YANGI — hozir `InfrastructureSection.tsx` ichidagi private `GroupedBarChart` (+`CustomGroupedTooltip`, ~230 qator) shu faylga ko'chadi, named export |
| `components/organisms/InfrastructureTabbedSection.tsx` | YANGI — tab'li blok. Props: `level: "republic" \| "viloyat" \| "tuman"`, `entityId?: string` |
| `components/organisms/InfrastructureSection.tsx` | `GroupedBarChart`ni yangi fayldan import qiladi, boshqa o'zgarish YO'Q — `/infratuzilma` sahifasi uchun saqlanadi |

### Blok strukturasi (tepadan pastga)

1. **Sarlavha qatori:** «Инфратузилма лойиҳалари» + subtitle + o'ngda «Батафсил →» link (`/infratuzilma`)
2. **Tab'lar:** 4 ta (republic/viloyat), 2 ta (tuman — faqat Оғир маҳалла + Янги маҳалла).
   - Har tab kategoriya rangli dot bilan: Оғир маҳалла `#2b8cee`, Янги маҳалла `#06b6d4`,
     Оғир туман `#4f46e5`, Янги туман `#8b5cf6` (mavjud `INFRA_PALETTE`)
   - Маҳалла- va Туман-darajali juftliklar orasida nozik vertikal ajratgich
   - Mobile (<640px): tab qatori gorizontal scroll
3. **KPI qatori (V2 — tanlangan variant):** 4 ta ixcham pill bitta qatorda:
   - Жами лойиҳалар сони (raqam)
   - Жами обектлар сони (raqam)
   - Оралиқ далолатнома (mini conic-ring % + son)
   - Якуний далолатнома (mini conic-ring % + son)
   - 320px: 2×2 grid
4. **Bar chart (GroupedBarChart qayta ishlatiladi):** 2 seriya — «Лойиҳа бажарилиш фоизи» /
   «Объектлар бажарилиш фоизи», o'rtacha chiziq (`averageKey`), legend toggle, pagination/expand
   funksiyalari saqlanadi. Chart sarlavhasi darajaga mos: «Вилоятлар/Туманлар/Маҳаллалар бўйича таққослама»

### Drill-down data (lib/mock-data.ts)

- `getInfrastructureByLevel(level, entityId?)` — YANGI funksiya. Qaytaradi: har kategoriya uchun
  `{ title, totalProjects, totalObjects, interimPct, interimCount, finalPct, finalCount, breakdown: [{ name, total, projectPct, objectPct }] }`
- Kesimlar: `republic` → 14 vilooyat; `viloyat` → o'sha viloyat tumanlari; `tuman` → o'sha tuman mahallalari
- Qiymatlar **deterministik** — `entityId` dan oddiy seed (string hash), `Math.random()` ishlatilmaydi,
  reload'da barqaror. Har viloyat/tuman o'ziga xos raqamlar ko'radi
- Mavjud `infrastructureData` o'zgarmaydi (`/infratuzilma` ishlatadi); republic darajasi uning
  qiymatlaridan boshlanadi, breakdown 14 viloyatga kengaytiriladi
- Viloyat/tuman nomlari mavjud mock-data strukturalaridan olinadi (region/tuman ro'yxatlari)

### Sahifalar integratsiyasi

| Sahifa | O'zgarish |
|---|---|
| `app/respublika/page.tsx` | `<InfrastructureTabbedSection level="republic" />` |
| `app/viloyat/[id]/page.tsx` | `<InfrastructureTabbedSection level="viloyat" entityId={id} />` |
| `app/tuman/[id]/page.tsx` | `<InfrastructureTabbedSection level="tuman" entityId={id} />` |
| `app/infratuzilma/page.tsx` | TEGILMAYDI — eski 4-kartali batafsil ko'rinish qoladi |

### Holatlar

- Tab almashganda kontent fade (~150ms), layout shift yo'q
- `entityId` topilmasa yoki breakdown bo'sh — empty state (ikon + «Маълумот мавжуд эмас»)
- Yangi dependency YO'Q (recharts, tailwind mavjud)

## Acceptance criteria

1. Республика sahifasida bo'lim bitta tab'li blok — 4 tab, balandlik eski 4-kartadan kamida 3 barobar qisqa
2. Вилоят sahifasida chart o'sha viloyat **туманлари** kesimida, KPI raqamlari viloyatga xos
3. Туман sahifasida faqat 2 tab (маҳалла kategoriyalari), chart **маҳаллалар** kesimida
4. Har xil viloyat/tuman sahifalari har xil raqam ko'rsatadi; reload'da qiymatlar o'zgarmaydi
5. «Батафсил» link `/infratuzilma` ga olib boradi, u yerda eski to'liq ko'rinish ishlaydi
6. 320/375/768/1440px viewport'larda overflow yo'q; tab'lar mobile'da scroll bo'ladi
7. `tsc` xatosiz, console error yo'q

## Verification plan

- Playwright: 3 sahifa × (375px + 1440px) screenshot, tab almashtirish flow, «Батафсил» navigatsiya
- 2 xil viloyat (`/viloyat/jizzax` vs `/viloyat/toshkent`) raqamlari farqini tekshirish
- `/infratuzilma` regressiya: eski ko'rinish o'zgarmagan (BEFORE/AFTER screenshot diff)

## Out of scope

- `/infratuzilma` sahifasining o'zini redesign qilish
- Real API integratsiya (loyiha mock-data bosqichida)
- МФЙ (mahalla) sahifasidagi bo'limlar
