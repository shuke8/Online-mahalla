"use client";

import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { DeviceFrame } from "@/components/mobile/DeviceFrame";
import IjaraListScreen from "@/components/mobile/IjaraListScreen";
import SorovnomaScreen from "@/components/mobile/SorovnomaScreen";
import { ijaraFamilies } from "@/lib/ijara-module-data";
import { IjaraCanvasShell, SectionHeader } from "@/components/design/IjaraCanvas";

export default function IjaraSorovnomaPage() {
  const family = ijaraFamilies[0];

  return (
    <IjaraCanvasShell active="sorovnoma" subtitle="Сўровнома · рўйхат → форма → шартномага ўтиш">
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

      {/* ── СЎРОВНОМА ФОРМАСИ ── */}
      <SectionHeader
        icon="note"
        title="Сўровнома формаси"
        subtitle="4 қадам: Оила → Томорқа → Фойдаланиш ва ижара → Якунлаш (биометрика)"
      />
      <div className="mb-3 flex flex-wrap items-start justify-center gap-8 sm:gap-12">
        <DeviceFrame variant="phone" label="1 · Оила маълумотлари">
          <SorovnomaScreen family={family} layout="phone" initialStep={0} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="2 · Томорқа">
          <SorovnomaScreen family={family} layout="phone" initialStep={1} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="3 · Фойдаланиш ва ижара">
          <SorovnomaScreen family={family} layout="phone" initialStep={2} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="4 · Якунлаш">
          <SorovnomaScreen family={family} layout="phone" initialStep={3} />
        </DeviceFrame>
        <DeviceFrame variant="tablet" label="Планшет · Сўровнома формаси">
          <SorovnomaScreen family={family} layout="tablet" />
        </DeviceFrame>
      </div>
      <p className="mx-auto mb-12 max-w-5xl text-center text-[11.5px] text-slate-500">
        Биометрик тасдиқлашнинг барча ҳолатлари (сканерлаш, муваффақият, хато) —{" "}
        <Link href="/dizayn/sorovnoma" className="font-semibold text-navy hover:underline">
          батафсил сўровнома саҳифасида
        </Link>
        .
      </p>

      {/* ── СЎРОВНОМА → ШАРТНОМА ЎТИШИ ── */}
      <SectionHeader
        icon="hierarchy"
        title="Сўровнома → шартнома ўтиши"
        subtitle="«Истаги бор» сўровнома сақлангач — дарҳол «Шартнома тузиш» таклифи"
      />
      <div className="flex flex-wrap items-start justify-center gap-10 sm:gap-14">
        <DeviceFrame variant="phone" label="Сўровнома якуни · ижарага рози">
          <SorovnomaScreen
            family={family}
            layout="phone"
            initialStep={3}
            initialFaceVerified
            initialSaved
          />
        </DeviceFrame>
      </div>
    </IjaraCanvasShell>
  );
}
