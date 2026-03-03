"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Clock, Lock } from "lucide-react"

import { ShortenURLType, ShortUrl } from "@/src/db/schema"
// import { dataTableSelectColumn } from "@/src/components/data-table/data-table-select-column"

import { RowOptions } from "./row-options"

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  })
}

export const columns: ColumnDef<ShortUrl>[] = [
  // dataTableSelectColumn<ShortUrl>(),
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "longUrl",
    header: "Long URL",
    cell: ({ row }) => {
      const longUrl = row.original.longUrl

      return (
        <div className="max-w-60 truncate">
          <a className="underline" href={longUrl} rel="noopener noreferrer" target="_blank">
            {longUrl}
          </a>
        </div>
      )
    },
  },
  {
    accessorKey: "usedCount",
    header: "Used Count",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type

      if (type === ShortenURLType.PERMANENT) {
        return (
          <span className="flex max-w-36 items-center gap-1 text-sm">
            <Lock size={14} />
            Permanent
          </span>
        )
      } else {
        return (
          <time className="flex max-w-36 items-center gap-1 text-sm">
            <Clock size={14} />
            Temporal
          </time>
        )
      }
    },
  },
  {
    accessorKey: "expiresAt",
    cell: ({ row }) => {
      const expiresAt = row.original.expiresAt

      return expiresAt ? formatDate(new Date(expiresAt)) : "Never"
    },
    // header: ({ column }) => <DataTableColumnHeader column={column} title="Expires At" />,
    header: "Expires At",
  },
  {
    accessorKey: "lastUsedAt",
    cell: ({ row }) => {
      const lastUsedAt = row.original.lastUsedAt

      return lastUsedAt ? formatDate(new Date(lastUsedAt)) : "Never"
    },
    // header: ({ column }) => <DataTableColumnHeader column={column} title="Last Used At" />,
    header: "Last Used At",
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt

      return formatDate(new Date(createdAt))
    },
    // header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <RowOptions row={row} />,
  },
]
