"use client";

import { GuardianArticle } from "@/types/newsTypes";
import { NewsCardHero } from "@/components/news/news-card-hero";
import { NewsCardHeroSkeleton } from "@/components/news/news-card-skeleton";

interface HeroSectionProps {
  article: GuardianArticle | null;
  isLoading: boolean;
}

export function HeroSection({ article, isLoading }: HeroSectionProps) {
  if (isLoading || !article) {
    return <NewsCardHeroSkeleton />;
  }
  return <NewsCardHero article={article} />;
}
