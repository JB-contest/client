import type { Kpi as KpiT } from "@/lib/data";

export default function Kpi({ k }: { k: KpiT }) {
  return (
    <div className="kpi">
      <div className="kpi-label">{k.label}</div>
      <div>
        <span
          className="kpi-value"
          style={k.warn ? { color: "#F59E0B" } : undefined}
        >
          {k.value}
        </span>
        <span className="kpi-unit">{k.unit}</span>
      </div>
    </div>
  );
}
