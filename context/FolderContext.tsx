"use client";

import { createContext, useContext, useState } from "react";
import { folders as initialFolders } from "@/data/mockData";

interface FolderContextType {
  folders: string[];
  addFolder: (name: string) => void;
  deleteFolder: (name: string) => void;
  renameFolder: (oldName: string, newName: string) => void;
}

const FolderContext = createContext<FolderContextType>({
  folders: initialFolders,
  addFolder: () => {},
  deleteFolder: () => {},
  renameFolder: () => {},
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

  function renameFolder(oldName: string, newName: string) {
    const trimmed = newName.trim();
    if (trimmed && trimmed !== oldName && !folders.includes(trimmed)) {
      setFolders((prev) => prev.map((f) => (f === oldName ? trimmed : f)));
    }
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder, deleteFolder, renameFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  return useContext(FolderContext);
}
