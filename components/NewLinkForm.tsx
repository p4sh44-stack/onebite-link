"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/context/FolderContext";
import { useLinks } from "@/context/LinkContext";

export default function NewLinkForm() {
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState<number | null>(folders[0]?.id ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    const trimmed = url.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      const selectedFolder = folders.find((f) => f.id === folderId);

      await addLink({
        title: data.title || trimmed,
        url: data.url || trimmed,
        description: data.description || "",
        folder: selectedFolder?.name ?? "",
        folder_id: folderId,
        thumbnail: data.image || undefined,
      });

      router.push("/");
    } catch {
      setError("링크 정보를 가져오는 데 실패했어요. 다시 시도해 주세요.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg w-full flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text)]">링크 URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="https://example.com"
          className="px-3 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--card-bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text)]">폴더</label>
        <select
          value={folderId ?? ""}
          onChange={(e) => setFolderId(e.target.value ? Number(e.target.value) : null)}
          className="px-3 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--text)] bg-[var(--card-bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        >
          <option value="">폴더 없음</option>
          {folders.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-[var(--error)]">{error}</p>}
      <button
        onClick={handleSave}
        disabled={!url.trim() || loading}
        className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-fit"
      >
        {loading && (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {loading ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}
