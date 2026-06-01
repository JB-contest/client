import StatusPill from "./StatusPill";
import { STATUS_MAP, type MaterialStatus } from "@/lib/data";

export default function Pill({ status }: { status: MaterialStatus }) {
  return <StatusPill map={STATUS_MAP} value={status} />;
}
