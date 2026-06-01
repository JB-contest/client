import StatusPill from "@/components/ui/StatusPill";
import { RESULT_MAP, type ReviewResult } from "@/lib/legalData";

export default function ResultPill({ result }: { result: ReviewResult }) {
  return <StatusPill map={RESULT_MAP} value={result} />;
}
