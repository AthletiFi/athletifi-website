import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FocusArticle from '@/components/blog-insights/FocusArticle';
import BlogInsightsCards from '@/components/blog-insights/BlogInsightsCards';
import { Hero } from '@/types/CommonHero.type';
import { filterTargetArticle } from '@/utils/helpers';
import { getBlogList } from '@/utils/ApiHelper';
import { Suspense } from 'react';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { addUserPostSignIn } from '@/app/actions/userDataActions';

// import { SEO_CONFIG } from '@/utils/seoConfig';

// TO DO: Implement dynamic metadata generation for SEO using generateMetadata https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
// export const metadata = {title: 'AthletiFi Blog: Latest Updates & Announcements', description: 'Stay updated with the latest blog and insights from AthletiFi. Discover new updates, announcements, and in-depth articles.'};

// The main functional component for the Blog and Insights page
// const BlogPage = () => {
export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { allBlogList, allBlogListError } = await getBlogList();
  const filteredBlogListData = allBlogList?.data || [];

  // Handling loading and error states
  if (allBlogListError) return <div>Error loading blog data.</div>;
  if (!allBlogList) return <div>Loading blog...</div>;

  // Assuming the first article is the focus article
  const targetArticle = allBlogList?.data?.[0];
  if (!targetArticle) {
    return <div>Error: Target article not found</div>;
  }

  // Filter out the target article from the allBlogList data
  const allBlogButTargetArticle = filterTargetArticle(
    allBlogList?.data,
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
  if (auth.isSignedIn) {
    await addUserPostSignIn(
      auth.email,
      auth.name,
      auth.userId,
      searchParams?.invite_id,
    );
  }
  const userData = auth.isSignedIn ? await getUserData(auth) : null;

  return (
    <>
      <div className="overflow-hidden">
        <div className="blog-page__hero-bg bg-center bg-no-repeat bg-cover">
          <Header userData={userData as UserData} />
          <CommonHero hero={hero} />
        </div>
        <FocusArticle blogListData={filteredBlogListData} />
        <Suspense fallback={<div>Loading...</div>}>
          <BlogInsightsCards allBlogList={allBlogButTargetArticle} />
        </Suspense>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
