"use server"

import * as z from "zod"
import { revalidatePath } from "next/cache"

import db from "@/src/db"
import { ActionState } from "@/src/types/action"
import { ShortenURLType, shortUrl } from "@/src/db/schema"
import { generateRandomSlug } from "@/src/lib/url"
import { SHORTEN_URL_DURATION, URLDurationOptions } from "@/src/constants/url"
import { MinimalShortUrlDTO } from "@/src/dto/minimal-short-url"

const CreateTempShortUrlSchema = z.object({
  longUrl: z.url({ message: "Invalid URL" }).trim(),
  duration: z.enum(Object.keys(SHORTEN_URL_DURATION) as [string, ...string[]]),
  userId: z.string().optional(),
})

export type CreateTempShortUrl = z.infer<typeof CreateTempShortUrlSchema>

export type CreateTempShortUrlFormState = ActionState<CreateTempShortUrl, MinimalShortUrlDTO>

export async function createTempShortUrl(
  data: CreateTempShortUrl,
): Promise<CreateTempShortUrlFormState> {
  const result = CreateTempShortUrlSchema.safeParse(data)

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

  const generatedSlug = generateRandomSlug()
  const { longUrl, duration, userId } = result.data

  const durationMs = SHORTEN_URL_DURATION[duration as URLDurationOptions]

  let resultInsert = null

  try {
    resultInsert = await db
      .insert(shortUrl)
      .values({
        longUrl: longUrl.toString(),
        type: ShortenURLType.TEMP,
        slug: generatedSlug,
        expiresAt: new Date(Date.now() + durationMs),
        userId: userId ?? null,
      })
      .returning()
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "Failed to create temporary short URL.",
      error: {
        type: "unknown",
        error: error instanceof Error ? error : undefined,
      },
    }
  }

  revalidatePath("/")

  return {
    success: true,
    data: MinimalShortUrlDTO.parse(resultInsert[0]),
  }
}
