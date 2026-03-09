import { headers } from "next/headers"

import { auth } from "../../lib/auth"

import CreateShortenURL from "./components/create-shorten-url"
import RecentShortennedURLs from "./components/recent-shortened-urls"
import WelcomeMessage from "./components/welcome-message"
import SyncLocalSavedShortUrls from "./components/sync-local-saved-short-urls"

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const isAuthenticated = Boolean(session)

  return (
    <main className="relative w-full flex-1 pt-12 pb-8 sm:pt-24">
      <SyncLocalSavedShortUrls userId={session?.user?.id} />
      <WelcomeMessage isAuthenticated={isAuthenticated} />
      <CreateShortenURL isAuthenticated={isAuthenticated} user={session?.user ?? null} />
      <RecentShortennedURLs isAuthenticated={isAuthenticated} user={session?.user ?? null} />
    </main>
  )
}
