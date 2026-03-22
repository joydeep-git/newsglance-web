"use client";

import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/types/newsTypes";
import { CalendarDays } from "lucide-react";
import dateUtlity from "@/utils/dateUtility";

const NewsCardCompact = ({ article }: { article: ArticleCard }) => {


  const { id, title, publishedAt, section, thumbnail } = article;

  return (
    <article className="group">

      <Link href={`/article/${id}`} className="flex gap-3 items-start py-3 border-b border-border/60 last:border-0">

        {thumbnail && (
          <div className="relative shrink-0 w-16 h-14 rounded-lg overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="64px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}


        <div className="flex flex-col gap-1 min-w-0">

          <span className="text-[10px] font-semibold text-project uppercase tracking-wider">
            {section}
          </span>

          <h4 className="text-xs font-medium leading-snug text-foreground line-clamp-2 group-hover:text-project transition-colors duration-200">
            {title}
          </h4>

          <div className="flex items-center gap-1 text-muted-foreground text-[10px] mt-0.5">
            <CalendarDays size={10} />
            <time dateTime={publishedAt}>{dateUtlity.formatDateOnly(publishedAt)}</time>
          </div>

        </div>

      </Link>

    </article>
  );
}


export default NewsCardCompact;