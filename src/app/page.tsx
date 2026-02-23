import CreateShortenURL from "./components/create-shorten-url"
import RecentShortennedURLs from "./components/recent-shortened-urls"
import { TEMP_KEY_VAL_DB } from "./memory"

export default function Home() {
  const recentShortennedURLs: ShortenURLResult[] = Object.values(TEMP_KEY_VAL_DB)

  return (
    <main className="w-full flex-1 pt-12 pb-8 sm:pt-24">
      <h1 className="text-4xl font-semibold">Welcome to your URL Shortener</h1>
      <p className="mpt-2 text-lg text-gray-600 dark:text-gray-300">
        Shorten your long URLs and share them easily.
      </p>
      <CreateShortenURL />
      <RecentShortennedURLs recentShortennedURLs={recentShortennedURLs} />
    </main>
  )
}
