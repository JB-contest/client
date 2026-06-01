import { FolderSearch } from "lucide-react";
import { COLOR } from "@/lib/colors";

export default function EmptyState() {
  return (
    <div className="panel p-14 text-center text-text-3">
      <FolderSearch size={28} color={COLOR.text3} className="mx-auto" />
      <div className="text-[13.5px] mt-2.5">
        조건에 맞는 심의필이 없습니다.
      </div>
    </div>
  );
}
