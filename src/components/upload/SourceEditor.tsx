"use client";

import clsx from "clsx";
import { ImageUp } from "lucide-react";

export type EditorTab = "텍스트" | "이미지";

interface Props {
  tab: EditorTab;
  onTabChange: (t: EditorTab) => void;
  text: string;
  onTextChange: (v: string) => void;
  disabled: boolean;
  max: number;
}

export default function SourceEditor({
  tab,
  onTabChange,
  text,
  onTextChange,
  disabled,
  max,
}: Props) {
  return (
    <div className="panel">
      <div className="panel-head">
        <div className="flex gap-[18px]">
          {(["텍스트", "이미지"] as const).map((t) => (
            <button
              key={t}
              className={clsx(
                "border-none bg-transparent text-[13.5px] font-semibold py-1 cursor-pointer",
                tab === t ? "text-jb-navy" : "text-text-3 hover:text-text-1",
              )}
              style={
                tab === t
                  ? { borderBottom: "2px solid #0B2F6E" }
                  : { borderBottom: "2px solid transparent" }
              }
              onClick={() => onTabChange(t)}
              disabled={disabled}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="text-xs text-text-3 num">
          {text.length.toLocaleString()} / {max.toLocaleString()}자
        </div>
      </div>
      <div className="p-[18px]">
        {tab === "텍스트" ? (
          <textarea
            className="textarea"
            style={{ minHeight: 300, lineHeight: 1.75, fontSize: 14 }}
            maxLength={max}
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            disabled={disabled}
            placeholder="게재할 마케팅 문구 원문을 입력하세요."
          />
        ) : (
          <div
            className="upload-zone"
            style={{ minHeight: 300, justifyContent: "center" }}
          >
            <ImageUp size={28} color="#1F6FEB" />
            <div className="font-semibold text-sm">
              이미지를 끌어다 놓거나 클릭하여 업로드
            </div>
            <div className="text-xs text-text-2">
              PNG · JPG · 최대 20MB · OCR로 문구를 추출합니다
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
