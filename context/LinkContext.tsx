"use client";

import { createContext, useContext, useState } from "react";
import { mockLinks } from "@/data/mockData";

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  folder: string;
  thumbnail?: string;
}

interface LinkContextType {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => void;
  deleteLink: (id: string) => void;
}

const initialLinks: LinkItem[] = mockLinks.map((l, i) => ({ ...l, id: String(i) }));

const LinkContext = createContext<LinkContextType>({
  links: initialLinks,
  addLink: () => {},
  deleteLink: () => {},
});

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  function addLink(link: Omit<LinkItem, "id">) {
    setLinks((prev) => [{ ...link, id: Date.now().toString() }, ...prev]);
  }

  function deleteLink(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <LinkContext.Provider value={{ links, addLink, deleteLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  return useContext(LinkContext);
}
