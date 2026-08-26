import type { ColorSchema } from "./types";

export type Palette = {
  bg: string;
  elevated: string;
  surface: string;
  fg: string;
  muted: string;
  accent: string;
  accentFg: string;
  tile: string;
  success: string;
  error: string;
  border: string;
};

export const PALETTES: Record<ColorSchema, Palette> = {
  default: {
    bg: "#F3EEE4",
    elevated: "#FFFBF4",
    surface: "#E8E0D2",
    fg: "#1F2A26",
    muted: "#5C6B64",
    accent: "#2F6A56",
    accentFg: "#F7F3EA",
    tile: "#D9E6DE",
    success: "#1F6B4A",
    error: "#A33B32",
    border: "rgba(31, 42, 38, 0.14)",
  },
  protanomaly: {
    bg: "#F2EFE6",
    elevated: "#FFFCF6",
    surface: "#E4DDD0",
    fg: "#1B2428",
    muted: "#546068",
    accent: "#2A6E86",
    accentFg: "#F4FBFD",
    tile: "#D3E3EA",
    success: "#1B6E68",
    error: "#9A4A12",
    border: "rgba(27, 36, 40, 0.16)",
  },
  protanopia: {
    bg: "#F1F0EA",
    elevated: "#FFFEF8",
    surface: "#E3E0D6",
    fg: "#171A1C",
    muted: "#4E555A",
    accent: "#0072B2",
    accentFg: "#F4FBFF",
    tile: "#D4E4F0",
    success: "#009E73",
    error: "#D55E00",
    border: "rgba(23, 26, 28, 0.16)",
  },
  deuteranomaly: {
    bg: "#F1EFE8",
    elevated: "#FFFDF7",
    surface: "#E5DFD3",
    fg: "#1A2320",
    muted: "#55625C",
    accent: "#216C88",
    accentFg: "#F3FBFD",
    tile: "#D2E4EC",
    success: "#1A6F72",
    error: "#B35900",
    border: "rgba(26, 35, 32, 0.16)",
  },
  deuteranopia: {
    bg: "#F0F1EA",
    elevated: "#FCFEF8",
    surface: "#E2E3D8",
    fg: "#16191B",
    muted: "#4C5458",
    accent: "#0072B2",
    accentFg: "#F4FBFF",
    tile: "#D2E5F2",
    success: "#009E73",
    error: "#D55E00",
    border: "rgba(22, 25, 27, 0.16)",
  },
  tritanomaly: {
    bg: "#F4EEE8",
    elevated: "#FFFBF7",
    surface: "#E9DED6",
    fg: "#221C1A",
    muted: "#655750",
    accent: "#2F6A56",
    accentFg: "#F7F3EA",
    tile: "#E4D3C8",
    success: "#1F6B4A",
    error: "#A33B32",
    border: "rgba(34, 28, 26, 0.16)",
  },
  tritanopia: {
    bg: "#F3EEF0",
    elevated: "#FFF9FB",
    surface: "#E6DDE0",
    fg: "#1C171A",
    muted: "#5A5056",
    accent: "#C45C26",
    accentFg: "#FFF8F2",
    tile: "#EDD4C6",
    success: "#009E73",
    error: "#CC79A7",
    border: "rgba(28, 23, 26, 0.16)",
  },
  "high-contrast": {
    bg: "#FFFFFF",
    elevated: "#FFFFFF",
    surface: "#E8E8E8",
    fg: "#000000",
    muted: "#222222",
    accent: "#003D2F",
    accentFg: "#FFFFFF",
    tile: "#D0D0D0",
    success: "#005C32",
    error: "#8B0000",
    border: "#000000",
  },
};

const VAR_MAP: Record<keyof Palette, string> = {
  bg: "--app-bg",
  elevated: "--app-elevated",
  surface: "--app-surface",
  fg: "--app-fg",
  muted: "--app-muted",
  accent: "--app-accent",
  accentFg: "--app-accent-fg",
  tile: "--app-tile",
  success: "--app-success",
  error: "--app-error",
  border: "--app-border",
};

export function applyPalette(schema: ColorSchema) {
  if (typeof document === "undefined") return;
  const palette = PALETTES[schema];
  const root = document.documentElement;
  root.dataset.schema = schema;
  (Object.keys(VAR_MAP) as (keyof Palette)[]).forEach((key) => {
    root.style.setProperty(VAR_MAP[key], palette[key]);
  });
  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme) theme.setAttribute("content", palette.accent);
}
