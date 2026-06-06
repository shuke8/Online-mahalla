"use client";

import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
 * Sxematik drill-down xarita — tumanlar yoki mahallalar kesimi.
 * Real tuman/MFY geo-konturlari mavjud emas (demo mock-data), shuning uchun
 * UzbekistanMap uslubidagi qo'l chizilgan irregular 12-katakli panja
 * ishlatiladi: 5×4 jitter'langan tugun panjarasi → 4×3 = 12 katak.
 * ──────────────────────────────────────────────────────────────────────── */

export interface DrillCell {
  id: string;
  name: string;
  pct: number;
  status?: "yangi" | "ogir";
}

interface RegionDrillMapProps {
  cells: DrillCell[]; // 12 tagacha — katak tartibida joylanadi
  mode: "tuman" | "mfy"; // rang sxemasi: tuman=ko'k shkala, mfy=holat (yashil/qizil)
  selectedId?: string;
  onCellClick?: (id: string) => void;
}

// Qo'lda jitter'langan 5×4 tugun panjarasi — har renderda bir xil (deterministik)
const LATTICE: [number, number][][] = [
  [[18, 22], [118, 12], [222, 20], [328, 10], [424, 18]],
  [[12, 95], [122, 86], [218, 100], [332, 88], [428, 96]],
  [[16, 168], [115, 176], [225, 162], [326, 172], [422, 166]],
  [[20, 228], [120, 236], [220, 226], [330, 236], [426, 228]],
];

const CELL_COUNT = 12; // 4 ustun × 3 qator

function cellPolygon(index: number): { points: string; cx: number; cy: number } {
  const r = Math.floor(index / 4);
  const c = index % 4;
  const corners = [LATTICE[r][c], LATTICE[r][c + 1], LATTICE[r + 1][c + 1], LATTICE[r + 1][c]];
  const cx = corners.reduce((s, p) => s + p[0], 0) / 4;
  const cy = corners.reduce((s, p) => s + p[1], 0) / 4;
  return { points: corners.map((p) => p.join(",")).join(" "), cx, cy };
}

// Tuman: respublika xaritasi bilan bir xil ko'k shkala
function tumanColor(pct: number): string {
  if (pct >= 85) return "#1a6fd4";
  if (pct >= 75) return "#2b8cee";
  if (pct >= 65) return "#5BA8F5";
  return "#93c5fd";
}

// МФЙ: holatga mos — янги=yashil shkala, оғир=qizil shkala (mfy sahifasi bilan konsistent)
function mfyColor(status: "yangi" | "ogir" | undefined, pct: number): string {
  if (status === "ogir") {
    if (pct >= 75) return "#b91c1c";
    if (pct >= 65) return "#ef4444";
    return "#f87171";
  }
  if (pct >= 80) return "#15803d";
  if (pct >= 70) return "#16a34a";
  return "#4ade80";
}

// Katak ichida 2 qatorli label: "Шароф Рашидов тумани" → "Шароф" + "Рашидов"
function labelLines(name: string): string[] {
  const short = name.replace(/ (тумани|МФЙ)$/u, "").replace(" шаҳри", " ш.");
  const words = short.split(" ");
  if (words.length <= 1 || short.length <= 10) return [short];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export function RegionDrillMap({ cells, mode, selectedId, onCellClick }: RegionDrillMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const visible = cells.slice(0, CELL_COUNT);
  const hovered = visible.find((c) => c.id === hoveredId);
  const hasSelection = Boolean(selectedId);

  return (
    <div className="relative">
      <svg viewBox="0 0 440 250" className="w-full h-auto">
        {visible.map((cell, i) => {
          const { points, cx, cy } = cellPolygon(i);
          const isHovered = hoveredId === cell.id;
          const isSelected = selectedId === cell.id;
          const fill = mode === "tuman" ? tumanColor(cell.pct) : mfyColor(cell.status, cell.pct);
          const lines = labelLines(cell.name);
          return (
            <g key={cell.id} style={{ opacity: hasSelection && !isSelected ? 0.45 : 1, transition: "opacity 0.2s" }}>
              <polygon
                points={points}
                fill={fill}
                stroke={isSelected ? "#FFFFFF" : isHovered ? "#FFFFFF" : "#EDF5FF"}
                strokeWidth={isSelected ? 3 : isHovered ? 2 : 1.2}
                strokeLinejoin="round"
                className="cursor-pointer transition-all duration-200"
                style={{
                  filter: isHovered ? "brightness(1.15)" : undefined,
                  transform: isHovered ? "scale(1.01)" : undefined,
                  transformOrigin: `${cx}px ${cy}px`,
                }}
                onMouseEnter={() => setHoveredId(cell.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onCellClick?.(cell.id)}
              />
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={cx}
                  y={cy - (lines.length - 1) * 4.5 + li * 9 - 2}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  fill="white"
                  fontSize="8"
                  fontWeight="600"
                >
                  {line}
                </text>
              ))}
              <text
                x={cx}
                y={cy + (lines.length > 1 ? 16 : 11)}
                textAnchor="middle"
                className="pointer-events-none select-none"
                fill="rgba(255,255,255,0.75)"
                fontSize="6.5"
                fontWeight="600"
              >
                {cell.pct}%
              </text>
            </g>
          );
        })}
      </svg>

      {hovered && (
        <div className="absolute top-2 right-2 bg-white rounded-lg shadow-lg border border-border-light p-3 min-w-[160px] z-10">
          <p className="text-xs font-semibold text-navy mb-1">{hovered.name}</p>
          <p className="text-lg font-bold text-navy">{hovered.pct}%</p>
          <p className="text-[10px] text-text-secondary">
            {mode === "mfy"
              ? hovered.status === "ogir"
                ? "Оғир маҳалла"
                : "Янги Ўзбекистон қиёфасидаги маҳалла"
              : "Бажарилганлик даражаси"}
          </p>
        </div>
      )}

      <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
        {(mode === "tuman"
          ? [
              { color: "#93c5fd", label: "< 65%" },
              { color: "#5BA8F5", label: "65-75%" },
              { color: "#2b8cee", label: "75-85%" },
              { color: "#1a6fd4", label: "> 85%" },
            ]
          : [
              { color: "#16a34a", label: "Янги Ўзбекистон қиёфасидаги" },
              { color: "#ef4444", label: "Оғир маҳалла" },
            ]
        ).map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: item.color }} />
            <span className="text-[10px] text-text-secondary">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
