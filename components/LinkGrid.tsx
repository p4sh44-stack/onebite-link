"use client";

import LinkCard from "@/components/LinkCard";
import { useLinks } from "@/context/LinkContext";

interface LinkGridProps {
  folder?: string;
}

export default function LinkGrid({ folder }: LinkGridProps) {
  const { links } = useLinks();
  const filtered = folder ? links.filter((l) => l.folder === folder) : links;

  if (filtered.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-[var(--text-sub)]">저장된 링크가 없어요</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
      {filtered.map((link) => (
        <LinkCard key={link.id} {...link} />
      ))}
    </div>
  );
}
