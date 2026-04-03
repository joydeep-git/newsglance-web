"use client";

import Image from "next/image";
import { ArticleDetail } from "@/types/newsTypes";
import { CalendarDays, Clock, ArrowLeft, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import dateUtlity from "@/utils/dateUtility";
import { useRouter } from "next/navigation";
import ShareNewsBar from "./shareNewsBar";
import AiTabs from "./ai-tabs";
import { Button } from "@/components/ui/button";
import SingleCardAd from "../advertisements/singleCardAd";
import BannerAd from "../advertisements/bannerAd";
import FinanceSidebar from "../news-components/finance-sidebar";
import { useInfiniteHomepageNews } from "@/hooks/newsHooks";
import BookmarkButton from "./bookmark-button";


const SingleNewsView = ({ article }: { article: ArticleDetail }) => {


  const router = useRouter();

  const { title, publishedAt, section, thumbnail, excerpt, body, heroImage, author, readTime, publication } = article;

  const displayImage = heroImage ?? thumbnail;

  const { data: otherNews, isLoading: isOtherNewsLoading } = useInfiniteHomepageNews();

  const isYouTubeUrl = (url: string): boolean => {
    return url.includes("youtube.com") || url.includes("youtu.be") || url.includes("youtube-nocookie.com");
  };

  return (
    <div className="py-6 md:py-8">

      {/* back buttons */}
      <div className="flex items-center gap-12 mb-12">

        <Button variant="default" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Button>

        <Button variant="outline" size="sm" onClick={() => router.replace("/")} >
          <Home className="h-3.5 w-3.5" />
          Home
        </Button>

      </div>



      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8 items-start">

        {/* MAIN CONTENT */}
        <div className="min-w-0">

          {/* Section breadcrumb */}
          <div className="flex items-center gap-2 mb-3">

            <p className="text-xs tracking-widest">
              <span className="text-project font-bold uppercase">{section} &nbsp; &nbsp; &nbsp;</span>
              <span className="text-muted-foreground">{publication && `by ${publication}`}</span>
            </p>

          </div>



          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-foreground mb-3">
            {title}
          </h1>

          {/* Lead / trail text */}
          {excerpt && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 font-light border-l-4 border-project pl-4">
              {excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">

            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-project/20 flex items-center justify-center text-project font-bold text-[10px] uppercase">
                {author?.charAt(0) ?? ""}
              </div>
              <span className="font-medium text-foreground">{author}</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              <time dateTime={publishedAt}>{dateUtlity.formatDateLong(publishedAt)}</time>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{readTime} min read</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <BookmarkButton />

          </div>



          {/* Image + share bar + body */}
          <div className="flex gap-3">

            {/* Share bar — desktop */}
            <div className="hidden md:flex flex-col items-center shrink-0">
              <ShareNewsBar title={title} orientation="vertical" />
            </div>

            <div className="flex-1 min-w-0">
              {/* Hero image */}
              {displayImage ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
                  {
                    isYouTubeUrl(displayImage)
                      ? <iframe
                        src={displayImage}
                        className="w-full aspect-video rounded-lg"
                        allowFullScreen
                        allow="accelerometer; camera; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                      />
                      : <Image
                        src={displayImage}
                        alt={title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        className="object-cover"
                        priority
                      />
                  }
                </div>
              ) : (
                <div className="w-full aspect-video rounded-xl bg-muted mb-4" />
              )}


              {excerpt && (
                <p className="text-[11px] text-muted-foreground italic mb-5 leading-relaxed px-1">
                  {excerpt.slice(0, 120)}… — {publication ?? "The Guardian"}
                </p>
              )}

              {/* Share bar — mobile */}
              <div className="flex md:hidden items-center gap-2 mb-5">
                <ShareNewsBar title={title} orientation="horizontal" />
              </div>

              {/* Summerization */}
              <div className="mb-6">
                <AiTabs />
              </div>


              <div className="my-3 w-full overflow-hidden">
                <BannerAd />
              </div>


              {/* Article body */}
              {body ? (
                <div
                  className="prose prose-sm sm:prose max-w-none text-foreground leading-relaxed
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-p:text-foreground/90 prose-p:leading-7
                    prose-a:text-project prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:w-full prose-img:object-cover
                    prose-blockquote:border-project prose-blockquote:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Full article content is available at the source.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ─── Ad section ─── */}
        <div className="gap-4 lg:sticky lg:self-start">
          <SingleCardAd />

          <FinanceSidebar
            articles={otherNews?.pages.flatMap((p) => p.featured) ?? []}
            isLoading={isOtherNewsLoading}
            viewAllHref="/"
            title="Other News"
            length={15}
          />
        </div>

      </div>
    </div>
  );
}


export default SingleNewsView;