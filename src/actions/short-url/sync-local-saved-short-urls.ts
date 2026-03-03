"use server"

import * as z from "zod"
import { and, inArray, isNull } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import db from "@/src/db"
import { shortUrl } from "@/src/db/schema"
import { ActionState } from "@/src/types/action"
import { MinimalShortUrlDTO } from "@/src/dto/minimal-short-url"

const SyncLocalSavedShortUrlsSchema = z.object({
  userId: z.string(),
  tempShortUrl: z.array(MinimalShortUrlDTO),
})

export type SyncLocalSavedShortUrls = z.infer<typeof SyncLocalSavedShortUrlsSchema>

export type SyncLocalSavedShortUrlsFormState = ActionState<SyncLocalSavedShortUrls, boolean>

export const syncLocalSavedShortUrls = async (
  data: SyncLocalSavedShortUrls,
): Promise<SyncLocalSavedShortUrlsFormState> => {
  const result = SyncLocalSavedShortUrlsSchema.safeParse(data)

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
  const { userId, tempShortUrl } = result.data

  try {
    await db
      .update(shortUrl)
      .set({
        userId: userId,
      })
      .where(
        and(
          inArray(
            shortUrl.id,
            tempShortUrl.map((shortUrl) => shortUrl.id),
          ),
          isNull(shortUrl.userId),
        ),
      )
  } catch (error) {
    return {
      success: false,
      message: "Failed to sync local saved short URLs.",
      error: {
        type: "unknown",
        error: error instanceof Error ? error : undefined,
      },
    }
  }
  revalidatePath("/")

  return {
    success: true,
    data: true,
  }
}
