"use client";

import { useEffect, useState } from "react";
import Kpi from "./Kpi";
import { KPIS } from "@/lib/data";
import { listDocuments } from "@/lib/api";

export default function KpiGrid() {
  // 문서 상태로 셀 수 있는 값(검토중·수정 요청·승인 완료)만 실제 API로 덮어쓴다.
  // "진행 프로젝트"는 백엔드에 해당 개념이 없어 목업 유지.
  const [kpis, setKpis] = useState(KPIS);

  useEffect(() => {
    listDocuments()
      .then((docs) => {
        const count = (s: string) =>
          String(docs.filter((d) => d.status === s).length);
        setKpis((prev) =>
          prev.map((k) => {
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
