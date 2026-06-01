import { LOAN_DIST } from "@/lib/legalData";

export default function LoanDist() {
  const total = LOAN_DIST.reduce((s, x) => s + x.n, 0);
  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">대출유형별 심의</div>
        <span className="text-text-2 num text-[12.5px]">총 {total}건</span>
      </div>
      <div style={{ padding: "8px 22px 14px" }}>
        <div className="loan-list">
          {LOAN_DIST.map((l) => (
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
