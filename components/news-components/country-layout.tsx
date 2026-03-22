"use client";

import { useCallback, useMemo } from "react";
import { Globe } from "lucide-react";
import { useInfiniteCountryNews } from "@/hooks/newsHooks";
import { NewsCardMediumSkeleton } from "@/components/news/news-card-skeleton";
import InfiniteFeed from "@/components/news-components/infinite-feed";



const CountryLayout = ({ country }: { country: string }) => {


  const { data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage, } = useInfiniteCountryNews(country);


  const allArticles = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data]
  );

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);


  const displayName = country.charAt(0).toUpperCase() + country.slice(1);


  return (
    <div className="py-6 md:py-8">


      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <span className="block w-1.5 h-8 rounded-full bg-project" />
        <div className="flex items-center gap-2">
          <Globe size={20} className="text-muted-foreground" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{displayName}</h1>
        </div>
      </div>


      {/* skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <NewsCardMediumSkeleton key={i} />
          ))}
        </div>
      )}


      {/* Error */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <p className="text-lg font-semibold">Failed to load stories</p>
          <p className="text-sm">Please try again later.</p>
        </div>
      )}


      {/* Infinite Feed */}
      {!isLoading && !isError && allArticles.length > 0 && (
        <InfiniteFeed
          articles={allArticles}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={!!hasNextPage}
          onLoadMore={handleLoadMore}
        />
      )}


      {/* Empty */}
      {!isLoading && !isError && allArticles.length === 0 && (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <p className="text-sm">No articles found for &quot;{displayName}&quot;.</p>
        </div>
      )}

    </div>
  );
}

export default CountryLayout;
