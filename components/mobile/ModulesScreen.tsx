"use client";

/**
 * ModulesScreen — мобил илова бош экрани (Online Mahalla "Бош саҳифа").
 * Содда: бир хил ўлчамли тоза карталар, категориялар бўйича гуруҳланган.
 * Тез қидирув: тепада prominent қидирув — ёзганда барча бўлим бўйича дарҳол филтр.
 * layout="phone" — 2 устун; layout="tablet" — 4 устун.
 * Тузилма: AppBar (shrink-0) / қидирув (shrink-0) / контент (flex-1) — frame чўзилади.
 * Contract — O'ZGАРТИРМАНГ:
 */

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import { infraObjects } from "@/lib/mock-data";
import { AppBar, PressCard, MobileStyles } from "@/components/mobile/material";

export interface ModulesScreenProps {
  /** ажратиб кўрсатиладиган (асосий) модул калити */
  activeModule?: string;
  /** модул босилганда калит */
  onOpenModule?: (key: string) => void;
  /** макет: телефон (2 устун) ёки планшет (4 устун) */
  layout?: "phone" | "tablet";
}

interface ModuleTile {
  key: string;
  title: string;
  icon: IconName;
  hue: string;
  badge?: number;
}

interface ModuleCategory {
  key: string;
  title: string;
  modules: ModuleTile[];
}

const CATEGORIES: ModuleCategory[] = [
  {
    key: "construction",
    title: "Қурилиш ва мониторинг",
    modules: [
      { key: "infra", title: "Қурилиш мониторинги", icon: "business", hue: "#2b8cee" },
      { key: "photo", title: "Фотоҳисобот", icon: "gallery", hue: "#338fff", badge: 5 },
      { key: "crops", title: "Экин майдонлари мониторинги", icon: "map", hue: "#1dc973" },
      { key: "vacant", title: "Бўш бино ва ер майдонлари", icon: "building-3", hue: "#16a34a" },
    ],
  },
  {
    key: "business",
    title: "Тадбиркорлик ва даромад",
    modules: [
      { key: "family", title: "Оилавий тадбиркорлик", icon: "users", hue: "#fd7d07", badge: 383 },
      { key: "woman", title: "Тадбиркор - аёл", icon: "woman", hue: "#f43f5e" },
      { key: "bizportal", title: "Бизнес портал", icon: "hierarchy", hue: "#2b8cee", badge: 31 },
      { key: "bozor", title: "Online Bozor", icon: "bag", hue: "#f43f5e" },
    ],
  },
  {
    key: "agriculture",
    title: "Қишлоқ хўжалиги",
    modules: [
      { key: "silk", title: "Пиллачилик", icon: "tree", hue: "#1dc973" },
      { key: "potato", title: "Картошкачилик хатлови", icon: "note", hue: "#16a34a" },
      { key: "garden", title: "Аҳоли томорқаси", icon: "tree", hue: "#1dc973" },
    ],
  },
  {
    key: "social",
    title: "Ижтимоий ва ҳужжатлар",
    modules: [
      { key: "legal", title: "Легаллаштириш", icon: "document-text", hue: "#2b8cee" },
      { key: "voucher", title: "Ўқиш ваучери", icon: "medal", hue: "#338fff" },
      { key: "spec", title: "Маҳалла ихтисослашуви", icon: "shield-tick", hue: "#2b8cee" },
      { key: "housing", title: "Уй-жой хўжалиги", icon: "home", hue: "#1dc973" },
      { key: "lawyer", title: "Маҳалла ҳуқуқшуноси", icon: "judge", hue: "#2b8cee" },
      { key: "plan", title: "Индивидуал режа", icon: "book", hue: "#16a34a" },
    ],
  },
  {
    key: "service",
    title: "Сўровнома ва хизматлар",
    modules: [
      { key: "precinct", title: "Участка саволномаси", icon: "note", hue: "#f43f5e" },
      { key: "geo", title: "Геолокация", icon: "location", hue: "#2b8cee" },
      { key: "qamashi", title: "Қамаши тажрибаси", icon: "bulb", hue: "#338fff" },
      { key: "mahalla1024", title: "1024 Маҳалла", icon: "home", hue: "#16a34a" },
    ],
  },
];

const ALL_MODULES = CATEGORIES.flatMap((c) => c.modules);

const FEATURED_KEY = "onm-featured-modules";
const FEATURED_EVENT = "onm-featured-changed";

/**
 * Танланган бўлимлар — localStorage'да сақланади; бир саҳифадаги барча
 * ModulesScreen нусхалари (телефон + планшет) CustomEvent орқали жонли синхронланади.
 */
function useFeaturedModules() {
  const [featured, setFeatured] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FEATURED_KEY);
      if (raw) setFeatured(JSON.parse(raw) as string[]);
    } catch {
      /* localStorage йўқ/бузуқ — бўш рўйхат билан давом этамиз */
    }
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<string[]>).detail;
      if (Array.isArray(detail)) setFeatured(detail);
    };
    window.addEventListener(FEATURED_EVENT, onChange);
    return () => window.removeEventListener(FEATURED_EVENT, onChange);
  }, []);

  // Эслатма: side-effect'лар (localStorage + sync event) updater ичида ЭМАС —
  // updater render фазасида ишлайди, у ерда бошқа нусхада setState чақириш
  // "setState while rendering" хатосини беради. Шунинг учун ҳаммаси event handler'да.
  const toggle = (key: string) => {
    const next = featured.includes(key)
      ? featured.filter((k) => k !== key)
      : [...featured, key];
    setFeatured(next);
    try {
      localStorage.setItem(FEATURED_KEY, JSON.stringify(next));
    } catch {
      /* сақлаб бўлмаса ҳам UI ишлайверади */
    }
    window.dispatchEvent(new CustomEvent(FEATURED_EVENT, { detail: next }));
  };

  return { featured, toggle };
}

type ViewMode = "grid" | "list";

const VIEW_KEY = "onm-modules-view";
const VIEW_EVENT = "onm-modules-view-changed";

/**
 * Бўлимлар кўриниши (grid/list) — localStorage'да сақланади; бир саҳифадаги
 * барча ModulesScreen нусхалари (телефон + планшет) CustomEvent орқали синхрон.
 * SSR'да доим "grid" — localStorage эса effect'да ўқилади (hydration-safe).
 */
function useViewMode() {
  const [view, setView] = useState<ViewMode>("grid");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VIEW_KEY);
      if (raw === "list" || raw === "grid") setView(raw);
    } catch {
      /* localStorage йўқ — default grid */
    }
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ViewMode>).detail;
      if (detail === "list" || detail === "grid") setView(detail);
    };
    window.addEventListener(VIEW_EVENT, onChange);
    return () => window.removeEventListener(VIEW_EVENT, onChange);
  }, []);

  const set = (v: ViewMode) => {
    setView(v);
    try {
      localStorage.setItem(VIEW_KEY, v);
    } catch {
      /* сақланмаса ҳам UI ишлайверади */
    }
    window.dispatchEvent(new CustomEvent(VIEW_EVENT, { detail: v }));
  };

  return { view, setView: set };
}

export default function ModulesScreen({ activeModule = "infra", onOpenModule, layout = "phone" }: ModulesScreenProps) {
  const isTablet = layout === "tablet";
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(
    () => (q ? ALL_MODULES.filter((m) => m.title.toLowerCase().includes(q)) : []),
    [q],
  );

  const gridCols = isTablet ? "grid-cols-4" : "grid-cols-2";

  const { featured, toggle: toggleFeatured } = useFeaturedModules();
  const featuredModules = useMemo(
    () => featured.map((k) => ALL_MODULES.find((m) => m.key === k)).filter(Boolean) as ModuleTile[],
    [featured],
  );

  const { view, setView } = useViewMode();
  const listWrapCls = isTablet ? "grid grid-cols-2 gap-2.5" : "flex flex-col gap-2";
  const gridWrapCls = `grid ${gridCols} gap-2.5`;

  // Бир гуруҳ модулларни танланган кўринишда (grid/list) чизади.
  function renderModules(modules: ModuleTile[], keyPrefix = "") {
    return (
      <div className={view === "list" ? listWrapCls : gridWrapCls}>
        {modules.map((m) => {
          const shared = {
            module: m,
            active: m.key === activeModule,
            onClick: () => onOpenModule?.(m.key),
            featured: featured.includes(m.key),
            onToggleFeature: () => toggleFeatured(m.key),
          };
          return view === "list" ? (
            <ModuleRow key={keyPrefix + m.key} {...shared} />
          ) : (
            <ModuleTile key={keyPrefix + m.key} {...shared} />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-[#f4f7fb]">
      <MobileStyles />

      <AppBar
        title="Бош саҳифа"
        subtitle="Online Mahalla платформаси"
        trailing={
          <button
            type="button"
            aria-label="Янгилаш"
            className="mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-white/95 transition-colors hover:bg-white/15 active:scale-[0.94]"
          >
            <Icon name="refresh" size={20} />
          </button>
        }
      />

      {/* Тез қидирув + кўриниш переключатели — бир қаторда */}
      <div className={`shrink-0 bg-navy pb-4 pt-0.5 ${isTablet ? "px-6" : "px-3.5"}`}>
        <div className={`flex items-center gap-2.5 ${isTablet ? "mx-auto max-w-2xl" : ""}`}>
          <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl bg-white px-4 shadow-[0_6px_18px_rgba(15,23,42,0.22)]">
            <Icon name="search" size={20} className="shrink-0 text-navy" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Бўлим қидириш…"
              aria-label="Бўлимларни қидириш"
              className="min-h-[52px] w-full bg-transparent text-[15px] font-medium text-text-primary outline-none placeholder:font-normal placeholder:text-text-secondary/70"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Тозалаш"
                className="-mr-1.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-slate-100 active:scale-90"
              >
                <Icon name="close-circle" size={18} variant="Bold" />
              </button>
            )}
          </div>
          <ViewToggle value={view} onChange={setView} />
        </div>
      </div>

      {/* Контент — frame вертикал чўзилади */}
      <div className={`flex-1 -mt-3 rounded-t-3xl bg-[#f4f7fb] pb-5 pt-4 ${isTablet ? "px-6" : "px-3.5"}`}>
        {q ? (
          /* ── Қидирув натижалари ── */
          results.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
              <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-navy/[0.07] text-navy">
                <Icon name="search" size={26} />
              </span>
              <p className="text-[14px] font-bold text-text-primary">Бўлим топилмади</p>
              <p className="mt-1 text-[12px] text-text-secondary">«{query}» бўйича натижа йўқ</p>
            </div>
          ) : (
            <>
              <p className="mb-3 px-0.5 text-[12px] font-medium text-text-secondary">
                {results.length} та натижа топилди
              </p>
              {renderModules(results)}
            </>
          )
        ) : (
          /* ── Категориялар бўйича ── */
          <div className="flex flex-col gap-6">
            {featuredModules.length > 0 && (
              <section aria-label="Танланган бўлимлар">
                <div className="mb-2.5 flex items-center gap-2 px-0.5">
                  <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-lg bg-[#D4A76A]/15 text-[#D4A76A]">
                    <Icon name="star" size={13} variant="Bold" />
                  </span>
                  <h2 className="text-[13px] font-bold text-text-primary">Танланган бўлимлар</h2>
                  <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#D4A76A]/15 px-1.5 text-[10.5px] font-bold text-[#a9743a]">
                    {featuredModules.length}
                  </span>
                  <span className="ml-1 h-px flex-1 bg-border-light" />
                </div>
                {renderModules(featuredModules, "fav-")}
              </section>
            )}
            {CATEGORIES.map((cat) => (
              <section key={cat.key}>
                <div className="mb-2.5 flex items-center gap-2 px-0.5">
                  <h2 className="text-[13px] font-bold text-text-primary">{cat.title}</h2>
                  <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-navy/[0.08] px-1.5 text-[10.5px] font-bold text-navy">
                    {cat.modules.length}
                  </span>
                  <span className="ml-1 h-px flex-1 bg-border-light" />
                </div>
                {renderModules(cat.modules)}
              </section>
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-[10.5px] font-medium text-text-secondary/70">
          {ALL_MODULES.length} та бўлим · 1257 / 3.3.26
        </p>
      </div>
    </div>
  );
}

/* ── Бир хил ўлчамли тоза модул картаси ─────────────────────────────────── */
function ModuleTile({
  module: m,
  active,
  onClick,
  featured,
  onToggleFeature,
}: {
  module: ModuleTile;
  active?: boolean;
  onClick?: () => void;
  featured?: boolean;
  onToggleFeature?: () => void;
}) {
  return (
    <div className="relative h-full">
      <PressCard onClick={onClick} className="h-full rounded-2xl">
        <div
          className={`relative flex h-full min-h-[116px] flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border p-3 text-center transition-shadow ${
            active
              ? "border-navy/40 bg-navy-lighter/50 ring-2 ring-navy/25"
              : "border-border-light bg-white shadow-layered-sm hover:shadow-layered"
          }`}
        >
          {/* Юқори-ўнг: билдиришнома сони ёки (сони йўқ бўлса) фаол белгиси */}
          {m.badge != null ? (
            <span className="absolute right-2 top-2 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white shadow-[0_2px_6px_rgba(239,68,68,0.4)]">
              {m.badge > 999 ? "999+" : m.badge}
            </span>
          ) : active ? (
            <span className="absolute right-2 top-2 inline-flex items-center gap-0.5 rounded-full bg-navy px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
              <Icon name="tick-circle" size={9} variant="Bold" /> Фаол
            </span>
          ) : null}
          <span
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: `${m.hue}1f`, color: m.hue }}
          >
            <Icon name={m.icon} size={24} variant="Bold" />
          </span>
          <h3 className="line-clamp-2 text-[12px] font-semibold leading-tight text-text-primary">{m.title}</h3>
        </div>
      </PressCard>

      {/* Танлаш тугмаси — PressCard'дан ташқари (валид HTML: тугма ичида тугма бўлмайди) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFeature?.();
        }}
        aria-pressed={!!featured}
        aria-label={`${m.title} — ${featured ? "танланганидан олиб ташлаш" : "танланганга қўшиш"}`}
        title={featured ? "Танланганидан олиб ташлаш" : "Танланганга қўшиш"}
        className={`absolute left-1.5 top-1.5 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all active:scale-90 ${
          featured
            ? "border-[#D4A76A]/45 bg-[#D4A76A]/15 text-[#D4A76A] shadow-[0_2px_8px_rgba(212,167,106,0.4)]"
            : "border-border-light bg-white/85 text-text-secondary/60 shadow-layered-sm backdrop-blur-sm hover:border-[#D4A76A]/40 hover:text-[#D4A76A]"
        }`}
      >
        <Icon name="star" size={16} variant={featured ? "Bold" : "Outline"} />
      </button>
    </div>
  );
}

/* ── Кўриниш переключатели (grid / list) ────────────────────────────────── */
function ViewToggle({ value, onChange }: { value: ViewMode; onChange: (v: ViewMode) => void }) {
  const btn = (active: boolean) =>
    `inline-flex h-9 w-9 items-center justify-center rounded-xl transition-all active:scale-90 ${
      active ? "bg-navy text-white shadow-sm" : "text-text-secondary hover:text-navy"
    }`;
  return (
    <div
      role="group"
      aria-label="Бўлимлар кўриниши"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-2xl bg-white p-1 shadow-[0_6px_18px_rgba(15,23,42,0.22)]"
    >
      <button
        type="button"
        onClick={() => onChange("grid")}
        aria-pressed={value === "grid"}
        aria-label="Тўр кўриниши"
        title="Тўр кўриниши"
        className={btn(value === "grid")}
      >
        <Icon name="grid" size={18} variant="Bold" />
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-pressed={value === "list"}
        aria-label="Рўйхат кўриниши"
        title="Рўйхат кўриниши"
        className={btn(value === "list")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <line x1="9" y1="6" x2="20" y2="6" />
          <line x1="9" y1="12" x2="20" y2="12" />
          <line x1="9" y1="18" x2="20" y2="18" />
          <circle cx="4.5" cy="6" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="4.5" cy="12" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="4.5" cy="18" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      </button>
    </div>
  );
}

/* ── Рўйхат кўриниши — горизонтал модул қатори ──────────────────────────── */
function ModuleRow({
  module: m,
  active,
  onClick,
  featured,
  onToggleFeature,
}: {
  module: ModuleTile;
  active?: boolean;
  onClick?: () => void;
  featured?: boolean;
  onToggleFeature?: () => void;
}) {
  return (
    <div className="relative">
      <PressCard onClick={onClick} className="rounded-xl">
        <div
          className={`flex items-center gap-3 rounded-xl border p-2.5 pr-12 transition-shadow ${
            active
              ? "border-navy/40 bg-navy-lighter/50 ring-2 ring-navy/25"
              : "border-border-light bg-white shadow-layered-sm hover:shadow-layered"
          }`}
        >
          <span
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${m.hue}1f`, color: m.hue }}
          >
            <Icon name={m.icon} size={20} variant="Bold" />
          </span>
          <h3 className="min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary">{m.title}</h3>
          {m.badge != null ? (
            <span className="inline-flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
              {m.badge > 999 ? "999+" : m.badge}
            </span>
          ) : active ? (
            <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-navy px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
              <Icon name="tick-circle" size={9} variant="Bold" /> Фаол
            </span>
          ) : null}
        </div>
      </PressCard>

      {/* Танлаш тугмаси — PressCard'дан ташқари (валид HTML: тугма ичида тугма бўлмайди) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFeature?.();
        }}
        aria-pressed={!!featured}
        aria-label={`${m.title} — ${featured ? "танланганидан олиб ташлаш" : "танланганга қўшиш"}`}
        title={featured ? "Танланганидан олиб ташлаш" : "Танланганга қўшиш"}
        className={`absolute right-2 top-1/2 z-20 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border transition-all active:scale-90 ${
          featured
            ? "border-[#D4A76A]/45 bg-[#D4A76A]/15 text-[#D4A76A] shadow-[0_2px_8px_rgba(212,167,106,0.4)]"
            : "border-border-light bg-white text-text-secondary/55 hover:border-[#D4A76A]/40 hover:text-[#D4A76A]"
        }`}
      >
        <Icon name="star" size={15} variant={featured ? "Bold" : "Outline"} />
      </button>
    </div>
  );
}
