"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function FeedbackPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [active, setActive] = useState<number | null>(0);
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  const [drafts, setDrafts] = useState<Record<number, string>>({});

  const setDraft = (i: number, v: string) =>
    setDrafts((d) => ({ ...d, [i]: v }));
  const onSave = (i: number) => {
    setSaved((s) => ({ ...s, [i]: true }));
    toast("수정 사항이 저장되었습니다", "success");
  };
  const savedCount = Object.values(saved).filter(Boolean).length;

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

      <MetaBar />

      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: "1.04fr 0.96fr" }}
      >
        <div className="flex flex-col gap-4">
          <SourceDoc active={active} setActive={setActive} />
          <FeedbackList
            active={active}
            saved={saved}
            savedCount={savedCount}
            onSelect={(i) => setActive(active === i ? null : i)}
          />
        </div>

        <div className="sticky top-0 flex flex-col gap-3.5">
          <EditPanel
            active={active}
            fb={active !== null ? FEEDBACK[active] : null}
            draft={active !== null ? drafts[active] || "" : ""}
            setDraft={setDraft}
            saved={active !== null ? !!saved[active] : false}
            onSave={onSave}
          />
          <ProgressPanel
            savedCount={savedCount}
            total={FEEDBACK.length}
            onSubmit={() => {
              toast("수정본 재검증을 요청했습니다", "success");
              router.push(ROUTES.marketing.archive);
            }}
          />
          <HistoryAccordion />
        </div>
      </div>
    </div>
  );
}
