"use client";

import Link from "next/link";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { DeviceFrame } from "@/components/mobile/DeviceFrame";
import IjaraModuleScreen from "@/components/mobile/IjaraModuleScreen";
import IjaraListScreen from "@/components/mobile/IjaraListScreen";
import ShartnomaScreen, { sampleContractForm } from "@/components/mobile/ShartnomaScreen";
import ShartnomaDocument from "@/components/mobile/ShartnomaDocument";
import { ijaraFamilies } from "@/lib/ijara-module-data";

export default function IjaraModuleDesignPreview() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#e9eef5]">
      {/* Canvas top bar */}
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
        <Link
          href="/infratuzilma"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Icon name="arrow-left" size={15} />
          Бошқарув панели
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-[14px] font-bold text-slate-900">
            Томорқа ижараси — модул дизайни
          </h1>
          <p className="truncate text-[11.5px] text-slate-500">
            Сўровнома + шартнома · Android телефон ва планшет · дизайн макети
          </p>
        </div>
        <Link
          href="/dizayn/sorovnoma"
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Icon name="note" size={14} variant="Bold" />
          Сўровнома
        </Link>
      </header>

      {/* Design canvas */}
      <div
        className="flex-1 overflow-auto p-6 sm:p-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100,116,139,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        {/* ── МОДУЛ КИРИШИ ── */}
        <SectionHeader
          icon="home"
          title="Модул кириши"
          subtitle="2 амал: сўровнома ва шартнома · count badge + статистика"
        />
        <div className="mb-12 flex flex-wrap items-start justify-center gap-10 sm:gap-14">
          <DeviceFrame variant="phone" label="Телефон · Модул кириши">
            <IjaraModuleScreen layout="phone" />
          </DeviceFrame>
          <DeviceFrame variant="tablet" label="Планшет · Модул кириши">
            <IjaraModuleScreen layout="tablet" />
          </DeviceFrame>
        </div>

        {/* ── СЎРОВНОМА РЎЙХАТИ ── */}
        <SectionHeader
          icon="note"
          title="Сўровнома рўйхати"
          subtitle="Оилани танлаш · қидирув + таб (кутилмоқда / ўтказилган)"
        />
        <div className="mb-12 flex flex-wrap items-start justify-center gap-10 sm:gap-14">
          <DeviceFrame variant="phone" label="Телефон · Кутилмоқда">
            <IjaraListScreen layout="phone" mode="survey" initialTab="pending" />
          </DeviceFrame>
          <DeviceFrame variant="phone" label="Телефон · Ўтказилган">
            <IjaraListScreen layout="phone" mode="survey" initialTab="done" />
          </DeviceFrame>
          <DeviceFrame variant="tablet" label="Планшет · Сўровнома рўйхати">
            <IjaraListScreen layout="tablet" mode="survey" initialTab="pending" />
          </DeviceFrame>
        </div>

        {/* ── ШАРТНОМА РЎЙХАТИ ── */}
        <SectionHeader
          icon="document-text"
          title="Шартнома рўйхати"
          subtitle="Фақат «ижарага рози» оилалар · яроқсизлар қидирувда сабаб билан"
        />
        <div className="mb-12 flex flex-wrap items-start justify-center gap-10 sm:gap-14">
          <DeviceFrame variant="phone" label="Телефон · Тайёр (яроқли)">
            <IjaraListScreen layout="phone" mode="contract" initialTab="ready" />
          </DeviceFrame>
          <DeviceFrame variant="phone" label="Телефон · Тузилган">
            <IjaraListScreen layout="phone" mode="contract" initialTab="done" />
          </DeviceFrame>
          <DeviceFrame variant="phone" label="Телефон · Қидирув (яроқсиз ҳам)">
            <IjaraListScreen layout="phone" mode="contract" initialTab="ready" initialQuery="МФЙ" />
          </DeviceFrame>
          <DeviceFrame variant="tablet" label="Планшет · Шартнома рўйхати">
            <IjaraListScreen layout="tablet" mode="contract" initialTab="ready" />
          </DeviceFrame>
        </div>

        {/* ── ШАРТНОМА ФОРМАСИ ── */}
        <SectionHeader
          icon="document-text"
          title="Шартнома формаси"
          subtitle="4 қадам: Берувчи (авто) → Олувчи → Шартлар → Якунлаш (биометрика + имзо)"
        />
        <div className="mb-12 flex flex-wrap items-start justify-center gap-8 sm:gap-12">
          <DeviceFrame variant="phone" label="1 · Ижарага берувчи (авто)">
            <ShartnomaScreen family={ijaraFamilies[0]} layout="phone" initialStep={0} />
          </DeviceFrame>
          <DeviceFrame variant="phone" label="2 · Ижарага олувчи">
            <ShartnomaScreen family={ijaraFamilies[0]} layout="phone" initialStep={1} />
          </DeviceFrame>
          <DeviceFrame variant="phone" label="3 · Ижара шартлари">
            <ShartnomaScreen family={ijaraFamilies[0]} layout="phone" initialStep={2} />
          </DeviceFrame>
          <DeviceFrame variant="phone" label="4 · Якунлаш (тасдиқ кутмоқда)">
            <ShartnomaScreen family={ijaraFamilies[0]} layout="phone" initialStep={3} />
          </DeviceFrame>
          <DeviceFrame variant="phone" label="4 · Якунлаш (тасдиқланган)">
            <ShartnomaScreen family={ijaraFamilies[0]} layout="phone" initialStep={3} initialFaceVerified />
          </DeviceFrame>
          <DeviceFrame variant="tablet" label="Планшет · Шартнома формаси">
            <ShartnomaScreen family={ijaraFamilies[0]} layout="tablet" />
          </DeviceFrame>
        </div>

        {/* ── ШАРТНОМА ҲУЖЖАТИ ── */}
        <SectionHeader
          icon="document-text"
          title="Шартнома ҳужжати"
          subtitle="Имзодан кейин — расмий ижара шартномаси (тарафлар, объект, шартлар, имзо/муҳр)"
        />
        <div className="mb-12 flex flex-wrap items-start justify-center gap-10 sm:gap-14">
          <DeviceFrame variant="phone" label="Телефон · Шартнома ҳужжати">
            <ShartnomaDocument
              family={ijaraFamilies[0]}
              contract={sampleContractForm(ijaraFamilies[0])}
              layout="phone"
            />
          </DeviceFrame>
          <DeviceFrame variant="tablet" label="Планшет · Шартнома ҳужжати">
            <ShartnomaDocument
              family={ijaraFamilies[0]}
              contract={sampleContractForm(ijaraFamilies[0])}
              layout="tablet"
            />
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }: { icon: IconName; title: string; subtitle: string }) {
  return (
    <div className="mx-auto mb-6 flex max-w-5xl items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white shadow-[0_6px_16px_-6px_rgba(43,140,238,0.6)]">
        <Icon name={icon} size={18} variant="Bold" />
      </span>
      <div>
        <h2 className="text-[15px] font-bold text-slate-800">{title}</h2>
        <p className="text-[11.5px] text-slate-500">{subtitle}</p>
      </div>
      <span className="ml-2 h-px flex-1 bg-slate-300/70" />
    </div>
  );
}
