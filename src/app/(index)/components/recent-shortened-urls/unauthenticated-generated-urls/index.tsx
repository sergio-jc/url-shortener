"use client"

import dynamic from "next/dynamic"
import { ArrowRight, Trash } from "lucide-react"
import Link from "next/link"

import { Button } from "@/src/components/ui/button"

import ShortenUrlItem from "../shorten-url-item"

import useLocalSavedShortUrls from "./use-local-saved-short-urls"

function UnauthenticatedGeneratedUrlsComponent() {
  const { tempShortUrl, exceedLimit, thereAreExpiredTempShortUrl, removeExpiredTempShortUrl } =
    useLocalSavedShortUrls()

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col">
        {tempShortUrl?.map((shortenURL) => (
          <li key={shortenURL.slug} className="contents">
            <ShortenUrlItem
              createdAt={shortenURL.createdAt}
              expiresAt={shortenURL.expiresAt}
              originalUrl={shortenURL.longUrl}
              slug={shortenURL.slug}
              type={shortenURL.type}
            />
          </li>
        ))}
      </ol>
      <div className="flex justify-center gap-2">
        {thereAreExpiredTempShortUrl && (
          <Button variant="outline" onClick={removeExpiredTempShortUrl}>
            <Trash className="size-4" />
            Remove expired URLs
          </Button>
        )}
        {exceedLimit && (
          <Button asChild variant="outline">
            <Link href="/sign-up">
              <ArrowRight className="size-4" />
              Registrate para ver todas las URLs
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(UnauthenticatedGeneratedUrlsComponent), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})
