"use client";

import { useEffect, useMemo, useState } from "react";
import PageHead from "@/components/PageHead";
import ArchiveGrid from "@/components/archive/ArchiveGrid";
import ArchiveToolbar from "@/components/archive/ArchiveToolbar";
import EmptyState from "@/components/archive/EmptyState";
import { ARCHIVE, type ArchiveItem } from "@/lib/data";
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
  const [items, setItems] = useState<ArchiveItem[]>(ARCHIVE);

  useEffect(() => {
    Promise.all([listDocuments(), listApprovals()])
      .then(([docs, approvals]) => {
        if (!approvals.length) return; // 결재 없으면 목업 유지
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
      .catch(() => {
        /* 서버 미응답 시 목업 유지 */
      });
  }, []);

  const list = useMemo(
    () =>
      items.filter(
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
      {list.length === 0 ? <EmptyState /> : <ArchiveGrid items={list} />}
    </div>
  );
}
