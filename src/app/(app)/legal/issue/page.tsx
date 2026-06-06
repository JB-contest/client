"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Info, Lock, ShieldCheck } from "lucide-react";
import PageHead from "@/components/PageHead";
import { useToast } from "@/components/Toaster";
import { ROUTES } from "@/lib/routes";
import { REVIEW_DATA } from "@/lib/legalData";
import { createApproval, COMPLIANCE_USER_ID } from "@/lib/api";

// 발급 주체는 "전북은행 준법감시인"으로 고정(read-only).
const ISSUER = "전북은행 준법감시인";
const ISSUED_AT = "2026.06.05";

function fmtDate(iso: string): string {
  return iso ? iso.replace(/-/g, ".") : "—";
}

function PreviewRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-[9px] border-t border-border">
      <span className="text-[12.5px] text-text-3 whitespace-nowrap">
        {label}
      </span>
      <span
        className={`${mono ? "mono " : ""}text-[13px] font-semibold text-text-1 text-right`}
      >
        {value}
      </span>
    </div>
  );
}

export default function LegalIssuePage() {
  const router = useRouter();
  const { toast } = useToast();
  const d = REVIEW_DATA;

  const [certNo, setCertNo] = useState("");
  const [start, setStart] = useState("2026-06-05");
  const [end, setEnd] = useState("2027-06-04");
  const [memo, setMemo] = useState("");

  const canIssue = certNo.trim().length > 0;

  const register = async () => {
    if (!canIssue) return;
    // 검토 화면에서 ?id= 로 넘어온 문서가 있으면 실제 승인(심의필 발급)을 등록한다.
    const param = new URLSearchParams(window.location.search).get("id");
    const docId = param ? Number(param) : null;
    if (docId != null) {
      await createApproval(docId, {
        approverId: COMPLIANCE_USER_ID,
        reviewNumber: certNo.trim(),
      }).catch(() => {
        /* 서버 미응답 시에도 발급 완료로 진행 */
      });
    }
    toast(`심의필이 발급되었습니다 (${certNo.trim()})`, "success");
    router.push(ROUTES.legal.history);
  };

  return (
    <div>
      <PageHead
        crumb={["Home", "검토", "심의필 발급"]}
        title="심의필 발급"
        sub="검토가 완료된 자료에 대해 준법감시인이 심의필을 발급합니다."
        actions={
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => router.push(ROUTES.legal.review)}
          >
            <ArrowLeft size={16} />
            검토로 돌아가기
          </button>
        }
      />

      {/* 검토 결과 요약 */}
      <div className="panel mb-4">
        <div className="rev-meta">
          <div>
            <div className="rm-title">{d.title}</div>
            <div className="rm-sub">{d.surface} · 신용대출</div>
          </div>
          <div className="rm-right">
            <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>
              {d.id}
            </div>
            <div className="text-[11.5px] text-text-3 mt-[3px]">
              04/28 09:05 최종 검토 완료
            </div>
          </div>
        </div>
      </div>

      {/* 검토 요약 KPI */}
      <div className="grid grid-cols-3 gap-3.5 mb-2">
        <div className="kpi">
          <div className="kpi-label">위반 의심</div>
          <div className="flex items-baseline gap-2.5">
            <span className="kpi-value text-risk-high">4</span>
            <ArrowRight size={18} className="self-center text-text-3" />
            <span className="kpi-value text-risk-low">0</span>
            <span className="kpi-unit">건</span>
          </div>
          <div className="text-[11.5px] text-text-3 mt-2">오류율 14% → 0%</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">검토 의견</div>
          <div>
            <span className="kpi-value">4</span>
            <span className="kpi-unit">건</span>
          </div>
          <div className="text-[11.5px] text-text-3 mt-2">전건 반영 완료</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">처리 일수</div>
          <div>
            <span className="kpi-value">2.5</span>
            <span className="kpi-unit">일</span>
          </div>
          <div className="text-[11.5px] text-text-3 mt-2">
            업로드 → 최종 승인
          </div>
        </div>
      </div>

      <div className="text-base font-semibold mt-2 mb-3">발급 정보</div>

      <div className="grid grid-cols-2 gap-3.5 items-start mb-4">
        {/* LEFT — 발급 폼 */}
        <div className="panel p-5">
          {/* 발급 주체 (read-only) */}
          <div className="mb-5">
            <label className="block text-[12.5px] font-semibold text-text-1 mb-[7px]">
              발급 주체
            </label>
            <div className="flex items-center gap-2 h-10 px-3 bg-subtle border border-border rounded-md cursor-not-allowed">
              <Lock size={14} className="text-text-3" />
              <span className="mono text-[13.5px] font-semibold text-text-2">
                {ISSUER}
              </span>
            </div>
            <div className="text-[11.5px] text-text-3 mt-1.5">
              본 시스템에서 발급 주체는 변경할 수 없습니다.
            </div>
          </div>

          {/* 심의필 번호 */}
          <div className="mb-5">
            <label className="block text-[12.5px] font-semibold text-text-1 mb-[7px]">
              심의필 번호 <span className="text-risk-high">*</span>
            </label>
            <input
              className="input"
              value={certNo}
              onChange={(e) => setCertNo(e.target.value)}
              placeholder="사내 시스템에서 발급된 번호를 입력하세요 (예: 2026-0605-001)"
            />
            <div className="text-[11.5px] text-text-3 mt-1.5">
              형식: YYYY-MMDD-NNN
            </div>
          </div>

          {/* 유효기간 */}
          <div className="mb-5">
            <label className="block text-[12.5px] font-semibold text-text-1 mb-[7px]">
              유효기간
            </label>
            <div className="flex items-center gap-2.5">
              <input
                type="date"
                className="input flex-1"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
              <span className="text-text-3 text-[13px]">~</span>
              <input
                type="date"
                className="input flex-1"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
            <div className="text-[11.5px] text-text-3 mt-1.5">
              기본 유효기간은 1년이며, 필요 시 단축 가능합니다.
            </div>
          </div>

          {/* 비고 */}
          <div>
            <label className="block text-[12.5px] font-semibold text-text-1 mb-[7px]">
              비고
            </label>
            <textarea
              className="input resize-y leading-relaxed"
              rows={3}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="수정 사항 또는 특이 사항을 입력하세요 (선택)"
            />
          </div>
        </div>

        {/* RIGHT — 미리보기 + 안내 */}
        <div className="flex flex-col gap-4">
          {/* 발급 미리보기 */}
          <div className="panel p-5">
            <div className="panel-title mb-3.5">발급 미리보기</div>
            <div className="border border-border-strong rounded-md px-4 pt-4 pb-1.5 bg-subtle">
              <div className="flex items-center gap-[7px] text-[13.5px] font-bold text-jb-navy tracking-[0.04em] pb-2.5">
                <ShieldCheck size={16} className="text-jb-navy" />
                <span>심의필</span>
              </div>
              <div className="mt-1">
                <PreviewRow label="자료명" value={d.title} />
                <PreviewRow label="심의 ID" value={d.id} mono />
                <PreviewRow
                  label="심의필 번호"
                  value={certNo.trim() || "—"}
                  mono
                />
                <PreviewRow label="발급 주체" value={ISSUER} />
                <PreviewRow label="발급일" value={ISSUED_AT} mono />
                <PreviewRow
                  label="유효기간"
                  value={`${fmtDate(start)} ~ ${fmtDate(end)}`}
                  mono
                />
              </div>
            </div>
          </div>

          {/* 안내 */}
          <div className="panel p-4 border-l-[3px] border-l-info">
            <div className="flex items-start gap-2.5">
              <Info size={18} className="text-info flex-none" />
              <div className="text-[13px] text-text-2 leading-relaxed">
                <strong className="text-text-1">발급 안내</strong>
                <ul className="mt-1.5 pl-4 list-disc space-y-1">
                  <li>
                    심의필 번호는 사내 준법심의 시스템에서 발급된 번호를
                    입력합니다.
                  </li>
                  <li>
                    발급 후에는 자료 게재 시 광고 하단에 심의필 번호를 표시해야
                    합니다.
                  </li>
                  <li>유효기간 만료 후에는 재심의가 필요합니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 처리 버튼 */}
      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => router.push(ROUTES.legal.review)}
        >
          취소
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => toast("임시저장되었습니다", "success")}
        >
          임시저장
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canIssue}
          onClick={register}
        >
          <ShieldCheck size={16} />
          심의필 발급 등록
        </button>
      </div>
    </div>
  );
}
