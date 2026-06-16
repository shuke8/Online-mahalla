"use client";

/**
 * gallery-kit — «Комponentlar» дизайн саҳифаси учун умумий каркас элементлари:
 * Section (гуруҳ), Spec (компонент картаси), Variant (ҳолат катаги), RuleCard
 * (шартли мантиқ: танланса → / танланмаса →). Фақат презентацион, мантиқсиз.
 */

import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";

export function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white shadow-[0_6px_16px_-6px_rgba(43,140,238,0.6)]">
          <Icon name={icon} size={19} variant="Bold" />
        </span>
        <div className="min-w-0">
          <h2 className="text-[16px] font-bold text-slate-800">{title}</h2>
          <p className="text-[12px] text-slate-500">{subtitle}</p>
        </div>
        <span className="ml-2 h-px flex-1 bg-slate-300/70" />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

/** Компонент картаси: ном + изоҳ + preview майдони (ёруғ ёки қоронғи). */
export function Spec({
  title,
  desc,
  dark,
  children,
}: {
  title: string;
  desc?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-16px_rgba(15,23,42,0.2)]">
      <div className="border-b border-slate-100 px-4 py-3">
        <h3 className="flex items-center gap-2 text-[13.5px] font-bold text-slate-800">
          <code className="rounded bg-navy/10 px-1.5 py-0.5 text-[11.5px] font-semibold text-navy">
            {title}
          </code>
        </h3>
        {desc && <p className="mt-1.5 text-[12px] leading-snug text-slate-500">{desc}</p>}
      </div>
      <div
        className={`flex-1 p-4 ${
          dark ? "bg-gradient-to-b from-[#0b1220] to-[#0e1c34]" : "bg-slate-50/70"
        }`}
      >
        <div className="mx-auto flex max-w-[360px] flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}

/** Битта ҳолат катаги: устида ёрлиқ. */
export function Variant({
  label,
  dark,
  children,
}: {
  label: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <p
        className={`mb-1.5 text-[10px] font-semibold uppercase tracking-wider ${
          dark ? "text-white/45" : "text-slate-400"
        }`}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

export type Branch = {
  tone: "on" | "off" | "info" | "warn";
  label: string;
  text: string;
};

const BRANCH_STYLE: Record<Branch["tone"], { box: string; icon: IconName; iconColor: string }> = {
  on: { box: "border-success/30 bg-success/[0.07]", icon: "tick-circle", iconColor: "text-success" },
  off: { box: "border-slate-200 bg-slate-50", icon: "close-circle", iconColor: "text-slate-400" },
  info: { box: "border-navy/25 bg-navy/[0.05]", icon: "shield-tick", iconColor: "text-navy" },
  warn: { box: "border-warning/30 bg-warning/[0.10]", icon: "warning", iconColor: "text-[#b45309]" },
};

/** Шартли мантиқ картаси: бошқарув + ҳар тармоқ (танланса → натижа). */
export function RuleCard({
  icon,
  title,
  control,
  branches,
}: {
  icon: IconName;
  title: string;
  control: string;
  branches: Branch[];
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-16px_rgba(15,23,42,0.2)]">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy/[0.08] text-navy">
          <Icon name={icon} size={18} variant="Bold" />
        </span>
        <div className="min-w-0">
          <h4 className="text-[13.5px] font-bold text-slate-800">{title}</h4>
          <p className="text-[11px] text-slate-500">
            Бошқарув: <span className="font-medium text-slate-600">{control}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {branches.map((b) => {
          const s = BRANCH_STYLE[b.tone];
          return (
            <div key={b.label} className={`flex items-start gap-2.5 rounded-xl border p-2.5 ${s.box}`}>
              <Icon name={s.icon} size={16} variant="Bold" className={`mt-0.5 shrink-0 ${s.iconColor}`} />
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-slate-800">{b.label}</p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-slate-600">{b.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
