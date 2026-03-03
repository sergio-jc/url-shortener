"use client"

import { Row } from "@tanstack/react-table"
import { Copy, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { ShortUrl } from "@/src/db/schema"

export const RowOptions = ({ row }: { row: Row<ShortUrl> }) => {
  const shortUrl = row.original

  const handleCopyShortUrl = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/${shortUrl.slug}`)
    toast.success("Short URL copied to clipboard!")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyShortUrl}>
          <Copy />
          Copy Short URL
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash />
          Delete Short URL
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
