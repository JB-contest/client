import Kpi from "./Kpi";
import { KPIS } from "@/lib/data";

export default function KpiGrid() {
  return (
    <div className="grid grid-cols-4 gap-3.5 mb-[26px]">
      {KPIS.map((k, i) => (
        <Kpi key={i} k={k} />
      ))}
    </div>
  );
}
