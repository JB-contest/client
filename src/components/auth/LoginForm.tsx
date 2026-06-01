"use client";

import { useState } from "react";
import clsx from "clsx";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import AuthBanner from "./AuthBanner";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  onFind: () => void;
  onSuccess: (email: string) => void;
}

export default function LoginForm({ onFind, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [keep, setKeep] = useState(true);
  const [touched, setTouched] = useState<{ email?: boolean; pw?: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [formErr, setFormErr] = useState("");

  const emailErr =
    touched.email && !EMAIL_RE.test(email)
      ? "올바른 이메일 형식을 입력하세요."
      : "";
  const pwErr = touched.pw && pw.length < 1 ? "비밀번호를 입력하세요." : "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, pw: true });
    setFormErr("");
    if (!EMAIL_RE.test(email) || pw.length < 1) return;
    setLoading(true);
    setTimeout(() => {
      if (pw === "1234" || pw.length >= 4) {
        onSuccess(email);
      } else {
        setLoading(false);
        setFormErr("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }, 850);
  };

  return (
    <form className="auth" onSubmit={submit} noValidate>
      <header className="auth-head">
        <h2 className="auth-title">로그인</h2>
        <p className="auth-desc">사내 계정으로 로그인하세요.</p>
      </header>

      {formErr && <AuthBanner message={formErr} />}

      <div className="field">
        <label className="field-label" htmlFor="lg-id">
          아이디
        </label>
        <input
          id="lg-id"
          className={clsx("input", emailErr && "is-error")}
          type="email"
          inputMode="email"
          autoComplete="username"
          placeholder="abcd1234@jbfg.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        />
        {emailErr && (
          <div className="field-err">
            <AlertCircle size={13} />
            {emailErr}
          </div>
        )}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="lg-pw">
          비밀번호
        </label>
        <div className="input-wrap">
          <input
            id="lg-pw"
            className={clsx("input", pwErr && "is-error")}
            type={show ? "text" : "password"}
            autoComplete="current-password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, pw: true }))}
          />
          <button
            type="button"
            className="input-aff"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "비밀번호 숨기기" : "비밀번호 표시"}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {pwErr && (
          <div className="field-err">
            <AlertCircle size={13} />
            {pwErr}
          </div>
        )}
      </div>

      <div className="auth-meta">
        <label className="keep">
          <input
            type="checkbox"
            className="check"
            checked={keep}
            onChange={(e) => setKeep(e.target.checked)}
          />
          로그인 상태 유지
        </label>
        <button type="button" className="auth-link" onClick={onFind}>
          비밀번호 찾기
        </button>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg auth-submit"
        disabled={loading}
      >
        {loading && <span className="spin" aria-hidden="true" />}
        {loading ? "로그인 중…" : "로그인"}
      </button>

      <p className="auth-hint">접근 권한 문의: 준법감시부서 내선 8120</p>
    </form>
  );
}
