"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isValid = email.trim() !== "";

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSend() {
    if (!isValid || loading) return;

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      showToast("이메일 발송에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    setSent(true);
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
            {sent ? (
              <div className="flex flex-col gap-3 text-center">
                <p className="text-sm text-[var(--text)]">
                  <span className="font-medium">{email}</span>으로<br />
                  비밀번호 재설정 링크를 발송했습니다.
                </p>
                <p className="text-xs text-[var(--text-sub)]">
                  이메일을 확인하고 링크를 클릭해주세요.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--text)]">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="가입한 이메일을 입력하세요"
                    className="px-3 py-2 border border-[var(--border)] rounded-md text-base text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!isValid || loading}
                  className="w-full py-2 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-2"
                >
                  {loading ? "발송 중..." : "비밀번호 재설정 링크 발송"}
                </button>
              </>
            )}

            <p className="text-center text-sm text-[var(--text-sub)]">
              <Link
                href="/login"
                className="text-[var(--accent)] hover:underline transition-colors"
              >
                로그인으로 돌아가기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
