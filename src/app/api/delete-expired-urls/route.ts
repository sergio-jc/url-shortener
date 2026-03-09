import type { NextRequest } from "next/server"

import { and, eq, isNotNull, isNull, lt } from "drizzle-orm"

import env from "@/src/core/env"
import db from "@/src/db"
import { ShortenURLType, shortUrl } from "@/src/db/schema"

export async function DELETE(request: NextRequest) {
  const secret = request.headers.get("Authorization")?.split(" ")[1] ?? ""

  if (secret !== env.PRIVATE_API_KEY) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }
  const now = new Date()

  const result = await db
    .delete(shortUrl)
    .where(
      and(
        isNull(shortUrl.userId),
        isNotNull(shortUrl.expiresAt),
        lt(shortUrl.expiresAt, now),
        eq(shortUrl.type, ShortenURLType.TEMP),
      ),
    )
    .returning()

  return new Response(
    JSON.stringify({ message: "Expired URLs deleted.", deleted: result.length }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}
