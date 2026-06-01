"use client";

import { Info } from "lucide-react";
import ReviewFeedbackCard from "./ReviewFeedbackCard";
import type { ReviewFeedback } from "@/lib/legalData";

interface Props {
  feedback: ReviewFeedback[];
  active: number | null;
  judged: Set<number>;
  onSelect: (i: number) => void;
  onJudge: (i: number) => void;
}

export default function ReviewFeedbackList({
  feedback,
  active,
  judged,
  onSelect,
  onJudge,
}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          피드백{" "}
          <span className="muted num text-sm font-medium ml-1.5">
            · {feedback.length}건
          </span>
        </div>
        <span className="fb-helper">
          <Info size={14} />
          해당 카드 선택하면 화면 강조, 자료 수정 가능
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {feedback.map((fb, i) => (
          <ReviewFeedbackCard
            key={i}
            fb={fb}
            idx={i}
            selected={active === i}
            judged={judged.has(i)}
            onSelect={() => onSelect(i)}
            onJudge={onJudge}
          />
        ))}
      </div>
    </div>
  );
}
