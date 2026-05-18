"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { folders } from "@/data/mockData";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 shrink-0 border-r bg-white p-3 flex flex-col gap-1">
      <Link
        href="/"
        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
          pathname === "/"
            ? "bg-indigo-100 text-indigo-700"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        All
      </Link>
      <div className="mt-2 flex flex-col gap-1">
        {folders.map((folder) => {
          const href = `/folder/${encodeURIComponent(folder)}`;
          const isActive = pathname === href;
          return (
            <Link
              key={folder}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              📁 {folder}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
