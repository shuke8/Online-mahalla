"use client";

/**
 * IjaraModuleScreen — «Томорқа ижараси» модулига кириш экрани.
 *
 * Услуб: Apple App Store / Arcade (ёруғ режим) — editorial masthead, рамли
 * featured карта (real Higgsfield Soul Location «томорқа» фото + glass info-panel +
 * CTA), 2 устунли амал карталари ва ранг-баранг «Ҳолат бўйича» рейтинг плиткалари
 * (катта шаффоф рақам). SF-system шрифти. Фото: public/ijara/tomorqa-hero.webp.
 *
 * layout="phone" — бир устун; layout="tablet" — марказлашган тор устун.
 */

import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { moduleCounts, MFY_NAME } from "@/lib/ijara-module-data";

const ACCENT = "#2b8cee"; // App Store кўк — асосий CTA / актив таб
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
          {/* ── Masthead (App Store «Today» услуби) ─────────────────────── */}
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

          {/* ── Featured карта (рамли + glass panel) ─────────────────────── */}
          <SectionEyebrow label="Кунлик вазифа" />
          <FeaturedCard
            title="Сўровнома ўтказиш"
            subtitle={`${c.surveyPending} оила навбатда`}
            cta="Бошлаш"
            icon="note"
            onClick={onOpenSurvey}
          />

          {/* ── 2 устунли амаллар (Arcade плитка услуби) ─────────────────── */}
          <div className="mt-4 grid grid-cols-2 gap-3.5">
            <ActionTile
              tone="indigo"
              title="Шартнома тузиш"
              count={c.contractReady}
              countLabel="оила тайёр"
              icon="document-text"
              onClick={onOpenContract}
            />
            <ActionTile
              tone="white"
              title="Барча оилалар"
              count={c.total}
              countLabel="реестрда"
              icon="people"
            />
          </div>

          {/* ── Ҳолат бўйича — рейтинг плиткалари ────────────────────────── */}
          <SectionHeader title="Ҳолат бўйича" caption="Реестр статистикаси" />
          <div className="grid grid-cols-2 gap-3.5">
            <StatRankCard
              tone="amber"
              count={c.surveyPending}
              label="Сўровнома кутилмоқда"
              icon="time"
            />
            <StatRankCard
              tone="blue"
              count={c.contractReady}
              label="Ижарага рози"
              icon="user-tick"
            />
            <StatRankCard
              tone="green"
              count={c.contractDone}
              label="Шартнома тузилган"
              icon="tick-circle"
            />
            <StatRankCard
              tone="graphite"
              count={c.declined}
              label="Рад этилган"
              icon="close-circle"
            />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* ── Секция сарлавҳалари ───────────────────────────────────────────────── */
function SectionEyebrow({ label }: { label: string }) {
  return (
    <p className="mb-2 mt-6 text-[12px] font-bold uppercase tracking-[0.12em] text-[#86868b]">
      {label}
    </p>
  );
}

function SectionHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="mb-3 mt-7 flex items-end justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#86868b]">{caption}</p>
        <h2 className="mt-0.5 text-[22px] font-extrabold tracking-[-0.02em] text-[#1d1d1f]">
          {title}
        </h2>
      </div>
      <span className="mb-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.05] text-[#86868b]">
        <Icon name="chevron-forward" size={14} variant="Bold" />
      </span>
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
      className="group relative block h-[208px] w-full overflow-hidden rounded-[26px] text-left shadow-[0_18px_40px_-20px_rgba(15,23,42,0.5)] ring-1 ring-black/[0.04] transition-transform active:scale-[0.985]"
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

/* ── Амал плиткаси (2 устун) ────────────────────────────────────────────── */
function ActionTile({
  tone,
  title,
  count,
  countLabel,
  icon,
  onClick,
}: {
  tone: "indigo" | "white";
  title: string;
  count: number;
  countLabel: string;
  icon: IconName;
  onClick?: () => void;
}) {
  const indigo = tone === "indigo";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-[132px] flex-col overflow-hidden rounded-[22px] p-3.5 text-left transition-transform active:scale-[0.97] ${
        indigo
          ? "text-white shadow-[0_14px_30px_-16px_rgba(79,70,229,0.85)]"
          : "bg-white text-[#1d1d1f] shadow-[0_10px_26px_-18px_rgba(15,23,42,0.5)] ring-1 ring-black/[0.05]"
      }`}
      style={indigo ? { background: "linear-gradient(150deg,#6366f1,#4b49d6)" } : undefined}
    >
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-[13px] ${
          indigo ? "bg-white/20 text-white" : "text-white"
        }`}
        style={indigo ? undefined : { background: ACCENT }}
      >
        <Icon name={icon} size={20} variant="Bold" />
      </span>
      <span className="mt-auto block text-[15px] font-bold leading-tight tracking-[-0.01em]">
        {title}
      </span>
      <span className="mt-1 flex items-center gap-1.5">
        <span className={`text-[15px] font-extrabold tabular-nums ${indigo ? "text-white" : "text-[#1d1d1f]"}`}>
          {count}
        </span>
        <span className={`text-[12px] font-medium ${indigo ? "text-white/80" : "text-[#86868b]"}`}>
          {countLabel}
        </span>
      </span>
      <span
        className={`absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full ${
          indigo ? "bg-white/20 text-white" : "bg-black/[0.05] text-[#86868b]"
        }`}
      >
        <Icon name="chevron-forward" size={13} variant="Bold" />
      </span>
    </button>
  );
}

/* ── Ҳолат рейтинг плиткаси — катта шаффоф рақам ─────────────────────────── */
const RANK_TONE: Record<
  "amber" | "blue" | "green" | "graphite",
  { bg: string; shadow: string }
> = {
  amber: { bg: "linear-gradient(155deg,#ffae28,#fb7e0a)", shadow: "rgba(251,126,10,0.8)" },
  blue: { bg: "linear-gradient(155deg,#3aa0ff,#1b6fe6)", shadow: "rgba(27,111,230,0.8)" },
  green: { bg: "linear-gradient(155deg,#43cf6b,#23a049)", shadow: "rgba(35,160,73,0.8)" },
  graphite: { bg: "linear-gradient(155deg,#9aa0a9,#62686f)", shadow: "rgba(98,104,111,0.75)" },
};

function StatRankCard({
  tone,
  count,
  label,
  icon,
}: {
  tone: "amber" | "blue" | "green" | "graphite";
  count: number;
  label: string;
  icon: IconName;
}) {
  const t = RANK_TONE[tone];
  return (
    <button
      type="button"
      className="relative flex h-[124px] flex-col overflow-hidden rounded-[22px] p-3.5 text-left text-white transition-transform active:scale-[0.97]"
      style={{ background: t.bg, boxShadow: `0 14px 30px -18px ${t.shadow}` }}
    >
      {/* катта шаффоф рақам (фон) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-3 right-1 select-none text-[80px] font-black leading-none tabular-nums text-white/[0.22]"
      >
        {count}
      </span>

      <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/22 text-white backdrop-blur-sm">
        <Icon name={icon} size={18} variant="Bold" />
      </span>

      <span className="mt-auto block text-[13px] font-semibold leading-tight text-white">
        {label}
      </span>
      <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-white/22 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
        Кўриш
        <Icon name="chevron-forward" size={11} variant="Bold" />
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
