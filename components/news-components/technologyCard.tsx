import { motion } from "motion/react";
import { ArticleCard } from "@/types/newsTypes";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import dateUtlity from "@/utils/dateUtility";


const TechnologyCard = ({ article, index }: { article: ArticleCard; index: number }) => {

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: index * 0.05 }} >

      <Link href={`/article/${article.id}`} className="group flex flex-col h-full min-w-[200px] max-w-[240px]">
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-2.5 shrink-0">
          
          {article.thumbnail ? (
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              sizes="240px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-xl" />
          )}

        </div>

        <p className="text-xs font-semibold leading-snug text-foreground line-clamp-3 group-hover:text-project transition-colors duration-200">
          {article.title}
        </p>

        <div className="flex items-center gap-1 text-muted-foreground text-[10px] mt-1.5">
          <CalendarDays size={9} />
          <span>{dateUtlity.formatDateTime(article.publishedAt)}</span>
        </div>

      </Link>

    </motion.div>
  );
}

export default TechnologyCard;