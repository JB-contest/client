"use client";

import { useRouter } from "next/navigation";
import { MessagesSquare, Plus, ShieldCheck } from "lucide-react";
import InfoBanner from "./InfoBanner";
import SubmittedReceipt from "./SubmittedReceipt";
import ValidationSteps from "./ValidationSteps";
import { ROUTES } from "@/lib/routes";

interface Props {
  done: boolean;
  canSubmit: boolean;
  onSubmit: () => void;
  onReset: () => void;
}

export default function UploadActionPanel({
  done,
  canSubmit,
  onSubmit,
  onReset,
}: Props) {
  const router = useRouter();

  return (
    <div className="sticky top-0 flex flex-col gap-3">
      {!done ? (
        <>
          <ValidationSteps />
          <InfoBanner />
          <button
            className="btn btn-primary btn-lg w-full"
            onClick={onSubmit}
            disabled={!canSubmit}
          >
            <ShieldCheck size={18} />검증 요청
          </button>
        </>
      ) : (
        <>
          <SubmittedReceipt />
          <button className="btn btn-secondary w-full" onClick={onReset}>
            <Plus size={16} />새로운 자료 업로드
          </button>
          <button
            className="btn btn-ghost w-full"
            onClick={() => router.push(ROUTES.marketing.feedback)}
          >
            <MessagesSquare size={16} />피드백 확인하기
          </button>
        </>
      )}
    </div>
  );
}
