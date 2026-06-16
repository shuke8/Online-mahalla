"use client";

import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { GalleryCatalog } from "@/components/mobile/gallery-catalog";
import { GalleryBehavior } from "@/components/mobile/gallery-behavior";
import { GalleryScreens } from "@/components/mobile/gallery-screens";

export default function KomponentlarDesignPage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#eef2f7]">
      {/* Top bar */}
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
        <Link
          href="/dizayn/sorovnoma"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Icon name="arrow-left" size={15} />
          Сўровнома
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-[14px] font-bold text-slate-900">
            Компонентлар ва ҳолатлар — дизайн тизими
          </h1>
          <p className="truncate text-[11.5px] text-slate-500">
            Сўровнома ва биометрикадаги барча компонентлар, статуслар ва шартли мантиқ
          </p>
        </div>
        <Link
          href="/dizayn/biometrika"
          className="ml-auto hidden items-center gap-1.5 rounded-lg border border-navy/20 bg-navy/[0.06] px-2.5 py-1.5 text-[12px] font-semibold text-navy transition-colors hover:bg-navy/10 sm:inline-flex"
        >
          <Icon name="scan" size={14} variant="Bold" />
          Биометрика
        </Link>
      </header>

      {/* Scrollable doc */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          {/* Intro */}
          <div className="mb-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-28px_rgba(15,23,42,0.4)] sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/10 px-3 py-1 text-[11px] font-semibold text-navy">
              <Icon name="layers" size={13} variant="Bold" />
              Дизайн тизими
            </span>
            <h2 className="mt-3 text-[22px] font-bold leading-tight text-slate-900 sm:text-[26px]">
              Барча компонент, ҳар ҳолат — битта жойда
            </h2>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-slate-600">
              Қуйида сўровнома (<code className="rounded bg-slate-100 px-1 text-navy">/dizayn/sorovnoma</code>) ва
              биометрика (<code className="rounded bg-slate-100 px-1 text-navy">/dizayn/biometrika</code>) экранларида
              ишлатилган ҳар бир компонент ва унинг барча статуслари. Пастда эса — «қайси статус танланса нима бўлади,
              танланмаса нима бўлади» жонли демолар ва қоидалар.
            </p>
          </div>

          {/* Component catalog */}
          <GalleryCatalog />

          {/* Divider */}
          <div className="my-12 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-300/70" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-white">
              <Icon name="settings" size={13} variant="Bold" />
              Ҳолат мантиғи
            </span>
            <span className="h-px flex-1 bg-slate-300/70" />
          </div>

          {/* Behavior / conditional logic */}
          <GalleryBehavior />

          {/* Divider */}
          <div className="my-12 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-300/70" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-white">
              <Icon name="maximize" size={13} variant="Bold" />
              Тўлиқ экран
            </span>
            <span className="h-px flex-1 bg-slate-300/70" />
          </div>

          {/* Full-screen conditional previews */}
          <GalleryScreens />

          <p className="mt-12 text-center text-[11.5px] text-slate-400">
            Барча компонентлар реал манбадан (material.tsx · SorovnomaScreen · BiometrikaScreen) рендер қилинади —
            бу саҳифа кўчирма эмас, ягона ҳақиқат манбаи (SSOT).
          </p>
        </div>
      </div>
    </div>
  );
}
