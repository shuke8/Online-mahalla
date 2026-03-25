"use client";

import { Icon, type IconName } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: IconName;
  variant?: "default" | "primary" | "accent" | "glass";
}

export function StatCard({
  label,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  variant = "default",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5",
        variant === "default" && "bg-white border border-border-light shadow-layered hover:shadow-layered",
        variant === "primary" && "bg-navy text-white",
        variant === "accent" && "bg-gradient-to-br from-navy-lighter/40 to-navy-lighter/20 border border-navy/10",
        variant === "glass" && "bg-white/10 backdrop-blur-sm border border-white/20 text-white"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-wider leading-tight",
            variant === "default" && "text-text-label",
            variant === "primary" && "text-white/60",
            variant === "accent" && "text-text-secondary",
            variant === "glass" && "text-white/60"
          )}
        >
          {label}
        </span>
        {icon && (
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              variant === "default" && "bg-navy-lighter",
              variant === "primary" && "bg-white/10",
              variant === "accent" && "bg-navy/10",
              variant === "glass" && "bg-white/10"
            )}
          >
            <Icon
              name={icon}
              size={16}
              className={cn(
                variant === "default" && "text-navy",
                variant === "primary" && "text-white",
                variant === "accent" && "text-navy",
                variant === "glass" && "text-white"
              )}
            />
          </div>
        )}
      </div>

      <div className="flex items-end gap-2">
        <span
          className={cn(
            "text-xl sm:text-2xl md:text-[30px] font-bold leading-none tracking-tight",
            variant === "default" && "text-navy",
            variant === "primary" && "text-white",
            variant === "accent" && "text-navy",
            variant === "glass" && "text-white"
          )}
        >
          {typeof value === "number" ? value.toLocaleString("en-US") : value}
        </span>
        {trend && trendValue && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium pb-0.5",
              trend === "up" && "text-success",
              trend === "down" && "text-danger",
              trend === "neutral" && "text-text-secondary"
            )}
          >
            <Icon
              name={trend === "up" ? "trending-up" : trend === "down" ? "trending-down" : "remove"}
              size={12}
            />
            {trendValue}
          </span>
        )}
      </div>

      {subtitle && (
        <p
          className={cn(
            "text-xs mt-1.5 leading-snug",
            variant === "default" && "text-text-secondary",
            variant === "primary" && "text-white/50",
            variant === "accent" && "text-text-secondary",
            variant === "glass" && "text-white/50"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
