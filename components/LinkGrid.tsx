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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {links.map((link, i) => (
        <LinkCard key={i} {...link} />
      ))}
    </div>
  );
}
