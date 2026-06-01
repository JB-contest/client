import { ArrowRight } from "lucide-react";
import type { ReviewResult } from "@/lib/legalData";

interface Props {
  before: string;
  after: string | null;
  result: ReviewResult;
}

export default function ErrXform({ before, after, result }: Props) {
  if (after) {
    return (
      <span className="err-xform">
        <span className="before">{before}</span>
        <span className="arrow">
          <ArrowRight size={13} />
        </span>
        <span className="after">{after}</span>
      </span>
    );
  }
  const color = result === "rejected" ? "#DC2626" : "#F59E0B";
  return (
    <span className="num" style={{ fontWeight: 600, color }}>
      {before}
    </span>
  );
}
