"use client";

import { ShieldCheck } from "lucide-react";

interface Props {
  savedCount: number;
  total: number;
  onSubmit: () => void;
}

export default function ProgressPanel({ savedCount, total, onSubmit }: Props) {
  const allDone = savedCount === total;
  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between">
        <div className="text-[13.5px] font-semibold">수정 진행</div>
        <div
          className="num text-[12.5px] font-semibold"
          style={{ color: allDone ? "#16A34A" : "#6B7280" }}
        >
          {savedCount} / {total}
        </div>
      </div>
      <div className="progress-bar">
        <i style={{ width: `${(savedCount / total) * 100}%` }} />
      </div>
      <div className="text-xs text-text-2 leading-[1.55] mt-2">
        {allDone
          ? "모든 피드백을 반영했습니다. 수정본 재검증을 요청하세요."
          : "모든 피드백을 반영하면 재검증 요청이 활성화됩니다."}
      </div>
      <button
        className="btn btn-primary w-full mt-3"
        disabled={!allDone}
        onClick={onSubmit}
      >
        <ShieldCheck size={16} />수정본 재검증 요청
      </button>
    </div>
  );
}
