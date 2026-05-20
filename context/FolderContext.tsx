"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export interface Folder {
  id: number;
  name: string;
}

interface FolderContextType {
  folders: Folder[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
  renameFolder: (id: number, newName: string) => Promise<void>;
}

const FolderContext = createContext<FolderContextType>({
  folders: [],
  isAddingFolder: false,
  addFolder: async () => {},
  deleteFolder: async () => {},
  renameFolder: async () => {},
});

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function fetchFolders(userId: string) {
      const { data } = await supabase
        .from("folders")
        .select("id, name")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      if (data) setFolders(data as Folder[]);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchFolders(session.user.id);
      } else {
        setFolders([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function addFolder(name: string) {
    const trimmed = name.trim();
    if (!trimmed || isAddingFolder) return;
    setIsAddingFolder(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("folders")
        .insert({ name: trimmed })
        .select("id, name")
        .single();
      if (data) setFolders((prev) => [...prev, data as Folder]);
    } finally {
      setIsAddingFolder(false);
    }
  }

  async function deleteFolder(id: number) {
    const supabase = createClient();
    await supabase.from("folders").delete().eq("id", id);
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  async function renameFolder(id: number, newName: string) {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("folders")
      .update({ name: trimmed })
      .eq("id", id)
      .select("id, name")
      .single();
    if (data) {
      setFolders((prev) =>
        prev.map((f) => (f.id === id ? (data as Folder) : f))
      );
    }
  }

  return (
    <FolderContext.Provider value={{ folders, isAddingFolder, addFolder, deleteFolder, renameFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  return useContext(FolderContext);
}
