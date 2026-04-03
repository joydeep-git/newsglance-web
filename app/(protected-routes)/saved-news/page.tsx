"use client";

import { useGetBookmarks } from "@/hooks/newsHooks";
import { useAppSelector } from "@/redux/store";
import SavedNewsCard from "@/components/news/saved-news-card";
import { NewsCardMediumSkeleton } from "@/components/news/news-card-skeleton";
import { Bookmark, BookmarkX } from "lucide-react";


const SavedNews = () => {

  const { user } = useAppSelector(s => s.auth);

  const { data, isLoading, refetch } = useGetBookmarks(user?.id);


  return (
    <div className="py-6 md:py-10 min-h-[60vh]">

      {/* Page header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">

        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-project/10">
          <Bookmark className="w-5 h-5 text-project" strokeWidth={2} />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Saved News</h1>
          {!isLoading && data && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {data.length === 0
                ? "No saved articles yet"
                : `${data.length} article${data.length !== 1 ? "s" : ""} saved`}
            </p>
          )}
        </div>

      </div>


      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <NewsCardMediumSkeleton key={i} />
          ))}
        </div>
      )}


      {/* Empty state */}
      {!isLoading && (!data || data.length === 0) && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted">
            <BookmarkX className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">Nothing saved yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Bookmark articles while reading to find them here later.
            </p>
          </div>
        </div>
      )}


      {/* News grid */}
      {!isLoading && data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((article) => (
            <SavedNewsCard
              key={article.id}
              article={article}
              onRemoved={() => refetch()}
            />
          ))}
        </div>
      )}

    </div>
  );

};

export default SavedNews;