/**
 * ijara-module-data.ts — «Томорқа ижараси» moduli (Ижтимоий реестр) namunaviy ma'lumot.
 *
 * Modul: ногиронлиги бўлган, ёлғиз ва оилада ягона боқувчи оилалар томорқасини
 * ижарага бериш. Avval СЎРОВНОМА → «ижарага рози» bo'lsa ШАРТНОМА tuziladi.
 *
 * Oila holati 4 bosqich (state machine):
 *  survey_pending  → сўровнома кутилмоқда (So'rovnoma ro'yxatida)
 *  declined        → сўровнома бор, «Истаги йўқ»/томорқа йўқ (terminal)
 *  contract_pending→ сўровнома бор, «Истаги бор» (Shartnoma ro'yxatida — yaroqli)
 *  contract_done   → шартнома тузилган (terminal)
 *
 * Reference ro'yxatlari (тип/кунлар/соатлар) — real tizimdan
 * (online-mahalla `forms/social_reestr_land_renting_acts`) олинди.
 */

import type { IconName } from "@/components/atoms/Icon";

export type FamilyStatus = "survey_pending" | "declined" | "contract_pending" | "contract_done";

export interface IjaraFamily {
  id: string;
  /** Оила бошлиғи Ф.И.О.си — реестрдан */
  oilaBoshligiFio: string;
  /** ЖШШИР (14 рақам, форматланмаган) */
  jshshir: string;
  telefon: string;
  oilaAzolariSoni: number;
  kadastrRaqami: string;
  manzil: string;
  /** Ер майдони (сотих) */
  erMaydoni: string;
  status: FamilyStatus;
  /** Сўровнома натижаси — «Истаги бор» оилаларда ижара муддати (тугаш санасини таклиф қилади) */
  ijaraMuddati?: string;
}

/* ── Шартнома reference ro'yxatlari (real tizimдан) ───────────────────────── */

/** Ижарага олувчи тури — 2 вариант */
export const IJARAGA_OLUVCHI_TURI = ["Жисмоний шахс", "Юридик шахс"] as const;
export type IjaragaOluvchiTuri = (typeof IJARAGA_OLUVCHI_TURI)[number];

/** Кунлик фойдаланув кунлари (multi-select) */
export const HAFTA_KUNLARI = [
  "Душанба",
  "Сешанба",
  "Чоршанба",
  "Пайшанба",
  "Жума",
  "Шанба",
  "Якшанба",
] as const;
export type HaftaKuni = (typeof HAFTA_KUNLARI)[number];

/** Кириш/чиқиш соати — 00:00…23:00 */
export const SOATLAR: string[] = Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}:00`);

/* ── Холат metadata (ro'yxat qatori + кириш ekrani) ──────────────────────── */

export type StatusTone = "warning" | "muted" | "navy" | "success";

export const STATUS_META: Record<
  FamilyStatus,
  { label: string; short: string; tone: StatusTone; icon: IconName }
> = {
  survey_pending: { label: "Сўровнома кутилмоқда", short: "Кутилмоқда", tone: "warning", icon: "note" },
  declined: { label: "Рад этилган", short: "Рад этилган", tone: "muted", icon: "close-circle" },
  contract_pending: { label: "Шартномага тайёр", short: "Тайёр", tone: "navy", icon: "document-text" },
  contract_done: { label: "Шартнома тузилган", short: "Тузилган", tone: "success", icon: "tick-circle" },
};

/* ── Намунавий оилалар (макет учун) ──────────────────────────────────────── */

export const ijaraFamilies: IjaraFamily[] = [
  {
    id: "F-001",
    oilaBoshligiFio: "Ғоибова Зулфизар Жаббор қизи",
    jshshir: "42309956460019",
    telefon: "+998916237583",
    oilaAzolariSoni: 5,
    kadastrRaqami: "20:12:01:05:01:0000",
    manzil: "Ғафур Ғулом МФЙ, Рудакий кўчаси, 5-уй",
    erMaydoni: "121.12",
    status: "contract_pending",
    ijaraMuddati: "12 ой",
  },
  {
    id: "F-002",
    oilaBoshligiFio: "Раҳимов Анвар Каримович",
    jshshir: "31802889120044",
    telefon: "+998901112233",
    oilaAzolariSoni: 4,
    kadastrRaqami: "20:12:01:06:02:0014",
    manzil: "Навбаҳор МФЙ, Бобур кўчаси, 12-уй",
    erMaydoni: "86.40",
    status: "survey_pending",
  },
  {
    id: "F-003",
    oilaBoshligiFio: "Юсупова Маҳбуба Тошпўлат қизи",
    jshshir: "52511902730028",
    telefon: "+998935557788",
    oilaAzolariSoni: 6,
    kadastrRaqami: "20:12:02:01:03:0007",
    manzil: "Дўстлик МФЙ, Амир Темур кўчаси, 28-уй",
    erMaydoni: "64.00",
    status: "survey_pending",
  },
  {
    id: "F-004",
    oilaBoshligiFio: "Қодиров Бахтиёр Эркин ўғли",
    jshshir: "30106877540051",
    telefon: "+998977778899",
    oilaAzolariSoni: 3,
    kadastrRaqami: "20:12:01:04:05:0021",
    manzil: "Ёшлик МФЙ, Навоий кўчаси, 7-уй",
    erMaydoni: "52.30",
    status: "declined",
  },
  {
    id: "F-005",
    oilaBoshligiFio: "Эргашева Нодира Аброр қизи",
    jshshir: "61703914820036",
    telefon: "+998883344556",
    oilaAzolariSoni: 5,
    kadastrRaqami: "20:12:03:02:01:0009",
    manzil: "Истиқлол МФЙ, Фурқат кўчаси, 14-уй",
    erMaydoni: "98.75",
    status: "contract_pending",
    ijaraMuddati: "24 ой",
  },
  {
    id: "F-006",
    oilaBoshligiFio: "Турсунов Жасур Олим ўғли",
    jshshir: "29904868310062",
    telefon: "+998945556677",
    oilaAzolariSoni: 4,
    kadastrRaqami: "20:12:02:03:04:0018",
    manzil: "Чорсу МФЙ, Мустақиллик кўчаси, 3-уй",
    erMaydoni: "73.50",
    status: "contract_done",
    ijaraMuddati: "12 ой",
  },
  {
    id: "F-007",
    oilaBoshligiFio: "Холматова Гулнора Раҳим қизи",
    jshshir: "54312899670013",
    telefon: "+998901239944",
    oilaAzolariSoni: 7,
    kadastrRaqami: "20:12:01:07:02:0033",
    manzil: "Боғишамол МФЙ, Сайрам кўчаси, 19-уй",
    erMaydoni: "110.20",
    status: "survey_pending",
  },
  {
    id: "F-008",
    oilaBoshligiFio: "Назаров Шавкат Ҳамид ўғли",
    jshshir: "30208856420077",
    telefon: "+998935551020",
    oilaAzolariSoni: 4,
    kadastrRaqami: "20:12:03:01:06:0005",
    manzil: "Олмазор МФЙ, Шифокорлар кўчаси, 9-уй",
    erMaydoni: "67.80",
    status: "contract_done",
    ijaraMuddati: "36 ой",
  },
];

/* ── Ажратиб олувчи helper'lar (derived — single source of truth) ────────── */

/** So'rovnoma ro'yxati — kутилмoqda (asosiy) + o'tkazilган (boshqa barchasi). */
export function surveyList(tab: "pending" | "done"): IjaraFamily[] {
  return ijaraFamilies.filter((f) =>
    tab === "pending" ? f.status === "survey_pending" : f.status !== "survey_pending",
  );
}

/** Shartnoma ro'yxati — tayyor (yaroqli) yoki tuzilgan. */
export function contractList(tab: "ready" | "done"): IjaraFamily[] {
  return ijaraFamilies.filter((f) =>
    tab === "ready" ? f.status === "contract_pending" : f.status === "contract_done",
  );
}

/* ── МФЙ реестр статистикаси (реал жадвалга мос) ─────────────────────────── */

/** Жорий МФЙ (реал тизим жадвалидан: poor_family_rents_land_info). */
export const MFY_NAME = "Галаосиё МФЙ";

/**
 * МФЙ реестр статистикаси — устунлар реал жадвалга мос:
 * жами рўйхат → сўровнома ўтказилди → ижара истаги → ижарага берилди.
 * Реал тизим уланганда бу сонлар жадвалдан автоматик ҳисобланади
 * (Галаосиё МФЙ: 34 оила рўйхатда). Қуйидаги тақсимот — намунавий прогресс.
 */
export const REGISTRY_STATS = {
  total: 34, // рўйхатдаги оилалар
  survey_pending: 13, // сўровнома кутилмоқда
  declined: 8, // истаги йўқ
  contract_pending: 9, // истаги бор, ижара йўқ
  contract_done: 4, // ижарага берилди
} as const;

/** Modul kirish ekrani uchun sonlar (реестр статистикасидан). */
export function moduleCounts() {
  const r = REGISTRY_STATS;
  return {
    total: r.total,
    surveyPending: r.survey_pending,
    declined: r.declined,
    contractReady: r.contract_pending,
    contractDone: r.contract_done,
    /** сўровнома ўтказилди (жами − кутилмоқда) */
    surveyed: r.total - r.survey_pending,
    /** ижара истаги бор (рози оила) = тайёр + берилди */
    wantsRent: r.contract_pending + r.contract_done,
  };
}

/** Реестр статусларининг 4 та сони (statistika tile/segment uchun). */
export function statusCounts(): { status: FamilyStatus; count: number }[] {
  const r = REGISTRY_STATS;
  return [
    { status: "survey_pending", count: r.survey_pending },
    { status: "declined", count: r.declined },
    { status: "contract_pending", count: r.contract_pending },
    { status: "contract_done", count: r.contract_done },
  ];
}
