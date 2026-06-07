"use client";

import { useEffect, useMemo, useState } from "react";
import FilterTabs, { type FilterLabel } from "./FilterTabs";
import LegalMaterialsTable from "./LegalMaterialsTable";
import type { LegalMaterial } from "@/lib/legalData";
import {
  listDocuments,
  getValidationResults,
  buildMaterialHistory,
  type ValidationResultResponse,
} from "@/lib/api";

const MATCH: Record<FilterLabel, (r: LegalMaterial) => boolean> = {
  전체: () => true,
  "검토 필요": (r) => r.status === "waiting",
  "AI 검증중": (r) => r.status === "ai",
  "수정 요청": (r) => r.status === "revise",
  승인완료: (r) => r.status === "approved",
};

export default function LegalMaterialsPanel() {
  const [filter, setFilter] = useState<FilterLabel>("전체");
  // null = 로딩 중. API 응답(빈 배열 포함)이 오면 그 값으로 대체한다. 목업 없음.
  const [items, setItems] = useState<LegalMaterial[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const docs = await listDocuments();
        const validationsByDoc = new Map<number, ValidationResultResponse[]>();
        await Promise.all(
          docs.map(async (d) => {
            const v = await getValidationResults(d.id).catch(() => []);
            validationsByDoc.set(d.id, v);
          }),
        );
        setItems(buildMaterialHistory(docs, validationsByDoc));
      } catch {
        setItems([]);
      }
    })();
  }, []);

  const loading = items === null;
  const rows = useMemo(
    () => (items ?? []).filter(MATCH[filter]),
    [filter, items],
  );

  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">
          자료 모아보기{" "}
          {!loading && (
            <span className="text-text-2 num text-[13px] font-normal">
              {rows.length}건
            </span>
          )}
        </div>
        <FilterTabs value={filter} onChange={setFilter} />
      </div>
      <LegalMaterialsTable rows={rows} loading={loading} />
    </div>
  );
}
