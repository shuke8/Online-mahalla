"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { UzbekistanMap } from "@/components/organisms/UzbekistanMap";
import { RegionDrillMap } from "@/components/organisms/RegionDrillMap";
import {
  InfrastructureCard,
  CategoryAccent,
  GroupHeader,
} from "@/components/organisms/InfrastructureSection";
import { INFRA_PALETTE } from "@/components/organisms/infrastructure-palette";
import { REGIONS } from "@/lib/constants";
import {
  republicData,
  tumanList,
  mfyList,
  getInfraExplorerCards,
  getInfraExplorerLevel,
  type InfraExplorerSelection,
  type InfraExplorerCard,
  type InfraCategoryKey,
} from "@/lib/mock-data";

const CATEGORY_ICONS: Record<InfraCategoryKey, IconName> = {
  oghirMahalla: "construct",
  yangiMahalla: "layers",
  oghirTuman: "hammer",
  yangiTuman: "business",
};

const LEVEL_DESCRIPTIONS = {
  republic: "Республика — барча вилоятлар кесими",
  viloyat: "Вилоят — туманлар кесими",
  tuman: "Туман — маҳаллалар кесими",
  mfy: "Маҳалла — объектлар даражаси",
} as const;

function SelectField({
  label,
  value,
  placeholder,
  options,
  disabled = false,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: { id: string; name: string }[];
  disabled?: boolean;
  onChange: (id: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-border-light bg-white px-3.5 py-2.5 pr-9 text-sm font-medium text-text-primary transition-colors hover:border-navy/30 focus:outline-none focus:ring-2 focus:ring-navy/25 disabled:cursor-not-allowed disabled:bg-surface disabled:text-text-secondary/60"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/60"
        />
      </span>
    </label>
  );
}

function CardsGroup({
  cards,
  groupKey,
}: {
  cards: InfraExplorerCard[];
  groupKey: "mahalla" | "tuman";
}) {
  if (cards.length === 0) return null;
  const isMahalla = groupKey === "mahalla";
  return (
    <section
      className="relative rounded-2xl p-3 sm:p-4"
      style={
        isMahalla
          ? {
              background: "linear-gradient(135deg, rgba(43, 140, 238, 0.10) 0%, rgba(43, 140, 238, 0.06) 100%)",
              border: "1px solid rgba(43, 140, 238, 0.22)",
              boxShadow: "0 1px 3px rgba(43, 140, 238, 0.06)",
            }
          : {
              background: "linear-gradient(135deg, rgba(161, 98, 247, 0.10) 0%, rgba(161, 98, 247, 0.06) 100%)",
              border: "1px solid rgba(161, 98, 247, 0.24)",
              boxShadow: "0 1px 3px rgba(161, 98, 247, 0.06)",
            }
      }
    >
      <GroupHeader
        title={isMahalla ? "Маҳалла даражасидаги лойиҳалар" : "Туман даражасидаги лойиҳалар"}
        icon={isMahalla ? "home" : "business"}
        color={isMahalla ? "#2b8cee" : "#a162f7"}
        bg={isMahalla ? "rgba(43, 140, 238, 0.12)" : "rgba(161, 98, 247, 0.14)"}
      />
      <div className={`grid grid-cols-1 gap-5 mt-2 ${cards.length > 1 ? "lg:grid-cols-2" : ""}`}>
        {cards.map((card) => (
          <CategoryAccent key={card.key} kind={card.kind}>
            <InfrastructureCard
              section={{
                title: card.title,
                totalProjects: card.totalProjects,
                totalObjects: card.totalObjects,
                interimPct: card.interimPct,
                interimCount: card.interimCount,
                finalPct: card.finalPct,
                finalCount: card.finalCount,
                regions: card.breakdown,
              }}
              icon={CATEGORY_ICONS[card.key]}
              palette={INFRA_PALETTE[card.key]}
              chartTitle={card.breakdownTitle}
            />
          </CategoryAccent>
        ))}
      </div>
    </section>
  );
}

export function InfrastructureExplorer() {
  const [sel, setSel] = useState<InfraExplorerSelection>({});
  const level = getInfraExplorerLevel(sel);
  const cards = getInfraExplorerCards(sel);

  const mahallaCards = cards.filter((c) => c.group === "mahalla");
  const tumanCards = cards.filter((c) => c.group === "tuman");

  // Tanlangan hudud nomi (breadcrumb matni uchun)
  const selectionLabel = [
    sel.viloyatId && REGIONS.find((r) => r.id === sel.viloyatId)?.name,
    sel.tumanId && tumanList.find((t) => t.id === sel.tumanId)?.name,
    sel.mfyId && mfyList.find((m) => m.id === sel.mfyId)?.name,
  ]
    .filter(Boolean)
    .join(" → ");

  const hasSelection = level !== "republic";

  return (
    <>
      {/* Xarita + selectorlar */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6 mb-5 sm:mb-6">
        <div className="xl:col-span-3 bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
            <h3 className="text-base font-semibold text-navy">Ҳудудни танланг</h3>
            {/* Xarita breadcrumb — ichma-ich darajalar orasida qaytish */}
            <nav className="flex items-center gap-1 text-xs font-semibold flex-wrap" aria-label="Харита даражаси">
              <button
                type="button"
                onClick={() => setSel({})}
                className={`rounded-md px-2 py-1 transition-colors ${
                  level === "republic" ? "bg-navy text-white" : "text-navy hover:bg-navy-lighter/60"
                }`}
              >
                Ўзбекистон
              </button>
              {sel.viloyatId && (
                <>
                  <Icon name="chevron-forward" size={10} className="text-text-secondary/50" />
                  <button
                    type="button"
                    onClick={() => setSel({ viloyatId: sel.viloyatId })}
                    className={`rounded-md px-2 py-1 transition-colors ${
                      level === "viloyat" ? "bg-navy text-white" : "text-navy hover:bg-navy-lighter/60"
                    }`}
                  >
                    {REGIONS.find((r) => r.id === sel.viloyatId)?.name.replace(" вилояти", "")}
                  </button>
                </>
              )}
              {sel.tumanId && (
                <>
                  <Icon name="chevron-forward" size={10} className="text-text-secondary/50" />
                  <button
                    type="button"
                    onClick={() => setSel({ viloyatId: sel.viloyatId, tumanId: sel.tumanId })}
                    className={`rounded-md px-2 py-1 transition-colors ${
                      level === "tuman" || level === "mfy" ? "bg-navy text-white" : "text-navy hover:bg-navy-lighter/60"
                    }`}
                  >
                    {tumanList.find((t) => t.id === sel.tumanId)?.name.replace(" тумани", "")}
                  </button>
                </>
              )}
            </nav>
          </div>
          <p className="text-xs text-text-secondary mb-3">
            {level === "republic" && "Харитадан вилоятни босинг ёки ёнидаги рўйхатдан танланг"}
            {level === "viloyat" && "Энди туманни босинг — туманлар кесими очилади"}
            {(level === "tuman" || level === "mfy") && "Маҳаллани босинг — маҳалла даражаси очилади"}
          </p>
          {/* Ichma-ich xarita: republic → viloyatlar SVG, viloyat → tumanlar, tuman/mfy → mahallalar */}
          <div key={level === "mfy" ? "tuman-map" : level} className="animate-in fade-in zoom-in-95 duration-300">
            {level === "republic" && (
              <UzbekistanMap
                data={republicData.regionMapData}
                selectedRegion={sel.viloyatId}
                onRegionClick={(id) => setSel({ viloyatId: id })}
              />
            )}
            {level === "viloyat" && (
              <RegionDrillMap
                mode="tuman"
                cells={tumanList}
                onCellClick={(id) => setSel({ viloyatId: sel.viloyatId, tumanId: id })}
              />
            )}
            {(level === "tuman" || level === "mfy") && (
              <RegionDrillMap
                mode="mfy"
                cells={mfyList}
                selectedId={sel.mfyId}
                onCellClick={(id) =>
                  setSel({ viloyatId: sel.viloyatId, tumanId: sel.tumanId, mfyId: id })
                }
              />
            )}
          </div>
        </div>

        <div className="xl:col-span-2 bg-white rounded-2xl border border-border-light shadow-sm p-3 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="text-base font-semibold text-navy">Ҳудуд танлови</h3>
            {hasSelection && (
              <button
                type="button"
                onClick={() => setSel({})}
                className="inline-flex items-center gap-1 rounded-lg bg-surface px-2.5 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:bg-border-light/70 hover:text-text-primary"
              >
                <Icon name="refresh" size={12} />
                Тозалаш
              </button>
            )}
          </div>

          <div className="space-y-3.5">
            <SelectField
              label="Вилоят"
              value={sel.viloyatId ?? ""}
              placeholder="Барчаси — Республика"
              options={[...REGIONS]}
              onChange={(id) => setSel(id ? { viloyatId: id } : {})}
            />
            <SelectField
              label="Туман"
              value={sel.tumanId ?? ""}
              placeholder={sel.viloyatId ? "Барча туманлар" : "Аввал вилоятни танланг"}
              options={tumanList}
              disabled={!sel.viloyatId}
              onChange={(id) =>
                setSel(id ? { viloyatId: sel.viloyatId, tumanId: id } : { viloyatId: sel.viloyatId })
              }
            />
            <SelectField
              label="Маҳалла (МФЙ)"
              value={sel.mfyId ?? ""}
              placeholder={sel.tumanId ? "Барча маҳаллалар" : "Аввал туманни танланг"}
              options={mfyList}
              disabled={!sel.tumanId}
              onChange={(id) =>
                setSel(
                  id
                    ? { viloyatId: sel.viloyatId, tumanId: sel.tumanId, mfyId: id }
                    : { viloyatId: sel.viloyatId, tumanId: sel.tumanId },
                )
              }
            />
          </div>

          {/* Joriy tanlov holati */}
          <div className="mt-4 rounded-xl bg-surface/70 border border-border-light/60 px-3.5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-1">
              Кўрсатилмоқда
            </p>
            <p className="text-sm font-semibold text-text-primary">
              {hasSelection ? selectionLabel : "Ўзбекистон Республикаси"}
            </p>
            <p className="mt-0.5 text-xs text-text-secondary">{LEVEL_DESCRIPTIONS[level]}</p>
          </div>
        </div>
      </div>

      {/* Darajaga mos kartalar: republic/viloyat=4, tuman=3, mfy=1 */}
      <div key={`${level}-${selectionLabel}`} className="animate-in fade-in duration-200 space-y-6">
        <CardsGroup cards={mahallaCards} groupKey="mahalla" />
        <CardsGroup cards={tumanCards} groupKey="tuman" />
      </div>
    </>
  );
}
