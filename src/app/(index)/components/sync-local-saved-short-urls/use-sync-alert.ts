import { useState } from "react"
import { toast } from "sonner"

import { getTempShortUrl, removeAllTempShortUrl } from "@/src/lib/local-storage"
import { syncLocalSavedShortUrls } from "@/src/actions/short-url/sync-local-saved-short-urls"

export const useSyncAlert = () => {
  const [showAlert, setShowAlert] = useState(() => {
    const tempShortUrl = getTempShortUrl()

    return Boolean(tempShortUrl && tempShortUrl.length > 0)
  })

  const handleIgnore = () => {
    removeAllTempShortUrl()
    setShowAlert(false)
  }

  const handleSync = (userId: string) => async () => {
    const tempShortUrl = getTempShortUrl()

    const result = await syncLocalSavedShortUrls({
      userId: userId,
      tempShortUrl: tempShortUrl ?? [],
    })

    if (result.success) {
      toast.success("Short URLs synced successfully")
      removeAllTempShortUrl()
      setShowAlert(false)
    } else {
      toast.error(result.message)
      setShowAlert(false)
    }
  }

  return { showAlert, setShowAlert, handleSync, handleIgnore }
}
