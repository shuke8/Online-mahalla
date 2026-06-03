"use client";

/**
 * DalolatnomaScreen — мобил илова: оралиқ/якуний далолатнома форма экрани.
 * layout="phone" — қадамли (wizard): Маълумотлар → Иш расмлари → Геопозиция → Якунлаш.
 * layout="tablet" — 2 устун (форма + кенгайтирилган харита).
 * initialStep — preview учун (телефон wizard'ни маълум қадамдан кўрсатиш).
 * Contract — O'ZGARTIRMANG:
 */

import dynamic from "next/dynamic";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import ImageUpload from "@/components/organisms/ImageUpload";
import { INFRA_WORK_UNITS } from "@/lib/mock-data";
import type { InfraObject } from "@/lib/mock-data";
import {
  AppBar,
  TextField,
  SelectField,
  SegmentedToggle,
  SectionTitle,
  MobileStyles,
  type SegmentOption,
} from "@/components/mobile/material";

const InfraMap = dynamic(() => import("@/components/organisms/InfraMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-slate-100" />,
});

export interface DalolatnomaScreenProps {
  object: InfraObject;
  layout: "phone" | "tablet";
  onBack?: () => void;
  /** телефон wizard учун бошланғич қадам (0..3) — preview учун */
  initialStep?: number;
}

type ActType = "interim" | "final";
type SaveState = "idle" | "saving" | "success";

interface FormState {
  rejaNomi: string;
  quvvati: string;
  olchovBirligi: string;
  sarflanganMablag: string;
}

interface FormErrors {
  rejaNomi?: string;
  quvvati?: string;
  olchovBirligi?: string;
  sarflanganMablag?: string;
}

const STEPS: { label: string; title: string; icon: IconName }[] = [
  { label: "Маълумот", title: "Маълумотлар", icon: "document-text" },
  { label: "Расм", title: "Иш расмлари", icon: "camera" },
  { label: "Харита", title: "Геопозиция", icon: "location" },
  { label: "Якун", title: "Якунлаш", icon: "tick-circle" },
];

/** Сонни ўзбекча/русча ўқиш учун пробел билан минг ажратгич. */
function formatThousands(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function buildInitialForm(object: InfraObject): FormState {
  return {
    rejaNomi: object.rejaNomi,
    quvvati: String(object.quvvati),
    olchovBirligi: object.olchovBirligi,
    sarflanganMablag:
      object.sarflanganMablag > 0 ? formatThousands(String(object.sarflanganMablag)) : "",
  };
}

function defaultActType(object: InfraObject): ActType {
  if (object.interim === "pending") return "interim";
  if (object.final === "pending") return "final";
  return "interim";
}

export default function DalolatnomaScreen({ object, layout, onBack, initialStep = 0 }: DalolatnomaScreenProps) {
  const isTablet = layout === "tablet";

  const [actType, setActType] = useState<ActType>(() => defaultActType(object));
  const [form, setForm] = useState<FormState>(() => buildInitialForm(object));
  const [errors, setErrors] = useState<FormErrors>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [coords, setCoords] = useState({ lat: object.lat, lng: object.lng });
  const [step, setStep] = useState(initialStep);

  // Обект алмашса — формани ва ҳолатни қайта тиклаймиз.
  useEffect(() => {
    setActType(defaultActType(object));
    setForm(buildInitialForm(object));
    setErrors({});
    setSaveState("idle");
    setCoords({ lat: object.lat, lng: object.lng });
    setStep(initialStep);
  }, [object, initialStep]);

  const segments: SegmentOption[] = useMemo(
    () => [
      { value: "interim", label: "Оралиқ", status: object.interim },
      { value: "final", label: "Якуний", status: object.final },
    ],
    [object.interim, object.final],
  );

  const updateField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (saveState === "success") setSaveState("idle");
  };

  const sarflanganRaw = useMemo(() => form.sarflanganMablag.replace(/[^\d]/g, ""), [form.sarflanganMablag]);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.rejaNomi.trim()) next.rejaNomi = "Режа номини киритинг";
    const quvvati = Number(form.quvvati);
    if (!form.quvvati.trim()) next.quvvati = "Қувватни киритинг";
    else if (!Number.isFinite(quvvati) || quvvati <= 0) next.quvvati = "Қуввати 0 дан катта бўлиши керак";
    if (!form.olchovBirligi) next.olchovBirligi = "Ўлчов бирлигини танланг";
    if (!sarflanganRaw) next.sarflanganMablag = "Сарфланган маблағни киритинг";
    else if (Number(sarflanganRaw) < 0) next.sarflanganMablag = "Манфий бўлиши мумкин эмас";
    return next;
  }

  function goNext() {
    if (step === 0) {
      const found = validate();
      setErrors(found);
      if (Object.keys(found).length > 0) return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  function goBack() {
    if (step === 0) onBack?.();
    else setStep((s) => s - 1);
  }

  async function handleSave() {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStep(0);
      return;
    }
    setSaveState("saving");
    // Реал backend POST шу ерга уланади (далолатнома + расмлар + геопозиция).
    await new Promise((r) => setTimeout(r, 900));
    setSaveState("success");
  }

  const actLabel = actType === "interim" ? "Оралиқ далолатнома" : "Якуний далолатнома";

  /* ── Қайта ишлатиладиган блоклар ── */
  const fieldsBlock = (
    <div className="flex flex-col gap-3">
      <TextField label="Режа ID" value={String(object.rejaId)} required readOnly helper="Режадан автоматик олинади" />
      <TextField
        label="Режа номи"
        value={form.rejaNomi}
        onChange={(v) => updateField("rejaNomi", v)}
        required
        error={errors.rejaNomi}
        placeholder="Масалан: Асфальтлаш"
      />
      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Қуввати"
          value={form.quvvati}
          onChange={(v) => updateField("quvvati", v)}
          required
          type="number"
          inputMode="decimal"
          error={errors.quvvati}
          placeholder="0"
        />
        <SelectField
          label="Ўлчов бирлиги"
          value={form.olchovBirligi}
          options={INFRA_WORK_UNITS}
          onChange={(v) => updateField("olchovBirligi", v)}
          required
          error={errors.olchovBirligi}
        />
      </div>
      <TextField
        label="Сарфланган маблағлар"
        value={form.sarflanganMablag}
        onChange={(v) => updateField("sarflanganMablag", formatThousands(v))}
        required
        inputMode="numeric"
        error={errors.sarflanganMablag}
        placeholder="0"
        helper={sarflanganRaw ? `${form.sarflanganMablag} сўм` : "сўмда киритинг"}
        leadingIcon="wallet"
      />
    </div>
  );

  const uploadBlock = (
    <div className="flex flex-col gap-3">
      <ImageUpload label="1-расм" />
      <ImageUpload label="2-расм" />
    </div>
  );

  const toggleBlock = (
    <div>
      <SectionTitle icon="document-text">Далолатнома тури</SectionTitle>
      <div className="mt-2">
        <SegmentedToggle
          options={segments}
          value={actType}
          onChange={(v) => {
            setActType(v as ActType);
            if (saveState === "success") setSaveState("idle");
          }}
        />
      </div>
    </div>
  );

  const mapBlock = (heightClass: string) => (
    <div>
      <p className="mb-2 text-[11.5px] text-text-secondary">
        Маркерни суриб аниқ жойни белгиланг ·{" "}
        <span className="font-medium tabular-nums text-text-primary">
          {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </span>
      </p>
      <InfraMap lat={object.lat} lng={object.lng} draggableMarker onLocationChange={setCoords} heightClass={heightClass} />
    </div>
  );

  return (
    <div className="flex flex-1 flex-col bg-[#f4f7fb]">
      <MobileStyles />

      <AppBar
        title="Далолатнома"
        subtitle={isTablet ? actLabel : `${STEPS[step].title} · ${step + 1}/${STEPS.length}`}
        onBack={goBack}
        trailing={
          <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold text-white">
            <Icon name="document-text" size={12} variant="Bold" />
            {actType === "interim" ? "Оралиқ" : "Якуний"}
          </span>
        }
      />

      {isTablet ? (
        /* ── ПЛАНШЕТ: 2 устун ── */
        <div className="flex-1">
          <div className="flex items-stretch gap-4 p-4">
            <div className="flex w-[55%] flex-col gap-4">
              <ObjectHeader object={object} actLabel={actLabel} />
              {toggleBlock}
              <div>
                <SectionTitle icon="document-text">Маълумотлар</SectionTitle>
                <div className="mt-2">{fieldsBlock}</div>
              </div>
              <div>
                <SectionTitle icon="camera">Қилинган иш расми</SectionTitle>
                <div className="mt-2">{uploadBlock}</div>
              </div>
            </div>
            <div className="flex w-[45%] flex-col">
              <SectionTitle icon="location">Геопозиция</SectionTitle>
              <div className="mt-2 min-h-0 flex-1">
                <InfraMap lat={object.lat} lng={object.lng} draggableMarker onLocationChange={setCoords} heightClass="h-full" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── ТЕЛЕФОН: қадамли wizard ── */
        <>
          {/* Компакт контекст */}
          <div className="shrink-0 border-b border-border-light bg-white px-3.5 py-2">
            <p className="truncate text-[12.5px] font-semibold text-text-primary">{object.shortName}</p>
            <p className="truncate text-[10.5px] text-text-secondary">
              Код: {object.objectCode} · ID: {object.objectId}
            </p>
          </div>

          {/* Stepper */}
          <div className="shrink-0 bg-white px-3 pb-3 pt-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
            <Stepper current={step} onStep={(i) => i < step && setStep(i)} />
          </div>

          {/* Қадам контенти */}
          <div className="flex-1 px-3.5 py-4">
            {step === 0 && (
              <div className="flex flex-col gap-4">
                {toggleBlock}
                <div>
                  <SectionTitle icon="document-text">Маълумотлар</SectionTitle>
                  <div className="mt-2">{fieldsBlock}</div>
                </div>
              </div>
            )}
            {step === 1 && (
              <div>
                <SectionTitle icon="camera">Қилинган иш расми</SectionTitle>
                <p className="mb-3 mt-1 text-[11.5px] text-text-secondary">Камида 1 та расм юкланг (файл ёки камера орқали).</p>
                {uploadBlock}
              </div>
            )}
            {step === 2 && (
              <div>
                <SectionTitle icon="location">Геопозиция</SectionTitle>
                <div className="mt-2">{mapBlock("h-[300px]")}</div>
              </div>
            )}
            {step === 3 && (
              <ReviewStep actLabel={actLabel} form={form} coords={coords} onEdit={() => setStep(0)} />
            )}
          </div>
        </>
      )}

      {/* Success snackbar */}
      {saveState === "success" && (
        <div className="shrink-0 px-3 pb-1">
          <div role="status" className="flex items-center gap-2 rounded-xl border border-success/25 bg-success/[0.12] px-3 py-2.5 text-success shadow-layered-sm">
            <Icon name="tick-circle" size={18} variant="Bold" />
            <p className="text-[13px] font-semibold">Далолатнома сақланди</p>
          </div>
        </div>
      )}

      {/* Bottom action bar */}
      <div className="shrink-0 border-t border-border-light bg-white px-3 pb-5 pt-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
        {!isTablet && step === 0 && hasErrors(errors) && (
          <p className="mb-2 flex items-center gap-1 text-[11.5px] font-medium text-danger">
            <Icon name="warning" size={13} variant="Bold" />
            Мажбурий майдонларни тўлдиринг
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
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-navy text-[14.5px] font-bold text-white shadow-[0_6px_18px_rgba(43,140,238,0.35)] transition-all hover:bg-navy-light active:scale-[0.98]"
            >
              Кейингиси
              <Icon name="chevron-forward" size={17} variant="Bold" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              disabled={saveState === "saving"}
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-navy text-[14.5px] font-bold text-white shadow-[0_6px_18px_rgba(43,140,238,0.35)] transition-all hover:bg-navy-light active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {saveState === "saving" ? (
                <><Spinner /> Сақланмоқда…</>
              ) : saveState === "success" ? (
                <><Icon name="tick-circle" size={18} variant="Bold" /> Сақланди</>
              ) : (
                <><Icon name="send" size={17} variant="Bold" /> Сақлаш</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some(Boolean);
}

/* ── Stepper индикатори ─────────────────────────────────────────────────── */
function Stepper({ current, onStep }: { current: number; onStep: (i: number) => void }) {
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
                className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors ${
                  done
                    ? "bg-success text-white"
                    : active
                      ? "bg-navy text-white ring-4 ring-navy/15"
                      : "border border-border-light bg-white text-text-secondary"
                } ${done ? "cursor-pointer" : "cursor-default"}`}
              >
                {done ? <Icon name="tick-circle" size={15} variant="Bold" /> : i + 1}
              </button>
              {i < STEPS.length - 1 && (
                <span className={`mx-1 h-0.5 flex-1 rounded ${i < current ? "bg-success" : "bg-border-light"}`} />
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="mt-1.5 grid grid-cols-4 text-center">
        {STEPS.map((s, i) => (
          <span key={s.label} className={`text-[9.5px] font-semibold ${i === current ? "text-navy" : "text-text-secondary/80"}`}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Якунлаш қадами — текшириш ───────────────────────────────────────────── */
function ReviewStep({
  actLabel,
  form,
  coords,
  onEdit,
}: {
  actLabel: string;
  form: FormState;
  coords: { lat: number; lng: number };
  onEdit: () => void;
}) {
  const rows: { label: string; value: string }[] = [
    { label: "Далолатнома тури", value: actLabel },
    { label: "Режа номи", value: form.rejaNomi || "—" },
    { label: "Қуввати", value: `${form.quvvati || "—"} ${form.olchovBirligi}` },
    { label: "Сарфланган маблағ", value: `${form.sarflanganMablag || "0"} сўм` },
    { label: "Геопозиция", value: `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/[0.07] p-3.5">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
          <Icon name="tick-circle" size={22} variant="Bold" />
        </span>
        <div>
          <p className="text-[13.5px] font-bold text-text-primary">Сақлашга тайёр</p>
          <p className="text-[11.5px] text-text-secondary">Маълумотларни текшириб, тасдиқланг.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-layered-sm">
        <div className="flex items-center justify-between border-b border-border-light px-3.5 py-2.5">
          <span className="text-[12px] font-bold text-text-primary">Киритилган маълумотлар</span>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1 rounded-full border border-navy/25 bg-white px-2.5 py-1 text-[11px] font-semibold text-navy transition-colors hover:bg-navy/[0.06] active:scale-95"
          >
            <Icon name="document-text" size={12} variant="Bold" /> Таҳрирлаш
          </button>
        </div>
        <div className="divide-y divide-border-light/70">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start justify-between gap-3 px-3.5 py-2.5">
              <span className="text-[11.5px] text-text-secondary">{r.label}</span>
              <span className="max-w-[60%] text-right text-[12.5px] font-semibold text-text-primary">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Обект сарлавҳа картаси (планшет) ───────────────────────────────────── */
function ObjectHeader({ object, actLabel }: { object: InfraObject; actLabel: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-layered-sm">
      <div className="bg-gradient-to-br from-navy to-navy-light px-3.5 py-3 text-white">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
          <Icon name="document-text" size={11} variant="Bold" />
          {actLabel}
        </span>
        <p className="mt-2 text-[12.5px] font-medium leading-relaxed text-white/95">{object.description}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 px-3.5 py-3">
        <ReadonlyChip label="Объект коди" value={object.objectCode} />
        <ReadonlyChip label="ID" value={object.objectId} />
      </div>
    </div>
  );
}

function ReadonlyChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border-light bg-surface/60 px-2.5 py-1.5">
      <p className="flex items-center gap-1 text-[9.5px] font-medium uppercase tracking-wide text-text-secondary">
        <Icon name="document-text" size={10} />
        {label}
      </p>
      <p className="mt-0.5 truncate text-[12px] font-bold tabular-nums text-text-primary">{value}</p>
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
