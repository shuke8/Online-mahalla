"use client";

/**
 * material.tsx — мобил илова (Android Material 3 + лойиҳа navy бренди) учун
 * умумий примитивлар. Иккала экран (ObjectsListScreen, DalolatnomaScreen) шу
 * элементларни истеъмол қилади. Лойиҳа токенлари: navy, success, warning,
 * danger, surface, text-primary/label/secondary, border-light.
 */

import { useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import type { DalolatnomaStatus } from "@/lib/mock-data";

/* ─────────────────────────────────────────────────────────────────────────
 * StatusBarStrip — Android статус бар имитацияси (соат + wifi/батарея)
 * ──────────────────────────────────────────────────────────────────────── */
export function StatusBarStrip({ time = "09:41" }: { time?: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between bg-navy px-4 pt-1.5 pb-0.5 text-white select-none">
      <span className="text-[11px] font-semibold tabular-nums tracking-wide">{time}</span>
      <div className="flex items-center gap-1.5">
        {/* Tarmoq (signal) */}
        <svg width="15" height="11" viewBox="0 0 16 12" aria-hidden fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.6" fill="currentColor" />
          <rect x="4.3" y="5.5" width="3" height="6.5" rx="0.6" fill="currentColor" />
          <rect x="8.6" y="3" width="3" height="9" rx="0.6" fill="currentColor" />
          <rect x="12.9" y="0.5" width="3" height="11.5" rx="0.6" fill="currentColor" opacity="0.55" />
        </svg>
        {/* Wifi */}
        <svg width="15" height="11" viewBox="0 0 16 12" aria-hidden fill="none">
          <path d="M8 11.2 1.2 4.2a9.6 9.6 0 0 1 13.6 0L8 11.2Z" fill="currentColor" opacity="0.35" />
          <path d="M8 11.2 4.3 7.4a5.2 5.2 0 0 1 7.4 0L8 11.2Z" fill="currentColor" />
        </svg>
        {/* Батарея */}
        <span className="flex items-center gap-0.5">
          <span className="relative flex h-[10px] w-[19px] items-center rounded-[3px] border border-white/80 px-[1.5px]">
            <span className="block h-[5px] w-[12px] rounded-[1px] bg-white" />
          </span>
          <span className="block h-[4px] w-[1.5px] rounded-r-sm bg-white/80" />
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * AppBar — Material elevated top app bar (navy)
 * ──────────────────────────────────────────────────────────────────────── */
export function AppBar({
  title,
  subtitle,
  onBack,
  leading,
  trailing,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  /** Чап слот (мас. гамбургер меню) — onBack бўлмаганда кўрсатилади */
  leading?: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div className="shrink-0">
      <StatusBarStrip />
      <div className="flex items-center gap-1 bg-navy px-2 pb-3 pt-1 text-white shadow-[0_2px_8px_rgba(15,23,42,0.18)]">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Орқага"
            className="-ml-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/95 transition-colors hover:bg-white/15 active:scale-[0.94]"
          >
            <Icon name="arrow-left" size={22} />
          </button>
        ) : (
          leading
        )}
        <div className={`min-w-0 flex-1 ${onBack || leading ? "" : "pl-2"}`}>
          <p className="truncate text-[16px] font-bold leading-tight">{title}</p>
          {subtitle && (
            <p className="truncate text-[11.5px] font-medium leading-tight text-white/70">
              {subtitle}
            </p>
          )}
        </div>
        {trailing}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * StatusPill / StatusChip — оралиқ-якуний далолатнома ҳолати
 * ──────────────────────────────────────────────────────────────────────── */
export function StatusChip({
  label,
  status,
}: {
  label: string;
  status: DalolatnomaStatus;
}) {
  const done = status === "done";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-semibold ${
        done
          ? "border-success/25 bg-success/10 text-success"
          : "border-warning/30 bg-warning/10 text-[#b45309]"
      }`}
    >
      <Icon name={done ? "tick-circle" : "time"} size={12} variant="Bold" />
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * FieldLabel — қизил * билан мажбурий ёрлиқ
 * ──────────────────────────────────────────────────────────────────────── */
function FieldLabel({
  label,
  required,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[12px] font-semibold text-text-label">
      {label}
      {required && <span className="ml-0.5 text-danger">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-[11.5px] font-medium text-danger">
      <Icon name="warning" size={12} variant="Bold" />
      {message}
    </p>
  );
}

function FieldHelper({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="mt-1 text-[11px] text-text-secondary">{text}</p>;
}

/** Майдон қобиғи (shell) — ҳолатга қараб чегара + navy focus glow. */
function shellClass(error?: string, readOnly?: boolean): string {
  if (error) return "border-danger/70 ring-4 ring-danger/10 bg-white";
  if (readOnly) return "border-border-light/80 bg-slate-50";
  return "border-border-light bg-white hover:border-slate-300 focus-within:border-navy focus-within:ring-4 focus-within:ring-navy/12 focus-within:shadow-[0_6px_18px_-6px_rgba(43,140,238,0.28)]";
}

const innerInputClass =
  "min-h-[52px] w-full bg-transparent text-[14.5px] font-medium text-text-primary outline-none placeholder:font-normal placeholder:text-text-secondary/55";

/* ─────────────────────────────────────────────────────────────────────────
 * TextField — юмалоқ (rounded-xl) elevated майдон, navy focus glow
 * ──────────────────────────────────────────────────────────────────────── */
export function TextField({
  label,
  value,
  onChange,
  required,
  type = "text",
  readOnly,
  inputMode,
  placeholder,
  error,
  helper,
  leadingIcon,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  required?: boolean;
  type?: "text" | "number";
  readOnly?: boolean;
  inputMode?: "numeric" | "decimal" | "text";
  placeholder?: string;
  error?: string;
  helper?: string;
  leadingIcon?: IconName;
}) {
  const id = useId();
  return (
    <div>
      <FieldLabel label={label} required={required} htmlFor={id} />
      <div
        className={`flex items-center gap-2.5 rounded-xl border px-3.5 transition-all duration-200 ${shellClass(
          error,
          readOnly,
        )}`}
      >
        {leadingIcon && (
          <span className="shrink-0 text-navy/65">
            <Icon name={leadingIcon} size={18} variant="Bold" />
          </span>
        )}
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-required={required}
          onChange={(e) => onChange?.(e.target.value)}
          className={`${innerInputClass} ${readOnly ? "cursor-default text-text-secondary" : ""}`}
        />
        {readOnly && (
          <span className="shrink-0 text-text-secondary/55" aria-label="Фақат ўқиш учун">
            <Icon name="document-text" size={16} />
          </span>
        )}
      </div>
      <FieldError message={error} />
      {!error && <FieldHelper text={helper} />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * SelectField — юмалоқ dropdown (native select + кастом каплет)
 * ──────────────────────────────────────────────────────────────────────── */
export function SelectField({
  label,
  value,
  options,
  onChange,
  required,
  error,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange?: (v: string) => void;
  required?: boolean;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <FieldLabel label={label} required={required} htmlFor={id} />
      <div
        className={`flex items-center rounded-xl border px-3.5 transition-all duration-200 ${shellClass(
          error,
        )}`}
      >
        <select
          id={id}
          value={value}
          aria-invalid={!!error}
          aria-required={required}
          onChange={(e) => onChange?.(e.target.value)}
          className={`${innerInputClass} cursor-pointer appearance-none pr-1`}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="pointer-events-none ml-1 shrink-0 text-text-secondary">
          <Icon name="chevron-down" size={18} />
        </span>
      </div>
      <FieldError message={error} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * TextArea — кўп қаторли матн майдони (масалан: фойдаланмаслик сабаби)
 * ──────────────────────────────────────────────────────────────────────── */
export function TextArea({
  label,
  value,
  onChange,
  required,
  placeholder,
  error,
  helper,
  rows = 3,
  maxLength = 500,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
  helper?: string;
  rows?: number;
  maxLength?: number;
}) {
  const id = useId();
  return (
    <div>
      <div className="mb-1.5 flex items-end justify-between">
        <FieldLabel label={label} required={required} htmlFor={id} />
        <span className="text-[10.5px] tabular-nums text-text-secondary/70">
          {value.length}/{maxLength}
        </span>
      </div>
      <div className={`rounded-xl border px-3.5 py-2.5 transition-all duration-200 ${shellClass(error)}`}>
        <textarea
          id={id}
          rows={rows}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-required={required}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full resize-none bg-transparent text-[14.5px] font-medium leading-relaxed text-text-primary outline-none placeholder:font-normal placeholder:text-text-secondary/55"
        />
      </div>
      <FieldError message={error} />
      {!error && <FieldHelper text={helper} />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * SearchTextField — киритма + ёнида "қидириш" тугмаси (кадастр lookup).
 * verified=true бўлганда яшил тасдиқ белгиси кўрсатилади.
 * ──────────────────────────────────────────────────────────────────────── */
export function SearchTextField({
  label,
  value,
  onChange,
  onSearch,
  searching,
  verified,
  required,
  placeholder,
  error,
  helper,
  leadingIcon,
  searchLabel = "Қидириш",
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  onSearch?: () => void;
  searching?: boolean;
  verified?: boolean;
  required?: boolean;
  placeholder?: string;
  error?: string;
  helper?: string;
  leadingIcon?: IconName;
  searchLabel?: string;
}) {
  const id = useId();
  return (
    <div>
      <FieldLabel label={label} required={required} htmlFor={id} />
      <div className="flex items-stretch gap-2">
        <div
          className={`flex flex-1 items-center gap-2.5 rounded-xl border px-3.5 transition-all duration-200 ${shellClass(
            error,
          )}`}
        >
          {leadingIcon && (
            <span className="shrink-0 text-navy/65">
              <Icon name={leadingIcon} size={18} variant="Bold" />
            </span>
          )}
          <input
            id={id}
            type="text"
            value={value}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-required={required}
            onChange={(e) => onChange?.(e.target.value)}
            className={innerInputClass}
          />
          {verified && !searching && (
            <span className="shrink-0 text-success" aria-label="Тасдиқланди">
              <Icon name="tick-circle" size={18} variant="Bold" />
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onSearch}
          disabled={searching || !value.trim()}
          className="inline-flex min-h-[52px] shrink-0 items-center gap-1.5 rounded-xl bg-navy px-3.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(43,140,238,0.32)] transition-all hover:bg-navy-light active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={searchLabel}
        >
          {searching ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.35" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          ) : (
            <Icon name="search" size={17} variant="Bold" />
          )}
          <span>{searchLabel}</span>
        </button>
      </div>
      <FieldError message={error} />
      {!error && <FieldHelper text={helper} />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * ChoiceToggle — умумий 2+ вариантли segmented toggle (ҳолат боғлиқлигисиз).
 * Масалан: Мавжуд/Мавжуд эмас, Истаги бор/Истаги йўқ.
 * ──────────────────────────────────────────────────────────────────────── */
export interface ChoiceOption {
  value: string;
  label: string;
  icon?: IconName;
}

export function ChoiceToggle({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: ChoiceOption[];
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex w-full overflow-hidden rounded-full border border-border-light bg-surface/60 p-1"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={`flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-full px-2 text-[12.5px] font-semibold transition-all active:scale-[0.98] ${
              active
                ? "bg-navy text-white shadow-[0_2px_8px_rgba(43,140,238,0.35)]"
                : "text-text-secondary hover:bg-white/70"
            }`}
          >
            {opt.icon && <Icon name={opt.icon} size={14} variant="Bold" />}
            <span className="truncate">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * SegmentedToggle — Material segmented buttons (act-type)
 * ──────────────────────────────────────────────────────────────────────── */
export interface SegmentOption {
  value: string;
  label: string;
  status: DalolatnomaStatus;
}

export function SegmentedToggle({
  options,
  value,
  onChange,
}: {
  options: SegmentOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Далолатнома тури"
      className="flex w-full overflow-hidden rounded-full border border-border-light bg-surface/60 p-1"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        const done = opt.status === "done";
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-full px-2 text-[12.5px] font-semibold transition-all active:scale-[0.98] ${
              active
                ? "bg-navy text-white shadow-[0_2px_8px_rgba(43,140,238,0.35)]"
                : "text-text-secondary hover:bg-white/70"
            }`}
          >
            <Icon
              name={done ? "tick-circle" : "time"}
              size={14}
              variant="Bold"
              className={active ? "text-white" : done ? "text-success" : "text-warning"}
            />
            <span className="truncate">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * SearchField — экранлар учун ягона Material қидирув майдони.
 * Барча экранда бир хил ўлчам/радиус/shadow — divergenция бўлмаслиги учун.
 * className орқали wrap'га мослашади (flex-1, w-full max-w-md, ва ҳ.к.).
 * ──────────────────────────────────────────────────────────────────────── */
export function SearchField({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-w-0 items-center gap-2.5 rounded-2xl bg-white px-4 shadow-[0_6px_18px_rgba(15,23,42,0.22)] ${className}`}
    >
      <Icon name="search" size={20} className="shrink-0 text-navy" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="min-h-[52px] w-full bg-transparent text-[15px] font-medium text-text-primary outline-none placeholder:font-normal placeholder:text-text-secondary/70"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Тозалаш"
          className="-mr-1.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-slate-100 active:scale-90"
        >
          <Icon name="close-circle" size={18} variant="Bold" />
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * SectionTitle — форма бўлим сарлавҳаси
 * ──────────────────────────────────────────────────────────────────────── */
export function SectionTitle({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-navy/[0.08] text-navy">
        <Icon name={icon} size={15} variant="Bold" />
      </span>
      <h3 className="text-[13.5px] font-bold text-text-primary">{children}</h3>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * SectionCard — форма бўлими панели: тинтли сарлавҳа (иконка + ном [+ изоҳ])
 * + падингли танаси. Бўлимларни яққол ажратиш ва нафас олдириш учун —
 * маълумотлар бир жойда "тиқилиб" қолмаслиги учун ҳар бўлим алоҳида карта.
 * ──────────────────────────────────────────────────────────────────────── */
export function SectionCard({
  icon,
  title,
  meta,
  children,
  bodyClassName = "p-4",
}: {
  icon: IconName;
  title: string;
  /** Сарлавҳа остидаги кичик изоҳ (бўлим нимани ўз ичига олади) */
  meta?: string;
  children: ReactNode;
  bodyClassName?: string;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-layered-sm">
      <header className="flex items-center gap-2.5 border-b border-border-light/70 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy/[0.08] text-navy">
          <Icon name={icon} size={18} variant="Bold" />
        </span>
        <div className="min-w-0">
          <h3 className="text-[14px] font-bold leading-tight text-text-primary">{title}</h3>
          {meta && (
            <p className="mt-0.5 truncate text-[11px] leading-tight text-text-secondary">{meta}</p>
          )}
        </div>
      </header>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * PressCard — Material ripple-ish босиш эффекти билан карта/тугма ўрамаси.
 * Ripple keyframe бу файлда (components/mobile доирасида) ишора билан берилади,
 * globals.css'ни таҳрирламаслик учун.
 * ──────────────────────────────────────────────────────────────────────── */
export function PressCard({
  children,
  onClick,
  active,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const id = Date.now();
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 580);
    }
    onClick?.();
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={`mobile-press-card relative w-full overflow-hidden text-left transition-all duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/50 ${className} ${
        active ? "ring-2 ring-navy ring-offset-1 ring-offset-[#f4f7fb]" : ""
      }`}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="mobile-ripple pointer-events-none absolute z-10 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy/20"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </button>
  );
}

/* Bир марта инжекция қилинадиган анимация/скролл стиллари. */
export function MobileStyles() {
  return (
    <style>{`
      @keyframes mobileRipple {
        from { transform: translate(-50%, -50%) scale(0); opacity: 0.5; }
        to   { transform: translate(-50%, -50%) scale(16); opacity: 0; }
      }
      .mobile-ripple { animation: mobileRipple 0.58s cubic-bezier(0.4,0,0.2,1) forwards; }
      .mobile-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      .mobile-no-scrollbar::-webkit-scrollbar { display: none; }
      @media (prefers-reduced-motion: reduce) {
        .mobile-ripple { animation: none; opacity: 0; }
        .mobile-press-card { transition: none; }
      }
    `}</style>
  );
}
