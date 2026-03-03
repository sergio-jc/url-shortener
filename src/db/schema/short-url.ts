import { randomUUID } from "node:crypto"

import { sql } from "drizzle-orm"
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core"

import { user } from "./auth"

export const ShortenURLType = {
  TEMP: "TEMP",
  PERMANENT: "PERM",
} as const

export type ShortenURLType = (typeof ShortenURLType)[keyof typeof ShortenURLType]

export const shortUrl = sqliteTable(
  "short_url",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    longUrl: text("long_url").notNull(),
    type: text("type", {
      enum: Object.values(ShortenURLType) as [string, ...string[]],
    }).notNull(),
    slug: text("slug").notNull().unique(),
    usedCount: integer("used_count").default(0).notNull(),
    lastUsedAt: integer("last_used_at", { mode: "timestamp_ms" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }),
  },
  (table) => [
    index("short_url_user_id_idx").on(table.userId),
    index("short_url_expires_at_idx").on(table.expiresAt),
  ],
)

export type NewShortUrl = typeof shortUrl.$inferInsert

export type ShortUrl = typeof shortUrl.$inferSelect
