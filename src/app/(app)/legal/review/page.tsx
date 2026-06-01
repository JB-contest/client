"use client";

import { useState } from "react";
import PageHead from "@/components/PageHead";
import ReviewActionPanel from "@/components/legal/review/ReviewActionPanel";
import ReviewFeedbackList from "@/components/legal/review/ReviewFeedbackList";
import ReviewHistoryPanel from "@/components/legal/review/ReviewHistoryPanel";
import ReviewMetaBar from "@/components/legal/review/ReviewMetaBar";
import ReviewSourceDoc from "@/components/legal/review/ReviewSourceDoc";
import { REVIEW_DATA } from "@/lib/legalData";

export default function LegalReviewPage() {
  const d = REVIEW_DATA;
  const [active, setActive] = useState<number | null>(null);
  const [judged, setJudged] = useState<Set<number>>(new Set());

  const judge = (i: number) =>
    setJudged((prev) => {
      const n = new Set(prev);
      n.add(i);
      return n;
    });
  const done = judged.size;
  const total = d.feedback.length;

  return (
    <div className="fade-in">
      <PageHead crumb={["Home", "검토"]} title="검토" />
      <ReviewMetaBar data={d} />

      <div className="rev-grid">
        <div className="flex flex-col gap-[18px]">
          <ReviewSourceDoc active={active} setActive={setActive} />
          <ReviewFeedbackList
            feedback={d.feedback}
            active={active}
            judged={judged}
            onSelect={(i) => setActive(active === i ? null : i)}
            onJudge={judge}
          />
        </div>

        <div
          className="flex flex-col gap-[18px] sticky"
          style={{ top: 0 }}
        >
          <ReviewActionPanel done={done} total={total} />
          <ReviewHistoryPanel items={d.history} />
        </div>
      </div>
    </div>
  );
}
