"use client";

import clsx from "clsx";
import { Check, CheckCircle2 } from "lucide-react";
import Clause from "@/components/ui/Clause";
import RiskBadge from "@/components/ui/RiskBadge";
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
  return (
    <div
      className={clsx("fc", selected && "sel", saved && "saved")}
      onClick={onSelect}
    >
      <div className="fc-top">
        <span className="fc-idx">
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
