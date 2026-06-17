"use client";

/**
 * IjaraModuleScreen — «Томорқа ижараси» модулига кириш экрани (NAVER app услуби).
 * Ёруғ фон, NAVER яшил (#03C75A) акцент, қидирув pill, яшил «service panel»да
 * 2 асосий амал + пастда тоза (флат) статистика tile'лари.
 *
 * layout="phone" — бир устун; layout="tablet" — марказлашган, кенгроқ padding.
 */

import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { moduleCounts } from "@/lib/ijara-module-data";

const GREEN = "#03C75A";
const GREEN_DARK = "#02b350";

export interface IjaraModuleScreenProps {
  layout: "phone" | "tablet";
  onOpenSurvey?: () => void;
  onOpenContract?: () => void;
  onBack?: () => void;
}

export default function IjaraModuleScreen({
  layout,
  onOpenSurvey,
  onOpenContract,
  onBack,
}: IjaraModuleScreenProps) {
  const isTablet = layout === "tablet";
  const c = moduleCounts();

  return (
    <div className="relative flex flex-1 flex-col bg-[#f3f4f6]">
      <LightStatusBar />

      {/* Ёруғ header (NAVER услуби) */}
      <header className="flex shrink-0 items-center gap-2.5 bg-white px-4 pb-3 pt-1">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Орқага"
            className="-ml-1.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 active:scale-95"
          >
            <Icon name="arrow-left" size={20} />
          </button>
        ) : (
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white"
            style={{ background: GREEN }}
          >
            <Icon name="tree" size={18} variant="Bold" />
          </span>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-bold leading-tight text-slate-900">Томорқа ижараси</h1>
          <p className="truncate text-[11px] leading-tight text-slate-500">Ижтимоий реестр</p>
        </div>
        <span
          className="ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-bold"
          style={{ background: `${GREEN}1a`, color: GREEN_DARK }}
        >
          <Icon name="shield-tick" size={12} variant="Bold" />
          Реестр
        </span>
      </header>

      {/* Body */}
      <div className={`flex-1 overflow-auto pb-5 pt-3.5 ${isTablet ? "px-6" : "px-3.5"}`}>
        <div className={isTablet ? "mx-auto max-w-xl" : ""}>
          {/* Қидирув pill */}
          <div className="flex items-center gap-2.5 rounded-full bg-white px-4 py-3 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
            <Icon name="search" size={19} style={{ color: GREEN }} />
            <span className="flex-1 truncate text-[13.5px] text-slate-400">Оила, ЖШШИР ёки манзил қидириш…</span>
            <Icon name="scan" size={18} variant="Bold" style={{ color: GREEN }} />
          </div>

          {/* Яшил service panel — 2 асосий амал */}
          <div
            className="mt-4 overflow-hidden rounded-3xl p-1.5 shadow-[0_10px_28px_-12px_rgba(3,199,90,0.6)]"
            style={{ background: `linear-gradient(160deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
          >
            <ServiceRow
              icon="note"
              title="Сўровнома ўтказиш"
              count={c.surveyPending}
              countLabel="оила кутилмоқда"
              onClick={onOpenSurvey}
            />
            <div className="mx-3 h-px bg-white/20" />
            <ServiceRow
              icon="document-text"
              title="Шартнома расмийлаштириш"
              count={c.contractReady}
              countLabel="оила тайёр"
              onClick={onOpenContract}
            />
          </div>

          {/* Статистика — тоза (флат) NAVER tile'лари */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <FeatureTile icon="people" tint="#2b8cee" value={c.total} label="Жами оила" sub="ижтимоий реестрда" />
            <FeatureTile icon="tick-circle" tint={GREEN} value={c.contractDone} label="Тузилган шартнома" sub="жорий йил" />
          </div>

          <p className="mt-5 text-center text-[10.5px] font-medium text-slate-400">
            Ижтимоий реестр · томорқа ижараси модули
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Яшил панелдаги амал қатори ──────────────────────────────────────────── */
function ServiceRow({
  icon,
  title,
  count,
  countLabel,
  onClick,
}: {
  icon: IconName;
  title: string;
  count: number;
  countLabel: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-[20px] px-3 py-3.5 text-left transition-colors hover:bg-white/10 active:scale-[0.99]"
    >
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
        <Icon name={icon} size={22} variant="Bold" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-bold leading-tight text-white">{title}</p>
        <p className="mt-0.5 truncate text-[11.5px] font-medium leading-tight text-white/80">
          <span className="font-bold tabular-nums">{count}</span> {countLabel}
        </p>
      </div>
      <Icon name="chevron-forward" size={18} variant="Bold" className="shrink-0 text-white/75" />
    </button>
  );
}

/* ── Статистика tile (NAVER флат) ────────────────────────────────────────── */
function FeatureTile({
  icon,
  tint,
  value,
  label,
  sub,
}: {
  icon: IconName;
  tint: string;
  value: number;
  label: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ background: `${tint}1a`, color: tint }}
      >
        <Icon name={icon} size={18} variant="Bold" />
      </span>
      <p className="mt-2.5 text-[24px] font-bold leading-none tabular-nums text-slate-900">{value}</p>
      <p className="mt-1.5 text-[12.5px] font-bold leading-tight text-slate-800">{label}</p>
      <p className="text-[10.5px] leading-tight text-slate-400">{sub}</p>
    </div>
  );
}

/* ── Ёруғ статус-бар (NAVER ёруғ мавзу) ──────────────────────────────────── */
function LightStatusBar({ time = "09:41" }: { time?: string }) {
  return (
    <div className="flex shrink-0 select-none items-center justify-between bg-white px-4 pb-0.5 pt-1.5 text-slate-900">
      <span className="text-[11px] font-semibold tabular-nums tracking-wide">{time}</span>
      <div className="flex items-center gap-1.5 text-slate-800">
        <svg width="15" height="11" viewBox="0 0 16 12" aria-hidden fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.6" fill="currentColor" />
          <rect x="4.3" y="5.5" width="3" height="6.5" rx="0.6" fill="currentColor" />
          <rect x="8.6" y="3" width="3" height="9" rx="0.6" fill="currentColor" />
          <rect x="12.9" y="0.5" width="3" height="11.5" rx="0.6" fill="currentColor" opacity="0.4" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 16 12" aria-hidden fill="none">
          <path d="M8 11.2 1.2 4.2a9.6 9.6 0 0 1 13.6 0L8 11.2Z" fill="currentColor" opacity="0.35" />
          <path d="M8 11.2 4.3 7.4a5.2 5.2 0 0 1 7.4 0L8 11.2Z" fill="currentColor" />
        </svg>
        <span className="flex items-center gap-0.5">
          <span className="relative flex h-[10px] w-[19px] items-center rounded-[3px] border border-slate-400 px-[1.5px]">
            <span className="block h-[5px] w-[12px] rounded-[1px] bg-slate-800" />
          </span>
          <span className="block h-[4px] w-[1.5px] rounded-r-sm bg-slate-400" />
        </span>
      </div>
    </div>
  );
}
