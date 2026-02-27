"use client"

import { Copy } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/src/components/ui/button"

interface CopyToClipboardButtonProps {
  content: string
}

export default function CopyToClipboardButton(props: CopyToClipboardButtonProps) {
  const { content } = props
  const handleCopyShortUrl = () => {
    window.navigator.clipboard.writeText(`${window.location.origin}/${content}`)
    toast.success("Short URL copied to clipboard!")
  }

  return (
    <Button size="sm" variant="ghost" onClick={handleCopyShortUrl}>
      <Copy />
      Copy
    </Button>
  )
}
