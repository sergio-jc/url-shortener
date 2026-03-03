"use client"
import dynamic from "next/dynamic"

import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { Button } from "@/src/components/ui/button"

import { useSyncAlert } from "./use-sync-alert"

interface SyncLocalSavedShortUrlsComponentProps {
  userId?: string
}

const SyncLocalSavedShortUrlsComponent = ({ userId }: SyncLocalSavedShortUrlsComponentProps) => {
  const { showAlert, handleSync, handleIgnore } = useSyncAlert()

  if (!showAlert || !userId) return null

  return (
    <Alert className="absolute top-2 left-0 flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
      <div className="flex flex-col">
        <AlertTitle>Locally saved URLs found</AlertTitle>
        <AlertDescription>Do you want to sync them with your account?</AlertDescription>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="default" onClick={handleSync(userId)}>
          Sync URLs
        </Button>
        <Button size="sm" variant="outline" onClick={handleIgnore}>
          Ignore and delete URLs
        </Button>
      </div>
    </Alert>
  )
}

export default dynamic(() => Promise.resolve(SyncLocalSavedShortUrlsComponent), {
  ssr: false,
  // loading: () => <div>Loading...</div>,
})
