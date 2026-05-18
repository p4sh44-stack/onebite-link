"use client";

import { useState } from "react";
import ThumbnailImage from "@/components/ThumbnailImage";
import { useLinks } from "@/context/LinkContext";

interface LinkCardProps {
  id: string;
  title: string;
  url: string;
  description: string;
  folder: string;
  thumbnail?: string;
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
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

export default function LinkCard({ id, title, url, description, folder, thumbnail }: LinkCardProps) {
  const { deleteLink } = useLinks();
  const [showModal, setShowModal] = useState(false);
  const domain = getDomain(url);

  return (
    <>
      <div className="group relative bg-[var(--card-bg)] border border-[var(--border)] rounded-lg card-hover transition-colors overflow-hidden">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col"
        >
          {thumbnail && <ThumbnailImage src={thumbnail} alt={title} />}
          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 text-[var(--text-sub)] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <span className="text-xs text-[var(--text-sub)] truncate">{domain}</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-2 leading-snug">
                {title}
              </h3>
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
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-2 right-2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--card-bg)] text-[var(--text-sub)] hover:text-[var(--error)] hover:bg-[var(--hover-bg)]"
          aria-label="링크 삭제"
        >
          <TrashIcon />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/25"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 w-80 flex flex-col gap-4 shadow-lg">
            <h3 className="text-base font-semibold text-[var(--text)]">링크 삭제</h3>
            <p className="text-sm text-[var(--text-sub)]">
              <span className="font-medium text-[var(--text)]">"{title}"</span>을(를) 정말 삭제할까요?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 border border-[var(--border)] text-[var(--text)] rounded-md text-sm font-medium btn-secondary transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => { deleteLink(id); setShowModal(false); }}
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
