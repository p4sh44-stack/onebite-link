import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { mockLinks } from "@/data/mockData";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const folderName = decodeURIComponent(folderId);
  const filteredLinks = mockLinks.filter((link) => link.folder === folderName);

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <LinkGrid links={filteredLinks} />
        </main>
      </div>
    </div>
  );
}
