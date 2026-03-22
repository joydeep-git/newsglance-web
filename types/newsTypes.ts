
export type GuardianArticle = {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  sectionName: string;
  thumbnail?: string;
  trailText?: string;
};


export type ArticleCard = {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string | null;
  author: string;
  publishedAt: string;
  readTime: number;
  section: string;
  sourceUrl: string;
};


export type ArticleDetail = ArticleCard & {
  body: string;
  heroImage: string | null;
  publication: string;
  updatedAt: string | null;
  shareUrl: string | null;
};


export type NewsResponse = {
  data: ArticleCard[];
  currentPage: number;
  hasNextPage: boolean;
};


export type HomeResponse = {
  currentPage: number;
  hasNextPage: boolean;
  featured: ArticleCard[];
  finance: ArticleCard[];
  tech: ArticleCard[];
};


export type FetchOptions = {
  page?: number;
  pageSize?: number;
};

export type HomePageProps = {
  searchParams: Promise<{ category?: string; country?: string; search?: string }>;
}