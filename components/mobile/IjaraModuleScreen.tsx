"use client";

/**
 * IjaraModuleScreen — «Томорқа ижараси» модулига кириш экрани.
 *
 * Услуб: тоза iOS-native (Settings / Health / Wallet) — катта сарлавҳа (large title),
 * iOS қидирув майдони, gradient app-icon кvadратчали тоза амал карталари. Расм йўқ.
 * UX содда: кириш фақат «нима қилмоқчисиз?» — 2 та амал (Сўровнома асосий, Шартнома).
 *
 * layout="phone" — бир устун; layout="tablet" — марказлашган тор устун.
 */

import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { moduleCounts, MFY_NAME } from "@/lib/ijara-module-data";

const ACCENT = "#0a84ff"; // iOS systemBlue — асосий CTA / актив таб
const BG = "#f2f2f7"; // iOS systemGroupedBackground
const SF = '-apple-system, "SF Pro Display", "SF Pro Text", system-ui, sans-serif';

const GRAD = {
  blue: "linear-gradient(160deg,#3aa0ff,#0a6ff0)",
  indigo: "linear-gradient(160deg,#6d6af5,#4b49d6)",
} as const;

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
          {/* ── Large title (iOS nav) ────────────────────────────────────── */}
          <header className="flex items-start justify-between gap-3 pt-3">
            <div className="min-w-0">
              <h1 className="text-[33px] font-bold leading-[1.05] tracking-[-0.022em] text-[#1d1d1f]">
                Томорқа ижараси
              </h1>
              <p className="mt-1.5 truncate text-[14px] font-medium text-[#86868b]">
                {MFY_NAME} · {c.total} оила
              </p>
            </div>
            <button
              type="button"
              aria-label="Билдиришномалар"
              className="relative mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1d1d1f] shadow-[0_2px_10px_-2px_rgba(15,23,42,0.16)] ring-1 ring-black/[0.04] transition-transform active:scale-95"
            >
              <Icon name="notifications" size={18} variant="Bold" />
              <span
                className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white"
                style={{ background: "#ff3b30" }}
              />
            </button>
          </header>

          {/* ── Қидирув (iOS) ───────────────────────────────────────────── */}
          <div className="mt-4 flex items-center gap-1.5 rounded-[11px] bg-[#e3e3e9] px-2.5 py-2">
            <Icon name="search" size={17} className="text-[#8e8e93]" />
            <span className="text-[16px] text-[#8e8e93]">Қидириш</span>
          </div>

          {/* ── Амаллар ──────────────────────────────────────────────────── */}
          <p className="mb-2.5 ml-1 mt-6 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-[#8e8e93]">
            Амаллар
          </p>

          {/* Сўровнома — асосий */}
          <ActionCard
            grad={GRAD.blue}
            icon="note"
            title="Сўровнома ўтказиш"
            subtitle={`${c.surveyPending} оила навбатда`}
            onClick={onOpenSurvey}
          />
          {/* Шартнома — иккинчи */}
          <ActionCard
            grad={GRAD.indigo}
            icon="document-text"
            title="Шартнома тузиш"
            subtitle={`${c.contractReady} оила тайёр`}
            onClick={onOpenContract}
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* ── iOS амал картаси (gradient app-icon + sarlavha + chevron/CTA) ───────── */
function ActionCard({
  grad,
  icon,
  title,
  subtitle,
  onClick,
}: {
  grad: string;
  icon: IconName;
  title: string;
  subtitle: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex w-full items-center gap-3.5 rounded-[20px] bg-white p-3.5 text-left shadow-[0_8px_22px_-16px_rgba(15,23,42,0.55)] ring-1 ring-black/[0.05] transition-transform active:scale-[0.985]"
    >
      <span
        className="inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[16px] text-white"
        style={{ background: grad, boxShadow: "0 8px 18px -8px rgba(43,90,230,0.55)" }}
      >
        <Icon name={icon} size={26} variant="Bold" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[17px] font-semibold leading-tight tracking-[-0.01em] text-[#1d1d1f]">
          {title}
        </span>
        <span className="mt-1 block text-[13.5px] font-medium text-[#8e8e93]">{subtitle}</span>
      </span>
      <Icon name="chevron-forward" size={18} className="shrink-0 text-[#c4c4cc]" variant="Bold" />
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
