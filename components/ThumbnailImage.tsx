"use client";

import { useState } from "react";

export default function ThumbnailImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full aspect-video object-cover"
    />
  );
}
