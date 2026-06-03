"use client";

import { Icon } from "@/components/atoms/Icon";
import { GlassIcon } from "@/components/atoms/GlassIcon";
import { ProgressRing } from "@/components/atoms/ProgressRing";
import { RegionRow } from "@/components/molecules/RegionRow";
import { overviewData } from "@/lib/mock-data";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

const COLORS = {
  navy: "#2b8cee",
  navyAccent: "#338fff",
  navyLight: "#61a6fa",
  navyDark: "#1a6fd4",
  orange: "#fd7d07",
  purple: "#a162f7",
  success: "#1dc973",
  warning: "#F59E0B",
  danger: "#EF4444",
};

// Mini sparkline data
const trendData = [
  { m: "Янв", v: 420 },
  { m: "Фев", v: 480 },
  { m: "Мар", v: 520 },
  { m: "Апр", v: 490 },
  { m: "Май", v: 550 },
  { m: "Июн", v: 580 },
  { m: "Июл", v: 610 },
  { m: "Авг", v: 590 },
  { m: "Сен", v: 640 },
  { m: "Окт", v: 620 },
  { m: "Ноя", v: 660 },
  { m: "Дек", v: 700 },
];

const barData = [
  { name: "Жиззах", reja: 620, amalda: 480 },
  { name: "Тошкент", reja: 780, amalda: 620 },
  { name: "Самарқанд", reja: 890, amalda: 650 },
  { name: "Фарғона", reja: 750, amalda: 560 },
  { name: "Андижон", reja: 680, amalda: 540 },
  { name: "Наманган", reja: 520, amalda: 420 },
];

const pieData = [
  { name: "Амалда", value: 4249, color: "#fd7d07" },
  { name: "Қолган", value: 695, color: "#e2e8f0" },
];

const householdPie = [
  { name: "Ажратилган", value: 11200, color: COLORS.success },
  { name: "Қолган", value: 3800, color: "#f0f1f5" },
];

export default function OverviewPage() {
  const d = overviewData;

  return (
    <div className="space-y-5">
      {/* ====== TOP: Summary KPI Strip ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
        <SummaryCard
          icon="people"
          iconColor={COLORS.navy}
          label="Камбағал оилалар"
          value="660,000"
          sub="Реестрдаги оилалар"
          trend="+2.3%"
          trendUp
          sparkColor={COLORS.navy}
          sparkId="people"
          valueColor={COLORS.navy}
          activeTooltipIndex={2}
        />
        <SummaryCard
          icon="bulb"
          iconColor={COLORS.orange}
          label="Микролойиҳалар"
          value="4,249"
          sub={`${d.microprojects.plan.toLocaleString("en-US")} тадан`}
          trend="85.9%"
          trendUp
          sparkColor={COLORS.orange}
          sparkId="bulb"
          valueColor={COLORS.orange}
          activeTooltipIndex={2}
        />
        <SummaryCard
          icon="briefcase"
          iconColor={COLORS.purple}
          label="Тадбиркорлик"
          value="6,200"
          sub="8,500 тадан ишга туширилган"
          trend="+5.2%"
          trendUp
          sparkColor={COLORS.purple}
          sparkId="briefcase"
          valueColor={COLORS.purple}
          activeTooltipIndex={2}
        />
        <SummaryCard
          icon="wallet"
          iconColor={COLORS.success}
          label="Кредит пакетлари"
          value="11,200"
          sub="15,000 тадан ажратилган"
          trend="+3.8%"
          trendUp
          sparkColor={COLORS.success}
          sparkId="wallet"
          valueColor={COLORS.success}
          activeTooltipIndex={2}
        />
      </div>

      {/* ====== MAIN: 2x2 Grid ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ====== Q1: Камбағалликни қисқартириш ====== */}
        <div className="bg-white rounded-xl border border-border-light shadow-layered overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-border-light/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GlassIcon icon="people" color={COLORS.navy} size="md" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-text-primary">Камбағалликни қисқартириш</h3>
                  <p className="text-xs text-text-secondary">Йил бошидан кўрсатилган хизматлар</p>
                </div>
              </div>
              <span className="text-xs text-text-secondary bg-surface px-3 py-1.5 rounded-full">2026 йил</span>
            </div>
          </div>

          <div className="p-4 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <KPICard label="Реестрдаги" value="660" unit="минг" color="text-navy" bg="bg-surface" />
              <KPICard label="Хизматлар" value="1.2" unit="млн" color="text-orange" bg="bg-orange/5" />
              <KPICard label="Чиқарилган" value="32" unit="минг" color="text-success" bg="bg-success/10" />
            </div>

            <div className="bg-surface rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-navy">Йиллик динамика</span>
                <span className="text-xs text-text-secondary">
                  Бажарилиш: <span className="font-bold text-navy">{d.povertyReduction.percentage}%</span>
                </span>
              </div>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="navyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.navy} stopOpacity={0.15} />
                        <stop offset="95%" stopColor={COLORS.navy} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      defaultIndex={5}
                      contentStyle={{ fontSize: 13, borderRadius: 8, border: "1px solid #e2e8f0" }}
                      labelStyle={{ fontWeight: 600 }}
                    />
                    <Area type="monotone" dataKey="v" stroke={COLORS.navy} strokeWidth={2} fill="url(#navyGrad)" name="Оилалар" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-surface rounded-xl p-3">
                <GlassIcon icon="trending-up" color={COLORS.success} size="sm" />
                <div>
                  <p className="text-xl font-bold text-navy leading-none">45,000</p>
                  <p className="text-xs text-text-secondary mt-0.5">Реестрга киритилган</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-surface rounded-xl p-3">
                <GlassIcon icon="trending-down" color={COLORS.navy} size="sm" />
                <div>
                  <p className="text-xl font-bold text-navy leading-none">32,000</p>
                  <p className="text-xs text-text-secondary mt-0.5">Реестрдан чиқарилган</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Вилоятлар</p>
                <button className="text-xs text-navy-light hover:underline font-medium">Барчаси →</button>
              </div>
              {d.povertyReduction.regions.map((r, i) => (
                <RegionRow
                  key={r.id}
                  name={r.name}
                  values={[`${(r.families / 1000).toFixed(1)}к`, `${(r.services / 1000).toFixed(1)}к`]}
                  percentage={r.pct}
                  isLast={i === d.povertyReduction.regions.length - 1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ====== Q2: Микролойиҳалар ====== */}
        <div className="bg-white rounded-xl border border-border-light shadow-layered overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-border-light/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GlassIcon icon="bulb" color={COLORS.orange} size="md" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-text-primary">Маҳаллада микролойиҳалар</h3>
                  <p className="text-xs text-text-secondary">Амалда йил бошидан</p>
                </div>
              </div>
              <span className="inline-flex items-center rounded-full bg-orange/10 border border-orange/15 px-3 py-1.5 text-xs font-bold text-orange">
                {d.microprojects.percentage}%
              </span>
            </div>
          </div>

          <div className="p-4 space-y-5">
            {/* Donut chart + Reja/Amalda */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="text-center space-y-1.5 min-w-[80px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Режа</p>
                <p className="text-xl sm:text-[28px] font-bold text-text-primary leading-none tracking-tight">{d.microprojects.plan.toLocaleString("en-US")}</p>
                <p className="text-xs font-medium text-text-secondary">та лойиҳа</p>
              </div>

              <div className="relative shrink-0" style={{ width: 150, height: 150 }}>
                <PieChart width={150} height={150}>
                  <Pie data={pieData} cx={75} cy={75} innerRadius={48} outerRadius={68} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xl sm:text-[26px] font-bold text-orange leading-none tabular-nums">{d.microprojects.actual.toLocaleString("en-US")}</p>
                  <p className="text-[11px] font-medium text-text-secondary mt-1">амалда</p>
                </div>
              </div>

              <div className="text-center space-y-1.5 min-w-[80px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Амалда</p>
                <p className="text-xl sm:text-[28px] font-bold text-success leading-none tracking-tight">{d.microprojects.actual.toLocaleString("en-US")}</p>
                <p className="text-xs font-medium text-text-secondary">та лойиҳа</p>
              </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-xl p-3.5 text-center bg-surface border border-border-subtle">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-label mb-1.5">Иш ўринлари</p>
                <p className="text-xl font-bold text-orange tabular-nums">{d.microprojects.jobs.actual.toLocaleString("en-US")}</p>
                <p className="text-xs font-medium text-text-secondary mt-0.5">{d.microprojects.jobs.plan.toLocaleString("en-US")} тадан</p>
              </div>
              <div className="rounded-xl p-3.5 text-center bg-surface border border-border-subtle">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-label mb-1.5">Кредитлар</p>
                <p className="text-xl font-bold text-navy tabular-nums">{d.microprojects.credits.count.toLocaleString("en-US")}</p>
                <p className="text-xs font-medium text-text-secondary mt-0.5">та берилган</p>
              </div>
              <div className="rounded-xl p-3.5 text-center bg-surface border border-border-subtle">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-label mb-1.5">Суммаси</p>
                <p className="text-xl font-bold text-purple tabular-nums">{d.microprojects.credits.sum}</p>
                <p className="text-xs font-medium text-text-secondary mt-0.5">млрд сўм</p>
              </div>
            </div>

            {/* Region progress bars */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Вилоятлар бўйича</p>
                <button className="text-xs text-navy-light hover:underline font-medium">Барчаси →</button>
              </div>
              {d.microprojects.regions.map((r) => (
                <div key={r.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-text-label">{r.name}</span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-medium text-text-secondary">{r.actual}/{r.plan}</span>
                      <span className={`text-xs font-bold tabular-nums ${r.pct >= 80 ? "text-success" : r.pct >= 60 ? "text-warning" : "text-danger"}`}>{r.pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-border-light rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        r.pct >= 80
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                          : r.pct >= 60
                          ? "bg-gradient-to-r from-amber-500 to-amber-400"
                          : "bg-gradient-to-r from-red-500 to-red-400"
                      }`}
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs font-medium text-text-secondary/50 text-center pt-3 border-t border-border-light/50">
              Ҳисобот давр: 2026-йил 1-Янв — 31-Март
            </p>
          </div>
        </div>

        {/* ====== Q3: Тадбиркорлик ====== */}
        <div className="bg-white rounded-xl border border-border-light shadow-layered overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-border-light/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GlassIcon icon="briefcase" color={COLORS.purple} size="md" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-text-primary">Тадбиркорлик лойиҳалари</h3>
                  <p className="text-xs text-text-secondary">Режа ва амалда йил бошидан</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#c4a0f8" }} />
                <span className="text-xs text-text-secondary">Режа</span>
                <span className="w-2.5 h-2.5 rounded-full bg-purple ml-2" />
                <span className="text-xs text-text-secondary">Амалда</span>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <KPICard label="Режалашт." value="8,500" unit="та" color="text-purple" bg="bg-purple/5" />
              <KPICard label="Ишга тушган" value="6,200" unit="та" color="text-navy" bg="bg-surface" />
              <KPICard label="Бажарилиш" value="72.9" unit="%" color="text-success" bg="bg-success/10" />
            </div>

            <div className="bg-surface rounded-xl p-4">
              <p className="text-sm font-bold text-purple mb-3">Вилоятлар бўйича солиштирма</p>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} interval={0} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <Tooltip defaultIndex={2} contentStyle={{ fontSize: 13, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                    <Bar dataKey="reja" fill="#c4a0f8" radius={[3, 3, 0, 0]} name="Режа" barSize={14} />
                    <Bar dataKey="amalda" fill={COLORS.purple} radius={[3, 3, 0, 0]} name="Амалда" barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-surface rounded-xl p-3">
                <ProgressRing value={72.9} size="sm" color={COLORS.purple} />
                <div>
                  <p className="text-base font-bold text-purple">6,200 та</p>
                  <p className="text-xs text-text-secondary">Ишга туширилган</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-surface rounded-xl p-3">
                <ProgressRing value={68} size="sm" color="#c4a0f8" />
                <div>
                  <p className="text-base font-bold text-purple">18,500</p>
                  <p className="text-xs text-text-secondary">Иш ўринлари</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Вилоятлар</p>
                <button className="text-xs text-navy-light hover:underline font-medium">Барчаси →</button>
              </div>
              {d.entrepreneurship.regions.map((r, i) => (
                <RegionRow key={r.id} name={r.name} values={[r.plan, r.actual]} percentage={r.pct} isLast={i === d.entrepreneurship.regions.length - 1} />
              ))}
            </div>
          </div>
        </div>

        {/* ====== Q4: Хонадон даромади ====== */}
        <div className="bg-white rounded-xl border border-border-light shadow-layered overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-border-light/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GlassIcon icon="wallet" color={COLORS.success} size="md" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-text-primary">Хонадон даромадини оширириш</h3>
                  <p className="text-xs text-text-secondary">Кредит пакетлари ажратилиши</p>
                </div>
              </div>
              <span className="text-xs text-text-secondary bg-surface px-3 py-1.5 rounded-full">2026 йил</span>
            </div>
          </div>

          <div className="p-4 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <KPICard label="Режалашт." value="15,000" unit="та" color="text-navy" bg="bg-surface" />
              <KPICard label="Ажратилган" value="11,200" unit="та" color="text-success" bg="bg-success/10" />
              <KPICard label="Бажарилиш" value="74.7" unit="%" color="text-orange" bg="bg-orange/5" />
            </div>

            <div className="bg-surface rounded-xl p-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <div className="relative">
                  <PieChart width={130} height={130}>
                    <Pie data={householdPie} cx={65} cy={65} innerRadius={40} outerRadius={58} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                      {householdPie.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-xl font-bold text-success leading-none tabular-nums">74.7%</p>
                    <p className="text-xs text-text-secondary mt-0.5">бажарилди</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <GlassIcon icon="trending-up" color={COLORS.success} size="sm" />
                    <div>
                      <p className="text-base font-bold text-success">11,200 та</p>
                      <p className="text-xs text-text-secondary">Ажратилган пакетлар</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <GlassIcon icon="stats-chart" color={COLORS.navy} size="sm" />
                    <div>
                      <p className="text-base font-bold text-success">142.5 млрд</p>
                      <p className="text-xs text-text-secondary">Кредитлар суммаси</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <GlassIcon icon="storefront" color={COLORS.orange} size="sm" />
                    <div>
                      <p className="text-base font-bold text-success">2,800 та</p>
                      <p className="text-xs text-text-secondary">Очилган субъектлар</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Вилоятлар</p>
                <button className="text-xs text-navy-light hover:underline font-medium">Барчаси →</button>
              </div>
              {d.householdIncome.regions.map((r, i) => (
                <RegionRow key={r.id} name={r.name} values={[r.plan, r.actual]} percentage={r.pct} isLast={i === d.householdIncome.regions.length - 1} />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-border-light/50">
              <div className="text-center">
                <p className="text-base font-bold text-success tabular-nums">9,500</p>
                <p className="text-xs text-text-secondary">Кредитлар сони</p>
              </div>
              <div className="text-center border-x border-border-light/50">
                <p className="text-base font-bold text-success/70 tabular-nums">3,500</p>
                <p className="text-xs text-text-secondary">Режалаштирилган</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-success tabular-nums">2,800</p>
                <p className="text-xs text-text-secondary">Амалда очилган</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Helper Components ============ */

function SummaryCard({
  icon, iconColor, label, value, sub, trend, trendUp, sparkColor, sparkId, valueColor, activeTooltipIndex,
}: {
  icon: string; iconColor: string; label: string; value: string; sub: string;
  trend: string; trendUp: boolean; sparkColor: string; sparkId: string; valueColor?: string;
  activeTooltipIndex?: number;
}) {
  const mini = trendData.slice(-6);
  return (
    <div className="bg-white rounded-xl border border-border-light shadow-layered p-4 transition-shadow group">
      <div className="flex items-start justify-between mb-3">
        <GlassIcon icon={icon as any} color={iconColor} size="sm" />
        <span className="flex items-center gap-1 text-xs font-semibold text-success bg-success/10 rounded-full px-2.5 py-0.5">
          <Icon name="trending-up" size={11} />
          {trend}
        </span>
      </div>
      <p className="text-xl sm:text-2xl md:text-[30px] font-bold leading-none tracking-tight tabular-nums" style={{ color: valueColor || COLORS.navy }}>{value}</p>
      <p className="text-xs text-text-secondary mt-1">{sub}</p>
      <p className="text-xs font-semibold text-text-label uppercase tracking-wider mt-0.5">{label}</p>
      <div className="mt-2 -mx-1" style={{ width: "calc(100% + 8px)", height: 32 }}>
        <ResponsiveContainer width="100%" height={32}>
          <AreaChart data={mini} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`spark-${sparkId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={sparkColor} stopOpacity={0.2} />
                <stop offset="95%" stopColor={sparkColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              defaultIndex={activeTooltipIndex}
              contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #e2e8f0", padding: "6px 10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
              labelFormatter={(_l, payload) => {
                const month = payload?.[0]?.payload?.m;
                const full: Record<string, string> = { "Янв": "Январ", "Фев": "Феврал", "Мар": "Март", "Апр": "Апрел", "Май": "Май", "Июн": "Июн", "Июл": "Июл", "Авг": "Август", "Сен": "Сентябр", "Окт": "Октябр", "Ноя": "Ноябр", "Дек": "Декабр" };
                return `2026 йил, ${full[month] || month || _l}`;
              }}
              formatter={(v) => [`${Number(v).toLocaleString("en-US")} та`, label]}
              cursor={{ stroke: sparkColor, strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Area type="monotone" dataKey="v" stroke={sparkColor} strokeWidth={1.5} fill={`url(#spark-${sparkId})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function KPICard({ label, value, unit, color, bg }: {
  label: string; value: string; unit: string; color: string; bg: string;
}) {
  return (
    <div className={`${bg} rounded-xl p-3.5 text-center border border-border-subtle`}>
      <p className="text-xs font-semibold text-text-label uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-lg sm:text-2xl font-bold ${color} leading-none tabular-nums`}>{value}</p>
      <p className="text-xs text-text-secondary mt-0.5">{unit}</p>
    </div>
  );
}
