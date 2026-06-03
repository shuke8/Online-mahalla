"use client";

import type { ReactNode } from "react";

export type DeviceVariant = "phone" | "tablet";

export interface DeviceFrameProps {
  variant: DeviceVariant;
  /** Frame ostidagi izoh (masalan "Телефон — Далолатнома") */
  label?: string;
  children: ReactNode;
}

/**
 * DeviceFrame — Android qurilma maketi (telefon portrait / planshet landscape).
 * Ichidagi "ekran" — belgilangan o'lchamli, overflow-hidden, relative konteyner.
 * Ekran komponentlari uni to'liq to'ldiradi (h-full).
 */
const SCREEN = {
  phone: { w: 360, h: 760, radius: 34, bezel: 12, frameRadius: 46 },
  tablet: { w: 1024, h: 720, radius: 18, bezel: 16, frameRadius: 30 },
} as const;

export function DeviceFrame({ variant, label, children }: DeviceFrameProps) {
  const s = SCREEN[variant];
  return (
    <figure className="m-0 flex shrink-0 flex-col items-center gap-3">
      <div
        className="relative bg-[#0b1220]"
        style={{
          padding: s.bezel,
          borderRadius: s.frameRadius,
          boxShadow:
            "0 1px 1px rgba(0,0,0,0.2), 0 20px 50px -12px rgba(15,23,42,0.45), inset 0 0 0 2px rgba(255,255,255,0.06)",
        }}
      >
        {/* Punch-hole camera (phone) */}
        {variant === "phone" && (
          <span
            aria-hidden
            className="absolute left-1/2 top-[18px] z-30 h-2 w-2 -translate-x-1/2 rounded-full bg-black/80 ring-1 ring-white/10"
          />
        )}
        <div
          className="relative flex flex-col overflow-hidden bg-white"
          style={{ width: s.w, minHeight: s.h, borderRadius: s.radius }}
        >
          {children}
        </div>
      </div>
      {label && (
        <figcaption className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

export default DeviceFrame;
