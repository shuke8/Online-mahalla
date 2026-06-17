"use client";

/**
 * IjaraModuleScreen — «Томорқа ижараси» модулига кириш экрани (Fi app услуби).
 * Йирик сарлавҳа + катта статистика hero (ҳолат тақсимоти бар) + «Бугун» бўлими
 * 2 оқим картаси (Сўровнома / Шартнома) + «Сўнгги фаолият» рўйхати.
 * Ёруғ фон, тоза оқ карталар, яшил акцент.
 *
 * layout="phone" — бир устун; layout="tablet" — марказлашган, кенгроқ.
 */

import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import {
  ijaraFamilies,
  moduleCounts,
  STATUS_META,
  type FamilyStatus,
  type StatusTone,
} from "@/lib/ijara-module-data";

const GREEN = "#16a34a";
const SAMPLE_DATE = "Чоршанба, 17 июнь";

const TONE_HEX: Record<StatusTone, string> = {
  warning: "#f59e0b",
  muted: "#94a3b8",
  navy: "#2b8cee",
  success: "#16a34a",
};

const STATUS_ORDER: FamilyStatus[] = [
  "survey_pending",
  "declined",
  "contract_pending",
  "contract_done",
];

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

  const byStatus = (s: FamilyStatus) => ijaraFamilies.filter((f) => f.status === s).length;
  const segments = STATUS_ORDER.map((s) => ({ status: s, count: byStatus(s), meta: STATUS_META[s] }));

  return (
    <div className="relative flex flex-1 flex-col bg-[#f1f2f4]">
      <LightStatusBar />

      {/* Header (Fi услуби) */}
      <header className="flex shrink-0 items-start gap-2 bg-[#f1f2f4] px-4 pb-2 pt-2">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[22px] font-extrabold leading-none tracking-tight text-slate-900">
            Томорқа ижараси
          </h1>
          <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Ижтимоий реестр
          </p>
        </div>
        <HeaderIcon icon="notifications" />
      </header>

      {/* Body */}
      <div className={`flex-1 overflow-auto pb-5 ${isTablet ? "px-6" : "px-4"}`}>
        <div className={isTablet ? "mx-auto max-w-xl" : ""}>
          {/* ── СТАТИСТИКА hero (map ўрнига) ── */}
          <StatsHero total={c.total} segments={segments} contractDone={c.contractDone} />

          {/* ── «Бугун» + сана ── */}
          <div className="mb-2.5 mt-5 flex items-center justify-between">
            <h2 className="text-[19px] font-extrabold tracking-tight text-slate-900">Бугун</h2>
            <span className="text-[12.5px] font-semibold text-slate-400">{SAMPLE_DATE}</span>
          </div>

          {/* ── 2 оқим картаси (Rest/Activity ўрнига) ── */}
          <div className="grid grid-cols-2 gap-3">
            <FlowCard
              title="Сўровнома"
              label="Ўтказилди"
              done={c.total - c.surveyPending}
              total={c.total}
              unit="оила"
              accent="#2b8cee"
              onClick={onOpenSurvey}
            />
            <FlowCard
              title="Шартнома"
              label="Тузилди"
              done={c.contractDone}
              total={c.contractReady + c.contractDone}
              unit="рози оила"
              accent={GREEN}
              onClick={onOpenContract}
            />
          </div>

          {/* ── Сўнгги фаолият ── */}
          <div className="mb-2.5 mt-6 flex items-center justify-between">
            <h2 className="text-[18px] font-extrabold tracking-tight text-slate-900">Сўнгги фаолият</h2>
            <button type="button" className="inline-flex items-center gap-0.5 text-[13px] font-bold text-slate-700">
              Тарих
              <Icon name="chevron-forward" size={15} variant="Bold" />
            </button>
          </div>
          <RecentList />
        </div>
      </div>
    </div>
  );
}

/* ── Статистика hero (содда: жами + 4 ҳолат tile) ────────────────────────── */
const STAT_TILE_ORDER: FamilyStatus[] = [
  "survey_pending",
  "contract_pending",
  "contract_done",
  "declined",
];

function StatsHero({
  total,
  segments,
  contractDone,
}: {
  total: number;
  segments: { status: FamilyStatus; count: number; meta: (typeof STATUS_META)[FamilyStatus] }[];
  contractDone: number;
}) {
  const tiles = STAT_TILE_ORDER.map((s) => segments.find((x) => x.status === s)!);

  return (
    <div className="relative rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_8px_28px_-18px_rgba(15,23,42,0.45)]">
      <button
        type="button"
        aria-label="Янгилаш"
        className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform active:scale-90"
      >
        <Icon name="refresh" size={16} variant="Bold" />
      </button>

      {/* Катта жами */}
      <div className="flex items-end gap-2">
        <span className="text-[40px] font-extrabold leading-none tracking-tight text-slate-900">{total}</span>
        <span className="mb-1 max-w-[150px] text-[12.5px] font-semibold leading-tight text-slate-500">
          оила ижтимоий реестрда
        </span>
      </div>

      {/* 4 ҳолат — содда tile (амалга муҳтож → юқорида, ёпилган → пастда) */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {tiles.map((t) => {
          const color = TONE_HEX[t.meta.tone];
          return (
            <div
              key={t.status}
              className="flex flex-col rounded-2xl px-3.5 py-3"
              style={{ background: `${color}12` }}
            >
              <span className="text-[24px] font-extrabold leading-none tabular-nums" style={{ color }}>
                {t.count}
              </span>
              <span className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
                <span className="truncate">{t.meta.short}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Пастки pill — жорий ой натижаси */}
      <div className="mt-3 flex items-center gap-2 rounded-2xl bg-slate-50 px-3.5 py-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: `${GREEN}1a`, color: GREEN }}>
          <Icon name="tick-circle" size={17} variant="Bold" />
        </span>
        <p className="min-w-0 flex-1 text-[12.5px] font-semibold text-slate-700">
          Жорий ойда <span className="font-extrabold text-slate-900">{contractDone}</span> шартнома тузилди
        </p>
        <Icon name="chevron-forward" size={16} className="shrink-0 text-slate-400" />
      </div>
    </div>
  );
}

/* ── Оқим картаси (Сўровнома / Шартнома) — N оиладан нечтаси бажарилди ───── */
function FlowCard({
  title,
  label,
  done,
  total,
  unit,
  accent,
  onClick,
}: {
  title: string;
  label: string;
  done: number;
  total: number;
  unit: string;
  accent: string;
  onClick?: () => void;
}) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-[150px] flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-4 text-left shadow-[0_4px_14px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_8px_22px_rgba(15,23,42,0.1)] active:scale-[0.99]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-extrabold text-slate-900">{title}</h3>
        <Icon name="chevron-forward" size={17} className="text-slate-400" />
      </div>
      <p className="mt-2 text-[10.5px] font-bold uppercase tracking-wide text-slate-400">{label}</p>

      {/* N оиладан нечтаси */}
      <p className="mt-1 flex items-baseline gap-1">
        <span className="text-[26px] font-extrabold leading-none tabular-nums" style={{ color: accent }}>
          {done}
        </span>
        <span className="text-[15px] font-bold leading-none tabular-nums text-slate-400">/ {total}</span>
        <span className="ml-0.5 truncate text-[11px] font-semibold text-slate-400">{unit}</span>
      </p>

      {/* Progress bar (нисбатни кўрсатади) */}
      <div className="mt-auto">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full transition-[width]" style={{ width: `${pct}%`, background: accent }} />
        </div>
        <p className="mt-1.5 text-[10.5px] font-semibold text-slate-400">{pct}% бажарилди</p>
      </div>
    </button>
  );
}

/* ── Сўнгги фаолият рўйхати ──────────────────────────────────────────────── */
interface RecentItem {
  name: string;
  action: string;
  when: string;
  icon: IconName;
  tint: string;
}

const RECENT: RecentItem[] = [
  { name: "Турсунов Жасур Олим ўғли", action: "Шартнома тузилди", when: "бугун", icon: "tick-circle", tint: GREEN },
  { name: "Ғоибова Зулфизар Жаббор қизи", action: "Сўровнома ўтказилди", when: "кеча", icon: "note", tint: "#2b8cee" },
  { name: "Эргашева Нодира Аброр қизи", action: "Сўровнома ўтказилди", when: "3 кун олдин", icon: "note", tint: "#2b8cee" },
];

function RecentList() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.05)]">
      <div className="divide-y divide-slate-100">
        {RECENT.map((r) => (
          <div key={r.name} className="flex items-center gap-3 px-4 py-3.5">
            <span
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: `${r.tint}14`, color: r.tint }}
            >
              <Icon name={r.icon} size={19} variant="Bold" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-bold text-slate-900">{r.name}</p>
              <p className="truncate text-[11.5px] text-slate-500">
                {r.action} · {r.when}
              </p>
            </div>
            <Icon name="chevron-forward" size={16} className="shrink-0 text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Header иконка тугмаси ───────────────────────────────────────────────── */
function HeaderIcon({ icon }: { icon: IconName }) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-200/70 active:scale-95"
    >
      <Icon name={icon} size={21} variant="Bold" />
    </button>
  );
}

/* ── Ёруғ статус-бар ─────────────────────────────────────────────────────── */
function LightStatusBar({ time = "09:41" }: { time?: string }) {
  return (
    <div className="flex shrink-0 select-none items-center justify-between bg-[#f1f2f4] px-4 pb-0.5 pt-1.5 text-slate-900">
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
