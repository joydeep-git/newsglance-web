import { ArticleCard } from "@/types/newsTypes";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import dateUtlity from "@/utils/dateUtility";


const BreakingNewsCard = ({ article, index }: { article: ArticleCard; index: number }) => {
  
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <Link
        href={`/article/${article.id}`}
        className="group flex gap-3 items-start p-3 rounded-xl border border-border/50 bg-card hover:border-project/40 hover:bg-accent/40 transition-all duration-200 h-full"
      >
        {article.thumbnail && (
          <div className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              sizes="56px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[10px] font-bold text-project uppercase tracking-wider">
            {article.section}
          </span>
          <h4 className="text-xs font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-project transition-colors duration-200">
            {article.title}
          </h4>
          <div className="flex items-center gap-1 text-muted-foreground text-[10px] mt-0.5">
            <CalendarDays size={9} />
            <time dateTime={article.publishedAt}>{dateUtlity.formatDateOnly(article.publishedAt)}</time>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default BreakingNewsCard;