"use client";

import clsx from "clsx";
import {
  CheckCircle2,
  CircleDashed,
  MousePointerClick,
  Save,
  ShieldCheck,
} from "lucide-react";
import RiskBadge from "@/components/ui/RiskBadge";
import { COLOR } from "@/lib/colors";
import type { Feedback } from "@/lib/data";

interface Props {
  active: number | null;
  fb: Feedback | null;
  content: string;
  setContent: (v: string) => void;
  saved: boolean;
  onSave: (i: number) => void;
}

export default function EditPanel({
  active,
  fb,
  content,
  setContent,
  saved,
  onSave,
}: Props) {
  if (active === null || fb === null) {
    return (
      <div className="panel">
        <div className="panel-head">
          <div className="panel-title">자료 수정</div>
        </div>
        <div className="edit-empty">
          <MousePointerClick size={26} color={COLOR.text3} />
          <div className="text-[13.5px] font-semibold text-text-2">
            수정할 피드백을 선택하세요
          </div>
          <div className="text-[12.5px]">
            왼쪽 원문의 하이라이트 또는 피드백 카드를 클릭하면
            <br />
            해당 항목을 수정할 수 있습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-title flex items-center gap-[9px]">
          <span
            className="fc-idx"
            style={{ background: saved ? "#16A34A" : "#0B2F6E" }}
          >
            {active + 1}
          </span>
          {fb.title}
        </div>
        <RiskBadge level={fb.risk} />
      </div>
      <div className="p-[18px]">
        <div className="text-[11px] font-bold text-text-3 tracking-[0.04em] mb-1.5">
          원문 표현
        </div>
        <div className="edit-orig">
          <span className="strike">{fb.title.match(/"[^"]*"/)?.[0] ?? fb.title}</span>
          {fb.tag && ` — ${fb.tag}`}
        </div>

        <div className="edit-review">
          <div className="edit-review-head">
            <ShieldCheck size={13} />
            준법자문가 피드백
          </div>
          {fb.reviewComment ? (
            <div className="edit-review-body">{fb.reviewComment}</div>
          ) : (
            <div className="edit-review-body edit-review-empty">
              등록된 준법자문가 피드백이 없습니다.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between my-4 mb-1.5 mt-4">
          <div className="text-[11px] font-bold text-text-3 tracking-[0.04em]">
            원문 수정
          </div>
        </div>
        <textarea
          className="textarea"
          style={{ minHeight: 240, fontSize: 13.5, lineHeight: 1.65 }}
          placeholder="규정에 맞는 수정 문구를 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex items-center justify-between mt-3">
          <span
            className={clsx("save-state", saved ? "is-saved" : "is-unsaved")}
          >
            {saved ? <CheckCircle2 size={14} /> : <CircleDashed size={14} />}
            {saved ? "저장됨" : "저장되지 않음"}
          </span>
          <button
            className="btn btn-primary btn-sm"
            disabled={!content.trim()}
            onClick={() => onSave(active)}
          >
            <Save size={14} />저장
          </button>
        </div>
      </div>
    </div>
  );
}
