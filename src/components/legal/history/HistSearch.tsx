"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function HistSearch({ value, onChange }: Props) {
  return (
    <div className="search-inp">
      <Search size={15} color="#9CA3AF" />
      <input
        placeholder="자료명 · ID 검색"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
