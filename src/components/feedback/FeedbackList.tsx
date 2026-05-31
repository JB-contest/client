"use client";

import FeedbackCard from "./FeedbackCard";
import { FEEDBACK } from "@/lib/data";

interface Props {
  active: number | null;
  saved: Record<number, boolean>;
  onSelect: (i: number) => void;
  savedCount: number;
}

export default function FeedbackList({
  active,
  saved,
  onSelect,
  savedCount,
}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between my-2 mb-2.5">
        <div className="text-sm font-semibold">
          피드백{" "}
          <span className="text-text-2 num font-normal">
            · {FEEDBACK.length}건
          </span>
        </div>
        <div className="text-xs text-text-2 whitespace-nowrap">
          저장{" "}
          <b className="num" style={{ color: "#16A34A" }}>
            {savedCount}
          </b>{" "}
          / {FEEDBACK.length}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {FEEDBACK.map((fb, i) => (
          <FeedbackCard
            key={i}
            fb={fb}
            idx={i}
            selected={active === i}
            saved={!!saved[i]}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}
