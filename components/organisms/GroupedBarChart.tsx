"use client";

import { useState, useId } from "react";
import { Icon } from "@/components/atoms/Icon";
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
export interface BarSeriesConfig {
  key: string;          // dataKey on each row
  label: string;        // displayed label in legend/tooltip
  color: string;        // main color (used in legend dot)
  gradientFrom: string; // top of bar gradient
  gradientTo: string;   // bottom of bar gradient
}

export interface GroupedRegionData {
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

export function GroupedBarChart({
  data,
  series,
  averageKey,
  height = 220,
  cardClassName = "",
  defaultLimit = 3,
  title = "Вилоятлар бўйича таққослама",
}: {
  data: GroupedRegionData[];
  series: BarSeriesConfig[];
  averageKey?: string;
  height?: number;
  cardClassName?: string;
  defaultLimit?: number;
  title?: string;
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
            {title}
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
