"use client";

import { HeroSectionProps } from "@/types/newsTypes";
import { NewsCardHero } from "@/components/news/news-card-hero";
import { NewsCardHeroSkeleton } from "@/components/news/news-card-skeleton";


const HeroSection = ({ article, isLoading }: HeroSectionProps) => {

  if (isLoading || !article) {
    return <NewsCardHeroSkeleton />;
  }

  return <NewsCardHero article={article} />;

}

export default HeroSection;