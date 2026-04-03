import MaxWidthWrapper from "@/components/maxWidthWrapper";
import HomepageLayout from "@/components/news-components/homepage-layout";
import CategoryLayout from "@/components/news-components/category-layout";
import CountryLayout from "@/components/news-components/country-layout";
import SearchLayout from "@/components/news-components/search-layout";
import { newsCategories } from "@/utils/constants";
import { HomePageProps } from "@/types/newsTypes";



const HomePage = async ({ searchParams }: HomePageProps) => {

  const { category, country, search } = await searchParams;

  return (
    <MaxWidthWrapper>
      {search ? (
        <SearchLayout query={search} />
      ) : country ? (
        <CountryLayout country={country} />
      ) : category && category in newsCategories ? (
        <CategoryLayout category={category as keyof typeof newsCategories} />
      ) : (
        <HomepageLayout />
      )}
    </MaxWidthWrapper>
  );
}

export default HomePage;