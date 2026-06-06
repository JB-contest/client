"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ErrCell from "@/components/ui/ErrCell";
import LegalPill from "./LegalPill";
import type { LegalMaterial } from "@/lib/legalData";
import { ROUTES } from "@/lib/routes";

export default function LegalMaterialsTable({
  rows,
  loading,
}: {
  rows: LegalMaterial[];
  loading?: boolean;
}) {
  const router = useRouter();
  return (
    <div className="px-3 pb-2 pt-1">
      <table className="table">
        <thead>
          <tr>
            <th>자료명</th>
            <th>심의 ID</th>
            <th>소재 유형</th>
            <th>대출유형</th>
            <th>상태</th>
            <th>오류율</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td
                colSpan={7}
                className="text-center text-text-3"
                style={{ padding: "28px 0" }}
              >
                불러오는 중…
              </td>
            </tr>
          )}
          {!loading &&
            rows.map((r, i) => (
            <tr key={i}>
              <td>
                <div className="cell-name">{r.name}</div>
                <div className="cell-sub">{r.camp}</div>
              </td>
              <td className="mono text-xs text-text-2">{r.id}</td>
              <td className="text-text-2">{r.surface}</td>
              <td className="font-medium">{r.type}</td>
              <td>
                <LegalPill status={r.status} />
              </td>
              <td>
                <ErrCell v={r.err} c={r.errC} />
              </td>
              <td className="text-right">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    router.push(
                      r.docId != null
                        ? `${ROUTES.legal.review}?id=${r.docId}`
                        : ROUTES.legal.review,
                    )
                  }
                >
                  검토 <ArrowRight size={14} />
                </button>
              </td>
            </tr>
          ))}
          {!loading && rows.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="text-center text-text-3"
                style={{ padding: "28px 0" }}
              >
                해당 상태의 자료가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
