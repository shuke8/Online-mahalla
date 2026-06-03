import { cn } from "@/lib/utils";

interface KPIItem {
  label: string;
  plan: number | string;
  actual: number | string;
  unit?: string;
}

interface KPIGroupProps {
  items: KPIItem[];
  columns?: 2 | 3 | 4;
  compact?: boolean;
  size?: "default" | "lg";
}

export function KPIGroup({ items, columns = 2, compact = false, size = "default" }: KPIGroupProps) {
  const isLg = size === "lg";
  return (
    <div
      className={cn(
        "grid",
        isLg ? "gap-4" : "gap-3",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-3",
        columns === 4 && "grid-cols-2 sm:grid-cols-4"
      )}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "rounded-xl border border-border-subtle bg-[#F7F7F7]",
            isLg ? "p-4 sm:p-5" : compact ? "p-2.5" : "p-3"
          )}
        >
          <span className={cn(
            "font-semibold text-text-label uppercase tracking-wider block leading-tight",
            isLg ? "text-sm mb-3" : "text-xs mb-1.5"
          )}>
            {item.label}
          </span>
          <div className={cn("flex items-center", isLg ? "gap-3" : "gap-2")}>
            <div className={cn("flex items-center", isLg ? "gap-2" : "gap-1.5")}>
              <span className={cn(
                "inline-flex items-center rounded-md bg-navy/10 font-medium text-navy-light",
                isLg ? "px-2.5 py-1 text-sm" : "px-1.5 py-0.5 text-xs"
              )}>
                Режа
              </span>
              <span className={cn("font-bold text-navy", isLg ? "text-base sm:text-lg" : "text-sm")}>
                {typeof item.plan === "number"
                  ? item.plan.toLocaleString("en-US")
                  : item.plan}
                {item.unit && (
                  <span className={cn("font-normal text-text-secondary ml-0.5", isLg ? "text-sm" : "text-xs")}>
                    {item.unit}
                  </span>
                )}
              </span>
            </div>
            <span className="text-text-secondary/30">|</span>
            <div className={cn("flex items-center", isLg ? "gap-2" : "gap-1.5")}>
              <span className={cn(
                "inline-flex items-center rounded-md bg-success/10 font-medium text-success",
                isLg ? "px-2.5 py-1 text-sm" : "px-1.5 py-0.5 text-xs"
              )}>
                Амалда
              </span>
              <span className={cn("font-bold text-navy", isLg ? "text-base sm:text-lg" : "text-sm")}>
                {typeof item.actual === "number"
                  ? item.actual.toLocaleString("en-US")
                  : item.actual}
                {item.unit && (
                  <span className={cn("font-normal text-text-secondary ml-0.5", isLg ? "text-sm" : "text-xs")}>
                    {item.unit}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
