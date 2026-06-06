"use client";

import clsx from "clsx";
import { Check, CheckCircle2 } from "lucide-react";
import Clause from "@/components/ui/Clause";
import RiskBadge from "@/components/ui/RiskBadge";
import { COLOR, RISK_COLOR, RISK_RING } from "@/lib/colors";
import type { Feedback } from "@/lib/data";

interface Props {
  fb: Feedback;
  idx: number;
  selected: boolean;
  saved: boolean;
  onSelect: () => void;
}

export default function FeedbackCard({
  fb,
  idx,
  selected,
  saved,
  onSelect,
}: Props) {
  // 좌측 보더 색은 항상 유지(토글 해제·hover 와 무관). 선택 시 나머지 변만 위험도 색으로.
  // border-left 단축과 border-color 를 섞으면 React 가 해제 시 left 색까지 지우므로 longhand 사용.
  const accent = saved ? COLOR.riskLow : RISK_COLOR[fb.risk];
  return (
    <div
      className={clsx("fc", selected && "sel", saved && "saved")}
      onClick={onSelect}
      style={{
        borderLeftWidth: 3,
        borderLeftStyle: "solid",
        borderLeftColor: accent,
        ...(selected && !saved
          ? {
              borderTopColor: accent,
              borderRightColor: accent,
              borderBottomColor: accent,
              boxShadow: `0 0 0 3px ${RISK_RING[fb.risk]}`,
            }
          : {}),
      }}
    >
      <div className="fc-top">
        <span
          className="fc-idx"
          style={saved ? undefined : { background: accent }}
        >
          {saved ? <Check size={12} color="#fff" /> : idx + 1}
        </span>
        <span className="fc-ttl">{fb.title}</span>
        {saved ? (
          <span className="fc-savedtag">
            <CheckCircle2 size={14} />
            저장됨
          </span>
        ) : (
          <RiskBadge level={fb.risk} />
        )}
      </div>
      <div className="fc-body">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="fc-tag">{fb.tag}</span>
          <Clause text={fb.clause} />
        </div>
        <div className="fc-reason">
          <span className="lbl">위반 사유</span>
          {fb.reason}
        </div>
      </div>
    </div>
  );
}
