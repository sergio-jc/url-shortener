import Link from "next/link"
import { LinkIcon, ArrowLeftIcon } from "lucide-react"

import { Button } from "@/src/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center bg-white px-2 sm:px-4 dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
            <LinkIcon className="size-8 text-zinc-400" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold sm:text-4xl">Link not found</h1>
            <p className="text-muted-foreground max-w-sm text-base">
              This link does not exist or has expired. Please check that the URL is correct.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeftIcon className="size-4" />
              Shorten a link now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
