"use client"

import { useState } from "react"
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

import { DeleteShortUrlDialog } from "../delete-shor-url-dialog"

export const RowOptions = ({ row }: { row: Row<ShortUrl> }) => {
  const shortUrl = row.original
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleCopyShortUrl = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/${shortUrl.slug}`)
    toast.success("Short URL copied to clipboard!")
  }

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true)
  }

  return (
    <>
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
          <DropdownMenuItem onClick={handleOpenDeleteDialog}>
            <Trash />
            Delete Short URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteShortUrlDialog
        open={deleteDialogOpen}
        shortUrlId={shortUrl.id}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  )
}
