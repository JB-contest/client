"use client";

import { ShieldCheck } from "lucide-react";

interface Props {
  onSubmit: () => void;
}

export default function ProgressPanel({ onSubmit }: Props) {
  return (
    <div className="panel">
      <button className="btn btn-primary w-full" onClick={onSubmit}>
        <ShieldCheck size={16} />수정본 재검증 요청
      </button>
    </div>
  );
}
