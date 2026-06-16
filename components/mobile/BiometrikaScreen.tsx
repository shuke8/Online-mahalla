"use client";

/**
 * BiometrikaScreen — мустақил «Биометрик тасдиқлаш» (Face ID) оқими экрани.
 * Сўровнома (TASK-018/019) учун оила бошлиғи шахсини юз орқали тасдиқлаш —
 * алоҳида тўлиқ экранли оқим: intro → scanning → success / error.
 *
 * layout="phone"  — марказлашган вертикал оқим.
 * layout="tablet" — 2 устун (юз ҳалқаси | матн + амаллар).
 * initialState   — preview учун (ҳар фрейм маълум ҳолатни кўрсатади).
 *
 * Реал биометрия (FaceSDK / реестр сурати билан солиштириш) `start()` ичига уланади.
 */

import { useEffect, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { AppBar, MobileStyles } from "@/components/mobile/material";
import type { SocialSurveyFamily } from "@/lib/social-survey-data";

export type FaceState = "intro" | "scanning" | "success" | "error";

export interface BiometrikaScreenProps {
  family: SocialSurveyFamily;
  layout: "phone" | "tablet";
  /** preview учун бошланғич ҳолат */
  initialState?: FaceState;
  onBack?: () => void;
  onDone?: () => void;
}

const TRUST: { icon: IconName; text: string }[] = [
  { icon: "time", text: "Бир неча сония" },
  { icon: "shield-tick", text: "Сурат сақланмайди" },
  { icon: "personal-card", text: "Реестр сурати билан" },
];

export default function BiometrikaScreen({
  family,
  layout,
  initialState = "intro",
  onBack,
  onDone,
}: BiometrikaScreenProps) {
  const isTablet = layout === "tablet";
  const [state, setState] = useState<FaceState>(initialState);
  // Авто-ўтиш фақат фойдаланувчи скан бошлаганда (preview фреймлари статик туради).
  const [autoAdvance, setAutoAdvance] = useState(false);

  useEffect(() => {
    setState(initialState);
    setAutoAdvance(false);
  }, [initialState]);

  // scanning → success авто-ўтиш (демо; реал биометрия натижаси билан алмаштирилади).
  useEffect(() => {
    if (state !== "scanning" || !autoAdvance) return;
    const t = window.setTimeout(() => setState("success"), 2100);
    return () => window.clearTimeout(t);
  }, [state, autoAdvance]);

  const start = () => {
    setAutoAdvance(true);
    setState("scanning");
  };
  const cancel = () => (state === "intro" ? onBack?.() : setState("intro"));

  const copy = stateCopy(state, family.oilaBoshligiFio);

  const actions = (
    <div className="flex flex-col gap-2.5">
      {state === "intro" && (
        <PrimaryButton icon="scan" label="Сканерлашни бошлаш" onClick={start} />
      )}
      {state === "scanning" && <GhostButton label="Бекор қилиш" onClick={cancel} />}
      {state === "success" && (
        <PrimaryButton icon="tick-circle" label="Давом этиш" tone="success" onClick={onDone} />
      )}
      {state === "error" && (
        <>
          <PrimaryButton icon="refresh" label="Қайта уриниш" onClick={start} />
          <GhostButton label="Бекор қилиш" onClick={cancel} />
        </>
      )}
    </div>
  );

  const detail =
    state === "intro" ? (
      <div className="flex flex-wrap justify-center gap-2">
        {TRUST.map((t) => (
          <span
            key={t.text}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11.5px] font-medium text-white/80 ring-1 ring-white/10"
          >
            <Icon name={t.icon} size={13} variant="Bold" className="text-sky-300" />
            {t.text}
          </span>
        ))}
      </div>
    ) : state === "scanning" ? (
      <p className="inline-flex items-center gap-2 text-[12.5px] font-medium text-white/80">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sky-400" />
        Сканерланмоқда…
      </p>
    ) : state === "success" ? (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/20 px-3 py-1.5 text-[12px] font-semibold text-success ring-1 ring-success/30">
        <Icon name="user-tick" size={14} variant="Bold" />
        Биометрик тасдиқ муваффақиятли
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3 py-1.5 text-[12px] font-semibold text-amber-300 ring-1 ring-amber-400/25">
        <Icon name="warning" size={14} variant="Bold" />
        Тасдиқ амалга ошмади
      </span>
    );

  return (
    <div className="relative flex flex-1 flex-col bg-gradient-to-b from-[#0b1220] to-[#0e1c34]">
      <MobileStyles />
      <style>{`
        @keyframes bioSweep { 0%{transform:translateY(-82px);opacity:0} 12%{opacity:1} 88%{opacity:1} 100%{transform:translateY(82px);opacity:0} }
        @keyframes bioBracket { 0%,100%{opacity:.55} 50%{opacity:1} }
        @keyframes bioPop { 0%{transform:scale(.4);opacity:0} 60%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
        .bio-sweep { animation: bioSweep 2s cubic-bezier(0.4,0,0.2,1) infinite; }
        .bio-bracket { animation: bioBracket 1.6s ease-in-out infinite; }
        .bio-pop { animation: bioPop .5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @media (prefers-reduced-motion: reduce){ .bio-sweep,.bio-bracket{animation:none} .bio-pop{animation:none;opacity:1} }
      `}</style>

      <AppBar
        title="Биометрик тасдиқлаш"
        subtitle="Шахсни юз орқали тасдиқлаш"
        onBack={cancel}
        trailing={
          <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold text-white">
            <Icon name="shield-tick" size={12} variant="Bold" />
            Реестр
          </span>
        }
      />

      {isTablet ? (
        <div className="flex flex-1 items-center justify-center gap-12 px-12">
          <FaceRing mode={state} size={248} />
          <div className="w-[372px]">
            <h2 className="text-[22px] font-bold leading-tight text-white">{copy.title}</h2>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/65">{copy.desc}</p>
            <div className="mt-5">{detail}</div>
            <div className="mt-7">{actions}</div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-1 flex-col items-center justify-center gap-7 px-6 text-center">
            <FaceRing mode={state} size={216} />
            <div>
              <h2 className="text-[19px] font-bold leading-tight text-white">{copy.title}</h2>
              <p className="mx-auto mt-2 max-w-[288px] text-[13px] leading-relaxed text-white/65">
                {copy.desc}
              </p>
            </div>
            {detail}
          </div>
          <div className="px-6 pb-8 pt-2">{actions}</div>
        </>
      )}
    </div>
  );
}

function stateCopy(state: FaceState, name: string): { title: string; desc: string } {
  switch (state) {
    case "scanning":
      return {
        title: "Юзни тасдиқлаш",
        desc: "Юзингизни доира марказида, яхши ёруғликда тутиб туринг.",
      };
    case "success":
      return {
        title: "Шахс тасдиқланди",
        desc: `${name} — шахси муваффақиятли тасдиқланди. Энди сўровномани сақлашингиз мумкин.`,
      };
    case "error":
      return {
        title: "Юз аниқланмади",
        desc: "Юзингиз доира ичида эмас ёки ёруғлик етарли эмас. Қайта уриниб кўринг.",
      };
    default:
      return {
        title: "Юзингизни тасдиқланг",
        desc: `Оила бошлиғи ${name} шахсини тасдиқлаш учун юзни доира ичига жойланг. Бу сохта сўровномани олдини олади.`,
      };
  }
}

/* ── Юз ҳалқаси (бурчак кронштейн + силуэт + ҳолат) ────────────────────────── */
function FaceRing({ mode, size }: { mode: FaceState; size: number }) {
  const success = mode === "success";
  const error = mode === "error";
  const scanning = mode === "scanning";
  const ring = success ? "border-success" : error ? "border-amber-400" : "border-sky-400";
  const glow = success ? "bg-success/25" : error ? "bg-amber-400/20" : "bg-sky-500/20";
  const face = success ? "text-success/70" : error ? "text-amber-300/55" : "text-white/30";
  const brackets = [
    "left-0 top-0 border-l-[3px] border-t-[3px] rounded-tl-[36px]",
    "right-0 top-0 border-r-[3px] border-t-[3px] rounded-tr-[36px]",
    "left-0 bottom-0 border-b-[3px] border-l-[3px] rounded-bl-[36px]",
    "right-0 bottom-0 border-b-[3px] border-r-[3px] rounded-br-[36px]",
  ];
  return (
    <div className="relative shrink-0" style={{ height: size, width: size }}>
      <div className={`absolute inset-3 rounded-full blur-2xl ${glow}`} />
      {brackets.map((pos) => (
        <span
          key={pos}
          className={`absolute h-14 w-14 ${pos} ${ring} ${scanning ? "bio-bracket" : ""}`}
        />
      ))}
      <div className="absolute inset-[28px] flex items-center justify-center overflow-hidden rounded-full bg-white/[0.05] ring-1 ring-white/10">
        <Icon name="profile" size={Math.round(size * 0.5)} variant="Bulk" className={face} />
        {scanning && (
          <span className="bio-sweep pointer-events-none absolute left-4 right-4 h-[3px] rounded-full bg-sky-400 shadow-[0_0_16px_5px_rgba(56,189,248,0.7)]" />
        )}
      </div>
      {(success || error) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`bio-pop inline-flex h-[84px] w-[84px] items-center justify-center rounded-full text-white ${
              success
                ? "bg-success shadow-[0_10px_30px_rgba(34,197,94,0.5)]"
                : "bg-amber-500 shadow-[0_10px_30px_rgba(245,158,11,0.5)]"
            }`}
          >
            <Icon name={success ? "tick-circle" : "warning"} size={48} variant="Bold" />
          </span>
        </div>
      )}
    </div>
  );
}

function PrimaryButton({
  icon,
  label,
  onClick,
  tone = "white",
}: {
  icon: IconName;
  label: string;
  onClick?: () => void;
  tone?: "white" | "success";
}) {
  const toneClass =
    tone === "success"
      ? "bg-success text-white shadow-[0_10px_24px_rgba(34,197,94,0.4)]"
      : "bg-white text-navy shadow-[0_10px_24px_rgba(255,255,255,0.18)]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full text-[15px] font-bold transition-all hover:brightness-95 active:scale-[0.98] ${toneClass}`}
    >
      <Icon name={icon} size={19} variant="Bold" />
      {label}
    </button>
  );
}

function GhostButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-white/10 text-[14px] font-semibold text-white/90 ring-1 ring-white/15 transition-colors hover:bg-white/15 active:scale-[0.98]"
    >
      {label}
    </button>
  );
}
