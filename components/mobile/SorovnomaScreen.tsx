"use client";

/**
 * SorovnomaScreen — мобил илова: «Ижтимоий реестр» сўровнома форма экрани.
 * Манба: ногиронлиги бўлган / ёлғиз / оилада ягона боқувчи оилалар сўровномаси.
 *
 * layout="phone"  — қадамли (wizard): Оила → Томорқа → Фойдаланиш ва ижара → Якунлаш.
 * layout="tablet" — 2 устун (оила+томорқа | фойдаланиш+ижара), якка экран.
 * initialStep — preview учун (телефон wizard'ни маълум қадамдан кўрсатиш).
 *
 * Шартли майдонлар (progressive disclosure):
 *  · кадастр/манзил/майдон — фақат томорқа "Мавжуд" бўлса
 *  · фойдаланмаслик сабаби — фақат "Фойдаланмайди" танланса
 *  · ижара муддати — фақат "Истаги бор" танланса
 */

import { Fragment, useEffect, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import {
  AppBar,
  TextField,
  SelectField,
  TextArea,
  SearchTextField,
  ChoiceToggle,
  SectionCard,
  MobileStyles,
} from "@/components/mobile/material";
import {
  type SocialSurveyFamily,
  TOMORQA_MAVJUDLIGI,
  FOYDALANISH_HOLATI,
  IJARA_ISTAGI,
  IJARA_MUDDATI,
  SUV_TAMINOTI,
  formatJshshir,
  formatPhone,
} from "@/lib/social-survey-data";

export interface SorovnomaScreenProps {
  family: SocialSurveyFamily;
  layout: "phone" | "tablet";
  onBack?: () => void;
  /** телефон wizard учун бошланғич қадам (0..3) — preview учун */
  initialStep?: number;
  /** preview учун бошланғич форма қийматлари (масалан альтернатив шартли тармоқ) */
  initialForm?: Partial<FormState>;
  /** preview учун: биометрик тасдиқ аллақачон бажарилган ҳолат */
  initialFaceVerified?: boolean;
  /** preview учун: юз/бармоқ сканери overlay'ини маълум ҳолатда статик кўрсатиш */
  previewFaceScan?: "scanning" | "success" | "error";
  /** preview учун: сканер overlay усули (Face/Touch) */
  previewMethod?: BiometricMethod;
  /** preview учун: тасдиқланган биометрик усул (Face/Touch) */
  initialVerifiedMethod?: BiometricMethod;
  /** preview учун: сақланган (success) ҳолатни кўрсатиш */
  initialSaved?: boolean;
  /** «Истаги бор» сўровномадан кейин — шартнома тузишга ўтиш */
  onCreateContract?: () => void;
}

type SaveState = "idle" | "saving" | "success";
type CadastreState = "idle" | "searching" | "verified";
/** Юз/бармоқ сканери ҳолати — шартнома экранида ҳам қайта ишлатилади */
export type FaceScanState = "idle" | "scanning" | "success" | "error";

/** Биометрик усул — Face ID (юз) ёки Touch ID (бармоқ изи). */
export type BiometricMethod = "face" | "touch";

const BIO_METHOD: Record<
  BiometricMethod,
  { short: string; verb: string; verified: string; instruction: string; mismatch: string }
> = {
  face: {
    short: "Face ID",
    verb: "Юзни тасдиқлаш",
    verified: "Юз орқали тасдиқланди",
    instruction: "Юзни доира ичида тутиб туринг…",
    mismatch: "Юз «Ижтимоий реестр» сурати билан мос келмади",
  },
  touch: {
    short: "Touch ID",
    verb: "Бармоқ изини тасдиқлаш",
    verified: "Бармоқ изи орқали тасдиқланди",
    instruction: "Бармоғингизни сенсорга қўйиб туринг…",
    mismatch: "Бармоқ изи реестр маълумоти билан мос келмади",
  },
};

/** Бармоқ изи (Touch ID) иконкаси — иконка тўпламида йўқ, inline SVG. */
function FingerprintGlyph({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 10v4c0 1.5-.3 3-1 4.3" />
      <path d="M8.5 8.5A5 5 0 0 1 17 12v2c0 1 .1 2 .4 3" />
      <path d="M5.5 11.5A6.5 6.5 0 0 1 12 5c1.4 0 2.7.4 3.8 1.1" />
      <path d="M9 13v1c0 2-.5 3.8-1.5 5.4" />
      <path d="M12 13.5c0 3-.7 5.8-2.1 8.2" />
      <path d="M15 14c0 2.4.3 4.7 1 6.9" />
    </svg>
  );
}

interface FormState {
  tomorqaMavjud: string;
  kadastrRaqami: string;
  manzil: string;
  erMaydoni: string;
  foydalanishHolati: string;
  foydalanmaslikSababi: string;
  suvTaminoti: string;
  ijaraIstagi: string;
  ijaraMuddati: string;
}

interface FormErrors {
  kadastrRaqami?: string;
  manzil?: string;
  erMaydoni?: string;
  foydalanishHolati?: string;
  foydalanmaslikSababi?: string;
  suvTaminoti?: string;
  ijaraMuddati?: string;
}

const STEPS: { label: string; title: string; icon: IconName }[] = [
  { label: "Оила", title: "Оила маълумотлари", icon: "people" },
  { label: "Томорқа", title: "Томорқа маълумотлари", icon: "tree" },
  { label: "Фойдаланиш", title: "Фойдаланиш ва ижара", icon: "briefcase" },
  { label: "Якун", title: "Якунлаш", icon: "tick-circle" },
];

function buildInitialForm(family: SocialSurveyFamily, overrides?: Partial<FormState>): FormState {
  return {
    tomorqaMavjud: "Мавжуд",
    kadastrRaqami: family.kadastrRaqami,
    manzil: family.manzil,
    erMaydoni: family.erMaydoni,
    foydalanishHolati: "Фойдаланмайди",
    foydalanmaslikSababi:
      "Оила аъзоларида ногиронлик сабабли деҳқончилик қилиш имконияти йўқ.",
    suvTaminoti: "Марказлашган ичимлик суви",
    ijaraIstagi: "Истаги бор",
    ijaraMuddati: "12 ой",
    ...overrides,
  };
}

export default function SorovnomaScreen({
  family,
  layout,
  onBack,
  initialStep = 0,
  initialForm,
  initialFaceVerified = false,
  previewFaceScan,
  previewMethod,
  initialVerifiedMethod = "face",
  initialSaved = false,
  onCreateContract,
}: SorovnomaScreenProps) {
  const isTablet = layout === "tablet";

  const [form, setForm] = useState<FormState>(() => buildInitialForm(family, initialForm));
  const [errors, setErrors] = useState<FormErrors>({});
  const [saveState, setSaveState] = useState<SaveState>(initialSaved ? "success" : "idle");
  const [cadastre, setCadastre] = useState<CadastreState>("verified");
  const [step, setStep] = useState(initialStep);
  const [faceVerified, setFaceVerified] = useState(initialFaceVerified);
  const [verifiedMethod, setVerifiedMethod] = useState<BiometricMethod>(initialVerifiedMethod);
  const [faceScan, setFaceScan] = useState<FaceScanState>(previewFaceScan ?? "idle");
  const [scanMethod, setScanMethod] = useState<BiometricMethod>(previewMethod ?? "face");
  const [showFaceScan, setShowFaceScan] = useState(Boolean(previewFaceScan));

  useEffect(() => {
    setForm(buildInitialForm(family, initialForm));
    setErrors({});
    setSaveState(initialSaved ? "success" : "idle");
    setCadastre("verified");
    setStep(initialStep);
    setFaceVerified(initialFaceVerified);
    setVerifiedMethod(initialVerifiedMethod);
    setFaceScan(previewFaceScan ?? "idle");
    setScanMethod(previewMethod ?? "face");
    setShowFaceScan(Boolean(previewFaceScan));
  }, [family, initialStep, initialForm, initialFaceVerified, previewFaceScan, previewMethod, initialVerifiedMethod, initialSaved]);

  // Сканер ҳолат машинаси (cancel-safe: ҳолат ўзгарса таймер тозаланади).
  // Preview режимида статик туради — авто-ўтиш йўқ.
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

  const hasGarden = form.tomorqaMavjud === "Мавжуд";
  const notUsing = form.foydalanishHolati === "Фойдаланмайди";
  const wantsRent = form.ijaraIstagi === "Истаги бор";

  const updateField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
    if (saveState === "success") setSaveState("idle");
  };

  function searchCadastre() {
    if (!form.kadastrRaqami.trim()) return;
    setCadastre("searching");
    // Реал кадастр lookup шу ерга уланади (манзил + майдон автотўлдирилади).
    window.setTimeout(() => setCadastre("verified"), 850);
  }

  function openScan(method: BiometricMethod) {
    setScanMethod(method);
    setShowFaceScan(true);
    setFaceScan("scanning");
    // Реал биометрия (Face ID / Touch ID) шу ерга уланади: оила бошлиғи
    // юзи/бармоқ изи реестр/паспорт маълумоти билан солиштирилади.
  }

  function closeFaceScan() {
    setShowFaceScan(false);
    setFaceScan("idle");
  }

  function validateGarden(): FormErrors {
    const next: FormErrors = {};
    if (!hasGarden) return next;
    if (!form.kadastrRaqami.trim()) next.kadastrRaqami = "Кадастр рақамини киритинг";
    if (!form.manzil.trim()) next.manzil = "Манзилни киритинг";
    const area = Number(form.erMaydoni.replace(",", "."));
    if (!form.erMaydoni.trim()) next.erMaydoni = "Ер майдонини киритинг";
    else if (!Number.isFinite(area) || area <= 0) next.erMaydoni = "Майдон 0 дан катта бўлсин";
    return next;
  }

  function validateUsage(): FormErrors {
    const next: FormErrors = {};
    if (!hasGarden) return next;
    if (!form.foydalanishHolati) next.foydalanishHolati = "Фойдаланиш ҳолатини танланг";
    if (notUsing && !form.foydalanmaslikSababi.trim())
      next.foydalanmaslikSababi = "Фойдаланмаслик сабабини ёзинг";
    if (!form.suvTaminoti) next.suvTaminoti = "Сув таъминотини танланг";
    if (wantsRent && !form.ijaraMuddati) next.ijaraMuddati = "Муддатни танланг";
    return next;
  }

  function validateAll(): FormErrors {
    return { ...validateGarden(), ...validateUsage() };
  }

  function goNext() {
    let found: FormErrors = {};
    if (step === 1) found = validateGarden();
    if (step === 2) found = validateUsage();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  function goBack() {
    if (step === 0) onBack?.();
    else setStep((s) => s - 1);
  }

  async function handleSave() {
    const found = validateAll();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStep(found.kadastrRaqami || found.manzil || found.erMaydoni ? 1 : 2);
      return;
    }
    // Биометрик тасдиқ — сақлаш учун мажбурий (тугма ҳам disabled, бу қўшимча ҳимоя).
    if (!faceVerified) {
      openScan("face");
      return;
    }
    setSaveState("saving");
    // Реал backend POST шу ерга уланади (сўровнома + оила ID).
    await new Promise((r) => setTimeout(r, 900));
    setSaveState("success");
  }

  /* ── Қайта ишлатиладиган блоклар ──────────────────────────────────────── */

  const familyBlock = <FamilyHeader family={family} />;

  const gardenBlock = (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-[12.5px] font-semibold text-text-label">
          Томорқаси мавжудлиги <span className="text-danger">*</span>
        </p>
        <ChoiceToggle
          ariaLabel="Томорқаси мавжудлиги"
          value={form.tomorqaMavjud}
          onChange={(v) => updateField("tomorqaMavjud", v)}
          options={[
            { value: TOMORQA_MAVJUDLIGI[0], label: "Мавжуд", icon: "tick-circle" },
            { value: TOMORQA_MAVJUDLIGI[1], label: "Мавжуд эмас", icon: "close-circle" },
          ]}
        />
      </div>

      {hasGarden ? (
        <>
          <SearchTextField
            label="Кадастр рақами"
            value={form.kadastrRaqami}
            onChange={(v) => {
              updateField("kadastrRaqami", v);
              setCadastre("idle");
            }}
            onSearch={searchCadastre}
            searching={cadastre === "searching"}
            verified={cadastre === "verified"}
            required
            stackAction={!isTablet}
            error={errors.kadastrRaqami}
            placeholder="00:00:00:00:00:0000"
            leadingIcon="location"
            helper={
              cadastre === "verified"
                ? "Кадастрдан тасдиқланди — манзил ва майдон автотўлдирилди"
                : "Рақамни киритиб «Қидириш» босинг"
            }
          />
          <TextField
            label="Манзили"
            value={form.manzil}
            onChange={(v) => updateField("manzil", v)}
            required
            error={errors.manzil}
            placeholder="МФЙ, кўча, уй"
            leadingIcon="home"
          />
          <TextField
            label="Ер майдони (сотих)"
            value={form.erMaydoni}
            onChange={(v) => updateField("erMaydoni", v)}
            required
            inputMode="decimal"
            error={errors.erMaydoni}
            placeholder="0.00"
            leadingIcon="ruler"
            helper={!errors.erMaydoni ? "1 сотих = 100 м²" : undefined}
          />
        </>
      ) : (
        <InfoNote
          icon="warning"
          tone="warning"
          title="Томорқа мавжуд эмас"
          text="Кадастр, манзил ва фойдаланиш маълумотлари талаб қилинмайди. Якунлашга ўтинг."
        />
      )}
    </div>
  );

  const usageBlock = hasGarden ? (
    <div className="flex flex-col gap-4">
      <SelectField
        label="Томорқадан фойдаланиш ҳолати"
        value={form.foydalanishHolati}
        options={FOYDALANISH_HOLATI}
        onChange={(v) => updateField("foydalanishHolati", v)}
        required
        error={errors.foydalanishHolati}
      />
      {notUsing && (
        <TextArea
          label="Фойдаланмаслик сабаби"
          value={form.foydalanmaslikSababi}
          onChange={(v) => updateField("foydalanmaslikSababi", v)}
          required
          error={errors.foydalanmaslikSababi}
          placeholder="Сабабни батафсил ёзинг…"
        />
      )}
      <SelectField
        label="Томорқанинг сув таъминоти ҳолати"
        value={form.suvTaminoti}
        options={SUV_TAMINOTI}
        onChange={(v) => updateField("suvTaminoti", v)}
        required
        error={errors.suvTaminoti}
      />

      <div className="mt-1 rounded-2xl border border-border-light bg-slate-50/70 p-3.5">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-navy/[0.08] text-navy">
            <Icon name="wallet" size={16} variant="Bold" />
          </span>
          <p className="text-[13px] font-bold text-text-primary">
            Ҳақ эвазига ижарага бериш
          </p>
        </div>
        <ChoiceToggle
          ariaLabel="Ижарага бериш истаги"
          value={form.ijaraIstagi}
          onChange={(v) => updateField("ijaraIstagi", v)}
          options={[
            { value: IJARA_ISTAGI[0], label: "Истаги бор", icon: "tick-circle" },
            { value: IJARA_ISTAGI[1], label: "Истаги йўқ", icon: "close-circle" },
          ]}
        />
        {wantsRent && (
          <div className="mt-3">
            <SelectField
              label="Қанча муддатга бериш мумкин (ой)"
              value={form.ijaraMuddati}
              options={IJARA_MUDDATI}
              onChange={(v) => updateField("ijaraMuddati", v)}
              required
              error={errors.ijaraMuddati}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <InfoNote
      icon="warning"
      tone="warning"
      title="Маълумот талаб қилинмайди"
      text="Томорқа мавжуд эмаслиги сабабли фойдаланиш ва ижара бўлими ўтказиб юборилди."
    />
  );

  return (
    <div className="relative flex flex-1 flex-col bg-gradient-to-b from-[#e9f0fb] via-[#f1f5fb] to-[#f5f8fc]">
      <MobileStyles />
      <style>{`
        @keyframes sorovStep { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .sorov-step { animation: sorovStep .34s cubic-bezier(0.16,1,0.3,1); }
        @media (prefers-reduced-motion: reduce) { .sorov-step { animation: none; } }
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
        title="Сўровнома"
        subtitle={isTablet ? "Ижтимоий реестр" : `${STEPS[step].title} · ${step + 1}/${STEPS.length}`}
        onBack={goBack}
        trailing={
          <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold text-white">
            <Icon name="shield-tick" size={12} variant="Bold" />
            Реестр
          </span>
        }
      />

      {isTablet ? (
        /* ── ПЛАНШЕТ: 2 устун ── */
        <div className="flex-1">
          <div className="border-b border-border-light bg-white px-4 py-3">
            <p className="text-[12.5px] font-semibold leading-snug text-text-primary">
              «Ижтимоий реестр»да турувчи ногиронлиги бўлган, ёлғиз ва оилада ягона
              боқувчи оилалар сўровномаси
            </p>
          </div>
          <div className="flex items-start gap-6 p-5">
            <div className="flex w-1/2 flex-col gap-5">
              {familyBlock}
              <SectionCard icon="tree" title="Томорқа маълумотлари" meta="Кадастр, манзил, ер майдони">
                {gardenBlock}
              </SectionCard>
            </div>
            <div className="flex w-1/2 flex-col gap-5">
              <SectionCard
                icon="briefcase"
                title="Фойдаланиш ва ижара"
                meta="Фойдаланиш ҳолати, сув таъминоти, ижара"
              >
                {usageBlock}
              </SectionCard>
              <BiometricCard
                verified={faceVerified}
                verifiedMethod={verifiedMethod}
                familyName={family.oilaBoshligiFio}
                onVerify={openScan}
              />
            </div>
          </div>
        </div>
      ) : (
        /* ── ТЕЛЕФОН: қадамли wizard ── */
        <>
          <div className="shrink-0 border-b border-border-light bg-white px-3.5 py-2">
            <p className="truncate text-[12.5px] font-semibold text-text-primary">
              {family.oilaBoshligiFio}
            </p>
            <p className="truncate text-[10.5px] tabular-nums text-text-secondary">
              ЖШШИР: {formatJshshir(family.jshshir)}
            </p>
          </div>

          <div className="shrink-0 bg-white px-3 pb-3 pt-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
            <Stepper current={step} onStep={(i) => i < step && setStep(i)} />
          </div>

          <div key={step} className="sorov-step flex-1 px-3.5 py-4">
            {step === 0 && (
              <div className="flex flex-col gap-4">
                <InfoNote
                  icon="shield-tick"
                  tone="navy"
                  title="«Ижтимоий реестр»дан олинди"
                  text="Қуйидаги маълумотлар автоматик тўлдирилган ва таҳрирланмайди."
                />
                {familyBlock}
              </div>
            )}
            {step === 1 && (
              <SectionCard icon="tree" title="Томорқа маълумотлари" meta="Кадастр, манзил, ер майдони">
                {gardenBlock}
              </SectionCard>
            )}
            {step === 2 && (
              <SectionCard
                icon="briefcase"
                title="Фойдаланиш ва ижара"
                meta="Фойдаланиш ҳолати, сув таъминоти, ижара"
              >
                {usageBlock}
              </SectionCard>
            )}
            {step === 3 && (
              <ReviewStep
                family={family}
                form={form}
                hasGarden={hasGarden}
                notUsing={notUsing}
                wantsRent={wantsRent}
                onEdit={() => setStep(1)}
                faceVerified={faceVerified}
                verifiedMethod={verifiedMethod}
                onVerifyFace={openScan}
              />
            )}
          </div>
        </>
      )}

      {saveState === "success" && (
        <SavedModal
          wantsRent={hasGarden && wantsRent}
          onCreateContract={onCreateContract}
          onBack={onBack}
          onClose={() => setSaveState("idle")}
        />
      )}

      {/* Bottom action bar */}
      <div className="shrink-0 border-t border-border-light bg-white px-3 pb-5 pt-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
        {!isTablet && hasErrors(errors) && (
          <p className="mb-2 flex items-center gap-1 text-[11.5px] font-medium text-danger">
            <Icon name="warning" size={13} variant="Bold" />
            Мажбурий майдонларни тўлдиринг
          </p>
        )}
        {(isTablet || step === STEPS.length - 1) && !faceVerified && !hasErrors(errors) && (
          <p className="mb-2 flex items-center gap-1 text-[11.5px] font-medium text-text-secondary">
            <Icon name="scan" size={13} variant="Bold" />
            Сақлаш учун оила бошлиғи юзини тасдиқланг
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
                <><Spinner /> Сақланмоқда…</>
              ) : saveState === "success" ? (
                <><Icon name="tick-circle" size={18} variant="Bold" /> Сақланди</>
              ) : !faceVerified ? (
                <><Icon name="scan" size={17} variant="Bold" /> Тасдиқлангач сақлаш</>
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

/* ── Оила сарлавҳа картаси (реестр маълумотлари) ──────────────────────────── */
export function FamilyHeader({ family }: { family: SocialSurveyFamily }) {
  const initials = family.oilaBoshligiFio
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
  const rows: { icon: IconName; label: string; value: string }[] = [
    { icon: "profile", label: "Оила бошлиғи Ф.И.О.си", value: family.oilaBoshligiFio },
    { icon: "personal-card", label: "ЖШШИР", value: formatJshshir(family.jshshir) },
    { icon: "call", label: "Телефон рақами", value: formatPhone(family.telefon) },
    { icon: "people", label: "Оила аъзолари сони", value: `${family.oilaAzolariSoni} нафар` },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-layered-sm">
      <div className="flex items-center gap-2 bg-gradient-to-br from-navy to-navy-light px-4 py-3 text-white">
        <Icon name="shield-tick" size={17} variant="Bold" />
        <p className="text-[12.5px] font-bold uppercase tracking-wide">Оила маълумотлари</p>
        <span
          aria-hidden
          className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-[12.5px] font-bold tabular-nums ring-1 ring-white/25 backdrop-blur-sm"
        >
          {initials}
        </span>
      </div>
      <div className="divide-y divide-border-light/70">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3.5 px-4 py-3.5">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/[0.07] text-navy">
              <Icon name={r.icon} size={18} variant="Bold" />
            </span>
            <div className="min-w-0">
              <p className="text-[10.5px] font-medium uppercase tracking-wide text-text-secondary">
                {r.label}
              </p>
              <p className="mt-0.5 truncate text-[14px] font-bold tabular-nums text-text-primary">
                {r.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── InfoNote — рангли эслатма банери ─────────────────────────────────────── */
export function InfoNote({
  icon,
  tone,
  title,
  text,
}: {
  icon: IconName;
  tone: "navy" | "warning";
  title: string;
  text: string;
}) {
  const toneClass =
    tone === "navy"
      ? "border-navy/20 bg-navy/[0.06] text-navy"
      : "border-warning/30 bg-warning/[0.10] text-[#b45309]";
  return (
    <div className={`flex items-start gap-2.5 rounded-2xl border p-3 ${toneClass}`}>
      <Icon name={icon} size={18} variant="Bold" className="mt-0.5 shrink-0" />
      <div>
        <p className="text-[12.5px] font-bold leading-tight">{title}</p>
        <p className="mt-0.5 text-[11.5px] font-medium leading-snug opacity-90">{text}</p>
      </div>
    </div>
  );
}

/* ── Stepper индикатори ───────────────────────────────────────────────────── */
export function Stepper({ current, onStep }: { current: number; onStep: (i: number) => void }) {
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
                    ? "bg-success text-white shadow-[0_3px_10px_rgba(34,197,94,0.4)]"
                    : active
                      ? "bg-gradient-to-br from-navy to-navy-light text-white ring-4 ring-navy/15 shadow-[0_5px_14px_rgba(43,140,238,0.45)]"
                      : "border border-border-light bg-white text-text-secondary"
                } ${done ? "cursor-pointer" : "cursor-default"}`}
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
      {/* Ёрлиқлар — доиралар қатори билан бир хил flex структура (марказлар тўғри келади) */}
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

/* ── Якунлаш қадами — текшириш ────────────────────────────────────────────── */
function ReviewStep({
  family,
  form,
  hasGarden,
  notUsing,
  wantsRent,
  onEdit,
  faceVerified,
  verifiedMethod,
  onVerifyFace,
}: {
  family: SocialSurveyFamily;
  form: FormState;
  hasGarden: boolean;
  notUsing: boolean;
  wantsRent: boolean;
  onEdit: () => void;
  faceVerified: boolean;
  verifiedMethod: BiometricMethod;
  onVerifyFace: (method: BiometricMethod) => void;
}) {
  const rows: { label: string; value: string }[] = [
    { label: "Оила бошлиғи", value: family.oilaBoshligiFio },
    { label: "Томорқа", value: form.tomorqaMavjud },
  ];
  if (hasGarden) {
    rows.push(
      { label: "Кадастр рақами", value: form.kadastrRaqami || "—" },
      { label: "Манзил", value: form.manzil || "—" },
      { label: "Ер майдони", value: form.erMaydoni ? `${form.erMaydoni} сотих` : "—" },
      { label: "Фойдаланиш ҳолати", value: form.foydalanishHolati || "—" },
    );
    if (notUsing)
      rows.push({ label: "Фойдаланмаслик сабаби", value: form.foydalanmaslikSababi || "—" });
    rows.push(
      { label: "Сув таъминоти", value: form.suvTaminoti || "—" },
      { label: "Ижара истаги", value: form.ijaraIstagi },
    );
    if (wantsRent) rows.push({ label: "Ижара муддати", value: form.ijaraMuddati || "—" });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/[0.07] p-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
          <Icon name="tick-circle" size={23} variant="Bold" />
        </span>
        <div>
          <p className="text-[14px] font-bold text-text-primary">Сақлашга тайёр</p>
          <p className="text-[11.5px] text-text-secondary">Маълумотларни текшириб, тасдиқланг.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-layered-sm">
        <div className="flex items-center justify-between border-b border-border-light bg-gradient-to-r from-slate-50 to-white px-4 py-3">
          <span className="text-[13px] font-bold text-text-primary">Киритилган маълумотлар</span>
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
            <div key={r.label} className="flex items-start justify-between gap-3 px-4 py-3">
              <span className="shrink-0 text-[12px] text-text-secondary">{r.label}</span>
              <span className="max-w-[62%] text-right text-[13px] font-semibold text-text-primary">
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BiometricCard
        verified={faceVerified}
        verifiedMethod={verifiedMethod}
        familyName={family.oilaBoshligiFio}
        onVerify={onVerifyFace}
      />
    </div>
  );
}

/* ── Биометрик тасдиқлаш картаси (Face ID / Touch ID) ─────────────────────── */
export function BiometricCard({
  verified,
  verifiedMethod = "face",
  familyName,
  onVerify,
}: {
  verified: boolean;
  verifiedMethod?: BiometricMethod;
  familyName: string;
  onVerify: (method: BiometricMethod) => void;
}) {
  if (verified) {
    const isTouch = verifiedMethod === "touch";
    return (
      <div className="overflow-hidden rounded-2xl border border-success/30 bg-gradient-to-br from-success/[0.12] to-success/[0.03] p-4 shadow-layered-sm">
        <div className="flex items-center gap-3.5">
          <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-success/15 text-success">
            {isTouch ? (
              <FingerprintGlyph size={26} className="text-success" />
            ) : (
              <Icon name="user-tick" size={26} variant="Bold" />
            )}
            <span className="absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-success text-white shadow-sm">
              <Icon name="tick-circle" size={13} variant="Bold" />
            </span>
          </span>
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-text-primary">{BIO_METHOD[verifiedMethod].verified}</p>
            <p className="truncate text-[12px] text-text-secondary">
              {familyName} · шахси тасдиқланди
            </p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10.5px] font-bold text-success">
              <Icon name="shield-tick" size={11} variant="Bold" />
              Биометрик тасдиқ фаол
            </span>
          </div>
        </div>
      </div>
    );
  }

  const trust: { icon: IconName; text: string }[] = [
    { icon: "time", text: "Бир неча сония" },
    { icon: "shield-tick", text: "Маълумот сақланмайди" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-navy/20 bg-white shadow-layered-sm">
      <div className="flex items-start gap-2.5 bg-gradient-to-r from-navy/[0.09] to-navy/[0.02] px-4 py-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
          <Icon name="scan" size={18} variant="Bold" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[14px] font-bold leading-tight text-text-primary">
            Биометрик тасдиқлаш
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <p className="min-w-0 truncate text-[11px] leading-tight text-text-secondary">
              Мажбурий қадам
            </p>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 text-[10px] font-bold text-[#b45309]">
              <Icon name="time" size={11} variant="Bold" />
              Кутилмоқда
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[12px] leading-snug text-text-secondary">
          Оила бошлиғи <span className="font-semibold text-text-primary">{familyName}</span> шахсини
          тасдиқланг — <span className="font-semibold text-text-primary">Face ID</span> (юз) ёки{" "}
          <span className="font-semibold text-text-primary">Touch ID</span> (бармоқ изи) орқали.
        </p>

        <div className="mb-3.5 mt-3 grid grid-cols-2 gap-2">
          {trust.map((t) => (
            <div
              key={t.text}
              className="flex items-center gap-2 rounded-xl border border-border-light bg-slate-50/70 px-2.5 py-2"
            >
              <Icon name={t.icon} size={15} variant="Bold" className="shrink-0 text-navy/70" />
              <span className="text-[11px] font-medium text-text-primary">{t.text}</span>
            </div>
          ))}
        </div>

        {/* 2 усул — Face ID / Touch ID */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onVerify("face")}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy to-navy-light text-[13.5px] font-bold text-white shadow-[0_8px_20px_rgba(43,140,238,0.42)] transition-all hover:brightness-[1.08] active:scale-[0.98]"
          >
            <Icon name="scan" size={17} variant="Bold" />
            Face ID
          </button>
          <button
            type="button"
            onClick={() => onVerify("touch")}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-navy/25 bg-navy/[0.04] text-[13.5px] font-bold text-navy transition-colors hover:bg-navy/[0.09] active:scale-[0.98]"
          >
            <FingerprintGlyph size={18} className="text-navy" />
            Touch ID
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── FaceScanOverlay — тўлиқ экранли биометрик сканер (Face ID / Touch ID) ──── */
export function FaceScanOverlay({
  state,
  method = "face",
  familyName,
  onClose,
  onRetry,
}: {
  state: FaceScanState;
  method?: BiometricMethod;
  familyName: string;
  onClose: () => void;
  onRetry: () => void;
}) {
  const success = state === "success";
  const error = state === "error";
  const isTouch = method === "touch";
  const title = success ? "Шахс тасдиқланди" : error ? "Тасдиқлаб бўлмади" : BIO_METHOD[method].verb;
  const bracketColor = success ? "border-success" : error ? "border-danger" : "face-bracket border-sky-400";
  const faceTone = success ? "text-success/70" : error ? "text-danger/55" : "text-white/25";

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-7 bg-[#0b1220]/95 px-6 text-center backdrop-blur-sm">
      <style>{`
        @keyframes faceSweep { 0%{transform:translateY(-78px);opacity:0} 12%{opacity:1} 88%{opacity:1} 100%{transform:translateY(78px);opacity:0} }
        @keyframes faceBracket { 0%,100%{opacity:.55} 50%{opacity:1} }
        @keyframes facePop { 0%{transform:scale(.4);opacity:0} 60%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
        .face-sweep { animation: faceSweep 1.9s cubic-bezier(0.4,0,0.2,1) infinite; }
        .face-bracket { animation: faceBracket 1.6s ease-in-out infinite; }
        .face-pop { animation: facePop .45s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .face-sweep, .face-bracket { animation: none; }
          .face-pop { animation: none; opacity: 1; }
        }
      `}</style>

      <button
        type="button"
        onClick={onClose}
        aria-label="Бекор қилиш"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/90 transition-colors hover:bg-white/20 active:scale-90"
      >
        <Icon name="close-circle" size={24} variant="Bold" />
      </button>

      <div>
        <p className="text-[17px] font-bold text-white">{title}</p>
        <p className="mt-1 text-[12.5px] text-white/65">{familyName}</p>
      </div>

      {/* Сканер ромкаси */}
      <div className="relative h-[208px] w-[208px]">
        {/* Бурчак кронштейнлар */}
        {[
          "left-0 top-0 border-l-[3px] border-t-[3px] rounded-tl-[34px]",
          "right-0 top-0 border-r-[3px] border-t-[3px] rounded-tr-[34px]",
          "left-0 bottom-0 border-b-[3px] border-l-[3px] rounded-bl-[34px]",
          "right-0 bottom-0 border-b-[3px] border-r-[3px] rounded-br-[34px]",
        ].map((pos) => (
          <span key={pos} className={`absolute h-12 w-12 ${pos} ${bracketColor}`} />
        ))}

        {/* Юз / бармоқ изи силуэти */}
        <div className="absolute inset-[26px] flex items-center justify-center overflow-hidden rounded-full bg-white/[0.04]">
          {isTouch ? (
            <FingerprintGlyph size={96} className={faceTone} />
          ) : (
            <Icon name="profile" size={104} variant="Bulk" className={faceTone} />
          )}
          {/* Сканерлаш чизиғи — фақат сканерлаш пайтида */}
          {!success && !error && (
            <span className="face-sweep pointer-events-none absolute left-3 right-3 h-[3px] rounded-full bg-sky-400 shadow-[0_0_14px_4px_rgba(56,189,248,0.7)]" />
          )}
        </div>

        {/* Муваффақият / хато белгиси */}
        {(success || error) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`face-pop inline-flex h-[88px] w-[88px] items-center justify-center rounded-full text-white ${
                success
                  ? "bg-success shadow-[0_10px_30px_rgba(34,197,94,0.5)]"
                  : "bg-danger shadow-[0_10px_30px_rgba(239,68,68,0.5)]"
              }`}
            >
              <Icon name={success ? "tick-circle" : "close-circle"} size={52} variant="Bold" />
            </span>
          </div>
        )}
      </div>

      <p className="flex items-center gap-2 px-4 text-[13px] font-medium text-white/80">
        {success ? (
          <>
            <Icon name="user-tick" size={16} variant="Bold" className="text-success" />
            Биометрик тасдиқ муваффақиятли
          </>
        ) : error ? (
          <>
            <Icon name="warning" size={16} variant="Bold" className="text-danger" />
            {BIO_METHOD[method].mismatch}
          </>
        ) : (
          <>
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sky-400" />
            {BIO_METHOD[method].instruction}
          </>
        )}
      </p>

      {/* Хато ҳолатида — қайта уриниш */}
      {error && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-bold text-[#0b1220] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform active:scale-[0.97]"
        >
          <Icon name="refresh" size={17} variant="Bold" />
          Қайта уриниш
        </button>
      )}
    </div>
  );
}

/* ── SavedModal — «Сўровнома сақланди» тасдиқ ойнаси (модал) ───────────────── */
export function SavedModal({
  wantsRent,
  onCreateContract,
  onBack,
  onClose,
}: {
  /** «Истаги бор» — ижарага рози: шартнома тузишга ўтиш таклифи кўрсатилади */
  wantsRent: boolean;
  onCreateContract?: () => void;
  onBack?: () => void;
  onClose: () => void;
}) {
  // Esc билан ёпиш — клавиатура фойдаланувчилари учун
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="saved-backdrop absolute inset-0 z-50 flex items-center justify-center bg-[#0b1220]/45 px-5 backdrop-blur-[3px]">
      <style>{`
        @keyframes savedBackdrop { from { opacity: 0 } to { opacity: 1 } }
        @keyframes savedCard { 0% { opacity: 0; transform: translateY(14px) scale(.94) } 100% { opacity: 1; transform: none } }
        @keyframes savedPop { 0% { transform: scale(.3); opacity: 0 } 60% { transform: scale(1.14) } 100% { transform: scale(1); opacity: 1 } }
        @keyframes savedRing { 0% { transform: scale(.65); opacity: .5 } 100% { transform: scale(1.6); opacity: 0 } }
        .saved-backdrop { animation: savedBackdrop .22s ease-out }
        .saved-card { animation: savedCard .4s cubic-bezier(0.16,1,0.3,1) }
        .saved-pop { animation: savedPop .5s cubic-bezier(0.34,1.56,0.64,1) forwards }
        .saved-ring { animation: savedRing 1.5s ease-out infinite }
        @media (prefers-reduced-motion: reduce) {
          .saved-backdrop, .saved-card, .saved-pop { animation: none; opacity: 1 }
          .saved-ring { animation: none; opacity: 0 }
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-modal-title"
        className="saved-card relative w-full max-w-[330px] overflow-hidden rounded-3xl border border-white/60 bg-white p-6 text-center shadow-[0_30px_70px_-12px_rgba(15,23,42,0.5)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Ёпиш"
          className="absolute right-3.5 top-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-slate-100 active:scale-90"
        >
          <Icon name="close-circle" size={22} variant="Bold" />
        </button>

        {/* Муваффақият белгиси — пульсли ҳалқа + поп */}
        <div className="relative mx-auto mb-4 mt-1 flex h-[68px] w-[68px] items-center justify-center">
          <span aria-hidden className="saved-ring absolute inset-0 rounded-full bg-success/30" />
          <span className="saved-pop relative inline-flex h-[68px] w-[68px] items-center justify-center rounded-full bg-success text-white shadow-[0_12px_30px_rgba(34,197,94,0.45)]">
            <Icon name="tick-circle" size={40} variant="Bold" />
          </span>
        </div>

        <p id="saved-modal-title" className="text-[17px] font-extrabold text-text-primary">
          Сўровнома сақланди
        </p>
        <p className="mx-auto mt-1.5 max-w-[260px] text-[12.5px] leading-snug text-text-secondary">
          {wantsRent
            ? "Оила ижарага рози — энди шартнома тузишингиз мумкин."
            : "Маълумотлар муваффақиятли юборилди ва рўйхатга қўшилди."}
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          {wantsRent ? (
            <>
              <button
                type="button"
                onClick={onCreateContract}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy to-navy-light text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(43,140,238,0.42)] transition-all hover:brightness-[1.08] active:scale-[0.98]"
              >
                <Icon name="document-text" size={17} variant="Bold" />
                Шартнома тузиш
              </button>
              <button
                type="button"
                onClick={onBack ?? onClose}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full text-[13.5px] font-semibold text-text-secondary transition-colors hover:bg-slate-100 active:scale-[0.98]"
              >
                Рўйхатга қайтиш
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onBack ?? onClose}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy to-navy-light text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(43,140,238,0.42)] transition-all hover:brightness-[1.08] active:scale-[0.98]"
            >
              <Icon name="arrow-left" size={16} variant="Bold" />
              Рўйхатга қайтиш
            </button>
          )}
        </div>
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
