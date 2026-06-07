"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CheckCircle2 } from "lucide-react";
import Clause from "@/components/ui/Clause";
import RiskBadge from "@/components/ui/RiskBadge";
import { COLOR, RISK_COLOR, RISK_RING } from "@/lib/colors";
import type { ReviewFeedback } from "@/lib/legalData";

interface Props {
  fb: ReviewFeedback;
  idx: number;
  selected: boolean;
  judged: boolean;
  onSelect: () => void;
  onJudge: (i: number, comment: string) => void;
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
    onJudge(idx, val.trim());
  };

  return (
    <div
      ref={ref}
      className={clsx("lg-fc", selected && "sel")}
      onClick={onSelect}
      style={{
        // 좌측 보더 색은 항상 유지. border-left 단축 + border-color 혼용 시
        // React 가 선택 해제할 때 left 색까지 지우므로 longhand 로 분리한다.
        borderLeftWidth: 3,
        borderLeftStyle: "solid",
        borderLeftColor: RISK_COLOR[fb.risk],
        ...(selected
          ? {
              borderTopColor: RISK_COLOR[fb.risk],
              borderRightColor: RISK_COLOR[fb.risk],
              borderBottomColor: RISK_COLOR[fb.risk],
              boxShadow: `0 0 0 3px ${RISK_RING[fb.risk]}`,
            }
          : {}),
      }}
    >
      <div className="lg-fc-top">
        <span className="lg-fc-idx" style={{ background: RISK_COLOR[fb.risk] }}>
          {idx + 1}
        </span>
        <span className="lg-fc-ttl">{fb.title}</span>
        {judged && <CheckCircle2 size={17} color={COLOR.riskLow} />}
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
