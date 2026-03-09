"use client"
import { User } from "better-auth"

import { Button } from "@/src/components/ui/button"

import { CreatePermanentShortenUrlComponent } from "./createt-permanent-form"

interface CreatePermanentShortenUrlProps {
  isAuthenticated: boolean
  user: User | null
}

export default function CreatePermanentShortenUrl(props: CreatePermanentShortenUrlProps) {
  const { isAuthenticated, user } = props

  if (!isAuthenticated || !user) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <p>Register to create permanent shortened URLs.</p>
        <div className="flex gap-2">
          <Button>Register</Button>
          <Button variant="outline">Login</Button>
        </div>
      </div>
    )
  }

  return <CreatePermanentShortenUrlComponent user={user} />
}
