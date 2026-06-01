"use client";

import { useState } from "react";
import BrandPanel from "@/components/auth/BrandPanel";
import FindForm from "@/components/auth/FindForm";
import LoginForm from "@/components/auth/LoginForm";
import SuccessScreen from "@/components/auth/SuccessScreen";

const HEADLINE = "규정에 맞는 금융 마케팅, AI가 먼저 검토합니다";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "find">("login");
  const [user, setUser] = useState<string | null>(null);

  return (
    <div className="login-layout">
      <section className="form-col">
        <div className="form-shell">
          <div className="form-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-tile sm" src="/assets/jb-symbol.png" alt="" />
            <span className="form-brand-word">JB금융그룹</span>
          </div>
          {user ? (
            <SuccessScreen
              email={user}
              onReset={() => {
                setUser(null);
                setMode("login");
              }}
            />
          ) : mode === "login" ? (
            <LoginForm
              onFind={() => setMode("find")}
              onSuccess={(e) => setUser(e)}
            />
          ) : (
            <FindForm onBack={() => setMode("login")} />
          )}
        </div>
      </section>
      <BrandPanel headline={HEADLINE} />
    </div>
  );
}
