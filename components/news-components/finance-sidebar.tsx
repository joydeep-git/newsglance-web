"use client";

import { FinanceSidebarProps } from "@/types/newsTypes";
import NewsCardCompact from "@/components/news/news-card-compact";
import { NewsCardCompactSkeleton } from "@/components/news/news-card-skeleton";
import SectionHeader from "@/components/news-components/section-header";
import { motion } from "motion/react";

const FinanceSidebar = ({ articles, isLoading, viewAllHref }: FinanceSidebarProps) => {


  return (
    <aside className="w-full">

      <SectionHeader title="Finance" viewAllHref={viewAllHref} />

      <div className="divide-y divide-border/0">

        {isLoading

          ? Array.from({ length: 5 }).map((_, i) => <NewsCardCompactSkeleton key={i} />)

          : articles.slice(0, 5).map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <NewsCardCompact article={article} />
            </motion.div>
          ))}
      </div>

    </aside>
  );
}


export default FinanceSidebar;
