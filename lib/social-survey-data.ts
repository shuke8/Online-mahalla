/**
 * social-survey-data.ts — «Ижтимоий реестр»да турувчи ногиронлиги бўлган,
 * ёлғиз ва оилада ягона боқувчи бўлган оилалардан ўтказиладиган СЎРОВНОМА
 * учун маълумот модели, танлов рўйхатлари ва намунавий ёзув (дизайн макети).
 *
 * Реал backend уланганда `sampleSurveyFamily` ўрнига реестр API'дан
 * оила маълумоти, кадастр lookup эса кадастр хизматидан олинади.
 */

/* ── Танлов рўйхатлари (select/toggle опциялари) ──────────────────────────── */

/** Томорқаси мавжудлиги — 2 вариант (toggle) */
export const TOMORQA_MAVJUDLIGI = ["Мавжуд", "Мавжуд эмас"] as const;
export type TomorqaMavjudligi = (typeof TOMORQA_MAVJUDLIGI)[number];

/** Томорқадан фойдаланиш ҳолати */
export const FOYDALANISH_HOLATI = [
  "Фойдаланади",
  "Қисман фойдаланади",
  "Фойдаланмайди",
] as const;
export type FoydalanishHolati = (typeof FOYDALANISH_HOLATI)[number];

/** Ижарага бериш истаги — 2 вариант (toggle) */
export const IJARA_ISTAGI = ["Истаги бор", "Истаги йўқ"] as const;
export type IjaraIstagi = (typeof IJARA_ISTAGI)[number];

/** Қанча муддатга бериш мумкин (ой кўрсаткичи) */
export const IJARA_MUDDATI = ["3 ой", "6 ой", "12 ой", "24 ой", "36 ой"] as const;
export type IjaraMuddati = (typeof IJARA_MUDDATI)[number];

/** Томорқанинг сув таъминоти ҳолати */
export const SUV_TAMINOTI = [
  "Марказлашган ичимлик суви",
  "Қудуқ",
  "Ариқ ёки канал",
  "Сув йўқ",
] as const;
export type SuvTaminoti = (typeof SUV_TAMINOTI)[number];

/* ── Оила ёзуви (реестрдан + дефолт префилл) ──────────────────────────────── */

export interface SocialSurveyFamily {
  /** Оила бошлиғи Ф.И.О.си — реестрдан, фақат ўқиш */
  oilaBoshligiFio: string;
  /** ЖШШИР (14 рақам, форматланмаган) — реестрдан, фақат ўқиш */
  jshshir: string;
  /** Телефон рақами — реестрдан, фақат ўқиш */
  telefon: string;
  /** Оила аъзолари сони — реестрдан, фақат ўқиш */
  oilaAzolariSoni: number;

  /** Кадастр рақами — оператор киритади / кадастр lookup тўлдиради */
  kadastrRaqami: string;
  /** Манзил — кадастр lookup'дан ёки қўлда */
  manzil: string;
  /** Ер майдони (сотих) */
  erMaydoni: string;
}

/** Намунавий оила (макет учун, расмдаги маълумотларга мос — кириллча). */
export const sampleSurveyFamily: SocialSurveyFamily = {
  oilaBoshligiFio: "Ғоибова Зулфизар Жаббор қизи",
  jshshir: "42309956460019",
  telefon: "+998916237583",
  oilaAzolariSoni: 5,
  kadastrRaqami: "20:12:01:05:01:0000",
  manzil: "Ғафур Ғулом МФЙ, Рудакий кўчаси, 5-уй",
  erMaydoni: "121.12",
};

/* ── Форматлаш ёрдамчилари (детерминистик, hydration-safe) ────────────────── */

/** 14 рақамли ЖШШИРни 2-3-3-3-3 гуруҳлаб ўқишли қилади: 42 309 956 460 019 */
export function formatJshshir(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 14);
  if (d.length < 14) return d;
  return `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 11)} ${d.slice(11, 14)}`;
}

/** +998916237583 → +998 91 623 75 83 */
export function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("998")) {
    return `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10, 12)}`;
  }
  return raw;
}
