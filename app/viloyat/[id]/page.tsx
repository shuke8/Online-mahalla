"use client";

import { Icon, type IconName } from "@/components/atoms/Icon";
import { GlassIcon } from "@/components/atoms/GlassIcon";
import { IconCircle } from "@/components/atoms/IconCircle";
import { UzbekistanMap } from "@/components/organisms/UzbekistanMap";
import { KPIGroup } from "@/components/molecules/KPIGroup";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { NavigationBreadcrumb } from "@/components/molecules/NavigationBreadcrumb";
import { republicData } from "@/lib/mock-data";
import { use } from "react";

export default function ViloyatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const d = republicData;
  const regionName = "Жиззах вилояти";

  return (
    <div className="stagger-children">
      <NavigationBreadcrumb
        items={[
          { label: "Республика", href: "/respublika" },
          { label: regionName },
        ]}
      />

      <div className="bg-navy rounded-xl shadow-layered p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4">
            <GlassIcon icon="map" color="#2b8cee" size="md" onDark />
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">
                {regionName}да қарор ижроси бўйича қилинган ишлар
              </h1>
              <p className="text-sm text-white/70 mt-1">Вилоят даражасидаги мониторинг</p>
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
                { label: "Камбағал оилалар", plan: 48200, actual: 36500 },
                { label: "Хизматлар сони", plan: 32000, actual: 28000 },
                { label: "Инд. режалар", plan: 28000, actual: 24500 },
                { label: "Реестрдан чиқарилган", plan: 5200, actual: 4100 },
              ]}
              columns={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SectionCard title="Микролойиҳалар" icon="bulb" variant="navy" items={[
              { label: "Сони", plan: "320", actual: "298" },
              { label: "Иш ўринлари", plan: "960", actual: "845" },
              { label: "Кредитлар", plan: "245 та", actual: "3.8 млрд" },
            ]} />
            <SectionCard title="Тадбиркорлик" icon="briefcase" variant="navy" items={[
              { label: "Лойиҳалар", plan: "620", actual: "480" },
              { label: "Иш ўринлари", plan: "1,860", actual: "1,420" },
              { label: "Субъектлар", plan: "310", actual: "245" },
            ]} />
            <SectionCard title="Хонадон даромади" icon="home" variant="success" items={[
              { label: "Танланган", plan: "1,100", actual: "820" },
              { label: "Кредитлар", plan: "880", actual: "695" },
              { label: "Суммаси", plan: "13.2 млрд", actual: "10.4 млрд" },
            ]} />
          </div>
        </div>

        <div className="xl:col-span-2 order-first xl:order-none">
          <div className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5 xl:sticky xl:top-32">
            <h3 className="text-base font-semibold text-navy mb-4">Вилоят харитаси</h3>
            <UzbekistanMap data={d.regionMapData} selectedRegion={id} defaultHoveredRegion={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon, variant, items }: {
  title: string; icon: IconName; variant: "gold" | "navy" | "success";
  items: { label: string; plan: string; actual: string }[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <IconCircle icon={icon} variant={variant} size="sm" />
        <h3 className="text-base font-semibold text-navy">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-border-light/50 last:border-0">
            <span className="text-sm text-text-secondary">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-navy-light font-medium">{item.plan}</span>
              <span className="text-text-secondary/30">/</span>
              <span className="text-sm text-navy font-semibold">{item.actual}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
