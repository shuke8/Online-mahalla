"use client";

/**
 * ShartnomaScreen — томорқа ижараси ШАРТНОМА формаси (мобил, 4 қадамли wizard).
 * Манба: real tizim `forms/social_reestr_land_renting_acts` (14 maydon).
 *
 * Қадамлар: Ижарага берувчи (оила, авто) → Ижарага олувчи (тип/СТИР/номи) →
 *           Ижара шартлари (саналар, тўлов, кунлар, соатлар) → Якунлаш (биометрика + имзо).
 * Биометрика SorovnomaScreen'дан қайта ишлатилади (оила бошлиғи юзи тасдиқлайди).
 * layout="phone" — wizard; layout="tablet" — 2 устун, якка экран.
 */

import { Fragment, useEffect, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import {
  AppBar,
  TextField,
  SearchTextField,
  ChoiceToggle,
  SectionCard,
  MobileStyles,
} from "@/components/mobile/material";
import {
  FamilyHeader,
  BiometricCard,
  InfoNote,
  FaceScanOverlay,
  type FaceScanState,
  type BiometricMethod,
} from "@/components/mobile/SorovnomaScreen";
import { formatJshshir, formatPhone } from "@/lib/social-survey-data";
import {
  IJARAGA_OLUVCHI_TURI,
  HAFTA_KUNLARI,
  SOATLAR,
  type IjaraFamily,
} from "@/lib/ijara-module-data";

export interface ContractForm {
  oluvchiTuri: string;
  stir: string;
  oluvchiNomi: string;
  sana: string;
  boshlanish: string;
  tugash: string;
  oylikTolov: string;
  kunlar: string[];
  kirishSoati: string;
  chiqishSoati: string;
}

export interface ShartnomaScreenProps {
  family: IjaraFamily;
  layout: "phone" | "tablet";
  initialStep?: number;
  initialForm?: Partial<ContractForm>;
  initialFaceVerified?: boolean;
  previewFaceScan?: "scanning" | "success" | "error";
  onBack?: () => void;
  /** имзодан кейин — шартнома ҳужжатига ўтиш */
  onDone?: () => void;
}

type SaveState = "idle" | "saving" | "success";

const STEPS: { label: string; title: string; icon: IconName }[] = [
  { label: "Берувчи", title: "Ижарага берувчи", icon: "profile" },
  { label: "Олувчи", title: "Ижарага олувчи", icon: "personal-card" },
  { label: "Шартлар", title: "Ижара шартлари", icon: "document-text" },
  { label: "Якун", title: "Якунлаш", icon: "tick-circle" },
];

const KUN_SHORT: Record<string, string> = {
  Душанба: "Ду",
  Сешанба: "Се",
  Чоршанба: "Чо",
  Пайшанба: "Па",
  Жума: "Жу",
  Шанба: "Ша",
  Якшанба: "Як",
};

/** «12 ой» → 12 (детерминистик) */
function muddatToMonths(s?: string): number {
  return parseInt((s ?? "").replace(/\D/g, ""), 10) || 0;
}

/** DD.MM.YYYY га ой қўшиш (детерминистик, Date'сиз — hydration-safe) */
function addMonths(ddmmyyyy: string, months: number): string {
  const [d, m, y] = ddmmyyyy.split(".").map(Number);
  if (!d || !m || !y || !months) return ddmmyyyy;
  const total = y * 12 + (m - 1) + months;
  const ny = Math.floor(total / 12);
  const nm = (total % 12) + 1;
  return `${String(d).padStart(2, "0")}.${String(nm).padStart(2, "0")}.${ny}`;
}

/** Намунавий шартнома қиймати (ҳужжат previewи учун ҳам ишлатилади). */
export function sampleContractForm(family: IjaraFamily): ContractForm {
  return buildInitialForm(family);
}

/** Кунлар рўйхатини қисқа кўринишда (Ду, Се …) */
export function formatKunlar(kunlar: string[]): string {
  return kunlar.length ? kunlar.map((k) => KUN_SHORT[k] ?? k).join(", ") : "—";
}

function buildInitialForm(family: IjaraFamily, overrides?: Partial<ContractForm>): ContractForm {
  const boshlanish = "01.07.2026";
  return {
    oluvchiTuri: "Юридик шахс",
    stir: "305678912",
    oluvchiNomi: "«Agro Hosil Farovon» МЧЖ",
    sana: "17.06.2026",
    boshlanish,
    tugash: addMonths(boshlanish, muddatToMonths(family.ijaraMuddati)),
    oylikTolov: "450 000",
    kunlar: ["Душанба", "Сешанба", "Чоршанба", "Пайшанба", "Жума"],
    kirishSoati: "08:00",
    chiqishSoati: "18:00",
    ...overrides,
  };
}

export default function ShartnomaScreen({
  family,
  layout,
  initialStep = 0,
  initialForm,
  initialFaceVerified = false,
  previewFaceScan,
  onBack,
  onDone,
}: ShartnomaScreenProps) {
  const isTablet = layout === "tablet";

  const [form, setForm] = useState<ContractForm>(() => buildInitialForm(family, initialForm));
  const [step, setStep] = useState(initialStep);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [stir, setStir] = useState<"idle" | "searching" | "verified">("verified");
  const [faceVerified, setFaceVerified] = useState(initialFaceVerified);
  const [verifiedMethod, setVerifiedMethod] = useState<BiometricMethod>("face");
  const [faceScan, setFaceScan] = useState<FaceScanState>(previewFaceScan ?? "idle");
  const [scanMethod, setScanMethod] = useState<BiometricMethod>("face");
  const [showFaceScan, setShowFaceScan] = useState(Boolean(previewFaceScan));

  useEffect(() => {
    setForm(buildInitialForm(family, initialForm));
    setStep(initialStep);
    setSaveState("idle");
    setStir("verified");
    setFaceVerified(initialFaceVerified);
    setFaceScan(previewFaceScan ?? "idle");
    setShowFaceScan(Boolean(previewFaceScan));
  }, [family, initialStep, initialForm, initialFaceVerified, previewFaceScan]);

  useEffect(() => {
    if (previewFaceScan) return;
    if (faceScan === "scanning") {
      const t = window.setTimeout(() => setFaceScan("success"), 1900);
      return () => window.clearTimeout(t);
    }
    if (faceScan === "success") {
      const t = window.setTimeout(() => {
        setFaceVerified(true);
        setVerifiedMethod(scanMethod);
        setShowFaceScan(false);
        setFaceScan("idle");
      }, 850);
      return () => window.clearTimeout(t);
    }
  }, [faceScan, previewFaceScan, scanMethod]);

  const set = <K extends keyof ContractForm>(key: K, value: ContractForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleDay = (day: string) =>
    setForm((f) => ({
      ...f,
      kunlar: f.kunlar.includes(day) ? f.kunlar.filter((d) => d !== day) : [...f.kunlar, day],
    }));

  function openScan(method: BiometricMethod) {
    setScanMethod(method);
    setShowFaceScan(true);
    setFaceScan("scanning");
  }
  function closeFaceScan() {
    setShowFaceScan(false);
    setFaceScan("idle");
  }
  function searchStir() {
    if (!form.stir.trim()) return;
    setStir("searching");
    window.setTimeout(() => setStir("verified"), 850);
  }

  function goNext() {
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }
  function goBack() {
    if (step === 0) onBack?.();
    else setStep((s) => s - 1);
  }
  async function handleSave() {
    if (!faceVerified) {
      openScan("face");
      return;
    }
    setSaveState("saving");
    await new Promise((r) => setTimeout(r, 900));
    setSaveState("success");
    window.setTimeout(() => onDone?.(), 600);
  }

  /* ── Қайта ишлатиладиган блоклар ──────────────────────────────────────── */

  const lessorBlock = (
    <div className="flex flex-col gap-4">
      <InfoNote
        icon="shield-tick"
        tone="navy"
        title="«Ижтимоий реестр»дан олинди"
        text="Ижарага берувчи ва томорқа маълумотлари автоматик тўлдирилган."
      />
      <FamilyHeader family={family} />
      <SectionCard icon="tree" title="Томорқа (ижара объекти)" meta="Кадастр, манзил, майдон">
        <div className="flex flex-col gap-4">
          <TextField label="Кадастр рақами" value={family.kadastrRaqami} readOnly leadingIcon="location" />
          <TextField label="Манзили" value={family.manzil} readOnly leadingIcon="home" />
          <TextField label="Ер майдони (сотих)" value={family.erMaydoni} readOnly leadingIcon="ruler" />
        </div>
      </SectionCard>
    </div>
  );

  const lesseeBlock = (
    <SectionCard icon="personal-card" title="Ижарага олувчи" meta="Тип, СТИР, номи">
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-[12.5px] font-semibold text-text-label">
            Ижарага олувчи тури <span className="text-danger">*</span>
          </p>
          <ChoiceToggle
            ariaLabel="Ижарага олувчи тури"
            value={form.oluvchiTuri}
            onChange={(v) => set("oluvchiTuri", v)}
            options={[
              { value: IJARAGA_OLUVCHI_TURI[0], label: "Жисмоний", icon: "profile" },
              { value: IJARAGA_OLUVCHI_TURI[1], label: "Юридик", icon: "building-3" },
            ]}
          />
        </div>
        <SearchTextField
          label={form.oluvchiTuri === "Юридик шахс" ? "СТИР" : "ЖШШИР / СТИР"}
          value={form.stir}
          onChange={(v) => {
            set("stir", v);
            setStir("idle");
          }}
          onSearch={searchStir}
          searching={stir === "searching"}
          verified={stir === "verified"}
          required
          stackAction={!isTablet}
          placeholder="000000000"
          leadingIcon="personal-card"
          helper={
            stir === "verified"
              ? "Солиқ хизматидан тасдиқланди — номи автотўлдирилди"
              : "Рақамни киритиб «Қидириш» босинг"
          }
        />
        <TextField
          label="Номи"
          value={form.oluvchiNomi}
          onChange={(v) => set("oluvchiNomi", v)}
          required
          leadingIcon="briefcase"
          placeholder="Ташкилот ёки шахс номи"
        />
      </div>
    </SectionCard>
  );

  const termsBlock = (
    <SectionCard icon="document-text" title="Ижара шартлари" meta="Саналар, тўлов, фойдаланув жадвали">
      <div className="flex flex-col gap-4">
        <TextField label="Шартнома санаси" value={form.sana} onChange={(v) => set("sana", v)} required leadingIcon="time" placeholder="КК.ОО.ЙЙЙЙ" />
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Бошланиш санаси" value={form.boshlanish} onChange={(v) => set("boshlanish", v)} required placeholder="КК.ОО.ЙЙЙЙ" />
          <TextField
            label="Тугаш санаси"
            value={form.tugash}
            onChange={(v) => set("tugash", v)}
            required
            placeholder="КК.ОО.ЙЙЙЙ"
            helper={family.ijaraMuddati ? `Муддат: ${family.ijaraMuddati} (авто)` : undefined}
          />
        </div>
        <TextField
          label="Ижара тўлови (ойлик, сўм)"
          value={form.oylikTolov}
          onChange={(v) => set("oylikTolov", v)}
          required
          inputMode="numeric"
          leadingIcon="wallet"
          placeholder="0"
        />
        <WeekdayPicker value={form.kunlar} onToggle={toggleDay} />
        <TimeRangeField
          kirish={form.kirishSoati}
          chiqish={form.chiqishSoati}
          onKirish={(v) => set("kirishSoati", v)}
          onChiqish={(v) => set("chiqishSoati", v)}
        />
      </div>
    </SectionCard>
  );

  return (
    <div className="relative flex flex-1 flex-col bg-gradient-to-b from-[#e9f0fb] via-[#f1f5fb] to-[#f5f8fc]">
      <MobileStyles />
      <style>{`
        @keyframes shartStep { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .shart-step { animation: shartStep .34s cubic-bezier(0.16,1,0.3,1); }
        @media (prefers-reduced-motion: reduce) { .shart-step { animation: none; } }
      `}</style>

      {showFaceScan && (
        <FaceScanOverlay
          state={faceScan}
          method={scanMethod}
          familyName={family.oilaBoshligiFio}
          onClose={closeFaceScan}
          onRetry={() => setFaceScan("scanning")}
        />
      )}

      <AppBar
        title="Ижара шартномаси"
        subtitle={isTablet ? "Томорқа ижараси" : `${STEPS[step].title} · ${step + 1}/${STEPS.length}`}
        onBack={goBack}
        trailing={
          <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold text-white">
            <Icon name="document-text" size={12} variant="Bold" />
            Шартнома
          </span>
        }
      />

      {isTablet ? (
        <div className="flex-1 overflow-auto">
          <div className="flex items-start gap-6 p-5">
            <div className="flex w-1/2 flex-col gap-5">
              {lessorBlock}
              {lesseeBlock}
            </div>
            <div className="flex w-1/2 flex-col gap-5">
              {termsBlock}
              <ReviewCard family={family} form={form} />
              <BiometricCard verified={faceVerified} verifiedMethod={verifiedMethod} familyName={family.oilaBoshligiFio} onVerify={openScan} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="shrink-0 border-b border-border-light bg-white px-3.5 py-2">
            <p className="truncate text-[12.5px] font-semibold text-text-primary">{family.oilaBoshligiFio}</p>
            <p className="truncate text-[10.5px] tabular-nums text-text-secondary">
              ЖШШИР: {formatJshshir(family.jshshir)}
            </p>
          </div>
          <div className="shrink-0 bg-white px-3 pb-3 pt-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
            <ContractStepper current={step} onStep={(i) => i < step && setStep(i)} />
          </div>
          <div key={step} className="shart-step flex-1 overflow-auto px-3.5 py-4">
            {step === 0 && lessorBlock}
            {step === 1 && lesseeBlock}
            {step === 2 && termsBlock}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <ReviewCard family={family} form={form} />
                <BiometricCard verified={faceVerified} verifiedMethod={verifiedMethod} familyName={family.oilaBoshligiFio} onVerify={openScan} />
              </div>
            )}
          </div>
        </>
      )}

      {saveState === "success" && (
        <div className="shrink-0 px-3 pb-1">
          <div role="status" className="flex items-center gap-2 rounded-xl border border-success/25 bg-success/[0.12] px-3 py-2.5 text-success shadow-layered-sm">
            <Icon name="tick-circle" size={18} variant="Bold" />
            <p className="text-[13px] font-semibold">Шартнома тузилди — ҳужжат тайёрланмоқда…</p>
          </div>
        </div>
      )}

      {/* Bottom action bar */}
      <div className="shrink-0 border-t border-border-light bg-white px-3 pb-5 pt-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
        {(isTablet || step === STEPS.length - 1) && !faceVerified && (
          <p className="mb-2 flex items-center gap-1 text-[11.5px] font-medium text-text-secondary">
            <Icon name="scan" size={13} variant="Bold" />
            Имзо учун оила бошлиғи юзини тасдиқланг
          </p>
        )}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={goBack}
            disabled={saveState === "saving"}
            className="inline-flex min-h-[48px] items-center justify-center gap-1 rounded-full px-5 text-[14px] font-semibold text-text-secondary transition-colors hover:bg-slate-100 active:scale-[0.97] disabled:opacity-50"
          >
            {!isTablet && step > 0 && <Icon name="arrow-left" size={16} />}
            {isTablet || step === 0 ? "Бекор" : "Орқага"}
          </button>

          {!isTablet && step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy to-navy-light text-[14.5px] font-bold text-white shadow-[0_8px_20px_rgba(43,140,238,0.42)] transition-all hover:brightness-[1.08] active:scale-[0.98]"
            >
              Кейингиси
              <Icon name="chevron-forward" size={17} variant="Bold" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              disabled={saveState === "saving" || !faceVerified}
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy to-navy-light text-[14.5px] font-bold text-white shadow-[0_8px_20px_rgba(43,140,238,0.42)] transition-all hover:brightness-[1.08] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {saveState === "saving" ? (
                <><Spinner /> Имзоланмоқда…</>
              ) : saveState === "success" ? (
                <><Icon name="tick-circle" size={18} variant="Bold" /> Тузилди</>
              ) : !faceVerified ? (
                <><Icon name="scan" size={17} variant="Bold" /> Тасдиқлаб имзолаш</>
              ) : (
                <><Icon name="send" size={17} variant="Bold" /> Шартномани имзолаш</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Кунлик фойдаланув кунлари — chip picker ─────────────────────────────── */
function WeekdayPicker({ value, onToggle }: { value: string[]; onToggle: (d: string) => void }) {
  return (
    <div>
      <p className="mb-2 text-[12.5px] font-semibold text-text-label">
        Кунлик фойдаланув кунлари <span className="text-danger">*</span>
      </p>
      <div className="flex flex-wrap gap-1.5">
        {HAFTA_KUNLARI.map((k) => {
          const active = value.includes(k);
          return (
            <button
              key={k}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(k)}
              className={`inline-flex h-9 min-w-[42px] items-center justify-center rounded-xl border px-2.5 text-[12.5px] font-bold transition-all active:scale-95 ${
                active
                  ? "border-navy bg-gradient-to-br from-navy to-navy-light text-white shadow-[0_4px_12px_rgba(43,140,238,0.4)]"
                  : "border-border-light bg-white text-text-secondary hover:border-navy/40 hover:text-navy"
              }`}
            >
              {KUN_SHORT[k]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Иш вақти — Кириш→Чиқиш оралиғи (chiroyli range picker) ──────────────── */
function hoursBetween(a: string, b: string): number | null {
  const h1 = Number.parseInt(a.slice(0, 2), 10);
  const h2 = Number.parseInt(b.slice(0, 2), 10);
  if (Number.isNaN(h1) || Number.isNaN(h2)) return null;
  const d = h2 - h1;
  return d > 0 ? d : null;
}

function TimeRangeField({
  kirish,
  chiqish,
  onKirish,
  onChiqish,
}: {
  kirish: string;
  chiqish: string;
  onKirish: (v: string) => void;
  onChiqish: (v: string) => void;
}) {
  const dur = hoursBetween(kirish, chiqish);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[12.5px] font-semibold text-text-label">
          Иш вақти <span className="text-danger">*</span>
        </p>
        {dur !== null ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-navy/[0.08] px-2 py-0.5 text-[11px] font-bold text-navy">
            <Icon name="time" size={11} variant="Bold" />
            {dur} соат
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-[11px] font-bold text-danger">
            <Icon name="warning" size={11} variant="Bold" />
            Чиқиш киришдан кейин
          </span>
        )}
      </div>
      <div className="flex items-stretch rounded-2xl border border-border-light bg-white p-1.5 shadow-[0_6px_18px_-12px_rgba(15,23,42,0.45)]">
        <TimeHalf label="Кириш" value={kirish} onChange={onKirish} />
        <span className="flex shrink-0 items-center px-0.5 text-navy/50">
          <Icon name="chevron-forward" size={16} variant="Bold" />
        </span>
        <TimeHalf label="Чиқиш" value={chiqish} onChange={onChiqish} />
      </div>
    </div>
  );
}

function TimeHalf({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="relative flex-1 cursor-pointer rounded-[14px] px-3 py-2 transition-colors hover:bg-navy/[0.05]">
      <span className="flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-text-secondary">
        <Icon name="time" size={11} variant="Bold" />
        {label}
      </span>
      <span className="mt-1 block text-[21px] font-extrabold leading-none tracking-tight tabular-nums text-text-primary">
        {value}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} соати`}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
      >
        {SOATLAR.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ── Текшириш картаси (якунлаш) ──────────────────────────────────────────── */
function ReviewCard({ family, form }: { family: IjaraFamily; form: ContractForm }) {
  const rows: { label: string; value: string }[] = [
    { label: "Ижарага берувчи", value: family.oilaBoshligiFio },
    { label: "Томорқа майдони", value: `${family.erMaydoni} сотих` },
    { label: "Ижарага олувчи", value: `${form.oluvchiNomi} (${form.oluvchiTuri})` },
    { label: "СТИР", value: form.stir || "—" },
    { label: "Муддат", value: `${form.boshlanish} — ${form.tugash}` },
    { label: "Ойлик тўлов", value: form.oylikTolov ? `${form.oylikTolov} сўм` : "—" },
    { label: "Фойдаланув кунлари", value: form.kunlar.length ? form.kunlar.map((k) => KUN_SHORT[k]).join(", ") : "—" },
    { label: "Иш вақти", value: `${form.kirishSoati} – ${form.chiqishSoati}` },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-navy/20 bg-navy/[0.05] p-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/12 text-navy">
          <Icon name="document-text" size={23} variant="Bold" />
        </span>
        <div>
          <p className="text-[14px] font-bold text-text-primary">Имзога тайёр</p>
          <p className="text-[11.5px] text-text-secondary">Шартнома шартларини текшириб, тасдиқланг.</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-layered-sm">
        <div className="border-b border-border-light bg-gradient-to-r from-slate-50 to-white px-4 py-3">
          <span className="text-[13px] font-bold text-text-primary">Шартнома шартлари</span>
        </div>
        <div className="divide-y divide-border-light/70">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start justify-between gap-3 px-4 py-3">
              <span className="shrink-0 text-[12px] text-text-secondary">{r.label}</span>
              <span className="max-w-[62%] text-right text-[13px] font-semibold text-text-primary">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Stepper (доира остида ёрлиқ — марказлашган) ─────────────────────────── */
function ContractStepper({ current, onStep }: { current: number; onStep: (i: number) => void }) {
  return (
    <div>
      <div className="flex items-center">
        {STEPS.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <Fragment key={s.label}>
              <button
                type="button"
                onClick={() => onStep(i)}
                aria-label={`${i + 1}-қадам: ${s.title}`}
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12.5px] font-bold transition-all duration-300 ${
                  done
                    ? "bg-success text-white shadow-[0_3px_10px_rgba(34,197,94,0.4)] cursor-pointer"
                    : active
                      ? "bg-gradient-to-br from-navy to-navy-light text-white ring-4 ring-navy/15 shadow-[0_5px_14px_rgba(43,140,238,0.45)] cursor-default"
                      : "border border-border-light bg-white text-text-secondary cursor-default"
                }`}
              >
                {done ? <Icon name="tick-circle" size={16} variant="Bold" /> : i + 1}
              </button>
              {i < STEPS.length - 1 && (
                <span
                  className={`mx-1.5 h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i < current ? "bg-success" : "bg-border-light"
                  }`}
                />
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="mt-2 flex items-start">
        {STEPS.map((s, i) => (
          <Fragment key={s.label}>
            <span className="flex w-8 shrink-0 justify-center">
              <span
                className={`whitespace-nowrap text-center text-[10px] leading-tight transition-colors ${
                  i === current ? "font-bold text-navy" : "font-semibold text-text-secondary/75"
                }`}
              >
                {s.label}
              </span>
            </span>
            {i < STEPS.length - 1 && <span className="mx-1.5 flex-1" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
