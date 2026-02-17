"use client";

import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface CopyToClipboardButtonProps {
  content: string;
}

export default function CopyToClipboardButton(props: CopyToClipboardButtonProps) {
  const { content } = props;
  const handleCopyShortUrl = () => {
    window.navigator.clipboard.writeText(
      `${window.location.origin}/${content}`,
    );
    toast.success("Short URL copied to clipboard!");
  };
  return (
    <Button variant="ghost" size="sm" onClick={handleCopyShortUrl}>
      <Copy /> Copy
    </Button>
  );
}
