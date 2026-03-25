import { Icon, type IconName } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

interface GlassIconProps {
  icon: IconName;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  onDark?: boolean;
}

const sizeMap = {
  sm: { container: "w-10 h-10", square: "w-8 h-8", icon: 18 },
  md: { container: "w-12 h-12", square: "w-10 h-10", icon: 22 },
  lg: { container: "w-14 h-14", square: "w-12 h-12", icon: 26 },
};

export function GlassIcon({
  icon,
  color = "#2b8cee",
  size = "md",
  className,
  onDark,
}: GlassIconProps) {
  const s = sizeMap[size];

  return (
    <div className={cn("relative shrink-0", s.container, className)}>
      {/* Rotated square backdrop */}
      <div
        className={cn(
          "absolute rounded-[8px] rotate-[15deg]",
          onDark && "bg-white/60 backdrop-blur-[8px] border border-white/60",
          s.square
        )}
        style={{
          ...(!onDark && { backgroundColor: color }),
          top: "0px",
          right: "0px",
        }}
      />
      {/* Frosted glass square */}
      <div
        className={cn(
          "absolute rounded-[8px] bg-white/60 backdrop-blur-[8px] border border-white/60 flex items-center justify-center",
          s.square
        )}
        style={{
          bottom: "0px",
          left: "0px",
          color: color,
        }}
      >
        <Icon name={icon} size={s.icon} variant={onDark ? "Bold" : "Linear"} />
      </div>
    </div>
  );
}
