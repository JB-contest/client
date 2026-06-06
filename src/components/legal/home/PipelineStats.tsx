import type { PipelineSeg } from "@/lib/legalData";

export default function PipelineStats({ segs }: { segs: PipelineSeg[] }) {
  return (
    <div className="lg-proj-stats">
      {segs.map((s, i) => (
        <span key={i}>
          {s.label} <b>{s.n}</b>
        </span>
      ))}
    </div>
  );
}
