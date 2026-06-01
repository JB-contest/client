"use client";

import { useMemo, useState } from "react";
import HistSearch from "./HistSearch";
import HistTable from "./HistTable";
import { HIST_ROWS } from "@/lib/legalData";

export default function HistPanel() {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () =>
      HIST_ROWS.filter(
        (r) =>
          !q.trim() ||
          r.name.includes(q) ||
          r.id.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">
          심의 처리 이력{" "}
          <span className="text-text-2 num text-sm font-medium">
            {HIST_ROWS.length}건
          </span>
        </div>
        <HistSearch value={q} onChange={setQ} />
      </div>
      <HistTable rows={rows} />
    </div>
  );
}
