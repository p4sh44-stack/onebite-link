import Link from "next/link";

export default function SignupPage() {
  return (
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
              placeholder="비밀번호를 다시 입력하세요"
              className="px-3 py-2 border border-[var(--border)] rounded-md text-base text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          <button
            type="button"
            className="w-full py-2 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent transition-colors mt-2"
          >
            회원가입
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
  );
}
