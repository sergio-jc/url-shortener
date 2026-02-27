import { headers } from "next/headers"
import Link from "next/link"
import Avatar from "boring-avatars"
import { HomeIcon, LayoutDashboardIcon } from "lucide-react"

import { auth } from "@/src/lib/auth"
import { Button } from "@/src/components/ui/button"

import { DropdownMenuAvatar } from "./profile-options"

export async function NavBarOptions() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <Button asChild variant="ghost">
        <Link href="/">
          <HomeIcon />
          Home
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/dashboard">
          <LayoutDashboardIcon />
          Dashboard
        </Link>
      </Button>
      <DropdownMenuAvatar>
        <Avatar className="min-h-full min-w-full" name={session.user.name} variant="marble" />
      </DropdownMenuAvatar>
    </div>
  )
}
