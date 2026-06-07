"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ErrCell from "@/components/ui/ErrCell";
import Pill from "@/components/ui/Pill";
import type { Material } from "@/lib/data";
import { ROUTES } from "@/lib/routes";

export default function MaterialsTable({
  rows,
  loading,
}: {
  rows: Material[];
  loading?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="px-2 pb-1.5 pt-0.5">
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
                <div className="font-semibold text-[13.5px]">{r.name}</div>
                <div className="text-[11.5px] text-text-3">{r.camp}</div>
              </td>
              <td className="mono text-xs text-text-2">{r.id}</td>
              <td className="text-text-2">{r.surface}</td>
              <td>{r.type}</td>
              <td>
                <Pill status={r.status} />
              </td>
              <td>
                <ErrCell v={r.err} c={r.errC} />
              </td>
              <td className="text-right">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    router.push(
                      r.status === "approved"
                        ? ROUTES.marketing.archive
                        : r.docId != null
                          ? `${ROUTES.marketing.feedback}?id=${r.docId}`
                          : ROUTES.marketing.feedback,
                    )
                  }
                >
                  보기 <ArrowRight size={14} />
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
