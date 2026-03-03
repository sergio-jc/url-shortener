import { and, eq, like } from "drizzle-orm"

import db from "@/src/db"
import { shortUrl } from "@/src/db/schema"
import { DataTable } from "@/src/components/data-table"
import { BasicSearchParams } from "@/src/dto/search-params"

import { columns } from "./columns"

interface ShortUrlsTableProps {
  userId: string
  searchParams: BasicSearchParams
}

const ShortUrlsTable = async (props: ShortUrlsTableProps) => {
  const { userId, searchParams } = props
  const { page, pageSize, search } = searchParams

  const whereClause = and(
    eq(shortUrl.userId, userId),
    search ? like(shortUrl.longUrl, `%${search}%`) : undefined,
  )

  const basequery = db.select().from(shortUrl).where(whereClause)
  const data = await basequery.limit(Number(pageSize)).offset((Number(page) - 1) * Number(pageSize))

  const total = await db.$count(shortUrl, whereClause)
  const pageCount = Math.max(1, Math.ceil(total / Number(pageSize)))

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      pageCount={pageCount}
      searchLabel="Search by long URL"
    />
  )
}

export default ShortUrlsTable
