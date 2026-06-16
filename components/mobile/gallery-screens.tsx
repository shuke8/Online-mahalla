"use client";

/**
 * gallery-screens — шартли тармоқларнинг ТЎЛИҚ ЭКРАН previewлари (DeviceFrame).
 * Каталог компонентларни, behavior эса мантиқни кўрсатади; бу эса ҳар статус
 * танланганда актуал экран қандай кўринишини (айниқса альтернатив тармоқ) беради.
 */

import { DeviceFrame } from "@/components/mobile/DeviceFrame";
import SorovnomaScreen from "@/components/mobile/SorovnomaScreen";
import { sampleSurveyFamily } from "@/lib/social-survey-data";
import { Section } from "@/components/mobile/gallery-kit";

const family = sampleSurveyFamily;
// Барқарор reference (модул даражасида) — спурияр reset бўлмаслиги учун.
const NO_GARDEN = { tomorqaMavjud: "Мавжуд эмас" };
const USING_NO_RENT = { foydalanishHolati: "Фойдаланади", ijaraIstagi: "Истаги йўқ" };

export function GalleryScreens() {
  return (
    <Section
      icon="maximize"
      title="Тўлиқ экран — шартли ҳолатлар"
      subtitle="Ҳар тармоқ актуал экранда (default ёнида альтернатив)"
    >
      <div className="flex flex-wrap items-start justify-center gap-8 md:col-span-2">
        <DeviceFrame variant="phone" label="Томорқа · «Мавжуд» (default)">
          <SorovnomaScreen family={family} layout="phone" initialStep={1} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="Томорқа · «Мавжуд эмас»">
          <SorovnomaScreen family={family} layout="phone" initialStep={1} initialForm={NO_GARDEN} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="Фойдаланиш · «Мавжуд эмас» (ўтказилди)">
          <SorovnomaScreen family={family} layout="phone" initialStep={2} initialForm={NO_GARDEN} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="Якунлаш · «Мавжуд эмас»">
          <SorovnomaScreen family={family} layout="phone" initialStep={3} initialForm={NO_GARDEN} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="Фойдаланиш · «Фойдаланади», ижарасиз">
          <SorovnomaScreen family={family} layout="phone" initialStep={2} initialForm={USING_NO_RENT} />
        </DeviceFrame>
        <DeviceFrame variant="phone" label="Якунлаш · биометрик тасдиқланган">
          <SorovnomaScreen family={family} layout="phone" initialStep={3} initialFaceVerified />
        </DeviceFrame>
      </div>
    </Section>
  );
}
