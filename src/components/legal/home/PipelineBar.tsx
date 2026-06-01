import type { PipelineSeg } from "@/lib/legalData";

export default function PipelineBar({ segs }: { segs: PipelineSeg[] }) {
  const total = segs.reduce((s, x) => s + x.n, 0) || 1;
  return (
    <div className="lg-proj-bar">
      {segs.map(
        (s, i) =>
          s.n > 0 && (
            <span
              key={i}
              style={{
                width: `${(s.n / total) * 100}%`,
                background: s.color,
              }}
            />
          ),
      )}
    </div>
  );
}
