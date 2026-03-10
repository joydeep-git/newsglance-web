// Skeleton loading components for all 3 card variants

export function NewsCardHeroSkeleton() {
  return (
    <div className="animate-pulse w-full rounded-xl overflow-hidden aspect-video lg:aspect-21/9 bg-muted">
      {/* Simulated gradient overlay + text at bottom */}
      <div className="h-full flex flex-col justify-end p-5 md:p-8 bg-linear-to-t from-muted-foreground/10 to-transparent">
        <div className="h-4 w-20 rounded-full bg-muted-foreground/20 mb-3" />
        <div className="space-y-2 mb-3">
          <div className="h-6 rounded bg-muted-foreground/20 w-4/5" />
          <div className="h-6 rounded bg-muted-foreground/20 w-3/5" />
        </div>
        <div className="h-3 rounded bg-muted-foreground/20 w-2/3 hidden md:block" />
        <div className="h-3 rounded bg-muted-foreground/20 w-1/2 mt-1 hidden md:block" />
        <div className="flex justify-between mt-4">
          <div className="h-3 rounded bg-muted-foreground/20 w-24" />
          <div className="h-3 rounded bg-muted-foreground/20 w-16" />
        </div>
      </div>
    </div>
  );
}

export function NewsCardMediumSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-3">
      {/* Image placeholder */}
      <div className="rounded-xl aspect-16/10 bg-muted" />
      {/* Meta */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-14 rounded-full bg-muted-foreground/20" />
        <div className="h-3 w-3 rounded-full bg-muted-foreground/10" />
        <div className="h-3 w-20 rounded bg-muted-foreground/10" />
      </div>
      {/* Title */}
      <div className="space-y-1.5">
        <div className="h-4 rounded bg-muted-foreground/20 w-full" />
        <div className="h-4 rounded bg-muted-foreground/20 w-5/6" />
        <div className="h-4 rounded bg-muted-foreground/20 w-4/6" />
      </div>
      {/* Excerpt (hidden on small screens, matches component) */}
      <div className="space-y-1 hidden lg:block">
        <div className="h-3 rounded bg-muted-foreground/10 w-full" />
        <div className="h-3 rounded bg-muted-foreground/10 w-3/4" />
      </div>
    </div>
  );
}

export function NewsCardCompactSkeleton() {
  return (
    <div className="animate-pulse flex gap-3 items-start py-3 border-b border-border/60 last:border-0">
      {/* Thumbnail */}
      <div className="shrink-0 w-16 h-14 rounded-lg bg-muted" />
      {/* Text */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="h-2.5 w-14 rounded-full bg-muted-foreground/20" />
        <div className="h-3.5 rounded bg-muted-foreground/15 w-full" />
        <div className="h-3.5 rounded bg-muted-foreground/15 w-4/5" />
        <div className="h-2.5 rounded bg-muted-foreground/10 w-20 mt-0.5" />
      </div>
    </div>
  );
}
