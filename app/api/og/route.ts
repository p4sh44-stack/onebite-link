function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function extractMeta(html: string, attr: string, value: string): string {
  const patterns = [
    new RegExp(`<meta[^>]+${attr}=["']${value}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${attr}=["']${value}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return decodeEntities(m[1].trim());
  }
  return "";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url") ?? "";

  if (!rawUrl) {
    return Response.json({ error: "url parameter is required" }, { status: 400 });
  }

  const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OneBiteLink/1.0)",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(8000),
    });

    const text = await res.text();
    // OG tags are always in <head>, cap parsing at 100KB
    const html = text.slice(0, 100000);

    const title =
      extractMeta(html, "property", "og:title") ||
      decodeEntities(html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? "");
    const description =
      extractMeta(html, "property", "og:description") ||
      extractMeta(html, "name", "description");
    const image = extractMeta(html, "property", "og:image");
    const ogUrl = extractMeta(html, "property", "og:url") || url;

    return Response.json({ title, description, image, url: ogUrl });
  } catch {
    return Response.json({ error: "failed to fetch page" }, { status: 500 });
  }
}
