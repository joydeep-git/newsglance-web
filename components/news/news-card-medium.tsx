"use client";

import Image from "next/image";
import Link from "next/link";
import { GuardianArticle } from "@/types/newsTypes";
import { CalendarDays } from "lucide-react";
import dateUtlity from "@/utils/dateUtility";



export function NewsCardMedium({ article }: { article: GuardianArticle }) {
  const { webTitle, webUrl, webPublicationDate, sectionName, thumbnail, trailText } = article;

  return (
    <article className="group flex flex-col h-full">
      <Link href={webUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-xl aspect-16/10 mb-3 shrink-0">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={webTitle}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-xl" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold text-project uppercase tracking-wider">
              {sectionName}
            </span>
            <span className="text-muted-foreground/40 text-[10px]">•</span>
            <div className="flex items-center gap-1 text-muted-foreground text-[10px]">
              <CalendarDays size={10} />
              <time dateTime={webPublicationDate}>{dateUtlity.formatDateTime(webPublicationDate)}</time>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm md:text-[15px] leading-snug text-foreground line-clamp-3 group-hover:text-project transition-colors duration-200">
            {webTitle}
          </h3>

          {trailText && (
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2 hidden lg:block">
              {trailText}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
