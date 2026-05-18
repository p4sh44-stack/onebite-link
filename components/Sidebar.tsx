"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFolders } from "@/context/FolderContext";

function TrashIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { folders, deleteFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);

  function handleConfirmDelete() {
    if (folderToDelete) {
      deleteFolder(folderToDelete);
      setFolderToDelete(null);
    }
  }

  return (
    <>
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
              <div key={folder} className="group relative flex items-center">
                <Link
                  href={href}
                  className={`flex-1 flex items-center gap-2 px-3 py-1.5 pr-8 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--hover-bg)] text-[var(--text)] font-medium"
                      : "text-[var(--text-sub)] nav-item"
                  }`}
                >
                  <span className="text-base leading-none">📁</span>
                  {folder}
                </Link>
                <button
                  onClick={() => setFolderToDelete(folder)}
                  className="absolute right-1.5 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-sub)] hover:text-[var(--error)]"
                  aria-label={`${folder} 폴더 삭제`}
                >
                  <TrashIcon />
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      {folderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/25"
            onClick={() => setFolderToDelete(null)}
          />
          <div className="relative z-10 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 w-80 flex flex-col gap-4 shadow-lg">
            <h3 className="text-base font-semibold text-[var(--text)]">폴더 삭제</h3>
            <p className="text-sm text-[var(--text-sub)]">
              <span className="font-medium text-[var(--text)]">"{folderToDelete}"</span> 폴더를 정말 삭제할까요?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setFolderToDelete(null)}
                className="px-4 py-1.5 border border-[var(--border)] text-[var(--text)] rounded-md text-sm font-medium btn-secondary transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 bg-[var(--error)] text-white rounded-md text-sm font-medium btn-danger transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
