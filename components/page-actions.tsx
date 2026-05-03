"use client";

import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { Check, Copy } from "lucide-react";
import { type ComponentProps, useState } from "react";
import { cn } from "@/lib/utils";

const cache = new Map<string, Promise<string>>();

function MarkdownCopyButton({
  markdownUrl,
  ...props
}: ComponentProps<"button"> & { markdownUrl: string }) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    const cached = cache.get(markdownUrl);
    if (cached) {
      return navigator.clipboard.writeText(await cached);
    }
    setLoading(true);
    try {
      const promise = fetch(markdownUrl).then((res) => res.text());
      cache.set(markdownUrl, promise);
      await navigator.clipboard.write([
        new ClipboardItem({ "text/plain": promise }),
      ]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      {...props}
      className={cn(
        buttonVariants({
          color: "secondary",
          size: "sm",
          className: "gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground",
        }),
        props.className
      )}
    >
      {checked ? <Check /> : <Copy />}
      {props.children ?? "复制为 Markdown"}
    </button>
  );
}

export { MarkdownCopyButton };
