"use client";

import { BusinessSectionProps } from "@/types/newsTypes";
import { NewsCardMedium } from "@/components/news/news-card-medium";
import { NewsCardMediumSkeleton } from "@/components/news/news-card-skeleton";
import { SectionHeader } from "@/components/news-components/section-header";
import { motion } from "motion/react";



export function BusinessSection({ articles, isLoading }: BusinessSectionProps) {

  return (
    <section>
      <SectionHeader title="Business" viewAllHref="#" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <NewsCardMediumSkeleton key={i} />)
          : articles.slice(0, 3).map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <NewsCardMedium article={article} />
            </motion.div>
          ))}
      </div>
    </section>
  );
}
