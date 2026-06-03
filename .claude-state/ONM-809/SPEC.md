# ONM-809 — Oraliq va yakuniy dalolatnoma forma dizayni (SPEC) — MOBIL ILOVA

> ⚠️ TUZATISH: Bu **WEBSITE feature EMAS**. Bu **mobil ilova (Android telefon + planshet) dizayni**.
> Biz uni web loyihada (Next.js) **dizayn preview** sifatida — telefon va planshet **device frame**
> ichida ko'rsatamiz. Buyurtmachi keyin shu dizayn asosida nativ mobil ilovani o'zi yozadi.
> Shuning uchun: dashboard navi/breadcrumb yo'q, desktop web layout yo'q. Android Material uslubi.

Source: Jira ONM-809 (Online-Mahalla, DESIGNER). Design references: Telegram "JIRA files" (35/36).
Mockupdagi forma+xarita yonma-yon ko'rinishi = **planshet (landscape)** layout. Telefon = bir ustun (portrait).

## Deliverable: mobil ilova dizayn preview

Bitta dizayn-canvas sahifa (`/dizayn/dalolatnoma`) — to'liq ekran (dashboard nav yashirin).
Unda **device frame'lar** ichida mobil ilova ekranlari ko'rsatiladi:

1. **Телефон — Обектлар рўйхати** (Android phone, portrait): obyektlar ro'yxati app ekrani.
2. **Телефон — Далолатнома** (Android phone, portrait): dalolatnoma forma app ekrani (bir ustun).
3. **Планшет — Далолатнома** (Android tablet, landscape): forma 2-ustun, xarita kengaytirilgan.

## Ekran 1 — Обектлар рўйхати (телефон)

- Material top app bar (navy `#2b8cee` fon, oq matn): "Инфратузилма обектлари".
- Qidiruv maydoni (Material filled), filtr chip'lar (Барчаси / Оралиқ кутилмоқда / Якуний кутилмоқда / Тугалланган).
- Obyekt kartalari (mobil list item / card): nomi (shortName), мфй·туман, объект коди, ID,
  ikkita status chip — **Оралиқ далолатнома** / **Якуний далолатнома** (Бажарилган=yashil ✓ / Кутилмоқда=amber).
  Karta bosilsa → далолатнома ekraniga o'tadi (preview'da telefon-forma shu obyektni ko'rsatadi).
- empty state (qidiruv natija yo'q).

## Ekran 2/3 — Далолатнома форма (телефон + планшет)

Header: obyekt тавсифи (description) + readonly **объект коди** + **ID**.
Act-type toggle: **Оралиқ далолатнома** / **Якуний далолатнома** (Material segmented).
Maydonlar (Material text field, qizil `*` = majburiy):
- **режа ID** `*` — readonly (object.rejaId)
- **режа номи** `*` — text (object.rejaNomi)
- **қуввати** `*` — raqam, > 0
- **ўлчов бирлиги** `*` — dropdown (INFRA_WORK_UNITS)
- **сарфланган маблағлар** `*` — raqam (so'm), ming ajratgich bilan
Upload: label **қилинган иш расми**, 2× `ImageUpload` (Файл Орқали / Камера Орқали) — mavjud komponent.
Map: label **геопозиция**, `InfraMap` (5 layer: Yandex/OSM/Google Sat/Google Streets/OpenTopoMap, zoom, marker).
Bottom: **sticky bottom action bar** (frame ichida) — to'liq kenglikdagi navy **Сақлаш** tugmasi (Material), + Бекор.
Validatsiya: majburiy maydonlar; submit → loading → "Далолатнома сақланди" success. (Backend mock.)

Layout:
- **Телефон (portrait):** bir ustun, hammasi vertikal stack. App bar tepada, content scroll, Сақлаш pastda sticky.
- **Планшет (landscape):** 2 ustun — chap: header+maydonlar+upload, o'ng: xarita kengaytirilgan (баланд). Bottom action bar.

## Texnik

- Device frame ichida: ekran komponenti `flex flex-col h-full` — app bar (shrink-0) / content (flex-1 overflow-y-auto) / bottom bar (shrink-0). Sticky bar **frame**ga nisbatan, viewportga emas.
- Android Material 3 ruhi, lekin loyiha brendi: primary navy `#2b8cee`, Cyrillic Uzbek. Touch target ≥ 44px.
- Reuse: `InfraMap` (organisms), `ImageUpload` (organisms), `@/lib/mock-data` (`infraObjects`, `getInfraObject`, `INFRA_WORK_UNITS`, `InfraObject`), `@/components/atoms/Icon`.
- Next.js 16, "use client". Dizayn canvas — `fixed inset-0` to'liq ekran (dashboard navni yopadi), ichida "← Бошқарув панели" havola.
- States: loading/empty/validation/success.

## Reuse-able assets (mavjud, o'zgartirmang)
- `components/organisms/InfraMap.tsx` — Leaflet 5-layer map (contract: lat,lng,zoom?,draggableMarker?,onLocationChange?,heightClass?,className?; default export; dynamic import ssr:false).
- `components/organisms/ImageUpload.tsx` — `<ImageUpload label? onChange?(file|null) />`.
- `lib/mock-data.ts` — infraObjects (6 ta), getInfraObject, INFRA_WORK_UNITS, InfraObject type.
