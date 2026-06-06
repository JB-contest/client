import type { PipelineSeg } from "@/lib/legalData";

// 승인 완료 비율만큼 채우는 단일 진행 바.
export default function PipelineBar({ segs }: { segs: PipelineSeg[] }) {
  const total = segs.reduce((s, x) => s + x.n, 0) || 1;
  const done = segs.find((s) => s.label === "승인 완료")?.n ?? 0;
  const pct = Math.round((done / total) * 100);
  return (
    <div className="lg-proj-bar">
      <i style={{ width: `${pct}%` }} />
    </div>
  );
}
