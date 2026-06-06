"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import PageHead from "@/components/PageHead";
import EditPanel from "@/components/feedback/EditPanel";
import FeedbackList from "@/components/feedback/FeedbackList";
import HistoryAccordion from "@/components/feedback/HistoryAccordion";
import MetaBar from "@/components/feedback/MetaBar";
import ProgressPanel from "@/components/feedback/ProgressPanel";
import SourceDoc from "@/components/feedback/SourceDoc";
import { useToast } from "@/components/Toaster";
import { FEEDBACK } from "@/lib/data";
import { ROUTES } from "@/lib/routes";
import {
  buildFeedbackData,
  createRevision,
  getDocument,
  getValidationResults,
  listDocuments,
  listFeedbacks,
  type DocumentResponse,
  type FeedbackData,
} from "@/lib/api";

export default function FeedbackPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [active, setActive] = useState<number | null>(0);
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  // 수정 대상 문서 — ?id= 가 있으면 해당 문서, 없으면 수정 요청 상태 문서를 자동 선택.
  const [doc, setDoc] = useState<DocumentResponse | null>(null);
  const [data, setData] = useState<FeedbackData | null>(null);
  const [errLabel, setErrLabel] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const param = new URLSearchParams(window.location.search).get("id");
        let target: DocumentResponse | undefined;
        if (param) {
          target = await getDocument(Number(param));
        } else {
          const docs = await listDocuments();
          target =
            docs.find((d) => d.status === "REVISION_REQUESTED") ?? docs[0];
        }
        if (!target) return; // 데이터 없으면 목업 유지
        const [validations, feedbacks] = await Promise.all([
          getValidationResults(target.id),
          listFeedbacks(target.id),
        ]);
        const v = validations[validations.length - 1];
        setDoc(target);
        setData(buildFeedbackData(target, v, feedbacks));
        setErrLabel(
          v ? `오류율 ${Math.round(v.errorRate)}%` : "검증 결과 없음",
        );
      } catch {
        /* 서버 미응답 시 목업 흐름 유지 */
      }
    })();
  }, []);

  // 실데이터가 있으면 그것을, 없으면 목업 피드백을 쓴다.
  const fbList = data?.feedback ?? FEEDBACK;

  const setDraft = (i: number, v: string) =>
    setDrafts((d) => ({ ...d, [i]: v }));
  const onSave = (i: number) => {
    setSaved((s) => ({ ...s, [i]: true }));
    toast("수정 사항이 저장되었습니다", "success");
  };
  const savedCount = Object.values(saved).filter(Boolean).length;

  const submitRevision = async () => {
    if (doc) {
      // 저장한 수정 문구를 원문에 반영해 새 버전 content 를 만든다.
      let content = doc.content;
      fbList.forEach((f, i) => {
        const d = drafts[i];
        if (d && d.trim()) content = content.split(f.title).join(d.trim());
      });
      // parentId·version 은 서버가 자동 설정한다.
      await createRevision(doc.id, {
        uploaderId: doc.uploaderId,
        name: doc.name,
        uploadLocation: doc.uploadLocation,
        loanType: doc.loanType,
        title: doc.title,
        content,
      }).catch(() => {});
    }
    toast("수정본 재검증을 요청했습니다", "success");
    router.push(ROUTES.marketing.archive);
  };

  return (
    <div>
      <PageHead
        crumb={["Home", "피드백 수정"]}
        title="피드백 수정"
        actions={
          <button
            className="btn btn-ghost"
            onClick={() => router.push(ROUTES.marketing.upload)}
          >
            <ArrowLeft size={16} />목록으로
          </button>
        }
      />

      <MetaBar data={data?.meta} />

      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: "1.04fr 0.96fr" }}
      >
        <div className="flex flex-col gap-4">
          <SourceDoc
            active={active}
            setActive={setActive}
            source={data?.source}
            errLabel={errLabel}
          />
          <FeedbackList
            active={active}
            saved={saved}
            savedCount={savedCount}
            onSelect={(i) => setActive(active === i ? null : i)}
            feedback={data?.feedback}
          />
        </div>

        <div className="sticky top-0 flex flex-col gap-3.5">
          <EditPanel
            active={active}
            fb={active !== null ? (fbList[active] ?? null) : null}
            draft={active !== null ? drafts[active] || "" : ""}
            setDraft={setDraft}
            saved={active !== null ? !!saved[active] : false}
            onSave={onSave}
          />
          <ProgressPanel
            savedCount={savedCount}
            total={fbList.length}
            onSubmit={submitRevision}
          />
          <HistoryAccordion history={data?.history} />
        </div>
      </div>
    </div>
  );
}
