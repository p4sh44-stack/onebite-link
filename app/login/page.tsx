"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

function mapErrorToKorean(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  if (message.includes("Email not confirmed")) {
    return "이메일 인증이 완료되지 않았습니다.";
  }
  if (message.includes("too many requests")) {
    return "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.";
  }
  return "로그인에 실패했습니다. 다시 시도해주세요.";
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isValid = email.trim() !== "" && password !== "";

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleLogin() {
    if (!isValid || loading) return;

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
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
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="px-3 py-2 border border-[var(--border)] rounded-md text-base text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={!isValid || loading}
              className="w-full py-2 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-2"
            >
              {loading ? "처리 중..." : "로그인"}
            </button>

            <p className="text-center text-sm text-[var(--text-sub)]">
              <Link
                href="/forgot-password"
                className="text-[var(--accent)] hover:underline transition-colors"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </p>

            <p className="text-center text-sm text-[var(--text-sub)]">
              계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="text-[var(--accent)] hover:underline transition-colors"
              >
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
