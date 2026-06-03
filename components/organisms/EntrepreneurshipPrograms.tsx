"use client";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { IconCircle } from "@/components/atoms/IconCircle";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export type ProgramDatum = { count: number; sumBln: number };

export type EntrepreneurshipProgramsData = {
  familyBusiness: ProgramDatum;
  firstStep: ProgramDatum;
  mahallaProject: ProgramDatum;
  smallBusiness: ProgramDatum;
};

type ProgramKey = keyof EntrepreneurshipProgramsData;

const PROGRAMS: { key: ProgramKey; title: string; short: string; accent: string; color: string }[] = [
  {
    key: "familyBusiness",
    title: "Оилавий тадбиркорликни ривожлантириш дастурлари доирасида ажратилган кредитлар",
    short: "Оилавий",
    accent: "border-t-navy",
    color: "#2b8cee",
  },
  {
    key: "firstStep",
    title: "Бизнесга биринчи қадам дастури",
    short: "Биринчи қадам",
    accent: "border-t-orange",
    color: "#fd7d07",
  },
  {
    key: "mahallaProject",
    title: "Маҳалла лойиҳаси дастури",
    short: "Маҳалла",
    accent: "border-t-purple",
    color: "#a162f7",
  },
  {
    key: "smallBusiness",
    title: "Кичик бизнесни узлуксиз қўллаб-қувватлаш дастури",
    short: "Кичик бизнес",
    accent: "border-t-success",
    color: "#1dc973",
  },
];

function formatCount(n: number) {
  return n.toLocaleString("ru-RU");
}

function formatSum(n: number) {
  if (n < 1) return `${(n * 1000).toFixed(0)} млн сўм`;
  return `${n.toLocaleString("ru-RU", { maximumFractionDigits: 1 })} млрд сўм`;
}

export interface EntrepreneurshipProgramsProps {
  programs: EntrepreneurshipProgramsData;
  compact?: boolean;
  className?: string;
}

export function EntrepreneurshipPrograms({
  programs,
  compact = false,
  className = "",
}: EntrepreneurshipProgramsProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-border-light border-l-4 border-l-purple shadow-sm hover:shadow-md transition-shadow p-3 sm:p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <SectionHeader title="Тадбиркорлик лойиҳалари" icon="briefcase" iconVariant="navy" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PROGRAMS.map((p) => {
          const datum = programs[p.key];
          return (
            <div
              key={p.key}
              className={`relative bg-[#F7F7F7] rounded-xl border border-border-subtle border-t-4 ${p.accent} p-3 sm:p-4 flex flex-col`}
            >
              <div className="flex items-start gap-2.5 min-h-[3rem]">
                <div className="shrink-0 mt-0.5">
                  <IconCircle icon="briefcase" variant="navy" size="sm" />
                </div>
                <h4 className="text-[12.5px] sm:text-[13px] font-semibold text-navy leading-snug line-clamp-3">
                  {p.title}
                </h4>
              </div>

              <div className="border-t border-border-light/70 my-3" />

              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[10px] font-semibold text-text-label uppercase tracking-wider">
                    Сони
                  </span>
                  <span className={`font-bold text-navy ${compact ? "text-base" : "text-lg"}`}>
                    {formatCount(datum.count)}
                    <span className="text-[11px] font-medium text-text-secondary ml-1">та</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[10px] font-semibold text-text-label uppercase tracking-wider">
                    Суммаси
                  </span>
                  <span className={`font-bold text-success ${compact ? "text-sm" : "text-[15px]"}`}>
                    {formatSum(datum.sumBln)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ProgramsCombinedChart programs={programs} />
    </div>
  );
}

function ProgramsCombinedChart({ programs }: { programs: EntrepreneurshipProgramsData }) {
  const data = PROGRAMS.map((p) => ({
    name: p.short,
    fullName: p.title,
    count: programs[p.key].count,
    sum: programs[p.key].sumBln,
    color: p.color,
  }));

  return (
    <div className="mt-5 bg-[#F7F7F7] rounded-xl border border-border-subtle p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h5 className="text-[12px] font-semibold text-navy uppercase tracking-wider">
          Дастурлар таққослаш
        </h5>
        <div className="flex items-center gap-3 text-[10px] font-medium text-text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy/70" />
            Сони (та)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-3 h-[2px] rounded-full bg-success" />
            Суммаси (млрд)
          </span>
        </div>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 28, right: 14, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v))}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: "#1dc973" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              defaultIndex={0}
              allowEscapeViewBox={{ x: false, y: false }}
              cursor={{ fill: "rgba(43,140,238,0.05)" }}
              wrapperStyle={{ outline: "none" }}
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                fontSize: 12,
                // Constrain width so the long program name wraps instead of
                // forcing a 500px+ single line that overflows the page on mobile.
                maxWidth: 220,
                whiteSpace: "normal",
                wordBreak: "break-word",
                boxShadow: "0 4px 12px rgba(15,43,77,0.08)",
              }}
              formatter={(value, name) => {
                const num = Number(value);
                if (name === "count") return [formatCount(num) + " та", "Сони"];
                return [formatSum(num), "Суммаси"];
              }}
              labelFormatter={(label, payload) => {
                const item = payload?.[0]?.payload as { fullName?: string } | undefined;
                return item?.fullName ?? label;
              }}
            />
            <Bar yAxisId="left" dataKey="count" radius={[6, 6, 0, 0]} barSize={36}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.85} />
              ))}
              <LabelList
                dataKey="count"
                position="top"
                formatter={(v) => formatCount(Number(v))}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  fill: "#1e3a5f",
                }}
              />
            </Bar>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="sum"
              stroke="#1dc973"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#1dc973", strokeWidth: 2, stroke: "#ffffff" }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                dataKey="sum"
                position="top"
                offset={12}
                formatter={(v) => formatSum(Number(v))}
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  fill: "#1dc973",
                }}
              />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
