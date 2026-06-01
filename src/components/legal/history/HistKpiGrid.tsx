import LegalKpi from "../LegalKpi";
import { HIST_KPIS } from "@/lib/legalData";

export default function HistKpiGrid() {
  return (
    <div className="grid grid-cols-4 gap-3.5 mb-7">
      {HIST_KPIS.map((k, i) => (
        <LegalKpi key={i} k={k} />
      ))}
    </div>
  );
}
