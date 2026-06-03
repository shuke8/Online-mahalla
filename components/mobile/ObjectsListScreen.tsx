"use client";

/**
 * ObjectsListScreen — мобил илова: инфратузилма обектлари рўйхати экрани.
 * Material top app bar + қидирув + филтр чиплар + обект карталари + empty state.
 * Экран device frame ичида: flex flex-col h-full (app bar shrink-0 / content flex-1 scroll).
 * Contract — O'ZGARTIRMANG:
 */

import { useMemo, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { infraObjects } from "@/lib/mock-data";
import type { InfraObject } from "@/lib/mock-data";
import { AppBar, PressCard, MobileStyles, SearchField } from "@/components/mobile/material";
import type { DalolatnomaStatus } from "@/lib/mock-data";

export interface ObjectsListScreenProps {
  /** karta bosilganda obyekt id si */
  onOpenObject?: (id: string) => void;
  /** ro'yxatda tanlangan (active) obyekt id si — preview sync uchun */
  activeId?: string;
  /** "Ҳужжатни кўриш" босилганда — тугалланган далолатнома ҳужжати */
  onViewDocument?: (id: string, actType: "interim" | "final") => void;
  /** макет: телефон (бир устун) ёки планшет (3 устунли grid) */
  layout?: "phone" | "tablet";
}

type FilterKey = "all" | "interimPending" | "finalPending" | "completed";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Барчаси" },
  { key: "interimPending", label: "Оралиқ кутилмоқда" },
  { key: "finalPending", label: "Якуний кутилмоқда" },
  { key: "completed", label: "Тугалланган" },
];

function matchesFilter(o: InfraObject, filter: FilterKey): boolean {
  switch (filter) {
    case "interimPending":
      return o.interim === "pending";
    case "finalPending":
      return o.final === "pending";
    case "completed":
      return o.interim === "done" && o.final === "done";
    default:
      return true;
  }
}

export default function ObjectsListScreen({
  onOpenObject,
  activeId,
  onViewDocument,
  layout = "phone",
}: ObjectsListScreenProps) {
  const isTablet = layout === "tablet";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return infraObjects.filter((o) => {
      if (!matchesFilter(o, filter)) return false;
      if (!q) return true;
      return (
        o.shortName.toLowerCase().includes(q) ||
        o.objectCode.toLowerCase().includes(q) ||
        o.objectId.toLowerCase().includes(q) ||
        o.mfyName.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  return (
    <div className="flex flex-1 flex-col bg-[#f4f7fb]">
      <MobileStyles />

      <AppBar
        title="Инфратузилма обектлари"
        subtitle={`${infraObjects.length} та обект · ${infraObjects[0]?.mfyName ?? ""}`}
        trailing={
          <button
            type="button"
            aria-label="Меню"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/95 transition-colors hover:bg-white/15 active:scale-[0.94]"
          >
            <Icon name="grid" size={20} />
          </button>
        }
      />

      {/* Қидирув + филтр — навбатдаги app bar остидаги зона (navy fon давом этади) */}
      <div className={`shrink-0 bg-navy pb-3 pt-0.5 ${isTablet ? "px-6" : "px-3"}`}>
        {/* Планшет — қидирув + чиплар бир кенг қаторда; телефон — стек */}
        <div className={isTablet ? "flex items-center gap-3" : ""}>
          {/* Material қидирув — ModulesScreen билан бир хил (умумий SearchField) */}
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Обект номи ёки коди бўйича қидириш"
            ariaLabel="Обектларни қидириш"
            className={isTablet ? "w-full max-w-md shrink-0" : ""}
          />

          {/* Material filter chips — телефонда горизонтал scroll, планшетда қаторга wrap */}
          <div
            className={
              isTablet
                ? "flex min-w-0 flex-1 flex-wrap items-center gap-2"
                : "mobile-no-scrollbar -mx-3 mt-2.5 flex gap-2 overflow-x-auto px-3 pb-0.5"
            }
          >
            {FILTERS.map((f) => {
              const selected = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={selected}
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all active:scale-[0.96] ${
                    selected
                      ? "bg-white text-navy shadow-[0_2px_6px_rgba(15,23,42,0.18)]"
                      : "bg-white/15 text-white hover:bg-white/25"
                  }`}
                >
                  {selected && <Icon name="tick-circle" size={13} variant="Bold" />}
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content — рўйхат тўлиқ кўринади (frame вертикал чўзилади) */}
      <div className={`flex-1 py-3 ${isTablet ? "px-6" : "px-3"}`}>
        {filtered.length === 0 ? (
          <EmptyState onReset={() => { setQuery(""); setFilter("all"); }} />
        ) : (
          <>
            <p className="mb-2 px-1 text-[11.5px] font-medium text-text-secondary">
              {filtered.length} та обект топилди
            </p>
            <ul className={isTablet ? "grid grid-cols-3 gap-3" : "flex flex-col gap-2.5"}>
              {filtered.map((o) => (
                <li key={o.id} className={isTablet ? "flex" : ""}>
                  <ObjectCard
                    object={o}
                    active={o.id === activeId}
                    onClick={() => onOpenObject?.(o.id)}
                    onViewDocument={onViewDocument}
                  />
                </li>
              ))}
            </ul>
            {/* Гест-бар учун пастда нафас */}
            <div className="h-3" />
          </>
        )}
      </div>
    </div>
  );
}

/* ── Обект картаси ─────────────────────────────────────────────────────── */
function ObjectCard({
  object: o,
  active,
  onClick,
  onViewDocument,
}: {
  object: InfraObject;
  active?: boolean;
  onClick?: () => void;
  onViewDocument?: (id: string, actType: "interim" | "final") => void;
}) {
  const hasDoc = o.interim === "done" || o.final === "done";
  const docAct: "interim" | "final" = o.final === "done" ? "final" : "interim";
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-layered-sm transition-all hover:shadow-layered ${
        active ? "border-navy/40 bg-navy-lighter/40 ring-2 ring-navy/25" : "border-border-light"
      }`}
    >
      {/* Ҳужжат ёрлиғи — фақат тайёр бўлса, PressCard'дан ташқари (nested button йўқ) */}
      {hasDoc && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDocument?.(o.id, docAct);
          }}
          aria-label="Тайёр далолатнома ҳужжатини кўриш"
          title="Ҳужжатни кўриш"
          className="absolute right-2.5 top-2.5 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-navy/20 bg-white text-navy shadow-sm transition-colors hover:bg-navy hover:text-white active:scale-95"
        >
          <Icon name="document-text" size={15} variant="Bold" />
        </button>
      )}

      <PressCard onClick={onClick} className="h-full rounded-none">
        <div className="flex h-full flex-col p-3.5">
          {/* Сарлавҳа + жойлашув */}
          <div className={`flex items-start gap-3 ${hasDoc ? "pr-8" : ""}`}>
            <span
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                active ? "bg-navy text-white" : "bg-navy/[0.08] text-navy"
              }`}
            >
              <Icon name="business" size={19} variant="Bold" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-[13.5px] font-bold leading-snug text-text-primary">
                {o.shortName}
              </h3>
              {/* Фақат сарфланган маблағ — далолатнома формасидан */}
              {o.sarflanganMablag > 0 ? (
                <p className="mt-1 text-[12.5px] font-semibold tabular-nums text-text-primary">
                  {formatMablag(o.sarflanganMablag)}
                </p>
              ) : (
                <p className="mt-1 text-[11.5px] text-text-secondary/70">Маблағ киритилмаган</p>
              )}
            </div>
          </div>

          {/* Ҳолат — ихчам (Оралиқ / Якуний) + №ID */}
          <div className="mt-auto flex items-center gap-1.5 pt-3">
            <ActStatus label="Оралиқ" status={o.interim} />
            <ActStatus label="Якуний" status={o.final} />
            <span className="ml-auto shrink-0 text-[10px] font-medium tabular-nums text-text-secondary/70">
              №{o.objectId}
            </span>
          </div>
        </div>
      </PressCard>
    </div>
  );
}

/** Минг ажратгич — пробел билан (форма билан бир хил, hydration-safe). */
function spaceThousands(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** Сарфланган маблағни ихчам формат: 412000000 → "412 млн сўм", 1.2e9 → "1.2 млрд сўм". */
function formatMablag(sum: number): string {
  if (sum <= 0) return "";
  if (sum >= 1_000_000_000) return `${Math.round(sum / 100_000_000) / 10} млрд сўм`;
  if (sum >= 1_000_000) return `${Math.round(sum / 100_000) / 10} млн сўм`;
  return `${spaceThousands(sum)} сўм`;
}

/** Ихчам акт ҳолати — иконка + битта сўз (Оралиқ/Якуний). */
function ActStatus({ label, status }: { label: string; status: DalolatnomaStatus }) {
  const done = status === "done";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
        done ? "bg-success/10 text-success" : "bg-warning/10 text-[#b45309]"
      }`}
    >
      <Icon name={done ? "tick-circle" : "time"} size={12} variant="Bold" />
      {label}
    </span>
  );
}

/* ── Empty state ───────────────────────────────────────────────────────── */
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-navy/[0.07] text-navy">
        <Icon name="search" size={30} />
      </span>
      <p className="text-[15px] font-bold text-text-primary">Обект топилмади</p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-text-secondary">
        Қидирув ёки филтрга мос обект йўқ. Шартларни ўзгартириб кўринг.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-navy px-5 text-[13px] font-semibold text-white shadow-[0_4px_12px_rgba(43,140,238,0.3)] transition-all hover:bg-navy-light active:scale-[0.97]"
      >
        <Icon name="close-circle" size={15} variant="Bold" />
        Тозалаш
      </button>
    </div>
  );
}
