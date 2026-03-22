"use client";

import { useCallback, useMemo } from "react";
import { motion } from "motion/react";
import HeroSection from "@/components/news-components/hero-section";
import FinanceSidebar from "@/components/news-components/finance-sidebar";
import SectionHeader from "@/components/news-components/section-header";
import InfiniteFeed from "@/components/news-components/infinite-feed";
import NewsCardMedium from "@/components/news/news-card-medium";
import { NewsCardMediumSkeleton } from "@/components/news/news-card-skeleton";
import { useInfiniteHomepageNews } from "@/hooks/newsHooks";
import { Zap } from "lucide-react";
import TechnologyCard from "./technologyCard";
import BreakingNewsCard from "./breakingNewsCards";



const HomepageLayout = () => {


  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, } = useInfiniteHomepageNews();


  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  // Flatten all pages of featured articles
  const allFeatured = useMemo(
    () => data?.pages.flatMap((p) => p.featured) ?? [],
    [data]
  );

  // Finance + tech come only from the first page (they don't paginate)
  const financeArticles = data?.pages[0]?.finance ?? [];
  const techArticles = data?.pages[0]?.tech ?? [];

  // Split: hero = [0], breaking row = [1..4], featured rows = [5..11], infinite feed starts at [12]
  const heroArticle = allFeatured[0] ?? null;
  const breakingArticles = allFeatured.slice(1, 5);    // 4 cards in the breaking row
  const previewArticles = allFeatured.slice(5, 13);    // 2 rows × ~4 cards
  const feedArticles = allFeatured.slice(13);          // rest goes to infinite feed

  return (
    <div className="py-6 md:py-8 flex flex-col gap-10">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ROW 1: Hero (left) + Finance sidebar (right)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">

        {/* Hero — first featured article */}
        <HeroSection article={heroArticle} isLoading={isLoading} />

        {/* Finance sidebar — sticky on desktop */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border/60 bg-card p-4">
            <FinanceSidebar
              articles={financeArticles}
              isLoading={isLoading}
              viewAllHref="/?category=money"
            />
          </div>
        </div>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ROW 2: Breaking News — 4-card grid row
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="block w-1 h-5 rounded-full bg-red-500" />
          <div className="flex items-center gap-1.5">
            <Zap size={14} className="text-red-500" />
            <h2 className="text-base font-bold tracking-tight text-foreground">Breaking News</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse flex gap-3 items-start p-3 rounded-xl border border-border/30">
                  <div className="shrink-0 w-14 h-14 rounded-lg bg-muted" />
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="h-2.5 w-14 rounded-full bg-muted-foreground/20" />
                    <div className="h-3.5 rounded bg-muted-foreground/15 w-full" />
                    <div className="h-3.5 rounded bg-muted-foreground/15 w-4/5" />
                  </div>
                </div>
              ))
            : breakingArticles.map((article, i) => (
              <BreakingNewsCard key={article.id} article={article} index={i} />
              ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ROW 3: Featured preview — 2 rows of medium cards
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <SectionHeader title="Featured Stories" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <NewsCardMediumSkeleton key={i} />)
            : previewArticles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                >
                  <NewsCardMedium article={article} />
                </motion.div>
              ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ROW 4: Tech banner — horizontal scroll
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <SectionHeader title="Technology" viewAllHref="/?category=technology" />
        <div className="relative">
          <div className="absolute top-0 right-0 h-full w-12 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex flex-col gap-2 min-w-[200px] snap-start">
                    <div className="aspect-video rounded-xl bg-muted" />
                    <div className="h-3 rounded bg-muted-foreground/20 w-full" />
                    <div className="h-3 rounded bg-muted-foreground/20 w-3/4" />
                    <div className="h-2.5 rounded bg-muted-foreground/10 w-1/2" />
                  </div>
                ))
              : techArticles.map((article, i) => (
                  <div key={article.id} className="snap-start shrink-0">
                  <TechnologyCard article={article} index={i} />
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ROW 5: Infinite feed — rest of featured articles
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {!isLoading && (
        <section>
          <SectionHeader title="More News" />
          <InfiniteFeed
            articles={feedArticles}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={!!hasNextPage}
            onLoadMore={handleLoadMore}
          />
        </section>
      )}

    </div>
  );
};


export default HomepageLayout;