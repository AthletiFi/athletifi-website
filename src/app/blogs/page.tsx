import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FocusArticle from '@/components/blogs-insights/FocusArticle';
import BlogsInsightsCards from '@/components/blogs-insights/BlogsInsightsCards';
import { Hero } from '@/types/CommonHero.type';
import { filterTargetArticle } from '@/utils/helpers';
import { getBlogsList } from '@/utils/ApiHelper';
import { Suspense } from 'react';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';

// import { SEO_CONFIG } from '@/utils/seoConfig';

// TO DO: Implement dynamic metadata generation for SEO using generateMetadata https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
// export const metadata = {title: 'AthletiFi Blogs: Latest Updates & Announcements', description: 'Stay updated with the latest blogs and insights from AthletiFi. Discover new updates, announcements, and in-depth articles.'};

// The main functional component for the Blogs and Insights page
// const BlogsPage = () => {
export default async function BlogsPage() {
  const { allBlogsList, allBlogsListError } = await getBlogsList();
  const filteredBlogsListData = allBlogsList?.data || [];

  // Handling loading and error states
  if (allBlogsListError) return <div>Error loading blogs data.</div>;
  if (!allBlogsList) return <div>Loading blogs...</div>;

  // Assuming the first article is the focus article
  const targetArticle = allBlogsList?.data?.[0];
  if (!targetArticle) {
    return <div>Error: Target article not found</div>;
  }

  // Filter out the target article from the allBlogsList data
  const allBlogsButTargetArticle = filterTargetArticle(
    allBlogsList?.data,
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

  const auth = await isAuthenticated();
  const userData = auth.isSignedIn ? await getUserData(auth) : null;

  return (
    <>
      <div className="overflow-hidden">
        <div className="blogs-page__hero-bg bg-center bg-no-repeat bg-cover">
          <Header userData={userData as UserData} />
          <CommonHero hero={hero} />
        </div>
        <FocusArticle blogsListData={filteredBlogsListData} />
        <Suspense fallback={<div>Loading...</div>}>
          <BlogsInsightsCards allBlogsList={allBlogsButTargetArticle} />
        </Suspense>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
