"use client";

import { useEffect, useMemo, useState } from "react";
import FilterTabs, { type FilterLabel } from "./FilterTabs";
import LegalMaterialsTable from "./LegalMaterialsTable";
import { LEGAL_MATERIALS, type LegalMaterial } from "@/lib/legalData";
import { listDocuments, docToMaterial } from "@/lib/api";

const MATCH: Record<FilterLabel, (r: LegalMaterial) => boolean> = {
  전체: () => true,
  "검토 필요": (r) => r.status === "waiting",
  "AI 검증중": (r) => r.status === "ai",
  "수정 요청": (r) => r.status === "revise",
  승인완료: (r) => r.status === "approved",
};

export default function LegalMaterialsPanel() {
  const [filter, setFilter] = useState<FilterLabel>("전체");
  const [items, setItems] = useState<LegalMaterial[]>(LEGAL_MATERIALS);

  useEffect(() => {
    listDocuments()
      .then((docs) => {
        if (docs.length) setItems(docs.map(docToMaterial));
      })
      .catch(() => {
        /* 서버 미응답 시 목업 유지 */
      });
  }, []);

  const rows = useMemo(() => items.filter(MATCH[filter]), [filter, items]);

  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">
          자료 모아보기{" "}
          <span className="text-text-2 num text-[13px] font-normal">
            {rows.length}건
          </span>
        </div>
        <FilterTabs value={filter} onChange={setFilter} />
      </div>
      <LegalMaterialsTable rows={rows} />
    </div>
  );
}
