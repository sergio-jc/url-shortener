"use server"

import * as z from "zod"
import { and, eq } from "drizzle-orm"

import db from "@/src/db"
import { ActionState } from "@/src/types/action"
import { shortUrl } from "@/src/db/schema"

const DeleteShortUrlSchema = z.object({
  urlId: z.string(),
  userId: z.string(),
})

export type DeleteShortUrl = z.infer<typeof DeleteShortUrlSchema>

export type DeleteShortUrlFormState = ActionState<DeleteShortUrl, boolean>

export async function deleteShortUrl(data: DeleteShortUrl): Promise<DeleteShortUrlFormState> {
  const result = DeleteShortUrlSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      message: "Invalid data.",
      error: {
        type: "validation",
        issues: z.flattenError(result.error).fieldErrors,
      },
    }
  }

  const { urlId, userId } = result.data

  try {
    await db.delete(shortUrl).where(and(eq(shortUrl.id, urlId), eq(shortUrl.userId, userId)))
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete short URL.",
      error: {
        type: "unknown",
        error: error instanceof Error ? error : undefined,
      },
    }
  }

  return {
    success: true,
    data: true,
  }
}
