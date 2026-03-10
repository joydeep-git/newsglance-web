
export type GuardianArticle = {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  sectionName: string;
  thumbnail?: string;
  trailText?: string;
};


export type NewsState = {
  topStories: GuardianArticle[];
  latestNews: GuardianArticle[];
  financeNews: GuardianArticle[];
  businessNews: GuardianArticle[];
};


export type BusinessSectionProps = {
  articles: GuardianArticle[];
  isLoading: boolean;
}