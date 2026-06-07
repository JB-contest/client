"use client";

import { useState, useMemo, useEffect } from "react";
import FilterChips, {
  FILTER_MAP,
  type FilterLabel,
} from "./FilterChips";
import MaterialsTable from "./MaterialsTable";
import type { Material } from "@/lib/data";
import {
  listDocuments,
  getValidationResults,
  buildMaterialHistory,
  type ValidationResultResponse,
} from "@/lib/api";

export default function MaterialsPanel() {
  const [filter, setFilter] = useState<FilterLabel>("전체");
  // null = 로딩 중. API 응답(빈 배열 포함)으로 대체한다. 목업 없음.
  const [items, setItems] = useState<Material[] | null>(null);

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
    () =>
      (items ?? []).filter(
        (r) => filter === "전체" || r.status === FILTER_MAP[filter],
      ),
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
        <FilterChips value={filter} onChange={setFilter} />
      </div>
      <MaterialsTable rows={rows} loading={loading} />
    </div>
  );
}
