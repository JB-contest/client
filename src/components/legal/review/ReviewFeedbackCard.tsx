"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CheckCircle2 } from "lucide-react";
import Clause from "@/components/ui/Clause";
import RiskBadge from "@/components/ui/RiskBadge";
import type { ReviewFeedback } from "@/lib/legalData";

const RISK_COLOR: Record<string, string> = {
  high: "#DC2626",
  medium: "#F59E0B",
  low: "#16A34A",
};

interface Props {
  fb: ReviewFeedback;
  idx: number;
  selected: boolean;
  judged: boolean;
  onSelect: () => void;
  onJudge: (i: number) => void;
}

export default function ReviewFeedbackCard({
  fb,
  idx,
  selected,
  judged,
  onSelect,
  onJudge,
}: Props) {
  const [val, setVal] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selected]);

  const register = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (!val.trim()) return;
    onJudge(idx);
    setVal("");
  };

  return (
    <div
      ref={ref}
      className={clsx("lg-fc", selected && "sel")}
      onClick={onSelect}
      style={{ borderLeft: `3px solid ${RISK_COLOR[fb.risk]}` }}
    >
      <div className="lg-fc-top">
        <span className="lg-fc-idx" style={{ background: RISK_COLOR[fb.risk] }}>
          {idx + 1}
        </span>
        <span className="lg-fc-ttl">{fb.title}</span>
        {judged && <CheckCircle2 size={17} color="#16A34A" />}
        <RiskBadge level={fb.risk} />
      </div>
      <div className="lg-fc-body">
        <div className="lg-fc-tags">
          {fb.tags.map((t) => (
            <span key={t} className="tag-chip">
              {t}
            </span>
          ))}
          <Clause text={fb.clause} />
        </div>
        <div className="lg-fc-reason">
          <span className="lbl">위반 사유</span>
          {fb.reason}
        </div>
        <div className="lg-fc-input">
          <input
            className="input"
            placeholder="수정 지시 / 코멘트 입력 …"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter") register(e);
            }}
          />
          <button className="btn btn-primary btn-sm" onClick={register}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
