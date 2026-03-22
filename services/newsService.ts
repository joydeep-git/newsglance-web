import { ArticleCard, ArticleDetail, HomeResponse, NewsResponse } from "@/types/newsTypes";
import ApiService from "./apiService";


class NewsService extends ApiService {

  constructor() {
    super("/news");
  }

  public async homePageNews(page = 1): Promise<HomeResponse> {
    const res = await this.api.get(`/homepage?page=${page}`);
    return res.data;
  }

  public async categoryNews(category: string, page = 1): Promise<NewsResponse> {
    const res = await this.api.get(`/category/${category}?page=${page}`);
    return res.data;
  }

  public async countryNews(country: string, page = 1): Promise<NewsResponse> {
    const res = await this.api.get(`/country/${country}?page=${page}`);
    return res.data;
  }

  public async searchNews(query: string, page = 1): Promise<NewsResponse> {
    const modifiedStr = query.replaceAll(" ", "+");
    const res = await this.api.get(`/search?q=${modifiedStr}&page=${page}`);
    return res.data;
  }

  public async saveBookmark(newsId: string): Promise<{ newsId: string; userId: string }> {
    const res = await this.api.get(`/bookmark/${newsId}`);
    return res.data;
  }

  public async getSaved(): Promise<ArticleCard[]> {
    const res = await this.api.get("/bookmarks");
    return res.data;
  }

  public async deleteBookmark(newsId: string): Promise<{ newsId: string }> {
    const res = await this.api.delete(`/bookmark/${newsId}`);
    return res.data;
  }

  public async singleNews(newsId: string): Promise<ArticleDetail> {
    const res = await this.api.get(`/single/${newsId}`);
    return res.data;
  }

}

const newsService = new NewsService();

export default newsService;