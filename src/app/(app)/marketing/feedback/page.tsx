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
  // 첫 진입 시에는 아무 항목도 강조하지 않는다. 하이라이트/카드를 클릭해야 선택된다.
  const [active, setActive] = useState<number | null>(null);
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  // 수정 대상 문서 — ?id= 가 있으면 해당 문서, 없으면 수정 요청 상태 문서를 자동 선택.
  const [doc, setDoc] = useState<DocumentResponse | null>(null);
  const [data, setData] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
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
        if (!target) return; // 대상 문서 없음 → 빈 상태
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
        /* 서버 미응답 → 빈 상태 */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fbList = data?.feedback ?? [];

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
    router.push(ROUTES.marketing.home);
  };

  if (loading || !data) {
    return (
      <div>
        <PageHead
          crumb={["Home", "피드백 수정"]}
          title="피드백 수정"
          actions={
            <button
              className="btn btn-ghost"
              onClick={() => router.push(ROUTES.marketing.home)}
            >
              <ArrowLeft size={16} />목록으로
            </button>
          }
        />
        <div className="panel p-14 text-center text-text-3 text-[13.5px]">
          {loading ? "불러오는 중…" : "수정할 자료가 없습니다."}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHead
        crumb={["Home", "피드백 수정"]}
        title="피드백 수정"
        actions={
          <button
            className="btn btn-ghost"
            onClick={() => router.push(ROUTES.marketing.home)}
          >
            <ArrowLeft size={16} />목록으로
          </button>
        }
      />

      <MetaBar data={data.meta} />

      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: "1.04fr 0.96fr" }}
      >
        <div className="flex flex-col gap-4">
          <SourceDoc
            active={active}
            setActive={setActive}
            source={data.source}
            errLabel={errLabel}
          />
          <FeedbackList
            active={active}
            saved={saved}
            savedCount={savedCount}
            onSelect={(i) => setActive(active === i ? null : i)}
            feedback={data.feedback}
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
          <HistoryAccordion history={data.history} />
        </div>
      </div>
    </div>
  );
}
