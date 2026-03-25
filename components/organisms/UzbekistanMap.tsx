"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface MapRegion {
  id: string;
  value: number;
}

interface UzbekistanMapProps {
  data?: MapRegion[];
  onRegionClick?: (regionId: string) => void;
  selectedRegion?: string;
  defaultHoveredRegion?: string;
}

const regions: { id: string; name: string; d: string; labelX: number; labelY: number }[] = [
  { id: "qoraqalpogiston", name: "Қорақалпоғистон", d: "M30,20 L120,15 L140,40 L160,35 L170,60 L150,90 L155,120 L130,140 L100,135 L80,150 L50,130 L35,100 L25,60 Z", labelX: 90, labelY: 80 },
  { id: "xorazm", name: "Хоразм", d: "M50,130 L80,150 L75,175 L55,180 L40,165 L35,145 Z", labelX: 57, labelY: 160 },
  { id: "buxoro", name: "Бухоро", d: "M80,150 L100,135 L130,140 L155,120 L175,135 L190,170 L200,200 L180,230 L150,240 L120,225 L90,210 L75,175 Z", labelX: 135, labelY: 185 },
  { id: "navoiy", name: "Навоий", d: "M155,120 L150,90 L170,60 L200,55 L230,65 L250,90 L260,120 L250,150 L230,160 L210,155 L190,170 L175,135 Z", labelX: 205, labelY: 110 },
  { id: "qashqadaryo", name: "Қашқадарё", d: "M190,170 L210,155 L230,160 L240,180 L250,210 L235,235 L210,240 L180,230 L200,200 Z", labelX: 215, labelY: 200 },
  { id: "surxondaryo", name: "Сурхондарё", d: "M250,210 L270,200 L285,220 L280,250 L265,270 L245,265 L235,235 Z", labelX: 260, labelY: 240 },
  { id: "samarqand", name: "Самарқанд", d: "M230,160 L250,150 L270,155 L280,170 L275,190 L270,200 L250,210 L240,180 Z", labelX: 255, labelY: 175 },
  { id: "jizzakh", name: "Жиззах", d: "M250,90 L260,120 L250,150 L270,155 L290,140 L310,120 L300,100 L280,85 Z", labelX: 275, labelY: 120 },
  { id: "sirdaryo", name: "Сирдарё", d: "M310,120 L330,115 L345,125 L340,145 L325,150 L310,140 L290,140 Z", labelX: 320, labelY: 132 },
  { id: "toshkent-v", name: "Тошкент вил.", d: "M300,100 L310,120 L330,115 L345,100 L355,85 L340,70 L320,75 L305,85 Z", labelX: 325, labelY: 95 },
  { id: "toshkent-sh", name: "Тошкент ш.", d: "M330,85 L340,82 L345,90 L342,97 L335,98 L328,93 Z", labelX: 336, labelY: 91 },
  { id: "namangan", name: "Наманган", d: "M345,100 L355,85 L370,80 L390,85 L395,100 L380,110 L360,108 Z", labelX: 370, labelY: 95 },
  { id: "fargona", name: "Фарғона", d: "M345,125 L360,108 L380,110 L395,100 L410,110 L420,130 L405,145 L380,150 L360,145 L340,145 Z", labelX: 380, labelY: 130 },
  { id: "andijon", name: "Андижон", d: "M395,100 L410,95 L425,100 L430,115 L420,130 L410,110 Z", labelX: 415, labelY: 112 },
];

function getColor(value: number): string {
  if (value >= 85) return "#1a6fd4";
  if (value >= 75) return "#2b8cee";
  if (value >= 65) return "#5BA8F5";
  return "#93c5fd";
}

export function UzbekistanMap({ data = [], onRegionClick, selectedRegion, defaultHoveredRegion }: UzbekistanMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(defaultHoveredRegion ?? null);

  const getRegionValue = (id: string) => data.find((d) => d.id === id)?.value ?? 0;

  return (
    <div className="relative">
      <svg viewBox="15 5 430 280" className="w-full h-auto">
        {regions.map((region) => {
          const value = getRegionValue(region.id);
          const isHovered = hoveredRegion === region.id;
          const isSelected = selectedRegion === region.id;

          return (
            <g key={region.id}>
              <path
                d={region.d}
                fill={data.length > 0 ? getColor(value) : "#5BA8F5"}
                stroke={isSelected ? "#D4A76A" : isHovered ? "#FFFFFF" : "#EDF5FF"}
                strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                className="cursor-pointer transition-all duration-200"
                style={{
                  filter: isHovered ? "brightness(1.2)" : undefined,
                  transform: isHovered ? "scale(1.01)" : undefined,
                  transformOrigin: `${region.labelX}px ${region.labelY}px`,
                }}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => onRegionClick?.(region.id)}
              />
              <text x={region.labelX} y={region.labelY} textAnchor="middle" className="pointer-events-none select-none" fill="white" fontSize="7" fontWeight="500">
                {region.name}
              </text>
              {data.length > 0 && (
                <text x={region.labelX} y={region.labelY + 10} textAnchor="middle" className="pointer-events-none select-none" fill="rgba(255,255,255,0.7)" fontSize="6" fontWeight="600">
                  {value}%
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {hoveredRegion && (
        <div className="absolute top-2 right-2 bg-white rounded-lg shadow-lg border border-border-light p-3 min-w-[160px] z-10">
          <p className="text-xs font-semibold text-navy mb-1">{regions.find((r) => r.id === hoveredRegion)?.name}</p>
          <p className="text-lg font-bold text-navy">{getRegionValue(hoveredRegion)}%</p>
          <p className="text-[10px] text-text-secondary">Бажарилганлик даражаси</p>
        </div>
      )}

      {data.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-3">
          {[
            { color: "#93c5fd", label: "< 65%" },
            { color: "#5BA8F5", label: "65-75%" },
            { color: "#2b8cee", label: "75-85%" },
            { color: "#1a6fd4", label: "> 85%" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: item.color }} />
              <span className="text-[10px] text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
