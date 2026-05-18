interface LinkCardProps {
  title: string;
  url: string;
  description: string;
  folder: string;
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function LinkCard({ title, url, description, folder }: LinkCardProps) {
  const domain = getDomain(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 p-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg card-hover transition-colors"
    >
      <div className="flex items-center gap-2">
        <svg
          className="w-3.5 h-3.5 text-[var(--text-sub)] shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        <span className="text-xs text-[var(--text-sub)] truncate">{domain}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-[var(--text-sub)] line-clamp-2">{description}</p>
      </div>
      <div className="mt-auto">
        <span className="text-xs bg-[var(--hover-bg)] text-[var(--text-sub)] px-2 py-0.5 rounded">
          {folder}
        </span>
      </div>
    </a>
  );
}
