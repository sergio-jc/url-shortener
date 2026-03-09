import { User } from "better-auth"

import UnauthenticatedGeneratedUrls from "./unauthenticated-generated-urls"
import AuthenticatedGeneratedUrls from "./authenticated-generated-urls"

interface RecentShortennedURLsProps {
  isAuthenticated: boolean
  user: User | null
}

export default async function RecentShortennedURLs(props: RecentShortennedURLsProps) {
  const { isAuthenticated, user } = props

  if (isAuthenticated && user) {
    return <AuthenticatedGeneratedUrls user={user} />
  }

  return <UnauthenticatedGeneratedUrls />
}
