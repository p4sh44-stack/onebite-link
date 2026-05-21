import type { Metadata } from "next";
import MainLayout from "@/components/MainLayout";
import NewLinkForm from "@/components/NewLinkForm";

export const metadata: Metadata = {
  title: "새 링크 추가",
};

export default function NewPage() {
  return (
    <MainLayout mainClassName="flex-1 overflow-y-auto p-8">
      <h2 className="text-xl font-semibold text-[var(--text)] mb-6">새 링크 추가</h2>
      <NewLinkForm />
    </MainLayout>
  );
}
