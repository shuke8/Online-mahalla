"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { GlassIcon } from "@/components/atoms/GlassIcon";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems: { label: string; href: string; icon: IconName }[] = [
  { label: "Бош саҳифа", href: "/", icon: "grid" },
  { label: "Инфратузилма", href: "/infratuzilma", icon: "business" },
  { label: "Республика", href: "/respublika", icon: "globe" },
  { label: "Вилоят", href: "/viloyat/jizzakh", icon: "map" },
  { label: "Туман", href: "/tuman/jizzakh-city", icon: "location" },
  { label: "МФЙ", href: "/mfy/yangi-hayot", icon: "home" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border-light shadow-layered-sm">
      <div className="px-3 sm:px-6">
        {/* Top row: title + date */}
        <div className="flex items-center justify-between py-3.5">
          <div className="flex items-center gap-3">
            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-surface transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Менюни очиш"
            >
              <Menu size={22} className="text-navy" />
            </button>
            <GlassIcon icon="analytics" color="#2b8cee" size="sm" />
            <div>
              <h1 className="text-base font-bold text-navy leading-tight">
                Online Mahalla Dashboard
              </h1>
              <p className="text-xs text-text-secondary leading-tight hidden sm:block">
                Камбағалликни қисқартириш дастури
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface rounded-full px-3.5 py-2">
              <Icon name="time" className="text-navy" size={15} />
              <span className="text-sm font-medium text-text-label">
                2026 йил 22-Март
              </span>
            </div>
            <div className="text-xs text-text-secondary">
              Охирги янгиланиш: 10:35
            </div>
          </div>
        </div>

        {/* Tab navigation — desktop only */}
        <div className="hidden md:flex items-center gap-1.5 pb-2.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  isActive
                    ? "bg-navy text-white shadow-sm"
                    : "text-text-secondary hover:text-navy hover:bg-surface"
                )}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  className={cn(
                    isActive ? "text-white" : "text-text-secondary"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile sheet drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="p-4 border-b border-border-light">
            <div className="flex items-center gap-3">
              <GlassIcon icon="analytics" color="#2b8cee" size="sm" />
              <SheetTitle className="text-base font-bold text-navy">
                Online Mahalla
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="py-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-navy/5 text-navy border-r-2 border-navy"
                      : "text-text-secondary hover:text-navy hover:bg-surface"
                  )}
                >
                  <Icon
                    name={item.icon}
                    size={18}
                    className={cn(
                      isActive ? "text-navy" : "text-text-secondary"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-auto p-4 border-t border-border-light">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Icon name="time" size={15} />
              <span>2026 йил 22-Март</span>
            </div>
            <p className="text-xs text-text-secondary/70 mt-1">
              Охирги янгиланиш: 10:35
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
