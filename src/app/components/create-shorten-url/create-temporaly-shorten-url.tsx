"use client";
import { useActionState } from "react";
import { Scissors } from "lucide-react";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { ButtonGroup } from "@/src/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { toast } from "sonner";
import { createShortUrl } from "../../actions";

export default function CreateTemporalyShortenUrl() {

  const handleCreateShortUrl = async (_prevState: unknown, formData: FormData) => {
    const result = await createShortUrl(null, formData);
    if (result.success) {
      toast.success("URL shortened successfully! The short URL has been copied to your clipboard.");
      window.navigator.clipboard.writeText(`${window.location.origin}/${result.result.slug}`);
    } else {
      toast.error(result.error);
    }
  }

  const [, formAction] = useActionState(handleCreateShortUrl, null);

  return (
    <form className="flex w-full gap-1" action={formAction}>
      <ButtonGroup className="flex w-full">
        <Input
          autoFocus
          required
          placeholder="Type or paste your long url here: https://example.com/..."
          name="url"
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
        <Select defaultValue="7days">
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
    </form>
  );
}
