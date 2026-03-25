"use client";

import { Icon } from "@/components/atoms/Icon";
import { GlassIcon } from "@/components/atoms/GlassIcon";
import { IconCircle } from "@/components/atoms/IconCircle";
import { UzbekistanMap } from "@/components/organisms/UzbekistanMap";
import { KPIGroup } from "@/components/molecules/KPIGroup";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { NavigationBreadcrumb } from "@/components/molecules/NavigationBreadcrumb";
import { LocationSelector } from "@/components/molecules/LocationSelector";
import { republicData, tumanList } from "@/lib/mock-data";
import { use } from "react";

export default function TumanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const activeTuman = tumanList.find((t) => t.id === id);
  const tumanName = activeTuman?.name ?? "Жиззах шаҳри";

  return (
    <div className="stagger-children">
      <NavigationBreadcrumb
        items={[
          { label: "Республика", href: "/respublika" },
          { label: "Жиззах вилояти", href: "/viloyat/jizzakh" },
          { label: tumanName },
        ]}
      />

      <div className="bg-navy rounded-xl shadow-layered p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4">
            <GlassIcon icon="location" color="#2b8cee" size="md" onDark />
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">
                {tumanName}да қарор ижроси бўйича қилинган ишлар
              </h1>
              <p className="text-sm text-white/70 mt-1">Туман даражасидаги мониторинг</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/15 rounded-full px-3.5 py-2">
            <Icon name="time" className="text-white/80" size={15} />
            <span className="text-sm font-medium text-white/90">2026 йил 22-Март</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
        <div className="xl:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5">
            <SectionHeader title="Камбағалликни қисқартириш" icon="people" />
            <KPIGroup
              items={[
                { label: "Камбағал оилалар", plan: 8200, actual: 6500 },
                { label: "Хизматлар сони", plan: 5400, actual: 4800 },
                { label: "Инд. режалар", plan: 4800, actual: 4200 },
                { label: "Реестрдан чиқарилган", plan: 920, actual: 780 },
              ]}
              columns={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <IconCircle icon="bulb" variant="navy" size="sm" />
                <h3 className="text-base font-semibold text-navy">Микролойиҳалар</h3>
              </div>
              <div className="space-y-3">
                <KPIRow label="Сони" plan="52" actual="48" />
                <KPIRow label="Иш ўринлари" plan="156" actual="138" />
                <KPIRow label="Кредитлар" plan="42 та" actual="620 млн" />
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <IconCircle icon="briefcase" variant="navy" size="sm" />
                <h3 className="text-base font-semibold text-navy">Тадбиркорлик</h3>
              </div>
              <div className="space-y-3">
                <KPIRow label="Лойиҳалар" plan="98" actual="76" />
                <KPIRow label="Иш ўринлари" plan="294" actual="225" />
                <KPIRow label="Субъектлар" plan="48" actual="38" />
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <IconCircle icon="home" variant="success" size="sm" />
                <h3 className="text-base font-semibold text-navy">Хонадон даромади</h3>
              </div>
              <div className="space-y-3">
                <KPIRow label="Танланган" plan="180" actual="142" />
                <KPIRow label="Кредитлар" plan="145" actual="118" />
                <KPIRow label="Суммаси" plan="2.2 млрд" actual="1.8 млрд" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: map + dropdown — mobile/tablet da yuqorida */}
        <div className="xl:col-span-2 order-first xl:order-none">
          <div className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5 xl:sticky xl:top-32 space-y-4">
            <UzbekistanMap data={republicData.regionMapData} selectedRegion="jizzakh" defaultHoveredRegion="jizzakh" />
            <LocationSelector title="Туманни танланг" items={tumanList} activeId={id} basePath="/tuman" />
          </div>
        </div>
      </div>
    </div>
  );
}

function KPIRow({ label, plan, actual }: { label: string; plan: string; actual: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border-light/50 last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-navy-light font-medium">{plan}</span>
        <span className="text-text-secondary/30">/</span>
        <span className="text-sm text-navy font-semibold">{actual}</span>
      </div>
    </div>
  );
}
