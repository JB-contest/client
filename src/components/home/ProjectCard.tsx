import type { Project } from "@/lib/data";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="border border-border rounded-card p-4 px-[18px] bg-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-[15px]">{p.name}</div>
          <div className="text-xs text-text-3 mt-0.5 num">{p.date}</div>
        </div>
        <span className="pill pill-progress">
          <span className="dot" />
          진행중
        </span>
      </div>
      <div className="flex gap-3.5 my-3 text-xs text-text-2">
        <span>{p.type}</span>
        <span>·</span>
        <span>{p.count}</span>
      </div>
      <div className="h-1.5 rounded-[3px] bg-subtle overflow-hidden mt-2.5 mb-3">
        <div
          className="h-full bg-jb-navy rounded-[3px]"
          style={{ width: `${p.pct}%` }}
        />
      </div>
      <div className="flex gap-4 text-xs text-text-2 pt-3 border-t border-border">
        {p.stats.map(([l, n], i) => (
          <span key={i}>
            {l} <b className="num text-text-1 font-semibold">{n}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
