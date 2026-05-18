"use client";

import { createContext, useContext, useState } from "react";
import { folders as initialFolders } from "@/data/mockData";

interface FolderContextType {
  folders: string[];
  addFolder: (name: string) => void;
  deleteFolder: (name: string) => void;
}

const FolderContext = createContext<FolderContextType>({
  folders: initialFolders,
  addFolder: () => {},
  deleteFolder: () => {},
});

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<string[]>(initialFolders);

  function addFolder(name: string) {
    const trimmed = name.trim();
    if (trimmed && !folders.includes(trimmed)) {
      setFolders((prev) => [...prev, trimmed]);
    }
  }

  function deleteFolder(name: string) {
    setFolders((prev) => prev.filter((f) => f !== name));
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder, deleteFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  return useContext(FolderContext);
}
