import type { ViolationItem } from "@/lib/legalData";

export default function ViolationDist({ items }: { items: ViolationItem[] }) {
  const max = Math.max(1, ...items.map((v) => v.pct));
  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">위반 유형 분포</div>
        <span className="text-text-2 text-[12.5px]">상위 5개 유형</span>
      </div>
      <div style={{ padding: "20px 22px" }}>
        <div className="bars">
          {items.length === 0 && (
            <div className="text-text-3 text-[13px]">집계된 위반이 없습니다.</div>
          )}
          {items.map((v) => (
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
