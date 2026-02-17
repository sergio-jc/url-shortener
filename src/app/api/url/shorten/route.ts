import { BASE_62_CHARACTERS, SHORTENED_URL_LENGTH, VALID_URL_REGEX } from "@/src/constants/url";
import type { NextRequest } from "next/server";
import { TEMP_KEY_VAL_DB } from "../../../memory";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const url = formData.get("url") as string;

  if (!url) {
    return Response.json({ error: "URL is required" }, { status: 400 });
  }

  if (!VALID_URL_REGEX.test(url)) {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  let generatedSlug = "";

  for (let i = 1; i <= SHORTENED_URL_LENGTH; i++) {
    generatedSlug +=
      BASE_62_CHARACTERS[Math.floor(Math.random() * BASE_62_CHARACTERS.length)];
  }

  const result: ShortenURLResult = {
    slug: generatedSlug,
    longUrl: url,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    type: "temporaly",
  };

  // Save the result to the database
  TEMP_KEY_VAL_DB[generatedSlug] = result;

  console.log("🚀 ~ TEMP_KEY_VAL_DB:", TEMP_KEY_VAL_DB)
  revalidatePath("/");


  return Response.json(result);
}
