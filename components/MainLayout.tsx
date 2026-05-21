"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
  mainClassName = "flex-1 overflow-y-auto",
}: {
  children: React.ReactNode;
  mainClassName?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)]">
      <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={mainClassName}>{children}</main>
      </div>
    </div>
  );
}
