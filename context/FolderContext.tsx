"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface FolderContextType {
  folders: string[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (name: string) => void;
  renameFolder: (oldName: string, newName: string) => void;
}

const FolderContext = createContext<FolderContextType>({
  folders: [],
  isAddingFolder: false,
  addFolder: async () => {},
  deleteFolder: () => {},
  renameFolder: () => {},
});

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<string[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("folders")
      .select("name")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setFolders(data.map((f: { name: string }) => f.name));
      });
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
        .select("name")
        .single();
      if (data) setFolders((prev) => [...prev, data.name]);
    } finally {
      setIsAddingFolder(false);
    }
  }

  function deleteFolder(name: string) {
    setFolders((prev) => prev.filter((f) => f !== name));
  }

  function renameFolder(oldName: string, newName: string) {
    const trimmed = newName.trim();
    if (trimmed && trimmed !== oldName && !folders.includes(trimmed)) {
      setFolders((prev) => prev.map((f) => (f === oldName ? trimmed : f)));
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
