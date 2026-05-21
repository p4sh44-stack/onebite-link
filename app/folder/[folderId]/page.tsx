import type { Metadata } from "next";
import MainLayout from "@/components/MainLayout";
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
    <MainLayout>
      <LinkGrid folder={folderName} />
    </MainLayout>
  );
}
