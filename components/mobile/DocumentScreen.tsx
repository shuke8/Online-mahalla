"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import type { InfraObject } from "@/lib/mock-data";
import { AppBar, SectionTitle, MobileStyles } from "@/components/mobile/material";

/**
 * DocumentScreen — тугалланган далолатнома ҳужжатини кўриш экрани.
 * Расмий акт кўриниши: оқ "қоғоз" карта устида — тасдиқ белгиси, сарлавҳа,
 * обект маълумотлари, иш тафсилотлари, расмлар, геолокация, имзо/муҳр.
 * Пастда (shrink-0) "Юклаб олиш (PDF)" / "Улашиш" — визуал (дизайн preview).
 * Барча контент детерминистик (Date.now() ишлатилмайди).
 * Contract — O'ZGАРТИРМАНГ:
 */
export interface DocumentScreenProps {
  object: InfraObject;
  actType: "interim" | "final";
  onBack?: () => void;
  /** макет: телефон (бир устун) ёки планшет (марказлашган қоғоз, 2 устунли тана) */
  layout?: "phone" | "tablet";
}

/** Қотирилган намуна сана (детерминистик — Date.now()'сиз). */
const SAMPLE_DATE = "2026-йил 2-июнь";

/** Сонни пробел билан минг ажратгич. */
function formatThousands(value: number): string {
  if (value <= 0) return "—";
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function DocumentScreen({ object, actType, onBack, layout = "phone" }: DocumentScreenProps) {
  const isFinal = actType === "final";
  const isTablet = layout === "tablet";
  const actTitle = isFinal ? "ЯКУНИЙ ДАЛОЛАТНОМА" : "ОРАЛИҚ ДАЛОЛАТНОМА";
  const actShort = isFinal ? "Якуний далолатнома" : "Оралиқ далолатнома";
  const docNo = `${object.objectId}/${isFinal ? "Я" : "О"}`;

  return (
    <div className="flex flex-1 flex-col bg-[#f4f7fb]">
      <MobileStyles />

      <AppBar
        title="Далолатнома ҳужжати"
        subtitle={actShort}
        onBack={onBack}
        trailing={
          <div className="mr-0.5 flex items-center">
            <button
              type="button"
              aria-label="Юклаб олиш"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/95 transition-colors hover:bg-white/15 active:scale-[0.94]"
            >
              <Icon name="document-upload" size={20} />
            </button>
            <button
              type="button"
              aria-label="Улашиш"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/95 transition-colors hover:bg-white/15 active:scale-[0.94]"
            >
              <Icon name="send" size={19} />
            </button>
          </div>
        }
      />

      {/* Контент — қоғоз ҳужжат тўлиқ кўринади (frame вертикал чўзилади) */}
      <div className={`flex-1 py-4 ${isTablet ? "px-6" : "px-3.5"}`}>
        {/* Тасдиқ белгиси + № — планшетда қоғоз кенглигида марказлашган */}
        <div className={`mb-3 flex items-center justify-between gap-2 ${isTablet ? "mx-auto max-w-3xl" : ""}`}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/10 px-3 py-1.5 text-[12px] font-bold text-success">
            <Icon name="tick-circle" size={15} variant="Bold" />
            Тасдиқланган
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border-light bg-white px-2.5 py-1 text-[10.5px] font-semibold text-text-secondary">
            <Icon name="document-text" size={12} variant="Bold" />
            № {docNo}
          </span>
        </div>

        {/* ── Қоғоз ҳужжат картаси (планшетда марказлашган, comfortable max-width) ── */}
        <article
          className={`overflow-hidden rounded-2xl border border-border-light bg-white shadow-layered ${
            isTablet ? "mx-auto max-w-3xl" : ""
          }`}
        >
          {/* Расмий шапка — тўлиқ кенглик */}
          <header className="relative overflow-hidden border-b border-dashed border-border-light px-4 py-4 text-center">
            {/* Юмшоқ navy фон акценти */}
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
              {actTitle}
            </h1>
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-text-secondary">
              <span className="tabular-nums">№ {docNo}</span>
              <span className="text-text-secondary/40">·</span>
              <span>{SAMPLE_DATE}</span>
            </p>
          </header>

          {/* Тавсиф — тўлиқ кенглик (планшетда ҳам) */}
          <div className="px-4 pt-4">
            <p className="rounded-xl bg-surface/60 px-3 py-2.5 text-[12px] font-medium leading-relaxed text-text-primary">
              {object.description}
            </p>
          </div>

          {/* Тана — телефонда бир устун стек, планшетда 2 устун */}
          <div className={`px-4 pb-4 pt-4 ${isTablet ? "grid grid-cols-2 gap-x-5 gap-y-4" : "flex flex-col gap-4"}`}>
            {/* ЧАП устун: обект маълумотлари + иш тафсилотлари */}
            {/* Обект маълумотлари */}
            <DocSection icon="business" title="Обект маълумотлари">
              <KeyValueList
                rows={[
                  { label: "МФЙ", value: object.mfyName },
                  { label: "Туман", value: object.tumanName },
                  { label: "Вилоят", value: object.viloyatName },
                  { label: "Объект коди", value: object.objectCode, mono: true },
                  { label: "ID", value: object.objectId, mono: true },
                ]}
              />
            </DocSection>

            {/* Қилинган иш расмлари (планшетда — ўнг устун, 2×2 каттароқ) */}
            <DocSection icon="camera" title="Қилинган иш расмлари">
              <div className={isTablet ? "grid grid-cols-2 gap-2.5" : "grid grid-cols-3 gap-2"}>
                <PhotoThumb icon="camera" caption="Расм 1" />
                <PhotoThumb icon="gallery" caption="Расм 2" />
                <PhotoThumb icon="gallery" caption="Расм 3" />
                {isTablet && <PhotoThumb icon="gallery" caption="Расм 4" />}
              </div>
            </DocSection>

            {/* Иш тафсилотлари — чегарали жадвал */}
            <DocSection icon="hammer" title="Иш тафсилотлари">
              <div className="overflow-hidden rounded-xl border border-border-light">
                <DetailRow label="Режа ID" value={String(object.rejaId)} mono />
                <DetailRow label="Режа номи" value={object.rejaNomi} />
                <DetailRow label="Қуввати" value={`${object.quvvati} ${object.olchovBirligi}`} />
                <DetailRow
                  label="Сарфланган маблағ"
                  value={`${formatThousands(object.sarflanganMablag)} сўм`}
                  mono
                  last
                  emphasize
                />
              </div>
            </DocSection>

            {/* Геолокация (планшетда — ўнг устун) */}
            <DocSection icon="location" title="Геолокация">
              <div className="flex items-center gap-3 rounded-xl border border-border-light bg-surface/50 p-2.5">
                {/* кичик статик "харита" қутиси (жонли Leaflet эмас) */}
                <div className="relative grid h-14 w-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-navy-lighter">
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(43,140,238,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(43,140,238,0.25) 1px, transparent 1px)",
                      backgroundSize: "10px 10px",
                    }}
                  />
                  <Icon name="pin" size={20} variant="Bold" className="relative text-navy" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
                    Координаталар
                  </p>
                  <p className="mt-0.5 text-[13px] font-bold tabular-nums text-text-primary">
                    {object.lat.toFixed(4)}, {object.lng.toFixed(4)}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                    {object.mfyName} · {object.tumanName}
                  </p>
                </div>
              </div>
            </DocSection>

            {/* Имзолар + муҳр (планшетда — ўнг устун, иккита устуннинг охирида) */}
            <div className={isTablet ? "col-start-2" : ""}>
              <DocSection icon="people" title="Тасдиқлаш">
                <div className="grid grid-cols-2 gap-3">
                  <SignatureBlock role="Тузувчи" name="Инспектор" />
                  <SignatureBlock role="Ҳоким ёрдамчиси" name="Масъул" />
                </div>
                {/* Муҳр */}
                <div className="mt-3 flex items-center justify-end pr-1">
                  <div className="flex h-16 w-16 -rotate-6 flex-col items-center justify-center rounded-full border-2 border-dashed border-navy/35 text-center text-navy/55">
                    <span className="text-[7px] font-bold uppercase leading-tight tracking-wider">
                      Муҳр
                    </span>
                    <Icon name="tick-circle" size={16} variant="Bold" className="my-0.5" />
                    <span className="text-[6.5px] font-semibold uppercase leading-tight">
                      Тасдиқ
                    </span>
                  </div>
                </div>
              </DocSection>
            </div>
          </div>
        </article>

        <p className={`mt-3 px-1 text-center text-[10.5px] text-text-secondary ${isTablet ? "mx-auto max-w-3xl" : ""}`}>
          Ушбу ҳужжат электрон тарзда тасдиқланган · {SAMPLE_DATE}
        </p>

        <div className="h-1" />
      </div>

      {/* Bottom action bar — frame пастида (shrink-0) */}
      <div className="shrink-0 border-t border-border-light bg-white px-3 pb-5 pt-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Улашиш"
            className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-border-light px-5 text-[14px] font-semibold text-text-label transition-colors hover:bg-slate-50 active:scale-[0.97]"
          >
            <Icon name="send" size={17} variant="Bold" />
            Улашиш
          </button>
          <button
            type="button"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-navy text-[14.5px] font-bold text-white shadow-[0_6px_18px_rgba(43,140,238,0.35)] transition-all hover:bg-navy-light active:scale-[0.98]"
          >
            <Icon name="document-upload" size={18} variant="Bold" />
            Юклаб олиш (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Ҳужжат бўлими ─────────────────────────────────────────────────────── */
function DocSection({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <SectionTitle icon={icon}>{title}</SectionTitle>
      <div className="mt-2">{children}</div>
    </section>
  );
}

/* ── Калит/қиймат рўйхати (обект маълумотлари) ─────────────────────────── */
function KeyValueList({
  rows,
}: {
  rows: { label: string; value: string; mono?: boolean }[];
}) {
  return (
    <dl className="flex flex-col gap-1.5">
      {rows.map((r) => (
        <div key={r.label} className="flex items-baseline justify-between gap-3">
          <dt className="shrink-0 text-[11.5px] font-medium text-text-secondary">{r.label}</dt>
          <dd
            className={`min-w-0 truncate text-right text-[12.5px] font-semibold text-text-primary ${
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

/* ── Иш тафсилотлари жадвал қатори ─────────────────────────────────────── */
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
      className={`flex items-center justify-between gap-3 px-3 py-2.5 ${
        last ? "" : "border-b border-border-light"
      } ${emphasize ? "bg-navy-lighter/50" : ""}`}
    >
      <span className="shrink-0 text-[11.5px] font-medium text-text-secondary">{label}</span>
      <span
        className={`min-w-0 truncate text-right text-[12.5px] text-text-primary ${
          emphasize ? "font-extrabold text-navy" : "font-semibold"
        } ${mono ? "tabular-nums" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

/* ── Расм placeholder ─────────────────────────────────────────────────── */
function PhotoThumb({ icon, caption }: { icon: IconName; caption: string }) {
  return (
    <div className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border-light bg-surface/50 text-text-secondary">
      <Icon name={icon} size={20} />
      <span className="text-[9.5px] font-semibold">{caption}</span>
    </div>
  );
}

/* ── Имзо устуни ──────────────────────────────────────────────────────── */
function SignatureBlock({ role, name }: { role: string; name: string }) {
  return (
    <div className="rounded-xl border border-border-light bg-surface/40 p-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-text-secondary">{role}</p>
      <p className="mt-2 truncate text-[12px] font-semibold text-text-primary">{name}</p>
      <div className="mt-3 border-t border-dashed border-slate-300 pt-1">
        <p className="text-[9.5px] font-medium text-text-secondary">Имзо</p>
      </div>
      <p className="mt-2 flex items-center gap-1 text-[10px] text-text-secondary">
        <Icon name="time" size={11} />
        {SAMPLE_DATE}
      </p>
    </div>
  );
}
