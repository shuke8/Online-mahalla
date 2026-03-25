"use client";

import { Icon } from "@/components/atoms/Icon";

interface LocationItem {
  id: string;
  name: string;
  families: number;
  pct: number;
}

interface LocationSelectorProps {
  title: string;
  items: LocationItem[];
  activeId: string;
  basePath: string;
}

export function LocationSelector({ title, items, activeId, basePath }: LocationSelectorProps) {
  return (
    <div>
      <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block mb-1.5">
        {title}
      </label>
      <div className="relative">
        <select
          value={activeId}
          onChange={(e) => {
            window.location.href = `${basePath}/${e.target.value}`;
          }}
          className="w-full appearance-none bg-white border border-border-light rounded-xl px-4 py-3 pr-10 text-sm font-medium text-navy shadow-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
        >
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} — {item.families.toLocaleString()} оила ({item.pct}%)
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
        />
      </div>
    </div>
  );
}
