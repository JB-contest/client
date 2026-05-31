import ArchiveCard from "./ArchiveCard";
import type { ArchiveItem } from "@/lib/data";

export default function ArchiveGrid({ items }: { items: ArchiveItem[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((a) => (
        <ArchiveCard key={a.no} a={a} />
      ))}
    </div>
  );
}
