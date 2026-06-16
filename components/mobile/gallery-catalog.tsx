"use client";

/**
 * gallery-catalog — сўровнома ва биометрикада ишлатилган БАРЧА компонентлар
 * ва уларнинг ҳолатлари (статуслари) каталоги. Ҳар компонент реал (SSOT) —
 * material.tsx / SorovnomaScreen / BiometrikaScreen'дан импорт қилинади.
 */

import { Icon } from "@/components/atoms/Icon";
import {
  AppBar,
  TextField,
  SelectField,
  TextArea,
  SearchTextField,
  ChoiceToggle,
  SectionCard,
} from "@/components/mobile/material";
import {
  FamilyHeader,
  InfoNote,
  Stepper,
  BiometricCard,
} from "@/components/mobile/SorovnomaScreen";
import { FaceRing, PrimaryButton, GhostButton } from "@/components/mobile/BiometrikaScreen";
import { sampleSurveyFamily, FOYDALANISH_HOLATI } from "@/lib/social-survey-data";
import { Section, Spec, Variant } from "@/components/mobile/gallery-kit";

const noop = () => {};
const family = sampleSurveyFamily;

export function GalleryCatalog() {
  return (
    <div className="flex flex-col gap-12">
      {/* ── МАЙДОНЛАР ── */}
      <Section icon="document-text" title="Майдонлар" subtitle="Матн, танлов ва қидирув киритмалари">
        <Spec title="TextField" desc="Ёрлиқ + иконка + navy focus glow. Хато ва фақат-ўқиш ҳолатлари.">
          <Variant label="Тўлдирилган + ёрдам">
            <TextField label="Манзили" value="Ғафур Ғулом МФЙ, 5-уй" onChange={noop} leadingIcon="home" helper="МФЙ, кўча, уй" />
          </Variant>
          <Variant label="Хато">
            <TextField label="Ер майдони" value="" onChange={noop} leadingIcon="ruler" error="Ер майдонини киритинг" />
          </Variant>
          <Variant label="Фақат ўқиш">
            <TextField label="ЖШШИР" value="42 309 956 460 019" onChange={noop} readOnly />
          </Variant>
        </Spec>

        <Spec title="SelectField" desc="Юмалоқ dropdown (native select + кастом каплет).">
          <Variant label="Танланган">
            <SelectField label="Фойдаланиш ҳолати" value={FOYDALANISH_HOLATI[2]} options={FOYDALANISH_HOLATI} onChange={noop} />
          </Variant>
          <Variant label="Хато">
            <SelectField label="Сув таъминоти" value="" options={["", "Марказлашган сув"]} onChange={noop} error="Сув таъминотини танланг" />
          </Variant>
        </Spec>

        <Spec title="TextArea" desc="Кўп қаторли, белги ҳисоблагич билан.">
          <Variant label="Тўлдирилган">
            <TextArea
              label="Фойдаланмаслик сабаби"
              value="Оила аъзоларида ногиронлик сабабли деҳқончилик имконияти йўқ."
              onChange={noop}
            />
          </Variant>
        </Spec>

        <Spec title="SearchTextField" desc="Киритма + «Қидириш». idle → searching → verified. stackAction — телефонда тугма остида.">
          <Variant label="Тасдиқланган (inline)">
            <SearchTextField label="Кадастр рақами" value="20:12:01:05:01:0000" onChange={noop} onSearch={noop} verified leadingIcon="location" helper="Кадастрдан тасдиқланди" />
          </Variant>
          <Variant label="Қидирилмоқда">
            <SearchTextField label="Кадастр рақами" value="20:12:01:05:01:0000" onChange={noop} onSearch={noop} searching leadingIcon="location" />
          </Variant>
          <Variant label="Телефон (stackAction)">
            <SearchTextField label="Кадастр рақами" value="20:12:01:05:01:0000" onChange={noop} onSearch={noop} verified stackAction leadingIcon="location" />
          </Variant>
        </Spec>
      </Section>

      {/* ── ТАНЛОВ ── */}
      <Section icon="hierarchy" title="Танлов" subtitle="Сегментли toggle — танланган/танланмаган">
        <Spec title="ChoiceToggle" desc="2 вариантли toggle. Фаол сегмент navy + soya, бошқаси нейтрал.">
          <Variant label="Биринчи фаол">
            <ChoiceToggle
              ariaLabel="Мавжудлиги"
              value="Мавжуд"
              onChange={noop}
              options={[
                { value: "Мавжуд", label: "Мавжуд", icon: "tick-circle" },
                { value: "Мавжуд эмас", label: "Мавжуд эмас", icon: "close-circle" },
              ]}
            />
          </Variant>
          <Variant label="Иккинчи фаол">
            <ChoiceToggle
              ariaLabel="Истаги"
              value="Истаги йўқ"
              onChange={noop}
              options={[
                { value: "Истаги бор", label: "Истаги бор", icon: "tick-circle" },
                { value: "Истаги йўқ", label: "Истаги йўқ", icon: "close-circle" },
              ]}
            />
          </Variant>
        </Spec>
      </Section>

      {/* ── КОНТЕЙНЕР ВА ЭСЛАТМА ── */}
      <Section icon="layers" title="Контейнер ва эслатма" subtitle="Бўлим панели, банер, реестр картаси">
        <Spec title="SectionCard" desc="Форма бўлими панели: тинтли header (иконка + ном + изоҳ) + танаси.">
          <SectionCard icon="tree" title="Томорқа маълумотлари" meta="Кадастр, манзил, ер майдони">
            <TextField label="Манзили" value="Ғафур Ғулом МФЙ, 5-уй" onChange={noop} leadingIcon="home" />
          </SectionCard>
        </Spec>

        <Spec title="InfoNote" desc="Рангли эслатма банери — navy (маълумот) ва warning (огоҳлантириш).">
          <Variant label="navy">
            <InfoNote icon="shield-tick" tone="navy" title="«Ижтимоий реестр»дан олинди" text="Маълумотлар автоматик тўлдирилган ва таҳрирланмайди." />
          </Variant>
          <Variant label="warning">
            <InfoNote icon="warning" tone="warning" title="Томорқа мавжуд эмас" text="Кадастр ва фойдаланиш маълумотлари талаб қилинмайди." />
          </Variant>
        </Spec>

        <Spec title="FamilyHeader" desc="Реестр оила картаси — navy header + монограм аватар + қаторлар.">
          <FamilyHeader family={family} />
        </Spec>
      </Section>

      {/* ── ҚАДАМ ИНДИКАТОРИ ── */}
      <Section icon="stats-chart" title="Қадам индикатори" subtitle="Wizard stepper — бажарилган / фаол / кутилаётган">
        <Spec title="Stepper" desc="Ҳар қадам: фаол (navy glow), бажарилган (яшил ✓), кутилаётган (нейтрал).">
          {[0, 1, 2, 3].map((c) => (
            <Variant key={c} label={`Фаол қадам: ${c + 1}`}>
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                <Stepper current={c} onStep={noop} />
              </div>
            </Variant>
          ))}
        </Spec>
      </Section>

      {/* ── БИОМЕТРИКА ── */}
      <Section icon="scan" title="Биометрика" subtitle="Face ID картаси, юз ҳалқаси ҳолатлари, тугмалар">
        <Spec title="BiometricCard" desc="Форма ичидаги тасдиқлаш картаси — тасдиқланмаган / тасдиқланган.">
          <Variant label="Тасдиқланмаган">
            <BiometricCard verified={false} familyName={family.oilaBoshligiFio} onVerify={noop} />
          </Variant>
          <Variant label="Тасдиқланган">
            <BiometricCard verified familyName={family.oilaBoshligiFio} onVerify={noop} />
          </Variant>
        </Spec>

        <Spec title="FaceRing" desc="Тўлиқ экранли юз сканери ҳалқаси — 4 ҳолат." dark>
          <div className="grid grid-cols-2 gap-3">
            {(["intro", "scanning", "success", "error"] as const).map((m) => (
              <div key={m} className="flex flex-col items-center gap-2">
                <FaceRing mode={m} size={116} />
                <span className="text-[10.5px] font-semibold uppercase tracking-wider text-white/55">{m}</span>
              </div>
            ))}
          </div>
        </Spec>

        <Spec title="PrimaryButton / GhostButton" desc="Қоронғи Face ID экрани тугмалари." dark>
          <Variant label="Primary · white" dark>
            <PrimaryButton icon="scan" label="Сканерлашни бошлаш" onClick={noop} />
          </Variant>
          <Variant label="Primary · success" dark>
            <PrimaryButton icon="tick-circle" label="Давом этиш" tone="success" onClick={noop} />
          </Variant>
          <Variant label="Ghost" dark>
            <GhostButton label="Бекор қилиш" onClick={noop} />
          </Variant>
        </Spec>
      </Section>

      {/* ── ТИЗИМ ПАНЕЛИ ── */}
      <Section icon="home" title="Тизим панели ва тугма ҳолатлари" subtitle="AppBar ва пастки амал тугмаси ҳолатлари">
        <Spec title="AppBar" desc="Статус бар + navy elevated app bar — орқа тугма ва trailing бейдж.">
          <div className="overflow-hidden rounded-xl">
            <AppBar
              title="Сўровнома"
              subtitle="Томорқа маълумотлари · 2/4"
              onBack={noop}
              trailing={
                <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold text-white">
                  <Icon name="shield-tick" size={12} variant="Bold" />
                  Реестр
                </span>
              }
            />
          </div>
        </Spec>

        <Spec title="Пастки амал тугмаси" desc="Сақлаш тугмаси ҳолатлари: kutish (disabled) → фаол → сақланмоқда → сақланди.">
          <Variant label="Кейингиси (асосий)">
            <DocButton tone="primary" icon="chevron-forward" iconRight label="Кейингиси" />
          </Variant>
          <Variant label="Тасдиқлангач (disabled)">
            <DocButton tone="primary" icon="scan" label="Тасдиқлангач сақлаш" disabled />
          </Variant>
          <Variant label="Сақлаш (фаол)">
            <DocButton tone="primary" icon="send" label="Сақлаш" />
          </Variant>
          <Variant label="Сақланмоқда">
            <DocButton tone="primary" label="Сақланмоқда…" loading />
          </Variant>
          <Variant label="Сақланди">
            <DocButton tone="success" icon="tick-circle" label="Сақланди" />
          </Variant>
        </Spec>
      </Section>
    </div>
  );
}

/* Ҳужжат учун пастки амал тугмаси намунаси (статик — SorovnomaScreen ичидаги inline тугма дизайни). */
function DocButton({
  tone,
  icon,
  iconRight,
  label,
  disabled,
  loading,
}: {
  tone: "primary" | "success";
  icon?: Parameters<typeof Icon>[0]["name"];
  iconRight?: boolean;
  label: string;
  disabled?: boolean;
  loading?: boolean;
}) {
  const base =
    tone === "success"
      ? "bg-success shadow-[0_8px_20px_rgba(34,197,94,0.4)]"
      : "bg-gradient-to-r from-navy to-navy-light shadow-[0_8px_20px_rgba(43,140,238,0.42)]";
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full text-[14.5px] font-bold text-white transition-all ${base} ${
        disabled ? "cursor-not-allowed opacity-50 shadow-none" : "hover:brightness-[1.08] active:scale-[0.98]"
      }`}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {icon && !iconRight && <Icon name={icon} size={18} variant="Bold" />}
      {label}
      {icon && iconRight && <Icon name={icon} size={17} variant="Bold" />}
    </button>
  );
}
