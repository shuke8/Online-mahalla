# SPEC — «Томорқа ижараси» modul dizayni (Ижтимоий реестр)

**Manba:** grill-me sessiyasi (2026-06-17) + real tizim deep research
(`http://online-mahalla.local/forms/social_reestr_land_renting_acts`).
**Status:** TASARRUF — qaror qabul qilindi (10/10 savol = A), build kutilmoqda.

## Maqsad
«Ижтимоий реестр»даги ногиронлиги бўлган, ёлғиз ва оилада ягона боқувчи оилалар
томорқасини ижарага бериш jarayoni — **so'rovnoma + shartnoma bitta modulda**. Avval
so'rovnoma o'tkaziladi; «ижарага бериш истаги бор» bo'lsagina shartnoma tuziladi.

## Oila holat modeli (4 holat) — SAVOL 2/3
1. **Сўровнома кутилмоқда** — so'rovnoma yo'q → So'rovnoma ro'yxatida
2. **Рад этilган** — so'rovnoma bor, «Истаги йўқ»/томорқа йўқ → shartnomaga yaroqsiz (terminal)
3. **Шартнома кутилмоқда** — so'rovnoma bor, «Истаги бор» → yaroqli → Shartnoma ro'yxatida
4. **Шартнома тузилган** — terminal

Yaroqsiz oila shartnoma ro'yxatida yo'q, lekin qidiruvда disabled qator + sabab +
«Сўровнома ўтказиш →» yo'li bilan chiqadi.

## Ekranlar (deliverable: dizayn-kanvas `/dizayn/ijara`, phone wizard + tablet)
1. **Модул кириши** — AppBar «Томорқа ижараси» + intro + 2 amal kartasi:
   «Сўровнома ўтказиш» (badge «Кутилмоқда: N») · «Шартнома расмийлаштириш» (badge «Тайёр: M»)
   + kichik stat (jami / o'tkazilган / tuzilган).
2. **Сўровнома рўйхати** — qidiruv (ФИО/ЖШШИР/манзил) + tab «Кутилмоқда / Ўтказилган»
   + boy qatorlar (avatar + ФИО + ЖШШИР + манзил + status chip + chevron) + empty state.
3. **Сўровнома форма** — `SorovnomaScreen` (MAVJUD). «Истаги бор» bilan saqlangач, success
   ekranida «Шартнома тузиш» (asosiy) + «Рўйхатга қайтиш» — SAVOL 4.
4. **Шартнома рўйхати** — qidiruv + tab «Тайёр / Тузилган» + yaroqli oilalar; yaroqsiz qidiruvда.
5. **Шартнома форма (YANGI)** — 4 qadamli wizard (SAVOL 6):
   - **1 Ижарага берувчи** — oila avto, read-only: ФИО, ЖШШИР, телефон, ер майдони (реестрдан).
   - **2 Ижарага олувчи** — тип (Жисмоний/Юридик toggle), СТИР (lookup), номи.
   - **3 Ижара шартлари** — сана, бошланиш санаси, тугаш санаси (prefill = бошланиш + so'rovnoma
     муддати, таҳрирланади — SAVOL 9), ижара тўлови (ойлик), ҳафта кунлари (chips душанба…якшанба,
     multi), кириш соати, чиқиш соати (00:00–23:00).
   - **4 Якунлаш** — текшириш + **oila boshlig'i yuz biometrikasi** (SAVOL 7) + имзо/сақлаш.
6. **Шартнома ҳужжати (YANGI)** — `DocumentScreen` patternидан: to'liq matn (ikkala tomon,
   томорқа, шартлар, жадвал, сана, рақам) — ko'rish/ulashish (SAVOL 8).

## Haqiqiy shartnoma maydonlari (real tizimdan, 14 ta) — ground truth
*Ижарага берувчi (oila tanlash → avto, disabled):* ФИО · ЖШШИР · телефон · ер майдони (сотих).
*Ижарага олувчi + шартлар (majburiy):* тип (2 var) · номи · сана · СТИР · бошланиш санаси ·
тугаш санаси · ижара тўлови (ойлик) · ҳафта кунлари (multi: душанба…якшанба) · кириш соати ·
чиқиш соати (00:00–23:00). Web'da biometrika YO'Q, oila форма ichida combobox bilan tanlanadi —
mobil uchun ro'yxat→tanlash→forma + biometrika qo'shildi.

## Reuse (SSOT)
`SorovnomaScreen` (so'rovnoma + FaceScan flow), `DocumentScreen`/`DalolatnomaScreen` (hujjat),
`ObjectsListScreen` (ro'yxat), `material.tsx` (AppBar/SectionCard/SelectField/ChoiceToggle/…),
`DeviceFrame`, gallery-* patternlar.

## Qarorlar jurnali (grill-me 2026-06-17)
S1 scope=to'liq · S2 4-holat model · S3 yaroqsiz=disabled+sabab · S4 success→«Шартнома тузиш» ·
S5 lessee тип+lookup · S6 4-qadam wizard · S7 oila boshlig'i biometrikasi · S8 shartnoma hujjati ·
S9 prefill: oila/томорқа avto + муддат→тугаш санаси · S10 kirish 2 karta+badge, boy ro'yxat.
