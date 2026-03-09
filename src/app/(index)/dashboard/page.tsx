import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/src/lib/auth"
import { BasicSearchParams, BasicSearchParamsSchema } from "@/src/dto/search-params"

import ShortUrlsTable from "./components/short-urls-table"
import DashboardStats from "./components/dashboard-stats"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<BasicSearchParams>
}) {
  const params = await searchParams
  const basicSearchParams = BasicSearchParamsSchema.parse(params)

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAuthenticated = Boolean(session)

  if (!isAuthenticated || !session?.user?.id) {
    return redirect("/login")
  }

  return (
    <div className="flex w-full max-w-full flex-col py-4">
      <DashboardStats userId={session?.user?.id} />
      <ShortUrlsTable searchParams={basicSearchParams} userId={session?.user?.id} />
    </div>
  )
}
