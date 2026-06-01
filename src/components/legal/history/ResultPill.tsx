import clsx from "clsx";
import { RESULT_MAP, type ReviewResult } from "@/lib/legalData";

export default function ResultPill({ result }: { result: ReviewResult }) {
  const r = RESULT_MAP[result];
  if (!r) return null;
  return (
    <span className={clsx("pill", r.cls)}>
      <span className="dot" />
      {r.label}
    </span>
  );
}
