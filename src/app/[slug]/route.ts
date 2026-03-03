import type { NextRequest } from "next/server"

import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

import db from "@/src/db"
import { ShortenURLType, shortUrl } from "@/src/db/schema"

export const dynamic = "force-dynamic"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
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

  // update tracking data
  await db
    .update(shortUrl)
    .set({
      lastUsedAt: new Date(),
      usedCount: result[0].usedCount + 1,
    })
    .where(eq(shortUrl.slug, slug))
    .execute()

  return Response.redirect(result[0].longUrl)
}
