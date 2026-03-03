import { LOCAL_STORAGE_TEMP_SHORT_URL_KEY, TEMP_SHORT_URL_UPDATED_EVENT } from "../constants/url"
import { MinimalShortUrlDTO } from "../dto/minimal-short-url"

export const getTempShortUrl = (): MinimalShortUrlDTO[] | null => {
  if (typeof window === "undefined") return null

  const tempShortUrl = window.localStorage.getItem(LOCAL_STORAGE_TEMP_SHORT_URL_KEY)

  if (!tempShortUrl) return null
  const tempShortUrlArray = JSON.parse(tempShortUrl)

  return orderTempShortUrl(
    tempShortUrlArray.map((shortUrl: MinimalShortUrlDTO) =>
      MinimalShortUrlDTO.parse({
        ...shortUrl,
        expiresAt: shortUrl.expiresAt ? new Date(shortUrl.expiresAt) : null,
        createdAt: new Date(shortUrl.createdAt),
      }),
    ),
  )
}

export const getTempShortUrlArrayLength = (): number => {
  return getTempShortUrl()?.length ?? 0
}

export const removeTempShortUrl = (id: string) => {
  let tempShortUrlArray = getTempShortUrl()

  if (!tempShortUrlArray) return

  if (tempShortUrlArray) {
    tempShortUrlArray = tempShortUrlArray.filter(
      (shortUrl: MinimalShortUrlDTO) => shortUrl.id !== id,
    )
  }
  window.localStorage.setItem(
    LOCAL_STORAGE_TEMP_SHORT_URL_KEY,
    JSON.stringify(orderTempShortUrl(tempShortUrlArray)),
  )
  window.dispatchEvent(new Event(TEMP_SHORT_URL_UPDATED_EVENT))
}

export const saveTempShortUrl = (shortUrl: MinimalShortUrlDTO) => {
  let tempShortUrlArray = getTempShortUrl()

  if (tempShortUrlArray) {
    tempShortUrlArray.push(shortUrl)
  } else {
    tempShortUrlArray = [shortUrl]
  }
  window.localStorage.setItem(
    LOCAL_STORAGE_TEMP_SHORT_URL_KEY,
    JSON.stringify(orderTempShortUrl(tempShortUrlArray)),
  )
  window.dispatchEvent(new Event(TEMP_SHORT_URL_UPDATED_EVENT))
}

export const subscribeToTempShortUrlUpdated = (callback: () => void) => {
  window.addEventListener(TEMP_SHORT_URL_UPDATED_EVENT, callback)

  return () => window.removeEventListener(TEMP_SHORT_URL_UPDATED_EVENT, callback)
}

export const orderTempShortUrl = (
  tempShortUrl: MinimalShortUrlDTO[],
  order: "asc" | "desc" = "desc",
) => {
  return tempShortUrl.sort((a, b) => {
    if (order === "asc") {
      return a.createdAt.getTime() - b.createdAt.getTime()
    }

    return b.createdAt.getTime() - a.createdAt.getTime()
  })
}

export const removeAllTempShortUrl = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_TEMP_SHORT_URL_KEY)
  window.dispatchEvent(new Event(TEMP_SHORT_URL_UPDATED_EVENT))
}

export const removeExpiredTempShortUrl = () => {
  const tempShortUrl = getTempShortUrl()

  if (!tempShortUrl) return

  const now = new Date()
  const unExpiredShortUrls = tempShortUrl.filter(
    (shortUrl) => shortUrl.expiresAt && shortUrl.expiresAt > now,
  )

  window.localStorage.setItem(LOCAL_STORAGE_TEMP_SHORT_URL_KEY, JSON.stringify(unExpiredShortUrls))
  window.dispatchEvent(new Event(TEMP_SHORT_URL_UPDATED_EVENT))
}
