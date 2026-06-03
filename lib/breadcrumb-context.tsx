"use client";

import { createContext, useContext, useState } from "react";

export type BreadcrumbItem = { label: string; href?: string };

const BreadcrumbContext = createContext<{
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
}>({ items: [], setItems: () => {} });

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);
  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export const useBreadcrumb = () => useContext(BreadcrumbContext);
