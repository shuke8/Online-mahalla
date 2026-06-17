"use client";

import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { DeviceFrame } from "@/components/mobile/DeviceFrame";
import IjaraModuleScreen from "@/components/mobile/IjaraModuleScreen";
import { IjaraCanvasShell, SectionHeader } from "@/components/design/IjaraCanvas";

export default function IjaraKirishPage() {
  return (
    <IjaraCanvasShell active="kirish" subtitle="Модулга кириш · 2 амал + статистика">
      <div className="mx-auto mb-6 flex max-w-5xl justify-end">
        <Link
          href="/dizayn/ijara/referenslar"
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy/20 bg-navy/[0.06] px-3 py-1.5 text-[12px] font-semibold text-navy transition-colors hover:bg-navy/10"
        >
          <Icon name="layers" size={14} variant="Bold" />
          Референс дизайнлар (Mobbin)
          <Icon name="chevron-forward" size={13} />
        </Link>
      </div>

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
