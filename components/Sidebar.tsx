"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useFolders } from "@/context/FolderContext";

function PencilIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

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
  const { folders, deleteFolder, renameFolder } = useFolders();

  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);
  const [folderToRename, setFolderToRename] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (folderToRename !== null) {
      setNewName(folderToRename);
      setTimeout(() => renameInputRef.current?.focus(), 0);
    }
  }, [folderToRename]);

  function handleConfirmDelete() {
    if (folderToDelete) {
      deleteFolder(folderToDelete);
      setFolderToDelete(null);
    }
  }

  function handleConfirmRename() {
    if (folderToRename && newName.trim()) {
      renameFolder(folderToRename, newName);
      setFolderToRename(null);
    }
  }

  function handleRenameKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleConfirmRename();
    if (e.key === "Escape") setFolderToRename(null);
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
                  className={`flex-1 flex items-center gap-2 px-3 py-1.5 pr-16 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--hover-bg)] text-[var(--text)] font-medium"
                      : "text-[var(--text-sub)] nav-item"
                  }`}
                >
                  <span className="text-base leading-none">📁</span>
                  <span className="truncate">{folder}</span>
                </Link>
                <div className="absolute right-1.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setFolderToRename(folder)}
                    className="p-1 rounded text-[var(--text-sub)] hover:text-[var(--accent)] transition-colors"
                    aria-label={`${folder} 폴더 이름 수정`}
                  >
                    <PencilIcon />
                  </button>
                  <button
                    onClick={() => setFolderToDelete(folder)}
                    className="p-1 rounded text-[var(--text-sub)] hover:text-[var(--error)] transition-colors"
                    aria-label={`${folder} 폴더 삭제`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {folderToRename !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/25"
            onClick={() => setFolderToRename(null)}
          />
          <div className="relative z-10 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 w-80 flex flex-col gap-4 shadow-lg">
            <h3 className="text-base font-semibold text-[var(--text)]">폴더 이름 수정</h3>
            <input
              ref={renameInputRef}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleRenameKeyDown}
              placeholder="폴더 이름"
              className="px-3 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setFolderToRename(null)}
                className="px-4 py-1.5 border border-[var(--border)] text-[var(--text)] rounded-md text-sm font-medium btn-secondary transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleConfirmRename}
                disabled={!newName.trim() || newName.trim() === folderToRename}
                className="px-4 py-1.5 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

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
