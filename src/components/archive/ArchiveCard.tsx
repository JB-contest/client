"use client";

import { useRouter } from "next/navigation";
import { FileCheck2 } from "lucide-react";
import type { ArchiveItem } from "@/lib/data";

export default function ArchiveCard({ a }: { a: ArchiveItem }) {
  const router = useRouter();
  const goDetail = () => router.push(`/archive/${encodeURIComponent(a.no)}`);

  return (
    <div
      className="border border-border rounded-card bg-white p-[18px] flex flex-col gap-0 shadow-card hover:shadow-pop hover:border-border-strong transition-all cursor-pointer"
      onClick={goDetail}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-[0.04em] text-text-3 uppercase">
          심의필
        </span>
        <span className="pill pill-approved">
          <span className="dot" />
          유효
        </span>
      </div>
      <div className="num text-[22px] font-bold tracking-[0.01em] text-jb-navy mt-2.5 mb-3">
        {a.no}
      </div>
      <div className="text-sm font-semibold">{a.name}</div>
      <div className="text-xs text-text-2 mt-0.5">{a.camp}</div>
      <div className="flex gap-1.5 my-3 mb-3.5">
        <span className="fc-tag">{a.surface}</span>
        <span className="fc-tag">{a.type}</span>
      </div>
      <div className="flex gap-6 pt-[13px] border-t border-border">
        <div>
          <div className="text-[11px] text-text-3">발급</div>
          <div className="text-[12.5px] font-semibold num mt-0.5">
            {a.issued}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-text-3">유효기간</div>
          <div className="text-[12.5px] font-semibold num mt-0.5">
            {a.expires}
          </div>
        </div>
      </div>
      <button
        className="btn btn-secondary mt-3.5 w-full"
        onClick={(e) => {
          e.stopPropagation();
          goDetail();
        }}
      >
        <FileCheck2 size={16} />증명서 열기
      </button>
    </div>
  );
}
