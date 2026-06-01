import clsx from "clsx";
import { LEGAL_STATUS_MAP, type LegalStatus } from "@/lib/legalData";

export default function LegalPill({ status }: { status: LegalStatus }) {
  const s = LEGAL_STATUS_MAP[status];
  if (!s) return null;
  return (
    <span className={clsx("pill", s.cls)}>
      <span className="dot" />
      {s.label}
    </span>
  );
}
