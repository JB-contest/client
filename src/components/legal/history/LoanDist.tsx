import type { LoanDistItem } from "@/lib/legalData";

export default function LoanDist({ items }: { items: LoanDistItem[] }) {
  const total = items.reduce((s, x) => s + x.n, 0);
  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">대출유형별 심의</div>
        <span className="text-text-2 num text-[12.5px]">총 {total}건</span>
      </div>
      <div style={{ padding: "8px 22px 14px" }}>
        <div className="loan-list">
          {items.length === 0 && (
            <div className="text-text-3 text-[13px] py-2">집계된 심의가 없습니다.</div>
          )}
          {items.map((l) => (
            <div className="loan-row" key={l.label}>
              <span className="ln">
                <span className="d" style={{ background: l.color }} />
                {l.label}
              </span>
              <span className="lv num">
                {l.n}
                <span className="u">건</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
