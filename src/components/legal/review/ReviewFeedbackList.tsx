"use client";

import { Info } from "lucide-react";
import ReviewFeedbackCard from "./ReviewFeedbackCard";
import type { ReviewFeedback } from "@/lib/legalData";

interface Props {
  feedback: ReviewFeedback[];
  active: number | null;
  judged: Set<number>;
  onSelect: (i: number) => void;
  onJudge: (i: number, comment: string) => void;
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
      <div className="flex items-center justify-between my-2 mb-2.5">
        <div className="text-sm font-semibold">
          피드백{" "}
          <span className="text-text-2 num font-normal ml-1.5">
            · {feedback.length}건
          </span>
        </div>
        <span className="fb-helper">
          <Info size={14} />
          카드 선택 시 화면 강조 · 코멘트 등록
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
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
