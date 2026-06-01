"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronDown, History } from "lucide-react";
import Timeline from "@/components/ui/Timeline";
import { COLOR } from "@/lib/colors";
import { HISTORY } from "@/lib/data";

export default function HistoryAccordion() {
  const [open, setOpen] = useState(false);
  return (
    <div className={clsx("acc", open && "open")}>
      <div className="acc-head" onClick={() => setOpen((o) => !o)}>
        <div className="acc-title">
          <History size={16} color={COLOR.text2} />
          심의 이력
          <span className="acc-chip">재학습 적재</span>
        </div>
        <ChevronDown
          size={18}
          className={clsx(
            "text-text-3 transition-transform duration-[180ms]",
            open && "rotate-180",
          )}
        />
      </div>
      {open && (
        <div className="acc-body">
          <Timeline items={HISTORY} />
        </div>
      )}
    </div>
  );
}
