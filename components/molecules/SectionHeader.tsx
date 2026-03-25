import { type IconName } from "@/components/atoms/Icon";
import { IconCircle } from "@/components/atoms/IconCircle";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  icon: IconName;
  date?: string;
  subtitle?: string;
  variant?: "default" | "light";
  iconVariant?: "navy" | "gold" | "success" | "warning" | "danger" | "orange" | "purple";
}

export function SectionHeader({
  title,
  icon,
  date,
  subtitle,
  variant = "default",
  iconVariant = "navy",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <IconCircle
          icon={icon}
          variant={variant === "light" ? "gold" : iconVariant}
          size="md"
        />
        <div>
          <h3
            className={cn(
              "font-bold text-base sm:text-lg leading-tight",
              variant === "light" ? "text-white" : "text-text-primary"
            )}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className={cn(
                "text-xs mt-0.5",
                variant === "light" ? "text-white/60" : "text-text-secondary"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {date && (
        <span
          className={cn(
            "text-xs font-medium",
            variant === "light" ? "text-white/50" : "text-text-secondary"
          )}
        >
          {date}
        </span>
      )}
    </div>
  );
}
