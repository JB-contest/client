"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

interface Props {
  email: string;
  onReset: () => void;
}

export default function SuccessScreen({ email, onReset }: Props) {
  const router = useRouter();
  useEffect(() => {
    const id = setTimeout(() => router.push("/marketing/home"), 1600);
    return () => clearTimeout(id);
  }, [router]);

  return (
    <div className="auth-success">
      <div className="auth-success-ic">
        <ShieldCheck size={34} />
      </div>
      <h2 className="auth-title">로그인되었습니다</h2>
      <p className="auth-desc">{email} 님, 준법 심의 워크스페이스로 이동합니다.</p>
      <div className="auth-success-loader">
        <i />
      </div>
      <button type="button" className="btn btn-secondary" onClick={onReset}>
        로그인 화면 다시 보기
      </button>
    </div>
  );
}
