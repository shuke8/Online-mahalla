"use client";

import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { useBreadcrumb } from "@/lib/breadcrumb-context";
import { useEffect } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavigationBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function NavigationBreadcrumb({ items }: NavigationBreadcrumbProps) {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems(items);
    return () => setItems([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-xs sm:text-sm mb-3 sm:mb-5">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <Icon name="chevron-forward" size={14} className="text-text-secondary/40" />}
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-navy-light hover:text-navy font-medium transition-colors hover:underline underline-offset-2"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-text-secondary font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
