"use client"

import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { useUpdateSearchParams } from "@/src/hooks/use-update-search-params"
import { DEFAULT_SEARCH_PARAMS } from "@/src/constants/search-params"

interface DataTablePaginationProps {
  pageCount: number
}

export function DataTablePagination({ pageCount }: DataTablePaginationProps) {
  const searchParams = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  const page = Number(searchParams.get("page") ?? DEFAULT_SEARCH_PARAMS.page)
  const pageSize = Number(searchParams.get("pageSize") ?? DEFAULT_SEARCH_PARAMS.pageSize)

  const canPreviousPage = page > 1
  const canNextPage = page < pageCount

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            updateSearchParams({ pageSize: value, page: 1 })
          }}
        >
          <SelectTrigger className="h-8 w-[70px]" size="sm">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 25, 30, 40, 50].map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="hidden size-8 lg:flex"
            disabled={!canPreviousPage}
            size="icon"
            variant="outline"
            onClick={() => updateSearchParams({ page: 1 })}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            className="size-8"
            disabled={!canPreviousPage}
            size="icon"
            variant="outline"
            onClick={() => updateSearchParams({ page: page - 1 })}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            className="size-8"
            disabled={!canNextPage}
            size="icon"
            variant="outline"
            onClick={() => updateSearchParams({ page: page + 1 })}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            className="hidden size-8 lg:flex"
            disabled={!canNextPage}
            size="icon"
            variant="outline"
            onClick={() => updateSearchParams({ page: pageCount })}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
