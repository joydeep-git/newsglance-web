import newsService from "@/services/newsService";
import { ArticleCard, ArticleDetail, HomeResponse, NewsResponse, NewssummaryApiType } from "@/types/newsTypes";
import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";



export const useInfiniteHomepageNews = () => useInfiniteQuery<HomeResponse>({
  queryKey: ["homepage-news-infinite"],
  queryFn: ({ pageParam = 1 }) => newsService.homePageNews(pageParam as number),
  getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
  initialPageParam: 1,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: 1000 * 60 * 30,
  gcTime: 1000 * 60 * 30,
});




export const useInfiniteCategoryNews = (category: string) => useInfiniteQuery<NewsResponse>({
  queryKey: ["category-news-infinite", category],
  queryFn: ({ pageParam = 1 }) => newsService.categoryNews(category, pageParam as number),
  getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
  initialPageParam: 1,
  enabled: !!category,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: 1000 * 60 * 30,
  gcTime: 1000 * 60 * 30,
});



export const useInfiniteCountryNews = (country: string) => useInfiniteQuery<NewsResponse>({
  queryKey: ["country-news-infinite", country],
  queryFn: ({ pageParam = 1 }) => newsService.countryNews(country, pageParam as number),
  getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
  initialPageParam: 1,
  enabled: !!country,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: 1000 * 60 * 30,
  gcTime: 1000 * 60 * 30,
});




export const useInfiniteSearchNews = (query: string) => useInfiniteQuery<NewsResponse>({
  queryKey: ["search-news-infinite", query],
  queryFn: ({ pageParam = 1 }) => newsService.searchNews(query, pageParam as number),
  getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
  initialPageParam: 1,
  enabled: query.trim().length >= 2,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
});


export const useSingleNews = (newsId: string) => useQuery<ArticleDetail>({
  queryKey: ["single-news", newsId],
  queryFn: () => newsService.singleNews(newsId),
  enabled: !!newsId,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: 1000 * 60 * 30,
  gcTime: 1000 * 60 * 30,
});


export const useSaveBookmark = () => useMutation<{ newsId: string; userId: string }, Error, string>({
  mutationFn: (newsId: string) => newsService.saveBookmark(newsId),
});



export const useDeleteBookmark = () => useMutation<unknown, Error, string>({
  mutationFn: (newsId: string) => newsService.deleteBookmark(newsId),
});


export const useCheckBookmark = (newsId: string, userId: string | undefined) => useQuery({
  queryKey: ["check-bookmark", newsId, userId],
  queryFn: () => newsService.checkBookmark(newsId),
  enabled: !!newsId && !!userId,
});



export const useGetBookmarks = (userId: string | undefined) => useQuery<ArticleCard[]>({
  queryKey: ["get-bookmarks", userId],
  queryFn: () => newsService.getSaved(),
  refetchOnWindowFocus: true,
  enabled: !!userId,
});


export const useNewssummary = (newsId: string) => useQuery<NewssummaryApiType>({
  queryKey: ["news-summary", newsId],
  queryFn: () => newsService.generateNews(newsId),
  enabled: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
});


export const useNewsAudio = (newsId: string) => useQuery({
  queryKey: ["news-audio", newsId],
  queryFn: () => newsService.generateAudio(newsId),
  enabled: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
})
