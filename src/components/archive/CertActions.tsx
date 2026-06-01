"use client";

import { useRouter } from "next/navigation";
import { Download, History, Plus } from "lucide-react";
import { useToast } from "@/components/Toaster";
import { ROUTES } from "@/lib/routes";

export default function CertActions({
  onShowHistory,
}: {
  onShowHistory: () => void;
}) {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div className="border border-border rounded-card bg-white p-3.5 flex flex-col gap-[9px]">
      <div className="text-[13px] font-semibold text-text-2 mb-0.5">작업</div>
      <button
        className="btn btn-primary"
        onClick={() => toast("심의된 PDF를 다운로드했습니다", "success")}
      >
        <Download size={16} />심의된 PDF 다운로드
      </button>
      <button className="btn btn-secondary" onClick={onShowHistory}>
        <History size={16} />심의 이력 보기
      </button>
      <button
        className="btn btn-ghost"
        onClick={() => router.push(ROUTES.marketing.upload)}
      >
        <Plus size={16} />새 자료 업로드
      </button>
    </div>
  );
}
