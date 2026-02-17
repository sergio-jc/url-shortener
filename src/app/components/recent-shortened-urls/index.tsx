import Link from "next/link";
import ShortenUrlItem from "./shorten-url-item";

interface RecentShortennedURLsProps {
  recentShortennedURLs: ShortenURLResult[];
}

export default async function RecentShortennedURLs(
  props: RecentShortennedURLsProps,
) {
  const { recentShortennedURLs } = props;
  return (
    <div className="flex w-full flex-col">
      <h2 className="mt-8 mb-4 text-xl font-semibold">
        Your Recent Shortened URLs
      </h2>

      <ol className="flex flex-col">
        {recentShortennedURLs.map((shortenURL) => (
          <li key={shortenURL.slug} className="contents">
            <ShortenUrlItem
              type={shortenURL.type}
              slug={shortenURL.slug}
              originalUrl={shortenURL.longUrl}
              createdAt={shortenURL.createdAt}
            />
          </li>
        ))}
      </ol>
      {/* <p className="mt-4 text-sm text-neutral-500">
        See all your shortened URLs in the{" "}
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          dashboard
        </Link>
        .
      </p> */}
    </div>
  );
}
