import type { NextRequest } from "next/server"

import { TEMP_KEY_VAL_DB } from "../memory"

export const dynamic = "force-dynamic"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const result = TEMP_KEY_VAL_DB[slug]

  if (!result) {
    return Response.json({ error: "URL not found" }, { status: 404 })
  }

  return Response.redirect(result.longUrl)
}
