"use client";

import { useMemo, useState } from "react";
import HistSearch from "./HistSearch";
import HistTable from "./HistTable";
import type { HistRow } from "@/lib/legalData";

export default function HistPanel({ rows: allRows }: { rows: HistRow[] }) {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () =>
      allRows.filter(
        (r) =>
          !q.trim() ||
          r.name.includes(q) ||
          r.id.toLowerCase().includes(q.toLowerCase()),
      ),
    [q, allRows],
  );

  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">
          심의 처리 이력{" "}
          <span className="text-text-2 num text-sm font-medium">
            {allRows.length}건
          </span>
        </div>
        <HistSearch value={q} onChange={setQ} />
      </div>
      <HistTable rows={rows} />
    </div>
  );
}
