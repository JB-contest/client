"use client";

import { History, X } from "lucide-react";
import Timeline from "@/components/ui/Timeline";
import { COLOR } from "@/lib/colors";
import { HISTORY, type ArchiveItem } from "@/lib/data";

interface Props {
  open: boolean;
  onClose: () => void;
  cert: ArchiveItem;
}

export default function HistoryModal({ open, onClose, cert }: Props) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 grid place-content-center z-[90]"
      style={{ background: "rgba(17,24,39,.45)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[420px] bg-white rounded-modal overflow-y-auto"
        style={{
          maxHeight: "84vh",
          boxShadow: "0 16px 48px rgba(11,47,110,.18)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <div className="acc-title text-base">
            <History size={18} color={COLOR.text2} />
            심의 이력
            <span className="acc-chip">F17 · 재학습 적재</span>
          </div>
          <div
            className="tb-icon-btn"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          >
            <X size={18} />
          </div>
        </div>
        <div className="px-5 pt-2 pb-5">
          <div className="text-[12.5px] text-text-2 mb-1.5">
            <span className="mono font-semibold text-text-1">{cert.no}</span> ·{" "}
            {cert.name}
          </div>
          <Timeline items={HISTORY} />
        </div>
      </div>
    </div>
  );
}
