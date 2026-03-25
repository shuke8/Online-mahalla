import { cn } from "@/lib/utils";

interface RegionRowProps {
  name: string;
  values: (string | number)[];
  percentage?: number;
  isLast?: boolean;
}

export function RegionRow({ name, values, percentage, isLast }: RegionRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 py-2.5 px-1",
        !isLast && "border-b border-border-light/50"
      )}
    >
      <span className="text-xs sm:text-sm font-medium text-text-label flex-1 truncate">
        {name}
      </span>
      {values.map((v, i) => (
        <span
          key={i}
          className="text-xs sm:text-sm tabular-nums text-text-primary font-medium min-w-[50px] sm:min-w-[80px] text-right"
        >
          {typeof v === "number" ? v.toLocaleString("en-US") : v}
        </span>
      ))}
      {percentage !== undefined && (
        <div className="flex items-center gap-2 min-w-[100px]">
          <div className="flex-1 h-2 bg-border-light rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                percentage >= 80
                  ? "bg-success"
                  : percentage >= 60
                  ? "bg-warning"
                  : "bg-danger"
              )}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <span
            className={cn(
              "text-xs font-semibold tabular-nums",
              percentage >= 80
                ? "text-success"
                : percentage >= 60
                ? "text-warning"
                : "text-danger"
            )}
          >
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}
