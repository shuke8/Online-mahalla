import { GlassIcon } from "@/components/atoms/GlassIcon";
import { type IconName } from "@/components/atoms/Icon";

interface IconCircleProps {
  icon: IconName;
  variant?: "navy" | "gold" | "success" | "warning" | "danger" | "orange" | "purple";
  size?: "sm" | "md" | "lg";
}

const colorMap: Record<string, string> = {
  navy: "#2b8cee",
  gold: "#D4A76A",
  success: "#1dc973",
  warning: "#F59E0B",
  danger: "#EF4444",
  orange: "#fd7d07",
  purple: "#a162f7",
};

export function IconCircle({ icon, variant = "navy", size = "md" }: IconCircleProps) {
  return (
    <GlassIcon
      icon={icon}
      color={colorMap[variant]}
      size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}
    />
  );
}
