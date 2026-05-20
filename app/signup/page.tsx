"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

function mapErrorToKorean(message: string): string {
  if (message.includes("already registered") || message.includes("already been registered")) {
    return "이미 사용 중인 이메일입니다.";
  }
  if (message.includes("password") && message.includes("6")) {
    return "비밀번호는 최소 6자 이상이어야 합니다.";
  }
  if (message.includes("valid email")) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  if (message.includes("disabled")) {
    return "현재 회원가입이 비활성화되어 있습니다.";
  }
  return "회원가입에 실패했습니다. 다시 시도해주세요.";
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isValid = email.trim() !== "" && password !== "" && passwordConfirm !== "";

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSignup() {
    if (!isValid || loading) return;

    if (password !== passwordConfirm) {
      showToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      showToast(mapErrorToKorean(error.message));
      return;
    }

    router.push("/");
  }

  return (
    <>
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-[var(--error)] text-white rounded-md text-sm font-medium whitespace-nowrap">
          {toast}
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-6">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-[var(--text)] text-center">
            한입 링크
          </h1>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--text)]">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="px-3 py-2 border border-[var(--border)] rounded-md text-base text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--text)]">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="px-3 py-2 border border-[var(--border)] rounded-md text-base text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--text)]">
                비밀번호 확인
              </label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                className="px-3 py-2 border border-[var(--border)] rounded-md text-base text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={handleSignup}
              disabled={!isValid || loading}
              className="w-full py-2 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-2"
            >
              {loading ? "처리 중..." : "회원가입"}
            </button>

            <p className="text-center text-sm text-[var(--text-sub)]">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="text-[var(--accent)] hover:underline transition-colors"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
