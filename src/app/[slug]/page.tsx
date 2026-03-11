import { eq } from "drizzle-orm"
import { notFound, redirect } from "next/navigation"

import db from "@/src/db"
import { ShortenURLType, shortUrl } from "@/src/db/schema"

export const dynamic = "force-dynamic"

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const result = await db.select().from(shortUrl).where(eq(shortUrl.slug, slug)).limit(1).execute()

  if (!result.length) {
    notFound()
  }

  if (
    result[0].type === ShortenURLType.TEMP &&
    result[0]?.expiresAt &&
    new Date(result[0].expiresAt).getTime() < new Date().getTime()
  ) {
    notFound()
  }

  await db
    .update(shortUrl)
    .set({
      lastUsedAt: new Date(),
      usedCount: result[0].usedCount + 1,
    })
    .where(eq(shortUrl.slug, slug))
    .execute()

  redirect(result[0].longUrl)
}
