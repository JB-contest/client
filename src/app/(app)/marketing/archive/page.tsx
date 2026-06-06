"use client";

import { useEffect, useMemo, useState } from "react";
import PageHead from "@/components/PageHead";
import ArchiveGrid from "@/components/archive/ArchiveGrid";
import ArchiveToolbar from "@/components/archive/ArchiveToolbar";
import EmptyState from "@/components/archive/EmptyState";
import { type ArchiveItem } from "@/lib/data";
import {
  listApprovals,
  listDocuments,
  LOCATION_LABEL,
  LOAN_TYPE_LABEL,
} from "@/lib/api";

// 결재일 + 6개월 = 유효기간.
function plusSixMonths(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  d.setMonth(d.getMonth() + 6);
  return d.toISOString().slice(0, 10).replace(/-/g, ".");
}

export default function ArchivePage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [surface, setSurface] = useState("");
  // null = 로딩 중. API 응답(빈 배열 포함)으로 대체한다. 목업 없음.
  const [items, setItems] = useState<ArchiveItem[] | null>(null);

  useEffect(() => {
    Promise.all([listDocuments(), listApprovals()])
      .then(([docs, approvals]) => {
        const byId = new Map(docs.map((d) => [d.id, d]));
        setItems(
          approvals.map((a) => {
            const d = byId.get(a.documentId);
            return {
              no: a.reviewNumber,
              name: d?.name ?? `문서 #${a.documentId}`,
              camp: d?.title ?? "",
              surface: d ? LOCATION_LABEL[d.uploadLocation] ?? "" : "",
              type: d ? LOAN_TYPE_LABEL[d.loanType] ?? "" : "",
              err: "0%",
              risk: "A",
              req: "6/6",
              issued: (a.approvedAt?.slice(0, 10) ?? "").replace(/-/g, "."),
              expires: plusSixMonths(a.approvedAt ?? ""),
              by: a.approverName ?? "준법자문가",
            };
          }),
        );
      })
      .catch(() => setItems([]));
  }, []);

  const loading = items === null;
  const list = useMemo(
    () =>
      (items ?? []).filter(
        (a) =>
          (!q ||
            a.name.includes(q) ||
            a.no.includes(q) ||
            a.camp.includes(q)) &&
          (!type || a.type === type) &&
          (!surface || a.surface === surface),
      ),
    [q, type, surface, items],
  );

  return (
    <div>
      <PageHead
        crumb={[]}
        title="심의필 보관함"
        sub="승인 완료된 자료의 광고 심의필 증명을 보관·발급합니다."
      />
      <ArchiveToolbar
        q={q}
        setQ={setQ}
        type={type}
        setType={setType}
        surface={surface}
        setSurface={setSurface}
        total={list.length}
      />
      {loading ? (
        <div className="panel p-14 text-center text-text-3 text-[13.5px]">
          불러오는 중…
        </div>
      ) : list.length === 0 ? (
        <EmptyState />
      ) : (
        <ArchiveGrid items={list} />
      )}
    </div>
  );
}
