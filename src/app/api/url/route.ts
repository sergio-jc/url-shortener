import { TEMP_KEY_VAL_DB } from "../../memory"

export const dynamic = "force-dynamic"

export async function GET() {
  console.log(TEMP_KEY_VAL_DB)

  return Response.json(TEMP_KEY_VAL_DB)
}
