"use client";

import Link from "next/link";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { DeviceFrame } from "@/components/mobile/DeviceFrame";
import SorovnomaScreen from "@/components/mobile/SorovnomaScreen";
import { sampleSurveyFamily } from "@/lib/social-survey-data";

export default function SorovnomaDesignPreview() {
  const family = sampleSurveyFamily;

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
            Сўровнома — мобил илова дизайни
          </h1>
          <p className="truncate text-[11.5px] text-slate-500">
            «Ижтимоий реестр» оила сўровномаси · Android телефон ва планшет · дизайн макети
          </p>
        </div>
        <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-navy/10 px-3 py-1 text-[11px] font-semibold text-navy sm:inline-flex">
          <Icon name="layers" size={13} variant="Bold" />
          Дизайн макети
        </span>
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
        {/* ── ТЕЛЕФОН ── */}
        <SectionHeader icon="home" title="Телефон" subtitle="Android · portrait · 4 экран (wizard)" />
        <div className="mb-12 flex flex-wrap items-start justify-center gap-8 sm:gap-12">
          <DeviceFrame variant="phone" label="1-қадам · Оила маълумотлари">
            <SorovnomaScreen family={family} layout="phone" initialStep={0} />
          </DeviceFrame>
          <DeviceFrame variant="phone" label="2-қадам · Томорқа">
            <SorovnomaScreen family={family} layout="phone" initialStep={1} />
          </DeviceFrame>
          <DeviceFrame variant="phone" label="3-қадам · Фойдаланиш ва ижара">
            <SorovnomaScreen family={family} layout="phone" initialStep={2} />
          </DeviceFrame>
          <DeviceFrame variant="phone" label="4-қадам · Якунлаш">
            <SorovnomaScreen family={family} layout="phone" initialStep={3} />
          </DeviceFrame>
        </div>

        {/* ── ПЛАНШЕТ ── */}
        <SectionHeader icon="maximize" title="Планшет" subtitle="Android · landscape · якка экран" />
        <div className="flex flex-wrap items-start justify-center gap-10 sm:gap-14">
          <DeviceFrame variant="tablet" label="Планшет · Сўровнома">
            <SorovnomaScreen family={family} layout="tablet" />
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
