"use client";

import { useToast } from "@/components/Toaster";

export interface ReviewActions {
  onSave: () => Promise<void> | void;
  onApprove: () => Promise<void> | void;
  onReject: () => Promise<void> | void;
}

interface Props {
  done: number;
  total: number;
  actions?: ReviewActions;
}

export default function ReviewActionPanel({ done, total, actions }: Props) {
  const { toast } = useToast();

  // actions 가 없으면(목업 모드) 기존처럼 토스트만 띄운다.
  const save =
    actions?.onSave ?? (() => toast("검토 의견이 저장되었습니다", "success"));
  const approve =
    actions?.onApprove ??
    (() => toast("최종 승인되어 심의필이 발급되었습니다", "success"));
  const reject =
    actions?.onReject ??
    (() => toast("반려 처리되어 재수정을 요청했습니다", "error"));

  return (
    <div className="panel" style={{ padding: 18 }}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          marginBottom: 14,
          letterSpacing: "-0.01em",
        }}
      >
        검토 진행
      </div>
      <div className="prog-row">
        <span className="pl">판단 완료</span>
        <span className="pv num">
          {done}/{total}
        </span>
      </div>
      <div className="prog-bar">
        <i style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
      </div>

      <div className="side-label" style={{ marginTop: 20 }}>
        처리
      </div>
      <div className="action-stack">
        <button className="btn btn-secondary w-full" onClick={() => save()}>
          검토 진행
        </button>
        <button className="btn btn-primary w-full" onClick={() => approve()}>
          최종 승인
        </button>
        <button className="btn btn-destructive w-full" onClick={() => reject()}>
          반려 / 재수정 요청
        </button>
      </div>
    </div>
  );
}
