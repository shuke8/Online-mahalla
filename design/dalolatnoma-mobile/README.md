# Далолатнома — Мобил Илова Дизайн

Online Mahalla dashboard'ning **субсидия далолатнома боshqaruvi** учун мобил илова дизайни. Дашбоарддаги `app/mfy/[id]/page.tsx` ва `lib/mock-data.ts` (subsidies bo'limi) ма'lумотларига асосан мобил иловага трансформация.

## Figma Files

| File | Maqsad | URL |
|------|--------|-----|
| Moodboard + Tier Ranking + Mobile Redesign | 3 sahifa, барча reference + final design | https://www.figma.com/design/uG2RnVSHOle85z5LOdXWNy |

3 sahифа:
1. **Далолатнома Moodboard** — Mobbin'дан тaнланган 10 та reference (5×2 grid)
2. **🏆 Tier Ranking** — S/A/B тaqsimot loyiha контекстига moslik bo'yicha
3. **📱 Mobile Redesign** — 6 та якуний iOS screen (393×852)

## Реference Designs — Tier Ranking

### 🥇 Tier S · ENG MOS · darhol pattern ko'chiriladi

| App | Pattern | Fit | Кaерda ишлатамиз |
|-----|---------|-----|-----------------|
| Grab Driver | Application Timeline | 9.6 | Screen 03 — ariza ҳолати timeline |
| Alan Insurance | Certificate Detail | 9.5 | Screen 04 — далолатнома official view |
| Remote Global HR | Requests + Status Badges | 9.4 | Screen 02 — аризалар рўйхати |
| Deel | Compliance Documents Workflow | 9.3 | Screen 05 (multi-step) + 06 (хужжатлар) |

### 🥈 Tier A · adapt qilish kerak

| App | Pattern | Fit |
|-----|---------|-----|
| Sumeria | Verification In Progress | 8.8 |
| Docusign | Sign Document Flow | 8.5 |
| Revolut Business | Card Requests List | 8.2 |

### 🥉 Tier B · faqat ilhom

| App | Pattern | Fit |
|-----|---------|-----|
| Alan Health | Card + QR + Email Share | 7.0 |
| State Farm | Printable ID Card | 6.8 |
| KakaoBank 인증서 | Wallet Card Minimalist | 6.5 |

## Mobile Screens (6 ta · iPhone 14 Pro · 393×852)

| # | Screen | Pattern manbasi | Key elements |
|---|--------|-----------------|--------------|
| 01 | **Бош саҳифа (Home)** | Remote HR + Grab | Navy hero KPI + filter chips + 3 recent application card + bottom tabs |
| 02 | **Аризалар рўйхати** | Remote Global HR | 4-stat strip + filter + month grouping + status-coded card (left color bar) |
| 03 | **Ариза ҳолати (Timeline)** | Grab Driver | Applicant card + active "warning" hero + vertical step timeline (✓ done / ◉ active / ○ pending) |
| 04 | **Далолатнома (Certificate)** | Alan Insurance | Navy brand header + gold emblem + №/sana + applicant + reason + 2 approver signatures + QR verify + PDF/Share CTAs |
| 05 | **Янги ариза (Multi-step)** | Deel | 4-step wizard + progress bar + step indicators + radio reason cards + Орт/Davom etish |
| 06 | **Хужжатлар (Workflow)** | Deel | Overdue alert (red) + 60% progress + 5 doc checklist (Done/Overdue/Pending) + "Эслатма юбориш" |

## Design Tokens (project `app/globals.css`'дан)

```css
--color-navy: #2b8cee;        /* Primary brand */
--color-navy-light: #61a6fa;
--color-navy-lighter: #EDF5FF;
--color-gold: #D4A76A;        /* Accent / emblem */
--color-success: #1dc973;     /* Берилган */
--color-warning: #F59E0B;     /* Кўриб чиқилмоқда */
--color-danger: #EF4444;      /* Рад этилган */
--color-surface: #eaf2fc;
--color-text-primary: #020817;
--color-text-secondary: #64748b;
--color-border-light: #e2e8f0;
```

**Font:** Inter Variable (regular 400, medium 500, semi-bold 600, bold 700)
**Radius scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48
**Shadow:** `shadow-layered` — 4-layer soft drop shadow
**Language:** Cyrillic Uzbek (Берилган / Кўриб чиқилмоқда / Тавсия этилди / Рад этилган)

## Status oqimi (Доменли модел)

```
Тавсия этилди (раис)
   ↓
Хокимга юборилди
   ↓
Кўриб чиқилмоқда (хоким даражасида)
   ↓
┌──────────────┐
│ Берилган     │  → Далолатнома PDF + QR
│ Рад этилган  │  → Сабаб + qayta ariza imkoni
└──────────────┘
```

## Foydalanuvchilar (Personas)

| Persona | Birinchi screen | Asosiy ish |
|---------|-----------------|------------|
| Маҳалла раиси (Ҳакимов Б.) | 01 Home | Аризаларни тавсия этиш, хужжатлар йиғиш |
| Хоким ёрдамчиси (Тўраев Ж.) | 02 List | Аризаларни кўриб чиқиш, тасдиқ/рад |
| Аризачи (фуқаро) | 03 Status | Ариза ҳолатини кузатиш, далолатнома ОЛИШ |

## Implementation tartibi

1. **Phase 1 — Foundation:** Theme, design tokens, navigation shell, bottom tab bar
2. **Phase 2 — Read flows:** Screen 01 (Home), 02 (List), 03 (Timeline), 04 (Certificate) — read-only
3. **Phase 3 — Write flows:** Screen 05 (Create wizard), 06 (Documents upload)
4. **Phase 4 — Polish:** Animations, haptics, error states, offline support, push notifications

## Tech stack (taklif)

- **Flutter** (Material 3 + cupertino_widgets) — yagona codebase Android + iOS
- yoki **SwiftUI** (iOS-only) + **Jetpack Compose** (Android) — native max perf
- **State:** Riverpod (Flutter) / Combine + Observable (Swift) / Flow (Compose)
- **API:** REST → existing Online Mahalla backend (dashboard'ka mos)
- **Offline:** SQLite cache, sync on connect
- **Auth:** OTP via SMS (фуқаро) yoki credentials (rais/xokim ёрдамчиси)

---

**Sources:** Mobbin (iOS reference search) · Tier ranking — loyiha government registr + Cyrillic UZ + navy palette mosligi bo'yicha · Mobile redesign — 100% loyiha design system'iga амал қилади
