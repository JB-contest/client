import type { ReviewData } from "@/lib/legalData";

export default function ReviewMetaBar({ data }: { data: ReviewData }) {
  return (
    <div className="panel mb-[18px]">
      <div className="rev-meta">
        <div>
          <div className="rm-title">{data.title}</div>
          <div className="rm-sub">{data.surface}</div>
        </div>
        <div className="rm-right">
          <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>
            {data.id}
          </div>
          <div
            className="num"
            style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}
          >
            {data.sent}
          </div>
        </div>
      </div>
    </div>
  );
}
