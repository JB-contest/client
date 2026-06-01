"use client";

import { useMemo, useState } from "react";
import FilterTabs, { type FilterLabel } from "./FilterTabs";
import LegalMaterialsTable from "./LegalMaterialsTable";
import { LEGAL_MATERIALS, type LegalMaterial } from "@/lib/legalData";

const MATCH: Record<FilterLabel, (r: LegalMaterial) => boolean> = {
  전체: () => true,
  "검토 필요": (r) => r.status === "waiting" || r.status === "ai",
  "검토 대기": (r) => r.status === "waiting",
  "수정 요청": (r) => r.status === "revise",
  "승인 완료": (r) => r.status === "approved",
};

export default function LegalMaterialsPanel() {
  const [filter, setFilter] = useState<FilterLabel>("전체");
  const rows = useMemo(() => LEGAL_MATERIALS.filter(MATCH[filter]), [filter]);

  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">
          자료 모아보기{" "}
          <span className="text-text-2 num text-[13px] font-normal">
            {LEGAL_MATERIALS.length}건
          </span>
        </div>
        <FilterTabs value={filter} onChange={setFilter} />
      </div>
      <LegalMaterialsTable rows={rows} />
    </div>
  );
}
