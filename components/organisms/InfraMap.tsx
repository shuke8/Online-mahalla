"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";

/**
 * InfraMap — geopozitsiya xaritasi (Leaflet).
 *
 * 5 ta base layer (Yandex / OSM / Google Sat / Google Streets / OpenTopoMap),
 * top-right radio layer switcher, draggable brand marker.
 *
 * Yandex EPSG:3395 proyeksiyada ishlaydi — qolgan 4 layer EPSG:3857. Leaflet
 * yaratilgandan keyin CRS'ni o'zgartira olmaydi, shuning uchun Yandex'ga (yoki
 * undan) o'tishda xarita qayta quriladi (center/zoom/marker saqlanadi).
 *
 * Contract — O'ZGARTIRMANG (DalolatnomaForm shu interfeysga bog'liq):
 */
export interface InfraMapProps {
  lat: number;
  lng: number;
  /** boshlang'ich zoom, default 14 */
  zoom?: number;
  /** marker'ni sudrab geopozitsiyani o'zgartirish, default true */
  draggableMarker?: boolean;
  /** marker ko'chganda yangi koordinatalar */
  onLocationChange?: (coords: { lat: number; lng: number }) => void;
  /** tailwind balandlik klasslari, default "h-[300px]" */
  heightClass?: string;
  className?: string;
}

type LayerId =
  | "yandex"
  | "osm"
  | "googleSat"
  | "googleStreets"
  | "openTopo";

interface BaseLayerDef {
  id: LayerId;
  label: string;
  /** EPSG:3395 (Yandex) ham, EPSG:3857 (qolganlari) ham. */
  crs: L.CRS;
  /** layer uchun tile factory (CRS rebuild'da ham qayta ishlatiladi). */
  create: () => L.TileLayer;
}

const GOOGLE_SUBDOMAINS = ["mt0", "mt1", "mt2", "mt3"];
const DEFAULT_LAYER_ID: LayerId = "yandex";

const BASE_LAYERS: BaseLayerDef[] = [
  {
    id: "yandex",
    label: "YandexMaps",
    crs: L.CRS.EPSG3395,
    create: () =>
      L.tileLayer(
        "https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=1&lang=ru_RU",
        {
          maxZoom: 19,
          attribution: "© Яндекс",
        },
      ),
  },
  {
    id: "osm",
    label: "OpenStreetMap",
    crs: L.CRS.EPSG3857,
    create: () =>
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }),
  },
  {
    id: "googleSat",
    label: "Google Sat",
    crs: L.CRS.EPSG3857,
    create: () =>
      L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: GOOGLE_SUBDOMAINS,
        attribution: "© Google",
      }),
  },
  {
    id: "googleStreets",
    label: "Google Streets",
    crs: L.CRS.EPSG3857,
    create: () =>
      L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: GOOGLE_SUBDOMAINS,
        attribution: "© Google",
      }),
  },
  {
    id: "openTopo",
    label: "OpenTopoMap",
    crs: L.CRS.EPSG3857,
    create: () =>
      L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution: "© OpenTopoMap (CC-BY-SA)",
      }),
  },
];

function getLayerDef(id: LayerId): BaseLayerDef {
  return BASE_LAYERS.find((l) => l.id === id) ?? BASE_LAYERS[0];
}

function createMarkerIcon(): L.DivIcon {
  // Brand-colored divIcon (Next.js default-marker-icon bug'ini chetlab o'tadi).
  return L.divIcon({
    className: "infra-map-pin",
    html: `<span style="display:block;width:18px;height:18px;border-radius:50% 50% 50% 0;background:#2b8cee;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);transform:rotate(-45deg)"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 18],
  });
}

export default function InfraMap({
  lat,
  lng,
  zoom = 14,
  draggableMarker = true,
  onLocationChange,
  heightClass = "h-[300px]",
  className = "",
}: InfraMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const baseLayerRef = useRef<L.TileLayer | null>(null);
  const activeIdRef = useRef<LayerId>(DEFAULT_LAYER_ID);

  // Live propslar — effect qayta ishga tushmasligi uchun ref orqali.
  const onChangeRef = useRef(onLocationChange);
  onChangeRef.current = onLocationChange;
  const draggableRef = useRef(draggableMarker);
  draggableRef.current = draggableMarker;

  const [activeId, setActiveId] = useState<LayerId>(DEFAULT_LAYER_ID);

  // ── Xaritani qurish (init va CRS rebuild uchun umumiy) ──────────────────
  function buildMap(
    center: L.LatLngExpression,
    initialZoom: number,
    markerLatLng: L.LatLngExpression,
    layerId: LayerId,
  ): void {
    const container = containerRef.current;
    if (!container) return;

    const layerDef = getLayerDef(layerId);
    const map = L.map(container, {
      center,
      zoom: initialZoom,
      crs: layerDef.crs,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    const base = layerDef.create().addTo(map);

    const marker = L.marker(markerLatLng, {
      draggable: draggableRef.current,
      icon: createMarkerIcon(),
    }).addTo(map);
    marker.on("dragend", () => {
      const p = marker.getLatLng();
      onChangeRef.current?.({ lat: p.lat, lng: p.lng });
    });

    mapRef.current = map;
    baseLayerRef.current = base;
    markerRef.current = marker;
    activeIdRef.current = layerId;

    // Tile sizing fix — layout joylashgach.
    setTimeout(() => mapRef.current?.invalidateSize(), 0);
  }

  function teardownMap(): void {
    mapRef.current?.remove();
    mapRef.current = null;
    baseLayerRef.current = null;
    markerRef.current = null;
  }

  // ── Layer almashtirish ──────────────────────────────────────────────────
  function switchLayer(nextId: LayerId): void {
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;
    if (nextId === activeIdRef.current) return;

    const currentDef = getLayerDef(activeIdRef.current);
    const nextDef = getLayerDef(nextId);

    if (currentDef.crs === nextDef.crs) {
      // Bir xil CRS — faqat tile layer almashtiriladi.
      if (baseLayerRef.current) map.removeLayer(baseLayerRef.current);
      const base = nextDef.create().addTo(map);
      baseLayerRef.current = base;
      activeIdRef.current = nextId;
    } else {
      // CRS o'zgardi — xarita qayta quriladi (center/zoom/marker saqlanadi).
      const center = map.getCenter();
      const currentZoom = map.getZoom();
      const markerPos = marker.getLatLng();
      teardownMap();
      buildMap(center, currentZoom, markerPos, nextId);
    }
  }

  // ── Mount / unmount ───────────────────────────────────────────────────
  useEffect(() => {
    // StrictMode double-mount guard.
    if (mapRef.current) return;
    buildMap([lat, lng], zoom, [lat, lng], activeIdRef.current);

    const onResize = () => mapRef.current?.invalidateSize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      teardownMap();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tashqi lat/lng o'zgarishiga reaksiya (obyekt almashtirilganda).
  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng]);

  // draggable propsi o'zgarsa — mavjud marker'ga qo'llash.
  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    if (draggableMarker) marker.dragging?.enable();
    else marker.dragging?.disable();
  }, [draggableMarker]);

  function handleSelect(id: LayerId): void {
    if (id === activeId) return;
    setActiveId(id);
    switchLayer(id);
  }

  // Card click/scroll xaritaga o'tib ketmasligi uchun.
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cardRef.current) {
      L.DomEvent.disableClickPropagation(cardRef.current);
      L.DomEvent.disableScrollPropagation(cardRef.current);
    }
  }, []);

  return (
    <div
      className={`relative w-full ${heightClass} rounded-xl overflow-hidden border border-border-light z-0 ${className}`}
    >
      <div ref={containerRef} className="absolute inset-0 z-0" />

      <div
        ref={cardRef}
        className="absolute top-2.5 right-2.5 z-[400] flex flex-col gap-0.5 rounded-lg border border-white/60 bg-white/[0.92] p-1.5 text-[12px] leading-none shadow-[0_4px_14px_rgba(0,0,0,0.18)] backdrop-blur-sm pointer-events-auto"
        role="radiogroup"
        aria-label="Xarita qatlami"
      >
        {BASE_LAYERS.map((layer) => {
          const checked = activeId === layer.id;
          return (
            <label
              key={layer.id}
              className={`flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors ${
                checked ? "bg-surface" : "hover:bg-black/[0.04]"
              }`}
            >
              <input
                type="radio"
                name="infra-map-layer"
                value={layer.id}
                checked={checked}
                onChange={() => handleSelect(layer.id)}
                className="h-3 w-3 cursor-pointer accent-navy"
              />
              <span
                className={`whitespace-nowrap ${
                  checked ? "font-semibold text-text-primary" : "text-text-secondary"
                }`}
              >
                {layer.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
