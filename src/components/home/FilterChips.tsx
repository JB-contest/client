"use client";

import clsx from "clsx";
import type { MaterialStatus } from "@/lib/data";

export const FILTERS = [
  "전체",
  "검토 대기",
  "AI 검증중",
  "수정 요청",
  "승인완료",
] as const;
export type FilterLabel = (typeof FILTERS)[number];

export const FILTER_MAP: Record<string, MaterialStatus> = {
  "검토 대기": "waiting",
  "AI 검증중": "ai",
  "수정 요청": "revise",
  "승인완료": "approved",
};

interface Props {
  value: FilterLabel;
  onChange: (v: FilterLabel) => void;
}

export default function FilterChips({ value, onChange }: Props) {
  return (
    <div className="flex gap-1.5">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={clsx("chip-f", value === f && "on")}
          onClick={() => onChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
