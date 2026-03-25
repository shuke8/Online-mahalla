"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  trackColor?: string;
  label?: string;
  centerText?: string;
  className?: string;
}

const sizeMap = {
  sm: { width: 80, stroke: 6, fontSize: "text-lg", labelSize: "text-[10px]" },
  md: { width: 120, stroke: 8, fontSize: "text-2xl", labelSize: "text-xs" },
  lg: { width: 160, stroke: 10, fontSize: "text-3xl", labelSize: "text-sm" },
};

export function ProgressRing({
  value,
  size = "md",
  color = "#2b8cee",
  trackColor = "#D8E4F0",
  label,
  centerText,
  className,
}: ProgressRingProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const config = sizeMap[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={config.width}
        height={config.width}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={config.stroke}
        />
        {/* Progress */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold leading-none tabular-nums", config.fontSize)} style={{ color }}>
          {centerText || `${Math.round(animatedValue)}%`}
        </span>
        {label && (
          <span className={cn("text-text-secondary mt-1", config.labelSize)}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
