"use client";

import { useState } from "react";
import PageHead from "@/components/PageHead";
import MaterialInfoForm from "@/components/upload/MaterialInfoForm";
import SourceEditor, {
  type EditorTab,
} from "@/components/upload/SourceEditor";
import UploadActionPanel from "@/components/upload/UploadActionPanel";
import { useToast } from "@/components/Toaster";

const INITIAL_TEXT =
  "직장인이라면 누구나 100% 당일 승인! 복잡한 서류 없이 업계 최저 금리로 모셔갑니다. 지금 신청하면 한도 최대 1억원까지 무조건 가능하며, 중도상환 수수료 전액 면제 혜택을 드립니다. 대출 신청은 신용점수에 영향을 주지 않으니 부담 없이 알아보세요.";
const MAX = 3000;

export default function UploadPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<EditorTab>("텍스트");
  const [text, setText] = useState(INITIAL_TEXT);
  const [done, setDone] = useState(false);

  const submit = () => {
    toast("준법 검토가 접수되었습니다", "success");
    setDone(true);
  };
  const reset = () => {
    setDone(false);
    setText("");
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
          <MaterialInfoForm disabled={done} />
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
          canSubmit={!!text.trim()}
          onSubmit={submit}
          onReset={reset}
        />
      </div>
    </div>
  );
}
