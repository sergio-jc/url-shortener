"use server"

import { revalidatePath } from "next/cache"

import { BASE_62_CHARACTERS, SHORTENED_URL_LENGTH, VALID_URL_REGEX } from "@/src/constants/url"

import { TEMP_KEY_VAL_DB } from "./memory"

export async function createShortUrl(_prevState: unknown, formData: FormData) {
  const url = formData.get("url") as string

  if (!url) {
    return { error: "URL is required" }
  }

  if (!VALID_URL_REGEX.test(url)) {
    return { error: "Invalid URL" }
  }

  let generatedSlug = ""

  for (let i = 1; i <= SHORTENED_URL_LENGTH; i++) {
    generatedSlug += BASE_62_CHARACTERS[Math.floor(Math.random() * BASE_62_CHARACTERS.length)]
  }

  const result: ShortenURLResult = {
    slug: generatedSlug,
    longUrl: url,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    type: "temporaly",
  }

  TEMP_KEY_VAL_DB[generatedSlug] = result

  revalidatePath("/")

  return { success: true, result }
}
