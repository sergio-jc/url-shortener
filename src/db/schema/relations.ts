import { relations } from "drizzle-orm"

import { user, session, account } from "./auth"
import { shortUrl } from "./short-url"

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  shortUrls: many(shortUrl),
}))

export const shortUrlRelations = relations(shortUrl, ({ one }) => ({
  user: one(user, {
    fields: [shortUrl.userId],
    references: [user.id],
  }),
}))
