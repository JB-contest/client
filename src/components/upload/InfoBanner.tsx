import { Info } from "lucide-react";
import { COLOR } from "@/lib/colors";

export default function InfoBanner() {
  return (
    <div
      className="flex items-start gap-[7px] text-xs text-text-2 leading-[1.5] rounded-card p-[11px_13px]"
      style={{ background: "#E4F5FD", border: "1px solid #0EA5E9" }}
    >
      <Info size={15} color={COLOR.info} className="flex-none mt-0.5" />
      <span>
        검증 요청 시 AI 6단계 검증이 시작되며, 결과는 홈 화면과 피드백 수정에서
        확인할 수 있습니다.
      </span>
    </div>
  );
}
