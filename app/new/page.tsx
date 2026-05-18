import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewLinkForm from "@/components/NewLinkForm";

export default function NewPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">새 링크 추가</h2>
          <NewLinkForm />
        </main>
      </div>
    </div>
  );
}
