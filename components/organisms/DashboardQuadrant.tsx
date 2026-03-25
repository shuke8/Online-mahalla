import { type IconName } from "@/components/atoms/Icon";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { cn } from "@/lib/utils";

interface DashboardQuadrantProps {
  title: string;
  icon: IconName;
  date?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "default" | "dark";
  className?: string;
}

export function DashboardQuadrant({
  title,
  icon,
  date = "2026 йил 22-Март",
  subtitle,
  children,
  variant = "default",
  className,
}: DashboardQuadrantProps) {
  return (
    <div
      className={cn(
        "rounded-xl shadow-layered overflow-hidden transition-shadow",
        variant === "default"
          ? "bg-white border border-border-light"
          : "bg-gradient-to-br from-navy to-navy-light border border-navy-light/30",
        className
      )}
    >
      <div
        className={cn(
          "px-3 sm:px-5 pt-4 sm:pt-5 pb-3",
          variant === "default"
            ? "border-b border-border-light/50"
            : "border-b border-white/10"
        )}
      >
        <SectionHeader
          title={title}
          icon={icon}
          date={date}
          subtitle={subtitle}
          variant={variant === "dark" ? "light" : "default"}
        />
      </div>
      <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(100%-80px)]">{children}</div>
    </div>
  );
}
