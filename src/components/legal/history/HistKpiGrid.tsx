import LegalKpi from "../LegalKpi";
import type { LegalKpi as LegalKpiType } from "@/lib/legalData";

export default function HistKpiGrid({ kpis }: { kpis: LegalKpiType[] }) {
  return (
    <div className="grid grid-cols-4 gap-3.5 mb-7">
      {kpis.map((k, i) => (
        <LegalKpi key={i} k={k} />
      ))}
    </div>
  );
}
