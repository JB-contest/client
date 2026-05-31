import { FolderSearch } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="panel p-14 text-center text-text-3">
      <FolderSearch size={28} color="#9CA3AF" className="mx-auto" />
      <div className="text-[13.5px] mt-2.5">
        조건에 맞는 심의필이 없습니다.
      </div>
    </div>
  );
}
