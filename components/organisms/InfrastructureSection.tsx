"use client";

import { type IconName, Icon } from "@/components/atoms/Icon";
import { DashboardQuadrant } from "@/components/organisms/DashboardQuadrant";
import { StatCard } from "@/components/atoms/StatCard";
import { RadialGauge } from "@/components/organisms/RadialGauge";
import { GroupedBarChart } from "@/components/organisms/GroupedBarChart";
import { INFRA_PALETTE, type InfraPalette } from "@/components/organisms/infrastructure-palette";
import { infrastructureData } from "@/lib/mock-data";

// ============================================================
// INFRASTRUCTURE CARD — one program (gauges + stats + bar chart)
// ============================================================
type InfraSection = typeof infrastructureData.oghirMahalla;

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
