// Shared color tokens — mirror the Tailwind theme so they can be used
// in inline styles, SVG fills, and dynamic backgrounds without retyping hex.

import type { RiskLevel } from "./data";

export const COLOR = {
  jbNavy: "#0B2F6E",
  jbNavyHover: "#0A2659",
  jbBlue: "#1F6FEB",
  riskHigh: "#DC2626",
  riskMedium: "#F59E0B",
  riskLow: "#16A34A",
  info: "#0EA5E9",
  text1: "#111827",
  text2: "#6B7280",
  text3: "#9CA3AF",
  border: "#E5E7EB",
  subtle: "#F2F4F7",
} as const;

export const RISK_COLOR: Record<RiskLevel, string> = {
  high: COLOR.riskHigh,
  medium: COLOR.riskMedium,
  low: COLOR.riskLow,
};

// 선택 카드 강조용 반투명 링 색(위험도별).
export const RISK_RING: Record<RiskLevel, string> = {
  high: "rgba(220, 38, 38, 0.18)",
  medium: "rgba(245, 158, 11, 0.22)",
  low: "rgba(22, 163, 74, 0.18)",
};

export const ERR_COLOR: Record<"high" | "medium" | "low" | "muted", string> = {
  high: COLOR.riskHigh,
  medium: COLOR.riskMedium,
  low: COLOR.riskLow,
  muted: COLOR.text3,
};
