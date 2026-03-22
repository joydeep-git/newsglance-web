"use client";

import { useCallback, useMemo } from "react";
import { Search } from "lucide-react";
import { useInfiniteSearchNews } from "@/hooks/newsHooks";
import { NewsCardMediumSkeleton } from "@/components/news/news-card-skeleton";
import InfiniteFeed from "@/components/news-components/infinite-feed";



const SearchLayout = ({ query }: { query: string }) => {

  const { data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteSearchNews(query);

  const allArticles = useMemo(() => data?.pages.flatMap((p) => p.data) ?? [], [data]);

  const handleLoadMore = useCallback(
    () => fetchNextPage(),
    [fetchNextPage]
  );


  return (
    <div className="py-6 md:py-8">

      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">

        <span className="block w-1.5 h-8 rounded-full bg-project" />

        <div>

          <div className="flex items-center gap-2">
            <Search size={18} className="text-muted-foreground" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              &ldquo;{query}&rdquo;
            </h1>
          </div>

          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading
              ? "Searching…"
              : allArticles.length > 0
                ? `${allArticles.length} results`
                : "No results found"}
          </p>

        </div>

      </div>

      {/* short character message */}
      {query.trim().length < 2 && (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <p className="text-sm">Type at least 2 characters to search.</p>
        </div>
      )}


      {/* skeleton */}
      {isLoading && query.trim().length >= 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <NewsCardMediumSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <p className="text-lg font-semibold">Search failed</p>
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
      {!isLoading && !isError && allArticles.length === 0 && query.trim().length >= 2 && (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <p className="text-sm">
            No results for &quot;<span className="font-medium text-foreground">{query}</span>&quot;. Try a different keyword.
          </p>
        </div>
      )}

    </div>
  );
}


export default SearchLayout;