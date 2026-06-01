import clsx from "clsx";
import {
  AlertTriangle,
  Clock,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { LegalKpi as KpiT } from "@/lib/legalData";

const ICON_MAP = {
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  clock: Clock,
  "alert-triangle": AlertTriangle,
  minus: Minus,
};

export default function LegalKpi({ k }: { k: KpiT }) {
  const Foot = k.foot ? ICON_MAP[k.foot.icon] : null;
  return (
    <div className="kpi">
      <div className="kpi-label">{k.label}</div>
      <div>
        <span className="kpi-value">{k.value}</span>
        <span className="kpi-unit">{k.unit}</span>
      </div>
      {k.foot && Foot && (
        <div className={clsx("kpi-foot", k.foot.kind)}>
          <Foot size={13} />
          {k.foot.text}
        </div>
      )}
    </div>
  );
}
