import { UserDataType } from "./authTypes";
import { ApiBaseResponse, FileDataType } from "./globalTypes";

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
};


export type ArticleDetail = ArticleCard & {
  body: string;
  heroImage: string | null;
  publication: string;
  updatedAt: string | null;
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

export type LatestNewsSectionProps = {
  articles: ArticleCard[];
  isLoading: boolean;
  viewAllHref?: string;
}

export type InfiniteFeedProps = {
  articles: ArticleCard[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  skeletonCount?: number;
}


export type FinanceSidebarProps = {
  articles: ArticleCard[];
  isLoading: boolean;
  viewAllHref?: string;
  title?: string;
  length?: number;
}


export type HeroSectionProps = {
  article: ArticleCard | null | undefined;
  isLoading: boolean;
}


export interface NewssummaryApiType extends ApiBaseResponse {
  data: {
    user: UserDataType;
    summary: string;
  }
}


export interface NewsAudioApiType extends ApiBaseResponse {
  data: {
    user: UserDataType;
    audio: FileDataType
  }
}


export interface NewssummaryApiType extends ApiBaseResponse {
  data: {
    user: UserDataType;
    summary: string;
  }
}


export interface AiNotAuthStateProps {
  onLogin: () => void;
  description: string;
}


export interface AiErrorStateProps {
  message: string;
  onRetry: () => void;
}


