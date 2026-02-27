import { drizzle } from "drizzle-orm/libsql"

import env from "@/src/core/env"

const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
})

export type db = typeof db

export default db
