"use client";

import { Icon } from "@/components/atoms/Icon";
import { GlassIcon } from "@/components/atoms/GlassIcon";
import { IconCircle } from "@/components/atoms/IconCircle";
import { UzbekistanMap } from "@/components/organisms/UzbekistanMap";
import { EntrepreneurshipPrograms } from "@/components/organisms/EntrepreneurshipPrograms";
import { InfrastructureSection } from "@/components/organisms/InfrastructureSection";
import { KPIGroup } from "@/components/molecules/KPIGroup";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { NavigationBreadcrumb } from "@/components/molecules/NavigationBreadcrumb";
import { republicData } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

export default function RepublicPage() {
  const d = republicData;
  const router = useRouter();

  return (
    <div className="stagger-children">
      <NavigationBreadcrumb items={[{ label: "Республика" }]} />

      {/* Header Banner */}
      <div className="bg-navy rounded-xl shadow-layered p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4">
            <GlassIcon icon="globe" color="#2b8cee" size="md" onDark />
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">
                Республика бўйича қарор ижроси бўйича қилинган ишлар
              </h1>
              <p className="text-sm text-white/70 mt-1">
                Камбағалликни қисқартириш дастури мониторинги
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/15 rounded-full px-3.5 py-2">
            <Icon name="time" className="text-white/80" size={15} />
            <span className="text-sm font-medium text-white/90">2026 йил 22-Март</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
        {/* Left: KPI Panels */}
        <div className="xl:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl border border-border-light border-l-4 border-l-navy shadow-sm hover:shadow-md transition-shadow p-3 sm:p-5">
            <SectionHeader title="Камбағалликни қисқартириш" icon="people" iconVariant="navy" />
            <KPIGroup
              items={[
                { label: "Камбағал оилалар сони", plan: d.povertyReduction.poorFamilies.plan, actual: d.povertyReduction.poorFamilies.actual },
                { label: "Бириктирилган хизматлар", plan: d.povertyReduction.services.plan, actual: d.povertyReduction.services.actual },
                { label: "Тасдиқланган инд. режалар", plan: d.povertyReduction.individualPlans.formed, actual: d.povertyReduction.individualPlans.approved },
                { label: "Реестрдан чиқарилганлар", plan: d.povertyReduction.removedFromRegistry.families, actual: d.povertyReduction.removedFromRegistry.citizens },
              ]}
              columns={2}
              size="lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Microprojects */}
            <div className="bg-white rounded-2xl border border-border-light border-l-4 border-l-orange shadow-sm hover:shadow-md transition-shadow p-3 sm:p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <IconCircle icon="bulb" variant="navy" size="sm" />
                <h3 className="text-base font-semibold text-navy">Микролойиҳалар</h3>
              </div>
              <div className="space-y-3">
                <KPIItem label="Сони" plan={d.microprojects.count.plan} actual={d.microprojects.count.actual} />
                <KPIItem label="Иш ўринлари" plan={d.microprojects.jobs.formed} actual={d.microprojects.jobs.launched} />
                <KPIItem label="Кредитлар" plan={`${d.microprojects.credits.count} та`} actual={`${d.microprojects.credits.sum} млрд`} />
              </div>
            </div>

            {/* Household */}
            <div className="bg-white rounded-2xl border border-border-light border-l-4 border-l-success shadow-sm hover:shadow-md transition-shadow p-3 sm:p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <IconCircle icon="home" variant="success" size="sm" />
                <h3 className="text-base font-semibold text-navy">Хонадон даромади</h3>
              </div>
              <div className="space-y-3">
                <KPIItem label="Танланган" plan={d.householdIncome.selected.plan} actual={d.householdIncome.selected.actual} />
                <KPIItem label="Кредитлар" plan={d.householdIncome.credits.plan} actual={d.householdIncome.credits.actual} />
                <KPIItem label="Суммаси" plan={`${d.householdIncome.creditSum.plan} млрд`} actual={`${d.householdIncome.creditSum.actual} млрд`} />
                <KPIItem label="Субъектлар" plan={d.householdIncome.subjects.plan} actual={d.householdIncome.subjects.actual} />
              </div>
            </div>
          </div>

          {/* Entrepreneurship — 4 credit programs */}
          <EntrepreneurshipPrograms programs={d.entrepreneurshipPrograms} />
        </div>

        {/* Right: Map — mobile/tablet da yuqorida, desktop da o'ng tomonda */}
        <div className="xl:col-span-2 order-first xl:order-none">
          <div className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5 xl:sticky xl:top-32">
            <h3 className="text-base font-semibold text-navy mb-4">Ўзбекистон Республикаси харитаси</h3>
            <UzbekistanMap data={d.regionMapData} onRegionClick={(id) => router.push(`/viloyat/${id}`)} defaultHoveredRegion="samarqand" />
          </div>
        </div>
      </div>

      {/* Инфратузилма лойиҳалари */}
      <div className="mt-5 sm:mt-6">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-navy">Инфратузилма лойиҳалари</h2>
          <p className="text-sm text-text-secondary mt-0.5">
            Инфратузилма қурилиш объектлари мониторинги
          </p>
        </div>
        <InfrastructureSection />
      </div>
    </div>
  );
}

function KPIItem({ label, plan, actual }: { label: string; plan: number | string; actual: number | string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border-light/50 last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <div className="flex items-center gap-2.5">
        <span className="text-sm sm:text-base text-navy-light font-medium">
          {typeof plan === "number" ? plan.toLocaleString() : plan}
        </span>
        <span className="text-text-secondary/30">/</span>
        <span className="text-sm sm:text-base text-navy font-bold">
          {typeof actual === "number" ? actual.toLocaleString() : actual}
        </span>
      </div>
    </div>
  );
}
