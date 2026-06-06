"use client";

import { useEffect, useState } from "react";
import PageHead from "@/components/PageHead";
import ReviewActionPanel from "@/components/legal/review/ReviewActionPanel";
import ReviewFeedbackList from "@/components/legal/review/ReviewFeedbackList";
import ReviewHistoryPanel from "@/components/legal/review/ReviewHistoryPanel";
import ReviewMetaBar from "@/components/legal/review/ReviewMetaBar";
import ReviewSourceDoc from "@/components/legal/review/ReviewSourceDoc";
import { useToast } from "@/components/Toaster";
import { REVIEW_DATA, type ReviewData } from "@/lib/legalData";
import {
  buildReviewData,
  createApproval,
  createFeedback,
  getDocument,
  getValidationResults,
  listDocuments,
  listFeedbacks,
  pickReviewDoc,
  COMPLIANCE_USER_ID,
  type ValidationResultResponse,
} from "@/lib/api";

export default function LegalReviewPage() {
  const { toast } = useToast();
  const [d, setD] = useState<ReviewData>(REVIEW_DATA);
  const [docId, setDocId] = useState<number | null>(null);
  const [validation, setValidation] = useState<ValidationResultResponse | null>(
    null,
  );
  const [active, setActive] = useState<number | null>(null);
  const [judged, setJudged] = useState<Set<number>>(new Set());

  useEffect(() => {
    (async () => {
      try {
        // ?id= 가 있으면 해당 문서를, 없으면 검토 대상 문서를 자동 선택.
        const param = new URLSearchParams(window.location.search).get("id");
        const targetId = param ? Number(param) : null;
        let id = targetId;
        if (id == null) {
          const docs = await listDocuments();
          const target = pickReviewDoc(docs);
          if (!target) return; // 데이터 없으면 목업 유지
          id = target.id;
        }
        const [doc, validations, feedbacks] = await Promise.all([
          getDocument(id),
          getValidationResults(id),
          listFeedbacks(id),
        ]);
        const v = validations[validations.length - 1];
        setDocId(doc.id);
        setValidation(v ?? null);
        setD(buildReviewData(doc, v, feedbacks));
      } catch {
        /* 서버 미응답 시 목업 유지 */
      }
    })();
  }, []);

  const judge = (i: number) =>
    setJudged((prev) => {
      const n = new Set(prev);
      n.add(i);
      return n;
    });
  const done = judged.size;
  const total = d.feedback.length;

  // 검증 결과의 위반문구 id 로 피드백 항목을 구성한다.
  const feedbackItems = () =>
    (validation?.violations ?? []).map((v) => ({
      violationTextId: v.id,
      comment: `${v.violationTypes}${v.lawMappings ? ` · ${v.lawMappings}` : ""}`,
    }));

  // 이력 타임라인을 로컬에서 갱신한다(API 성공·오프라인 폴백 모두 반영).
  const markReview = () =>
    setD((prev) => ({
      ...prev,
      history: prev.history.map((it) =>
        it.ev.startsWith("검토") ? { ...it, dot: "done" } : it,
      ),
    }));
  const markApproved = () =>
    setD((prev) => ({
      ...prev,
      history: prev.history.map((it, i) =>
        i === prev.history.length - 1
          ? { ...it, dot: "done", ts: "완료" }
          : { ...it, dot: it.dot === "active" ? "done" : it.dot },
      ),
    }));

  const actions = {
    onSave: async () => {
      if (docId != null) {
        await createFeedback(docId, {
          reviewerId: COMPLIANCE_USER_ID,
          decision: "REVISION_REQUESTED",
          items: feedbackItems(),
        }).catch(() => {});
      }
      markReview();
      toast("검토 의견이 저장되었습니다", "success");
    },
    onApprove: async () => {
      if (docId != null) {
        await createApproval(docId, {
          approverId: COMPLIANCE_USER_ID,
          reviewNumber: `JB-${docId}`,
        }).catch(() => {});
      }
      markApproved();
      toast("최종 승인되었습니다", "success");
    },
    onReject: async () => {
      if (docId != null) {
        await createFeedback(docId, {
          reviewerId: COMPLIANCE_USER_ID,
          decision: "REVISION_REQUESTED",
          items: feedbackItems(),
        }).catch(() => {});
      }
      markReview();
      toast("반려 처리되어 재수정을 요청했습니다", "error");
    },
  };

  return (
    <div className="fade-in">
      <PageHead crumb={["Home", "검토"]} title="검토" />
      <ReviewMetaBar data={d} />

      <div className="rev-grid">
        <div className="flex flex-col gap-4">
          <ReviewSourceDoc
            active={active}
            setActive={setActive}
            source={d.source}
            total={d.feedback.length}
          />
          <ReviewFeedbackList
            feedback={d.feedback}
            active={active}
            judged={judged}
            onSelect={(i) => setActive(active === i ? null : i)}
            onJudge={judge}
          />
        </div>

        <div className="flex flex-col gap-3.5 sticky" style={{ top: 0 }}>
          <ReviewActionPanel done={done} total={total} actions={actions} />
          <ReviewHistoryPanel items={d.history} />
        </div>
      </div>
    </div>
  );
}
