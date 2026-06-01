import clsx from "clsx";

export interface StatusEntry {
  cls: string;
  label: string;
}

interface Props<K extends string> {
  map: Record<K, StatusEntry>;
  value: K;
}

export default function StatusPill<K extends string>({ map, value }: Props<K>) {
  const s = map[value];
  if (!s) return null;
  return (
    <span className={clsx("pill", s.cls)}>
      <span className="dot" />
      {s.label}
    </span>
  );
}
