import { Clock, Link, Lock } from "lucide-react"

import { ShortenURLType } from "@/src/db/schema"

import CopyToClipboardButton from "./copy-to-clipboard-button"

interface ShortenUrlItemProps {
  slug: string
  originalUrl: string
  createdAt: Date
  type: ShortenURLType
  expiresAt?: Date | null
}

export default function ShortenUrlItem(props: ShortenUrlItemProps) {
  const { slug, originalUrl, createdAt, type, expiresAt } = props

  const formatedDate = new Date(expiresAt ?? createdAt).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  })

  return (
    <article className="flex items-center gap-3 border-b border-b-neutral-200 p-1 dark:border-b-neutral-800">
      <Link size={14} />
      <p className="w-full max-w-16 truncate sm:max-w-28">
        <span className="pr-0.5 font-medium text-gray-500">/</span>
        {slug}
      </p>
      <p className="flex-1 truncate text-neutral-400">{originalUrl}</p>
      {type === ShortenURLType.PERMANENT ? (
        <span className="flex max-w-36 items-center gap-1 text-sm text-neutral-400">
          <Lock size={14} />
          Permanent
        </span>
      ) : (
        <time className="flex max-w-36 items-center gap-1 text-sm text-neutral-400">
          <Clock size={14} />
          {formatedDate}
        </time>
      )}

      <CopyToClipboardButton content={slug} />
    </article>
  )
}
