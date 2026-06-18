"use client";

/**
 * IjaraModuleScreen — «Томорқа ижараси» модулига кириш экрани.
 *
 * Услуб: Apple App Store (ёруғ режим), лекин UX содда — кириш экрани фақат
 * «нима қилмоқчисиз?» саволига жавоб беради: 2 та асосий амал. Ортиқча статистика
 * йўқ (у рўйхат/ҳисобот экранларида). Masthead + қидирув + рамли featured карта
 * (Сўровнома, real Higgsfield «томорқа» фото) + Шартнома карта + iOS таб-бар.
 *
 * layout="phone" — бир устун; layout="tablet" — марказлашган тор устун.
 */

import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { moduleCounts, MFY_NAME } from "@/lib/ijara-module-data";

const ACCENT = "#2b8cee"; // App Store кўк — асосий CTA / актив таб
const INDIGO = "#5b58e0"; // шартнома акценти
const BG = "#f2f2f7"; // iOS systemGroupedBackground
const SF = '-apple-system, "SF Pro Display", "SF Pro Text", system-ui, sans-serif';

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
}: IjaraModuleScreenProps) {
  const isTablet = layout === "tablet";
  const c = moduleCounts();

  return (
    <div
      className="relative flex flex-1 flex-col text-[#1d1d1f]"
      style={{ background: BG, fontFamily: SF }}
    >
      <LightStatusBar />

      <div className={`flex-1 overflow-auto pb-4 ${isTablet ? "px-6" : "px-5"}`}>
        <div className={isTablet ? "mx-auto max-w-[420px]" : ""}>
          {/* ── Masthead ─────────────────────────────────────────────────── */}
          <header className="flex items-end justify-between gap-3 pt-2">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#86868b]">
                Ижтимоий реестр
              </p>
              <h1 className="mt-0.5 text-[30px] font-extrabold leading-[1.04] tracking-[-0.02em] text-[#1d1d1f]">
                Томорқа ижараси
              </h1>
              <p className="mt-1 truncate text-[13px] font-medium text-[#86868b]">
                {MFY_NAME} · {c.total} оила
              </p>
            </div>
            <button
              type="button"
              aria-label="Билдиришномалар"
              className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1d1d1f] shadow-[0_2px_10px_-2px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04] transition-transform active:scale-95"
            >
              <Icon name="notifications" size={19} variant="Bold" />
              <span
                className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white"
                style={{ background: "#ff453a" }}
              />
            </button>
          </header>

          {/* ── Қидирув ─────────────────────────────────────────────────── */}
          <div className="mt-4 flex items-center gap-2 rounded-[13px] bg-[#e6e6eb] px-3.5 py-2.5">
            <Icon name="search" size={17} className="text-[#86868b]" />
            <span className="text-[15px] text-[#86868b]">Оила, ЖШШИР қидириш</span>
          </div>

          {/* ── Асосий амал — Сўровнома (рамли featured карта) ───────────── */}
          <FeaturedCard
            title="Сўровнома ўтказиш"
            subtitle={`${c.surveyPending} оила навбатда`}
            cta="Бошлаш"
            icon="note"
            onClick={onOpenSurvey}
          />

          {/* ── Иккинчи амал — Шартнома (содда карта) ─────────────────────── */}
          <ContractCard count={c.contractReady} onClick={onOpenContract} />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* ── Featured карта — рамли hero + шаффоф info-panel ─────────────────────── */
function FeaturedCard({
  title,
  subtitle,
  cta,
  icon,
  onClick,
}: {
  title: string;
  subtitle: string;
  cta: string;
  icon: IconName;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mt-5 block h-[216px] w-full overflow-hidden rounded-[26px] text-left shadow-[0_18px_40px_-20px_rgba(15,23,42,0.5)] ring-1 ring-black/[0.04] transition-transform active:scale-[0.985]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ijara/tomorqa-hero.webp"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* пастки қоронғулаштириш — матн ўқилиши учун */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

      {/* Glass info-panel */}
      <span className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-2.5 rounded-[19px] border border-white/50 bg-white/70 px-2.5 py-2.5 backdrop-blur-xl">
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] text-white shadow-[0_6px_14px_-4px_rgba(43,140,238,0.7)]"
          style={{ background: ACCENT }}
        >
          <Icon name={icon} size={19} variant="Bold" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold leading-tight tracking-[-0.01em] text-[#1d1d1f]">
            {title}
          </span>
          <span className="mt-0.5 block truncate text-[12.5px] font-medium text-[#5b5b60]">
            {subtitle}
          </span>
        </span>
        <span
          className="inline-flex shrink-0 items-center rounded-full px-3.5 py-2 text-[12.5px] font-bold text-white shadow-[0_6px_14px_-5px_rgba(43,140,238,0.8)]"
          style={{ background: ACCENT }}
        >
          {cta}
        </span>
      </span>
    </button>
  );
}

/* ── Шартнома — содда тўлиқ-кенглик картаси ─────────────────────────────── */
function ContractCard({ count, onClick }: { count: number; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3.5 flex w-full items-center gap-3.5 rounded-[22px] bg-white px-4 py-4 text-left shadow-[0_10px_26px_-18px_rgba(15,23,42,0.5)] ring-1 ring-black/[0.05] transition-transform active:scale-[0.99]"
    >
      <span
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] text-white shadow-[0_6px_14px_-5px_rgba(91,88,224,0.8)]"
        style={{ background: INDIGO }}
      >
        <Icon name="document-text" size={22} variant="Bold" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-bold leading-tight tracking-[-0.01em] text-[#1d1d1f]">
          Шартнома тузиш
        </span>
        <span className="mt-0.5 block text-[13px] font-medium text-[#86868b]">
          {count} оила тайёр
        </span>
      </span>
      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/[0.05] text-[#86868b]">
        <Icon name="chevron-forward" size={14} variant="Bold" />
      </span>
    </button>
  );
}

/* ── Пастки навигация (iOS таб-бар) ─────────────────────────────────────── */
function BottomNav() {
  const tabs: { icon: IconName; label: string; active?: boolean }[] = [
    { icon: "home", label: "Бош", active: true },
    { icon: "note", label: "Сўровнома" },
    { icon: "document-text", label: "Шартнома" },
    { icon: "profile", label: "Профил" },
  ];
  return (
    <div className="shrink-0 border-t border-black/[0.07] bg-white/85 px-2 pb-5 pt-2 backdrop-blur-xl">
      <div className="flex items-stretch justify-around">
        {tabs.map((t) => (
          <button
            key={t.label}
            type="button"
            aria-label={t.label}
            aria-current={t.active ? "page" : undefined}
            className="flex min-w-0 flex-1 flex-col items-center gap-1 py-0.5"
            style={{ color: t.active ? ACCENT : "#9a9aa0" }}
          >
            <Icon name={t.icon} size={23} variant={t.active ? "Bold" : "Linear"} />
            <span className="text-[10px] font-semibold leading-none tracking-tight">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Ёруғ статус-бар ─────────────────────────────────────────────────────── */
function LightStatusBar({ time = "09:41" }: { time?: string }) {
  return (
    <div
      className="flex shrink-0 select-none items-center justify-between px-5 pb-0.5 pt-2 text-[#1d1d1f]"
      style={{ background: BG }}
    >
      <span className="text-[12px] font-semibold tabular-nums tracking-wide">{time}</span>
      <div className="flex items-center gap-1.5 text-[#1d1d1f]">
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
          <span className="relative flex h-[11px] w-[21px] items-center rounded-[3px] border border-[#1d1d1f]/40 px-[1.5px]">
            <span className="block h-[6px] w-[14px] rounded-[1px] bg-[#1d1d1f]" />
          </span>
          <span className="block h-[4px] w-[1.5px] rounded-r-sm bg-[#1d1d1f]/40" />
        </span>
      </div>
    </div>
  );
}
