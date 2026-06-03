"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { DeviceFrame } from "@/components/mobile/DeviceFrame";
import ModulesScreen, { type ModulesBg } from "@/components/mobile/ModulesScreen";

interface Variant {
  key: ModulesBg;
  n: number;
  title: string;
  desc: string;
}

const VARIANTS: Variant[] = [
  {
    key: "gradient",
    n: 1,
    title: "Юмшоқ brand gradient",
    desc: "Тепадан контентга эрийдиган навы gradient washi. Жиддий, профессионал app'га мос (Rocket Money, Alan услуби).",
  },
  {
    key: "clean",
    n: 2,
    title: "Тоза фон",
    desc: "Нақш ва gradient йўқ — фақат оч фон + оқ карталар. Минимал, энг тиниқ. Ранг фақат header/hero'да.",
  },
  {
    key: "mesh",
    n: 3,
    title: "Юмшоқ mesh blob'лар",
    desc: "Navy + teal + indigo хира blur доғлар — органик юмшоқ ранг. Сал креативроқ, лекин субтле.",
  },
];

export default function FonPreviewPage() {
  const [selected, setSelected] = useState<ModulesBg>("gradient");
  const selectedVariant = VARIANTS.find((v) => v.key === selected)!;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#e9eef5]">
      {/* Top bar */}
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
        <Link
          href="/dizayn/dalolatnoma"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Icon name="arrow-left" size={15} />
          Орқага
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-[14px] font-bold text-slate-900">Бош экран — орқа фон танлаш</h1>
          <p className="truncate text-[11.5px] text-slate-500">
            3 та вариантни солиштириб танланг · ONM-809
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm">
          <Icon name="tick-circle" size={14} variant="Bold" />
          Танланган: V{selectedVariant.n} · {selectedVariant.title}
        </span>
      </header>

      {/* Canvas */}
      <div
        className="flex-1 overflow-auto p-6 sm:p-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(100,116,139,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-10">
          {VARIANTS.map((v) => {
            const isSel = v.key === selected;
            return (
              <div key={v.key} className="flex w-[300px] flex-col items-center gap-4">
                {/* Select card */}
                <button
                  type="button"
                  onClick={() => setSelected(v.key)}
                  aria-pressed={isSel}
                  className={`relative w-full rounded-2xl border p-4 text-left transition-all active:scale-[0.99] ${
                    isSel
                      ? "border-navy bg-white shadow-[0_8px_24px_rgba(43,140,238,0.18)] ring-2 ring-navy/30"
                      : "border-slate-200 bg-white/70 hover:border-navy/40 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[13px] font-extrabold ${
                        isSel ? "bg-navy text-white" : "bg-navy/[0.08] text-navy"
                      }`}
                    >
                      V{v.n}
                    </span>
                    <h2 className="flex-1 text-[14px] font-bold text-slate-900">{v.title}</h2>
                    <span
                      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all ${
                        isSel ? "bg-navy text-white" : "border border-slate-300 text-transparent"
                      }`}
                    >
                      <Icon name="tick-circle" size={16} variant="Bold" />
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-500">{v.desc}</p>
                </button>

                {/* Device frame */}
                <div
                  className={`rounded-[40px] transition-all ${
                    isSel ? "ring-4 ring-navy/25 ring-offset-4 ring-offset-[#e9eef5]" : "opacity-90"
                  }`}
                >
                  <DeviceFrame variant="phone" label={`V${v.n} · ${v.title}`}>
                    <ModulesScreen activeModule="infra" onOpenModule={() => {}} bgVariant={v.key} />
                  </DeviceFrame>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-[12.5px] font-medium text-slate-500">
          Картани босиб танланг. Қайси вариант ёқса — менга <span className="font-bold text-navy">1</span>,{" "}
          <span className="font-bold text-navy">2</span> ёки <span className="font-bold text-navy">3</span> деб ёзинг,
          уни барча жойда яқуний қиламан.
        </p>
      </div>
    </div>
  );
}
