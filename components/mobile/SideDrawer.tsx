"use client";

/**
 * SideDrawer — мобил илова чап sidebar (drawer).
 * DeviceFrame ичида абсолют overlay: backdrop + чапдан сирғалувчи панель.
 * Профил шапкаси (gradient) + меню рўйхати + Чиқиш. Escape ёки backdrop — ёпади.
 */

import { useEffect } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { mfyData, mahallaYettiligi } from "@/lib/mock-data";

interface DrawerItem {
  icon: IconName;
  label: string;
  badge?: number;
}

export function SideDrawer({
  open,
  onClose,
  notifCount,
}: {
  open: boolean;
  onClose: () => void;
  notifCount: number;
}) {
  // Escape — ёпиш (фақат очиқ бўлганда тингланади)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const hokim = mahallaYettiligi.find((m) => m.role === "Ҳоким ёрдамчиси");
  const userName = hokim?.fio || mfyData.name;

  const items: DrawerItem[] = [
    { icon: "people", label: "Профил" },
    { icon: "notifications", label: "Билдиришномалар", badge: notifCount },
    { icon: "stats-chart", label: "Ҳисоботлар" },
    { icon: "map", label: "Маҳаллани танлаш" },
    { icon: "settings", label: "Созламалар" },
    { icon: "shield-tick", label: "Ёрдам ва маълумот" },
  ];

  return (
    <div className={`absolute inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Менюни ёпиш"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Панель */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        className={`absolute inset-y-0 left-0 flex w-[84%] max-w-[320px] flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Профил шапкаси */}
        <div className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-light px-4 pb-5 pt-8 text-white">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/10 blur-xl"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Ёпиш"
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 active:scale-90"
          >
            <Icon name="close-circle" size={20} variant="Bold" />
          </button>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <Icon name="people" size={26} variant="Bold" />
          </span>
          <p className="mt-3 line-clamp-2 text-[15px] font-bold leading-tight">{userName}</p>
          <p className="mt-1 flex items-center gap-1 text-[11.5px] text-white/75">
            <Icon name="shield-tick" size={12} variant="Bold" />
            Ҳоким ёрдамчиси · {mfyData.name}
          </p>
        </div>

        {/* Меню */}
        <nav className="mobile-no-scrollbar flex-1 overflow-y-auto p-2.5">
          {items.map((it) => (
            <button
              key={it.label}
              type="button"
              onClick={onClose}
              className="flex w-full items-center gap-3 rounded-xl px-2.5 py-3 text-left transition-colors hover:bg-navy-lighter/40 active:scale-[0.99]"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy/[0.08] text-navy">
                <Icon name={it.icon} size={18} variant="Bold" />
              </span>
              <span className="flex-1 text-[13.5px] font-semibold text-text-primary">{it.label}</span>
              {it.badge != null && it.badge > 0 && (
                <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                  {it.badge > 999 ? "999+" : it.badge}
                </span>
              )}
              <Icon name="chevron-forward" size={15} className="shrink-0 text-text-secondary/40" />
            </button>
          ))}
        </nav>

        {/* Чиқиш + версия */}
        <div className="border-t border-border-light p-3">
          <button
            type="button"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-danger/25 bg-danger/[0.06] py-2.5 text-[13.5px] font-semibold text-danger transition-colors hover:bg-danger/10 active:scale-[0.98]"
          >
            <Icon name="log-out" size={17} variant="Bold" />
            Чиқиш
          </button>
          <p className="mt-2 text-center text-[10px] font-medium text-text-secondary/70">
            Online Mahalla · v1257 / 3.3.26
          </p>
        </div>
      </aside>
    </div>
  );
}
