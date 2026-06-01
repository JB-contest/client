import ErrXform from "./ErrXform";
import ResultPill from "./ResultPill";
import type { HistRow } from "@/lib/legalData";

export default function HistTable({ rows }: { rows: HistRow[] }) {
  return (
    <div className="px-3 pb-2 pt-1">
      <table className="table">
        <thead>
          <tr>
            <th>심의 ID</th>
            <th>자료명</th>
            <th>대출유형</th>
            <th>결과</th>
            <th>오류율</th>
            <th>처리일</th>
            <th>심의필</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id + r.date}>
              <td className="mono text-xs text-text-2">{r.id}</td>
              <td className="cell-name">{r.name}</td>
              <td className="font-medium">{r.type}</td>
              <td>
                <ResultPill result={r.result} />
              </td>
              <td>
                <ErrXform
                  before={r.before}
                  after={r.after}
                  result={r.result}
                />
              </td>
              <td className="num text-text-2 text-[13px]">{r.date}</td>
              <td>
                {r.cert ? (
                  <span
                    className="mono"
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "#0B2F6E",
                    }}
                  >
                    {r.cert}
                  </span>
                ) : (
                  <span className="text-text-3">—</span>
                )}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="text-center text-text-3"
                style={{ padding: "28px 0" }}
              >
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
