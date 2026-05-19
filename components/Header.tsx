"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useFolders } from "@/context/FolderContext";

export default function Header() {
  const { addFolder, isAddingFolder } = useFolders();
  const [modalOpen, setModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modalOpen) {
      setFolderName("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [modalOpen]);

  async function handleSave() {
    if (!folderName.trim() || isAddingFolder) return;
    await addFolder(folderName);
    setModalOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setModalOpen(false);
  }

  return (
    <>
      <header className="flex items-center justify-between px-4 h-12 border-b border-[var(--border)] bg-[var(--card-bg)] shrink-0 sticky top-0 z-10">
        <Link href="/" className="text-base font-semibold text-[var(--text)]">
          한입 링크
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border)] text-[var(--text)] rounded-md text-sm font-medium btn-secondary transition-colors bg-[var(--card-bg)]"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            새 폴더
          </button>
          <Link
            href="/new"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            새 링크
          </Link>
        </div>
      </header>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/25"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative z-10 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 w-80 flex flex-col gap-4 shadow-lg">
            <h3 className="text-base font-semibold text-[var(--text)]">새 폴더</h3>
            <input
              ref={inputRef}
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="폴더 이름"
              className="px-3 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 border border-[var(--border)] text-[var(--text)] rounded-md text-sm font-medium btn-secondary transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={!folderName.trim() || isAddingFolder}
                className="px-4 py-1.5 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {isAddingFolder ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
