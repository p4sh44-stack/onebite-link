"use client";

import { useState } from "react";
import ThumbnailImage from "@/components/ThumbnailImage";
import { useLinks } from "@/context/LinkContext";
import { useFolders } from "@/context/FolderContext";

interface LinkCardProps {
  id: number;
  title: string;
  url: string;
  description: string;
  folder: string;
  folder_id: number | null;
  thumbnail?: string;
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function PencilIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

export default function LinkCard({ id, title, url, description, folder, thumbnail }: LinkCardProps) {
  const { deleteLink, updateLink } = useLinks();
  const { folders } = useFolders();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editFolder, setEditFolder] = useState(folder);

  const domain = getDomain(url);

  function handleOpenEdit() {
    setEditTitle(title);
    setEditDescription(description);
    setEditFolder(folder);
    setShowEditModal(true);
  }

  function handleSaveEdit() {
    if (!editTitle.trim()) return;
    updateLink(id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      folder: editFolder,
    });
    setShowEditModal(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setShowEditModal(false);
  }

  return (
    <>
      <div className="group relative bg-[var(--card-bg)] border border-[var(--border)] rounded-lg card-hover transition-colors overflow-hidden">
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col">
          {thumbnail && <ThumbnailImage src={thumbnail} alt={title} />}
          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[var(--text-sub)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="text-xs text-[var(--text-sub)] truncate">{domain}</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-2 leading-snug">{title}</h3>
              {description && (
                <p className="text-sm text-[var(--text-sub)] line-clamp-2">{description}</p>
              )}
            </div>
            <div className="mt-auto">
              <span className="text-xs bg-[var(--hover-bg)] text-[var(--text-sub)] px-2 py-0.5 rounded">
                {folder}
              </span>
            </div>
          </div>
        </a>

        <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleOpenEdit}
            className="p-1.5 rounded bg-[var(--card-bg)] text-[var(--text-sub)] hover:text-[var(--accent)] hover:bg-[var(--hover-bg)] transition-colors"
            aria-label="링크 수정"
          >
            <PencilIcon />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-1.5 rounded bg-[var(--card-bg)] text-[var(--text-sub)] hover:text-[var(--error)] hover:bg-[var(--hover-bg)] transition-colors"
            aria-label="링크 삭제"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/25" onClick={() => setShowEditModal(false)} />
          <div
            className="relative z-10 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 w-96 flex flex-col gap-4 shadow-lg"
            onKeyDown={handleEditKeyDown}
          >
            <h3 className="text-base font-semibold text-[var(--text)]">링크 수정</h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text)]">폴더</label>
              <select
                value={editFolder}
                onChange={(e) => setEditFolder(e.target.value)}
                className="px-3 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--text)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              >
                {folders.map((f) => (
                  <option key={f.id} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text)]">제목</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="px-3 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text)]">설명</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                className="px-3 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-1.5 border border-[var(--border)] text-[var(--text)] rounded-md text-sm font-medium btn-secondary transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={!editTitle.trim()}
                className="px-4 py-1.5 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/25" onClick={() => setShowDeleteModal(false)} />
          <div className="relative z-10 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 w-80 flex flex-col gap-4 shadow-lg">
            <h3 className="text-base font-semibold text-[var(--text)]">링크 삭제</h3>
            <p className="text-sm text-[var(--text-sub)]">
              <span className="font-medium text-[var(--text)]">"{title}"</span>을(를) 정말 삭제할까요?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-1.5 border border-[var(--border)] text-[var(--text)] rounded-md text-sm font-medium btn-secondary transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => { deleteLink(id); setShowDeleteModal(false); }}
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
