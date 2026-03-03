import { User } from "better-auth"
import { desc, eq } from "drizzle-orm"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import db from "@/src/db"
import { ShortenURLType, shortUrl } from "@/src/db/schema"
import { RECENT_SHORT_URLS_AMOUNT } from "@/src/constants/url"
import { Button } from "@/src/components/ui/button"

import ShortenUrlItem from "../shorten-url-item"

interface AuthenticatedGeneratedUrlsProps {
  user: User
}

const AuthenticatedGeneratedUrls = async (props: AuthenticatedGeneratedUrlsProps) => {
  const { user } = props

  const shortUrls = await db
    .select()
    .from(shortUrl)
    .where(eq(shortUrl.userId, user.id))
    .orderBy(desc(shortUrl.createdAt))
    .limit(RECENT_SHORT_URLS_AMOUNT)

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col">
        {shortUrls.map((shortUrl) => (
          <li key={shortUrl.slug} className="contents">
            <ShortenUrlItem
              createdAt={shortUrl.createdAt}
              expiresAt={shortUrl.expiresAt ?? undefined}
              originalUrl={shortUrl.longUrl}
              slug={shortUrl.slug}
              type={shortUrl.type as ShortenURLType}
            />
          </li>
        ))}
      </ol>
      <div className="flex justify-center gap-2">
        <Button asChild variant="outline">
          <Link href="/sign-up">
            <ArrowRight className="size-4" />
            Administra todos tus URLs
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default AuthenticatedGeneratedUrls
