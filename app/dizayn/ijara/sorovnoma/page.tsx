"use client";

import Link from "next/link";
import { DeviceFrame } from "@/components/mobile/DeviceFrame";
import IjaraListScreen from "@/components/mobile/IjaraListScreen";
import SorovnomaScreen from "@/components/mobile/SorovnomaScreen";
import SorovnomaNatijaScreen from "@/components/mobile/SorovnomaNatijaScreen";
import { ijaraFamilies } from "@/lib/ijara-module-data";
import { IjaraCanvasShell, SectionHeader } from "@/components/design/IjaraCanvas";

// «Томорқа мавжуд эмас» тармоғи — барқарор reference (preview override).
const NO_GARDEN = { tomorqaMavjud: "Мавжуд эмас" };

export default function IjaraSorovnomaPage() {
  const family = ijaraFamilies[0];
  // Ўтказилган сўровнома натижалари — 3 ҳолат (тайёр / рад этилган / тузилган)
  const readyFamily = ijaraFamilies.find((f) => f.status === "contract_pending")!;
  const declinedFamily = ijaraFamilies.find((f) => f.status === "declined")!;
  const doneFamily = ijaraFamilies.find((f) => f.status === "contract_done")!;
  const noGardenFamily = ijaraFamilies.find((f) => f.tomorqaMavjud === false)!;

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

      {/* ── ТОМОРҚА МАВЖУД ЭМАС — СЎРОВНОМА ВА САҚЛАШ ── */}
      <SectionHeader
        icon="close-circle"
        title="Томорқа мавжуд эмас — сўровнома ва сақлаш"
        subtitle="«Мавжуд эмас» танланса — майдонлар яширин, тўғридан-тўғри якунлаб сақланади (ижара имконсиз)"
      />
      <div className="mb-12 flex flex-wrap items-start justify-center gap-8 sm:gap-12">
        <DeviceFrame variant="phone" label="2 · Томорқа «Мавжуд эмас»">
          <SorovnomaScreen family={family} layout="phone" initialStep={1} initialForm={NO_GARDEN} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="4 · Якунлаш (томорқасиз)">
          <SorovnomaScreen
            family={family}
            layout="phone"
            initialStep={3}
            initialForm={NO_GARDEN}
            initialFaceVerified
          />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="Сақланди (томорқа йўқ)">
          <SorovnomaScreen
            family={family}
            layout="phone"
            initialStep={3}
            initialForm={NO_GARDEN}
            initialFaceVerified
            initialSaved
          />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="Натижа · томорқа мавжуд эмас">
          <SorovnomaNatijaScreen family={noGardenFamily} layout="phone" />
        </DeviceFrame>
      </div>

      {/* ── ЎТКАЗИЛГАН СЎРОВНОМА — НАТИЖА ── */}
      <SectionHeader
        icon="tick-circle"
        title="Ўтказилган сўровнома — натижа"
        subtitle="«Ўтказилган» табдан оила танланганда — фақат ўқиш натижа экрани (3 ҳолат)"
      />
      <div className="mb-12 flex flex-wrap items-start justify-center gap-8 sm:gap-12">
        <DeviceFrame variant="phone" label="Шартномага тайёр (рози)">
          <SorovnomaNatijaScreen family={readyFamily} layout="phone" />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="Рад этилган (истаги йўқ)">
          <SorovnomaNatijaScreen family={declinedFamily} layout="phone" />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="Шартнома тузилган">
          <SorovnomaNatijaScreen family={doneFamily} layout="phone" />
        </DeviceFrame>
        <DeviceFrame variant="tablet" label="Планшет · Натижа (тайёр)">
          <SorovnomaNatijaScreen family={readyFamily} layout="tablet" />
        </DeviceFrame>
      </div>

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
