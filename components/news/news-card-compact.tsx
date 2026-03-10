"use client";

import Image from "next/image";
import Link from "next/link";
import { GuardianArticle } from "@/types/newsTypes";
import { CalendarDays } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function NewsCardCompact({ article }: { article: GuardianArticle }) {
  const { webTitle, webUrl, webPublicationDate, sectionName, thumbnail } = article;

  return (
    <article className="group">
      <Link
        href={webUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-3 items-start py-3 border-b border-border/60 last:border-0"
      >
        {/* Thumbnail */}
        {thumbnail && (
          <div className="relative shrink-0 w-16 h-14 rounded-lg overflow-hidden">
            <Image
              src={thumbnail}
              alt={webTitle}
              fill
              sizes="64px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        {/* Text */}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[10px] font-semibold text-project uppercase tracking-wider">
            {sectionName}
          </span>
          <h4 className="text-xs font-medium leading-snug text-foreground line-clamp-2 group-hover:text-project transition-colors duration-200">
            {webTitle}
          </h4>
          <div className="flex items-center gap-1 text-muted-foreground text-[10px] mt-0.5">
            <CalendarDays size={10} />
            <time dateTime={webPublicationDate}>{formatDate(webPublicationDate)}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
