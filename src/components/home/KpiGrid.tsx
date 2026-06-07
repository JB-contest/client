"use client";

import { useEffect, useState } from "react";
import Kpi from "./Kpi";
import { KPIS } from "@/lib/data";
import { buildMarketingProjects, listDocuments } from "@/lib/api";

export default function KpiGrid() {
  const [kpis, setKpis] = useState(KPIS);

  useEffect(() => {
    listDocuments()
      .then((docs) => {
        const count = (s: string) =>
          String(docs.filter((d) => d.status === s).length);
        const ongoing = String(buildMarketingProjects(docs).length);
        setKpis((prev) =>
          prev.map((k) => {
            if (k.label === "진행 프로젝트") return { ...k, value: ongoing };
            if (k.label === "검토중") return { ...k, value: count("IN_REVIEW") };
            if (k.label === "수정 요청")
              return { ...k, value: count("REVISION_REQUESTED") };
            if (k.label === "승인 완료")
              return { ...k, value: count("APPROVED") };
            return k;
          }),
        );
      })
      .catch(() => {
        /* 서버 미응답 시 목업 값 유지 */
      });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3.5 mb-[26px]">
      {kpis.map((k, i) => (
        <Kpi key={i} k={k} />
      ))}
    </div>
  );
}
