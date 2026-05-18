import LinkCard from "@/components/LinkCard";
import { mockLinks } from "@/data/mockData";

interface Link {
  title: string;
  url: string;
  description: string;
  folder: string;
}

interface LinkGridProps {
  links?: Link[];
}

export default function LinkGrid({ links = mockLinks }: LinkGridProps) {
  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-[var(--text-sub)]">
        <p className="text-sm">저장된 링크가 없어요</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
      {links.map((link, i) => (
        <LinkCard key={i} {...link} />
      ))}
    </div>
  );
}
