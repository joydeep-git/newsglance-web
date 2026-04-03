"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArticleCard } from "@/types/newsTypes";
import { CalendarDays, Trash2 } from "lucide-react";
import dateUtlity from "@/utils/dateUtility";
import { useDeleteBookmark } from "@/hooks/newsHooks";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";


const SavedNewsCard = ({ article, onRemoved }: { article: ArticleCard; onRemoved: () => void; }) => {

  const [imgError, setImgError] = useState(false);

  const [removing, setRemoving] = useState(false);

  const { id, title, publishedAt, section, thumbnail, excerpt, readTime } = article;

  const { mutate: deleteBookmark, isPending } = useDeleteBookmark();

  const handleRemoveBookmark = (e: React.MouseEvent) => {

    e.preventDefault();
    e.stopPropagation();

    if (isPending || removing) return;

    setRemoving(true);

    deleteBookmark(id, {
      onSuccess: () => {
        toast.success("Bookmark removed!");
        onRemoved();
      },
      onError: (err) => {
        toast.error(err.message || "Failed to remove bookmark");
        setRemoving(false);
      },
    });
  };


  return (
    <article className={`group relative flex flex-col h-full transition-opacity duration-300 ${removing ? "opacity-40 pointer-events-none" : ""}`}>

      {/* Float bookmark delete button */}
      <Button
        size="icon"
        variant="secondary"
        onClick={handleRemoveBookmark}
        disabled={isPending || removing}
        title="Remove bookmark"
        aria-label="Remove bookmark"
        className="absolute z-10 top-2.5 right-2.5"
      >
        <Trash2 size={15} strokeWidth={2} />
      </Button>

      <Link href={`/article/${id}`} className="flex flex-col h-full">

        {/* Thumbnail */}
        <div className="relative w-full overflow-hidden rounded-xl aspect-16/10 mb-3 shrink-0 bg-muted">
          {thumbnail && !imgError ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized={thumbnail.startsWith("http")}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-xl flex items-center justify-center">
              <span className="text-muted-foreground/30 text-xs">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 gap-1.5">

          {/* Meta row */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-[10px] font-semibold uppercase tracking-wider text-project bg-project/10 hover:bg-project/15 border-0 px-1.5 py-0">
              {section}
            </Badge>

            <span className="text-muted-foreground/40 text-[10px]">•</span>

            <div className="flex items-center gap-1 text-muted-foreground text-[10px]">
              <CalendarDays size={10} />
              <time dateTime={publishedAt}>{dateUtlity.formatDateTime(publishedAt)}</time>
            </div>

            {readTime > 0 && (
              <>
                <span className="text-muted-foreground/40 text-[10px]">•</span>
                <span className="text-muted-foreground text-[10px]">{readTime} min read</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm md:text-[15px] leading-snug text-foreground line-clamp-3 group-hover:text-project transition-colors duration-200">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 hidden lg:block">
              {excerpt}
            </p>
          )}

        </div>

      </Link>

    </article>
  );
};

export default SavedNewsCard;
