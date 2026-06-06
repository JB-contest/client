import PipelineBar from "./PipelineBar";
import PipelineStats from "./PipelineStats";
import type { LegalProject } from "@/lib/legalData";

export default function LegalProjectCard({ p }: { p: LegalProject }) {
  return (
    <div className="lg-proj">
      <div className="flex items-center justify-between">
        <div>
          <div className="lg-proj-name">{p.name}</div>
          <div className="lg-proj-date num">{p.date}</div>
        </div>
        <span className="pill pill-progress">
          <span className="dot" />
          진행중
        </span>
      </div>
      <div className="lg-proj-meta">
        <span>{p.type}</span>
        <span>·</span>
        <span>{p.count}</span>
      </div>
      <PipelineBar segs={p.pipeline} />
      <PipelineStats segs={p.pipeline} />
    </div>
  );
}
