
const ArticlePageSkeleton = () => {

  return (
    <div className="py-8 animate-pulse">

      <div className="h-8 bg-muted rounded-lg w-2/3 mb-4" />

      <div className="h-4 bg-muted rounded w-1/3 mb-6" />

      <div className="aspect-video bg-muted rounded-xl mb-6" />

      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-3 items-start py-3 border-b border-border/60">
            <div className="shrink-0 w-16 h-14 rounded-lg bg-muted" />
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className="h-2.5 w-14 rounded-full bg-muted-foreground/20" />
              <div className="h-3.5 rounded bg-muted-foreground/15 w-full" />
              <div className="h-3.5 rounded bg-muted-foreground/15 w-4/5" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ArticlePageSkeleton;
