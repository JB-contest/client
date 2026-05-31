import clsx from "clsx";
import { RISK_MAP, type RiskLevel } from "@/lib/data";

export default function RiskBadge({ level }: { level: RiskLevel }) {
  const r = RISK_MAP[level];
  if (!r) return null;
  return (
    <span className={clsx("risk", r.cls)}>
      <span className="dot" />
      {r.label}
    </span>
  );
}
