interface ErrCellProps {
  v: string;
  c: "high" | "medium" | "low" | "muted";
}

const COLOR: Record<ErrCellProps["c"], string> = {
  high: "#DC2626",
  medium: "#F59E0B",
  low: "#16A34A",
  muted: "#9CA3AF",
};

export default function ErrCell({ v, c }: ErrCellProps) {
  return (
    <span className="num" style={{ fontWeight: 600, color: COLOR[c] }}>
      {v}
    </span>
  );
}
