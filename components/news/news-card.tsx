import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card";

export type NewsItem = {
  id: string
  title: string
  category: string
  date: string
  excerpt?: string
  href?: string
  imageUrl?: string
}

export function NewsCard({ item }: { item: NewsItem }) {
  const { title, category, date, excerpt, href = "#", imageUrl = "/news-thumbnail.png" } = item

  return (
    <article aria-labelledby={`news-${item.id}-title`} className="group">
      <Card className="overflow-hidden rounded-xl transition-shadow group-hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`${category} - ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
            className="object-cover"
            priority={false}
          />
        </div>
        <CardContent className="p-4 md:p-5">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{category}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={date}>{date}</time>
          </div>

          <h3 id={`news-${item.id}-title`} className="text-pretty text-base font-semibold leading-snug md:text-lg">
            <Link
              href={href}
              className="underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {title}
            </Link>
          </h3>

          {excerpt ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{excerpt}</p> : null}
        </CardContent>
      </Card>
    </article>
  )
}
