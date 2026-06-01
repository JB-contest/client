import clsx from "clsx";
import type { ReviewHistoryItem } from "@/lib/legalData";

export default function ReviewTimeline({ items }: { items: ReviewHistoryItem[] }) {
  return (
    <div className="timeline">
      {items.map((h, i) => (
        <div className="tl-item" key={i}>
          <div className={clsx("tl-dot", h.dot)} />
          <div
            className="flex items-start justify-between"
            style={{ gap: 10 }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: h.dot === "pending" ? "#9CA3AF" : "#111827",
                }}
              >
                {h.ev}
              </div>
              <span className={clsx("actor-pill", h.actorCls)}>
                <span className="d" />
                {h.actor}
              </span>
            </div>
            <div
              className="num"
              style={{
                fontSize: 11,
                color: "#9CA3AF",
                whiteSpace: "nowrap",
                marginTop: 1,
              }}
            >
              {h.ts}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
