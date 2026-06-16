"use client";

/**
 * gallery-behavior — шартли мантиқ: қайси статус танланса нима бўлади / танланмаса
 * нима бўлади. Жонли (интерактив) демолар + ҳар қоида учун қисқа RuleCard.
 */

import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { ReactNode } from "react";
import { TextField, SelectField, TextArea, ChoiceToggle } from "@/components/mobile/material";
import { InfoNote, BiometricCard } from "@/components/mobile/SorovnomaScreen";
import {
  TOMORQA_MAVJUDLIGI,
  FOYDALANISH_HOLATI,
  IJARA_ISTAGI,
  IJARA_MUDDATI,
  sampleSurveyFamily,
} from "@/lib/social-survey-data";
import { Section, RuleCard } from "@/components/mobile/gallery-kit";

const family = sampleSurveyFamily;

export function GalleryBehavior() {
  return (
    <div className="flex flex-col gap-12">
      {/* ── ЖОНЛИ ДЕМОЛАР ── */}
      <Section icon="refresh" title="Жонли демолар" subtitle="Статусни ўзгартиринг — натижа дарров кўринади">
        <TomorqaDemo />
        <FoydalanishDemo />
        <IjaraDemo />
        <BiometrikaDemo />
      </Section>

      {/* ── ҚОИДАЛАР ── */}
      <Section icon="document-text" title="Шартли мантиқ — қоидалар" subtitle="Танланса → / танланмаса → натижа">
        <RuleCard
          icon="tree"
          title="Томорқаси мавжудлиги"
          control="ChoiceToggle"
          branches={[
            { tone: "on", label: "«Мавжуд» танланса", text: "Кадастр рақами, манзил, ер майдони майдонлари ва бутун «Фойдаланиш ва ижара» бўлими кўринади." },
            { tone: "warn", label: "«Мавжуд эмас» танланса", text: "Барча шу майдонлар яширилади, огоҳлантириш кўрсатилади ва тўғридан-тўғри «Якунлаш»га ўтилади." },
          ]}
        />
        <RuleCard
          icon="briefcase"
          title="Фойдаланиш ҳолати"
          control="SelectField"
          branches={[
            { tone: "on", label: "«Фойдаланмайди» танланса", text: "«Фойдаланмаслик сабаби» матн майдони пайдо бўлади (тўлдириш мажбурий)." },
            { tone: "off", label: "Бошқа вариант танланса", text: "«Фойдаланмаслик сабаби» майдони яширилади." },
          ]}
        />
        <RuleCard
          icon="wallet"
          title="Ижарага бериш истаги"
          control="ChoiceToggle"
          branches={[
            { tone: "on", label: "«Истаги бор» танланса", text: "«Қанча муддатга бериш мумкин» (ой) майдони кўринади (мажбурий)." },
            { tone: "off", label: "«Истаги йўқ» танланса", text: "Муддат майдони яширилади." },
          ]}
        />
        <RuleCard
          icon="location"
          title="Кадастр рақами (lookup)"
          control="SearchTextField"
          branches={[
            { tone: "info", label: "Рақам киритилиб «Қидириш»", text: "searching → verified: яшил ✓, манзил ва ер майдони реестрдан автотўлдирилади." },
            { tone: "off", label: "Рақам бўш бўлса", text: "«Қидириш» тугмаси ўчирилган (disabled) — босиб бўлмайди." },
          ]}
        />
        <RuleCard
          icon="scan"
          title="Биометрик тасдиқ (gate)"
          control="BiometricCard"
          branches={[
            { tone: "off", label: "Тасдиқланмаса", text: "«Сақлаш» тугмаси ўчирилган — «Тасдиқлангач сақлаш» деб туради." },
            { tone: "on", label: "Тасдиқланса", text: "«Сақлаш» фаоллашади, сўровнома юборилади." },
          ]}
        />
        <RuleCard
          icon="tick-circle"
          title="Қадам валидацияси"
          control="Stepper · Кейингиси"
          branches={[
            { tone: "warn", label: "Мажбурий майдон бўш", text: "«Кейингиси» хато беради, кейинги қадамга ўтмайди." },
            { tone: "on", label: "Майдонлар тўлдирилган", text: "Кейинги қадамга ўтилади, ўтилган қадам яшил ✓ бўлади." },
          ]}
        />
      </Section>
    </div>
  );
}

/* ── Жонли демо ўрами ─────────────────────────────────────────────────────── */
function DemoCard({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-16px_rgba(15,23,42,0.2)]">
      <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-success">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          Жонли
        </span>
        <div className="min-w-0">
          <h3 className="text-[13.5px] font-bold text-slate-800">{title}</h3>
          <p className="truncate text-[11px] text-slate-500">{hint}</p>
        </div>
      </div>
      <div className="flex-1 bg-slate-50/70 p-4">
        <div className="mx-auto flex max-w-[360px] flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}

function TomorqaDemo() {
  const [v, setV] = useState<string>(TOMORQA_MAVJUDLIGI[0]);
  const has = v === "Мавжуд";
  return (
    <DemoCard title="Томорқаси мавжудлиги" hint="«Мавжуд эмас»ни танлаб кўринг — майдонлар яширилади">
      <ChoiceToggle
        ariaLabel="Томорқаси мавжудлиги"
        value={v}
        onChange={setV}
        options={[
          { value: "Мавжуд", label: "Мавжуд", icon: "tick-circle" },
          { value: "Мавжуд эмас", label: "Мавжуд эмас", icon: "close-circle" },
        ]}
      />
      {has ? (
        <>
          <TextField label="Кадастр рақами" value="20:12:01:05:01:0000" onChange={() => {}} leadingIcon="location" />
          <TextField label="Манзили" value="Ғафур Ғулом МФЙ, 5-уй" onChange={() => {}} leadingIcon="home" />
        </>
      ) : (
        <InfoNote icon="warning" tone="warning" title="Томорқа мавжуд эмас" text="Кадастр, манзил ва фойдаланиш маълумотлари талаб қилинмайди. Якунлашга ўтинг." />
      )}
    </DemoCard>
  );
}

function FoydalanishDemo() {
  const [v, setV] = useState<string>(FOYDALANISH_HOLATI[0]);
  const notUsing = v === "Фойдаланмайди";
  return (
    <DemoCard title="Фойдаланиш ҳолати" hint="«Фойдаланмайди»ни танланг — сабаб майдони чиқади">
      <SelectField label="Томорқадан фойдаланиш ҳолати" value={v} options={FOYDALANISH_HOLATI} onChange={setV} />
      {notUsing && (
        <TextArea label="Фойдаланмаслик сабаби" value="" onChange={() => {}} placeholder="Сабабни батафсил ёзинг…" />
      )}
    </DemoCard>
  );
}

function IjaraDemo() {
  const [v, setV] = useState<string>(IJARA_ISTAGI[1]);
  const wants = v === "Истаги бор";
  return (
    <DemoCard title="Ижарага бериш истаги" hint="«Истаги бор»ни танланг — муддат майдони чиқади">
      <ChoiceToggle
        ariaLabel="Ижарага бериш истаги"
        value={v}
        onChange={setV}
        options={[
          { value: "Истаги бор", label: "Истаги бор", icon: "tick-circle" },
          { value: "Истаги йўқ", label: "Истаги йўқ", icon: "close-circle" },
        ]}
      />
      {wants && (
        <SelectField label="Қанча муддатга бериш мумкин (ой)" value={IJARA_MUDDATI[2]} options={IJARA_MUDDATI} onChange={() => {}} />
      )}
    </DemoCard>
  );
}

function BiometrikaDemo() {
  const [verified, setVerified] = useState(false);
  return (
    <DemoCard title="Биометрик тасдиқ — Сақлаш gate'и" hint="Тасдиқланг — «Сақлаш» фаоллашади">
      <BiometricCard verified={verified} familyName={family.oilaBoshligiFio} onVerify={() => setVerified(true)} />
      <button
        type="button"
        disabled={!verified}
        className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full text-[14.5px] font-bold text-white transition-all ${
          verified
            ? "bg-gradient-to-r from-navy to-navy-light shadow-[0_8px_20px_rgba(43,140,238,0.42)] hover:brightness-[1.08] active:scale-[0.98]"
            : "cursor-not-allowed bg-gradient-to-r from-navy to-navy-light opacity-50 shadow-none"
        }`}
      >
        <Icon name={verified ? "send" : "scan"} size={18} variant="Bold" />
        {verified ? "Сақлаш" : "Тасдиқлангач сақлаш"}
      </button>
      {verified && (
        <button
          type="button"
          onClick={() => setVerified(false)}
          className="text-[12px] font-semibold text-navy underline-offset-2 hover:underline"
        >
          Қайта тиклаш (тасдиқни бекор қилиш)
        </button>
      )}
    </DemoCard>
  );
}
