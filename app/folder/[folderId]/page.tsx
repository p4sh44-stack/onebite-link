import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ folderId: string }>;
}): Promise<Metadata> {
  const { folderId } = await params;
  return { title: decodeURIComponent(folderId) };
}

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const folderName = decodeURIComponent(folderId);

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <LinkGrid folder={folderName} />
        </main>
      </div>
    </div>
  );
}
