"use client";

import { useState } from "react";
import { useFolders } from "@/context/FolderContext";

export default function NewLinkForm() {
  const { folders } = useFolders();
  const [url, setUrl] = useState("");
  const [folder, setFolder] = useState(folders[0]);

  return (
    <div className="max-w-lg w-full flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text)]">링크 URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="px-3 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--card-bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text)]">폴더</label>
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="px-3 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--text)] bg-[var(--card-bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        >
          {folders.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <button
        disabled={!url.trim()}
        className="px-4 py-2 bg-[var(--accent)] text-white rounded-md text-sm font-medium btn-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-fit"
      >
        저장
      </button>
    </div>
  );
}
