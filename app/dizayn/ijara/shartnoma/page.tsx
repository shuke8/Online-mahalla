"use client";

import { DeviceFrame } from "@/components/mobile/DeviceFrame";
import IjaraListScreen from "@/components/mobile/IjaraListScreen";
import ShartnomaScreen, { sampleContractForm } from "@/components/mobile/ShartnomaScreen";
import ShartnomaDocument from "@/components/mobile/ShartnomaDocument";
import { ijaraFamilies } from "@/lib/ijara-module-data";
import { IjaraCanvasShell, SectionHeader } from "@/components/design/IjaraCanvas";

export default function IjaraShartnomaPage() {
  const family = ijaraFamilies[0];

  return (
    <IjaraCanvasShell active="shartnoma" subtitle="Шартнома · рўйхат → форма → ҳужжат">
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
          <ShartnomaScreen family={family} layout="phone" initialStep={0} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="2 · Ижарага олувчи">
          <ShartnomaScreen family={family} layout="phone" initialStep={1} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="3 · Ижара шартлари">
          <ShartnomaScreen family={family} layout="phone" initialStep={2} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="4 · Якунлаш (тасдиқ кутмоқда)">
          <ShartnomaScreen family={family} layout="phone" initialStep={3} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="4 · Якунлаш (тасдиқланган)">
          <ShartnomaScreen family={family} layout="phone" initialStep={3} initialFaceVerified />
        </DeviceFrame>
        <DeviceFrame variant="tablet" label="Планшет · Шартнома формаси">
          <ShartnomaScreen family={family} layout="tablet" />
        </DeviceFrame>
      </div>

      {/* ── ШАРТНОМА ҲУЖЖАТИ ── */}
      <SectionHeader
        icon="document-text"
        title="Шартнома ҳужжати"
        subtitle="Имзодан кейин — расмий ижара шартномаси (тарафлар, объект, шартлар, имзо/муҳр)"
      />
      <div className="flex flex-wrap items-start justify-center gap-10 sm:gap-14">
        <DeviceFrame variant="phone" label="Телефон · Шартнома ҳужжати">
          <ShartnomaDocument family={family} contract={sampleContractForm(family)} layout="phone" />
        </DeviceFrame>
        <DeviceFrame variant="tablet" label="Планшет · Шартнома ҳужжати">
          <ShartnomaDocument family={family} contract={sampleContractForm(family)} layout="tablet" />
        </DeviceFrame>
      </div>
    </IjaraCanvasShell>
  );
}
