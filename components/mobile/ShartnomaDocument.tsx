"use client";

/**
 * ShartnomaDocument — тузилган ижара ШАРТНОМАСИ ҳужжати (расмий «қоғоз» кўриниши).
 * Имзолангандан кейин кўрсатилади: тарафлар, ижара объекти, шартлар, имзо/муҳр.
 * DalolatnomaнDocumentScreen эстетикасига мос (лекин мустақил — ўша файл «O'ZGАРТМА»).
 * Барча контент детерминистик (Date.now() ишлатилмайди).
 */

import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { AppBar, SectionTitle, MobileStyles } from "@/components/mobile/material";
import { formatJshshir, formatPhone } from "@/lib/social-survey-data";
import { type IjaraFamily } from "@/lib/ijara-module-data";
import { type ContractForm, formatKunlar } from "@/components/mobile/ShartnomaScreen";

export interface ShartnomaDocumentProps {
  family: IjaraFamily;
  contract: ContractForm;
  layout?: "phone" | "tablet";
  onBack?: () => void;
}

export default function ShartnomaDocument({
  family,
  contract,
  layout = "phone",
  onBack,
}: ShartnomaDocumentProps) {
  const isTablet = layout === "tablet";
  const docNo = `${family.id}/Ш`;

  return (
    <div className="flex flex-1 flex-col bg-[#f4f7fb]">
      <MobileStyles />

      <AppBar
        title="Шартнома ҳужжати"
        subtitle="Ижара шартномаси"
        onBack={onBack}
        trailing={
          <button
            type="button"
            aria-label="Ҳужжат"
            title="Ҳужжат"
            className="mr-0.5 inline-flex h-11 w-11 items-center justify-center rounded-full text-white/95 transition-colors hover:bg-white/15 active:scale-[0.94]"
          >
            <Icon name="document-text" size={20} />
          </button>
        }
      />

      <div className={`flex-1 overflow-auto py-4 ${isTablet ? "px-6" : "px-3.5"}`}>
        <div className={`mb-3 flex items-center justify-between gap-2 ${isTablet ? "mx-auto max-w-3xl" : ""}`}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/10 px-3 py-1.5 text-[12px] font-bold text-success">
            <Icon name="tick-circle" size={15} variant="Bold" />
            Тузилган
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border-light bg-white px-2.5 py-1 text-[10.5px] font-semibold text-text-secondary">
            <Icon name="document-text" size={12} variant="Bold" />
            № {docNo}
          </span>
        </div>

        <article
          className={`overflow-hidden rounded-2xl border border-border-light bg-white shadow-layered ${
            isTablet ? "mx-auto max-w-3xl" : ""
          }`}
        >
          {/* Расмий шапка */}
          <header className="relative overflow-hidden border-b border-dashed border-border-light px-4 py-4 text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-navy via-navy-light to-navy"
            />
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-lighter text-navy">
              <Icon name="business" size={20} variant="Bold" />
            </span>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary">
              Ўзбекистон Республикаси
            </p>
            <h1 className="mt-1 text-[16px] font-extrabold leading-tight tracking-wide text-text-primary">
              ИЖАРА ШАРТНОМАСИ
            </h1>
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-text-secondary">
              <span className="tabular-nums">№ {docNo}</span>
              <span className="text-text-secondary/40">·</span>
              <span className="tabular-nums">{contract.sana}</span>
            </p>
          </header>

          {/* Мавзу */}
          <div className="px-4 pt-4">
            <p className="rounded-xl bg-surface/60 px-3 py-2.5 text-[12px] font-medium leading-relaxed text-text-primary">
              «Ижтимоий реестр»да турувчи ногиронлиги бўлган, ёлғиз ва оилада ягона боқувчи
              оиланинг томорқасидан ижара асосида фойдаланиш бўйича шартнома.
            </p>
          </div>

          {/* Тана */}
          <div className={`px-4 pb-4 pt-4 ${isTablet ? "grid grid-cols-2 gap-x-5 gap-y-4" : "flex flex-col gap-4"}`}>
            <DocSection icon="profile" title="Ижарага берувчи">
              <KeyValueList
                rows={[
                  { label: "Ф.И.О.", value: family.oilaBoshligiFio },
                  { label: "ЖШШИР", value: formatJshshir(family.jshshir), mono: true },
                  { label: "Телефон", value: formatPhone(family.telefon), mono: true },
                ]}
              />
            </DocSection>

            <DocSection icon="personal-card" title="Ижарага олувчи">
              <KeyValueList
                rows={[
                  { label: "Номи", value: contract.oluvchiNomi },
                  { label: "Тури", value: contract.oluvchiTuri },
                  { label: "СТИР", value: contract.stir, mono: true },
                ]}
              />
            </DocSection>

            <DocSection icon="tree" title="Ижара объекти (томорқа)">
              <div className="overflow-hidden rounded-xl border border-border-light">
                <DetailRow label="Кадастр рақами" value={family.kadastrRaqami} mono />
                <DetailRow label="Манзил" value={family.manzil} />
                <DetailRow label="Майдон" value={`${family.erMaydoni} сотих`} mono last />
              </div>
            </DocSection>

            <DocSection icon="document-text" title="Ижара шартлари">
              <div className="overflow-hidden rounded-xl border border-border-light">
                <DetailRow label="Муддат" value={`${contract.boshlanish} — ${contract.tugash}`} mono />
                <DetailRow label="Фойдаланув кунлари" value={formatKunlar(contract.kunlar)} />
                <DetailRow label="Иш вақти" value={`${contract.kirishSoati} – ${contract.chiqishSoati}`} mono />
                <DetailRow label="Ойлик ижара тўлови" value={`${contract.oylikTolov} сўм`} mono last emphasize />
              </div>
            </DocSection>

            <div className={isTablet ? "col-span-2" : ""}>
              <DocSection icon="people" title="Имзолар">
                <div className="grid grid-cols-2 gap-3">
                  <SignatureBlock role="Ижарага берувчи" name={family.oilaBoshligiFio} biometric date={contract.sana} />
                  <SignatureBlock role="Ижарага олувчи" name={contract.oluvchiNomi} date={contract.sana} />
                </div>
                <div className="mt-3 flex items-center justify-end pr-1">
                  <div className="flex h-16 w-16 -rotate-6 flex-col items-center justify-center rounded-full border-2 border-dashed border-navy/35 text-center text-navy/55">
                    <span className="text-[7px] font-bold uppercase leading-tight tracking-wider">Муҳр</span>
                    <Icon name="tick-circle" size={16} variant="Bold" className="my-0.5" />
                    <span className="text-[6.5px] font-semibold uppercase leading-tight">Тасдиқ</span>
                  </div>
                </div>
              </DocSection>
            </div>
          </div>
        </article>

        <p className={`mt-3 px-1 text-center text-[10.5px] text-text-secondary ${isTablet ? "mx-auto max-w-3xl" : ""}`}>
          Ушбу шартнома электрон тарзда тасдиқланган · {contract.sana}
        </p>
        <div className="h-1" />
      </div>

      {/* Bottom action bar */}
      <div className="shrink-0 border-t border-border-light bg-white px-3 pb-5 pt-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
        <button
          type="button"
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-navy text-[14.5px] font-bold text-white shadow-[0_6px_18px_rgba(43,140,238,0.35)] transition-all hover:bg-navy-light active:scale-[0.98]"
        >
          <Icon name="document-text" size={18} variant="Bold" />
          Ҳужжат
        </button>
      </div>
    </div>
  );
}

/* ── Кичик ёрдамчилар ────────────────────────────────────────────────────── */
function DocSection({ icon, title, children }: { icon: IconName; title: string; children: ReactNode }) {
  return (
    <section>
      <SectionTitle icon={icon}>{title}</SectionTitle>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function KeyValueList({ rows }: { rows: { label: string; value: string; mono?: boolean }[] }) {
  return (
    <dl className="flex flex-col gap-1.5">
      {rows.map((r) => (
        <div key={r.label} className="flex items-start justify-between gap-3">
          <dt className="shrink-0 text-[11.5px] font-medium leading-snug text-text-secondary">{r.label}</dt>
          <dd
            className={`min-w-0 text-right text-[12.5px] font-semibold leading-snug text-text-primary [overflow-wrap:anywhere] ${
              r.mono ? "tabular-nums" : ""
            }`}
          >
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function DetailRow({
  label,
  value,
  mono,
  last,
  emphasize,
}: {
  label: string;
  value: string;
  mono?: boolean;
  last?: boolean;
  emphasize?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-3 px-3 py-2.5 ${
        last ? "" : "border-b border-border-light"
      } ${emphasize ? "bg-navy-lighter/50" : ""}`}
    >
      <span className="shrink-0 text-[11.5px] font-medium leading-snug text-text-secondary">{label}</span>
      <span
        className={`min-w-0 text-right text-[12.5px] leading-snug text-text-primary [overflow-wrap:anywhere] ${
          emphasize ? "font-extrabold text-navy" : "font-semibold"
        } ${mono ? "tabular-nums" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function SignatureBlock({
  role,
  name,
  biometric,
  date,
}: {
  role: string;
  name: string;
  biometric?: boolean;
  date: string;
}) {
  return (
    <div className="rounded-xl border border-border-light bg-surface/40 p-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-text-secondary">{role}</p>
      <p className="mt-2 text-[12px] font-semibold leading-snug text-text-primary [overflow-wrap:anywhere]">{name}</p>
      <div className="mt-3 border-t border-dashed border-slate-300 pt-1">
        {biometric ? (
          <p className="flex items-center gap-1 text-[9.5px] font-semibold text-success">
            <Icon name="user-tick" size={11} variant="Bold" />
            Юз орқали тасдиқланган
          </p>
        ) : (
          <p className="text-[9.5px] font-medium text-text-secondary">Имзо</p>
        )}
      </div>
      <p className="mt-2 flex items-center gap-1 text-[10px] text-text-secondary">
        <Icon name="time" size={11} />
        <span className="tabular-nums">{date}</span>
      </p>
    </div>
  );
}
