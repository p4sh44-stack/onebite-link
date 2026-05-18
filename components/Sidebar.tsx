"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { folders } from "@/data/mockData";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 shrink-0 border-r border-[var(--border)] bg-[var(--card-bg)] p-2 flex flex-col gap-0.5">
      <Link
        href="/"
        className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
          pathname === "/"
            ? "bg-[var(--hover-bg)] text-[var(--text)] font-medium"
            : "text-[var(--text-sub)] nav-item"
        }`}
      >
        전체
      </Link>
      <div className="mt-4 flex flex-col gap-0.5">
        <p className="px-3 mb-1 text-xs font-medium text-[var(--placeholder)] uppercase tracking-wider">
          폴더
        </p>
        {folders.map((folder) => {
          const href = `/folder/${encodeURIComponent(folder)}`;
          const isActive = pathname === href;
          return (
            <Link
              key={folder}
              href={href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-[var(--hover-bg)] text-[var(--text)] font-medium"
                  : "text-[var(--text-sub)] nav-item"
              }`}
            >
              <span className="text-base leading-none">📁</span>
              {folder}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
