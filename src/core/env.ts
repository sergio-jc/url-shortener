import "@/env-config.ts"
import { ZodError, z } from "zod"

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_AUTH_TOKEN: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  PRIVATE_API_KEY: z.string(),
  CRON_SECRET: z.string().optional(),
})

export type EnvSchema = z.infer<typeof EnvSchema>

try {
  EnvSchema.parse(process.env)
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n"

    error.issues.forEach((issue) => {
      message += issue.path[0]!.toString() + "\n"
    })
    const e = new Error(message)

    e.stack = ""
    throw e
  } else {
    console.error(error)
  }
}

export default EnvSchema.parse(process.env)
