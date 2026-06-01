"use client";

import { Search } from "lucide-react";
import { COLOR } from "@/lib/colors";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function HistSearch({ value, onChange }: Props) {
  return (
    <div className="search-inp">
      <Search size={15} color={COLOR.text3} />
      <input
        placeholder="자료명 · ID 검색"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
