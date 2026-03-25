"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  maxHeight?: string;
  compact?: boolean;
}

export function DataTable({
  columns,
  data,
  maxHeight = "280px",
  compact = false,
}: DataTableProps) {
  return (
    <div className="rounded-lg border border-border-light overflow-hidden">
      <div className="overflow-auto" style={{ maxHeight }}>
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="bg-navy-lighter/50 hover:bg-navy-lighter/50">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    "text-xs font-semibold text-navy whitespace-nowrap",
                    compact ? "py-2 px-3" : "py-2.5 px-4"
                  )}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                className={cn(
                  "transition-colors",
                  i % 2 === 0 ? "bg-white" : "bg-surface/50"
                )}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={cn(
                      "text-sm text-text-primary",
                      compact ? "py-2 px-3" : "py-2.5 px-4"
                    )}
                  >
                    {col.key === "status" || col.key === "indPlan" || col.key === "certificate" || col.key === "subsidy" ? (
                      <StatusBadge value={String(row[col.key] ?? "")} />
                    ) : (
                      String(row[col.key] ?? "")
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {data.length > 5 && (
        <div className="flex items-center justify-center py-1.5 bg-navy-lighter/30 border-t border-border-light">
          <span className="text-[10px] text-text-secondary font-medium">
            ↕ Прокрутка
          </span>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  const isPositive =
    value === "Тасдиқланган" ||
    value === "Ишга туширилган" ||
    value === "Расмийлаштирилган" ||
    value === "Берилган" ||
    value === "Тавсия этилган";
  const isNegative = value === "Рад этилган" || value === "Тавсия этилмаган";
  const isPending =
    value === "Кўриб чиқилмоқда" ||
    value === "Режалаштирилган" ||
    value === "Жараёнда";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        isPositive && "bg-success/10 text-success",
        isNegative && "bg-danger/10 text-danger",
        isPending && "bg-warning/10 text-warning",
        !isPositive && !isNegative && !isPending && "bg-gray-100 text-text-secondary"
      )}
    >
      {value}
    </span>
  );
}
