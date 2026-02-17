import { Button } from "@/src/components/ui/button";
import { Clock, Copy, Link, Lock } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import CopyToClipboardButton from "./copy-to-clipboard-button";

interface ShortenUrlItemProps {
  slug: string;
  originalUrl: string;
  createdAt: string;
  type: ShortenURLType;
}

export default function ShortenUrlItem(props: ShortenUrlItemProps) {
  const { slug, originalUrl, createdAt, type } = props;

  const formatedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="flex gap-3 items-center p-1 border-b-neutral-200 dark:border-b-neutral-800 border-b">
      <Link size={14} />
      <p className="max-w-16 sm:max-w-24 w-full truncate">
        <span className="text-gray-500 font-medium pr-0.5">/</span>
        {slug}
      </p>
      <p className="flex-1 text-neutral-400 truncate">{originalUrl}</p>
      {type === "permanent" ? (
        <span className="max-w-36 text-neutral-400 text-sm flex items-center gap-1">
          <Lock size={14} />
          Permanent
        </span>
      ) : (
        <time className="max-w-36 text-neutral-400 text-sm flex items-center gap-1">
          <Clock size={14} /> {formatedDate}
        </time>
      )}

      <CopyToClipboardButton content={slug} />
    </article>
  );
}
