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
}

const initialLinks: LinkItem[] = mockLinks.map((l, i) => ({ ...l, id: String(i) }));

const LinkContext = createContext<LinkContextType>({
  links: initialLinks,
  addLink: () => {},
});

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  function addLink(link: Omit<LinkItem, "id">) {
    setLinks((prev) => [{ ...link, id: Date.now().toString() }, ...prev]);
  }

  return (
    <LinkContext.Provider value={{ links, addLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  return useContext(LinkContext);
}
