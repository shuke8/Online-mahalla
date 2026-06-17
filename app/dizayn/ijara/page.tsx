"use client";

import { DeviceFrame } from "@/components/mobile/DeviceFrame";
import IjaraModuleScreen from "@/components/mobile/IjaraModuleScreen";
import { IjaraCanvasShell, SectionHeader } from "@/components/design/IjaraCanvas";

export default function IjaraKirishPage() {
  return (
    <IjaraCanvasShell active="kirish" subtitle="Модулга кириш · 2 амал + статистика">
      <SectionHeader
        icon="home"
        title="Модул кириши"
        subtitle="2 амал: сўровнома ва шартнома · count badge + статистика"
      />
      <div className="flex flex-wrap items-start justify-center gap-10 sm:gap-14">
        <DeviceFrame variant="phone" label="Телефон · Модул кириши">
          <IjaraModuleScreen layout="phone" />
        </DeviceFrame>
        <DeviceFrame variant="tablet" label="Планшет · Модул кириши">
          <IjaraModuleScreen layout="tablet" />
        </DeviceFrame>
      </div>
    </IjaraCanvasShell>
  );
}
