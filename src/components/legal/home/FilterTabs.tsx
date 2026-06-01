"use client";

import clsx from "clsx";

export const FILTERS = [
  "전체",
  "검토 필요",
  "검토 대기",
  "수정 요청",
  "승인 완료",
] as const;
export type FilterLabel = (typeof FILTERS)[number];

interface Props {
  value: FilterLabel;
  onChange: (v: FilterLabel) => void;
}

export default function FilterTabs({ value, onChange }: Props) {
  return (
    <div className="ftabs">
      {FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          className={clsx("ftab", value === f && "on")}
          onClick={() => onChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
