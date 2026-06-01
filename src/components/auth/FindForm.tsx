"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { AlertCircle, ArrowLeft, Check } from "lucide-react";
import AuthBanner from "./AuthBanner";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${String(ss).padStart(2, "0")}`;
}

interface Props {
  onBack: () => void;
}

export default function FindForm({ onBack }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [left, setLeft] = useState(0);
  const [verified, setVerified] = useState(false);
  const [npw, setNpw] = useState("");
  const [npw2, setNpw2] = useState("");
  const [err, setErr] = useState("");
  const [touched, setTouched] = useState<{ email?: boolean }>({});

  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [left]);

  const emailErr =
    touched.email && !EMAIL_RE.test(email)
      ? "올바른 이메일 형식을 입력하세요."
      : "";

  const sendCode = () => {
    setTouched((t) => ({ ...t, email: true }));
    if (!EMAIL_RE.test(email)) return;
    setSent(true);
    setLeft(180);
    setErr("");
  };
  const verify = () => {
    setErr("");
    if (code.length !== 6) {
      setErr("인증번호 6자리를 입력하세요.");
      return;
    }
    if (left <= 0) {
      setErr("인증 시간이 만료되었습니다. 다시 요청하세요.");
      return;
    }
    setVerified(true);
    setTimeout(() => setStep(2), 350);
  };
  const reset = () => {
    setErr("");
    if (npw.length < 8) {
      setErr("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (npw !== npw2) {
      setErr("비밀번호가 일치하지 않습니다.");
      return;
    }
    setStep(3);
  };

  return (
    <form className="auth" onSubmit={(e) => e.preventDefault()} noValidate>
      <button type="button" className="auth-back" onClick={onBack}>
        <ArrowLeft size={16} /> 로그인으로 돌아가기
      </button>

      {step === 1 && (
        <>
          <header className="auth-head">
            <h2 className="auth-title">비밀번호 찾기</h2>
            <p className="auth-desc">
              가입한 이메일로 인증번호를 보내 드립니다.
            </p>
          </header>

          <div className="field">
            <label className="field-label" htmlFor="fd-id">
              이메일
            </label>
            <div className="row-attach">
              <input
                id="fd-id"
                className={clsx("input", emailErr && "is-error")}
                type="email"
                placeholder="abcd1234@jbfg.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                disabled={verified}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={sendCode}
                disabled={verified}
              >
                {sent ? "재전송" : "인증번호"}
              </button>
            </div>
            {emailErr && (
              <div className="field-err">
                <AlertCircle size={13} />
                {emailErr}
              </div>
            )}
          </div>

          {sent && (
            <div className="field">
              <label className="field-label" htmlFor="fd-code">
                인증번호
              </label>
              <div className="input-wrap">
                <input
                  id="fd-code"
                  className="input code-input"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6자리 입력"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  disabled={verified}
                />
                <span
                  className={clsx("input-timer", left <= 0 && "expired")}
                >
                  {left > 0 ? fmtTime(left) : "만료"}
                </span>
              </div>
              <p className="field-note">
                메일로 전송된 6자리 인증번호를 입력하세요. (데모: 아무 숫자 6자리)
              </p>
            </div>
          )}

          {err && <AuthBanner message={err} />}

          <button
            type="button"
            className="btn btn-primary btn-lg auth-submit"
            onClick={verify}
            disabled={!sent || verified}
          >
            {verified ? (
              <>
                <Check size={18} /> 인증 완료
              </>
            ) : (
              "확인"
            )}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <header className="auth-head">
            <h2 className="auth-title">새 비밀번호 설정</h2>
            <p className="auth-desc">
              8자 이상, 영문·숫자·특수문자 조합을 권장합니다.
            </p>
          </header>
          <div className="field">
            <label className="field-label" htmlFor="np1">
              새 비밀번호
            </label>
            <input
              id="np1"
              className="input"
              type="password"
              placeholder="새 비밀번호"
              value={npw}
              onChange={(e) => setNpw(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="np2">
              새 비밀번호 확인
            </label>
            <input
              id="np2"
              className="input"
              type="password"
              placeholder="다시 입력"
              value={npw2}
              onChange={(e) => setNpw2(e.target.value)}
            />
          </div>
          {err && <AuthBanner message={err} />}
          <button
            type="button"
            className="btn btn-primary btn-lg auth-submit"
            onClick={reset}
          >
            비밀번호 변경
          </button>
        </>
      )}

      {step === 3 && (
        <div className="auth-done">
          <div className="auth-done-ic">
            <Check size={30} />
          </div>
          <h2 className="auth-title">비밀번호가 변경되었습니다</h2>
          <p className="auth-desc">새 비밀번호로 다시 로그인해 주세요.</p>
          <button
            type="button"
            className="btn btn-primary btn-lg auth-submit"
            onClick={onBack}
          >
            로그인하기
          </button>
        </div>
      )}
    </form>
  );
}
