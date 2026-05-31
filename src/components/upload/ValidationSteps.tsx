const STEPS = [
  "원문 추출 · 정제",
  "위험 표현 탐지",
  "근거 법령 매칭",
  "오류율 산정",
  "피드백 생성",
  "심의 라우팅",
];

export default function ValidationSteps() {
  return (
    <div className="border border-border rounded-card bg-white p-3.5">
      <div className="text-[13px] font-semibold">AI 6단계 검증</div>
      <div className="flex flex-col gap-[9px] mt-2.5">
        {STEPS.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-[9px] text-[12.5px] text-text-2"
          >
            <span className="w-[18px] h-[18px] rounded-full border border-border-strong grid place-content-center text-[11px] font-semibold text-text-3 flex-none">
              {i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
