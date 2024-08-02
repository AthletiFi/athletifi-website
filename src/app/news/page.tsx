import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FocusArticle from '@/components/news-insights/FocusArticle';
import NewsInsightsCards from '@/components/news-insights/NewsInsightsCards';
import { Hero } from '@/types/CommonHero.type';
import { filterTargetArticle } from '@/utils/helpers';
import { getNewsList } from '@/utils/ApiHelper';
import { Suspense } from 'react';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';

// import { SEO_CONFIG } from '@/utils/seoConfig';

// TO DO: Implement dynamic metadata generation for SEO using generateMetadata https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
// export const metadata = {title: 'AthletiFi News: Latest Updates & Announcements', description: 'Stay updated with the latest news and insights from AthletiFi. Discover new updates, announcements, and in-depth articles.'};

// The main functional component for the News and Insights page
// const NewsPage = () => {
export default async function NewsPage() {
  const { allNewsList, allNewsListError } = await getNewsList();
  const filteredNewsListData = allNewsList?.data || [];

  // Handling loading and error states
  if (allNewsListError) return <div>Error loading news data.</div>;
  if (!allNewsList) return <div>Loading news...</div>;

  // Assuming the first article is the focus article
  const targetArticle = allNewsList?.data?.[0];
  if (!targetArticle) {
    return <div>Error: Target article not found</div>;
  }

  // Filter out the target article from the allNewsList data
  const allNewsButTargetArticle = filterTargetArticle(
    allNewsList?.data,
    targetArticle,
  );

  if (!targetArticle) {
    return <div>Error: Target article not found</div>;
  }

  // TO DO: Implement dynamic metadata generation for SEO using generateMetadata https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
  // SEO
  const hero: Hero = {
    heading: 'Latest Updates & Announcements',
  };

  const userData = await getUserData();

  return (
    <>
      <div className="overflow-hidden">
        <div className="news-page__hero-bg bg-center bg-no-repeat bg-cover">
          <Header userData={userData as UserData} />
          <CommonHero hero={hero} />
        </div>
        <FocusArticle newsListData={filteredNewsListData} />
        {/* <NewsInsightsCards allNewsList={allNewsButTargetArticle} /> */}
        <Suspense fallback={<div>Loading...</div>}>
          <NewsInsightsCards allNewsList={allNewsButTargetArticle} />
        </Suspense>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
