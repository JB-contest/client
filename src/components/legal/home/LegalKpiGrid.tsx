"use client";

import { useEffect, useState } from "react";
import LegalKpi from "../LegalKpi";
import { LEGAL_HOME_KPIS } from "@/lib/legalData";
import { listDocuments } from "@/lib/api";

export default function LegalKpiGrid() {
  // "검토 대기" 카드 값만 실제 문서 수(IN_REVIEW)로 덮어쓴다. 나머지는 목업 유지.
  const [kpis, setKpis] = useState(LEGAL_HOME_KPIS);

  useEffect(() => {
    listDocuments()
      .then((docs) => {
        const waiting = docs.filter((d) => d.status === "IN_REVIEW").length;
        setKpis((prev) =>
          prev.map((k) =>
            k.label === "검토 대기" ? { ...k, value: String(waiting) } : k,
          ),
        );
      })
      .catch(() => {
        /* 서버 미응답 시 목업 값 유지 */
      });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3.5 mb-7">
      {kpis.map((k, i) => (
        <LegalKpi key={i} k={k} />
      ))}
    </div>
  );
}
