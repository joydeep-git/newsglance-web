"use client";

import { useState, useEffect } from "react";
import { NewsState } from "@/types/newsTypes";
import { dummyTopStories, dummyLatestNews, dummyFinanceNews, dummyBusinessNews } from "@/lib/dummy-news";
import { HeroSection } from "@/components/news-components/hero-section";
import { LatestNewsSection } from "@/components/news-components/latest-news-section";
import { BusinessSection } from "@/components/news-components/business-section";
import { FinanceSidebar } from "@/components/news-components/finance-sidebar";



export function HomepageLayout() {

  const [isLoading, setIsLoading] = useState(true);

  const [news, setNews] = useState<NewsState>({
    topStories: [],
    latestNews: [],
    financeNews: [],
    businessNews: [],
  });


  useEffect(() => {
    // Simulate async API fetch — replace with useQuery when backend is ready
    const timer = setTimeout(() => {
      setNews({
        topStories: dummyTopStories,
        latestNews: dummyLatestNews,
        financeNews: dummyFinanceNews,
        businessNews: dummyBusinessNews,
      });
      setIsLoading(false);
    }, 900); // 900ms to make skeleton visible

    return () => clearTimeout(timer);
  }, []);

  const featuredArticle = news.topStories[0] ?? null;

  return (
    <div className="py-6 md:py-8">
      {/*
        Outer grid: main content (left) + finance sidebar (right)
        On mobile: single column, sidebar drops below
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">

        {/* ─── LEFT / MAIN COLUMN ─── */}
        <div className="flex flex-col gap-8 min-w-0">

          {/* Hero */}
          <HeroSection article={featuredArticle} isLoading={isLoading} />

          {/* Latest News */}
          <LatestNewsSection articles={news.latestNews} isLoading={isLoading} />

          {/* Business */}
          <BusinessSection articles={news.businessNews} isLoading={isLoading} />

        </div>

        {/* ─── RIGHT SIDEBAR ─── */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border/60 bg-card p-4">
            <FinanceSidebar articles={news.financeNews} isLoading={isLoading} />
          </div>
        </div>

      </div>
    </div>
  );
}
