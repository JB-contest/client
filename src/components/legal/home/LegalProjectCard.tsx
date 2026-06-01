import PipelineBar from "./PipelineBar";
import PipelineStats from "./PipelineStats";
import type { LegalProject } from "@/lib/legalData";

export default function LegalProjectCard({ p }: { p: LegalProject }) {
  return (
    <div className="lg-proj">
      <div className="lg-proj-name">{p.name}</div>
      <div className="lg-proj-date num">{p.date}</div>
      <div className="lg-proj-meta">
        <span className="lg-proj-tag">{p.type}</span>
        <span className="lg-proj-tag">{p.count}</span>
      </div>
      <PipelineBar segs={p.pipeline} />
      <PipelineStats segs={p.pipeline} />
    </div>
  );
}
