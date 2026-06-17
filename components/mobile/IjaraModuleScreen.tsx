"use client";

/**
 * IjaraModuleScreen — «Томорқа ижараси» modulining kirish ekrani.
 * 2 amal: «Сўровнома ўтказиш» va «Шартнома расмийлаштириш» — har biri jonli
 * count badge bilan. Pastda — modul bo'yicha qisqa statistika.
 *
 * layout="phone" — amal kartalari ustma-ust; layout="tablet" — yonma-yon.
 */

import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { AppBar, PressCard, MobileStyles } from "@/components/mobile/material";
import { moduleCounts } from "@/lib/ijara-module-data";

export interface IjaraModuleScreenProps {
  layout: "phone" | "tablet";
  onOpenSurvey?: () => void;
  onOpenContract?: () => void;
  onBack?: () => void;
}

export default function IjaraModuleScreen({
  layout,
  onOpenSurvey,
  onOpenContract,
  onBack,
}: IjaraModuleScreenProps) {
  const isTablet = layout === "tablet";
  const c = moduleCounts();

  return (
    <div className="relative flex flex-1 flex-col bg-gradient-to-b from-[#eaf1fb] via-[#f1f5fb] to-[#f5f8fc]">
      <MobileStyles />

      <AppBar
        title="Томорқа ижараси"
        subtitle="Ижтимоий реестр · модул"
        onBack={onBack}
        leading={
          !onBack ? (
            <span className="ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
              <Icon name="tree" size={18} variant="Bold" />
            </span>
          ) : undefined
        }
        trailing={
          <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold text-white">
            <Icon name="shield-tick" size={12} variant="Bold" />
            Реестр
          </span>
        }
      />

      <div className={`flex-1 overflow-auto ${isTablet ? "px-6 py-6" : "px-3.5 py-4"}`}>
        <div className={isTablet ? "mx-auto max-w-3xl" : ""}>
          {/* ── Hero intro ── */}
          <div className="relative overflow-hidden rounded-3xl border border-navy/15 bg-gradient-to-br from-navy to-navy-light p-5 text-white shadow-[0_18px_40px_-22px_rgba(43,140,238,0.85)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative flex items-start gap-3.5">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                <Icon name="tree" size={26} variant="Bold" />
              </span>
              <div className="min-w-0">
                <h2 className="text-[16.5px] font-bold leading-tight">Томорқа ижараси</h2>
                <p className="mt-1 text-[12px] leading-relaxed text-white/80">
                  Ногиронлиги бўлган, ёлғиз ва оилада ягона боқувчи оилалар томорқасини
                  ижарага бериш — сўровнома ва шартнома.
                </p>
              </div>
            </div>
          </div>

          {/* ── 2 amal kartasi ── */}
          <div className={`mt-4 grid gap-3.5 ${isTablet ? "grid-cols-2" : "grid-cols-1"}`}>
            <ActionCard
              icon="note"
              accent="#2b8cee"
              title="Сўровнома ўтказиш"
              desc="Оила томорқасини баҳолаш ва ижара истагини аниқлаш"
              countLabel="Кутилмоқда"
              count={c.surveyPending}
              countIcon="time"
              onClick={onOpenSurvey}
            />
            <ActionCard
              icon="document-text"
              accent="#16a34a"
              title="Шартнома расмийлаштириш"
              desc="Ижарага рози оилалар билан ижара шартномасини тузиш"
              countLabel="Тайёр"
              count={c.contractReady}
              countIcon="tick-circle"
              onClick={onOpenContract}
            />
          </div>

          {/* ── Statistika ── */}
          <div className="mt-5 grid grid-cols-3 gap-2.5">
            <StatTile icon="people" tint="#2b8cee" value={c.total} label="Жами оила" />
            <StatTile icon="note" tint="#f59e0b" value={c.surveyPending} label="Сўровнома кутмоқда" />
            <StatTile icon="tick-circle" tint="#16a34a" value={c.contractDone} label="Шартнома тузилди" />
          </div>

          <p className="mt-6 text-center text-[10.5px] font-medium text-text-secondary/70">
            Ижтимоий реестр · томорқа ижараси модули
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Амал картаси — тоза (флат), Airwallex/Alipay услуби ──────────────────── */
function ActionCard({
  icon,
  accent,
  title,
  desc,
  countLabel,
  count,
  countIcon,
  onClick,
}: {
  icon: IconName;
  accent: string;
  title: string;
  desc: string;
  countLabel: string;
  count: number;
  countIcon: IconName;
  onClick?: () => void;
}) {
  return (
    <PressCard onClick={onClick} className="h-full rounded-2xl">
      <div className="flex h-full flex-col rounded-2xl border border-border-light bg-white p-4 shadow-layered-sm transition-shadow hover:shadow-layered">
        {/* Иконка + сарлавҳа + chevron */}
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${accent}14`, color: accent }}
          >
            <Icon name={icon} size={24} variant="Bold" />
          </span>
          <h3 className="min-w-0 flex-1 text-[15px] font-bold leading-tight text-text-primary">{title}</h3>
          <Icon name="chevron-forward" size={20} className="shrink-0 text-text-secondary/45" />
        </div>

        <p className="mt-2.5 text-[12px] leading-relaxed text-text-secondary">{desc}</p>

        <div className="mt-3.5 flex items-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px] font-bold"
            style={{ background: `${accent}14`, color: accent }}
          >
            <Icon name={countIcon} size={12} variant="Bold" />
            {countLabel}: {count}
          </span>
        </div>
      </div>
    </PressCard>
  );
}

/* ── Mini statistika katаги ──────────────────────────────────────────────── */
function StatTile({
  icon,
  tint,
  value,
  label,
}: {
  icon: IconName;
  tint: string;
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border-light bg-white px-2 py-3 text-center shadow-layered-sm">
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-xl"
        style={{ background: `${tint}1f`, color: tint }}
      >
        <Icon name={icon} size={16} variant="Bold" />
      </span>
      <span className="mt-1.5 text-[18px] font-bold leading-none tabular-nums text-text-primary">
        {value}
      </span>
      <span className="mt-1 text-[10px] font-medium leading-tight text-text-secondary">{label}</span>
    </div>
  );
}
