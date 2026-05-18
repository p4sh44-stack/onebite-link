"use client";

import { createContext, useContext, useState } from "react";
import { folders as initialFolders } from "@/data/mockData";

interface FolderContextType {
  folders: string[];
  addFolder: (name: string) => void;
}

const FolderContext = createContext<FolderContextType>({
  folders: initialFolders,
  addFolder: () => {},
});

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<string[]>(initialFolders);

  function addFolder(name: string) {
    const trimmed = name.trim();
    if (trimmed && !folders.includes(trimmed)) {
      setFolders((prev) => [...prev, trimmed]);
    }
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  return useContext(FolderContext);
}
