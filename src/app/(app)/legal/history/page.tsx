"use client";

import { useEffect, useState } from "react";
import PageHead from "@/components/PageHead";
import HistDistGrid from "@/components/legal/history/HistDistGrid";
import HistKpiGrid from "@/components/legal/history/HistKpiGrid";
import HistPanel from "@/components/legal/history/HistPanel";
import {
  buildHistoryData,
  getValidationResults,
  listApprovals,
  listDocuments,
  type HistoryData,
  type ValidationResultResponse,
} from "@/lib/api";

export default function LegalHistoryPage() {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [docs, approvals] = await Promise.all([
          listDocuments(),
          listApprovals(),
        ]);
        const processed = docs.filter(
          (d) =>
            d.status === "APPROVED" || d.status === "REVISION_REQUESTED",
        );
        const validationsByDoc = new Map<number, ValidationResultResponse[]>();
        await Promise.all(
          processed.map(async (d) => {
            const v = await getValidationResults(d.id).catch(() => []);
            validationsByDoc.set(d.id, v);
          }),
        );
        setData(buildHistoryData(docs, approvals, validationsByDoc));
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="fade-in">
      <PageHead
        crumb={["Home", "심의 이력"]}
        title="심의 이력"
        sub="완료된 심의 건의 처리 결과와 오류율 개선 추이를 확인합니다."
      />
      {loading || !data ? (
        <div className="panel p-14 text-center text-text-3 text-[13.5px]">
          {loading ? "불러오는 중…" : "심의 이력이 없습니다."}
        </div>
      ) : (
        <>
          <HistKpiGrid kpis={data.kpis} />
          <HistDistGrid
            violationDist={data.violationDist}
            loanDist={data.loanDist}
          />
          <HistPanel rows={data.rows} />
        </>
      )}
    </div>
  );
}
