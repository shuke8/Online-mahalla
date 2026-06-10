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
  SectionTitle,
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
}

type SaveState = "idle" | "saving" | "success";
type CadastreState = "idle" | "searching" | "verified";

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

function buildInitialForm(family: SocialSurveyFamily): FormState {
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
  };
}

export default function SorovnomaScreen({
  family,
  layout,
  onBack,
  initialStep = 0,
}: SorovnomaScreenProps) {
  const isTablet = layout === "tablet";

  const [form, setForm] = useState<FormState>(() => buildInitialForm(family));
  const [errors, setErrors] = useState<FormErrors>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [cadastre, setCadastre] = useState<CadastreState>("verified");
  const [step, setStep] = useState(initialStep);

  useEffect(() => {
    setForm(buildInitialForm(family));
    setErrors({});
    setSaveState("idle");
    setCadastre("verified");
    setStep(initialStep);
  }, [family, initialStep]);

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
    setSaveState("saving");
    // Реал backend POST шу ерга уланади (сўровнома + оила ID).
    await new Promise((r) => setTimeout(r, 900));
    setSaveState("success");
  }

  /* ── Қайта ишлатиладиган блоклар ──────────────────────────────────────── */

  const familyBlock = <FamilyHeader family={family} />;

  const gardenBlock = (
    <div className="flex flex-col gap-3">
      <div>
        <p className="mb-1.5 text-[12px] font-semibold text-text-label">
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
    <div className="flex flex-col gap-3">
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

      <div className="mt-1 rounded-2xl border border-border-light bg-white p-3 shadow-layered-sm">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-navy/[0.08] text-navy">
            <Icon name="wallet" size={15} variant="Bold" />
          </span>
          <p className="text-[12.5px] font-bold text-text-primary">
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
    <div className="flex flex-1 flex-col bg-[#f4f7fb]">
      <MobileStyles />

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
          <div className="flex items-start gap-4 p-4">
            <div className="flex w-[54%] flex-col gap-4">
              {familyBlock}
              <div>
                <SectionTitle icon="tree">Томорқа маълумотлари</SectionTitle>
                <div className="mt-2">{gardenBlock}</div>
              </div>
            </div>
            <div className="flex w-[46%] flex-col gap-4">
              <div>
                <SectionTitle icon="briefcase">Фойдаланиш ва ижара</SectionTitle>
                <div className="mt-2">{usageBlock}</div>
              </div>
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

          <div className="flex-1 px-3.5 py-4">
            {step === 0 && (
              <div className="flex flex-col gap-3">
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
              <div>
                <SectionTitle icon="tree">Томорқа маълумотлари</SectionTitle>
                <div className="mt-2.5">{gardenBlock}</div>
              </div>
            )}
            {step === 2 && (
              <div>
                <SectionTitle icon="briefcase">Фойдаланиш ва ижара</SectionTitle>
                <div className="mt-2.5">{usageBlock}</div>
              </div>
            )}
            {step === 3 && (
              <ReviewStep family={family} form={form} hasGarden={hasGarden} notUsing={notUsing} wantsRent={wantsRent} onEdit={() => setStep(1)} />
            )}
          </div>
        </>
      )}

      {saveState === "success" && (
        <div className="shrink-0 px-3 pb-1">
          <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-success/25 bg-success/[0.12] px-3 py-2.5 text-success shadow-layered-sm"
          >
            <Icon name="tick-circle" size={18} variant="Bold" />
            <p className="text-[13px] font-semibold">Сўровнома сақланди</p>
          </div>
        </div>
      )}

      {/* Bottom action bar */}
      <div className="shrink-0 border-t border-border-light bg-white px-3 pb-5 pt-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
        {!isTablet && hasErrors(errors) && (
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

/* ── Оила сарлавҳа картаси (реестр маълумотлари) ──────────────────────────── */
function FamilyHeader({ family }: { family: SocialSurveyFamily }) {
  const rows: { icon: IconName; label: string; value: string }[] = [
    { icon: "profile", label: "Оила бошлиғи Ф.И.О.си", value: family.oilaBoshligiFio },
    { icon: "personal-card", label: "ЖШШИР", value: formatJshshir(family.jshshir) },
    { icon: "call", label: "Телефон рақами", value: formatPhone(family.telefon) },
    { icon: "people", label: "Оила аъзолари сони", value: `${family.oilaAzolariSoni} нафар` },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-layered-sm">
      <div className="flex items-center gap-2 bg-gradient-to-br from-navy to-navy-light px-3.5 py-2.5 text-white">
        <Icon name="shield-tick" size={16} variant="Bold" />
        <p className="text-[12px] font-bold uppercase tracking-wide">Оила маълумотлари</p>
      </div>
      <div className="divide-y divide-border-light/70">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3 px-3.5 py-2.5">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy/[0.07] text-navy">
              <Icon name={r.icon} size={17} variant="Bold" />
            </span>
            <div className="min-w-0">
              <p className="text-[10.5px] font-medium uppercase tracking-wide text-text-secondary">
                {r.label}
              </p>
              <p className="mt-0.5 truncate text-[13.5px] font-bold tabular-nums text-text-primary">
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
function InfoNote({
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
          <span
            key={s.label}
            className={`truncate px-0.5 text-[9.5px] font-semibold ${i === current ? "text-navy" : "text-text-secondary/80"}`}
          >
            {s.label}
          </span>
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
}: {
  family: SocialSurveyFamily;
  form: FormState;
  hasGarden: boolean;
  notUsing: boolean;
  wantsRent: boolean;
  onEdit: () => void;
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
              <span className="shrink-0 text-[11.5px] text-text-secondary">{r.label}</span>
              <span className="max-w-[62%] text-right text-[12.5px] font-semibold text-text-primary">
                {r.value}
              </span>
            </div>
          ))}
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
