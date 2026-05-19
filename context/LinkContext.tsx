"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export interface LinkItem {
  id: number;
  title: string;
  url: string;
  description: string;
  folder: string;
  folder_id: number | null;
  thumbnail?: string;
}

interface LinkContextType {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => Promise<void>;
  deleteLink: (id: number) => void;
  updateLink: (id: number, updates: Partial<Omit<LinkItem, "id">>) => void;
}

const LinkContext = createContext<LinkContextType>({
  links: [],
  addLink: async () => {},
  deleteLink: () => {},
  updateLink: () => {},
});

type SupabaseLinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
  folders: { name: string } | null;
};

function rowToLinkItem(row: SupabaseLinkRow): LinkItem {
  return {
    id: row.id,
    title: row.title ?? row.url,
    url: row.url,
    description: row.description ?? "",
    folder: row.folders?.name ?? "",
    folder_id: row.folder_id,
    thumbnail: row.thumbnail_url ?? undefined,
  };
}

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("links")
      .select("*, folders(name)")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setLinks((data as SupabaseLinkRow[]).map(rowToLinkItem));
      });
  }, []);

  async function addLink(link: Omit<LinkItem, "id">) {
    const supabase = createClient();
    const { data } = await supabase
      .from("links")
      .insert({
        url: link.url,
        title: link.title,
        description: link.description || null,
        thumbnail_url: link.thumbnail || null,
        folder_id: link.folder_id ?? null,
      })
      .select("*, folders(name)")
      .single();
    if (data) setLinks((prev) => [rowToLinkItem(data as SupabaseLinkRow), ...prev]);
  }

  function deleteLink(id: number) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function updateLink(id: number, updates: Partial<Omit<LinkItem, "id">>) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  }

  return (
    <LinkContext.Provider value={{ links, addLink, deleteLink, updateLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  return useContext(LinkContext);
}
