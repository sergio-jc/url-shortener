import { headers } from "next/headers"

import { auth } from "../lib/auth"

import CreateShortenURL from "./components/create-shorten-url"
import RecentShortennedURLs from "./components/recent-shortened-urls"
import WelcomeMessage from "./components/welcome-message"
import { TEMP_KEY_VAL_DB } from "./memory"

export default async function Home() {
  const recentShortennedURLs: ShortenURLResult[] = Object.values(TEMP_KEY_VAL_DB)
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const isAuthenticated = Boolean(session)

  return (
    <main className="w-full flex-1 pt-12 pb-8 sm:pt-24">
      <WelcomeMessage isAuthenticated={isAuthenticated} />
      <CreateShortenURL />
      <RecentShortennedURLs recentShortennedURLs={recentShortennedURLs} />
    </main>
  )
}
