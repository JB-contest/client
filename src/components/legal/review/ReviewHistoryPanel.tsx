import ReviewTimeline from "./ReviewTimeline";
import type { ReviewHistoryItem } from "@/lib/legalData";

export default function ReviewHistoryPanel({
  items,
}: {
  items: ReviewHistoryItem[];
}) {
  return (
    <div className="panel" style={{ padding: 18 }}>
      <div className="tl-head">
        <span className="t">심의 이력</span>
      </div>
      <ReviewTimeline items={items} />
    </div>
  );
}
