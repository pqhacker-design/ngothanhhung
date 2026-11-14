export function normalizeImageUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return trimmed;

  // Match Google Drive /file/d/<ID>/...
  const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1600`;
  }

  // Match Google Drive ?id=<ID> (e.g. open?id=..., uc?id=...)
  if (trimmed.includes('drive.google.com')) {
    try {
      const parsed = new URL(trimmed);
      const id = parsed.searchParams.get('id');
      if (id && !trimmed.includes('drive.google.com/thumbnail')) {
        return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
      }
    } catch {
      // Ignore invalid URL while typing
    }
  }

  return trimmed;
}
