"use client";

import { Icon, type IconName } from "@/components/atoms/Icon";
import { GlassIcon } from "@/components/atoms/GlassIcon";
import { StatCard } from "@/components/atoms/StatCard";
import { NavigationBreadcrumb } from "@/components/molecules/NavigationBreadcrumb";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { LocationSelector } from "@/components/molecules/LocationSelector";
import { DataTable } from "@/components/organisms/DataTable";
import { UzbekistanMap } from "@/components/organisms/UzbekistanMap";
import { EntrepreneurshipPrograms } from "@/components/organisms/EntrepreneurshipPrograms";
import { RadialGauge } from "@/components/organisms/RadialGauge";
import { DashboardQuadrant } from "@/components/organisms/DashboardQuadrant";
import { TaskCreateModal } from "@/components/organisms/TaskCreateModal";
import { mfyData, mfyList, mfyInfrastructure, republicData, mahallaYettiligi, type MfyStatus, type MfyInfraObject, type InfraWorkStatus } from "@/lib/mock-data";
import React, { use, useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function MFYPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const d = mfyData;
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const hokim = mahallaYettiligi.find((m) => m.role === "Ҳоким ёрдамчиси");
  const mfyStatus = mfyList.find((m) => m.id === id)?.status ?? "yangi";

  return (
    <div className="stagger-children">
      <div className="flex items-center justify-between [&_nav]:mb-0 mb-3 sm:mb-5">
        <NavigationBreadcrumb
          items={[
            { label: "Республика", href: "/respublika" },
            { label: "Жиззах вилояти", href: "/viloyat/jizzakh" },
            { label: "Жиззах шаҳри", href: "/tuman/jizzakh-city" },
            { label: d.name },
          ]}
        />
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {[
            { label: "Хонадон", value: d.stats.households },
            { label: "Аҳоли", value: d.stats.population },
            { label: "Оила", value: d.stats.families },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5 bg-white border border-border-light rounded-lg px-3 py-1.5 shadow-sm">
              <span className="text-[11px] text-text-secondary font-medium">{s.label}:</span>
              <span className="text-sm font-bold text-navy">{s.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-navy rounded-xl shadow-layered p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4">
            <GlassIcon icon="home" color="#2b8cee" size="md" onDark />
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">
                {d.name}да қарор ижроси бўйича қилинган ишлар
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="text-sm text-white/70">МФЙ даражасидаги батафсил маълумотлар</span>
                <MfyStatusBadge status={mfyStatus} />
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/15 rounded-full px-3.5 py-2">
            <Icon name="time" className="text-white/80" size={15} />
            <span className="text-sm font-medium text-white/90">2026 йил 22-Март</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-col items-center gap-1 bg-white/10 rounded-xl px-3 py-3">
            <span className="text-white/60 text-[11px] font-medium uppercase tracking-wider">Хонадон</span>
            <span className="text-white font-bold text-xl sm:text-2xl leading-none">{d.stats.households.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-white/10 rounded-xl px-3 py-3">
            <span className="text-white/60 text-[11px] font-medium uppercase tracking-wider">Аҳоли</span>
            <span className="text-white font-bold text-xl sm:text-2xl leading-none">{d.stats.population.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-white/10 rounded-xl px-3 py-3">
            <span className="text-white/60 text-[11px] font-medium uppercase tracking-wider">Оила</span>
            <span className="text-white font-bold text-xl sm:text-2xl leading-none">{d.stats.families.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
        <div className="xl:col-span-3 space-y-4 sm:space-y-6">
          {/* 0: Infrastructure — type-driven */}
          <MfyInfraSection status={mfyStatus} />

          {/* 1: Poverty Reduction */}
          <MFYSection title="Камбағалликни қисқартириш" icon="people" iconVariant="navy" accent="border-l-navy"
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
            ]} data={d.povertyReduction.table} rowHref={(row) => `/mfy/${id}/citizen/${row.id}`} fioHref={(row) => `/mfy/${id}/individual-plan/${row.id}`} />
          </MFYSection>

          {/* 2: Microprojects */}
          <MFYSection title="Микролойиҳалар" icon="bulb" iconVariant="navy" accent="border-l-orange"
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
            ]} data={d.microprojects.table} rowHref={(row) => `/mfy/${id}/microproject/${row.id}`} fioHref={(row) => `/mfy/${id}/individual-plan/${row.id}`} />
          </MFYSection>

          {/* 3: Entrepreneurship — 4 credit programs */}
          <EntrepreneurshipPrograms programs={d.entrepreneurshipPrograms} />

          {/* 4: Household Income */}
          <MFYSection title="Хонадон даромади" icon="wallet" iconVariant="success" accent="border-l-success"
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
            ]} data={d.householdIncome.table} rowHref={(row) => `/mfy/${id}/household/${row.id}`} fioHref={(row) => `/mfy/${id}/individual-plan/${row.id}`} />
          </MFYSection>

          {/* 5: Subsidies */}
          <MFYSection title="Ажратилган субсидия, грант/ссудалар" icon="document-text" iconVariant="warning" accent="border-l-warning"
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
            ]} data={d.subsidies.table} rowHref={(row) => `/mfy/${id}/subsidy/${row.id}`} fioHref={(row) => `/mfy/${id}/individual-plan/${row.id}`} />
          </MFYSection>

          {/* 6: Legalization */}
          <MFYSection title="Легаллаштириш" icon="scale" iconVariant="danger" accent="border-l-danger"
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
            ]} data={d.legalization.table} rowHref={(row) => `/mfy/${id}/legalization/${row.id}`} fioHref={(row) => `/mfy/${id}/individual-plan/${row.id}`} />
          </MFYSection>
        </div>

        {/* Sidebar: map + yettilik — mobile/tablet da yuqorida */}
        <div className="xl:col-span-1 order-first xl:order-none">
          <div className="xl:sticky xl:top-[6.75rem] xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto space-y-4">
          <div className="bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-4 space-y-4">
            <UzbekistanMap data={republicData.regionMapData} selectedRegion="jizzakh" defaultHoveredRegion="jizzakh" />
            <div className="p-3 bg-navy-lighter/30 rounded-lg">
              <p className="text-sm font-semibold text-navy">{d.name}</p>
              <p className="text-xs text-text-secondary mt-0.5">Жиззах шаҳри, Жиззах вилояти</p>
            </div>
            <LocationSelector title="МФЙни танланг" items={mfyList} activeId={id} basePath="/mfy" />
          </div>

          {/* Mahalla Yettiligi */}
          <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border-light/60 bg-navy/[0.03]">
              <SectionHeader title="Маҳалла еттилиги масъуллари" icon="people" iconVariant="navy" />
              <p className="text-xs text-text-secondary mt-1">7 нафар масъул ходим</p>
            </div>
            <div className="divide-y divide-border-light/40">
              {mahallaYettiligi.map((member, idx) => {
                const isEmpty = !member.fio;
                const initials = member.fio
                  ? member.fio.split(" ").slice(0, 2).map((w: string) => w[0]).join("")
                  : "";
                return (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 px-3 py-3 hover:bg-navy-lighter/30 transition-colors group"
                  >
                    {/* Passport-style avatar */}
                    {isEmpty ? (
                      <div className="w-[56px] h-[72px] rounded-lg bg-border-light/50 border border-dashed border-border-light flex items-center justify-center shrink-0">
                        <Icon name="people" size={20} className="text-text-secondary/30" />
                      </div>
                    ) : (
                      <div className="w-[56px] h-[72px] rounded-lg overflow-hidden shrink-0 ring-2 ring-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] bg-[#f0f0f0]">
                        <MemberAvatar avatar={member.avatar} fio={member.fio} initials={initials} colors={{ from: "#2b8cee", to: "#2b8cee" }} />
                      </div>
                    )}

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-bold text-navy/60 uppercase tracking-widest leading-none mb-1">
                        {member.role}
                      </p>
                      {isEmpty ? (
                        <p className="text-xs font-medium text-warning">Танлов жараёнида</p>
                      ) : (
                        <>
                          <p className="text-[13px] font-semibold text-text-primary leading-snug"
                            style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {member.fio}
                          </p>
                          <a href={`tel:${member.phone.replace(/\s/g, "")}`}
                            className="text-[11px] text-text-secondary hover:text-navy transition-colors mt-1 block">
                            {member.phone}
                          </a>
                        </>
                      )}
                    </div>

                    {/* Index */}
                    <span className="text-[11px] font-semibold text-border-light group-hover:text-navy/30 transition-colors shrink-0 w-5 text-right">
                      {idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Topshiriq yaratish CTA */}
          <button
            type="button"
            onClick={() => setTaskModalOpen(true)}
            className="group relative w-full flex items-center justify-center gap-2.5 rounded-2xl bg-navy hover:bg-navy-light text-white font-semibold text-sm py-3.5 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            Топшириқ яратиш
          </button>
          </div>
        </div>
      </div>

      <TaskCreateModal
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        mfyName={d.name}
        tumanName="Жиззах шаҳри"
        hokimYordamchisi={hokim && hokim.fio ? { fio: hokim.fio, phone: hokim.phone } : undefined}
      />
    </div>
  );
}

function MFYSection({ title, icon, iconVariant, accent, kpis, children }: {
  title: string; icon: IconName; iconVariant: "navy" | "gold" | "success" | "warning" | "danger";
  accent?: string; kpis: { label: string; plan: number; actual: number }[]; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const topBorderMap: Record<string, string> = {
    "border-l-navy": "border-t-navy",
    "border-l-orange": "border-t-orange",
    "border-l-purple": "border-t-purple",
    "border-l-success": "border-t-success",
    "border-l-warning": "border-t-warning",
    "border-l-danger": "border-t-danger",
  };
  const topBorder = topBorderMap[accent || "border-l-navy"] || "border-t-navy";

  const kpiBlock = (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-3">
      {kpis.map((kpi, i) => (
        <div key={i} className="bg-[#F7F7F7] rounded-xl p-4 sm:p-5 border border-border-subtle">
          <span className="text-sm font-semibold text-text-label uppercase tracking-wider block mb-3 leading-tight">{kpi.label}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-navy/10 px-2.5 py-1 text-sm font-medium text-navy-light">Режа</span>
              <span className="text-base sm:text-lg font-bold text-navy">{kpi.plan}</span>
            </div>
            <span className="text-text-secondary/30">|</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-success/10 px-2.5 py-1 text-sm font-medium text-success">Амалда</span>
              <span className="text-base sm:text-lg font-bold text-navy">{kpi.actual}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className={`bg-white rounded-2xl border border-border-light border-l-4 ${accent || "border-l-navy"} shadow-sm hover:shadow-md transition-shadow overflow-clip`}>
        <div className="sticky top-[6.75rem] z-20 bg-white rounded-tl-2xl rounded-tr-2xl p-3 sm:p-5 border-b border-border-light/50">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <SectionHeader title={title} icon={icon} iconVariant={iconVariant} />
            </div>
            <button
              onClick={() => setOpen(true)}
              title="Кенгайтириш"
              className="shrink-0 mt-0.5 flex items-center gap-1.5 rounded-lg border border-border-light bg-surface hover:bg-navy hover:text-white hover:border-navy text-text-secondary px-2.5 py-1.5 text-xs font-medium transition-all duration-200 group"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
              <span className="hidden sm:inline">Кенгайтириш</span>
            </button>
          </div>
          {kpiBlock}
        </div>
        <div className="p-3 sm:p-5">{children}</div>
      </div>

      {open && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col border-t-4 ${topBorder} overflow-hidden`}>
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border-light shrink-0 bg-white">
              <SectionHeader title={title} icon={icon} iconVariant={iconVariant} />
              <button
                onClick={() => setOpen(false)}
                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border border-border-light bg-surface hover:bg-danger/10 hover:border-danger/30 hover:text-danger text-text-secondary transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5">
              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {kpis.map((kpi, i) => (
                  <div key={i} className="bg-[#F7F7F7] rounded-xl p-4 sm:p-5 border border-border-subtle">
                    <span className="text-sm font-semibold text-text-label uppercase tracking-wider block mb-3 leading-tight">{kpi.label}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-navy/10 px-2.5 py-1 text-sm font-medium text-navy-light">Режа</span>
                        <span className="text-lg font-bold text-navy">{kpi.plan}</span>
                      </div>
                      <span className="text-text-secondary/30">|</span>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-success/10 px-2.5 py-1 text-sm font-medium text-success">Амалда</span>
                        <span className="text-lg font-bold text-navy">{kpi.actual}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Full table without height restriction */}
              <div>
                {React.isValidElement(children)
                  ? React.cloneElement(children as React.ReactElement<{ maxHeight?: string }>, { maxHeight: "none" })
                  : children}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function MemberAvatar({
  avatar, fio, initials, colors,
}: {
  avatar: string; fio: string; initials: string; colors: { from: string; to: string };
}) {
  const [imgFailed, setImgFailed] = React.useState(false);

  if (imgFailed || !avatar) {
    return (
      <div
        className="w-full h-full rounded-[9px] flex items-center justify-center text-white font-bold text-base select-none"
        style={{ background: colors.from }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={avatar}
      alt={fio}
      className="w-full h-full rounded-[9px] object-cover"
      onError={() => setImgFailed(true)}
    />
  );
}

function MfyStatusBadge({ status }: { status: MfyStatus }) {
  if (status === "yangi") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-success/25 to-success/15 border border-success/40 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.39 7.36H22l-6.2 4.5 2.37 7.14L12 16.77 5.83 21l2.37-7.14L2 9.36h7.61L12 2z" fill="#86efac" fillOpacity="0.9" />
        </svg>
        Янги Ўзбекистон қиёфасидаги маҳалла
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-danger/30 to-danger/15 border border-danger/50 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fecaca" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#fecaca" fillOpacity="0.9" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="#7f1d1d" />
        <line x1="12" y1="17" x2="12.01" y2="17" stroke="#7f1d1d" />
      </svg>
      Оғир маҳалла
    </span>
  );
}

// Palette mirrors infratuzilma page — Primary Azure for "ogir", Cyan-Teal for "yangi".
// Distinct hues so the two mahalla types read differently at a glance, both anchored
// to the dashboard cool family.
const MFY_INFRA_PALETTE = {
  ogir: {
    main: "#2b8cee",
    mainFrom: "#5fa7f3",
    mainTo: "#1d6fcb",
    secondary: "#0ea5e9",
    secFrom: "#38bdf8",
    secTo: "#0284c7",
  },
  yangi: {
    main: "#06b6d4",
    mainFrom: "#22d3ee",
    mainTo: "#0891b2",
    secondary: "#14b8a6",
    secFrom: "#5eead4",
    secTo: "#0d9488",
  },
} as const;

function MfyInfraSection({ status }: { status: MfyStatus }) {
  const section = mfyInfrastructure[status];
  const palette = MFY_INFRA_PALETTE[status];
  const icon: IconName = status === "ogir" ? "construct" : "layers";

  return (
    <DashboardQuadrant
      title={section.title}
      icon={icon}
      subtitle="Режа / Амалда йил бошидан"
    >
      <div className="space-y-5">
        {/* Section heading */}
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

        {/* Pipeline gauges */}
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

        {/* Objects & their repair plan */}
        {section.objects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="hammer" size={13} variant="Bold" className="text-text-secondary/60" />
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                Объектлар ва таъмирлаш режаси
              </p>
              <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-navy/[0.08] px-1.5 text-[10.5px] font-bold text-navy">
                {section.objects.length}
              </span>
            </div>
            <div className="space-y-2">
              {section.objects.map((obj) => (
                <InfraObjectCard key={obj.id} object={obj} accent={palette.main} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardQuadrant>
  );
}

// ============================================================
// INFRA OBJECT CARD — one object + its checklist of planned works
// ============================================================
const OBJECT_TYPE_ICON: Record<MfyInfraObject["type"], IconName> = {
  culture: "building-3",
  school: "book",
  road: "map",
  kindergarten: "people",
  clinic: "shield-tick",
  park: "tree",
  sport: "medal",
};

const WORK_STATUS_CONFIG: Record<
  InfraWorkStatus,
  { label: string; text: string; bg: string; icon: IconName }
> = {
  done: { label: "Бажарилди", text: "text-success", bg: "bg-success/10", icon: "tick-circle" },
  in_progress: { label: "Жараёнда", text: "text-warning", bg: "bg-warning/10", icon: "refresh" },
  pending: { label: "Режада", text: "text-text-secondary", bg: "bg-border-light/70", icon: "time" },
};

function InfraObjectCard({ object, accent }: { object: MfyInfraObject; accent: string }) {
  const [open, setOpen] = useState(false);
  const total = object.plan.length;
  const done = object.plan.filter((p) => p.status === "done").length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const icon = OBJECT_TYPE_ICON[object.type] ?? "building-3";

  return (
    <div className="rounded-lg border border-border-light/70 bg-surface/40 overflow-hidden transition-colors hover:border-border-light">
      {/* Compact header — bosilganда режа очилади */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 px-2.5 py-2 text-left transition-colors hover:bg-surface/60"
      >
        <span
          className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg"
          style={{ backgroundColor: `${accent}14`, color: accent }}
        >
          <Icon name={icon} size={14} variant="Bold" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-semibold text-text-primary leading-tight">{object.name}</p>
          <div className="mt-1 h-1 bg-border-light/70 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: `linear-gradient(to right, ${accent}cc, ${accent})` }}
            />
          </div>
        </div>
        <span className="shrink-0 text-[10.5px] font-bold tabular-nums" style={{ color: accent }} title="Бажарилган ишлар">
          {done}/{total}
        </span>
        <Icon
          name="chevron-down"
          size={14}
          className={`shrink-0 text-text-secondary/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Очилганда — manzil + Режа checklist */}
      {open && (
        <div className="px-2.5 pb-2.5">
          <p className="mb-2 flex items-center gap-1 border-t border-border-light/50 pt-2 text-[10.5px] text-text-secondary">
            <Icon name="location" size={10} className="text-text-secondary/60" />
            {object.address}
          </p>
          <ul className="space-y-1">
            {object.plan.map((item, i) => {
              const st = WORK_STATUS_CONFIG[item.status] ?? WORK_STATUS_CONFIG.pending;
              const isDone = item.status === "done";
              return (
                <li key={i} className="flex items-center gap-2">
                  <Icon name={st.icon} size={13} variant="Bold" className={`${st.text} shrink-0`} />
                  <span
                    className={`flex-1 min-w-0 truncate text-[11.5px] ${
                      isDone ? "text-text-secondary line-through decoration-text-secondary/30" : "text-text-primary"
                    }`}
                  >
                    {item.work}
                  </span>
                  <span
                    className={`shrink-0 inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${st.bg} ${st.text}`}
                  >
                    {st.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
