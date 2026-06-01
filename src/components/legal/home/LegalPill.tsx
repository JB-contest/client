import StatusPill from "@/components/ui/StatusPill";
import { LEGAL_STATUS_MAP, type LegalStatus } from "@/lib/legalData";

export default function LegalPill({ status }: { status: LegalStatus }) {
  return <StatusPill map={LEGAL_STATUS_MAP} value={status} />;
}
