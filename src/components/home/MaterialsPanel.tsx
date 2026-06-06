"use client";

import { useState, useMemo, useEffect } from "react";
import FilterChips, {
  FILTER_MAP,
  type FilterLabel,
} from "./FilterChips";
import MaterialsTable from "./MaterialsTable";
import { MATERIALS, type Material } from "@/lib/data";
import { listDocuments, docToMaterial } from "@/lib/api";

export default function MaterialsPanel() {
  const [filter, setFilter] = useState<FilterLabel>("전체");
  const [items, setItems] = useState<Material[]>(MATERIALS);

  useEffect(() => {
    listDocuments()
      .then((docs) => {
        if (docs.length) setItems(docs.map(docToMaterial));
      })
      .catch(() => {
        /* 서버 미응답 시 목업 유지 */
      });
  }, []);

  const rows = useMemo(
    () =>
      items.filter(
        (r) => filter === "전체" || r.status === FILTER_MAP[filter],
      ),
    [filter, items],
  );

  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">
          자료 모아보기{" "}
          <span className="text-text-2 num text-[13px] font-normal">
            {rows.length}건
          </span>
        </div>
        <FilterChips value={filter} onChange={setFilter} />
      </div>
      <MaterialsTable rows={rows} />
    </div>
  );
}
