import type { PipelineSeg } from "@/lib/legalData";

export default function PipelineStats({ segs }: { segs: PipelineSeg[] }) {
  return (
    <div className="lg-proj-stats">
      {segs.map((s, i) => (
        <div className="lg-proj-stat" key={i}>
          <span className="pl">
            <span className="d" style={{ background: s.color }} />
            {s.label}
          </span>
          <span className="pn">{s.n}</span>
        </div>
      ))}
    </div>
  );
}
