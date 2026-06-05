"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { GroupedBarChart } from "@/components/organisms/GroupedBarChart";
import { INFRA_PALETTE } from "@/components/organisms/infrastructure-palette";
import {
  getInfrastructureByLevel,
  type InfraLevel,
  type InfraLevelCategory,
} from "@/lib/mock-data";

const BREAKDOWN_TITLES: Record<InfraLevel, string> = {
  republic: "Вилоятлар бўйича таққослама",
  viloyat: "Туманлар бўйича таққослама",
  tuman: "Маҳаллалар бўйича таққослама",
};

// X o'qida qisqa nom: "Жиззах вилояти" → "Жиззах", "Арнасой тумани" → "Арнасой", "Янги ҳаёт МФЙ" → "Янги ҳаёт"
function shortName(name: string): string {
  return name.replace(/ (вилояти|тумани|МФЙ)$/u, "").replace(" Респ.", "");
}

function MiniRing({ pct, color }: { pct: number; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
      style={{ background: `conic-gradient(${color} ${pct}%, #e2e8f0 ${pct}% 100%)` }}
      role="img"
      aria-label={`${Math.round(pct)} фоиз`}
    >
      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
        <span className="text-[10px] font-extrabold text-text-primary tabular-nums">
          {Math.round(pct)}%
        </span>
      </div>
    </div>
  );
}

function KpiPill({
  label,
  value,
  ringPct,
  ringColor,
}: {
  label: string;
  value: string;
  ringPct?: number;
  ringColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-border-light/60 px-3.5 py-3 min-w-0">
      {ringPct !== undefined && ringColor && <MiniRing pct={ringPct} color={ringColor} />}
      <div className="min-w-0">
        <p className="text-lg sm:text-xl font-extrabold text-text-primary tabular-nums leading-tight">
          {value}
        </p>
        <p className="text-[10px] sm:text-[11px] text-text-secondary leading-snug">{label}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <Icon name="bar-chart" size={28} className="text-text-secondary/40 mb-2" />
      <p className="text-sm font-medium text-text-secondary">Маълумот мавжуд эмас</p>
    </div>
  );
}

export function InfrastructureTabbedSection({
  level,
  entityId,
}: {
  level: InfraLevel;
  entityId?: string;
}) {
  const categories = getInfrastructureByLevel(level, entityId);
  const [activeKey, setActiveKey] = useState(categories[0]?.key);
  const active: InfraLevelCategory | undefined =
    categories.find((c) => c.key === activeKey) ?? categories[0];

  if (!active) return <EmptyState />;

  const palette = INFRA_PALETTE[active.key];

  return (
    <section className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5">
      {/* Header: title + detail link */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-navy">Инфратузилма лойиҳалари</h2>
          <p className="text-sm text-text-secondary mt-0.5">
            Инфратузилма қурилиш объектлари мониторинги
          </p>
        </div>
        <Link
          href="/infratuzilma"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-navy-light transition-colors shrink-0"
        >
          Батафсил
          <Icon name="chevron-forward" size={13} variant="Bold" />
        </Link>
      </div>

      {/* Tabs — mobile: horizontal scroll */}
      <div
        className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 -mx-1 px-1"
        role="tablist"
        aria-label="Инфратузилма категориялари"
      >
        {categories.map((cat, i) => {
          const isActive = cat.key === active.key;
          const color = INFRA_PALETTE[cat.key].main;
          // Маҳалла (idx 0-1) va Туман (idx 2-3) juftliklari orasida ajratgich
          const needsDivider = i === 2 && categories.length === 4;
          return (
            <div key={cat.key} className="flex items-center gap-1.5 shrink-0">
              {needsDivider && <span className="w-px h-5 bg-border-light mx-1" aria-hidden />}
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveKey(cat.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "text-white shadow-sm"
                    : "bg-surface text-text-secondary hover:bg-border-light/60"
                }`}
                style={isActive ? { backgroundColor: color } : undefined}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isActive ? "rgba(255,255,255,0.85)" : color }}
                />
                {cat.title}
              </button>
            </div>
          );
        })}
      </div>

      {/* Tab content — fade on key change */}
      <div key={active.key} className="animate-in fade-in duration-200 space-y-4">
        {/* KPI strip: 320px da 2×2, lg+ da 4 ustun */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          <KpiPill label="Жами лойиҳалар сони" value={active.totalProjects.toLocaleString("en-US")} />
          <KpiPill label="Жами обектлар сони" value={active.totalObjects.toLocaleString("en-US")} />
          <KpiPill
            label="Оралиқ далолатнома"
            value={active.interimCount.toLocaleString("en-US")}
            ringPct={active.interimPct}
            ringColor={palette.main}
          />
          <KpiPill
            label="Якуний далолатнома"
            value={active.finalCount.toLocaleString("en-US")}
            ringPct={active.finalPct}
            ringColor={palette.secondary}
          />
        </div>

        {/* Drill-down chart */}
        {active.breakdown.length === 0 ? (
          <EmptyState />
        ) : (
          <GroupedBarChart
            title={BREAKDOWN_TITLES[level]}
            data={active.breakdown.map((row) => ({
              name: shortName(row.name),
              fullName: row.name,
              total: row.total,
              "Лойиҳа бажарилиш фоизи": row.projectPct,
              "Объектлар бажарилиш фоизи": row.objectPct,
            }))}
            series={[
              {
                key: "Лойиҳа бажарилиш фоизи",
                label: "Лойиҳа бажарилиш фоизи",
                color: palette.main,
                gradientFrom: palette.mainFrom,
                gradientTo: palette.mainTo,
              },
              {
                key: "Объектлар бажарилиш фоизи",
                label: "Объектлар бажарилиш фоизи",
                color: palette.secondary,
                gradientFrom: palette.secFrom,
                gradientTo: palette.secTo,
              },
            ]}
            averageKey="Объектлар бажарилиш фоизи"
            defaultLimit={5}
            height={240}
          />
        )}
      </div>
    </section>
  );
}
