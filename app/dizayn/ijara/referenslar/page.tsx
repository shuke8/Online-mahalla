"use client";

import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";

/**
 * Референс дизайнлар — «модулга кириш / action card» паттерни учун Mobbin'дан
 * танлаб олинган намуналар. Расмлар public/references/mobbin/ да (доимий).
 */

interface Ref {
  file: string;
  app: string;
  screen: string;
  note: string;
  tags: string[];
  mobbinUrl: string;
}

const REFS: Ref[] = [
  {
    file: "airwallex-tasks.webp",
    app: "Airwallex",
    screen: "My tasks",
    note: "Count pill + статус қатори — менинг «Кутилмоқда: 3» badge'имга энг яқин намуна.",
    tags: ["count pill", "status", "chevron"],
    mobbinUrl: "https://mobbin.com/screens/183421be-24a2-47db-b692-a98293277b3a",
  },
  {
    file: "alan-documents.webp",
    app: "Alan",
    screen: "Useful documents",
    note: "Иконка tile + сарлавҳа + изоҳ + chevron — менинг карта қаторим айнан шу тузилма.",
    tags: ["icon tile", "title+desc", "chevron"],
    mobbinUrl: "https://mobbin.com/screens/fbffa606-5b2c-4f3d-9020-2d6cfff79f7a",
  },
  {
    file: "chime-documents.webp",
    app: "Chime",
    screen: "Documents",
    note: "Энг тоза (флат) икон + сарлавҳа + изоҳ + chevron — ортиқча безаксиз.",
    tags: ["minimal", "flat", "chevron"],
    mobbinUrl: "https://mobbin.com/screens/13d4cd3d-ff0d-4656-8e4e-5b8a4464ce6b",
  },
  {
    file: "instagram-dashboard.webp",
    app: "Instagram",
    screen: "Professional dashboard",
    note: "Сарлавҳа + изоҳ + «New» badge + chevron — badge'ли қаторлар иерархияси.",
    tags: ["badge", "list", "chevron"],
    mobbinUrl: "https://mobbin.com/screens/5d8d353f-a51a-46ee-88ca-2c99e1352673",
  },
  {
    file: "tesla-menu.webp",
    app: "Tesla",
    screen: "Menu",
    note: "Кириш қаторлари (икон + ном + изоҳ + chevron), қоронғи мавзу варианти.",
    tags: ["entry rows", "dark", "chevron"],
    mobbinUrl: "https://mobbin.com/screens/d109fe47-250f-4493-a7fe-c334958d9878",
  },
  {
    file: "alipay-services.webp",
    app: "Alipay",
    screen: "Family services",
    note: "Давлат/оилавий хизмат tile'лари — grid, ном + изоҳ + амал чипи.",
    tags: ["gov services", "grid", "action"],
    mobbinUrl: "https://mobbin.com/screens/ff0f7f67-6bd1-4538-a03d-2e0ab827ca9d",
  },
  {
    file: "smartthings-life.webp",
    app: "SmartThings",
    screen: "Life",
    note: "Сарлавҳа + изоҳ + иллюстрация карталари — visual richness варианти.",
    tags: ["title+desc", "illustration"],
    mobbinUrl: "https://mobbin.com/screens/259c02d9-d14f-4724-9683-d97bc176048c",
  },
  {
    file: "beli-features.webp",
    app: "Beli",
    screen: "Unlock features",
    note: "Feature карталари — икон + ном + изоҳ + амал тугма (Unlock/Level up).",
    tags: ["feature card", "action button"],
    mobbinUrl: "https://mobbin.com/screens/5d712f77-1d4e-41fe-b520-0e0241631aae",
  },
  {
    file: "naver-home.webp",
    app: "NAVER",
    screen: "Home",
    note: "Хизмат shortcut tile'лари — тоза икон + ёрлиқ, яшил акцент.",
    tags: ["shortcut tiles", "flat"],
    mobbinUrl: "https://mobbin.com/screens/5f9d470a-553e-4371-8cd7-2c26fb52915f",
  },
];

export default function ReferenslarPage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#eef2f7]">
      {/* Топ-бар */}
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
        <Link
          href="/dizayn/ijara"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Icon name="arrow-left" size={15} />
          Модулга кириш
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-[14px] font-bold text-slate-900">
            Референс дизайнлар — модулга кириш карталари
          </h1>
          <p className="truncate text-[11.5px] text-slate-500">
            Mobbin'дан танланган «action card» намуналари · {REFS.length} та
          </p>
        </div>
        <span className="ml-auto hidden items-center gap-1.5 rounded-lg border border-navy/20 bg-navy/[0.06] px-2.5 py-1.5 text-[12px] font-semibold text-navy sm:inline-flex">
          <Icon name="layers" size={14} variant="Bold" />
          Mobbin
        </span>
      </header>

      <div className="flex-1 overflow-auto px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          {/* Intro */}
          <div className="mb-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-28px_rgba(15,23,42,0.4)] sm:p-7">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/10 px-3 py-1 text-[11px] font-semibold text-navy">
              <Icon name="home" size={13} variant="Bold" />
              Модулга кириш · action card
            </span>
            <h2 className="mt-3 text-[20px] font-bold leading-tight text-slate-900 sm:text-[23px]">
              Бизнинг «Сўровнома / Шартнома» карталари нимага асосланган
            </h2>
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-slate-600">
              Қуйида — модулга кириш карталари (амал танлаш) учун Mobbin'дан танлаб олинган намуналар.
              Биз ушбу намуналардан <b className="font-semibold text-slate-800">тоза (флат) оқ карта</b>,{" "}
              <b className="font-semibold text-slate-800">тинтли иконка tile</b>,{" "}
              <b className="font-semibold text-slate-800">сарлавҳа + изоҳ + chevron</b> ва пастда{" "}
              <b className="font-semibold text-slate-800">count pill</b> тузилмасини олдик — gradient'сиз.
              Ҳар картани Mobbin'да очиш мумкин.
            </p>
          </div>

          {/* Галерея */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REFS.map((r, i) => (
              <a
                key={r.file}
                href={r.mobbinUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-layered-sm transition-shadow hover:shadow-layered"
              >
                <div className="relative border-b border-slate-100 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/references/mobbin/${r.file}`}
                    alt={`${r.app} — ${r.screen}`}
                    loading={i < 6 ? "eager" : "lazy"}
                    className="h-auto w-full"
                  />
                  <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1 text-[10.5px] font-bold text-white backdrop-blur-sm">
                    {r.app}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-[13.5px] font-bold text-slate-900">{r.screen}</h3>
                    <span className="inline-flex shrink-0 items-center gap-0.5 text-[11px] font-semibold text-navy opacity-0 transition-opacity group-hover:opacity-100">
                      Mobbin
                      <Icon name="chevron-forward" size={13} />
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-600">{r.note}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-8 text-center text-[11px] text-slate-400">
            Манба: Mobbin (curated). Расмлар фақат референс мақсадида.
          </p>
        </div>
      </div>
    </div>
  );
}
