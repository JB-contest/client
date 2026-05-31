"use client";

import { Fragment } from "react";
import clsx from "clsx";
import { MousePointerClick } from "lucide-react";
import { SOURCE } from "@/lib/data";

interface Props {
  active: number | null;
  setActive: (v: number | null) => void;
}

export default function SourceDoc({ active, setActive }: Props) {
  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title">원문 · 하이라이팅</div>
        <span className="risk risk-high">
          <span className="dot" />
          오류율 14%
        </span>
      </div>
      <div className="px-[18px] py-4">
        <p className="src-doc">
          {SOURCE.map((seg, i) => {
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
        <div className="mt-3.5 text-[11.5px] text-text-3 flex items-center gap-1.5">
          <MousePointerClick size={14} />
          하이라이트를 선택하면 해당 피드백 카드가 강조됩니다
        </div>
      </div>
    </div>
  );
}
