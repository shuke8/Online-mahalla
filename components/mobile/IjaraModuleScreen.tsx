"use client";

/**
 * IjaraModuleScreen — «Томорқа ижараси» модулига кириш экрани (calm/meditation
 * app услуби): ёруғ фон, soft-blue акцент, 2 та катта карта (қора + оқ) +
 * амал тугмаси, «Сўнгги фаолият» рўйхати, пастки навигация.
 *
 * layout="phone" — бир устун; layout="tablet" — марказлашган.
 */

import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { moduleCounts, MFY_NAME } from "@/lib/ijara-module-data";

const ACCENT = "#54c0e8"; // тугма/актив — soft cyan-blue
const ACCENT_SOFT = "#aaddf0"; // енгил кўк карта/пилл фони
const DARK = "#181b20"; // қора карта

export interface IjaraModuleScreenProps {
  layout: "phone" | "tablet";
  onOpenSurvey?: () => void;
  onOpenContract?: () => void;
  onBack?: () => void;
}

interface RecentItem {
  name: string;
  tag: string;
  when: string;
}

const RECENT: RecentItem[] = [
  { name: "Нематова Насиба Эргаш қизи", tag: "Шартнома", when: "Бугун" },
  { name: "Собиров Самад Собирович", tag: "Сўровнома", when: "Кеча" },
  { name: "Мансурова Мақсуда Шавкат қизи", tag: "Сўровнома", when: "3 кун олдин" },
];

export default function IjaraModuleScreen({
  layout,
  onOpenSurvey,
  onOpenContract,
}: IjaraModuleScreenProps) {
  const isTablet = layout === "tablet";
  const c = moduleCounts();

  return (
    <div className="relative flex flex-1 flex-col bg-[#f4f5f7]">
      <LightStatusBar />

      {/* Header — салом + билдиришнома */}
      <header className="flex shrink-0 items-start gap-2 px-5 pb-1 pt-2">
        <div className="min-w-0 flex-1">
          <h1 className="text-[25px] font-extrabold leading-none tracking-tight text-slate-900">
            Ассалому алейкум{" "}
            <span aria-hidden role="img">
              👋
            </span>
          </h1>
          <p className="mt-1.5 truncate text-[12.5px] font-semibold text-slate-400">
            {MFY_NAME} · {c.total} оила
          </p>
        </div>
        <button
          type="button"
          aria-label="Билдиришномалар"
          className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: DARK }}
        >
          <Icon name="notifications" size={20} variant="Bold" />
          <span
            className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2"
            style={{ background: ACCENT, borderColor: DARK }}
          />
        </button>
      </header>

      <div className={`flex-1 overflow-auto pb-3 ${isTablet ? "px-7" : "px-5"}`}>
        <div className={isTablet ? "mx-auto max-w-xl" : ""}>
          {/* Қидирув */}
          <div className="mt-3.5 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3.5 shadow-[0_6px_18px_-8px_rgba(15,23,42,0.18)]">
            <Icon name="search" size={19} className="text-slate-400" />
            <span className="text-[14px] text-slate-400">Оила, ЖШШИР қидириш…</span>
          </div>

          {/* 2 та катта амал картаси */}
          <div className="mt-4 grid grid-cols-2 gap-3.5">
            <BigCard
              variant="dark"
              title="Сўровнома ўтказиш"
              count={c.surveyPending}
              countLabel="кутмоқда"
              pillIcon="time"
              onClick={onOpenSurvey}
            />
            <BigCard
              variant="light"
              title="Шартнома тузиш"
              count={c.contractReady}
              countLabel="тайёр"
              pillIcon="tick-circle"
              onClick={onOpenContract}
            />
          </div>

          {/* Сўнгги фаолият */}
          <div className="mb-3 mt-6 flex items-center justify-between">
            <h2 className="text-[19px] font-extrabold tracking-tight text-slate-900">Сўнгги фаолият</h2>
            <button type="button" className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-400">
              Барчаси
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-200/70 text-slate-500">
                <Icon name="chevron-forward" size={12} variant="Bold" />
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {RECENT.map((r, i) => (
              <RecentCard key={r.name} item={r} blue={i === 0} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* ── Катта амал картаси (қора/оқ) ─────────────────────────────────────────── */
function BigCard({
  variant,
  title,
  count,
  countLabel,
  pillIcon,
  onClick,
}: {
  variant: "dark" | "light";
  title: string;
  count: number;
  countLabel: string;
  pillIcon: IconName;
  onClick?: () => void;
}) {
  const dark = variant === "dark";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[186px] flex-col rounded-[26px] p-4 text-left transition-transform active:scale-[0.98] ${
        dark
          ? "bg-[#181b20] shadow-[0_14px_30px_-16px_rgba(15,23,42,0.7)]"
          : "border border-slate-200/80 bg-white shadow-[0_10px_26px_-16px_rgba(15,23,42,0.4)]"
      }`}
    >
      <h3
        className={`text-[19px] font-extrabold leading-tight tracking-tight ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h3>
      <div className="mt-auto flex items-center justify-between gap-2">
        <span
          title={`${count} ${countLabel}`}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-bold ${
            dark ? "bg-white/[0.12] text-white/90" : "bg-slate-100 text-slate-600"
          }`}
        >
          <Icon name={pillIcon} size={13} variant="Bold" />
          <span className="tabular-nums">{count}</span>
        </span>
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-[0_6px_14px_-4px_rgba(84,192,232,0.7)]"
          style={{ background: ACCENT }}
        >
          <Icon name="chevron-forward" size={18} variant="Bold" />
        </span>
      </div>
    </button>
  );
}

/* ── Сўнгги фаолият картаси (кўк/оқ) ──────────────────────────────────────── */
function RecentCard({ item, blue }: { item: RecentItem; blue?: boolean }) {
  return (
    <button
      type="button"
      className={`flex items-center gap-3 rounded-[22px] p-3.5 text-left transition-transform active:scale-[0.99] ${
        blue ? "" : "border border-slate-200/80 bg-white"
      }`}
      style={blue ? { background: ACCENT_SOFT } : undefined}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] font-bold text-slate-900">{item.name}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Tag onBlue={blue}>{item.tag}</Tag>
          <Tag onBlue={blue}>{item.when}</Tag>
        </div>
      </div>
      <span
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
        style={{ background: blue ? "#ffffff" : ACCENT }}
      >
        <Icon
          name="chevron-forward"
          size={20}
          variant="Bold"
          className={blue ? "text-slate-900" : "text-white"}
        />
      </span>
    </button>
  );
}

function Tag({ children, onBlue }: { children: React.ReactNode; onBlue?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        onBlue ? "bg-white/80 text-slate-700" : "bg-slate-100 text-slate-500"
      }`}
    >
      {children}
    </span>
  );
}

/* ── Пастки навигация ────────────────────────────────────────────────────── */
function BottomNav() {
  const tabs: { icon: IconName; label: string; active?: boolean }[] = [
    { icon: "home", label: "Бош", active: true },
    { icon: "note", label: "Сўровнома" },
    { icon: "document-text", label: "Шартнома" },
    { icon: "profile", label: "Профил" },
  ];
  return (
    <div className="shrink-0 border-t border-slate-200/70 bg-white px-3 pb-5 pt-2.5">
      <div className="flex items-center justify-around">
        {tabs.map((t) =>
          t.active ? (
            <span
              key={t.label}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-bold text-slate-900"
              style={{ background: ACCENT_SOFT }}
            >
              <Icon name={t.icon} size={18} variant="Bold" />
              {t.label}
            </span>
          ) : (
            <button
              key={t.label}
              type="button"
              aria-label={t.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-slate-600"
            >
              <Icon name={t.icon} size={21} variant="Bold" />
            </button>
          ),
        )}
      </div>
    </div>
  );
}

/* ── Ёруғ статус-бар ─────────────────────────────────────────────────────── */
function LightStatusBar({ time = "09:41" }: { time?: string }) {
  return (
    <div className="flex shrink-0 select-none items-center justify-between bg-[#f4f5f7] px-5 pb-0.5 pt-1.5 text-slate-900">
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
