"use client";

import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/types/newsTypes";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import dateUtlity from "@/utils/dateUtility";

export function NewsCardHero({ article }: { article: ArticleCard }) {
  const { id, title, publishedAt, section, thumbnail, excerpt } = article;

  return (
    <article className="group relative">
      <Link href={`/article/${id}`} className="block">
        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-xl aspect-video lg:aspect-21/9">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 75vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            {/* Category badge */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-project text-white mb-3 uppercase tracking-wider">
              {section}
            </span>

            <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2 md:mb-3 group-hover:text-white/90 transition-colors line-clamp-3">
              {title}
            </h1>

            {excerpt && (
              <p className="text-white/75 text-sm md:text-base leading-relaxed line-clamp-2 mb-3 hidden md:block">
                {excerpt}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white/60 text-xs">
                <CalendarDays size={12} />
                <time dateTime={publishedAt}>{dateUtlity.formatDateOnly(publishedAt)}</time>
              </div>
              <span className="flex items-center gap-1 text-white/70 text-xs font-medium group-hover:text-white transition-colors">
                Read more
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
