"use client"
import { useActionState } from "react"
import { Scissors } from "lucide-react"
import { toast } from "sonner"
import { User } from "better-auth"

import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { ButtonGroup } from "@/src/components/ui/button-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import {
  createTempShortUrl,
  CreateTempShortUrlFormState,
} from "@/src/actions/short-url/create-temp-short-url"
import { URLDurationOptions } from "@/src/constants/url"
import { FieldError } from "@/src/components/ui/field"
import { saveTempShortUrl } from "@/src/lib/local-storage"
import { MinimalShortUrlDTO } from "@/src/dto/minimal-short-url"

interface CreateTemporalyShortenUrlProps {
  isAuthenticated: boolean
  user: User | null
}

export default function CreateTemporalyShortenUrl(props: CreateTemporalyShortenUrlProps) {
  const { isAuthenticated, user } = props
  const handleCreateShortUrl = async (
    _prevState: CreateTempShortUrlFormState | null,
    formData: FormData,
  ) => {
    const result = await createTempShortUrl({
      longUrl: formData.get("url") as string,
      duration: (formData.get("duration") as URLDurationOptions) ?? "7days",
      userId: user?.id,
    })

    if (result.success) {
      toast.success("URL shortened successfully! The short URL has been copied to your clipboard.")
      await window.navigator.clipboard.writeText(`${window.location.origin}/${result.data?.slug}`)
      if (!isAuthenticated) {
        saveTempShortUrl(MinimalShortUrlDTO.parse(result.data))
      }
    } else {
      toast.error(result.message)
    }

    return result
  }

  const [state, formAction] = useActionState(handleCreateShortUrl, null)

  return (
    <form action={formAction} className="flex w-full gap-1">
      <ButtonGroup className="flex w-full">
        <Input
          autoFocus
          required
          name="url"
          placeholder="Type or paste your long url here: https://example.com/..."
          type="url"
        />
        {/* <Select defaultValue="temporaly">
          <SelectTrigger className="w-full max-w-36">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="temporaly">
                <Clock />
                Temporaly
              </SelectItem>
              <SelectItem value="permanent" disabled>
                <Lock />
                Permanent
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <Select defaultValue="7days" name="duration">
          <SelectTrigger className="w-full max-w-26 sm:max-w-36">
            <SelectValue placeholder="Select a time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Duration</SelectLabel>
              <SelectItem value="1day">1 day</SelectItem>
              <SelectItem value="7days">7 days</SelectItem>
              <SelectItem value="30days">30 days</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="" type="submit">
          <Scissors />
          Shorten
        </Button>
      </ButtonGroup>
      {!state?.success && state?.error?.type === "validation" && (
        <FieldError>{state?.error?.issues?.longUrl}</FieldError>
      )}
    </form>
  )
}
