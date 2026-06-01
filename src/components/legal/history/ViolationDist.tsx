import { VIOLATION_DIST } from "@/lib/legalData";

export default function ViolationDist() {
  const max = Math.max(...VIOLATION_DIST.map((v) => v.pct));
  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">위반 유형 분포</div>
        <span className="text-text-2 text-[12.5px]">최근 147건 기준</span>
      </div>
      <div style={{ padding: "20px 22px" }}>
        <div className="bars">
          {VIOLATION_DIST.map((v) => (
            <div className="bar-row" key={v.label}>
              <span className="bl">{v.label}</span>
              <span className="bar-track">
                <i style={{ width: `${(v.pct / max) * 100}%` }} />
              </span>
              <span className="bv num">{v.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
