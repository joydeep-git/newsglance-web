import SingleNewsView from "@/components/news/single-news-view";
import ArticlePageSkeleton from "@/components/news/article-page-skeleton";
import { useSingleNews } from "@/hooks/newsHooks";


const ArticleView = ({ newsId }: { newsId: string }) => {

  const { data, isLoading, isError } = useSingleNews(newsId);

  if (isLoading) return <ArticlePageSkeleton />;

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3 text-muted-foreground">
        <p className="text-xl font-semibold text-foreground">Article not found</p>
        <p className="text-sm">This article may have been removed or the URL is incorrect.</p>
      </div>
    );
  }

  return <SingleNewsView article={data} />;
}


export default ArticleView;