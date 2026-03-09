import { count, eq, sql } from "drizzle-orm"

import db from "@/src/db"
import { shortUrl } from "@/src/db/schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"

interface DashboardStatsProps {
  userId: string
}

const DashboardStats = async (props: DashboardStatsProps) => {
  const { userId } = props

  const now = new Date()

  const [stats] = await db
    .select({
      totalUrls: count(),
      expiredUrls: count(
        sql<number>`CASE WHEN ${shortUrl.expiresAt} IS NOT NULL AND ${shortUrl.expiresAt} < ${now.getTime()} THEN 1 END`,
      ),
      activeUrls: count(
        sql<number>`CASE WHEN ${shortUrl.expiresAt} IS NULL OR ${shortUrl.expiresAt} >= ${now.getTime()} THEN 1 END`,
      ),
      totalClicks: sql<number>`COALESCE(SUM(${shortUrl.usedCount}), 0)`,
    })
    .from(shortUrl)
    .where(eq(shortUrl.userId, userId))

  const formatedStats = [
    {
      label: "Total URLs",
      value: stats.totalUrls,
    },
    {
      label: "Expired URLs",
      value: stats.expiredUrls,
    },
    {
      label: "Active URLs",
      value: stats.activeUrls,
    },
    {
      label: "Total Clicks",
      value: stats.totalClicks,
    },
  ]

  return (
    <div className="flex w-full max-w-full flex-wrap gap-4 py-2">
      {formatedStats.map((stat) => (
        <Card key={stat.label} className="flex flex-1 flex-col justify-center gap-1 py-2 md:py-4">
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm font-medium">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{stat.value}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default DashboardStats
