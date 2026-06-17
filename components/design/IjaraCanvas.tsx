"use client";

/**
 * IjaraCanvas — «Томорқа ижараси» дизайн саҳифалари учун умумий қобиқ.
 * 3 саҳифа (Кириш / Сўровнома / Шартнома) бир хил топ-бар + навигация tab'лари
 * + нуқтали canvas фонини улашади (такрорланмаслик учун SSOT).
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/atoms/Icon";

type TabKey = "kirish" | "sorovnoma" | "shartnoma";

const TABS: { key: TabKey; label: string; href: string; icon: IconName }[] = [
  { key: "kirish", label: "Кириш", href: "/dizayn/ijara", icon: "home" },
  { key: "sorovnoma", label: "Сўровнома", href: "/dizayn/ijara/sorovnoma", icon: "note" },
  { key: "shartnoma", label: "Шартнома", href: "/dizayn/ijara/shartnoma", icon: "document-text" },
];

export function IjaraCanvasShell({
  active,
  subtitle,
  children,
}: {
  active: TabKey;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#e9eef5]">
      {/* Топ-бар */}
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
        <Link
          href="/infratuzilma"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Icon name="arrow-left" size={15} />
          <span className="hidden sm:inline">Бошқарув панели</span>
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-[14px] font-bold text-slate-900">Томорқа ижараси — дизайн</h1>
          <p className="truncate text-[11.5px] text-slate-500">{subtitle}</p>
        </div>

        {/* Навигация tab'лари */}
        <nav aria-label="Модул саҳифалари" className="ml-auto flex items-center gap-1.5">
          {TABS.map((t) => {
            const isActive = t.key === active;
            return (
              <Link
                key={t.key}
                href={t.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition-colors ${
                  isActive
                    ? "border-navy/25 bg-navy/[0.08] text-navy"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon name={t.icon} size={14} variant="Bold" />
                <span className="hidden sm:inline">{t.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Нуқтали canvas */}
      <div
        className="flex-1 overflow-auto p-6 sm:p-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100,116,139,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto mb-6 flex max-w-5xl items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white shadow-[0_6px_16px_-6px_rgba(43,140,238,0.6)]">
        <Icon name={icon} size={18} variant="Bold" />
      </span>
      <div>
        <h2 className="text-[15px] font-bold text-slate-800">{title}</h2>
        <p className="text-[11.5px] text-slate-500">{subtitle}</p>
      </div>
      <span className="ml-2 h-px flex-1 bg-slate-300/70" />
    </div>
  );
}
