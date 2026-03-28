"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArticleCard } from "@/types/newsTypes";
import { CalendarDays } from "lucide-react";
import dateUtlity from "@/utils/dateUtility";



const NewsCardMedium = ({ article }: { article: ArticleCard }) => {
  
  const [imgError, setImgError] = useState(false);

  const { id, title, publishedAt, section, thumbnail, excerpt } = article;

  return (
    <article className="group flex flex-col h-full">

      <Link href={`/article/${id}`} className="flex flex-col h-full">

        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-xl aspect-16/10 mb-3 shrink-0">
          {thumbnail && !imgError ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized={thumbnail.startsWith('http')}
              onError={() => setImgError(true)}
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
              {section}
            </span>

            <span className="text-muted-foreground/40 text-[10px]">•</span>

            <div className="flex items-center gap-1 text-muted-foreground text-[10px]">
              <CalendarDays size={10} />
              <time dateTime={publishedAt}>{dateUtlity.formatDateTime(publishedAt)}</time>
            </div>

          </div>


          {/* Title */}
          <h3 className="font-semibold text-sm md:text-[15px] leading-snug text-foreground line-clamp-3 group-hover:text-project transition-colors duration-200">
            {title}
          </h3>


          {excerpt && (
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2 hidden lg:block">
              {excerpt}
            </p>
          )}

        </div>

      </Link>

    </article>
  );
}

export default NewsCardMedium;
