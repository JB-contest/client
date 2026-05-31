import { CheckCircle2 } from "lucide-react";

export default function CertStatusNote() {
  return (
    <div
      className="rounded-card p-3.5"
      style={{ border: "1px solid #16A34A", background: "#E7F6EC" }}
    >
      <div
        className="text-[13.5px] font-bold flex items-center gap-1.5"
        style={{ color: "#16A34A" }}
      >
        <CheckCircle2 size={16} />
        승인되었습니다
      </div>
      <div className="text-[12.5px] text-text-2 mt-1.5 leading-[1.55]">
        이 자료는 게시 가능한 상태입니다. 유효기간 내 심의필 번호와 함께
        게재하세요.
      </div>
    </div>
  );
}
