import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white shrink-0">
      <Link href="/" className="text-xl font-bold text-indigo-600">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all"
      >
        + 새 링크
      </Link>
    </header>
  );
}
