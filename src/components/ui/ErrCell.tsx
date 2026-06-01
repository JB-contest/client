import { ERR_COLOR } from "@/lib/colors";

interface ErrCellProps {
  v: string;
  c: "high" | "medium" | "low" | "muted";
}

export default function ErrCell({ v, c }: ErrCellProps) {
  return (
    <span className="num" style={{ fontWeight: 600, color: ERR_COLOR[c] }}>
      {v}
    </span>
  );
}
