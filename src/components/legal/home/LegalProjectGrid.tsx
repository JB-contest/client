import LegalProjectCard from "./LegalProjectCard";
import { LEGAL_PROJECTS } from "@/lib/legalData";

export default function LegalProjectGrid() {
  return (
    <>
      <div className="text-[17px] font-bold tracking-[-0.01em] my-1.5 mb-3.5">
        프로젝트 한눈에
      </div>
      <div className="grid grid-cols-2 gap-3.5 mb-7">
        {LEGAL_PROJECTS.map((p, i) => (
          <LegalProjectCard key={i} p={p} />
        ))}
      </div>
    </>
  );
}
