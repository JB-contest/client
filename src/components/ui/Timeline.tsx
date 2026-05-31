import clsx from "clsx";
import type { HistoryItem } from "@/lib/data";

export default function Timeline({ items }: { items: HistoryItem[] }) {
  return (
    <div className="timeline">
      {items.map((h, i) => (
        <div className="tl-item" key={i}>
          <div className={clsx("tl-dot", h.dot)} />
          <div className="flex items-start justify-between">
            <div>
              <div
                className="text-[12.5px] font-semibold"
                style={{
                  color: h.dot === "pending" ? "#9CA3AF" : "#111827",
                }}
              >
                {h.ev}
              </div>
              <div className="mt-1">
                <span className={clsx("tl-actor", h.role)}>
                  <span className="d" />
                  {h.actor}
                </span>
              </div>
            </div>
            {h.ts && (
              <div className="num text-[11px] text-text-3 whitespace-nowrap ml-2">
                {h.ts}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
