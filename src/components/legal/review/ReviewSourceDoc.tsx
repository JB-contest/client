"use client";

import { Fragment } from "react";
import clsx from "clsx";
import { MousePointerClick } from "lucide-react";
import { REVIEW_DATA, type ReviewSourceSeg } from "@/lib/legalData";

interface Props {
  active: number | null;
  setActive: (v: number | null) => void;
  source?: ReviewSourceSeg[];
  total?: number;
}

export default function ReviewSourceDoc({
  active,
  setActive,
  source = REVIEW_DATA.source,
  total = REVIEW_DATA.feedback.length,
}: Props) {
  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">원문</div>
        <span className="risk risk-high">
          <span className="dot" />
          위반 의심 {total}건
        </span>
      </div>
      <div style={{ padding: "18px 22px 16px" }}>
        <p className="rev-doc">
          {source.map((seg, i) => {
            if (!seg.hl) return <Fragment key={i}>{seg.t}</Fragment>;
            const cls = clsx("hl", `hl-${seg.hl}`, active === seg.fb && "active");
            return (
              <span
                key={i}
                className={cls}
                onClick={() =>
                  setActive(active === seg.fb ? null : (seg.fb as number))
                }
              >
                {seg.t}
              </span>
            );
          })}
        </p>
        <div className="mt-4 text-xs text-text-3 flex items-center gap-1.5">
          <MousePointerClick size={14} />
          하이라이트를 클릭하면 해당 피드백 카드로 연결됩니다
        </div>
      </div>
    </div>
  );
}
