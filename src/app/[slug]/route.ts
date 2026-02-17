import type { NextRequest } from "next/server";
import { TEMP_KEY_VAL_DB } from "../memory";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  console.log("🚀 ~ GET ~ slug:", slug)
  const result = TEMP_KEY_VAL_DB[slug];
  console.log("🚀 ~ GET ~ TEMP_KEY_VAL_DB:", TEMP_KEY_VAL_DB)
  console.log("🚀 ~ GET ~ result:", result)
  if (!result) {
    return Response.json({ error: "URL not found" }, { status: 404 });
  }
  return Response.redirect(result.longUrl);
}
