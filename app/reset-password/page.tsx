"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isValid = password !== "" && passwordConfirm !== "";

  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleReset() {
    if (!isValid || loading) return;

    if (password !== passwordConfirm) {
      showToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      const msg = error.message.includes("6")
        ? "비밀번호는 최소 6자 이상이어야 합니다."
        : "비밀번호 재설정에 실패했습니다. 다시 시도해주세요.";
      showToast(msg);
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
            {!ready ? (
              <p className="text-center text-sm text-[var(--text-sub)]">
                링크를 확인하는 중입니다...
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--text)]">
                    새 비밀번호
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="새 비밀번호를 입력하세요"
                    className="px-3 py-2 border border-[var(--border)] rounded-md text-base text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--text)]">
                    새 비밀번호 확인
                  </label>
                  <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleReset()}
                    placeholder="새 비밀번호를 다시 입력하세요"
                    className="px-3 py-2 border border-[var(--border)] rounded-md text-base text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!isValid || loading}
                  className="w-full py-2 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-2"
                >
                  {loading ? "처리 중..." : "비밀번호 재설정"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
