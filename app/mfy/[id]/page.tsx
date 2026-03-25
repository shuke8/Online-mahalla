"use client";

import { Icon, type IconName } from "@/components/atoms/Icon";
import { GlassIcon } from "@/components/atoms/GlassIcon";
import { NavigationBreadcrumb } from "@/components/molecules/NavigationBreadcrumb";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { LocationSelector } from "@/components/molecules/LocationSelector";
import { DataTable } from "@/components/organisms/DataTable";
import { UzbekistanMap } from "@/components/organisms/UzbekistanMap";
import { mfyData, mfyList, republicData, mahallaYettiligi } from "@/lib/mock-data";
import { use } from "react";

export default function MFYPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const d = mfyData;

  return (
    <div className="stagger-children">
      <NavigationBreadcrumb
        items={[
          { label: "Республика", href: "/respublika" },
          { label: "Жиззах вилояти", href: "/viloyat/jizzakh" },
          { label: "Жиззах шаҳри", href: "/tuman/jizzakh-city" },
          { label: d.name },
        ]}
      />

      <div className="bg-navy rounded-xl shadow-layered p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4">
            <GlassIcon icon="home" color="#2b8cee" size="md" onDark />
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">
                {d.name}да қарор ижроси бўйича қилинган ишлар
              </h1>
              <p className="text-sm text-white/70 mt-1">МФЙ даражасидаги батафсил маълумотлар</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/15 rounded-full px-3.5 py-2">
            <Icon name="time" className="text-white/80" size={15} />
            <span className="text-sm font-medium text-white/90">2026 йил 22-Март</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
        <div className="xl:col-span-3 space-y-4 sm:space-y-6">
          {/* 1: Poverty Reduction */}
          <MFYSection title="Камбағалликни қисқартириш" icon="people" iconVariant="navy"
            kpis={[
              { label: "Камбағал оилалар", plan: d.povertyReduction.kpiPlan.families, actual: d.povertyReduction.kpiActual.families },
              { label: "Хизматлар сони", plan: d.povertyReduction.kpiPlan.services, actual: d.povertyReduction.kpiActual.services },
              { label: "Инд. режалар", plan: d.povertyReduction.kpiPlan.plans, actual: d.povertyReduction.kpiActual.plans },
            ]}>
            <DataTable columns={[
              { key: "id", label: "Т/р", width: "50px" },
              { key: "fio", label: "Оила раҳбари Ф.И.О." },
              { key: "indPlan", label: "Инд. режа" },
              { key: "services", label: "Бириктирилган хизматлар" },
              { key: "executed", label: "Ижро қилинган хизматлар" },
            ]} data={d.povertyReduction.table} />
          </MFYSection>

          {/* 2: Microprojects */}
          <MFYSection title="Микролойиҳалар" icon="bulb" iconVariant="navy"
            kpis={[
              { label: "Микролойиҳалар", plan: d.microprojects.kpiPlan.count, actual: d.microprojects.kpiActual.count },
              { label: "Иш ўринлари", plan: d.microprojects.kpiPlan.jobs, actual: d.microprojects.kpiActual.jobs },
              { label: "Кредитлар", plan: d.microprojects.kpiPlan.credits, actual: d.microprojects.kpiActual.credits },
            ]}>
            <DataTable columns={[
              { key: "id", label: "Т/р", width: "50px" },
              { key: "fio", label: "Микролойиҳа эгаси Ф.И.О." },
              { key: "phone", label: "Телефон рақами" },
              { key: "status", label: "Ҳолати" },
              { key: "jobs", label: "Иш ўрни сони" },
            ]} data={d.microprojects.table} />
          </MFYSection>

          {/* 3: Entrepreneurship */}
          <MFYSection title="Тадбиркорлик лойиҳалари" icon="briefcase" iconVariant="navy"
            kpis={[
              { label: "Лойиҳалар", plan: d.entrepreneurship.kpiPlan.count, actual: d.entrepreneurship.kpiActual.count },
              { label: "Иш ўринлари", plan: d.entrepreneurship.kpiPlan.jobs, actual: d.entrepreneurship.kpiActual.jobs },
              { label: "Кредитлар", plan: d.entrepreneurship.kpiPlan.credits, actual: d.entrepreneurship.kpiActual.credits },
            ]}>
            <DataTable columns={[
              { key: "id", label: "Т/р", width: "50px" },
              { key: "fio", label: "Лойиҳа эгаси Ф.И.О." },
              { key: "phone", label: "Телефон рақами" },
              { key: "status", label: "Ҳолати" },
              { key: "jobs", label: "Иш ўрни сони" },
            ]} data={d.entrepreneurship.table} />
          </MFYSection>

          {/* 4: Household Income */}
          <MFYSection title="Хонадон даромади" icon="wallet" iconVariant="success"
            kpis={[
              { label: "Танланган", plan: d.householdIncome.kpiPlan.selected, actual: d.householdIncome.kpiActual.selected },
              { label: "Кредитлар", plan: d.householdIncome.kpiPlan.credits, actual: d.householdIncome.kpiActual.credits },
              { label: "Аризалар", plan: d.householdIncome.kpiPlan.applications, actual: d.householdIncome.kpiActual.applications },
            ]}>
            <DataTable columns={[
              { key: "id", label: "Т/р", width: "50px" },
              { key: "fio", label: "Танланган оила раҳбари" },
              { key: "phone", label: "Телефон рақами" },
              { key: "credit", label: "Кредит" },
              { key: "subsidy", label: "Субсидия" },
            ]} data={d.householdIncome.table} />
          </MFYSection>

          {/* 5: Subsidies */}
          <MFYSection title="Ажратилган субсидия, грант/ссудалар" icon="document-text" iconVariant="warning"
            kpis={[
              { label: "Субсидиялар", plan: d.subsidies.kpiPlan.subsidy, actual: d.subsidies.kpiActual.subsidy },
              { label: "Тавсия аризалар", plan: d.subsidies.kpiPlan.applications, actual: d.subsidies.kpiActual.applications },
              { label: "Келиб тушган", plan: d.subsidies.kpiPlan.received, actual: d.subsidies.kpiActual.received },
            ]}>
            <DataTable columns={[
              { key: "id", label: "Т/р", width: "50px" },
              { key: "fio", label: "Аризачи Ф.И.О." },
              { key: "phone", label: "Телефон рақами" },
              { key: "recommendation", label: "Тавсия" },
              { key: "certificate", label: "Далолатнома" },
            ]} data={d.subsidies.table} />
          </MFYSection>

          {/* 6: Legalization */}
          <MFYSection title="Легаллаштириш" icon="scale" iconVariant="danger"
            kpis={[
              { label: "Аниқланган", plan: d.legalization.kpiPlan.identified, actual: d.legalization.kpiActual.identified },
              { label: "Легаллаштирилган", plan: d.legalization.kpiPlan.legalized, actual: d.legalization.kpiActual.legalized },
              { label: "Ишга жойлашган", plan: d.legalization.kpiPlan.employed, actual: d.legalization.kpiActual.employed },
            ]}>
            <DataTable columns={[
              { key: "id", label: "Т/р", width: "50px" },
              { key: "fio", label: "Фуқаро Ф.И.О.си" },
              { key: "phone", label: "Телефон рақами" },
              { key: "direction", label: "Расмийлаштириш йўналиши" },
              { key: "status", label: "Ҳолати" },
            ]} data={d.legalization.table} />
          </MFYSection>
        </div>

        {/* Sidebar: map + yettilik — mobile/tablet da yuqorida */}
        <div className="xl:col-span-1 order-first xl:order-none space-y-4">
          <div className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-4 xl:sticky xl:top-32 z-10 space-y-4">
            <UzbekistanMap data={republicData.regionMapData} selectedRegion="jizzakh" defaultHoveredRegion="jizzakh" />
            <div className="p-3 bg-navy-lighter/30 rounded-lg">
              <p className="text-sm font-semibold text-navy">{d.name}</p>
              <p className="text-xs text-text-secondary mt-0.5">Жиззах шаҳри, Жиззах вилояти</p>
            </div>
            <LocationSelector title="МФЙни танланг" items={mfyList} activeId={id} basePath="/mfy" />
          </div>

          {/* Mahalla Yettiligi */}
          <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-border-light/50">
              <SectionHeader title="Маҳалла еттилиги" icon="people" iconVariant="navy" />
              <p className="text-xs text-text-secondary mt-1">7 нафар масъул ходим</p>
            </div>
            <div className="p-3 sm:p-4 space-y-3">
              {mahallaYettiligi.map((member) => (
                <div
                  key={member.id}
                  className="bg-surface/50 rounded-xl border border-border-light/50 p-3 hover:shadow-md hover:border-navy/20 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={member.avatar}
                      alt={member.fio}
                      className="w-10 h-10 rounded-full object-cover shrink-0 bg-gradient-to-br from-navy to-navy-light"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.display = "none";
                        el.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white font-bold text-sm shrink-0 hidden">
                      {member.fio.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center rounded-full bg-navy/10 px-2 py-0.5 text-[10px] font-bold text-navy uppercase tracking-wider">
                        {member.role}
                      </span>
                      <p className="text-sm font-semibold text-text-primary truncate mt-0.5">{member.fio}</p>
                      <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="text-xs text-navy-light hover:underline mt-0.5 block">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-2 leading-relaxed line-clamp-2">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MFYSection({ title, icon, iconVariant, kpis, children }: {
  title: string; icon: IconName; iconVariant: "navy" | "gold" | "success" | "warning" | "danger";
  kpis: { label: string; plan: number; actual: number }[]; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
      <div className="p-3 sm:p-5 border-b border-border-light/50">
        <SectionHeader title={title} icon={icon} iconVariant={iconVariant} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-3">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-surface/50 rounded-lg p-3 border border-border-light/50">
              <span className="text-xs text-text-secondary uppercase tracking-wider block mb-1">{kpi.label}</span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded bg-navy-lighter/40 px-1.5 py-0.5 text-xs font-medium text-navy-light">{kpi.plan}</span>
                <span className="text-text-secondary/30">/</span>
                <span className="inline-flex items-center rounded bg-success/10 px-1.5 py-0.5 text-xs font-medium text-success">{kpi.actual}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 sm:p-5">{children}</div>
    </div>
  );
}
