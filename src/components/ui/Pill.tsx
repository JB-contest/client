import clsx from "clsx";
import { STATUS_MAP, type MaterialStatus } from "@/lib/data";

export default function Pill({ status }: { status: MaterialStatus }) {
  const s = STATUS_MAP[status];
  if (!s) return null;
  return (
    <span className={clsx("pill", s.cls)}>
      <span className="dot" />
      {s.label}
    </span>
  );
}
