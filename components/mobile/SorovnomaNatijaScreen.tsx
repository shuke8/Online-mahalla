"use client";

/**
 * SorovnomaNatijaScreen — «Томорқа ижараси» модулида ЎТКАЗИЛГАН сўровнома натижаси.
 * Сўровнома рўйхатидаги «Ўтказилган» табдан оила танланганда очилади (фақат ўқиш).
 *
 * 3 натижа (status бўйича):
 *  · contract_pending → «Шартномага тайёр» — ижарага рози, шартнома тузиш CTA
 *  · declined         → «Рад этилган» — истаги йўқ + сабаб; қайта сўровнома
 *  · contract_done    → «Шартнома тузилган» — шартномани кўриш
 *
 * layout="phone" — бир устун; layout="tablet" — 2 устун (натижа+оила | жавоблар).
 */

import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { AppBar, SectionCard, MobileStyles } from "@/components/mobile/material";
import { FamilyHeader, BiometricCard } from "@/components/mobile/SorovnomaScreen";
import {
  STATUS_META,
  surveyOutcomeOf,
  ijaraIstagiOf,
  type IjaraFamily,
  type StatusTone,
} from "@/lib/ijara-module-data";

export interface SorovnomaNatijaScreenProps {
  family: IjaraFamily;
  layout: "phone" | "tablet";
  onBack?: () => void;
  /** «Шартномага тайёр» — шартнома тузишга ўтиш */
  onCreateContract?: () => void;
  /** «Шартнома тузилган» — тузилган шартномани кўриш */
  onViewContract?: () => void;
  /** Қайта сўровнома ўтказиш (айниқса «рад этилган» оилаларда) */
  onResurvey?: () => void;
}

/** Натижа банери ранг схемаси — StatusTone бўйича. */
const OUTCOME_STYLE: Record<
  StatusTone,
  { wrap: string; iconWrap: string }
> = {
  navy: { wrap: "border-navy/30 from-navy/[0.10] to-navy/[0.02]", iconWrap: "bg-navy/15 text-navy" },
  success: {
    wrap: "border-success/30 from-success/[0.12] to-success/[0.03]",
    iconWrap: "bg-success/15 text-success",
  },
  muted: { wrap: "border-slate-300 from-slate-100 to-white", iconWrap: "bg-slate-200 text-slate-500" },
  warning: {
    wrap: "border-warning/30 from-warning/[0.12] to-warning/[0.02]",
    iconWrap: "bg-warning/15 text-[#b45309]",
  },
};

export default function SorovnomaNatijaScreen({
  family,
  layout,
  onBack,
  onCreateContract,
  onViewContract,
  onResurvey,
}: SorovnomaNatijaScreenProps) {
  const isTablet = layout === "tablet";
  const meta = STATUS_META[family.status];
  const outcome = surveyOutcomeOf(family);
  const style = OUTCOME_STYLE[meta.tone];
  const istagi = ijaraIstagiOf(family.status);
  const wantsRent = istagi === "Истаги бор";
  const noGarden = family.tomorqaMavjud === false;
  const isDeclined = family.status === "declined";

  const outcomeBanner = (
    <div
      className={`overflow-hidden rounded-2xl border bg-gradient-to-br p-4 shadow-layered-sm ${style.wrap}`}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.iconWrap}`}
        >
          <Icon name={meta.icon} size={26} variant="Bold" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-extrabold leading-tight text-text-primary">{outcome.title}</p>
          <p className="mt-1 text-[12px] leading-snug text-text-secondary">{outcome.subtitle}</p>
        </div>
      </div>
      {family.sorovnomaSana && (
        <div className="mt-3 flex items-center gap-1.5 border-t border-black/[0.06] pt-2.5 text-[11.5px] font-medium text-text-secondary">
          <Icon name="calendar" size={13} variant="Bold" className="text-text-secondary/70" />
          Сўровнома ўтказилди · <span className="tabular-nums">{family.sorovnomaSana}</span>
        </div>
      )}
    </div>
  );

  const answerRows: { label: string; value: string; tone?: "success" | "muted" }[] = noGarden
    ? [{ label: "Томорқаси мавжудлиги", value: "Мавжуд эмас", tone: "muted" }]
    : [
        { label: "Томорқа", value: "Мавжуд" },
        { label: "Кадастр рақами", value: family.kadastrRaqami },
        { label: "Манзил", value: family.manzil },
        { label: "Ер майдони", value: `${family.erMaydoni} сотих` },
        { label: "Фойдаланиш ҳолати", value: family.foydalanishHolati ?? "—" },
        { label: "Сув таъминоти", value: family.suvTaminoti ?? "—" },
        { label: "Ижара истаги", value: istagi, tone: wantsRent ? "success" : "muted" },
      ];
  if (!noGarden && wantsRent && family.ijaraMuddati) {
    answerRows.push({ label: "Ижара муддати", value: family.ijaraMuddati });
  }

  const answersCard = (
    <SectionCard
      icon="note"
      title="Сўровнома жавоблари"
      meta="Оила бераётган маълумотлар (фақат ўқиш)"
      bodyClassName="p-0"
    >
      <div className="divide-y divide-border-light/70">
        {answerRows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-3 px-4 py-3">
            <span className="shrink-0 text-[12px] text-text-secondary">{r.label}</span>
            {r.tone ? (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-bold ${
                  r.tone === "success"
                    ? "bg-success/12 text-success"
                    : "bg-slate-100 text-text-secondary"
                }`}
              >
                <Icon name={r.tone === "success" ? "tick-circle" : "close-circle"} size={12} variant="Bold" />
                {r.value}
              </span>
            ) : (
              <span className="max-w-[62%] text-right text-[13px] font-semibold text-text-primary">
                {r.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );

  const reasonCard = isDeclined && family.radSababi && (
    <div className="flex items-start gap-2.5 rounded-2xl border border-slate-300 bg-slate-50 p-3.5">
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
        <Icon name="note" size={17} variant="Bold" />
      </span>
      <div className="min-w-0">
        <p className="text-[12.5px] font-bold text-text-primary">Рад этиш сабаби</p>
        <p className="mt-0.5 text-[12px] leading-snug text-text-secondary">{family.radSababi}</p>
      </div>
    </div>
  );

  const biometricCard = (
    <BiometricCard verified familyName={family.oilaBoshligiFio} onVerify={() => {}} />
  );

  return (
    <div className="relative flex flex-1 flex-col bg-gradient-to-b from-[#e9f0fb] via-[#f1f5fb] to-[#f5f8fc]">
      <MobileStyles />

      <AppBar
        title="Сўровнома натижаси"
        subtitle="Ўтказилган сўровнома"
        onBack={onBack}
        trailing={
          <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold text-white">
            <Icon name={meta.icon} size={12} variant="Bold" />
            {meta.short}
          </span>
        }
      />

      <div className="flex-1 overflow-auto px-3.5 py-4">
        {isTablet ? (
          <div className="mx-auto flex max-w-3xl items-start gap-5">
            <div className="flex w-1/2 flex-col gap-4">
              {outcomeBanner}
              <FamilyHeader family={family} />
              {reasonCard}
            </div>
            <div className="flex w-1/2 flex-col gap-4">
              {answersCard}
              {biometricCard}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {outcomeBanner}
            <FamilyHeader family={family} />
            {reasonCard}
            {answersCard}
            {biometricCard}
          </div>
        )}
      </div>

      <BottomBar
        status={family.status}
        onCreateContract={onCreateContract}
        onViewContract={onViewContract}
        onResurvey={onResurvey}
        onBack={onBack}
      />
    </div>
  );
}

/* ── Пастки амал панели — статусга мос асосий амал ────────────────────────── */
function BottomBar({
  status,
  onCreateContract,
  onViewContract,
  onResurvey,
  onBack,
}: {
  status: IjaraFamily["status"];
  onCreateContract?: () => void;
  onViewContract?: () => void;
  onResurvey?: () => void;
  onBack?: () => void;
}) {
  const primaryClass =
    "inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy to-navy-light text-[14.5px] font-bold text-white shadow-[0_8px_20px_rgba(43,140,238,0.42)] transition-all hover:brightness-[1.08] active:scale-[0.98]";
  const secondaryClass =
    "inline-flex min-h-[48px] items-center justify-center gap-1 rounded-full px-5 text-[13.5px] font-semibold text-text-secondary transition-colors hover:bg-slate-100 active:scale-[0.97]";

  let primary: { label: string; icon: IconName; onClick?: () => void };
  if (status === "contract_pending") {
    primary = { label: "Шартнома тузиш", icon: "document-text", onClick: onCreateContract };
  } else if (status === "contract_done") {
    primary = { label: "Шартномани кўриш", icon: "document-text", onClick: onViewContract };
  } else {
    primary = { label: "Қайта сўровнома ўтказиш", icon: "note", onClick: onResurvey };
  }

  return (
    <div className="shrink-0 border-t border-border-light bg-white px-3 pb-5 pt-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-2.5">
        <button type="button" onClick={onBack} className={secondaryClass}>
          <Icon name="arrow-left" size={16} />
          Рўйхатга
        </button>
        <button type="button" onClick={primary.onClick} className={primaryClass}>
          <Icon name={primary.icon} size={17} variant="Bold" />
          {primary.label}
        </button>
      </div>
    </div>
  );
}
