# HANDOFF — ONM-809 · «Томорқа ижараси» модул дизайни

**Янгиланди:** 2026-06-18
**Branch:** main · **Сўнгги commit:** App Store / Arcade light style module entry
**Loyiha:** online-mahalla-dashboard (Next.js 16 + Tailwind) — мобил илова дизайн-кanvasлари (`/dizayn/*`)

## State
- TASK-025 (Томорқа ижараси модул) — **DONE**, кейин кўп итерация (қуйида).
- Барча иш `main`га push қилинган. tsc 0, console 0, page-by-page verify.
- Dev server: `npx next dev` → `http://localhost:3000`.

## Модул нима қилади
«Ижтимоий реестр»даги ногиронлиги бўлган/ёлғиз/ягона боқувчи оилалар томорқасини
ижарага бериш. Оқим: **сўровнома** → «ижарага рози» бўлса → **шартнома**.
Бир МФЙ контексти: **Галаосиё МФЙ** (реал жадвал `poor_family_rents_land_info`дан — 34 оила).

## Саҳифалар (дизайн-кanvas)
- `/dizayn/ijara` — **Модул кириши** (ҲОЗИР: **App Store light + содда UX** — masthead + қидирув + рамли featured карта (Сўровнома, **real Higgsfield томорқа фото** + glass info-panel + «Бошлаш») + Шартнома содда тўлиқ-кенглик картаси (count) + iOS таб-бар). **Статистика плиткалари ва «Барча оилалар» олиб ташланди** (фойдаланувчи: entry ортиқча маълумотсиз, содда бўлсин — фақат 2 амал; статистика рўйхат/ҳисобот экранларида). Evidence: `ARTIFACTS/appstore-light/ijara-simple*.png`
- `/dizayn/ijara/sorovnoma` — Сўровнома: рўйхат + форма + натижа + «томорқа мавжуд эмас» + handoff
- `/dizayn/ijara/shartnoma` — Шартнома: рўйхат + форма (4 қадам) + ҳужжат
- `/dizayn/ijara/referenslar` — Mobbin референслар галереяси
- `/dizayn/sorovnoma` — standalone сўровнома форма + биометрик ҳолатлар (Face ID + Touch ID)
- `/dizayn/biometrika` — standalone Face ID оқими
- `/dizayn/komponentlar` — дизайн тизими (компонент каталог)
Навигация: ҳар `/dizayn/ijara/*` саҳифа юқорисида таблар (Кириш/Сўровнома/Шартнома).

## Асосий файллар
- `lib/ijara-module-data.ts` — оилалар (9 намуна, барчаси Галаосиё МФЙ), статуслар (4),
  REGISTRY_STATS (34 оила), reference рўйхатлар, helper'лар (surveyList/contractList/
  moduleCounts/statusCounts/surveyOutcomeOf/ijaraIstagiOf)
- `components/mobile/IjaraModuleScreen.tsx` — кириш экрани (**App Store light, содда UX**;
  FeaturedCard (Сўровнома, real `<img>` tomorqa-hero.webp) + ContractCard (Шартнома) + iOS BottomNav;
  SF system шрифт. Статистика/рейтинг плиткалари йўқ.)
- `components/mobile/IjaraListScreen.tsx` — рўйхат (survey/contract, gating, streetOf)
- `components/mobile/SorovnomaScreen.tsx` — сўровнома форма + **BiometricCard/FaceScanOverlay**
  (Face ID + Touch ID, export) + SavedModal
- `components/mobile/SorovnomaNatijaScreen.tsx` — ўтказилган сўровнома натижаси (no-garden ҳам)
- `components/mobile/ShartnomaScreen.tsx` — шартнома 4-қадам wizard (биометрика reuse)
- `components/mobile/ShartnomaDocument.tsx` — расмий шартнома ҳужжати (узун қиймат wrap қилинади)
- `components/design/IjaraCanvas.tsx` — умумий canvas қобиқ (top-bar + nav)
- Спецификация: `.claude-state/ONM-809/CONTRACT-MODULE-SPEC.md`

## Бажарилган (бу сессия)
1. **Модул қурилди** (grill-me 10/10 → real-system deep research → 6 экран) — TASK-025.
2. **3 саҳифага split** (kirish/sorovnoma/shartnoma) + Mobbin референслар саҳифаси.
3. **Кириш экрани итерациялари:** flat карталар → NAVER → Fi (statistika) → содда 2×2 tile →
   **N оиладан нечтаси** (нисбат+progress) → реал жадвал статистикаси (34) → meditation-app →
   **App Store / Arcade light** (ҲОЗИРГИ — рамли featured + ранг-баранг рейтинг плиткалари).
4. **«Томорқа мавжуд эмас»** сўровнома+сақлаш оқими (фойдаланиш йўқ → рад этилди, шартнома таклифи йўқ).
5. **Биометрика: Face ID + Touch ID** (2 усул, fingerprint inline SVG, ҳар экранда).
6. **Шартнома ҳужжати:** узун қийматлар (манзил, исм) truncate эмас — wrap.
7. **Бир МФЙ:** барча оила Галаосиё МФЙ; рўйхат қаторида МФЙ номи такрорланмайди (header'да бир марта).

## Очиқ / кейинги қадамлар (опционал)
- Кириш экрани кўп бор қайта чизилди — фойдаланувчи яна услуб ўзгартириши мумкин (ҳозирги: App Store / Arcade light).
- Featured карта фони — **real Higgsfield Soul Location фото** (`public/ijara/tomorqa-hero.webp`, 111KB, 3:2).
  Higgsfield CLI (`higgsfield generate create soul_location --prompt "..." --aspect_ratio 3:2 --wait`) орқали
  генерация қилинди (account stemirov777@gmail.com). Кейин бошқа joyларга ham расм керак бўлса — ҳамон шу CLI.
- Реал backend уланганда: статистика жадвалдан ҳисобланади (ҳозир Галаосиё МФЙ реал 34 рўйхат / 0 сўровнома,
  дизайнда намунавий прогресс 13/9/4/8). Бошқа МФЙ керак бўлса `_mid` берилади.
- «Идентификация» алоҳида tab/саҳифа эмас — формалар ичида (керак бўлса ажратиш мумкин).
- Dashboard'дан (`/infratuzilma`) модулга ҳавола ҳали йўқ — керак бўлса қўшилади.

## Кейинги сессия — биринчи қадам
1. `Read .claude-state/ONM-809/HANDOFF.md` (бу файл) + `CONTRACT-MODULE-SPEC.md`
2. `npx next dev`, `http://localhost:3000/dizayn/ijara` дан давом
