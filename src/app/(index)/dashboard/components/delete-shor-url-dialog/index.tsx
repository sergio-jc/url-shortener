import { Loader2Icon, Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog"
import { authClient } from "@/src/lib/auth-client"
import { deleteShortUrl } from "@/src/actions/short-url/delete-short-url"

interface DeleteShortUrlDialogProps {
  shortUrlId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DeleteShortUrlDialog = ({
  shortUrlId,
  open,
  onOpenChange,
}: DeleteShortUrlDialogProps) => {
  const router = useRouter()
  const { data, isPending } = authClient.useSession()

  const handleDeleteShortUrl = async () => {
    if (!data?.user?.id) {
      return
    }

    const result = await deleteShortUrl({
      urlId: shortUrlId,
      userId: data.user.id,
    })

    if (result.success) {
      toast.success("Short URL deleted successfully")
      onOpenChange(false)
      setTimeout(() => router.refresh(), 300)
    } else {
      toast.error("Failed to delete short URL")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete short URL?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this short URL and all its related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            variant="destructive"
            onClick={handleDeleteShortUrl}
          >
            {isPending ? <Loader2Icon className="size-4 animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
