interface LinkCardProps {
  title: string;
  url: string;
  description: string;
  folder: string;
}

export default function LinkCard({
  title,
  url,
  description,
  folder,
}: LinkCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white border rounded-xl hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center text-sm">
          🔗
        </div>
        <span className="text-xs text-gray-400 truncate">{url}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-gray-800 line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
      </div>
      <div className="mt-auto">
        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
          {folder}
        </span>
      </div>
    </div>
  );
}
