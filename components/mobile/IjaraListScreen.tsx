"use client";

/**
 * IjaraListScreen — «Томорқа ижараси» modulida oilalar ro'yxati.
 * mode="survey"   — so'rovnoma o'tkaziladigan oilalar (tab: Кутилмоқда / Ўтказилган)
 * mode="contract" — shartnoma tuziladigan oilalar (tab: Тайёр / Тузилган);
 *                   qidiruvда yaroqsiz oila ham chiqadi (disabled + sabab + сўровнома yo'li).
 *
 * Bitta reestrning filtrlangan ko'rinishi (SSOT — ijara-module-data).
 */

import { useMemo, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { AppBar, SearchField, PressCard, MobileStyles } from "@/components/mobile/material";
import { formatJshshir } from "@/lib/social-survey-data";
import {
  ijaraFamilies,
  surveyList,
  contractList,
  STATUS_META,
  type FamilyStatus,
  type IjaraFamily,
  type StatusTone,
} from "@/lib/ijara-module-data";

type Mode = "survey" | "contract";

export interface IjaraListScreenProps {
  layout: "phone" | "tablet";
  mode: Mode;
  /** preview учун бошланғич таб */
  initialTab?: string;
  /** preview учун бошланғич қидирув матни */
  initialQuery?: string;
  onBack?: () => void;
  onSelectFamily?: (family: IjaraFamily) => void;
  onSurveyFamily?: (family: IjaraFamily) => void;
}

const TABS: Record<Mode, { value: string; label: string }[]> = {
  survey: [
    { value: "pending", label: "Кутилмоқда" },
    { value: "done", label: "Ўтказилган" },
  ],
  contract: [
    { value: "ready", label: "Тайёр" },
    { value: "done", label: "Тузилган" },
  ],
};

const TITLE: Record<Mode, { title: string; icon: IconName }> = {
  survey: { title: "Сўровнома ўтказиш", icon: "note" },
  contract: { title: "Шартнома расмийлаштириш", icon: "document-text" },
};

export default function IjaraListScreen({
  layout,
  mode,
  initialTab,
  initialQuery,
  onBack,
  onSelectFamily,
  onSurveyFamily,
}: IjaraListScreenProps) {
  const isTablet = layout === "tablet";
  const tabs = TABS[mode];
  const [tab, setTab] = useState(initialTab ?? tabs[0].value);
  const [query, setQuery] = useState(initialQuery ?? "");
  const q = query.trim().toLowerCase();

  const baseList = useMemo(
    () => (mode === "survey" ? surveyList(tab as "pending" | "done") : contractList(tab as "ready" | "done")),
    [mode, tab],
  );

  const matches = (f: IjaraFamily) =>
    !q ||
    f.oilaBoshligiFio.toLowerCase().includes(q) ||
    f.jshshir.includes(q.replace(/\D/g, "")) ||
    f.manzil.toLowerCase().includes(q);

  const rows = useMemo(() => baseList.filter(matches), [baseList, q]);

  // Shartnoma rejimi + qidiruv: yaroqsiz oilalar (рад этилган / сўровнома кутмоқда) ham ko'rsatiladi.
  const ineligible = useMemo(() => {
    if (mode !== "contract" || !q) return [];
    return ijaraFamilies.filter(
      (f) => (f.status === "declined" || f.status === "survey_pending") && matches(f),
    );
  }, [mode, q]);

  const tabCount = (value: string) =>
    mode === "survey"
      ? surveyList(value as "pending" | "done").length
      : contractList(value as "ready" | "done").length;

  return (
    <div className="relative flex flex-1 flex-col bg-[#eef2f8]">
      <MobileStyles />

      <AppBar
        title={TITLE[mode].title}
        subtitle="Оилани танланг"
        onBack={onBack}
        trailing={
          <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold text-white">
            <Icon name={TITLE[mode].icon} size={12} variant="Bold" />
            {ijaraFamilies.length}
          </span>
        }
      />

      {/* Qidiruv + tab — navy band */}
      <div className={`shrink-0 bg-navy pb-3.5 pt-0.5 ${isTablet ? "px-6" : "px-3.5"}`}>
        <div className={isTablet ? "mx-auto max-w-2xl" : ""}>
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Ф.И.О., ЖШШИР ёки манзил…"
            ariaLabel="Оилаларни қидириш"
          />
          <div className="mt-3">
            <ListTabs tabs={tabs} value={tab} onChange={setTab} count={tabCount} />
          </div>
        </div>
      </div>

      {/* Ro'yxat */}
      <div className={`flex-1 overflow-auto rounded-t-3xl bg-[#eef2f8] pb-5 pt-3 ${isTablet ? "px-6" : "px-3.5"}`}>
        <div className={isTablet ? "mx-auto max-w-2xl" : ""}>
          {rows.length === 0 && ineligible.length === 0 ? (
            <EmptyState mode={mode} hasQuery={!!q} query={query} />
          ) : (
            <div className="flex flex-col gap-2.5">
              {rows.map((f) => (
                <FamilyRow key={f.id} family={f} onSelect={() => onSelectFamily?.(f)} />
              ))}

              {ineligible.length > 0 && (
                <>
                  <div className="mt-3 flex items-center gap-2 px-0.5">
                    <Icon name="warning" size={13} variant="Bold" className="text-text-secondary" />
                    <span className="text-[11.5px] font-semibold text-text-secondary">
                      Шартнома учун яроқсиз
                    </span>
                    <span className="h-px flex-1 bg-border-light" />
                  </div>
                  {ineligible.map((f) => (
                    <FamilyRow
                      key={f.id}
                      family={f}
                      disabled
                      onSurvey={f.status === "survey_pending" ? () => onSurveyFamily?.(f) : undefined}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Tab bar (label + count) ─────────────────────────────────────────────── */
function ListTabs({
  tabs,
  value,
  onChange,
  count,
}: {
  tabs: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  count: (v: string) => number;
}) {
  return (
    <div role="tablist" className="flex w-full gap-1 rounded-full border border-white/15 bg-white/10 p-1">
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.value)}
            className={`flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-full px-2 text-[12.5px] font-semibold transition-all active:scale-[0.98] ${
              active ? "bg-white text-navy shadow-sm" : "text-white/80 hover:bg-white/10"
            }`}
          >
            <span className="truncate">{t.label}</span>
            <span
              className={`inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10.5px] font-bold tabular-nums ${
                active ? "bg-navy/10 text-navy" : "bg-white/20 text-white"
              }`}
            >
              {count(t.value)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Oila qatori ─────────────────────────────────────────────────────────── */
function FamilyRow({
  family,
  disabled,
  onSelect,
  onSurvey,
}: {
  family: IjaraFamily;
  disabled?: boolean;
  onSelect?: () => void;
  onSurvey?: () => void;
}) {
  const initials = family.oilaBoshligiFio
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();

  const inner = (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-3 transition-shadow ${
        disabled
          ? "border-border-light bg-slate-50"
          : "border-border-light bg-white shadow-layered-sm hover:shadow-layered"
      }`}
    >
      <span
        className={`mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[13px] font-bold ${
          disabled ? "bg-slate-200 text-slate-500" : "bg-navy/[0.08] text-navy"
        }`}
      >
        {initials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className={`min-w-0 flex-1 truncate text-[13.5px] font-bold ${
              disabled ? "text-text-secondary" : "text-text-primary"
            }`}
          >
            {family.oilaBoshligiFio}
          </p>
          {!disabled && (
            <Icon name="chevron-forward" size={16} className="shrink-0 text-text-secondary/55" />
          )}
        </div>
        <p className="mt-0.5 truncate text-[11px] tabular-nums text-text-secondary">
          ЖШШИР: {formatJshshir(family.jshshir)}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="flex min-w-0 flex-1 items-center gap-1 truncate text-[11px] text-text-secondary">
            <Icon name="location" size={12} variant="Bold" className="shrink-0 text-text-secondary/70" />
            <span className="truncate">{family.manzil}</span>
          </span>
          <span className="shrink-0">
            <StatusBadge status={family.status} />
          </span>
        </div>
      </div>
    </div>
  );

  if (disabled) {
    return (
      <div className="overflow-hidden rounded-2xl">
        {inner}
        {onSurvey && (
          <button
            type="button"
            onClick={onSurvey}
            className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-navy/20 bg-navy/[0.06] px-3 py-1.5 text-[11.5px] font-semibold text-navy transition-colors hover:bg-navy/10 active:scale-[0.98]"
          >
            <Icon name="note" size={13} variant="Bold" />
            Аввал сўровнома ўтказиш
            <Icon name="chevron-forward" size={13} />
          </button>
        )}
      </div>
    );
  }

  return (
    <PressCard onClick={onSelect} className="rounded-2xl">
      {inner}
    </PressCard>
  );
}

/* ── Status badge (4 holat) ──────────────────────────────────────────────── */
const TONE_CLASS: Record<StatusTone, string> = {
  warning: "border-warning/30 bg-warning/10 text-[#b45309]",
  muted: "border-border-light bg-slate-100 text-text-secondary",
  navy: "border-navy/25 bg-navy/[0.08] text-navy",
  success: "border-success/25 bg-success/10 text-success",
};

function StatusBadge({ status }: { status: FamilyStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${TONE_CLASS[m.tone]}`}
    >
      <Icon name={m.icon} size={11} variant="Bold" />
      <span className="whitespace-nowrap">{m.short}</span>
    </span>
  );
}

/* ── Empty state ─────────────────────────────────────────────────────────── */
function EmptyState({ mode, hasQuery, query }: { mode: Mode; hasQuery: boolean; query: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
      <span className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-navy/[0.07] text-navy">
        <Icon name={hasQuery ? "search" : TITLE[mode].icon} size={28} variant="Bold" />
      </span>
      <p className="text-[14px] font-bold text-text-primary">
        {hasQuery ? "Оила топилмади" : "Рўйхат бўш"}
      </p>
      <p className="mt-1 text-[12px] text-text-secondary">
        {hasQuery ? `«${query}» бўйича натижа йўқ` : "Бу бўлимда ҳозирча оила йўқ"}
      </p>
    </div>
  );
}
