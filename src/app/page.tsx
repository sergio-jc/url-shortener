import CreateShortenURL from "./components/create-shorten-url";
import RecentShortennedURLs from "./components/recent-shortened-urls";
import { TEMP_KEY_VAL_DB } from "./memory";

export default function Home() {
  const recentShortennedURLs: ShortenURLResult[] = Object.values(TEMP_KEY_VAL_DB);

  return (
    <main className="flex-1 w-full pt-12 sm:pt-24 pb-8">
      <h1 className="text-4xl font-semibold">Welcome to your URL Shortener</h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        Shorten your long URLs and share them easily.
      </p>
      <CreateShortenURL />
      <RecentShortennedURLs recentShortennedURLs={recentShortennedURLs} />
    </main>
  );
}
