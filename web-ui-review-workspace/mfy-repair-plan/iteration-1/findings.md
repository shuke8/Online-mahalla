# МФЙ — «Объектлар ва таъмирлаш режаси» bo'limi auditi (TASK-016)

**Sana:** 2026-06-06 · **Sahifa:** /mfy/[id] (mustaqillik=оғир, yangi-hayot=янги) · **Viewport:** 1440 + 375
**Stack:** Next.js 16 + Tailwind v4 (lokal codebase — fix to'g'ridan-to'g'ri komponentda)
**Manba:** foydalanuvchi shikoyati — «kontent juda kichkina, tiqib tashlangan, ba'zi joylar bo'sh»

## Topilgan issuelar

| ID | Severity | Muammo | O'lchov (evidence) |
|---|---|---|---|
| ISSUE-001 | high | Karta header ekstremal nisbat — kichik matn ulkan qatorda | 1004×46px (22:1), title 12.5px |
| ISSUE-002 | high | Checklist: nom ↔ badge orasida ulkan bo'sh joy, matn mayda | text 11.5px, badge 9px, ~700px gap |
| ISSUE-003 | medium | Progress bar 4px, full-width, % yo'q | h-1 (4px) ~900px |
| ISSUE-004 | medium | Ikon chip qatorga nisbatan kichik | 28px chip / 46px row |
| ISSUE-005 | medium | Manzil matni o'qish chegarasidan past | 10.5px |
| ISSUE-006 | medium | Bitta ustun ro'yxat → vertikal cho'zilish, ich tiqis/tashqari bo'sh | 5 obekt × full-width |

Evidence: `screenshots/section-1440-expanded.png`, `section-375-expanded.png` (BEFORE).

## Qo'llangan fix (app/mfy/[id]/page.tsx — InfraObjectCard)

- Header qayta taqsimlandi: ikon 28→36px (icon 14→18), title 12.5px→14px (`text-sm`), manzil endi headerda doim ko'rinadi (11.5px) — o'rta bo'shliqni to'ldiradi
- Progress o'ngda fiksirlangan klaster: bar `w-24/lg:w-32 h-1.5` + **foiz (13px)** + x/y (11px); mobile'da bar yashirin, %+x/y qoladi
- Checklist: `sm:grid-cols-2` grid, har ish alohida chip (`bg-white/60 border px-2.5 py-2`), matn 11.5→13px, badge 9→10.5px, status ikon 13→15px
- Bitta-ishli karta ham bir xil o'lchamlarga keltirildi (ikon 36, title 14, badge 11px)
- Padding: px-2.5 py-2 → px-3.5 py-3; radius lg→xl

## AFTER verification

- Screenshot: `after-1440-ogir.png`, `after-375-ogir.png`, `after-320-*`, `*-yangi.png` (ikkala status)
- Overflow: 320/375/1440 × 2 sahifa — 0 (scrollWidth === innerWidth)
- Console/pageerror: 0 · tsc: 0 error
- BEFORE/AFTER element diff: yo'qolgan element yo'q (manzil expanded'dan headerga ko'chdi — yaxshilanish)
- Sifat: 9.3/10
