"use client";

import { type IconName } from "@/components/atoms/Icon";
import { DashboardQuadrant } from "@/components/organisms/DashboardQuadrant";
import { StatCard } from "@/components/atoms/StatCard";
import { ProgressRing } from "@/components/atoms/ProgressRing";
import { RegionRow } from "@/components/molecules/RegionRow";
import { infrastructureData } from "@/lib/mock-data";

const icons: IconName[] = ["construct", "hammer", "layers", "business"];

export default function InfrastructurePage() {
  const sections = [
    infrastructureData.oghirMahalla,
    infrastructureData.oghirTuman,
    infrastructureData.yangiMahalla,
    infrastructureData.yangiTuman,
  ];

  return (
    <div className="stagger-children">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-navy">Инфратузилма лойиҳалари</h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Инфратузилма қурилиш объектлари мониторинги
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {sections.map((section, idx) => (
          <DashboardQuadrant
            key={idx}
            title={section.title}
            icon={icons[idx]}
            subtitle="Режа / Амалда йил бошидан"
          >
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  label="Қурилиш объектлари сони"
                  value={section.totalObjects.toLocaleString()}
                  icon={icons[idx]}
                />
                <StatCard
                  label="Қурилган объектлар сони"
                  value={section.builtObjects.toLocaleString()}
                  icon={icons[idx]}
                  variant="accent"
                  trend="up"
                  trendValue={`${section.percentage}%`}
                />
              </div>

              <div className="bg-surface rounded-xl p-3 sm:p-4 flex items-center justify-center gap-3 sm:gap-6">
                <div className="text-center">
                  <p className="text-xl sm:text-3xl font-bold text-navy">
                    {section.builtObjects.toLocaleString()}
                  </p>
                  <p className="text-xs text-text-secondary">Қурилган</p>
                </div>
                <ProgressRing value={section.percentage} size="md" color="#2b8cee" />
                <div className="text-center">
                  <p className="text-lg font-bold text-text-secondary">
                    {section.totalObjects.toLocaleString()}
                  </p>
                  <p className="text-xs text-text-secondary">Жами</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Вилоятлар бўйича</p>
                {section.regions.map((r, i) => (
                  <RegionRow key={i} name={r.name} values={[r.total, r.built]} percentage={r.pct} isLast={i === section.regions.length - 1} />
                ))}
              </div>
            </div>
          </DashboardQuadrant>
        ))}
      </div>
    </div>
  );
}
