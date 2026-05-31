"use client";

import { useState, useMemo } from "react";
import FilterChips, {
  FILTER_MAP,
  type FilterLabel,
} from "./FilterChips";
import MaterialsTable from "./MaterialsTable";
import { MATERIALS } from "@/lib/data";

export default function MaterialsPanel() {
  const [filter, setFilter] = useState<FilterLabel>("전체");
  const rows = useMemo(
    () =>
      MATERIALS.filter(
        (r) => filter === "전체" || r.status === FILTER_MAP[filter],
      ),
    [filter],
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
