import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { MinimalShortUrlDTO } from "@/src/dto/minimal-short-url"
import {
  getTempShortUrl,
  removeExpiredTempShortUrl as removeExpiredUrls,
} from "@/src/lib/local-storage"
import { RECENT_SHORT_URLS_AMOUNT, TEMP_SHORT_URL_UPDATED_EVENT } from "@/src/constants/url"

const limitTempShortUrl = (tempShortUrl: MinimalShortUrlDTO[], limit: number) => {
  return tempShortUrl.slice(0, limit)
}

const useLocalSavedShortUrls = () => {
  const [tempShortUrl, setTempShortUrl] = useState<MinimalShortUrlDTO[]>(
    () => getTempShortUrl() ?? [],
  )

  useEffect(() => {
    const handleUpdate = () => setTempShortUrl(() => getTempShortUrl() ?? [])

    window.addEventListener(TEMP_SHORT_URL_UPDATED_EVENT, handleUpdate)

    return () => window.removeEventListener(TEMP_SHORT_URL_UPDATED_EVENT, handleUpdate)
  }, [])

  const exceedLimit = useMemo(
    () => tempShortUrl.length > RECENT_SHORT_URLS_AMOUNT,
    [tempShortUrl.length],
  )

  const thereAreExpiredTempShortUrl = useMemo(
    () => tempShortUrl.some((shortUrl) => shortUrl.expiresAt && shortUrl.expiresAt < new Date()),
    [tempShortUrl],
  )

  const removeExpiredTempShortUrl = () => {
    removeExpiredUrls()
    toast.success("Expired URLs removed successfully")
  }

  useEffect(() => {
    if (exceedLimit && thereAreExpiredTempShortUrl) {
      removeExpiredTempShortUrl()
    }
  }, [thereAreExpiredTempShortUrl, exceedLimit])

  return {
    tempShortUrl: limitTempShortUrl(tempShortUrl, RECENT_SHORT_URLS_AMOUNT),
    exceedLimit,
    thereAreExpiredTempShortUrl,

    setTempShortUrl,
    removeExpiredTempShortUrl,
  }
}

export default useLocalSavedShortUrls
