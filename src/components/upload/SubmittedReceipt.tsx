import { Check } from "lucide-react";

export default function SubmittedReceipt() {
  return (
    <div
      className="rounded-card p-4"
      style={{ border: "1px solid #16A34A", background: "#E7F6EC" }}
    >
      <div
        className="w-[46px] h-[46px] rounded-full bg-white grid place-content-center mb-3"
        style={{ border: "1px solid #16A34A" }}
      >
        <Check size={26} color="#16A34A" />
      </div>
      <div className="text-[15px] font-bold">준법 검토가 접수되었습니다</div>
      <div className="text-[12.5px] text-text-2 mt-1.5 leading-[1.55]">
        검토 진행 상황은 홈 화면을 통해 확인하실 수 있습니다.
      </div>
      <div
        className="flex flex-col gap-2 mt-3 pt-3"
        style={{ borderTop: "1px solid rgba(22,163,74,.25)" }}
      >
        <div className="flex justify-between text-xs">
          <span className="text-text-2">심의 ID</span>
          <span className="font-semibold text-text-1 mono">SM-2026-0433</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-text-2">접수 시각</span>
          <span className="font-semibold text-text-1 num">04.26 10:12</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-text-2">자료명</span>
          <span className="font-semibold text-text-1">
            봄맞이 신용대출 상세페이지
          </span>
        </div>
      </div>
    </div>
  );
}
