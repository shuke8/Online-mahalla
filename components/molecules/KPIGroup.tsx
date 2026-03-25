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
}

export function KPIGroup({ items, columns = 2, compact = false }: KPIGroupProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-3",
        columns === 4 && "grid-cols-2 sm:grid-cols-4"
      )}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "rounded-xl border border-border-subtle bg-surface",
            compact ? "p-2.5" : "p-3"
          )}
        >
          <span className="text-xs font-semibold text-text-label uppercase tracking-wider block mb-1.5 leading-tight">
            {item.label}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-md bg-navy-lighter/40 px-1.5 py-0.5 text-xs font-medium text-navy-light">
                Режа
              </span>
              <span className="text-sm font-bold text-navy">
                {typeof item.plan === "number"
                  ? item.plan.toLocaleString("uz-UZ")
                  : item.plan}
                {item.unit && (
                  <span className="text-xs font-normal text-text-secondary ml-0.5">
                    {item.unit}
                  </span>
                )}
              </span>
            </div>
            <span className="text-text-secondary/30">|</span>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-md bg-success/10 px-1.5 py-0.5 text-xs font-medium text-success">
                Амалда
              </span>
              <span className="text-sm font-bold text-navy">
                {typeof item.actual === "number"
                  ? item.actual.toLocaleString("uz-UZ")
                  : item.actual}
                {item.unit && (
                  <span className="text-xs font-normal text-text-secondary ml-0.5">
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
