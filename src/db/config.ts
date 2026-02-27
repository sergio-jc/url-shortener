import { defineConfig } from "drizzle-kit"

import env from "../core/env"

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: "sqlite",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
