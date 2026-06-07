"use client";

import { useState } from "react";
import PageHead from "@/components/PageHead";
import MaterialInfoForm, {
  type MaterialInfo,
} from "@/components/upload/MaterialInfoForm";
import SourceEditor, {
  type EditorTab,
} from "@/components/upload/SourceEditor";
import UploadActionPanel from "@/components/upload/UploadActionPanel";
import { useToast } from "@/components/Toaster";
import {
  createDocument,
  LOAN_TYPE_VALUE,
  LOCATION_VALUE,
  MARKETING_USER_ID,
} from "@/lib/api";

const INITIAL_TEXT =
  "직장인이라면 누구나 100% 당일 승인! 복잡한 서류 없이 업계 최저 금리로 모셔갑니다. 지금 신청하면 한도 최대 1억원까지 무조건 가능하며, 중도상환 수수료 전액 면제 혜택을 드립니다. 대출 신청은 신용점수에 영향을 주지 않으니 부담 없이 알아보세요.";
const MAX = 3000;

const INITIAL_INFO: MaterialInfo = {
  name: "봄맞이 신용대출 상세페이지",
  location: "상세페이지",
  loanType: "신용대출",
  title: "JB 봄맞이 직장인 신용대출",
};

export default function UploadPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<EditorTab>("텍스트");
  const [text, setText] = useState(INITIAL_TEXT);
  const [info, setInfo] = useState<MaterialInfo>(INITIAL_INFO);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  // 방금 업로드한 문서 id — "피드백 확인하기" 시 해당 자료로 이동하는 데 쓴다.
  const [docId, setDocId] = useState<number | null>(null);

  const submit = async () => {
    setBusy(true);
    try {
      const created = await createDocument({
        uploaderId: MARKETING_USER_ID,
        name: info.name,
        uploadLocation: LOCATION_VALUE[info.location] ?? "DETAIL_PAGE",
        loanType: LOAN_TYPE_VALUE[info.loanType] ?? "CREDIT_LOAN",
        title: info.title,
        content: text,
      });
      setDocId(created.id);
      toast("준법 검토가 접수되었습니다", "success");
      setDone(true);
    } catch {
      // 서버 미응답 시에도 데모 흐름은 막지 않는다.
      toast("접수 처리했습니다 (오프라인 모드)", "success");
      setDone(true);
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setDone(false);
    setText("");
    setInfo(INITIAL_INFO);
    setDocId(null);
  };

  return (
    <div>
      <PageHead
        crumb={[]}
        title="자료 업로드"
        sub="검토할 마케팅 자료의 정보와 원문을 입력한 뒤 검증을 요청하세요."
      />
      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: "1fr 268px" }}
      >
        <div className="flex flex-col gap-4">
          <MaterialInfoForm
            disabled={done}
            value={info}
            onChange={(patch) => setInfo((p) => ({ ...p, ...patch }))}
          />
          <SourceEditor
            tab={tab}
            onTabChange={setTab}
            text={text}
            onTextChange={setText}
            disabled={done}
            max={MAX}
          />
        </div>
        <UploadActionPanel
          done={done}
          canSubmit={!!text.trim() && !busy}
          onSubmit={submit}
          onReset={reset}
          docId={docId}
        />
      </div>
    </div>
  );
}
