import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import NewsInsightsCards from '@/components/news-insights/NewsInsightsCards';
import TargetArticleContent from '@/components/news-insights/TargetArticleContent';
import { filterTargetArticle } from '@/utils/helpers';
import { getNewsList } from '@/app/utils/ApiHelper';
import { NewsPageContext } from '@/types/News.type';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';

async function getNewsArticle(slug: string) {
  console.log(
    `getNewsArticle URL: ${process.env.NEXT_PUBLIC_API_URL}/news/${slug}`,
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/news/${slug}`,
  );
  console.log('response: %s', JSON.stringify(response));
  const data = await response.json();
  console.log('data: %s', JSON.stringify(data));
  return data;
}

// This is the main content of the news article page, which contains the news article itself and the sidebar with the other news articles.
export default async function NewsArticleSlugPage({ params }: NewsPageContext) {
  const newsArticle = await getNewsArticle(params.slug);
  const { allNewsList: allNewsData, allNewsListError: listError } =
    await getNewsList();

  // Error handling and loading states
  // if (detailError || listError) return <div>Error: Data not available</div>;
  if (listError) return <div>Error: Data not available</div>;
  if (!newsArticle || !allNewsData) return <div>Loading...</div>;

  const targetArticle = newsArticle?.data?.[0];
  if (!targetArticle) return <div>Error: Target article not found</div>;

  // Filter out the target article from the allNewsList data
  const everyOtherArticle = filterTargetArticle(
    allNewsData?.data,
    targetArticle,
  );

  // SEO
  const hero: Hero = {
    heading: targetArticle?.title || `Article not found`,
    subtitle:
      'Here you can find all the latest news and developments from AthletiFi!',
    title: 'News and Updates for AthletiFi Sports Cards',
  };

  const userData = await getUserData();

  return (
    <>
      <div className="overflow-hidden">
        <div className="news-page__hero-bg bg-center bg-no-repeat bg-cover">
          <Header userData={userData as UserData} />
          <CommonHero hero={hero} />
        </div>
        <TargetArticleContent newsArticle={newsArticle} />
        <NewsInsightsCards allNewsList={everyOtherArticle} />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
