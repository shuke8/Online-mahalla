// Brand-anchored cool spectrum: primary #2b8cee at the center, four distinct hues
// fanning out through the cool wheel — Azure → Cyan → Indigo → Violet.
// Shared by InfrastructureSection (old detail view) and InfrastructureTabbedSection.
export const INFRA_PALETTE = {
  oghirMahalla: {
    main: "#2b8cee",
    mainFrom: "#5fa7f3",
    mainTo: "#1d6fcb",
    secondary: "#0ea5e9",
    secFrom: "#38bdf8",
    secTo: "#0284c7",
  },
  yangiMahalla: {
    main: "#06b6d4",
    mainFrom: "#22d3ee",
    mainTo: "#0891b2",
    secondary: "#14b8a6",
    secFrom: "#5eead4",
    secTo: "#0d9488",
  },
  oghirTuman: {
    main: "#4f46e5",
    mainFrom: "#818cf8",
    mainTo: "#3730a3",
    secondary: "#6366f1",
    secFrom: "#a5b4fc",
    secTo: "#4338ca",
  },
  yangiTuman: {
    main: "#8b5cf6",
    mainFrom: "#a78bfa",
    mainTo: "#7c3aed",
    secondary: "#a855f7",
    secFrom: "#c084fc",
    secTo: "#9333ea",
  },
} as const;

export type InfraPalette = (typeof INFRA_PALETTE)[keyof typeof INFRA_PALETTE];
