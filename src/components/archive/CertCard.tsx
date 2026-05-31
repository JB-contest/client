import type { ArchiveItem } from "@/lib/data";

export default function CertCard({ a }: { a: ArchiveItem }) {
  return (
    <div
      className="rounded-card relative overflow-hidden"
      style={{
        border: "1px solid #E5E7EB",
        padding: "38px 44px",
        background: "linear-gradient(180deg,#fff,#FBFCFE)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="absolute pointer-events-none"
        src="/assets/jb-symbol.png"
        alt=""
        style={{ right: -40, bottom: -40, width: 220, opacity: 0.04 }}
      />
      <div className="flex items-center justify-between mb-[22px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/jb-signature-ko-horizontal.png"
          alt="JB금융그룹"
          style={{ height: 22 }}
        />
        <span className="pill pill-approved">
          <span className="dot" />
          승인 완료
        </span>
      </div>
      <div className="text-[13px] text-text-2 text-center">
        광고 심의필 증명 · 심의필 번호
      </div>
      <div className="num text-[44px] font-bold tracking-[0.02em] text-jb-navy text-center mt-2 mb-1">
        {a.no}
      </div>
      <div className="text-[13px] text-text-3 text-center">{a.by} 승인</div>

      <div
        className="grid gap-x-8 gap-y-[18px] my-[30px] py-6"
        style={{
          gridTemplateColumns: "1fr 1fr",
          borderTop: "1px solid #E5E7EB",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div>
          <div className="text-xs text-text-2">자료명</div>
          <div className="text-sm font-semibold mt-1">{a.name}</div>
        </div>
        <div>
          <div className="text-xs text-text-2">대출 유형</div>
          <div className="text-sm font-semibold mt-1">{a.type}</div>
        </div>
        <div>
          <div className="text-xs text-text-2">최종 오류율</div>
          <div className="text-sm font-semibold mt-1">
            <span className="num">{a.err}</span> · 위험도 {a.risk}
          </div>
        </div>
        <div>
          <div className="text-xs text-text-2">필수 고지</div>
          <div className="text-sm font-semibold mt-1">{a.req} 충족</div>
        </div>
        <div>
          <div className="text-xs text-text-2">승인 일시</div>
          <div className="text-sm font-semibold num mt-1">
            {a.issued} 09:30
          </div>
        </div>
        <div>
          <div className="text-xs text-text-2">유효기간</div>
          <div className="text-sm font-semibold num mt-1">
            {a.expires}까지{" "}
            <span className="text-text-3 font-medium">(6개월)</span>
          </div>
        </div>
      </div>

      <div className="text-[11.5px] text-text-3 leading-[1.6] text-center">
        본 증명은 JB금융그룹 준법감시부서의 광고 심의를 통과하였음을
        증명합니다.
        <br />
        검증 엔진 JB FinCompliance AI · 표시광고법 외 14개 규정 검토 완료
      </div>
    </div>
  );
}
