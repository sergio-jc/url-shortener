"use client"

import type { CSSProperties } from "react"

import {
  type Column,
  type ColumnDef,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableSearch } from "./data-table-search"
import { DataTableViewOptions } from "./data-table-view-options"

function getCommonPinningStyles<TData>(column: Column<TData>): CSSProperties {
  const isPinned = column.getIsPinned()
  const isFirstRightPinnedColumn = isPinned === "right" && column.getIsFirstColumn("right")

  return {
    boxShadow: isFirstRightPinnedColumn ? "4px 0 4px -4px rgba(0,0,0,0.08) inset" : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    minWidth: column.getSize(),
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number
  searchLabel?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  searchLabel,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    enableColumnPinning: true,
    state: {
      columnVisibility,
    },
    initialState: {
      columnPinning: { right: ["actions"] },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <DataTableSearch placeholder={searchLabel} />
        <DataTableViewOptions table={table} />
      </div>
      <div className="flex w-full max-w-full flex-col overflow-hidden">
        <Table
          className="w-full max-w-full border-separate border-spacing-0 overflow-scroll"
          style={{ width: table.getTotalSize() }}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header
                  const pinStyles = getCommonPinningStyles(column)
                  const isPinned = column.getIsPinned()

                  return (
                    <TableHead
                      key={header.id}
                      className={isPinned ? "bg-background border-l" : undefined}
                      style={pinStyles}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="group">
                  {row.getVisibleCells().map((cell) => {
                    const { column } = cell
                    const pinStyles = getCommonPinningStyles(column)
                    const isPinned = column.getIsPinned()

                    return (
                      <TableCell
                        key={cell.id}
                        className={
                          isPinned
                            ? "bg-background group-hover:bg-muted border-l transition-colors"
                            : undefined
                        }
                        style={pinStyles}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination pageCount={pageCount} />
    </div>
  )
}
