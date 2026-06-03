"use client";

import { useState, useId } from "react";
import { type IconName, Icon } from "@/components/atoms/Icon";
import { DashboardQuadrant } from "@/components/organisms/DashboardQuadrant";
import { StatCard } from "@/components/atoms/StatCard";
import { RadialGauge } from "@/components/organisms/RadialGauge";
import { infrastructureData } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
  Cell,
} from "recharts";

// ============================================================
// GROUPED BAR CHART — generic, multi-series region comparison
// ============================================================
interface BarSeriesConfig {
  key: string;          // dataKey on each row
  label: string;        // displayed label in legend/tooltip
  color: string;        // main color (used in legend dot)
  gradientFrom: string; // top of bar gradient
  gradientTo: string;   // bottom of bar gradient
}

interface GroupedRegionData {
  name: string;
  fullName: string;
  total: number;
  [seriesKey: string]: string | number;
}

function CustomGroupedTooltip({
  active,
  payload,
  series,
}: {
  active?: boolean;
  payload?: Array<{ payload: Record<string, unknown>; value: number; dataKey: string; color: string }>;
  series?: BarSeriesConfig[];
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  const total = (data.total as number) ?? 0;
  const seriesMap = new Map((series ?? []).map((s) => [s.key, s]));
  return (
    <div className="bg-white rounded-xl shadow-xl border border-border-light/80 p-3 min-w-[200px] backdrop-blur-sm">
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-border-light/50">
        <Icon name="pin" size={12} variant="Bold" className="text-navy" />
        <p className="text-xs font-bold text-text-primary">{String(data.fullName ?? "")}</p>
      </div>
      {total > 0 && (
        <p className="text-[10px] text-text-secondary mb-2">
          Қурилиш объектлари: <span className="font-bold text-text-primary tabular-nums">{total.toLocaleString("en-US")}</span>
        </p>
      )}
      <div className="space-y-1.5">
        {payload.map((item) => {
          const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : null;
          const conf = seriesMap.get(item.dataKey);
          return (
            <div key={item.dataKey} className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: conf?.color ?? item.color }} />
              <span className="text-text-secondary">{conf?.label ?? item.dataKey}</span>
              <span className="font-bold text-text-primary tabular-nums ml-auto">{item.value.toLocaleString("en-US")}</span>
              {pct && (
                <span className="text-[10px] tabular-nums font-medium" style={{ color: conf?.color ?? item.color }}>
                  {pct}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GroupedBarChart({
  data,
  series,
  averageKey,
  height = 220,
  cardClassName = "",
  defaultLimit = 3,
}: {
  data: GroupedRegionData[];
  series: BarSeriesConfig[];
  averageKey?: string;
  height?: number;
  cardClassName?: string;
  defaultLimit?: number;
}) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(0);
  // React useId() returns a unique ID per component instance — prevents gradient ID clashes
  // when multiple charts share the same series keys (e.g. "Режа"/"Амалда").
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const chartId = `${uid}-${series.map((s) => s.key).join("-").replace(/[^a-zA-Z0-9-]/g, "")}`;

  const hasMore = data.length > defaultLimit;
  const totalPages = Math.ceil(data.length / defaultLimit);
  const visibleData = expanded
    ? data
    : data.slice(page * defaultLimit, page * defaultLimit + defaultLimit);
  const minWidthPerRegion = expanded ? 75 : 0;
  const minWidth = expanded ? data.length * minWidthPerRegion : 0;

  // Average computed over ALL data (not just visible)
  const avgValue = averageKey
    ? Math.round(data.reduce((s, d) => s + ((d[averageKey] as number) ?? 0), 0) / data.length)
    : null;

  const toggleSeries = (key: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const lastVisibleIdx = series
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => !hidden.has(s.key))
    .map(({ i }) => i)
    .pop() ?? -1;

  return (
    <div className={`bg-white rounded-xl border border-border-light/50 p-3 sm:p-4 ${cardClassName}`}>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Icon name="bar-chart" size={13} variant="Bold" className="text-text-secondary/60" />
          <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
            Вилоятлар бўйича таққослама
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-text-secondary flex-wrap justify-end">
          {series.map((s) => {
            const isHidden = hidden.has(s.key);
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => toggleSeries(s.key)}
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded transition-all hover:bg-surface ${
                  isHidden ? "opacity-40" : ""
                }`}
                title={isHidden ? "Кўрсатиш" : "Яшириш"}
              >
                <span
                  className="w-2 h-2 rounded-sm transition-all"
                  style={{ backgroundColor: s.color, transform: isHidden ? "scale(0.6)" : "scale(1)" }}
                />
                <span className={isHidden ? "line-through" : ""}>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={expanded ? "overflow-x-auto -mx-1 px-1" : ""}>
        <div style={{ height, minWidth: minWidth || undefined }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={visibleData}
              margin={{ top: 24, right: 8, left: -22, bottom: 0 }}
              barGap={3}
              barCategoryGap="22%"
              onMouseLeave={() => setActiveIdx(null)}
            >
              <defs>
                {series.map((s, i) => (
                  <linearGradient key={i} id={`${chartId}-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.gradientFrom} stopOpacity={1} />
                    <stop offset="100%" stopColor={s.gradientTo} stopOpacity={1} />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: expanded && data.length > 8 ? 9 : 11, fill: "#64748b", fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={expanded && data.length > 8 ? -25 : 0}
                textAnchor={expanded && data.length > 8 ? "end" : "middle"}
                height={expanded && data.length > 8 ? 50 : 30}
              />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />

              <Tooltip
                defaultIndex={0}
                cursor={{ fill: "rgba(43, 140, 238, 0.06)", radius: 4 }}
                content={<CustomGroupedTooltip series={series} />}
              />

              {avgValue !== null && (
                <ReferenceLine
                  y={avgValue}
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  strokeWidth={1.2}
                  label={{
                    value: `Ўртача: ${avgValue}`,
                    position: "right",
                    fontSize: 9,
                    fill: "#64748b",
                    offset: 4,
                  }}
                />
              )}

              {series.map((s, sIdx) =>
                !hidden.has(s.key) ? (
                  <Bar
                    key={s.key}
                    dataKey={s.key}
                    fill={`url(#${chartId}-grad-${sIdx})`}
                    radius={[6, 6, 0, 0]}
                    isAnimationActive={false}
                    onMouseEnter={(_, idx) => setActiveIdx(idx)}
                  >
                    {visibleData.map((_, idx) => (
                      <Cell
                        key={idx}
                        style={{
                          filter: activeIdx !== null && activeIdx !== idx ? "saturate(0.4) opacity(0.5)" : undefined,
                          transition: "filter 0.25s ease",
                        }}
                      />
                    ))}
                    {sIdx === lastVisibleIdx && (
                      <LabelList
                        dataKey={s.key}
                        position="top"
                        style={{ fontSize: 9, fill: "#64748b", fontWeight: 600 }}
                      />
                    )}
                  </Bar>
                ) : null
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-2 pt-2 border-t border-border-light/40 text-[9px] text-text-secondary/70 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          {avgValue !== null && (
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-[2px]" style={{ borderTop: "1px dashed #94a3b8" }} />
              Ўртача чизиқ
            </span>
          )}
          <span>Сериянинг номини босиб яширинг</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {hasMore && !expanded && (
            <div className="inline-flex items-center gap-0.5 rounded-md border border-border-light/70 bg-white">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="inline-flex items-center justify-center w-6 h-6 rounded-l-md text-text-secondary hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Олдинги"
              >
                <Icon name="chevron-forward" size={11} variant="Bold" className="rotate-180" />
              </button>
              <span className="px-2 text-[10px] font-semibold text-text-primary tabular-nums select-none">
                {page + 1}/{totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="inline-flex items-center justify-center w-6 h-6 rounded-r-md text-text-secondary hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Кейинги"
              >
                <Icon name="chevron-forward" size={11} variant="Bold" />
              </button>
            </div>
          )}
          {hasMore && (
            <button
              type="button"
              onClick={() => {
                setExpanded((v) => !v);
                setPage(0);
              }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide text-navy bg-navy-lighter/40 hover:bg-navy-lighter/60 transition-colors"
            >
              <Icon name={expanded ? "chevron-down" : "chevron-forward"} size={11} variant="Bold" />
              {expanded ? `Камайтириш` : `Барчаси (${data.length})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INFRASTRUCTURE CARD — one program (gauges + stats + bar chart)
// ============================================================
// Brand-anchored cool spectrum: primary #2b8cee at the center, four distinct hues
// fanning out through the cool wheel — Azure → Cyan → Indigo → Violet.
const INFRA_PALETTE = {
  oghirMahalla: {
    main: "#2b8cee",
    mainFrom: "#5fa7f3",
    mainTo: "#1d6fcb",
    secondary: "#0ea5e9",
    secFrom: "#38bdf8",
    secTo: "#0284c7",
  },
  yangiMahalla: {
    main: "#06b6d4",
    mainFrom: "#22d3ee",
    mainTo: "#0891b2",
    secondary: "#14b8a6",
    secFrom: "#5eead4",
    secTo: "#0d9488",
  },
  oghirTuman: {
    main: "#4f46e5",
    mainFrom: "#818cf8",
    mainTo: "#3730a3",
    secondary: "#6366f1",
    secFrom: "#a5b4fc",
    secTo: "#4338ca",
  },
  yangiTuman: {
    main: "#8b5cf6",
    mainFrom: "#a78bfa",
    mainTo: "#7c3aed",
    secondary: "#a855f7",
    secFrom: "#c084fc",
    secTo: "#9333ea",
  },
} as const;

type InfraSection = typeof infrastructureData.oghirMahalla;
type InfraPalette = typeof INFRA_PALETTE[keyof typeof INFRA_PALETTE];

function InfrastructureCard({
  section,
  icon,
  palette,
}: {
  section: InfraSection;
  icon: IconName;
  palette: InfraPalette;
}) {
  return (
    <DashboardQuadrant
      title={section.title}
      icon={icon}
      subtitle="Режа / Амалда йил бошидан"
    >
      <div className="space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Icon name="document-text" size={13} variant="Bold" className="text-text-secondary/60" />
            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              Капитал қуйилма маълумотлари буйича юборилган обектлар сони
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StatCard
              label="Жами лойиҳалар сони"
              subtitle="Капитал қўйилмалар ва ривожлантириш дастурлари учун ажратилган маблағлар ҳисоби ва ҳисоботи йиғма бўлими маълумотлари асосида"
              value={section.totalProjects.toLocaleString()}
              icon="briefcase"
              variant="accent"
            />
            <StatCard
              label="Жами обектлар сони"
              subtitle="туман ҳокими ўринбосарининг тастиғига асосан"
              value={section.totalObjects.toLocaleString()}
              icon={icon}
              variant="accent"
            />
          </div>
        </div>

        {/* Pipeline view — Gauges */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Icon name="stats-chart" size={13} variant="Bold" className="text-text-secondary/60" />
            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              Лойиҳа кўрсаткичлари
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RadialGauge
              pct={section.interimPct}
              count={section.interimCount}
              label="Оралиқ далолатнома"
              color={palette.main}
              gradientFrom={palette.mainFrom}
              gradientTo={palette.mainTo}
            />
            <RadialGauge
              pct={section.finalPct}
              count={section.finalCount}
              label="Якуний далолатнома"
              color={palette.secondary}
              gradientFrom={palette.secFrom}
              gradientTo={palette.secTo}
            />
          </div>
        </div>

        {/* Viloyatlar section — Bar chart with 2 percentage metrics */}
        <GroupedBarChart
          data={section.regions.map((r) => ({
            name: r.name.replace(" вилояти", ""),
            fullName: r.name,
            total: r.total,
            "Лойиҳа бажарилиш фоизи": r.projectPct,
            "Объектлар бажарилиш фоизи": r.objectPct,
          }))}
          series={[
            { key: "Лойиҳа бажарилиш фоизи", label: "Лойиҳа бажарилиш фоизи", color: palette.main, gradientFrom: palette.mainFrom, gradientTo: palette.mainTo },
            { key: "Объектлар бажарилиш фоизи", label: "Объектлар бажарилиш фоизи", color: palette.secondary, gradientFrom: palette.secFrom, gradientTo: palette.secTo },
          ]}
          averageKey="Объектлар бажарилиш фоизи"
        />
      </div>
    </DashboardQuadrant>
  );
}

// ============================================================
// GROUP HEADER — level pill + optional subtitle
// ============================================================
interface GroupHeaderProps {
  title: string;
  subtitle?: string;
  icon: IconName;
  color: string;
  bg: string;
}

function GroupHeader({ title, subtitle, icon, color, bg }: GroupHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
        style={{ backgroundColor: bg }}
      >
        <Icon name={icon} size={14} variant="Bold" className="" style={{ color }} />
        <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color }}>
          {title}
        </span>
      </div>
      {subtitle && (
        <span className="text-xs text-text-secondary hidden sm:inline">{subtitle}</span>
      )}
    </div>
  );
}

// ============================================================
// CATEGORY ACCENT — folder-tab badge ("Оғир" / "Янги Ўзбекистон")
// ============================================================
const KIND_CONFIG = {
  oghir: { color: "#f59e0b", label: "ОҒИР", desc: "Эҳтиёжманд" },
  yangi: { color: "#10b981", label: "ЯНГИ ЎЗБЕКИСТОН", desc: "Қиёфасидаги" },
} as const;

function CategoryAccent({ kind, children }: { kind: keyof typeof KIND_CONFIG; children: React.ReactNode }) {
  const config = KIND_CONFIG[kind];
  return (
    <div className="relative">
      {/* Top accent strip — 3px colored bar across top of card, clipped by rounded corners */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-10 rounded-t-xl pointer-events-none"
        style={{ backgroundColor: config.color }}
      />
      {/* Floating category badge — folder-tab style, sticks out of top-left */}
      <div
        className="absolute -top-2.5 left-4 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm"
        style={{ backgroundColor: config.color, color: "white" }}
      >
        {config.label}
      </div>
      {children}
    </div>
  );
}

// ============================================================
// PUBLIC — full infrastructure block (2 level-groups × 2 cards)
// Shared across the dashboard, republic, region and district pages.
// ============================================================
export function InfrastructureSection() {
  return (
    <>
      {/* МАҲАЛЛА даражасидаги лойиҳалар */}
      <section
        className="relative mb-6 rounded-2xl p-3 sm:p-4"
        style={{
          background: "linear-gradient(135deg, rgba(43, 140, 238, 0.10) 0%, rgba(43, 140, 238, 0.06) 100%)",
          border: "1px solid rgba(43, 140, 238, 0.22)",
          boxShadow: "0 1px 3px rgba(43, 140, 238, 0.06)",
        }}
      >
        <GroupHeader
          title="Маҳалла даражасидаги лойиҳалар"
          subtitle="Оғир маҳалла + Янги Ўзбекистон қиёфасидаги маҳалла"
          icon="home"
          color="#2b8cee"
          bg="rgba(43, 140, 238, 0.12)"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2">
          <CategoryAccent kind="oghir">
            <InfrastructureCard
              section={infrastructureData.oghirMahalla}
              icon="construct"
              palette={INFRA_PALETTE.oghirMahalla}
            />
          </CategoryAccent>
          <CategoryAccent kind="yangi">
            <InfrastructureCard
              section={infrastructureData.yangiMahalla}
              icon="layers"
              palette={INFRA_PALETTE.yangiMahalla}
            />
          </CategoryAccent>
        </div>
      </section>

      {/* ТУМАН даражасидаги лойиҳалар */}
      <section
        className="relative rounded-2xl p-3 sm:p-4"
        style={{
          background: "linear-gradient(135deg, rgba(161, 98, 247, 0.10) 0%, rgba(161, 98, 247, 0.06) 100%)",
          border: "1px solid rgba(161, 98, 247, 0.24)",
          boxShadow: "0 1px 3px rgba(161, 98, 247, 0.06)",
        }}
      >
        <GroupHeader
          title="Туман даражасидаги лойиҳалар"
          subtitle="Оғир туман + Янги Ўзбекистон қиёфасидаги туман"
          icon="business"
          color="#a162f7"
          bg="rgba(161, 98, 247, 0.14)"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2">
          <CategoryAccent kind="oghir">
            <InfrastructureCard
              section={infrastructureData.oghirTuman}
              icon="hammer"
              palette={INFRA_PALETTE.oghirTuman}
            />
          </CategoryAccent>
          <CategoryAccent kind="yangi">
            <InfrastructureCard
              section={infrastructureData.yangiTuman}
              icon="business"
              palette={INFRA_PALETTE.yangiTuman}
            />
          </CategoryAccent>
        </div>
      </section>
    </>
  );
}
