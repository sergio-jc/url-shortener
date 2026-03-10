import { User } from "better-auth"
import { toast } from "sonner"
import { useActionState } from "react"
import { Loader2, Scissors } from "lucide-react"

import { ButtonGroup } from "@/src/components/ui/button-group"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { FieldError } from "@/src/components/ui/field"
import {
  createPermanentShortUrl,
  CreatePermanentShortUrlFormState,
} from "@/src/actions/short-url/create-permanent-short-url"

interface CreatePermanentShortenUrlComponentProps {
  user: User
}

export const CreatePermanentShortenUrlComponent = (
  props: CreatePermanentShortenUrlComponentProps,
) => {
  const { user } = props
  const handleCreateShortUrl = async (
    _prevState: CreatePermanentShortUrlFormState | null,
    formData: FormData,
  ) => {
    const result = await createPermanentShortUrl({
      longUrl: formData.get("url") as string,
      slug: formData.get("slug") as string,
      userId: user.id,
    })

    if (result.success) {
      toast.success("URL shortened successfully! The short URL has been copied to your clipboard.")
      await window.navigator.clipboard.writeText(`${window.location.origin}/${result.data?.slug}`)
    } else {
      toast.error(result.message)
    }

    return result
  }

  const [state, formAction, isPending] = useActionState(handleCreateShortUrl, null)

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <form action={formAction} className="flex w-full gap-1">
        <ButtonGroup className="flex w-full">
          <Input
            autoFocus
            required
            name="url"
            placeholder="Type or paste your long url here: https://example.com/..."
            type="url"
          />
          <Input
            className="w-full max-w-36 sm:max-w-60"
            name="slug"
            placeholder="Type your slug here: example"
            type="text"
          />
          <Button className="" disabled={isPending} type="submit">
            {isPending ? <Loader2 className="animate-spin" /> : <Scissors />}
            Shorten
          </Button>
        </ButtonGroup>
      </form>
      {!state?.success && state?.error?.type === "validation" && (
        <FieldError>{Object.values(state?.error?.issues ?? {}).join(", ")}</FieldError>
      )}
    </div>
  )
}
