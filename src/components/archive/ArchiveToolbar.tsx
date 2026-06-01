"use client";

import { Search } from "lucide-react";
import { COLOR } from "@/lib/colors";

interface Props {
  q: string;
  setQ: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  surface: string;
  setSurface: (v: string) => void;
  total: number;
}

export default function ArchiveToolbar({
  q,
  setQ,
  type,
  setType,
  surface,
  setSurface,
  total,
}: Props) {
  return (
    <div className="flex items-center gap-2.5 mb-5 flex-wrap">
      <div className="flex items-center gap-2 h-[38px] flex-1 min-w-[240px] max-w-[380px] px-3 border border-border-strong rounded-button bg-white">
        <Search size={16} color={COLOR.text3} />
        <input
          className="border-none outline-none bg-transparent text-[13.5px] w-full text-text-1"
          placeholder="심의필 번호 · 자료명 · 캠페인 검색"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <select
        className="select"
        style={{ width: 150, height: 38 }}
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">대출 유형 전체</option>
        <option>신용대출</option>
        <option>담보대출</option>
        <option>전세자금대출</option>
      </select>
      <select
        className="select"
        style={{ width: 150, height: 38 }}
        value={surface}
        onChange={(e) => setSurface(e.target.value)}
      >
        <option value="">게재 위치 전체</option>
        <option>상세페이지</option>
        <option>홈페이지</option>
        <option>카드뉴스</option>
        <option>FAQ</option>
      </select>
      <div className="flex-1" />
      <div className="text-[12.5px] text-text-2 whitespace-nowrap">
        총 <b className="num text-text-1">{total}</b>건
      </div>
    </div>
  );
}
