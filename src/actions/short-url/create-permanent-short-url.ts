"use server"

import * as z from "zod"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

import { ActionState } from "@/src/types/action"
import { MinimalShortUrlDTO } from "@/src/dto/minimal-short-url"
import db from "@/src/db"
import { ShortenURLType, shortUrl } from "@/src/db/schema"
import { generateRandomSlug } from "@/src/lib/url"

const CreatePermanentShortUrlSchema = z.object({
  longUrl: z.url({ message: "Invalid URL" }).trim(),
  slug: z
    .string()
    .slugify()
    .min(2, { message: "Slug must be at least 3 characters long" })
    .optional(),
  userId: z.string().min(1, { message: "User ID is required" }),
})

export type CreatePermanentShortUrl = z.infer<typeof CreatePermanentShortUrlSchema>

export type CreatePermanentShortUrlFormState = ActionState<
  CreatePermanentShortUrl,
  MinimalShortUrlDTO
>

export async function createPermanentShortUrl(
  data: CreatePermanentShortUrl,
): Promise<CreatePermanentShortUrlFormState> {
  const result = CreatePermanentShortUrlSchema.safeParse(data)

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

  const { longUrl, slug, userId } = result.data

  let resultInsert = null

  const existingShortUrl = await db
    .select()
    .from(shortUrl)
    .where(eq(shortUrl.slug, slug ?? generateRandomSlug()))
    .limit(1)

  if (existingShortUrl.length > 0) {
    return {
      success: false,
      message: "Slug already exists.",
      error: {
        type: "validation",
        issues: {
          slug: ["Slug already exists."],
        },
      },
    }
  }

  try {
    resultInsert = await db
      .insert(shortUrl)
      .values({
        longUrl: longUrl.toString(),
        slug: slug ?? generateRandomSlug(),
        userId: userId ?? null,
        type: ShortenURLType.PERMANENT,
      })
      .returning()
  } catch (error) {
    return {
      success: false,
      message: "Failed to create permanent short URL.",
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
