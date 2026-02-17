type ShortenURLType = "temporaly" | "permanent";

interface ShortenURLResult {
  slug: string;
  longUrl: string;
  createdAt: string;
  expiresAt: string;
  type: ShortenURLType;
}