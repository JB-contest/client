"use client";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LogoutModal({ open, onClose }: LogoutModalProps) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 grid place-content-center z-[90]"
      style={{ background: "rgba(17,24,39,.45)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[420px] bg-white rounded-modal overflow-hidden"
        style={{ boxShadow: "var(--shadow-modal, 0 16px 48px rgba(11,47,110,.18))" }}
      >
        <div className="pt-[18px] px-5 text-[17px] font-bold">로그아웃</div>
        <div className="px-5 pt-2.5 pb-5 text-[13.5px] text-text-2 leading-[1.6]">
          현재 세션을 종료합니다. 작성 중인 내용은 자동 저장됩니다.
        </div>
        <div className="flex justify-end gap-2 px-5 py-3.5 border-t border-border bg-page">
          <button className="btn btn-ghost" onClick={onClose}>
            취소
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
