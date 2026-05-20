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
  deleteLink: (id: number) => Promise<void>;
  updateLink: (id: number, updates: Partial<Omit<LinkItem, "id">>) => Promise<void>;
}

const LinkContext = createContext<LinkContextType>({
  links: [],
  addLink: async () => {},
  deleteLink: async () => {},
  updateLink: async () => {},
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

    async function fetchLinks(userId: string) {
      const { data } = await supabase
        .from("links")
        .select("*, folders(name)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (data) setLinks((data as SupabaseLinkRow[]).map(rowToLinkItem));
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchLinks(session.user.id);
      } else {
        setLinks([]);
      }
    });

    return () => subscription.unsubscribe();
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

  async function deleteLink(id: number) {
    const supabase = createClient();
    await supabase.from("links").delete().eq("id", id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  async function updateLink(id: number, updates: Partial<Omit<LinkItem, "id">>) {
    const supabase = createClient();
    const dbUpdates: Record<string, unknown> = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description || null;
    if (updates.folder_id !== undefined) dbUpdates.folder_id = updates.folder_id;

    const { data } = await supabase
      .from("links")
      .update(dbUpdates)
      .eq("id", id)
      .select("*, folders(name)")
      .single();
    if (data) {
      setLinks((prev) =>
        prev.map((l) => (l.id === id ? rowToLinkItem(data as SupabaseLinkRow) : l))
      );
    }
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
