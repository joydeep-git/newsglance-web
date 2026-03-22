"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { InfiniteFeedProps } from "@/types/newsTypes";
import NewsCardMedium from "@/components/news/news-card-medium";
import { NewsCardMediumSkeleton } from "@/components/news/news-card-skeleton";



const InfiniteFeed = (
  {
    articles,
    isFetchingNextPage,
    hasNextPage,
    onLoadMore,
    skeletonCount = 4,
  }: InfiniteFeedProps) => {


  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" } // fetch news before going this px
    );

    observer.observe(el);

    return () => observer.disconnect();

  }, [hasNextPage, isFetchingNextPage, onLoadMore]);



  return (
    <div className="flex flex-col gap-5">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {articles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min((i % 12) * 0.03, 0.36) }}
          >
            <NewsCardMedium article={article} />
          </motion.div>
        ))}


        {/* Skeleton half-cards */}
        {isFetchingNextPage &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={`skel-${i}`} className="opacity-60">
              <NewsCardMediumSkeleton />
            </div>
          ))}
      </div>


      {/* Sentinel to hit load-more */}
      <div ref={sentinelRef} aria-hidden="true" className="h-1" />


      {/* end page indicator */}
      {!hasNextPage && articles.length > 0 && (
        <p className="text-center text-xs text-muted-foreground py-6">
          You&apos;ve reached the end
        </p>
      )}

    </div>
  );
}


export default InfiniteFeed;