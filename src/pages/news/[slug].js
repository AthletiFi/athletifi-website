import BackToTop from '../../components/common/BackToTop';
import CommonHero from '../../components/common/CommonHero';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
// import Seo from '../../components/common/Seo';
import NewsInsightsCards from '../../components/news-insights/NewsInsightsCards';
import TargetArticleContent from '../../components/news-insights/TargetArticleContent';
import { GetRequestHandler } from '../../components/common/api/Api';
import {
  NewsDetailApiHandler,
  NewsListApiHandler,
} from '../../components/common/api/ApiUrls';
import { filterTargetArticle } from '../../../src/utils/helpers';

// This is the main content of the news article page, which contains the news article itself and the sidebar with the other news articles.

const NewsArticleSlugPage = ({ newsDetailData, allNewsData }) => {
  let targetArticle = null;
  if (newsDetailData && newsDetailData.data && newsDetailData.data.length > 0)
    targetArticle = newsDetailData.data[0];

  // Filter out the target article from the allNewsList data
  const everyOtherArticle = filterTargetArticle(allNewsData, targetArticle);

  // SEO
  const hero = {
    heading: targetArticle ? targetArticle.title : `Article not found`,
    subtitle:
      'Here you can find all the latest news and developments from AthletiFi!',
    title: 'News and Updates for AthletiFi Sports Cards',
  };

  // const pageSEO = { title: `${newsDetailData && newsDetailData.data[0].title}`, description: `${newsDetailData.data[0].description}`, websiteURL: `https://athletifi-website.vercel.app`, image: `https://vidalco.in${newsDetailData.data[0].image.url}`,};

  return (
    <>
      {/* SEO */}
      {/* <Seo pageSEO={pageSEO} /> */}
      <div className="overflow-hidden">
        <div className="news-page__hero-bg bg-center bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <TargetArticleContent newsDetailData={newsDetailData} />
        <NewsInsightsCards allNewsList={everyOtherArticle} />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    const response = await GetRequestHandler(NewsDetailApiHandler(slug));
    const newsresponse = await GetRequestHandler(NewsListApiHandler());

    return {
      props: {
        allNewsData: newsresponse,
        newsDetailData: response,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        allNewsData: null,
        newsDetailData: null,
      },
    };
  }
}

export default NewsArticleSlugPage;
