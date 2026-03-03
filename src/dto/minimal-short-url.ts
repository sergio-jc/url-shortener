import * as z from "zod"

import { ShortenURLType } from "@/src/db/schema"

export const MinimalShortUrlDTO = z.object({
  longUrl: z.string(),
  slug: z.string(),
  expiresAt: z.date().optional().or(z.null()),
  createdAt: z.date(),
  type: z.enum(Object.values(ShortenURLType)),
  id: z.string(),
})

export type MinimalShortUrlDTO = z.infer<typeof MinimalShortUrlDTO>
