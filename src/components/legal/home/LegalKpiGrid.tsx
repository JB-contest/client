import LegalKpi from "../LegalKpi";
import { LEGAL_HOME_KPIS } from "@/lib/legalData";

export default function LegalKpiGrid() {
  return (
    <div className="grid grid-cols-4 gap-3.5 mb-7">
      {LEGAL_HOME_KPIS.map((k, i) => (
        <LegalKpi key={i} k={k} />
      ))}
    </div>
  );
}
